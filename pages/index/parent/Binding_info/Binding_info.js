const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalUrl.imgUrl,
    identity:'',
    avatarUrl:'',
    grade:'',
    name:'',
    school_name:'',
    serial_number:'',
    identity:[],
  },
  checkboxChange:function(e){
    // console.log(e);
    this.setData({
      identity: e.detail.value

    })
  },
  btnClick:function(){
    var that = this;
    wx.request({
      url: app.globalUrl.url + 'patriarch',
      method:"POST",
      data:{
        serial_number: this.data.serial_number,//学号
        openid: app.globalData.openid,
        identity: '爸爸',
      },
      success:function(res){
        // console.log(res);
        if(res.data.error==0){
            wx.navigateTo({
              url: '/pages/index/parent/p_center/p_center',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // console.log(options.serial_number)
    this.setData({
      serial_number: options.serial_number,
    })
    wx.request({
      url: app.globalUrl.url + 'patriarch',
      data:{
        serial_number: this.data.serial_number,
      },
      success:function(res){
        // console.log(res);
        that.setData({
          school_name: res.data.school_name,
          name: res.data.name,
          grade: res.data.grade,
          avatarUrl: res.data.avatarUrl,
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