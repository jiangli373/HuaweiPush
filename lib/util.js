/*!
 * 对返回结果的一层封装
 */
exports.wrapper = function (callback) {
  return function (err, data, res) {
    callback = callback || function () {};
    if (err) {
      err.name = 'HuaPushAPI' + err.name;
      return callback(err, data, res);
    }
    if (data && data.error) {
      err = new Error(data.error);
      err.name = 'HuaPushAPIError';
      err.code = data.error;
      return callback(err, data, res);
    }
    callback(null, data, res);
  };
};
