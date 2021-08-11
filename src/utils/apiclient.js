import axios from 'axios'

const ApiHost = 'http://121.37.190.224'

const _api = {
  // getBaiduHotNews: '/app/hs/baidu'
  getBaiduHotNews: '/HSBaseWeb/hs/baidu'
}

const NoAuth = {
  Processing: false,
  Action: null
}

const setAuthAction = function(action){
  NoAuth.Action = action
}

const request = function (method, apiUrl, param) {
  console.log('request', apiUrl)
  var paramStr = formatParamStr(param)
  var requestPromise = new Promise((resolve, reject) => {
    axios({
      url: apiUrl,
      data: paramStr,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      method: method
    }).then((e) => {
      console.log('request123', e.data)
      let res = e.data
      if (res.status === 1 || res.status === 200) {
        resolve(res)
      } else {
        // console.log(JSON.stringify(res))
        reject(res)
      }
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  })

  return requestPromise
}

const upload = function (formData, type) {
  var requestPromise = new Promise((resolve, reject) => {
    let url = UploadUrl
    if (type) url += `?type=${type}`
    axios({
      url: url,
      data: formData,
      headers: { 'content-type': 'multipart/form-data' },
      method: 'post'
    }).then(function (res) {
      resolve(res.data)
    }).catch(function (err) {
      reject(err)
    })
  })

  return requestPromise
}

const qiniuToken = {
  uptoken: '',
  getting: false,
  domain: '',
  expire: -1,
  private: false
}
const upload2Qiniu = async function (file, isPrivate) {
  isPrivate = isPrivate || false
  let timeStamp = new Date().getTime()
  if (!qiniuToken.uptoken || qiniuToken.expire < timeStamp || qiniuToken.private != isPrivate) {
    // 正在获取token
    if(qiniuToken.getting){
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          upload2Qiniu(file, isPrivate).then(resolve).catch(reject)
        },500)
      }) 
    }

    await getQiniuToken(isPrivate)
  }

  return uploadPromise(file)
}

const uploadPromise = function(file) {
  let key = Utils.uuid(32) + Utils.getFileExtension(file.name)
  var requestPromise = new Promise((resolve, reject) => {
    let observable = qiniu.upload(file, key, qiniuToken.uptoken)
    observable.subscribe({
      next: (res) => {
        console.log('next', res)
      },
      error: (err) => {
        console.log('err', err)
        if(err.code == 401) { // token失效
          qiniuToken.uptoken = ''
        }
        reject(err)
      },
      complete: (res) => {
        console.log('complete', res)
        let url = qiniuToken.domain + key
        resolve({
          key: key,
          url: url
        })
      }
    })
    // subscription.unsubscribe() // 上传取消
  })

  return requestPromise
}

const login = function () {
  return apiPost(_api.LoginByToken, {})
    .then((e) => {
      console.log(e)
    })
}

const apiGet = function (action, param, noAuthCallback) {
  var apiUrl = ApiHost + action
  return request('get', apiUrl, param, noAuthCallback)
}

const apiPost = function (action, param, noAuthCallback) {
  var apiUrl = ApiHost + action
  return request('post', apiUrl, param, noAuthCallback)
}

const writeLog = function (message) {
  return apiPost(_api.WriteLog, {
    message: message,
    version: sessionStorage.getItem('AppVersion')
  }).then(() => { })
}

/**
 * Format params into querying string.
 * @param {{}}
 * @return {string[]}
 */
function formatParams(queryName, value) {
  queryName = queryName.replace(/=/g, '')
  var result = []
  if (value === null || value === undefined) return result
  switch (value.constructor) {
    case String:
    case Number:
    case Boolean:
      result.push(encodeURIComponent(queryName) + '=' + encodeURIComponent(value))
      break
    case Array:
      value.forEach(function (item) {
        result = result.concat(formatParams(queryName + '[]=', item))
      })
      break
    case Object:
      Object.keys(value).forEach(function (key) {
        var item = value[key]
        result = result.concat(formatParams(queryName + '[' + key + ']', item))
      })
      break
  }

  return result
}

/**
 * Flat querys.
 * @param {any} array
 * @returns
 */
function flatten(array) {
  var querys = []
  array.forEach(function (item) {
    if (typeof item === 'string') {
      querys.push(item)
    } else {
      querys = querys.concat(flatten(item))
    }
  })

  return querys
}

function formatParamStr(params) {
  var queryStrs = []
  Object.keys(params).forEach(function (queryName) {
    queryStrs = queryStrs.concat(formatParams(queryName, params[queryName]))
  })

  return flatten(queryStrs).join('&')
}

function getQiniuToken(isPrivate) {
  qiniuToken.getting = true
  let api = isPrivate? _api.GetQiniuPrivateToken:_api.GetQiniuToken
  return apiPost(api, {}).then(e => {
    qiniuToken.uptoken = e.data.uptoken
    qiniuToken.domain = e.data.domain
    let deadline = new Date().getTime() + (55 * 60 * 1000)
    qiniuToken.expire = deadline
    qiniuToken.getting = false
    qiniuToken.private = isPrivate || false
  }).catch(()=>{
    qiniuToken.getting = false
  })
}

const setToken = function (userinfo) {
  sessionStorage.setItem('CurrentUser', JSON.stringify(userinfo))
}

const removeToken = function () {
  sessionStorage.removeItem('CurrentUser')
}

const currentUser = function () {
  var currentUser = sessionStorage.getItem('CurrentUser')
  return currentUser && JSON.parse(currentUser)
}

export default {
  Apis: _api,
  SetToken: setToken,
  SetAuthAction: setAuthAction,
  RemoveToken: removeToken,
  CurrentUser: currentUser,
  LoginByToken: login,
  Get: apiGet,
  Post: apiPost,
  Upload: upload,
  Upload2Qiniu: upload2Qiniu,
  WriteLog: writeLog
}
