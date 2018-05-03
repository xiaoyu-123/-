// pages/index/userInfo/userInfo.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalUrl.imgUrl,
    userInfo:'',
    date:'2018-4-26',
    sex:['男','女'],
    sex_i:'男',
    clas_i:"一年级",
    clas: [],
    show:false,
    region:'河北石家庄',
    list:[],
    newbirthday:'',
    classID:null,//年级ID
    name:"",
    school_name:"",
    province:'',//省
    city:'',//市
    area:''//县
  },
  regin:function(e){
    console.log(e.detail.value[0]);
    this.setData({
      region: e.detail.value,
      province: e.detail.value[0],//省
      city: e.detail.value[1],//市
      area: e.detail.value[2]//县
    })
  },
  school:function(e){
    // console.log(e.detail.value)
    this.setData({
      school_name: e.detail.value,
    })
  },
  name:function(e){
    // console.log(e.detail.value);
    this.setData({
      name: e.detail.value,
    })
  },
  sex:function(e){
    // console.log(e.detail.value);
    this.setData({
      sex_i: this.data.sex[e.detail.value],
    })
  },
  date:function(e){
    this.setData({
      date: e.detail.value
    })
  },
  clas:function(e){
    // console.log(e);
    this.setData({
      clas_i: this.data.clas[e.detail.value].text,
      classID: e.detail.value,
    })
  },
  modifi:function(){
    var that = this;
    this.setData({
      show: true
    })
    wx.request({
      url: app.globalUrl.url + 'select/grade',
      data:{
        id:this.data.clas.id,
      },
      success:function(res){
        // console.log(res);
        that.setData({
          clas: res.data
        })
      }
    })
  },
  modify:function(){
    this.setData({
      show:false
    })
    var that=this;
    wx.request({
      url: app.globalUrl.url + 'personal',
      method: 'POST',
      data: {
        openid: app.globalData.openid,
        name:that.data.name,
        sex: that.data.sex_i,
        grade:that.data.clas_i,
        school_name:that.data.school_name,
        birthday: that.data.date,
        province: that.data.province,
        city: that.data.city,
        area: that.data.area
      },
      success: function (res) {
        // console.log(res);
        if (res.data.error == 1) {
          res.data.message;
        } else {
          wx.navigateTo({
            url: '/pages/index/userInfo/userInfo',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    // console.log(app.globalData);
    wx.request({
      url: app.globalUrl.url + 'personal',
      data:{
        openid: app.globalData.openid,
      },
      success:(res)=>{
        // console.log(res);
        var birthday = res.data.birthday;
        var newbirthday = birthday.substr(0, 10);
        this.setData({
          list:res.data,
          newbirthday:newbirthday,
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
    // console.log(app.globalData.info);
    // console.log(app.globalData.openid);
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