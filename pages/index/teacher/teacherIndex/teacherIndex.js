// pages/teacher/teacher.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalUrl.imgUrl,
    pageVisible: {
      clazz: true,
      question: false,
      user: false
    },
    tabbarActive: {
      clazz: 'tabbarItem active',
      question: 'tabbarItem',
      user: 'tabbarItem'
    },
    userdata:null,
    shopdata:null,

    booklist:[],
    bookarr:[[],[]],
    chapterlist:[],
    sectionlist:[],
    bookselect:[0,0],//选择的教程和年级,
    exchangeHistory:null,

    chapterlistready:false,

    showExchangeHistory:false
  },

  closeHistoryOntap: function(e){
    this.setData({
      showExchangeHistory: false
    })
  },

  questionTotalOntap: function(e){
    wx.navigateTo({
      url: '../clazzEdit/clazzEdit?class_id='+e.target.dataset.classid+'&page=3',
    })
  },

  classHomepageOntap: function(e){
    wx.navigateTo({
      url: '../clazzEdit/clazzEdit?class_id='+e.target.dataset.clazzid+'&page=1',
    })
  },

  chapterOnselected: function(e){
    var that = this;
    wx.request({
      url: app.globalUrl.url + 'select/section',
      data:{
        q:e.target.dataset.id
      },
      success:function(res){
        that.setData({
          sectionlist:res.data
        })
      }
    })
  },

  mineOntap: function(e){
    wx.navigateTo({
      url: '../teacherInfo/teacherInfo',
    })
  },

  publicOntap: function (e) {
    var secid = e.target.dataset.secid;
    wx.navigateTo({
      url: '../publicHomework/publicHomework?secid='+secid,
    })
  },

  homeworkOntap: function (e) {
    wx.navigateTo({
      url: '../submitDetail/submitDetail',
    })
  },

  createClazzOntap: function (e) {
    wx.navigateTo({
      url: '../createClazz/createClazz',
    })
  },

  inviteStuOntap: function (e) {
    
    var class_number = e.target.dataset.classnumber;
    wx.navigateTo({
      url: '../inviteStudent/inviteStudent?classnumber=1'+class_number,
    })
  },
  bookOnchanged: function(e){
    this.setData({
      bookselect: e.detail.value
    });
    var that = this;
    wx.request({
      url: app.globalUrl.url + 'select/chapter',
      data:{
        q: that.data.levellist[e.detail.value[1]].id
      },
      success:function(res){
        that.setData({
          chapterlist:res.data,
          chapterlistready:true
        })
      }
    })
  },
  bookcolOnchanged:function(e){
    if(e.detail.column == 0){
      var that = this;
      wx.request({
        url: app.globalUrl.url + 'select/grade',
        data: {
          q: that.data.booklist[e.detail.value].id
        },
        success: function (result) {
          var levels = result.data;
          var newkey = 'name';
          for (var obj of levels) {
            obj[newkey] = obj['text'];
            delete obj['text'];
          }

          that.setData({
            levellist: result.data,
            bookarr: [that.data.booklist, levels]
          });
        }
      })
    }
    
  },
  // 切换“班级”
  classButtonOntap: function (e) {
    this.getHomepageInfo();
    this.setData({
      pageVisible: {
        clazz: true,
        question: false,
        user: false
      },
      tabbarActive: {
        clazz: 'tabbarItem active',
        question: 'tabbarItem',
        user: 'tabbarItem'
      }
    });
    wx.setNavigationBarTitle({
      title: '教师首页',
    })
  },
  //切换“出题”
  questionButtonOntap: function (e) {
    // 控制页面切换
    this.setData({
      pageVisible: {
        clazz: false,
        question: true,
        user: false
      },
      tabbarActive: {
        clazz: 'tabbarItem',
        question: 'tabbarItem active',
        user: 'tabbarItem'
      }
    });
    // 设置导航栏标题
    wx.setNavigationBarTitle({
      title: '出题',
    })
    // 获取教材列表
    var that = this;
    wx.request({
      url: app.globalUrl.url + 'change',
      data: {},
      success: function (res) {
        wx.request({
          url: app.globalUrl.url + 'select/grade',
          data:{
            q:res.data[0].id
          },
          success:function(result){
            var levels = result.data;
            var newkey = 'name';
            for(var obj of levels){
              obj[newkey] = obj['text'];
              delete obj['text'];
            }
            wx.request({
              url: app.globalUrl.url + 'select/chapter',
              data:{
                q:result.data[0].id
              },
              success:function(res_chapter){
                that.setData({
                  booklist: res.data,
                  levellist: result.data,
                  bookarr: [res.data, levels],
                  chapterlist: res_chapter.data,
                  chapterlistready: true
                });
              }
            });
          }
        });
      }
    })
  },
  //切换"我的"
  userButtonOntap: function (e) {
    this.getTeacherInfo();
    // 切换页面
    this.setData({
      pageVisible: {
        clazz: false,
        question: false,
        user: true
      },
      tabbarActive: {
        clazz: 'tabbarItem',
        question: 'tabbarItem',
        user: 'tabbarItem active'
      }

    });
    wx.setNavigationBarTitle({
      title: '我的',
    })
    this.getShopInfo();
  },

  exchangedHistoryOntap: function(){
    this.getExchangedHistory();
  },

  goodsOntap: function(e){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认兑换？',
      success:function(res){
        if(res.confirm){
          that.exchangesGoods(e.target.dataset.goodsid, e.target.dataset.goldnum);
        }
      }
    })
    
  },

  teacherSittingOntap: function(e){
    
  },
  // 接口封装
  getShopInfo:function(){
    var that = this;
    wx.request({
      url: app.globalUrl.url + 'shopping',
      data:{
        openid:app.globalData.openid
      },
      success:function(res){
        that.setData({
          shopdata:res.data
        })
      }
    })
  },
  exchangesGoods:function(goodsid,gold_number){
    var that = this;
    wx.request({
      url: app.globalUrl.url + 'exchange',
      data:{
        openid: app.globalData.openid,//用户openid
        id: goodsid,//兑换物id
        gold_number: gold_number,//兑换所需金币
      },
      success:function(res){
        var info = res.data.message;
        wx.showModal({
          title: '提示',
          content: info,
        })
      }
    })
  },
  getExchangedHistory:function(){
    var that = this;
    wx.request({
      url: app.globalUrl.url + 'exchange/record',
      data:{
        openid:app.globalData.openid
      },
      success:function(res){
        console.log(res)
        that.setData({
          showExchangeHistory:true,
          exchangeHistory:res.data
        })
      }
    })
  },
  getHomepageInfo:function(){
    var that = this;
    wx.request({
      url: app.globalUrl.url + 'teacher/homepage',
      data: {
        openid: app.globalData.openid
      },
      success: function (res) {
        that.setData({
          userdata: res.data
        })
      }
    })
  },
  getQuestionInfo:function(){
    
  },
  getTeacherInfo:function(){
    var that = this;
    //获取老师信息
    wx.request({
      url: app.globalUrl.url + 'mine',
      data: {
        openid: app.globalData.openid
      },
      success: function (res) {
        that.setData({
          userdata: res.data.info,
          shopdata: res.data.shop
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHomepageInfo();
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
    // pageVisible: {
    //   clazz: true,
    //     question: false,
    //       user: false
    // },
    if(this.data.pageVisible.clazz == true){
      this.getHomepageInfo();
    }
    if (this.data.pageVisible.question == true) {

    }
    if (this.data.pageVisible.user == true) {
      this.getTeacherInfo();
    }
    
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