module.exports = {
  helper: {
    init: function (obj) {
      console.log('helper plugin init!', obj); // console.log(obj);

      this.params.openId = obj.yz_openid;
      this.params.key = obj.yz_key;
      this.params.systemTime = obj.yz_systemTime;
      this.params.sn = obj.yz_sn;
      this.params.yzWxTest = obj.yzWxTest; // console.log("system info", wx.getSystemInfoSync());
      // var wxOptions = wx.getLaunchOptionsSync();
      // console.log("get wx options", wxOptions);
      // console.log(wxOptions);
      // this.params.scene = wxOptions.scene;
      console.log("params:", this.params);
    },
    initParams: function () {
      this.params = {
        openId: '',
        key: '',
        systemTime: '',
        scene: '',
        sn: ''
      };
    },
    params: {
      openId: '',
      key: '',
      systemTime: '',
      scene: '',
      sn: ''
    }
  }
};