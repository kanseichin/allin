// import qiniuUploader from '@/utils/qiniuUploader'

// const ApiHost = 'http://hotsearch.online'
const ApiHost = 'http://121.37.190.224'

const _api = {
  getBaiduHotNews: '/app/hs/baidu'
}

const request = function (method, apiUrl, param) {
  console.log('request', apiUrl)
  param = bindSystemInfo(param)
  
  var requestPromise = new Promise((resolve, reject) => {
    wx.request({
      url: apiUrl,
      data: param,
      method: method.toUpperCase(),
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        console.log(res.data.status)
        if (res.data.status === 1 || res.data.status === 200) {
          res.data.status = 1
          resolve(res.data)
        } else {
          // console.log(JSON.stringify(res))
          reject(res.data)
        }
      },
      fail: function (e) {
        // console.log(e)
        if (e.statusCode === 401) {
          // 提示登录
        }
        e.msg = e.errMsg
        reject(e)
      }
    })
  })

  return requestPromise
}

const upload = function(filePath) {
  return new Promise((resolve, reject) => {
    qiniuUploader.upload(filePath, '', (res) => {
      resolve(res)
    }, (err) => {
      reject(err)
      console.error('upload error: ' + JSON.stringify(err))
    },
    null,
    (progress) => {})
  })
}

const initUpload = function(options) {
  qiniuUploader.init(options)
}

const isUnlogin = function (status) {
  if (status === "002100") {
    return true;
  }

  if (status.length === 6 && status.substr(0, 3) === "003") {
    return true;
  }

  return false;
}

const bindSystemInfo = function (param) {
  param = param || {};
  return param
}

const apiGet = function (action, param) {
  var apiUrl = ApiHost + action
  return request('GET', apiUrl, param)
}

const apiPost = function (action, param) {
  var apiUrl = ApiHost + action
  return request('POST', apiUrl, param)
}

const apiDelete = function (action, param) {
  var apiUrl = ApiHost + action
  return request('DELETE', apiUrl, param)
}

const writeLog = function(message) {
  return apiPost(_api.WriteLog, {
    message: message
  })
}

const loginByToken = function () {
  return new Promise((resolve, reject) => {
    if (App.LoginUser) {
      apiPost(_api.loginByToken, {}).then((e) => {
        if (e.status === 1) {
          saveLoginUser(e.data)
          resolve()
        } else {
          saveLoginUser();
          reject(e)
        }
      }).catch(res => {
        reject(res)
      });
    } else {
      saveLoginUser();
      reject(new Error('找不到登录信息'))
    }
  })
}
const saveLoginUser = function (data) {
  data = data || null;

  if (data) {
    App.LoginUser = data;
    wx.setStorage({
      key: "LoginUser", data: data
    });
  } else {
    App.LoginUser = App.LoginInfo = null;
    wx.removeStorage({ key: 'LoginUser' });
    wx.removeStorage({ key: 'LoginInfo' });
  }
}

const getMPSettings = function () {
  return new Promise((resolve, reject) => {
    if (App.MPSettings) {
      resolve(App.MPSettings)
    } else {
      apiGet(_api.getMPSettings, {}).then((e) => {
        if (e.status === 1 && e.data != null) {
          App.MPSettings = e.data
          resolve(App.MPSettings)
        } else {
          reject(e)
        }
      }).catch(e => {
        reject(e)
      })
    }
  })
}

const getSupplier = function (sid, changeBarTitle) {
  sid = sid || App.Query.sid;
  changeBarTitle = typeof changeBarTitle === "boolean" ? changeBarTitle : true;

  return new Promise((resolve, reject) => {
    if (!sid) {
      if (changeBarTitle) wx.setNavigationBarTitle({ title: '蛐蛐侠' });
      return;
    }

    if (App.Supplier) {
      if (changeBarTitle) wx.setNavigationBarTitle({ title: App.Supplier.ShopName });
      resolve(App.Supplier);
    } else {
      apiGet(_api.getUserDetailUrl, { sid: sid }).then(e => {
        if (e.status === 1) {
          App.Supplier = e.data;
          if (changeBarTitle) wx.setNavigationBarTitle({ title: App.Supplier.ShopName });
          resolve(App.Supplier);
        } else {
          reject(e);
        }
      })
        .catch(e => {
          reject(e);
        });
    }
  });
}

export default {
  Apis: _api,
  Get: apiGet,
  Post: apiPost,
  Delete: apiDelete,
  Upload: upload,
  InitUpload: initUpload,
  WriteLog: writeLog,
  GetMPSettings: getMPSettings,
  LoginByToken: loginByToken,
  GetSupplier: getSupplier,
  IsUnloginStatus: isUnlogin
}
