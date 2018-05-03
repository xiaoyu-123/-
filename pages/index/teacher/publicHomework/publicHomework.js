// pages/publicHomework/publicHomework.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalUrl.imgUrl,
    pageVisible: {
      publicPage: true,
      previewPage: false
    },
    select: {
      num: 5
    },
    secid: null,

    homeworkName: '',
    homeworkDate: '',
    types: 'random',
    questionNum: '',//套题ID
    class_number: null,
    class_name:'',

    clazzlist: [],
    questionlist: [],

    randomChecked: true,
    recommandChecked: false,

    questionlists: null,
    questionIndex: 0,

    questionIsReady: false
  },
  recommandOnchanged: function (e) {
    this.setData({
      questionNum: e.detail.value
    })
  },

  publicOntap: function (e) {
    if (this.data.homeworkName != null && this.data.homeworkName != '') {
      if (this.data.homeworkDate != null && this.data.homeworkDate != '' && (new Date(this.data.homeworkDate + ' 23:59:59:999').getTime() > new Date().getTime())) {
        if (this.data.class_number != null && this.data.class_number != '') {
          if (this.data.types == 'random') {

          }
          if (this.data.types == 'recommend') {
            if (this.data.questionNum != null && this.data.questionNum != '') {

            } else {
              wx.showModal({
                title: '提示',
                content: '请选择套题！',
              })
              return;
            }
          }
          
          var that = this;
          //如果没有获取题 则获取
          if (this.data.questionIsReady == false) {
            wx.request({
              url: app.globalUrl.url + 'preview',
              data: {
                section_id: that.data.secid,
                type: that.data.types,
                number: that.data.select.num,
                id: that.data.questionNum
              },
              success: function (res) {
                that.setData({
                  questionlists: res.data,
                  questionIsReady: true
                })
                var questionidstr = '';
                var qlist = that.data.questionlists;
                for (var i = 0; i < qlist.length; i++) {
                  if (i != qlist.length - 1) {
                    questionidstr = questionidstr + qlist[i].id + ','
                  } else {
                    questionidstr = questionidstr + qlist[i].id
                  }
                }
                console.log(questionidstr)
                wx.request({
                  url: app.globalUrl.url + 'issue',
                  data: {
                    openid: app.globalData.openid,
                    description: that.data.homeworkName,
                    class_id: that.data.class_number,
                    question_id: questionidstr,
                    type: that.data.types,
                    time: that.data.homeworkDate
                  },
                  success: function (res) {
                    if(res.data.error==0){
                      wx.navigateTo({
                        url: '../publicSuccess/publicSuccess?class_name=' + that.data.class_name + '&date=' + that.data.homeworkDate,
                      })
                    }
                  }
                })
              }
            });
          } else {
            // 已获取题目直接发布
            var questionidstr = '';
            var qlist = that.data.questionlists;
            for (var i = 0; i < qlist.length; i++) {
              if (i != qlist.length - 1) {
                questionidstr = questionidstr + qlist[i].id + ','
              } else {
                questionidstr = questionidstr + qlist[i].id
              }
            }
            wx.request({
              url: app.globalUrl.url + 'issue',
              data: {
                openid: app.globalData.openid,
                description: '',
                class_id: that.data.class_number,
                question_id: questionidstr,
                type: that.data.types,
                time: that.data.homeworkDate
              },
              success: function (res) {
                console.log(res)
              }
            })
          }

        } else {
          wx.showModal({
            title: '提示',
            content: '请选择班级！',
          })
        }
      } else {
        wx.showModal({
          title: '提示',
          content: '请选择正确的时间！',
        })
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '请输入作业名称！',
      })
    }
    // wx.navigateTo({
    //   url: '../publicSuccess/publicSuccess',
    // })
  },
  returnOntap: function (e) {
    this.setData({
      pageVisible: {
        publicPage: true,
        previewPage: false
      }
    })
  },
  nextQuestionOntap: function (e) {
    var index = this.data.questionIndex;
    index++;
    if (index > this.data.questionlist.length - 1) {
      index = 0;
    }
    this.setData({
      questionIndex: index
    })
  },
  previewOntap: function (e) {
    if (this.data.types == 'recommend') {
      if (this.data.questionNum == null || this.data.questionNum == '') {
        wx.showModal({
          title: '提示',
          content: '请选择套题！',
        })
        return;
      }
    }
    var that = this;
    wx.request({
      url: app.globalUrl.url + 'preview',
      data: {
        section_id: that.data.secid,
        type: that.data.types,
        number: that.data.select.num,
        id: that.data.questionNum
      },
      success: function (res) {
        console.log(res)

        that.setData({
          pageVisible: {
            publicPage: false,
            previewPage: true
          },
          questionlists: res.data,
          questionIsReady: true
        })
      }
    })
  },

  subOntap: function (e) {
    if (this.data.select.num > 5) {
      var obj = {};
      obj.num = this.data.select.num - 1;
      this.setData({
        select: obj
      })
    }
  },
  homeworkDateOnchange: function (e) {
    this.setData({
      homeworkDate: e.detail.value
    })
  },
  homeworkNameOninput: function (e) {
    this.setData({
      homeworkName: e.detail.value
    })
  },
  classRadioOnchanged: function (e) {
    var that = this;
    this.setData({
      class_number: e.detail.value
    })
  },
  classRadioOntap: function(e){
    var that = this;
    this.setData({
      class_name: that.data.clazzlist[e.target.dataset.index].class_name
    })
  },
  addOntap: function (e) {
    if (this.data.select.num < 99) {
      var obj = {};
      obj.num = this.data.select.num + 1;
      this.setData({
        select: obj
      })
    }
  },

  randomRadioOntap: function (e) {
    this.setData({
      randomChecked: true,
      recommandChecked: false,
      types: 'random'
    })
    console.log(this.data)
  },
  recommandRadioOntap: function (e) {
    this.setData({
      randomChecked: false,
      recommandChecked: true,
      types: 'recommend'
    })
    console.log(this.data)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalUrl.url + 'draw',
      data: {
        openid: app.globalData.openid,
        sction_id: options.secid
      },
      success: function (res) {
        console.log(res)
        that.setData({
          clazzlist: res.data.class,
          questionlist: res.data.question,
          secid: options.secid
        });
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