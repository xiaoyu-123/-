// pages/doHomework/doHomework.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalUrl.imgUrl,
    pageVisible:{
      question:true,
      answer_card:false,
      answer_result:false,
    },
    timer:{
      time:'00:00',
      m:0,
      s:0
    },
    list:[],
    cont:'',
    id:'',//作业本id,
    question_id:'',//题目id
    answer_: '',//学生的答案
    answer_id:'',
  },

  acSubmitOntap: function(e){
    this.setData({
      pageV   : {
        question: false,
        answer_card: false,
        answer_result: true
      }
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#2889d2'
    });

    // console.log(app.globalData.userInfo)
    //提交作业
     var that = this;
    wx.request({
      url: app.globalUrl.url + 'submit/homework',
      data: {
        id: '8',//作业id
        serial_number: app.globalData.userInfo.serial_number,//学号
        questions:[

               {
                  question_id: '1',//题目id
                  answer: 'B',//学生的答案
                  is_correct: '1',//是否正确 : 0错误,1正确
                }            
        ]
      },
      success: function (res) {
        console.log(res.data);
      }
    })
    
  },

  returnToAnswer: function(e){
    this.setData({
      pageVisible: {
        question: true,
        answer_card: false,
        answer_result: false
      }
    })
  },
//答题卡 
  answerCardOntap: function(own){
    this.setData({
      pageVisible: {
        question: false,
        answer_card: true,
        answer_result: false,
      }
    })
    console.log(own);
    // var that = this;
    // wx.request({
    //   url: app.globalUrl.url + '',
    //   data: {
    //   },
    //   success: function (res) {
    //     // console.log(res);
    //     that.setData({

    //     })
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id,
    })
    // console.log(options)
    var that = this;
    wx.request({
      url: app.globalUrl.url + 'busy_book/detail',
      data: {
        id: options.id//作业本id
      },
      success: function (res) {
        // console.log(res.data);
        that.setData({
          list: res.data,
          Index:0,
          // answer:res.data.answer,
          // question_id:res.data.id,                 
        })
        that.setData({
          arr: that.data.list[that.data.Index],
        })
      }
    })
  },
  // 选择
  choose: function (own) {
    console.log(own);
    // wx.setStorage({
    //   key: "answer_id",
    //   data: "own.target.dataset.id"
    // })
    this.setData({
      Before: true,
      str: this.data.str + own.currentTarget.dataset.text + ",",
      answer_:own.target.dataset.text,//答案的选项
      answer_id: own.target.dataset.id
    })
    // console.log(this.data.Index);
      if (this.data.Index + 1 < this.data.list.length) {

        if (this.data.Before == true) {
          var that = this;
          var second = 1;
          var timer = setInterval(function () {
            // console.log(that.data.num + "a");
            second -= 1;
            if (second == 0) {
              clearInterval(timer);
              that.setData({
                Before: false,
                Index: that.data.Index + 1,
              })
              that.setData({
                arr: that.data.list[that.data.Index],
              })
            }
            // console.log(second);
          }, 1000)
        }
      }else{
        this.setData({
          pageVisible: {
            question: false,
            answer_card: true,
            answer_result: false,
            answerList: own
          }
        })
      }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    this.timer = setInterval(function(){
      var s = that.data.timer.s;
      var m = that.data.timer.m;
      var time = '';
      var s_str = '';
      var m_str = '';
      if (that.data.pageVisible.question){
        s++;
        if(s == 60){
          m++;
          s = 0;
        }
        if(s < 10){
          s_str = "0" + s;
        }else{
          s_str = "" + s;
        }
        if (m < 10) {
          m_str = "0" + m;
        } else {
          m_str = "" + m;
        }
        time = m_str + ":" + s_str;
        that.setData({
          timer: {
            time: time,
            m: m,
            s: s
          }
        })
      }
    },1000)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    // console.log(options)

  
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