const Promise = require("./es6-promise.js").Promise;

const req = (url, data, method) => {
  var headers = {
    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
  };
  return new Promise(function (resolve, reject) {
    uni.request({
      data: data,
      url: url,
      header: headers,
      method: method,
      success: res => {
        if (res.statusCode == 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      },
      fail: res => {
        reject(res);
      }
    });
  });
};

module.exports = req;