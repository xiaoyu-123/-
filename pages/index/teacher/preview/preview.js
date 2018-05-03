// pages/index/teacher/preview/preview.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalUrl.imgUrl,
    questionlist:null,
    questionIndex:0,
  },

  returnOntap: function(e){
    wx.navigateBack({
      delta:1
    })
  },

  nextQuestionOntap:function(e){
    var index = this.data.questionIndex;
    index++;
    if(index > this.data.questionlist.length - 1){
      index = 0;
    }
    this.setData({
      questionIndex:index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var secid = options.secid;
    var types = options.type;
    var option = options.options;
    var that = this;
    console.log(options)
    wx.request({
      url: app.globalUrl.url + 'preview',
      data:{
        section_id:secid,
        type:types,
        number:option,
        id:option
      },
      success:function(res){
        console.log(res)
        that.setData({
          questionlist:res.data,
          questionIndex:0
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