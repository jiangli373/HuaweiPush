var config = require('./config');
var API = require('../');
var should = require('should');
describe('api_openpush_message_psSingleSend', function () {
  var api = new API(config.client_id, config.client_secret);

  before(function (done) {
    api.getAccessToken(done);
  });

  describe('openpush_message_psSingleSend', function () {
    it('should ok without expire_time', function (done) {
      api.openpush_message_psSingleSend(
          {
            deviceToken:'0865814026052728300000147700CN01',
              android:{
                  'notification_title':'hello',
                  'notification_content':'dasdasdsad',
                  "doings":1
              }
          }, function (err, data, res) {
            should(err).not.be.ok();
            should(data).have.keys('resultcode', 'message', 'requestID');
            done();
      });
    });
  });
    describe('openpush_message_psSingleSend', function () {
        it('should ok with expire_time', function (done) {
            api.openpush_message_psSingleSend(
                {
                    deviceToken:'0865814026052728300000147700CN01',
                    android:{
                        'notification_title':'hello',
                        'notification_content':'dasdasdsad',
                        "doings":1
                    },
                    expire_time:5*60*1000
                }, function (err, data, res) {
                    should(err).not.be.ok();
                    should(data).have.keys('resultcode', 'message', 'requestID');
                    done();
                });
        });
    });
  describe('openpush_message_psSingleSend', function () {
    it('should not ok with wrong android', function (done) {
        api.openpush_message_psSingleSend(
            {
                deviceToken:'0865814026052728300000147700CN01',
                android:'message'
            }, function (err, data, res) {
                should(err).not.be.ok();
                should(data).have.keys('resultcode', 'message', 'requestID');
                should(data.message).be.equal('Illegal message.');
                done();
            });
    });
  });
  describe('openpush_message_psSingleSend', function () {
    it('should not ok when lack of message', function (done) {
      api.openpush_message_psSingleSend(
          {
            deviceToken:'0865814026052728300000147700CN01',
          }, function (err, data, res) {
            should(err).be.ok();
            should(err).be.equal('android 不能为空');
            done();
          });
    });
  });
  describe('openpush_message_psSingleSend', function () {
    it('should not ok when lack of deviceToken', function (done) {
      api.openpush_message_psSingleSend(
          {
              android:{
                  'notification_title':'hello',
                  'notification_content':'dasdasdsad',
                  "doings":1
              }
          }, function (err, data, res) {
            should(err).be.ok();
            should(err).be.equal('deviceToken 不能为空');
            done();
          });
    });
  });
});