// pages/index/play/challenge_now/challenge_now.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalUrl.imgUrl,
    break_id:null,
    serial_number:null,
    Before:false,
    percentage: 0,
    str:"",
  },
  result:function(){
    wx.navigateTo({
      url: '../challenge_result/challenge_result',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      length: options.serial_number,
    })
    if(this.data.length==1){
      this.setData({
        break_id: options.id,
        serial_number: app.globalData.serial_number,
      })
    }else{
      this.setData({
        break_id: options.id,
        serial_number: app.globalData.serial_number,
      })
    }
    
    
    if (this.data.length == 1){
      var that = this;
      wx.request({
        url: app.globalUrl.url + 'start',
        data: {
          break_id: that.data.break_id,
        },
        success: (res) => {
          console.log(res);
          that.setData({
            arr: res.data.question,
            num: 1,
            Type: 0,
          })
          that.setData({
            oList: that.data.arr[that.data.Type],
            length: that.data.arr.length,
            miao: Number(res.data.parameter),
            miao_1: Number(res.data.parameter),
          })
          var miao = Number(res.data.parameter);
          var miao_1 = Number(that.data.miao_1) - Number(that.data.miao);
          var timer = setInterval(function () {
            miao -= 1;
            that.setData({
              miao: miao,
            })
            if (miao == 0) {
              clearInterval(timer);
              wx.navigateTo({
                url: '../challenge_result/challenge_result?message=' + 0 + "&Array=" + "Array" + "&time=" + miao_1 + "&da=" + that.data.percentage + "&length=" + that.data.arr.length + '&chua=' + 1,
              })
            }
          }, 1000)
        }
      })
    } else if (this.data.length == 2){
      var that = this;
      wx.request({
        url: app.globalUrl.url + 'challenge',
        data: {
          break_id: that.data.break_id,
          serial_number: that.data.serial_number,
        },
        success: (res) => {
          console.log(res);
          that.setData({
            arr: res.data.question,
            num: 1,
            Type: 0,
          })
          that.setData({
            oList: that.data.arr[that.data.Type],
            length: that.data.arr.length,
            miao: Number(res.data.parameter),
            miao_1: Number(res.data.parameter),
          })
          var miao = Number(res.data.parameter);
          var miao_1 = Number(that.data.miao_1) - Number(that.data.miao);
          var timer = setInterval(function () {
            miao -= 1;
            that.setData({
              miao: miao,
            })
            if (miao == 0) {
              clearInterval(timer);
              wx.navigateTo({
                url: '../challenge_result/challenge_result?message=' + 0 + "&Array=" + "Array" + "&time=" + miao_1 + "&da=" + that.data.percentage + "&length=" + that.data.arr.length + '&chua=' + 2,
              })
            }
          }, 1000)
        }
      })
    }
    

    
  },
  // 选择
  choose:function(own){
    console.log(own.currentTarget.dataset.text);
    if (this.data.length == undefined){
      this.setData({
        Before: true,
        str: this.data.str + own.currentTarget.dataset.id + ",",
      })
      console.log(this.data.num);
      if (own.currentTarget.dataset.text == this.data.oList.answer) {
        this.setData({
          percentage: this.data.percentage + 1,
        })
      } else {
        this.setData({
          percentage: this.data.percentage + 0,
        })
      }
      if (this.data.num < this.data.arr.length) {
        if (this.data.oList.answer == "A") {
          this.setData({
            current: 1,
          })
        } else if (this.data.oList.answer == "B") {
          this.setData({
            current: 2,
          })
        } else if (this.data.oList.answer == "C") {
          this.setData({
            current: 3,
          })
        } else if (this.data.oList.answer == "D") {
          this.setData({
            current: 4,
          })
        }
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
                num: that.data.num + 1,
                Type: that.data.Type + 1,
              })
              that.setData({
                oList: that.data.arr[that.data.Type],
              })
            }
            // console.log(second);

          }, 1000)
        }
      } else {
        console.log(app.globalData.serial_number);//学号
        console.log(this.data.break_id)//关卡id
        console.log(this.data.str)//选择的题目
        console.log(this.data.percentage / this.data.arr.length)//分数  
        console.log(this.data.miao);
        var score = (this.data.percentage / this.data.arr.length) * 100;
        var break_id = this.data.str.substring(0, this.data.str.length - 1);
        var second = 2;
        var that = this;
        var miao = Number(that.data.miao_1) - Number(that.data.miao);
        var timer = setInterval(function () {
          second -= 1;
          if (second == 0) {
            clearInterval(timer);
            wx.request({
              url: app.globalUrl.url + 'through',
              data: {
                openid: app.globalData.openid,
                serial_number: app.globalData.serial_number,
                break_id: that.data.break_id,
                topic_id: break_id,
                score: score,
                probability: score + "%",
                time_length: miao,
              },
              success: (res) => {
                console.log(res);
                var message;
                var Array;
                var arr = res.data;
                if (res.data.message == "闯关失败") {
                  message = 0;
                  Array = JSON.stringify(arr);
                } else {
                  message = 1,
                    Array = JSON.stringify(arr);
                }
                var miao = Number(that.data.miao_1) - Number(that.data.miao);
                console.log(that.data.miao_1);
                console.log(that.data.miao);
                console.log(miao);
                wx.redirectTo({
                  url: '../challenge_result/challenge_result?message=' + message + "&Array=" + Array + "&time=" + miao + "&da=" + that.data.percentage + "&length=" + that.data.arr.length,
                })
              }
            })
          }
        }, 1000)
      }
    }else{
      this.setData({
        Before: true,
        str: this.data.str + own.currentTarget.dataset.id + ",",
      })
      console.log(this.data.num);
      if (own.currentTarget.dataset.text == this.data.oList.answer) {
        this.setData({
          percentage: this.data.percentage + 1,
        })
      } else {
        this.setData({
          percentage: this.data.percentage + 0,
        })
      }
      if (this.data.num < this.data.arr.length) {
        if (this.data.oList.answer == "A") {
          this.setData({
            current: 1,
          })
        } else if (this.data.oList.answer == "B") {
          this.setData({
            current: 2,
          })
        } else if (this.data.oList.answer == "C") {
          this.setData({
            current: 3,
          })
        } else if (this.data.oList.answer == "D") {
          this.setData({
            current: 4,
          })
        }
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
                num: that.data.num + 1,
                Type: that.data.Type + 1,
              })
              that.setData({
                oList: that.data.arr[that.data.Type],
              })
            }
            // console.log(second);

          }, 1000)
        }
      } else {
        console.log(app.globalData.serial_number);//学号
        console.log(this.data.break_id)//关卡id
        console.log(this.data.str)//选择的题目
        console.log(this.data.percentage / this.data.arr.length)//分数  
        console.log(this.data.miao);
        var score = (this.data.percentage / this.data.arr.length) * 100;
        var break_id = this.data.str.substring(0, this.data.str.length - 1);
        var second = 2;
        var that = this;
        var miao = Number(that.data.miao_1) - Number(that.data.miao);
        var timer = setInterval(function () {
          second -= 1;
          if (second == 0) {
            clearInterval(timer);
            wx.request({
              url: app.globalUrl.url + 'challenge_end',
              data: {
                openid: app.globalData.openid,
                serial_number: app.globalData.serial_number,
                break_id: that.data.break_id,
                topic_id: break_id,
                score: score,
                probability: score + "%",
                time_length: miao,
              },
              success: (res) => {
                console.log(res);
                var message;
                var Array;
                var arr = res.data;
                if (res.data.message == "闯关失败") {
                  message = 0;
                  Array = JSON.stringify(arr);
                } else {
                  message = 1,
                    Array = JSON.stringify(arr);
                }
                var miao = Number(that.data.miao_1) - Number(that.data.miao);
                console.log(that.data.miao_1);
                console.log(that.data.miao);
                console.log(miao);
                wx.redirectTo({
                  url: '../challenge_result/challenge_result?message=' + message + "&Array=" + Array + "&time=" + miao + "&da=" + that.data.percentage + "&length=" + that.data.arr.length,
                })
              }
            })
          }
        }, 1000)
      }
    }
    
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
    
    var that=this;
    if(this.data.length==1){
      wx.request({
        url: app.globalUrl.url + 'start',
        data: {
          break_id: that.data.break_id,
        },
        success: (res) => {
          console.log(res);
          that.setData({
            arr: res.data.question,
            num: 1,
            Type: 0,
          })
          that.setData({
            oList: that.data.arr[that.data.Type],
            length: that.data.arr.length,
            miao: Number(res.data.parameter),
            miao_1: Number(res.data.parameter),
          })
          var miao = Number(res.data.parameter);
          var miao_1 = Number(that.data.miao_1) - Number(that.data.miao);
          var timer = setInterval(function () {
            miao -= 1;
            that.setData({
              miao: miao,
            })
            if (miao == 0) {
              clearInterval(timer);
              wx.navigateTo({
                url: '../challenge_result/challenge_result?message=' + 0 + "&Array=" + "Array" + "&time=" + miao_1 + "&da=" + that.data.percentage + "&length=" + that.data.arr.length,
              })
            }
          }, 1000)
        }
      })
    }else if(this.data.length==2){
      wx.request({
        url: app.globalUrl.url + 'challenge',
        data: {
          break_id: that.data.break_id,
          serial_number: that.data.serial_number,
        },
        success: (res) => {
          console.log(res);
          that.setData({
            arr: res.data.question,
            num: 1,
            Type: 0,
          })
          that.setData({
            oList: that.data.arr[that.data.Type],
            length: that.data.arr.length,
            miao: Number(res.data.parameter),
            miao_1: Number(res.data.parameter),
          })
          var miao = Number(res.data.parameter);
          var miao_1 = Number(that.data.miao_1) - Number(that.data.miao);
          var timer = setInterval(function () {
            miao -= 1;
            that.setData({
              miao: miao,
            })
            if (miao == 0) {
              clearInterval(timer);
              wx.navigateTo({
                url: '../challenge_result/challenge_result?message=' + 0 + "&Array=" + "Array" + "&time=" + miao_1 + "&da=" + that.data.percentage + "&length=" + that.data.arr.length + '&chua=' + 2,
              })
            }
          }, 1000)
        }
      })
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