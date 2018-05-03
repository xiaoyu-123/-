//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs); 
    // 地理位置
    var address;
    var this_=this;
    wx.getLocation({
      success: function (res) {
        address = res.latitude+' '+res.longitude;
        // console.log(address);
        this_.globalData.latitude = res.latitude;
        this_.globalData.longitude = res.longitude;
      },
    })
    console.log('app Launch')
    // 登录 用户信息
    var that=this;
    var openId=(wx.getStorageSync('openId'));
    // console.log(openId);
    // if(openId){
    //   wx.getUserInfo({
    //     success:res=>{
    //       that.globalData.userInfo = res.data;
    //       console.log(res.data);
    //     },
    //     fail:function(){
    //       console.log('获取失败！');
    //     },
    //     complete:function(){
    //       console.log('获取用户信息完成')
    //     }
    //   })
    // }else{
      var that = this;
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          // console.log(res.code);

          // console.log(that.globalUrl.url);
          if (res.code) {
            // 获取用户信息
            wx.getUserInfo({
              withCredentials: true,
              success: function (res_user) {
                // console.log(res_user);
                var weixin = JSON.parse(res_user.rawData);
                that.globalData.info = weixin.avatarUrl;
                // console.log(weixin);
                wx.request({
                  url: that.globalUrl.url+'getUserInfo',
                  data: {
                    code: res.code,
                    encryptedData: res_user.encryptedData,
                    iv: res_user.iv,
                    p_openid: that.globalId.p_id,//分享id
                  },
                  success: res => {
                    // console.log(res.data);
                    var openid = res.data.openid;
                    that.globalData.userInfo = res.data;
                    that.globalData.serial_number = res.data.serial_number;
                    that.globalData.openid = openid;
                    wx.setStorageSync('openId', openid);
                    wx.request({
                      url: that.globalUrl.url + 'is/signIn',
                      // method:'get',
                      data: {
                        openid: that.globalData.openid,
                      },
                      success: function (res) {
                        // console.log(res);
                        if (res.data.error == "0"){
                          wx.navigateTo({
                            url: '/pages/login/login',
                          })
                        }
                      }
                    })
                  }
                })
              },
              fail: function () {
                wx.showModal({
                  title: '获取信息失败',
                  content: '请允许授权以便为您提供服务',
                  showCancel:false,
                  success: res => {
                    if (res.confirm) {
                      wx.openSetting({
                        success:function(res){
                          if (res.authSetting["scope.userInfo"]){ //用户点击的授权
                            wx.login({
                              success:function(res){
                                if(res.code){
                                  wx.getUserInfo({
                                    withCredentials: true,
                                    success: function (res_user) {
                                      console.log(res_user);
                                      var weixin = JSON.parse(res_user.rawData);
                                      that.globalData.info = weixin.avatarUrl;
                                      // console.log(weixin);
                                      wx.request({
                                        url: that.globalUrl.url +'getUserInfo',
                                        data: {
                                          code: res.code,
                                          encryptedData: res_user.encryptedData,
                                          iv: res_user.iv,

                                        },
                                        success: res => {
                                          // console.log(res.data);
                                          that.globalData.userInfo = res.data;
                                          that.globalData.serial_number = res.data.serial_number;
                                          var openid = res.data.res.data;
                                          that.globalData.openid = openid;
                                          wx.setStorageSync('openId', openid);
                                        }
                                      })
                                    }
                                  })
                                }
                              }
                            })
                          }
                        }
                      })
                    }
                  }
                })
              }
            })
          }
        }
        
      })
    // }
  },
  globalData: {
    userInfo: null, // 用户信息
    latitude:null,
    longitude:null,
    address:null,
    openid:null, 
    serial_number:null, // 学号
    info:null,
  },
  globalUrl:{
    url:'https://book.idianwei.com'+'/',
    wsUrl:'ws://book.idianwei.com:9502/',
    imgUrl:'https://book.idianwei.com/uploads/public/uploads'
  },
  globalId:{
    p_id:null,
  },
  // 点击右上角分享
  // share:function(){
    
  //     return {
  //       title: '亿启听小程序',
  //       path: '/pages/index/index?id=' + app.globalData.userInfo.openId,
  //       success: function (res) {
  //         //分享点击确定后console 
  //       },
  //       fail: function (res) {
  //         //点击取消
  //       }
  //     }
    
  // },
  // 验证手机号
  // testTel:function(mobile){
  //   var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
  //   if (!myreg.test(mobile)) {
  //     wx.showToast({
  //       title: '手机号有误',
  //       // icon: 'success',
  //       image:'/images/warning.png',
  //       duration: 1500
  //     })
  //     return false;
  //   }
  // }
})