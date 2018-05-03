// pages/index/parent/p_center/p_center.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalUrl.imgUrl,
    student:[],
    p_avatarUrl:'',
  },
  homeWork:function(){
    wx.navigateTo({
      url: '../homeWork/homeWork',
    })
  },
  record: function () {
    wx.navigateTo({
      url: '../studyRecord/studyRecord',
    })
  },
  play: function () {
    wx.navigateTo({
      url: '../studyPlay/studyPlay',
    })
  },
  rank: function () {
    wx.navigateTo({
      url: '/pages/index/parent/ranking/ranking',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userInfo = app.globalData.userInfo;
    // console.log(userInfo);
    that.setData({
      p_avatarUrl:userInfo.avatarUrl,
    })
    wx.request({
      url: app.globalUrl.url + 'patriarch/homepage',
      data:{
        openid: app.globalData.openid,
      },
      success:function(res){
        // console.log(res);
        that.setData({
          student: res.data.student,
        })
      }
    })
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