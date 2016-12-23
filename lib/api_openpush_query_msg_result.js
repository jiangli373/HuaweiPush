var util = require('./util');
var wrapper = util.wrapper;

/**
 * 查询PUSH消息状态(貌似没有作用 查询不返回期望结果)
 * Examples:
 * ```
 * api.openpush_openapi_query_msg_result({request_id:'xxxxx'}, callback); expire_time  默认超时时间为当前时间后48小时
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
exports.openpush_openapi_query_msg_result = function (options, callback) {
  this.preRequest(this._openpush_openapi_query_msg_result, arguments);
};

exports._openpush_openapi_query_msg_result = function (options, callback) {

  if(!options.request_id){
    return callback('request_id 不能为空');
  }

  var TWODAYSMSECONDS = 172800000;
  var currentTime = Date.now();
  var nsp_ts = parseInt(currentTime/1000);
  var expire_time = !!options.expire_time?options.expire_time:currentTime + TWODAYSMSECONDS;
  var postData = {
    'access_token':this.token.accessToken,
    'nsp_fmt':'JSON',
    'nsp_svc':'openpush.openapi.query_msg_result',
    'nsp_ts':nsp_ts,
    'request_id':options.request_id
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