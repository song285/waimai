const api = require("@/static/js/api.config.js");

const request = require("@/static/js/request.js"); // console.log(api);


module.exports = {
  outPaper: data => request(api.outPaper, data, 'POST'),
  outPaperV2: data => request(api.outPaperV2, data, 'POST')
};