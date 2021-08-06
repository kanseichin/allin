/**
 * 手机号
 */
function checkTel (text) {
  // return /^1[0345789]\d{9}$/.test(text)
  return /^\d{11}$/.test(text)
}

/**
 * 银行卡号
 */
function checkCardNo (text) {
  return /^\d{16,19}$/.test(text)
}

/**
 * 身份证号
 */
function checkIdcard (text) {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(text)
}

/**
 * 6-20位密码
 */
function checkPassword (text) {
  return /^[\S]{6,20}$/.test(text)
}

/**
 * 6-20位非纯数字或字母
 */
function checkPassword2 (text) {
  return /^(?![^A-Za-z]+$)(?![^0-9]+$)[\x21-x7e]{6,20}$/.test(text)
}

/**
 * 6位数字
 */
function checkMobileCode (text) {
  return /^\d{6}$/.test(text)
}

/**
 * 金额输入格式
 */
function checkAmount (text) {
  return /^[0-9]+(.[0-9]{1,2})?$/.test(text)
}

/**
 * 中文、英文、数字
 */
function checkName2 (text) {
  return /[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im.test(text)
}

/**
 * 姓名 2-6位汉字
 */
function checkName (text) {
  return /^[\u4E00-\u9FA5]{2,10}$/.test(text)
}

/**
 * 获取字节长度（中文算两个长度，英文数字算一个长度）
 * @param {string} str 待判定长度的字符串
 */
function gbLength (str) {
  if (!str || typeof str !== 'string') return 0

  var len = 0;
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
        len += 2;
    } else {
      len++;
    }
  }

  return len;
}

/**
 * 根据字节长度截取字符串
 * @param {string} source 待截取的字符串
 * @param {number} from 开始索引
 * @param {number} length 要截取的长度（中文算一个长度，英文数字算两个长度）
 */
function gbSubstr (source, from, length) {
  if (!source || typeof source !== 'string') return source

  from = typeof from === 'number' ? from : 0
  length = typeof length === 'number' ? length : 0

  var len = 0;
  var str = ''
  for (var i = from; i < source.length; i++) {
    if (source.charCodeAt(i) > 127 || source.charCodeAt(i) === 94) {
      len++
    } else {
      len += 0.5
    }

    if (len > length) break

    str += source[i]
  }

  return str;
}

function randomString (len) {
  len = len || 32
  // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  var maxPos = $chars.length
  var pwd = ''
  for (var i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

function trimStart (str, s) {
  if (!str) return str
  s = (s || '\\s') // 没有传入参数的，默认去空格
  s = ('(' + s + ')')
  var regTrim = new RegExp('^' + s + '*', 'g') // 拼正则
  return str.replace(regTrim, '')
}

function trimEnd (str, s) {
  if (!str) return str
  s = (s || '\\s')
  s = ('(' + s + ')')
  var regTrim = new RegExp(s + '*$', 'g')
  return str.replace(regTrim, '')
}

function trim (str, s) {
  if (!str) return str
  s = (s || '\\s')
  s = ('(' + s + ')')
  var regTrim = new RegExp('(^' + s + '*)|(' + s + '*$)', 'g')
  return str.replace(regTrim, '')
}

// 扩大分隔符，默认分隔符为斜杠"/"
function enlargeSeparator(str, separator) {
  if (!str) return str

  separator = separator || '/'
  if (str.indexOf(separator) === -1) return str

  var arr = str.split('/')
  str = trim(arr[0])
  for (let i = 1; i < arr.length; i++) {
    str += ' ' + separator + ' ' + trim(arr[i])
  }

  return str
}

function showAmount (amount, fraction) {
  fraction = fraction > 0 && fraction <= 20 ? fraction : 2
  amount = parseFloat((amount + '').replace(/[^\d.-]/g, '')).toFixed(fraction) + ''
  let l = amount.split('.')[0].split('').reverse()
  let r = amount.split('.')[1]
  let t = ''
  for (var i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
  }
  return t.split('').reverse().join('') + '.' + r
}

function showName (name) {
  if (!name) return ''
  return name.substr(0, 1) + '**'
}

function showName2 (name) {
  if (!name) return ''
  return new Array(name.length).join('*') + name.substr(-1)
}

function showCardNo (cardno) {
  if (!cardno) return ''
  return '尾号' + cardno.substr(cardno.length - 4)
}

// 银行卡后四位数字显示，其他位数以星号代替
function showCardNo2 (cardno) {
  let lastFour = cardno.slice(-4)
  let newArr = new Array(cardno.length - 3).join('*') + lastFour
  newArr = newArr.replace(/\s/g, '').replace(/(.{4})/g, '$1 ')
  return newArr
}

// 银行卡前后四位数字显示，其他位数以星号代替
function showCardNo3 (cardno) {
  var reg = /^(\d{4})\d+(\d{4})$/

  return cardno.replace(reg, '$1 **** **** $2')
}

function showPhone (phone) {
  return phone.replace(/(\d{4})\d{4}(\d{3})/, '$1****$2')
}

function getDecimal (number) {
  if (!number) return '00'
  var arr = parseFloat(number).toFixed(2).split('.')
  return arr[1]
}

function formatAmount (amount) {
  var dot = amount.indexOf('.')
  return /^\d+\.?\d{0,2}$/.test(amount) ? amount : amount.substring(0, dot + 3)
}

function clone (obj) {
  if (typeof obj !== 'object') return obj
  if (obj === null) return null
  var o
  if (obj instanceof Array) {
    o = []
    for (var i = 0, len = obj.length; i < len; i++) {
      o.push(clone(obj[i]))
    }
  } else {
    o = {}
    for (var j in obj) {
      o[j] = clone(obj[j])
    }
  }

  return o
}

/**
 * 转换数字金额
 *  @param source string/number 源金额
 *  @param precision number 转换后的精度，默认为0（如果需保留两位小数位，可为"2"）
 *  @param multiple number 转换金额相对于源金额的倍数，默认为1（如果是"元"转"分",可为"100";如果是"分"转"元",可为"0.01")
 */
function convertDecimal (source, precision, multiple) {
  if (typeof source === "string") {
    source = parseFloat(source);
  }

  if (typeof source !== "number" || isNaN(source)) {
    source = 0;
  }

  multiple = typeof multiple === "number" ? multiple : 1;
  precision = typeof precision === "number" ? precision : 0;

  return (source * multiple).toFixed(precision);
}

/**
 * 分隔金额整数与小数部分，返回长度为2的字符串数组
 * @param {string/number} source 源金额
 * @param {numnber} precision 分隔的小数部分的精度，默认为2（如果需保留两位小数位，可为"2"）
 */
function splitDecimal (source, precision) {
  if (typeof source === "string") {
    source = parseFloat(source);
  }

  if (typeof source !== "number" || isNaN(source)) {
    source = 0;
  }

  precision = typeof precision === "number" ? precision : 2;
  var arr = source.toFixed(precision).split('.')
  if (arr.length === 2) return arr

  return [arr[1], '']
}

function replaceNondigital (value) {
  return ((value || '') + '').replace(/[^0-9]/ig, '');
}

function replaceNondecimal (value, precision) {
  precision = typeof precision === "number" ? precision : 2;

  value = ((value || '') + '').replace(/[^0-9.]/ig, '');
  if (value === '.') value = '0.'

  if (value && value.indexOf('.') !== value.lastIndexOf('.')) {
    value = parseFloat(value)
    if (isNaN(value)) return ''

    value += ''
  }

  var arr = value.split('.')
  if (arr.length === 2 && arr[1].length > precision) {
    value = arr[0] + '.' + arr[1].substr(0, precision)
  }

  return value
}

function startWith (str, start) {
  var reg = new RegExp('^' + start)
  return reg.test(str)
}

function endWith (str, end) {
  var reg = new RegExp(end + '$')
  return reg.test(str)
}

function dateFormat (date, fmt) {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  }
  return fmt
}

function showDate (date) {
  if (typeof (date) === 'string') { date = new Date(date) }
  var compareDate = new Date(dateFormat(date, 'yyyy-MM-dd'))
  var now = new Date()
  var day = ''

  var diffDays = parseInt((now.getTime() - compareDate.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) {
    day = '今日'
  } else if (diffDays === 1) {
    day = '昨日'
  } else if (diffDays === 2) {
    day = '前日'
  } else if (date.getFullYear() === now.getFullYear()) { day = dateFormat(date, 'MM-dd') } else { day = dateFormat(date, 'yyyy-MM-dd') }

  return `${day} ${dateFormat(date, 'hh:mm')}`
}

// 今日（M-dd）/昨日 hh:mm/M-dd hh:mm
function showDate2 (date) {
  if (typeof (date) === 'string') {
    date = new Date(date.replace(/-/ig, '/'))
  }

  var onlyDay = date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0
  var now = new Date()
  var compareDate = new Date(dateFormat(date, 'yyyy-MM-dd'))

  var diffDays = parseInt((now.getTime() - compareDate.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) {
    return `今日(${dateFormat(date, onlyDay ? 'M-dd' : 'hh:mm')})`
  }

  if (diffDays === 1) {
    return `昨日 ${dateFormat(date, onlyDay ? 'M-dd' : 'hh:mm')}`
  }

  return dateFormat(date, onlyDay ? 'M-dd' : 'M-dd hh:mm')
}

function showWeek (date) {
  if (typeof (date) === 'string') { date = new Date(date) }

  var week = ''
  switch (date.getDay()) {
    case 0: week = '周日'
      break
    case 1: week = '周一'
      break
    case 2: week = '周二'
      break
    case 3: week = '周三'
      break
    case 4: week = '周四'
      break
    case 5: week = '周五'
      break
    case 6: week = '周六'
      break
  }

  return week
}

function addByTransDate (dateParameter, num) {
  var translateDate = ''
  var dateString = ''
  var monthString = ''
  var dayString = ''
  translateDate = dateParameter.replace('-', '/').replace('-', '/')
  var newDate = new Date(translateDate)
  newDate = newDate.valueOf()
  newDate = newDate + num * 24 * 60 * 60 * 1000
  newDate = new Date(newDate)
  // 如果月份长度少于2，则前加 0 补位
  if ((newDate.getMonth() + 1).toString().length === 1) {
    monthString = 0 + '' + (newDate.getMonth() + 1).toString()
  } else {
    monthString = (newDate.getMonth() + 1).toString()
  }
  // 如果天数长度少于2，则前加 0 补位
  if (newDate.getDate().toString().length === 1) {
    dayString = 0 + '' + newDate.getDate().toString()
  } else {
    dayString = newDate.getDate().toString()
  }
  dateString = newDate.getFullYear() + '-' + monthString + '-' + dayString
  return dateString
}

/**
* 获取上一个月
*
* @date 格式为yyyy-mm-dd的日期，如：2014-01-25
*/
function getPreMonth (date) {
  var arr = date.split('-')
  var year = arr[0] // 获取当前日期的年份
  var month = arr[1] // 获取当前日期的月份
  var day = arr[2] // 获取当前日期的日
  var year2 = year
  var month2 = parseInt(month) - 1
  if (month2 === 0) {
    year2 = parseInt(year2) - 1
    month2 = 12
  }
  var day2 = day
  var days2 = new Date(year2, month2, 0)
  days2 = days2.getDate()
  if (day2 > days2) {
    day2 = days2
  }
  if (month2 < 10) {
    month2 = '0' + month2
  }
  var t2 = year2 + '-' + month2 + '-' + day2
  return t2
}

/**
* 获取下一个月
*
* @date 格式为yyyy-mm-dd的日期，如：2014-01-25
*/
function getNextMonth (date) {
  var arr = date.split('-')
  var year = arr[0] // 获取当前日期的年份
  var month = arr[1] // 获取当前日期的月份
  var day = arr[2] // 获取当前日期的日
  var year2 = year
  var month2 = parseInt(month) + 1
  if (month2 === 13) {
    year2 = parseInt(year2) + 1
    month2 = 1
  }
  var day2 = day
  var days2 = new Date(year2, month2, 0)
  days2 = days2.getDate()
  if (day2 > days2) {
    day2 = days2
  }
  if (month2 < 10) {
    month2 = '0' + month2
  }

  var t2 = year2 + '-' + month2 + '-' + day2
  return t2
}

function getFileType (filetype, filename) {
  if (filetype.match('^image/')) {
    return 'img'
  } else if (filetype.match(/pdf$/)) {
    return 'pdf'
  } else if (filetype.match(/(msword|wordprocessingml.document)$/)) {
    return 'word'
  } else if (filetype.match(/(ms-excel|spreadsheetml.sheet)$/)) {
    return 'excel'
  } else if (filetype.match('^video/')) {
    return 'video'
  } else if (filetype.match('^text/')) {
    return 'text'
  }

  if (!filename) return
  // 没有文件类型,只能根据文件名后缀判断
  let ext = getFileExtension(filename)
  let type = ''
  switch (ext) {
    case '.xlsx' :
    case '.xls' : type = 'excel'; break
    case '.txt': type = 'text'; break
    case '.jpg' :
    case '.png' :
    case '.jpeg' :
    case '.bmp' :
    case '.gif': type = 'img'; break
    case '.mp4': type = 'video'; break
    case '.pdf': type = 'pdf'; break
  }

  return type
}

function getFileExtension(filename) {
  var startIndex = filename.lastIndexOf('.')
  if (startIndex !== -1) {
    return filename.substring(startIndex, filename.length).toLowerCase()
  }

  return ''
}

/**
 * 指定字节长度截取字符串
 * @param {string} pStr 字符串
 * @param {int} pLen 截取长度
 */
function substrByByte (pStr, pLen) {
  var _strLen = pStr.length
  var _cutString
  var _lenCount = 0
  var _ret = false
  if (_strLen <= pLen / 2) {
    _cutString = pStr
    _ret = true
  }

  if (!_ret) {
    for (var i = 0; i < _strLen; i++) {
      if (isFull(pStr.charAt(i))) {
        _lenCount += 2
      } else {
        _lenCount += 1
      }

      if (_lenCount > pLen) {
        _cutString = pStr.substring(0, i)
        _ret = true
        break
      } else if (_lenCount === pLen) {
        _cutString = pStr.substring(0, i + 1)
        _ret = true
        break
      }
    }
  }

  if (!_ret) {
    _cutString = pStr
    _ret = true
  }

  // return { 'cutstring': _cutString, 'cutflag': _cutFlag }
  return _cutString
}

function replaceAll (str, original, text) {
  var regTrim = new RegExp(original, 'g')
  return str.replace(regTrim, text)
}

/**
 * 判断是否为全角
 * @param {char} pChar
 */
function isFull (pChar) {
  if ((pChar.charCodeAt(0) > 128)) {
    return true
  } else {
    return false
  }
}

function alert (text, success, fail) {
  var obj = typeof text === "object" ? text : {
    title: text || '网络错误',
    icon: 'none',
    duration: 2000,
    success: () => {
      setTimeout(() => {
        typeof success === "function" && success()
      }, 2000);
    },
    fail: fail
  };

  wx.showToast(obj)
}

function success (text) {
  wx.showToast({
    title: text,
    icon: 'success',
    duration: 2000
  })
  setTimeout(() => {
    wx.hideToast()
  }, 2000)
}

function confirm (text, success, fail) {
  var obj = (typeof text === "object") ? text : {
    content: text,
    success: success,
    fail: fail
  };
  wx.showModal(obj);
}

/**
 * 获取当前路径参数
 * 不用mpvue提供的this.$root.$mp.query
 * 因为其进入同一页面，参数不会变化
*/
function getQuery () {
  /* eslint-disable */
  /* 获取当前路由栈数组 */
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = currentPage.options

  return options
}

/**
 * 获取当前路由栈数组
*/
function getPages () {
  const pages = getCurrentPages()
  return pages
}

/**
 * 获取当前路由栈数组
*/
function getCurrentPage () {
  const pages = getCurrentPages()
  if(!pages || pages.length == 0) return null

  return pages[pages.length - 1]
}

function navigateTo (url, isCheck) {
  if (isCheck) {
    if (App.I77AccountInfo && (!App.I77AccountInfo.ShopName || !App.I77AccountInfo.IsBindBankCard || !App.I77AccountInfo.PayPwdStatus)) {
      wx.navigateTo({ url: '../open/main' })
      return
    }
  }
  wx.navigateTo({ url: url })
}

function getSceneObj (scene) {
  var obj = {};

  if (!scene) return obj;

  scene = decodeURIComponent(decodeURIComponent(scene));
  console.log('scene', scene);

  var strs = scene.split("&");
  var ps;
  for (var i = 0; i < strs.length; i++) {
    ps = strs[i].split("=");
    obj[ps[0]] = unescape(ps[1]);
  }

  return obj;
}

function pcForAlert (alertText) {
  console.log('Alert_' + alertText)
  alert('Alert_' + alertText)
}

export default {
  pcForAlert,
  addByTransDate,
  alert,
  checkTel,
  checkCardNo,
  checkIdcard,
  checkPassword,
  checkPassword2,
  checkMobileCode,
  checkAmount,
  checkName,
  checkName2,
  confirm,
  clone,
  dateFormat,
  endWith,
  convertDecimal,
  splitDecimal,
  formatAmount,
  replaceNondigital,
  replaceNondecimal,
  getDecimal,
  getPreMonth,
  getNextMonth,
  getFileType,
  getQuery,
  getPages,
  getCurrentPage,
  getSceneObj,
  getFileExtension,
  navigateTo,
  randomString,
  gbLength,
  gbSubstr,
  replaceAll,
  trim,
  trimStart,
  trimEnd,
  enlargeSeparator,
  showAmount,
  showName,
  showName2,
  showCardNo,
  showCardNo2,
  showCardNo3,
  showPhone,
  startWith,
  showDate,
  showDate2,
  showWeek,
  substrByByte,
  success
}
