// pages/joinClazz/joinClazz.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalUrl.imgUrl,
    class_id:1,
    class_number:null,
    list:[],
    list_s:[],
  },
  joinclazzOntap: function(e){
    var that = this;
    wx.request({
      url: app.globalUrl.url + 'class/join',
      method:'POST',
      data: {
        class_id: that.data.class_id,
        openid: app.globalData.openid,
      },
      success: function (res) {
        // console.log(res);
        if(res.data.error==0){
            wx.showModal({
              title: '提示',
              content: '加入班级成功',
              success: function (res) {
                if (res.confirm) {
                    wx.redirectTo({
                      url: '/pages/index/study/learnBook/learnBook',
                    })
                } else if (res.cancel) {
                 //点击取消
                }
              }
            })
           
        }else{
          wx.showModal({
            title: '提示',
            content: '加入班级失败',
          })
        }
      }
    })
  },
  btnJionclass:function(e){
    // console.log(e);
    var that = this;
    wx.request({
      url: app.globalUrl.url + 'class/join',
      data: {
        class_number: that.data.class_number,//班号
        openid: app.globalData.openid,
      },
      success: function (res) {
        // console.log(res.data.id);
        that.setData({
          list:res.data,
          class_id:res.data.id
        })
      }
    })
  },
  classChange: function (e) {
    // console.log(e);
    this.setData({
      class_number: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalUrl.url + 'class/join',
      data:{
        class_number: that.data.class_number,
        openid: app.globalData.openid,
      },
      success:function(res){
        console.log(res.data[0].id);
        that.setData({
            list_s:res.data,
            class_id:res.data.id
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