var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalUrl.imgUrl,
    show: false,
    cont: 2,
    break_list: [],
    challenge_list: [],
    block_list: [],
    userinfo: ''
  },
  //排行tap
  liTap: function () {
    if (this.data.show == false) {
      this.setData({
        show: true,
      })
    } else {
      this.setData({
        show: false,
      })
    }
  },
  // 主tap
  onClick: function (own) {
    // console.log(own.currentTarget.dataset.id);
    this.setData({
      cont: own.currentTarget.dataset.id,
    })

  },
  // 班级排名
  classClick: function () {
    wx.navigateTo({
      url: 'classRanking/classRanking',
    })
  },
  //本市排名
  cityClick: function () {
    wx.navigateTo({
      url: '/pages/index/rank/cityRanking/cityRanking',
    })
  },
  //本省排名
  provinceClick: function () {
    wx.navigateTo({
      url: '/pages/index/rank/provinceRanking/provinceRanking',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //个人信息
    var userinfo = app.globalData.userInfo;
    console.log(userinfo);
    this.setData({
      userinfo: userinfo
    })
    // console.log(app.globalData);
    var that = this;
    //闯关
    wx.request({
      url: app.globalUrl.url + 'ranking',
      data: {
        openid: app.globalData.openid,
        type: "",
      },
      success: function (res) {
        // console.log(res.data);
        that.setData({
          break_list: res.data,
        })
      }
    })
    //挑战
    wx.request({
      url: app.globalUrl.url + 'ranking_pk',
      data: {},
      success: function (res) {
        // console.log(res.data);
        that.setData({
          challenge_list: res.data,
        })
      }
    })
    //等级
    wx.request({
      url: app.globalUrl.url + 'ranking/level',
      data: {},
      success: function (res) {
        // console.log(res.data);
        that.setData({
          block_list: res.data,
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

  },
  // 分享
  shareClick: function () {
    wx.navigateTo({
      url: '',
    })
  }
})