var config = require('./config');
var API = require('../');
var should = require('should');
describe('api_openpush_query_msg_result', function () {
  var api = new API(config.client_id, config.client_secret);

  before(function (done) {
    api.getAccessToken(done);
  });

  describe('api_openpush_query_msg_result', function () {
    it('should ok', function (done) {
      api.openpush_openapi_query_msg_result(
          {
              request_id:'14818089619584149946'
          }, function (err, data, res) {
            should(err).not.be.ok();
            should(data).be.equal("{\"result\":[],\"request_id\":\"14818089619584149946\"}");
            done();
      });
    });
  });

  describe('openpush_openapi_query_msg_result', function () {
    it('should not ok when lack of request_id', function (done) {
      api.openpush_openapi_query_msg_result(
          {

          }, function (err, data, res) {
            should(err).be.ok();
            should(err).be.equal('request_id 不能为空');
            done();
          });
    });
  });
});