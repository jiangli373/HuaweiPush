var util = require('./util');
var wrapper = util.wrapper;
var moment = require('moment');
/**
 * 单发通知栏及时消息
 * Examples:
 * ```
 * api.openpush_message_psSingleSend({deviceToken:'xxxxx',android:{'title':'xxxxx',body:'xxxxxxxx'},expire_time:5*60*1000}, callback);
 * ```
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * {
 *  "resultcode ":"0",
 *  "message":"success",
 *  "requestID":"201608231040425822EF0CD"
 * }
 * {
 *  message: 'Illegal token.',
 *  requestID: '14817900963841715353',
 *  resultcode: 80200004
 * }
 * ```
 * @param {String|Object} options
 * @param {Function} callback 回调函数
 */
exports.openpush_message_psSingleSend = function (options, callback) {
  this.preRequest(this._openpush_message_psSingleSend, arguments);
};

/*!
 * 单发通知栏及时消息未封装版本
 */
exports._openpush_message_psSingleSend = function (options, callback) {

  if(!options.deviceToken){
    return callback('deviceToken 不能为空');
  }
  if(!options.android){
    return callback('android 不能为空');
  }
  var TWODAYSMSECONDS = 172800000;
  var currentTime = Date.now();
  var nsp_ts = parseInt(currentTime/1000);
  var expire_time = !!options.expire_time?currentTime + options.expire_time:currentTime + TWODAYSMSECONDS;
  expire_time = moment(expire_time).format('YYYY-MM-DD hh:mm'); //格式 2013-08-29 19:55 消息过期删除时间  如果不填写，默认超时时间为当前时间后48小时
  var postData = {
    'access_token':this.token.accessToken,
    'msgType':1,
    'cacheMode':1,
    'nsp_fmt':'JSON',
    'userType':0,
    'expire_time':expire_time,
    'nsp_svc':'openpush.message.psSingleSend',
    'nsp_ts':nsp_ts,
    'android':JSON.stringify(options.android),   //"{\"notification_title\":\"the good news!\",\"notification_content\":\"Price reduction!\",\"doings\":3,\"url\":\"vmall.com\"}"  最长为4096 字节（开发者自定义，自解析）
    'deviceToken':options.deviceToken
  };
  var url = this.SENDMESSAGEPrefix;

  this.request(url, {
    dataType: 'json',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data:postData
  }, wrapper(callback));
};