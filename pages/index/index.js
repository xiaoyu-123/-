//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    imgUrl:app.globalUrl.imgUrl,
    info: '',
  },
  userInfo:function(){
    wx.navigateTo({
      url: 'userInfo/userInfo',
    })
  },
  play:function(){
    wx.navigateTo({
      url: 'play/play',
    })
  },
  study:function(){
    wx.navigateTo({
      url: 'study/learnBook/learnBook',
    })
  },
  parent:function(){
    wx.navigateTo({
      url: 'parent/parent',
    })
  },
  brush:function(){
    wx.navigateTo({
      url: 'brush/brush',
    })
  },
  teacher:function(){
    console.log(this.data.userInfo)
    if(this.data.userInfo.identity == '学生'){
      wx.navigateTo({
        url: 'teacher/teacher',
      })
    }
    if (this.data.userInfo.identity == '老师') {
      wx.navigateTo({
        url: 'teacher/teacherIndex/teacherIndex',
      })
    }
  },
  friend:function(){
    // wx.navigateTo({
    //   url: 'friend/friend',
    // })
  },
  shop:function(){
    wx.navigateTo({
      url: 'shop/shop',
    })
  },
  rank:function(){
    wx.navigateTo({
      url: 'rank/rank',
    })
  },
  onLoad: function () {
    
    wx.login({
      success: (res) => {
        if (res.code) {
          wx.getUserInfo({
            success: (res) => {
              var info = JSON.parse(res.rawData);
              this.setData({
                info: info.avatarUrl,
              })
            }
          })
        }
      }
    })
    
  },
  onShow:function(){
    
  },
  onShareAppMessage: function (options){
    console.log(options)
    return {
      path:'/pages/index/friend/join/join?openid='+app.globalData.openid,
      success:function(res){
        wx.navigateTo({
          url: '/pages/index/friend/join/join',
        })
      }
    }
  }
})
