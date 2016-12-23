## 华为推送
[![Build Status](https://travis-ci.org/jiangli373/HuaweiPush.svg?branch=master)](https://travis-ci.org/jiangli373/HuaweiPush)[![Coverage Status](https://coveralls.io/repos/github/jiangli373/HuaweiPush/badge.svg?branch=master)](https://coveralls.io/github/jiangli373/HuaweiPush?branch=master)

    npm install huaweihush --save

### 用法

    var fs = require('fs');
    var API = require('huaweihush');
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
    
#### 单个透传消息

    api.openpush_message_single_send(
    		{
                deviceToken:'xxxxxxx',
                message:'hello',
                expire_time:5*60*1000 //过期时间 ms 5分钟后过期  可以不传 默认是两天
    		},
    		function (err, data) {
    			if(err) console.error(err);
    			else console.log('openpush_message_single_send==========>',data);
    		});
    		
#### 群发透传消息

    api.openpush_message_batch_send(
        {
            deviceTokens:['xxxxxxx','dddddddddd'],
            message:'hello',
            expire_time:5*60*1000 //过期时间 ms 5分钟后过期  可以不传 默认是两天
        },
        function (err, data) {
            if(err) console.error(err);
            else console.log('openpush_message_batch_send==========>',data);
        });
#### 单发通知栏消息

    api.openpush_message_psSingleSend(
        {
            deviceToken:'xxxxxxx',
            android:{'title':'hello','body':'dasdasdsad'},
            expire_time:5*60*1000 //过期时间 ms 5分钟后过期  可以不传 默认是两天
        },
        function (err, data) {
            if(err) console.error(err);
            else console.log('openpush_message_psSingleSend==========>',data);
        });
#### 群发通知栏消息

    api.openpush_message_psBatchSend(
        {
            deviceTokens:['xxxxxxx','dddddddddd'],
            android:{'title':'hello','body':'dasdasdsad'},
            expire_time:5*60*1000 //过期时间 ms 5分钟后过期  可以不传 默认是两天
        },
        function (err, data) {
            if(err) console.error(err);
            else console.log('openpush_message_psBatchSend==========>',data);
        });