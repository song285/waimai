const config = {
  //本地测试模式
  env: 'pro',
  //接口开发路径
  dev: {
    api: "https://test.yangtuo8888.com"
  },
  pro: {
    api: "https://api.dafei1107.com"
  }
};
module.exports = config[config.env];