<template>
<view class="yz-helper bg" v-if="take.isShow">
  <view class="main" v-if="take.state > 0 && take.state < 30">
    <view class="main-title">
      <image lazy-load="true" src="https://img.yz-iot.com/yunzhi/mini-plug/biaoti.png"></image>
    </view>
    <view class="step">
      <view class="step-item">
        <image lazy-load="true" src="https://img.yz-iot.com/yunzhi/mini-plug/step1.png"></image>
        <p>点击取纸</p>
      </view>
      <view class="step-icon">
        <image lazy-load="true" src="https://img.yz-iot.com/yunzhi/mini-plug/guodu.png"></image>
      </view>
      <!-- <view class="step-item">
        <image src="https://img.yz-iot.com/yunzhi/mini-plug/step2.png"></image>
        <p>看完视频</p>
      </view>
      <view class="step-icon">
        <image src="https://img.yz-iot.com/yunzhi/mini-plug/guodu.png"></image>
      </view> -->
      <view class="step-item">
        <image lazy-load="true" src="https://img.yz-iot.com/yunzhi/mini-plug/step3.png"></image>
        <p>设备出纸</p>
      </view>
    </view>
	<button type="default" class="btn_takefun" open-type="getUserInfo" @getuserinfo="getPhoneNumber">
		<view class="main-btn" @tap="takeFun">
		  <image lazy-load="true" src="https://img.yz-iot.com/yunzhi/mini-plug/anniu.png"></image>
		</view>
	</button>
    <view class="main-rw">
      <image lazy-load="true" src="https://img.yz-iot.com/yunzhi/mini-plug/renwu.png"></image>
    </view>
    <!-- <view class="main-word">
      今日剩余取纸：<span>5</span>次             
    </view> -->
  </view>
  <view class="close" @tap="close" v-if="take.state > 0 && take.state < 30">
    <image lazy-load="true" src="https://img.yz-iot.com/yunzhi/mini-plug/guanbi.icon.png"></image>
  </view>
  <view class="mol-box" v-if="take.state == 30">
    <image lazy-load="true" src="https://img.yz-iot.com/yunzhi/mini-plug/shibai.icon.png"></image>
    <view class="mol-title">{{take.msg.result}}</view>
    <view class="mol-sub">{{take.msg.tip}}</view>
    <view class="mol-btn" @tap="close">确定</view>
  </view>
</view>
</template>

<script>
// plugin/components/hello-component.js
// var commonJS = require("@/index.js");
import commonJS from '@/index.js'
import Api from "../../config/method";
import orderMsg from '@/common/api/orderMsg/orderMsg.js'

export default {
  data() {
    return {
      outResult: 10,
      take: {
        isSubmit: false,
        isShow: false,
        state: 0,
        msg: {
          result: '操作成功',
          tip: '云纸机正在努力的出纸~'
        }
      }
    };
  },

  components: {},
  props: {},
  onPageShow: function (options) {
    console.log("hepler load 222"); // console.log(commonJS.helper.params);

    this.take.isSubmit = false;
    this.showTakeDlg();
  },
  onPageHide: function () {
    console.log("hepler hide"); //this.close();
  },
  beforeMount: function () {
    // 在组件实例进入页面节点树时执行
    console.log("life times attached"); // console.log(commonJS.helper.params);
    // this.data.take.isSubmit = false;
    // this.showTakeDlg();
  },
  destroyed: function () {
    // 在组件实例被从页面节点树移除时执行
    console.log("life times detached");
    this.close();
  },
  // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
  beforeMount: function () {
    // 在组件实例进入页面节点树时执行
    console.log("attached");
  },
  destroyed: function () {
    // 在组件实例被从页面节点树移除时执行
    console.log("detached");
    this.close();
  },
  methods: {
    valid() {
      // console.log("init valid");
      // console.log(commonJS.helper.params);
      var params = commonJS.helper.params;

      if (params.yzWxTest && params.yzWxTest == 10) {
        return true;
      } // if (!this.isValidByScene(params.scene)){
      //     return false;
      // }


      if (!params.openId) {
        return false;
      }

      return true;
    },

    isValidByScene(scene) {
      if (!scene) {
        return false;
      }

      return scene == '1167' || scene == '1074' || scene == '1082' || scene == '1157' || scene == '1037';
    },

    showTakeDlg() {
      if (!this.valid()) {
        console.log("params not valid");
        return;
      }

      console.log('show dlg');
      this.take.state = 10;
      this.take.isShow = true;
	  
	  this.take = this.take
      // this.setData({
      //   take: this.take
      // });
    },

	getPhoneNumber(e){
		this.$parent.onGetPhoneNumber(e)
	},

    takeFun() {
      var params = commonJS.helper.params;

      var _this = this;

      const accountInfo = uni.getAccountInfoSync();
      console.log("accountInfo:", accountInfo);

      if (_this.take.isSubmit) {
        return;
      }

      if (params.sn) {
        _this.takeV2(params, accountInfo);

        return;
      }

      _this.takeV1(params, accountInfo);
	  
	  // 在页面onLoad回调事件中创建插屏广告实例
	  if (uni.createInterstitialAd) {
	    this.interstitialAd = uni.createInterstitialAd({
	      adUnitId: 'adunit-6d8d8e6fc6e18349'
	    })
	    this.interstitialAd.onLoad(() => {})
	    this.interstitialAd.onError((err) => {})
	    this.interstitialAd.onClose(() => {})
	  }
	  // 在适合的场景显示插屏广告
	  if (this.interstitialAd) {
	    this.interstitialAd.show().catch((err) => {
	      console.error(err)
		  this.$uma.trackEvent('eleME-AD2');
	    })
	  }
    },

    takeV2(params, accountInfo) {
      console.log("订阅号出纸");

      var _this = this;

      _this.take.isSubmit = true; //String appId, String openid, String systemTime, String key, String sn

      Api.outPaperV2({
        openid: params.openId,
        systemTime: params.systemTime,
        key: params.key,
        appId: accountInfo.miniProgram.appId,
        // appId:'wx6a068fb12b3bb327',
        sn: params.sn
      }).then(res => {
        console.log("result", res);

        if (res.code == 2 && res.msg == 'USE_COUNT_NULL') {
          _this.take.state = 30;
          _this.take.msg.result = '取纸失败';
          _this.take.msg.tip = '没有使用次数了~~';
		  _this.take = _this.take
          // _this.setData({
          //   take: _this.take
          // });

          _this.take.isSubmit = false;
          return;
        }

        if (res.code == 2 && res.msg == 'FW_LOCKED') {
          _this.dialogMsg('设备使用中，请稍后~');

          _this.take.isSubmit = false;
          return;
        }

        if (res.code == 2) {
          _this.take.state = 30;
          _this.take.msg.result = '取纸失败';
          _this.take.msg.tip = '请重新扫描设备二维码~';
		  _this.take = _this.take
          // _this.setData({
          //   take: _this.take
          // });

          return;
        }

        if (res.code != 1) {
          _this.dialogMsg(res.info);

          _this.take.isSubmit = false;
          return;
        }

        _this.close();

        _this.take.isSubmit = false;
      }).catch(err => {
        _this.take.isSubmit = false;

        _this.dialogMsg('网络异常');
      });
    },

    takeV1(params, accountInfo) {
      console.log("服务号，小程序合作");

      var _this = this;

      _this.take.isSubmit = true;
      Api.outPaper({
        openid: params.openId,
        systemTime: params.systemTime,
        key: params.key,
        appId: accountInfo.miniProgram.appId
      }).then(res => {
        console.log(res);

        if (res.code == 2) {
          _this.take.state = 30;
          _this.take.msg.result = '取纸失败';
          _this.take.msg.tip = '请扫描设备二维码';
		  _this.take = _this.take
          // _this.setData({
          //   take: _this.take
          // });

          _this.take.isSubmit = false;
          return;
        }

        _this.close();

        _this.take.isSubmit = false;
      }).catch(e => {
        console.error("请求异常", e);
        uni.showToast({
          title: '网络异常',
          icon: 'none',
          duration: 2000
        });
        _this.take.isSubmit = false;
      });
    },

    close() {
      this.take.state = 0;
      this.take.isShow = false;
      commonJS.helper.initParams();
	  this.take = this.take
      // this.setData({
      //   take: this.take
      // });
    },

    dialogMsg(msg) {
      uni.showToast({
        title: msg,
        icon: 'none',
        duration: 859
      });
    }

  }
};
</script>
<style scoped>
@import "./helper.css";
</style>