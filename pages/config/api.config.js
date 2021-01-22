const config = require("./index.js");

console.log('test');
console.log(config); // 所有接口

module.exports = {
  outPaper: `${config.api}/extra/yz-sp/paper-out`,
  outPaperV2: `${config.api}/extra/yz-sp/v2/aper-out`
};