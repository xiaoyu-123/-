// pages/index/friend/join/join.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalUrl.imgUrl,
    match:false,
    userInfo:null,
    partnerInfo:{
      nickname:'-',
      avatarUrl:null
    }
  },
  startsoloOntap:function(){
    this.wsSendMsg(JSON.stringify({
      status:'start',
    }))
    wx.navigateTo({
      url: '../solo/solo',
    })
  },
  // 离开
  leave:function(){
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  // 分享
  share:function(){

  },
  wsSendMsg:function(data){
    wx.sendSocketMessage({
      data: data,
      success:function(res){
        console.log('sendmsgResult',res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo:app.globalData.userInfo
    })
    console.log('收到的openid',options)
    // 打开连接
    if(options.openid != null){
      wx.connectSocket({
        url: app.globalUrl.wsUrl + '?openid=' + app.globalData.openid + '&partner=' + options.openid + '&nickname=' + app.globalData.userInfo.nickname + '&avatarUrl=' + app.globalData.userInfo.avatarUrl,
        method: 'GET',
        data:{
          openid: app.globalData.openid,
          partner:'',
          nickname:app.globalData.userInfo.nickname,
          avatarUrl:app.globalData.userInfo.avatarUrl
        }
      });
    }else{
      wx.connectSocket({
        url: app.globalUrl.wsUrl + '?openid=' + app.globalData.openid + '&nickname=' + app.globalData.userInfo.nickname + '&avatarUrl=' + app.globalData.userInfo.avatarUrl,
        method:'GET',
        data: {
          openid: app.globalData.openid,
          nickname: app.globalData.userInfo.nickname,
          avatarUrl: app.globalData.userInfo.avatarUrl
        }
      });
    }
    
    wx.onSocketOpen(function(res){
      console.log('socketopen',res)
    });

    // 监听消息
    wx.onSocketMessage(function(res){
      console.log('socketmessage',res)
      var msg = res.data;
      // 等待连接
      if(msg.status == '0'){
        
      }
      // 连接完毕 等待开始
      if(msg.status == '1'){
        var partnerinfo = {
          nickname:msg.data.nickname,
          avatarUrl:msg.data.avatarUrl
        };
        this.setData({
          match:true,
          partnerInfo: partnerinfo
        })
      }
      // 接收题目
      if(msg.status == '2'){
        app.globalData.question = msg.data;
      }
    });
    wx.onSocketClose(function(res){
      console.log('socketclose', res)
    });
    wx.onSocketError(function(res){
      console.log('socketerror', res)
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.closeSocket({
      
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})