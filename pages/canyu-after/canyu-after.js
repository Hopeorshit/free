// pages/canyu-after/canyu-after.js
const app = getApp()
import { GoodModel } from '../../model/index-model.js'
let goodModel = new GoodModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   dianzan:true,
   show:false,
   hidden:true,
   mask:true,
   

    title: "",
    num: "",
    orderData: "",
    imgsrc: "/images/mian.jpg",
    userInfo: {},
    locolurl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var good = JSON.parse(options.good)

    this.setData({
      title: good.title,
      num: good.num,
      orderData: good.date
    })
  

    //获取用户头像
    var userInfo = app.globalData.userInfo
    console.log(userInfo)
    this.setData({
      userInfo: userInfo
    }) 

    wx.getImageInfo({
      src: app.globalData.userInfo.avatarUrl,
      success: function (res) {

        app.globalData.userImage = res.path;

      }
    })


    let promise1 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: app.globalData.userInfo.avatarUrl,
        success: function (res) {
          app.globalData.userImage = res.path
          console.log(res)
          resolve(res);
        }
      })
    });
    let promise2 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: '/images/dianzan.jpg',
        success: function (res) {
          console.log(res)
          resolve(res);
        }
      })
    });
    let promise3 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: '/images/ma(bid=1).png',
        success: function (res) {
          console.log(res)
          resolve(res);
        }
      })
    });
    Promise.all([
      promise1, promise2, promise3
    ]).then(res => {
      console.log(res)
      const ctx = wx.createCanvasContext('shareImg')

      //画元素
      ctx.setFillStyle('#dea59c')
      ctx.fillRect(0, 0, 604, 1016)

      ctx.setFillStyle("#ffffff")
      ctx.fillRect(20, 250, 564, 750)

      ctx.save();

      ctx.beginPath(); //开始绘制
      ctx.arc(315, 70, 50, 0, Math.PI * 2, false);

      ctx.clip();

      ctx.drawImage(app.globalData.userImage, 265, 20, 100, 100)

      ctx.restore();


      ctx.drawImage('../../' + res[1].path, 52, 270, 500, 456)
      ctx.drawImage('../../' + res[2].path, 185, 750, 230, 230)


      var str = '['+this.data.title+']'
      if (str.length < 12) {
        ctx.setFillStyle('#666f6c')
        ctx.setFontSize(26)
        ctx.fillText(str, 146, 400)
      }
      else {
        for (var i = 0; i < str.length; i++) {
          if (i < 12) {
            ctx.setFillStyle('#666f6c')
            ctx.setFontSize(26)
            ctx.fillText(str[i], 146 + i * 26, 400)
          }
          else {
            ctx.setFillStyle('#666f6c')
            ctx.setFontSize(26)
            ctx.fillText(str[i], 146 + (i - 12) * 26, 440)

          }

        }

      }

      // ctx.setFillStyle('#c1bac1')
      // ctx.setFontSize(24)
      // ctx.fillText('good.orderData', 60, 690)


      ctx.beginPath()
      ctx.moveTo(52, 720)
      ctx.lineTo(552, 720)

      ctx.setTextAlign('center')
      ctx.setFillStyle('#ffffff')
      ctx.setFontSize(24)
      ctx.fillText(userInfo.nickName, 315, 170)

      ctx.setFillStyle('#ffffff')
      ctx.setFontSize(32)
      ctx.fillText('我参与了一个免单活动', 315, 230)

      ctx.setFillStyle('#fff')
      ctx.setFontSize(32)
      ctx.fillText('扫一扫进入小程序', 315, 560)

      ctx.setFillStyle('#fff')
      ctx.setFontSize(32)
      ctx.fillText('为好友点赞助力', 315, 610)

      ctx.stroke()
      ctx.draw()
    })

  },
  share:function(){
   this.setData({
     show:true,
     mask:false
   })
  },
  shareImgbtn: function () {
    console.log('图片')
    var that = this
    wx.showLoading({
      title: '努力生成中...'
    })
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 604,
      height: 1016,
      destWidth: 604,
      destHeight: 1016,
      canvasId: 'shareImg',
      success: function (res) {
        console.log(res.tempFilePath);
        that.setData({
          prurl: res.tempFilePath,
          hidden: false
        })
        wx.hideLoading()
      },
      fail: function (res) {
        console.log('失败')
        console.log(res)
      }
    })



  },
  save: function () {

    var that = this
    that.setData({
      show: false
    })
    //生产环境时 记得这里要加入获取相册授权的代码
    wx.saveImageToPhotosAlbum({
      filePath: that.data.prurl,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#72B9C3',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              that.setData({
                hidden: true
              })
            }
          }
        })
      }
    })

  },

  cancel: function () {
    this.setData({
      show: false,
      mask:true
    })
  },
  metoo:function(){
    wx.navigateBack()
  
  },


dianzan:function(){

this.setData({
  dianzan:false
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