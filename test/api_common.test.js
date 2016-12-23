/**
 * Created by li.jiang on 2016/12/16.
 */
var API = require('../');
var urllib = require('urllib');
var config = require('./config');
var muk = require('muk');
var should = require('should');
describe('api_common', function () {
	describe('isAccessTokenValid', function () {
		it('should invalid', function () {
			var token = new API.AccessToken('token', new Date().getTime() - 7200 * 1000);
			token.isValid().should.not.be.ok();
		});

		it('should valid', function () {
			var token = new API.AccessToken('token', new Date().getTime() + 7200 * 1000);
			token.isValid().should.be.ok();
		});
	});

	describe('mixin', function () {
		it('should ok', function () {
			API.mixin({sayHi: function () {}});
			API.prototype.should.have.property('sayHi');
		});

		it('should not ok when override method', function () {
			var obj = {sayHi: function () {}};
			(function () {
				API.mixin(obj)
			}).should.throw(/Don't allow override existed prototype method\./);
		});
	});

	describe('getAccessToken', function () {
		it('should ok', function (done) {
			var api = new API(config.client_id, config.client_secret);
			api.getAccessToken(function (err, token) {
				should(err).not.be.ok();
				token.should.have.keys('accessToken', 'expireTime');
				done();
			});
		});

		it('should not ok', function (done) {
			var api = new API('appid', 'secret');
			api.getAccessToken(function (err, token) {
				err.should.have.property('name', 'HuaPushAPIError');
				err.should.property('message', '1101');
				done();
			});
		});

		describe('mock urllib err', function () {
			before(function () {
				muk(urllib, 'request', function (url, args, callback) {
					var err = new Error('Urllib Error');
					err.name = 'UrllibError';
					callback(err);
				});
			});

			after(function () {
				muk.restore();
			});

			it('should get mock error', function (done) {
				var api = new API('appid', 'secret');
				api.getAccessToken(function (err, token) {
					err.should.be.ok();
					err.should.have.property('name', 'HuaPushAPIUrllibError');
					err.should.property('message', 'Urllib Error');
					done();
				});
			});
		});

		describe('mock token', function () {
			before(function () {
				muk(urllib, 'request', function (url, args, callback) {
					process.nextTick(function () {
						callback(null, {"access_token": "ACCESS_TOKEN","expireTime": 7200});
					});
				});
			});
			after(function () {
				muk.restore();
			});

			it('should ok', function (done) {
				var api = new API('appid', 'secret');
				api.getAccessToken(function (err, token) {
					should(err).not.be.ok();
					token.should.have.property('accessToken', 'ACCESS_TOKEN');
					done();
				});
			});
		});

		describe('mock saveToken err', function () {
			var api = new API(config.client_id, config.client_secret);
			before(function () {
				muk(api, 'saveToken', function (token, callback) {
					process.nextTick(function () {
						callback(new Error('mock saveToken err'));
					});
				});
			});
			after(function () {
				muk.restore();
			});

			it('should ok', function (done) {
				api.getAccessToken(function (err, token) {
					should(err).be.ok();
					should(err).have.property('message', 'mock saveToken err');
					done();
				});
			});
		});
	});
	describe('preRequest', function () {
		it('should ok', function (done) {
			var api = new API(config.client_id, config.client_secret);
			api.preRequest(function (callback) {
				callback();
			}, [function (err) {
				should(err).not.be.ok();
				done();
			}]);
		});

		describe('mock getToken err', function () {
			var api = new API(config.client_id, config.client_secret);
			before(function () {
				muk(api, 'getToken', function (callback) {
					process.nextTick(function () {
						callback(new Error('mock getToken error'));
					});
				});
			});
			after(function () {
				muk.restore();
			});

			it('should not ok', function (done) {
				api.preRequest(function (callback) {
					callback();
				}, [function (err) {
					should(err).be.ok();
					should(err).have.property('message', 'mock getToken error');
					done();
				}]);
			});
		});

		describe('mock getAccessToken err', function () {
			var api = new API(config.client_id, config.client_secret);
			before(function () {
				muk(api, 'getAccessToken', function (callback) {
					process.nextTick(function () {
						callback(new Error('mock getAccessToken error'));
					});
				});
			});
			after(function () {
				muk.restore();
			});

			it('should not ok', function (done) {
				api.preRequest(function (callback) {
					callback();
				}, [function (err) {
					should(err).be.ok();
					should(err).have.property('message', 'mock getAccessToken error');
					done();
				}]);
			});
		});

		describe('mock getToken ok', function () {
			var api = new API(config.client_id, config.client_secret);
			before(function () {
				muk(api, 'getToken', function (callback) {
					process.nextTick(function () {
						callback(null, {accessToken: 'token', expireTime: (new Date().getTime() + 10000)});
					});
				});
			});
			after(function () {
				muk.restore();
			});

			it('should not ok', function (done) {
				api.preRequest(function (callback) {
					callback();
				}, [function (err) {
					should(err).not.be.ok();
					done();
				}]);
			});
		});

		describe('mock getToken ok with retry', function () {
			var api = new API(config.client_id, config.client_secret);
			before(function () {
				muk(api, 'getToken', function (callback) {
					process.nextTick(function () {
						callback(null, {accessToken: 'token', expireTime: (new Date().getTime() + 10000)});
					});
				});
			});

			after(function () {
				muk.restore();
			});

			it('should not ok', function (done) {
				var i = 0;
				api.preRequest(function (callback) {
					i++;
					if (i === 1) {
						callback(null, {errcode: 40001});
					} else {
						callback(null, {errcode: 0});
					}
				}, [function (err) {
					should(err).not.be.ok();
					done();
				}]);
			});
		});
	});
	//
	describe('getLatestToken', function () {
		it('should ok', function (done) {
			var api = new API(config.client_id, config.client_secret);
			api.getLatestToken(function (err, token) {
				should(err).not.be.ok();
				should(token).have.keys('accessToken', 'expireTime');
				done();
			});
		});
	//
		describe('mock getToken err', function () {
			var api = new API(config.client_id, config.client_secret);
			before(function () {
				muk(api, 'getToken', function (callback) {
					process.nextTick(function () {
						callback(new Error('mock getToken error'));
					});
				});
			});
			after(function () {
				muk.restore();
			});

			it('should not ok', function (done) {
				api.getLatestToken(function (err) {
					should(err).be.ok();
					should(err).have.property('message', 'mock getToken error');
					done();
				});
			});
		});

		describe('mock getToken ok', function () {
			var api = new API(config.client_id, config.client_secret);
			before(function () {
				muk(api, 'getToken', function (callback) {
					process.nextTick(function () {
						callback(null, {accessToken: 'token', expireTime: (new Date().getTime() + 10000)});
					});
				});
			});
			after(function () {
				muk.restore();
			});

			it('should not ok', function (done) {
				api.getLatestToken(function (err, token) {
					should(err).not.be.ok();
					should(token).have.property('accessToken');
					should(token).have.property('expireTime');
					done();
				});
			});
		});
	});
});