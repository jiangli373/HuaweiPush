/**
 * Created by li.jiang on 2016/12/15.
 */
/**
 * Created by li.jiang on 2016/12/15.
 */

var APPID = 'xxxxx';
var APPSECRET = 'xxxxxxx';
var API = require('../index');
var fs = require('fs');
var api = new API(APPID, APPSECRET, function (callback) {

	// 传入一个获取全局token的方法
	   fs.readFile(__dirname+'/access_token.txt', 'utf8', function (err, txt) {
		    if (err) {return callback(err);}
		    console.log('===txt====',txt);
		    if(txt){
			    callback(null, JSON.parse(txt));
		    }else{
			    callback(null, null);
		    }

	   });
}, function (token, callback) {
	// 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
	// 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
	fs.writeFile(__dirname+'/access_token.txt', JSON.stringify(token), callback);
});

api.openpush_message_single_send(
	{deviceToken:'0867981021055317300000147700CN01',message:
		{
			'notification_title':'透传消息'+Date.now(),
			'notification_content':'透传body'+Date.now(),
			"doings":1,
			"image":"https://p1.bpimg.com/524586/475bc82ff016054ds.jpg"
		}
	},
	function (err, data) {
		if(err) console.error(err);
		else console.log('openpush_message_single_send==========>',data);
	});
// api.openpush_message_batch_send(
// 	{
// 		deviceTokens:['0865814026052728300000147700CN01','0867981021055317300000147700CN01'],
// 		message:{
// 			'notification_title':'透传消息'+Date.now(),
// 			'notification_content':'透传body'+Date.now(),
// 			"doings":1,
// 			"image":"https://p1.bpimg.com/524586/475bc82ff016054ds.jpg"
// 		}
// 	},
// 	function (err, data) {
// 		if(err) console.error(err);
// 		else console.log('openpush_message_batch_send==========>',data);
// 	});
// api.openpush_message_psSingleSend(
// 	{
// 		deviceToken:'0867981021055317300000147700CN01',
// 		android:'ddddd'
// 	},
// 	function (err, data) {
// 		if(err) console.error(err);
// 		else console.log('openpush_message_psSingleSend==========>',data);
// 	});
// api.openpush_message_psBatchSend(
// 	{
// 		deviceTokens:['0865814026052728300000147700CN01','0867981021055317300000147700CN01'],
// 		android:{
// 			'notification_title':'消息'+Date.now(),
// 			'notification_content':'body'+Date.now(),
// 			"doings":1,
// 			"image":"https://p1.bpimg.com/524586/475bc82ff016054ds.jpg"
// 		}
// 	},
// 	function (err, data) {
// 		if(err) console.error(err);
// 		else console.log('openpush_message_psBatchSend==========>',data);
// 	});
// api.openpush_openapi_query_msg_result(
// 	{
// 		request_id:'14818428944056134'
// 	},
// 	function (err, data) {
// 		if(err) console.error(err);
// 		else console.log('openpush_message_psSingleSend==========>',data);
// 	});
