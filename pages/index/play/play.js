// pages/index/play/play.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalUrl.imgUrl,
    Title:null,
    oList: null,
  },
  selBook:function(){
    wx.navigateTo({
      url: 'selBook/selBook',
    })
  },
  pass:function(own){
    console.log(own.currentTarget.dataset.id);
    wx.navigateTo({
      url: 'challenge_now/challenge_now?id=' + own.currentTarget.dataset.id + '&serial_number=' + 1,
    })
  },
  challenge:function(own){
    wx.navigateTo({
      url: 'challenge_now/challenge_now?id=' + own.currentTarget.dataset.id + '&serial_number=' + 2,
    }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log(app.globalData.serial_number);
    var that=this;
    wx.request({
      url: app.globalUrl.url + 'play_book',
      data:{
        serial_number: app.globalData.serial_number,//学号
      },
      success:function(res){
        console.log(res);
        that.setData({
          oList:res.data,
        })

        for (var i = 0; i < that.data.oList.length; i++) {
          that.data.oList[i].chuang = false;
        }
        that.setData({
          oList: that.data.oList,
        })
        console.log(that.data.oList);
        var num;
        for (var i = 0; i < that.data.oList.length; i++) {
          
            if (that.data.oList[i].checkpoint.is_success == "0") {
              num=i;
              that.data.oList[i].chuang = true;
              that.setData({
                oList: that.data.oList,
                Title: that.data.oList[num].chapter.name,
                publisher: that.data.oList[num].chapter.grade,
              })
              console.log(that.data.oList);
              
              return;
            }
        }
        
        
        
        
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
    var that = this;
    wx.request({
      url: app.globalUrl.url + 'play_book',
      data: {
        serial_number: app.globalData.serial_number,//学号
      },
      success: function (res) {
        console.log(res);
        that.setData({
          oList: res.data,
        })
        var num;
        for (var i = 0; i < that.data.oList.length; i++) {

          if (that.data.oList[i].checkpoint.is_success == "0") {
            num = i;
            that.data.oList[i].chuang = true;
            that.setData({
              oList: that.data.oList,
              Title: that.data.oList[num].chapter.name,
              publisher: that.data.oList[num].chapter.grade,
            })
            console.log(that.data.oList);

            return;
          }
        }
      }
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