// pages/index/parent/studyRecord/studyRecord.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalUrl.imgUrl,
    list:[],
    average:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalUrl.url + 'study/record',
      data:{
        openid: app.globalData.openid,
      },
      success:function(res){
        // console.log(res);
        var average= 0;
        var sum=res.data.busy_book;
        for(var a of sum){
          // console.log(a.answer)
          average = average + a.answer;
        }
        
       that.setData({
         list: res.data.busy_book,
         average:( average / res.data.busy_book.length)*100
       })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    var context = wx.createCanvasContext('firstCanvas');
    context.setStrokeStyle("#4B93FA");

    context.setLineWidth(5);
    // 原点 半径            百分比
    context.arc(60, 60, 57, 0.8, 1.5 * Math.PI, true);
    //                          起始角
    context.stroke()
    context.draw()
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