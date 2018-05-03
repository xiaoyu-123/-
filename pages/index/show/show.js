// pages/index/show/show.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalUrl.imgUrl,
    userInfo:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.info);
    
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
    console.log(app.globalData.info);
  },
  userInfo: function () {
    wx.navigateTo({
      url: '/pages/index/userInfo/userInfo',
    })
  },
  play: function () {
    wx.navigateTo({
      url: '/pages/index/play/play',
    })
  },
  study: function () {
    wx.navigateTo({
      url: '/pages/index/study/learnBook/learnBook',
    })
  },
  parent: function () {
    wx.navigateTo({
      url: '/pages/index/parent/parent',
    })
  },
  brush: function () {
    wx.navigateTo({
      url: '/pages/index/brush/brush',
    })
  },
  teacher: function () {
    wx.navigateTo({
      url: '/pages/index/teacher/teacher',
    })
  },
  friend: function () {
    wx.navigateTo({
      url: '/pages/index/friend/friend',
    })
  },
  shop: function () {
    wx.navigateTo({
      url: '/pages/index/shop/shop',
    })
  },
  rank: function () {
    wx.navigateTo({
      url: '/pages/index/rank/rank',
    })
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