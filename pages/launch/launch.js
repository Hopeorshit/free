// pages/launch/launch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: null,
    multiIndex: [0, 0, 0],
    index: 0,
    multiArray: [],
    year: "",
    month: "",
    day: "",
    startHour: "",
    orderData: null,
    title: "",
    num: "",
    imgsrc: '/images/mian.jpg',
    good: {
      title: '',
      num: '',
      orderData: null,
      imgsrc: ''
    }

  },


  launchbtn: function() {
    let title = this.data.title
    let num = this.data.num
    let orderData = this.data.orderData
    this.setData({
      good: {
        title: title,
        num: num,
        orderData: orderData,
        imgsrc: this.data.imgsrc
      }
    })
    if (this.data.title.length == 0 || this.data.num.length == 0 || this.data.orderData == null) {
      wx.showToast({
        title: '必填项不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      var good = JSON.stringify(this.data.good)
      wx.navigateTo({
        url: '../../pages/launch-after/launch-after?good=' + good,
      })

    }

  },
  onConfirm: function(event) {
    let q = event.detail.value
    this.setData({
      title: q
    })
  },
  onConfirm2: function(event) {
    let q = event.detail.value
    this.setData({
      num: q
    })
  },



  /*时间选择器*/
  surplusMonth: function(year) {
    var date = new Date();
    var year2 = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    var monthDatas = [];
    if (year == year2) {
      var surplusMonth = 12 - month;
      monthDatas.push(month + "月")
      for (var i = month; i < 12; i++) {
        monthDatas.push(i + 1 + "月")
      }
    } else {
      for (var i = 0; i < 12; i++) {
        monthDatas.push(i + 1 + "月")
      }
    }
    return monthDatas;
  },
  //天数计算
  surplusDay: function(year, month, day) {
    var days = 31;
    var dayDatas = [];
    var date = new Date();
    var year2 = date.getFullYear()
    var month2 = date.getMonth() + 1
    switch (parseInt(month)) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        days = 31;
        break;
        //对于2月份需要判断是否为闰年
      case 2:
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
          days = 29;
          break;
        } else {
          days = 28;
          break;
        }
      case 4:
      case 6:
      case 9:
      case 11:
        days = 30;
        break;
    }
    if (year == year2 && month == month2) {
      dayDatas.push(day + "日")
      for (var i = day; i < days; i++) {
        dayDatas.push(i + 1 + "日")
      }
    } else {
      console.log(month + "月" + days + "天")
      for (var i = 0; i < days; i++) {
        dayDatas.push(i + 1 + "日")
      }
    }
    return dayDatas;
  },
  //时间计算
  surplusHour: function(year, month, day, hour) {
    var date = new Date();
    var year2 = date.getFullYear()
    var month2 = date.getMonth() + 1
    var day2 = date.getDate();
    var hours = [
      ['00时', '02时', '04时', '06时', '08时', '10时', '12时', '14时', '16时', '18时', '20时', '22时', '24时'],
      []
    ];

    if (year == year2 && month == month2 && day == day2) {
      var hour2 = hour
      var j = 0;
      var surplusHours = [
        [],
        []
      ];
      for (var i = j; i < hours[0].length; i++) {
        surplusHours[0].push(hours[0][i]);
      }
      for (var i = j; i < hours[1].length; i++) {
        surplusHours[1].push(hours[1][i]);
      }
      hours = surplusHours;
    }
    return hours;
  },
  binddate: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  onLoad: function(options) {
    wx.hideTabBar({
      animation: false
    })
    var date = new Date();
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var surplusMonth = this.surplusMonth(year);
    var surplusDay = this.surplusDay(year, month, day);
    var surplusHour = this.surplusHour(year, month, day, hour)
    this.setData({
      multiArray: [
        surplusMonth,
        surplusDay,
        surplusHour[0],
      ],
      year: year,
      month: month,
      day: day,
      startHour: surplusHour[0],
    })
  },
  bindMultiPickerColumnChange: function(e) {
    var date = new Date();
    var year1 = date.getFullYear()
    var month1 = date.getMonth() + 1
    var day1 = date.getDate()
    var hour1 = date.getHours()
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex,
      year: this.data.year,
      month: this.data.month,
      day: this.data.day,
      startHour: this.data.startHour,
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:

        var monthStr = data.multiArray[e.detail.column][e.detail.value];
        var month = monthStr.substring(0, monthStr.length - 1);
        data.month = month;
        data.day = 1;
        if (data.year == year1 && month1 == data.month) {
          data.day = day1;
        } else {
          data.day = 1;
        }
        var surplusDay = this.surplusDay(data.year, data.month, data.day);
        data.multiArray[1] = surplusDay;
        var surplusHour;
        if (data.year == year1 && month1 == data.month && data.day == day1) {
          surplusHour = this.surplusHour(data.year, data.month, data.day, hour1)
        } else {
          surplusHour = this.surplusHour(data.year, data.month, data.day, 1)
        }
        break;
      case 1:
        var dayStr = data.multiArray[e.detail.column][e.detail.value];
        var day = dayStr.substring(0, dayStr.length - 1);
        data.day = day;
        var surplusHour;
        if (data.year == year1 && month1 == data.month && data.day == day1) {
          surplusHour = this.surplusHour(data.year, data.month, data.day, hour1)
        } else {
          surplusHour = this.surplusHour(data.year, data.month, data.day, 1)
        }
        break;
      case 2:
        var hourStr = data.multiArray[e.detail.column][e.detail.value];
        var hour = hourStr.substring(0, hourStr.length - 1);
        data.startHour = hour;
        var endhours2 = [];
        if (data.year == year1 && data.month == month1 && data.day == day1) {
          var surplusHour = this.surplusHour(data.year, data.month, data.day, hour);
          endhours2 = surplusHour[1]
        } else {
          var end = ['04时', '08时', '12时', '16时', '20时', '24时'];
          for (var i = e.detail.value; i < end.length; i++) {
            endhours2.push(end[i]);
          }
        }
        break;
    }
    this.setData(data)
  },
  //value 改变时触发 change 事件
  bindMultiPickerChange: function(e) {
    var dateStr =
      this.data.multiArray[0][this.data.multiIndex[0]] +
      this.data.multiArray[1][this.data.multiIndex[1]] +
      this.data.multiArray[2][this.data.multiIndex[2]];
    this.setData({
      orderData: dateStr
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})