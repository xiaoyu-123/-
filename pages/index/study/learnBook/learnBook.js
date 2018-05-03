var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalUrl.imgUrl,
    pageVisible:{
      learnBook:true,
      exerciseBook:false,
      wrongBook:false,
      clcont:'',
      list:[],
      data:[],
      homeworkList:[],
      className:'',
      homework_id:'',
    },
    learnBookVisible:{
      chapter_item:true,
      chapter_item_detail:false
    },
    navbarStyle: {
      learnBook: 'navbar-item navbar-active',
      exerciseBook: 'navbar-item',
      wrongBook: 'navbar-item'
    },
    haveClazz:true
  },
  //作业详情 
  homeworkClick:function(e){
    var that = this;
    console.log(e.target.dataset.id)
    that.setData({
        homework_id:e.target.dataset.id
    })
    wx.navigateTo({
      url: '/pages/index/study/doHomework/doHomework?id='+that.data.homework_id,
    })
  },
  //上一周
  lastWeek:function(e){
    var that = this;
    wx.request({
      url: app.globalUrl.url + 'pre_week',
      data: {
        openid: app.globalData.openid
      },
      success: function (res) {
        console.log(res);
        that.setData({
        })
      }
    })
  },

  joinclazzOntap: function(){
    wx.redirectTo({
      url: '../joinClazz/joinClazz',
    })
  },

  returnIndex: function(e){
    this.setData({
      learnBookVisible: {
        chapter_item: true,
        chapter_item_detail: false
      }
    })
  },

  chapteritemOntap: function(e){
    this.setData({
      learnBookVisible: {
        chapter_item: false,
        chapter_item_detail: true
      }
    })
  },

  learnbookOntap: function(e){
    this.setData({
      pageVisible: {
        learnBook: true,
        exerciseBook: false,
        wrongBook: false
      },
      navbarStyle: {
        learnBook: 'navbar-item navbar-active',
        exerciseBook: 'navbar-item',
        wrongBook: 'navbar-item'
      }
    })
  },

  exercisebookOntap: function (e) {
    var that =this;
    this.setData({
      pageVisible: {
        learnBook: false,
        exerciseBook: true,
        wrongBook: false
      },
      navbarStyle: {
        learnBook: 'navbar-item',
        exerciseBook: 'navbar-item navbar-active',
        wrongBook: 'navbar-item'
      }
    })
    //作业本
    wx.request({
      url: app.globalUrl.url + 'busy_book',
      data: {
        openid: app.globalData.openid
      },
      success: function (res) {
        
        if(res.data.error==1){
          wx.showModal({
            title: '提示',
            content: "暂未加入班级,请加入班级",
            success:function(res){
              if (res.confirm) {
                  wx.redirectTo({
                    url: '/pages/index/study/joinClazz/joinClazz',
                  })
              } else if (res.cancel) {
                wx.redirectTo({
                  url: '/pages/index/index',
                })
              }
            }
          })
        }else{
          var arr = res.data;
          for (var i=0;i<arr.length;i++) {
            if (arr[i].created_at==null){
              arr[i].created_at = null
            }else{
              // console.log(res.data)
              var temp = (arr[i].created_at).substr(5, 6)
              arr[i].created_at = temp
            }
          }
          for(var j=0;j<arr.length; j++){
            if (arr[j].time==null){
              arr[j].time = null
            }else{
              // console.log(res.data)
              var temp = (arr[j].time).substr(5, 6)
              arr[j].time = temp
            }
          }
          // console.log(arr)
          that.setData({
            homeworkList:res.data,
            className: res.data[0].class_.class_name,
          })              
          // wx.redirectTo({
          //   url: '/pages/index/study/learnBook/learnBook'
          // })
        }
      }
    })
  },

  wrongbookOntap: function (e) { 
    var that = this;
    this.setData({
      pageVisible: {
        learnBook: false,
        exerciseBook: false,
        wrongBook: true
      },
      navbarStyle: {
        learnBook: 'navbar-item',
        exerciseBook: 'navbar-item',
        wrongBook: 'navbar-item navbar-active'
      }
    })
    //错题本
    wx.request({
      url: app.globalUrl.url + 'errors',
      success: function (res) {
        // console.log(res);
        that.setData({
        })
      }
    })


  },
  selBook:function(){
    wx.navigateTo({
      url: '/pages/index/play/selBook/selBook',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      clcont:options.clcont
    })
    // console.log(options.clcont) 

   //学课本
    if (that.data.clcont!==undefined){
      wx.request({
        url: app.globalUrl.url + 'study_textbook',
        data: {
          grade_id: that.data.clcont
        },
        success: function (res) {
          // console.log(res.data.chapter);
          that.setData({
            data: res.data,
            list: res.data.chapter
          })
        }
      })
    }else{
      wx.request({
        url: app.globalUrl.url + 'study_textbook',
        data: {
          // grade_id: that.data.clcont
        },
        success: function (res) {
          // console.log(res.data.chapter);
          that.setData({
            data: res.data,
            list: res.data.chapter
          })
        }
      })
    }

    // //作业本
    // wx.request({
    //   url: app.globalUrl.url + 'busy_book',
    //   data: {
    //     openid: app.globalData.openid
    //   },
    //   success: function (res) {
    //     console.log(res);
    //     if (res.data.error == 1) {
    //       wx.showModal({
    //         title: '提示',
    //         content: "暂未加入班级,请加入班级",
    //         success: function (res) {
    //           if (res.confirm) {
    //             wx.redirectTo({
    //               url: '/pages/index/study/joinClazz/joinClazz',
    //             })
    //           } else if (res.cancel) {
    //             wx.redirectTo({
    //               url: '/pages/index/index',
    //             })
    //           }
    //         }
    //       })
    //     } else {
    //       wx.redirectTo({
    //         url: '/pages/index/study/learnBook/learnBook'
    //       })
    //     }
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // var that = this;
    // wx.request({
    //   url: app.globalUrl.url + 'study_textbook',
    //   data: {

    //   },
    //   success: function (res) {
    //     // console.log(res.data.chapter);
    //     that.setData({
    //       data: res.data,
    //       list: res.data.chapter
    //     })
    //   }
    // })
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