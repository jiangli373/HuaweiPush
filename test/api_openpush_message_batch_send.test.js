var config = require('./config');
var API = require('../');
var should = require('should');
describe('api_openpush_message_batch_send', function () {
  var api = new API(config.client_id, config.client_secret);

  before(function (done) {
    api.getAccessToken(done);
  });

  describe('openpush_message_batch_send', function () {
    it('should ok without expire_time', function (done) {
      api.openpush_message_batch_send(
          {
            deviceTokens:['0865814026052728300000147700CN01','0867981021055317300000147700CN01'],
            message:{
              'notification_title':'透传消息'+Date.now(),
              'notification_content':'透传body'+Date.now(),
              "doings":1,
              "image":"https://p1.bpimg.com/524586/475bc82ff016054ds.jpg"
            }
          }, function (err, data, res) {
            should(err).not.be.ok();
            should(data).have.keys('resultcode', 'message', 'requestID');
            done();
      });
    });
  });
  describe('openpush_message_batch_send', function () {
      it('should ok with expire_time', function (done) {
          api.openpush_message_batch_send(
            {
                deviceTokens:['0865814026052728300000147700CN01','0867981021055317300000147700CN01'],
                expire_time:5*60*1000,
                message:{
                    'notification_title':'透传消息'+Date.now(),
                    'notification_content':'透传body'+Date.now(),
                    "doings":1,
                    "image":"https://p1.bpimg.com/524586/475bc82ff016054ds.jpg"
                }
            }, function (err, data, res) {
                should(err).not.be.ok();
                should(data).have.keys('resultcode', 'message', 'requestID');
                done();
            });
      });
  });
  describe('openpush_message_batch_send', function () {
    it('should not ok when lack of message', function (done) {
      api.openpush_message_batch_send(
          {
            deviceTokens:['0865814026052728300000147700CN01','0867981021055317300000147700CN01'],
          }, function (err, data, res) {
            should(err).be.ok();
            should(err).be.equal('message 不能为空');
            done();
          });
    });
  });
  describe('openpush_message_batch_send', function () {
    it('should not ok when lack of deviceTokens', function (done) {
      api.openpush_message_batch_send(
          {
            message:{
              'notification_title':'透传消息'+Date.now(),
              'notification_content':'透传body'+Date.now(),
              "doings":1,
              "image":"https://p1.bpimg.com/524586/475bc82ff016054ds.jpg"
            }
          }, function (err, data, res) {
            should(err).be.ok();
            should(err).be.equal('deviceTokens 不能为空');
            done();
          });
    });
  });
});