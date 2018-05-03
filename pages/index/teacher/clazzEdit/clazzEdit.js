// pages/index/teacher/clazzEdit/clazzEdit.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalUrl.imgUrl,
    pageVisible:{
      clazz:true,
      stulist:false,
      homework:false,
    },
    pageClasses:{
      clazz:'tabbar-item active',
      stulist:'tabbar-item',
      homework:'tabbar-item'
    },
    deleteMode: false,
    clazzName:'666',
    clazzNameBak:'666',
    ischanged:false,
    classinfo:null,
    class_id:null,
    studentlist:null
  },
  saveOntap:function(e){
    this.setClassName(this.data.class_id,this.data.clazzName);
  },
  deleteOntap:function(e){
    var that = this;
    wx.showModal({
      title: '警告',
      content: '确实要删除该成员吗？',
      success: function(res){
        if(res.confirm){
          that.deleteClassStudent(e.target.dataset.stuid);
        }
      }
    })
  },
  clazzNameOninput:function(e){
    if(e.detail.value == this.data.clazzNameBak){
      this.setData({
        ischanged:false,
        clazzName:e.detail.value
      })
    }else{
      this.setData({
        ischanged: true,
        clazzName: e.detail.value
      })
    }
  },
  editOntap: function(){
    var newmode = !this.data.deleteMode;
    this.setData({
      deleteMode: newmode
    })
  },
  clazzOntap:function(e){
    this.switchPage(1);
    this.getClassInfo(this.data.class_id);
  },
  stulistOntap: function (e) {
    this.switchPage(2);
    this.getClassStudent(this.data.class_id);
  },
  homeworkOntap: function (e) {
    this.switchPage(3);
  },

  // 接口封装
  // 获取班级信息
  getClassInfo:function(classId){
    var that = this;
    wx.request({
      url: app.globalUrl.url + 'teacher/class',
      data: {
        openid: app.globalData.openid,
        class_id: classId
      },
      success: function (res) {
        that.setData({
          classinfo: res.data,
          clazzName:res.data.class_name,
          clazzNameBak: res.data.class_name,
          ischanged:false
        })
      }
    })
  },
  // 修改班级名称
  setClassName:function(classId,className){
    var that = this;
    wx.request({
      url: app.globalUrl.url + 'teacher/class',
      method:'POST',
      data:{
        class_id:classId,
        class_name:className
      },
      success:function(res){
        that.getClassInfo(that.data.class_id);
      }
    })
  },
  // 获取班级成员
  getClassStudent:function(class_id){
    var that = this;
    wx.request({
      url: app.globalUrl.url + 'teacher/student',
      data: {
        class_id: class_id,//班级id
        openid: app.globalData.openid
      },
      success:function(res){
        that.setData({
          studentlist:res.data
        })
      }
    })
  },
  // 删除班级成员
  deleteClassStudent:function(stuid){
    // url:'teacher/student/del',
    //  data:{
    //     id:'',//学生id
    //  }
    var that = this;
    wx.request({
      url: app.globalUrl.url + 'teacher/student/del',
      data:{
        id:stuid
      },
      success:function(res){
        that.getClassStudent(that.data.class_id)
      }
    })
  },

  // 页面切换
  switchPage:function(pageNum){
    if (pageNum != null) {
      if (pageNum == 1) {
        this.setData({
          pageVisible: {
            clazz: true,
            stulist: false,
            homework: false,
          },
          pageClasses: {
            clazz: 'tabbar-item active',
            stulist: 'tabbar-item',
            homework: 'tabbar-item'
          }
        })
      }
      if (pageNum == 2) {
        this.setData({
          pageVisible: {
            clazz: false,
            stulist: true,
            homework: false,
          },
          pageClasses: {
            clazz: 'tabbar-item',
            stulist: 'tabbar-item active',
            homework: 'tabbar-item'
          }
        })
      }
      if (pageNum == 3) {
        this.setData({
          pageVisible: {
            clazz: false,
            stulist: false,
            homework: true,
          },
          pageClasses: {
            clazz: 'tabbar-item',
            stulist: 'tabbar-item',
            homework: 'tabbar-item active'
          }
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getClassInfo(options.class_id);
    this.switchPage(options.page);
    this.setData({
      class_id: options.class_id
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