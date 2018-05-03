// pages/index/parent/studentBind/studentBind.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalUrl.imgUrl,
    serial_number:"",
  },
  serial_number:function(e){
    // console.log(e)
    this.setData({
      serial_number: e.detail.value,
    })
  },
  btnClick:function(){
    if (this.data.serial_number !== ""){
      var that = this;
      wx.request({
        url: app.globalUrl.url + 'patriarch',
        data: {
          serial_number: that.data.serial_number,
        },
        success: function (res) {
          // console.log(res);
            wx.navigateTo({
              url: '/pages/index/parent/Binding_info/Binding_info?serial_number=' + that.data.serial_number,
            })
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