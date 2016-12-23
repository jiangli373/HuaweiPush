var API = require('./lib/api_common');
API.mixin(require('./lib/api_openpush_message_single_send'));//单发透传消息
API.mixin(require('./lib/api_openpush_message_batch_send'));   //群发透传消息
API.mixin(require('./lib/api_openpush_message_psSingleSend'));  //单发通知栏消息
API.mixin(require('./lib/api_openpush_message_psBatchSend'));   //群发通知栏消息
API.mixin(require('./lib/api_openpush_query_msg_result.js'));   //查询消息

module.exports = API;
