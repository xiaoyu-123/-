// pages/index/teacher/createClazz/createClazz.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalUrl.imgUrl,
    clazz_Name:'',
  },
  clazzOninput:function(e){
    console.log(e)
    this.setData({
      clazz_Name:e.detail.value
    })
  },

  createOntap: function(){
    if (this.data.clazz_Name != null && this.data.clazz_Name != ''){
      var that = this;
      wx.request({
        url: app.globalUrl.url + 'new_class',
        data:{
          openid:app.globalData.openid,
          class_name:that.data.clazz_Name
        },
        success:function(res){
          if(res.data.error=="0"){
            wx.showToast({
              title: res.data.message,
            })
            wx.navigateBack({
              delta:1
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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