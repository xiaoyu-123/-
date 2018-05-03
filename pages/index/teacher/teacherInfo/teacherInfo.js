// pages/teacherInfo/teacherInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTeacher: false,
    inputSwitch: {
      name: false,
      phone: false,
      gender: false,
      province: false,
      school: false,
      book: false,
      clazz: false,
      clazzName: false
    },
    name: '',
    phone: '',
    gender: '',
    province: ["", "", ""],
    address: '',
    school: '',
    book: null,
    clazz: null,
    clazzName: '默认班级1',
    publishers_id: null,
    grades: null,

    booklist: ['人教版数学'],
    gradeslist: [],
    genderlist: ["男", "女"],

    bookIndex: null,
    gradeIndex: null
  },
  schoolOninput: function (e) {
    this.setData({
      school: e.detail.value
    })
  },
  addressOninput: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  phoneOninput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  nameOninput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  clazzOnchanged: function (e) {
    var selected = this.data.gradeslist[e.detail.value];
    this.setData({
      clazz: selected.text,
      grades: selected.id,
      gradeIndex: 0
    })
  },

  genderOnchanged: function(e){
    this.setData({
      gender:this.data.genderlist[e.detail.value]
    })
  },

  bookOnchanged: function (e) {
    var selected = this.data.booklist[e.detail.value];
    this.setData({
      book: selected.name,
      publishers_id: selected.id,
      bookIndex: 0
    })
    var that = this;
    wx.request({
      url: app.globalUrl.url + 'select/grade',
      data: {
        q: that.data.publishers_id
      },
      success: function (res) {
        console.log(res)
        that.setData({
          gradeslist: res.data
        })
      }
    })
  },
  regionOnchanged: function (e) {
    this.setData({
      province: e.detail.value
    })
  },

  itemOntap: function (e) {
    var key = e.target.dataset.for;
    this.data.inputSwitch[key] = true;
  },
  okButtonOntap: function (e) {
    var that = this
    if (this.data.name != null) {
      if (this.data.phone != null) {
        if (this.data.gender != null) {
          if (this.data.province != null) {
            if (this.data.address != null) {
              if (this.data.school != null) {
                if (that.data.isTeacher) {
                  wx.request({
                    url: app.globalUrl.url + 'setting',
                    data: {
                      openid: app.globalData.openid,
                      name: that.data.name,//姓名
                      mobile: that.data.phone,//手机号
                      sex: that.data.gender,//性别
                      province: that.data.province[0],//地址
                      city: that.data.province[1],
                      area: that.data.province[2],
                      address: that.data.address,
                      school_name: that.data.school,//学校名称
                    },
                    method: 'POST',
                    success: function (res) {
                      wx.navigateBack({
                        delta:1
                      })
                    }
                  })
                } else {
                  if (this.data.publishers_id != null) {
                    if (this.data.grades != null) {
                      wx.request({
                        url: app.globalUrl.url + 'teacher',
                        dataType: 'json',
                        data: {
                          openid: app.globalData.openid,
                          name: that.data.name,//姓名
                          mobile: that.data.phone,//手机号
                          sex: that.data.gender,//性别
                          province: that.data.province[0],//地址
                          city: that.data.province[1],
                          area: that.data.province[2],
                          address: that.data.address,
                          school_name: that.data.school,//学校名称
                          publishers_id: that.data.publishers_id,//教材ID
                          grades: that.data.grades//班级ID
                        },
                        success: function (res) {
                          wx.redirectTo({
                            url: '../teacherIndex/teacherIndex?page=1',
                          })
                        }
                      })
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    // wx.redirectTo({
    //   url: '../teacherIndex/teacherIndex',
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (app.globalData.userInfo.identity == '老师') {
      //var info = res.data.info;
      that.setData({
        isTeacher: true,
      })
      wx.request({
        url: app.globalUrl.url + 'setting',
        data: {
          openid: app.globalData.openid
        },
        success: function (res) {
          var info = res.data;
          that.setData({
            isTeacher: true,
            name: info.name,
            phone: info.mobile,
            gender: info.sex,
            province: [info.province, info.city, info.area],
            address: info.address,
            school: info.school_name,
            publishers_id: info.publishers_id,
          })
        }
      })
    }
    wx.request({
      // 选择教材 通过
      url: app.globalUrl.url + 'change',
      dataType: 'json',
      data: {},
      success: function (res) {
        that.setData({
          booklist: res.data
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

  }
})