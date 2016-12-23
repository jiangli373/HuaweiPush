var util = require('./util');
var wrapper = util.wrapper;
var moment = require('moment');
/**
 * 群发透传及时消息
 * Examples:
 * ```
 * api.openpush_message_batch_send({deviceTokens:['xxxxx','sdddddddd'],message:'xxxxxx',expire_time:5*60*1000}, callback);
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
 * ```
 * @param {String|Object} options
 * @param {Function} callback 回调函数
 */
exports.openpush_message_batch_send = function (options, callback) {
  this.preRequest(this._openpush_message_batch_send, arguments);
};

exports._openpush_message_batch_send = function (options, callback) {

  if(!options.deviceTokens){
    return callback('deviceTokens 不能为空');
  }
  if(!options.message){
    return callback('message 不能为空');
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
    'priority':0,
    'nsp_svc':'openpush.message.batch_send',
    'nsp_ts':nsp_ts,
    'expire_time':expire_time,
    'message':JSON.stringify(options.message),
    'deviceTokenList':JSON.stringify(options.deviceTokens)
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