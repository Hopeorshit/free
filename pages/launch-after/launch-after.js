// pages/launch-after/launch-after.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    title:"",
  num:"",
  orderData:'',
    imgsrc:"/images/mian.jpg",
    userInfo: {},
    show:false,
    hidden:true,
    locolurl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   //接收上个发起页面填写的信息
      var good = JSON.parse(options.good)
    
     this.setData({
      title: good.title,
     num:good.num,
      orderData:good.orderData
     })
    //获取用户头像
  var userInfo = app.globalData.userInfo
  console.log(userInfo)
  this.setData({
    userInfo:userInfo
  })   
 
  //画布内容
    wx.getImageInfo({
      src: app.globalData.userInfo.avatarUrl,    
      success: function (res) {
       
        app.globalData.userImage = res.path;

      }})


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
        src: '/images/mian.jpg',
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
      ctx.fillRect(0,0,604,1016)

      ctx.setFillStyle("#ffffff")
      ctx.fillRect(20,250,564,750)
    
      ctx.save();

      ctx.beginPath(); //开始绘制
      ctx.arc(315, 70, 50, 0, Math.PI * 2, false);

      ctx.clip();

      ctx.drawImage(app.globalData.userImage, 265, 20, 100, 100)

      ctx.restore();
    

      ctx.drawImage('../../' + res[1].path, 52, 270, 500, 300)
      ctx.drawImage('../../' + res[2].path, 170, 720, 240, 240)
       
     
      var str ='免单：'+good.title +'X'+good.num
      if(str.length<17)
      {ctx.setFillStyle('#666f6c')
      ctx.setFontSize(30)
      ctx.fillText(str, 60, 620)}
      else{
        for(var i=0;i<str.length;i++){
          if(i<16){
            ctx.setFillStyle('#666f6c')
            ctx.setFontSize(30)
            ctx.fillText(str[i], 60+i*30, 620)
          }
          else{
            ctx.setFillStyle('#666f6c')
            ctx.setFontSize(30)
            ctx.fillText(str[i], 60+(i-16)*30, 660)

          }
         
        }
  
      }

      ctx.setFillStyle('#c1bac1')
      ctx.setFontSize(24)
      ctx.fillText(good.orderData, 60,690)
     
     
      ctx.beginPath()
      ctx.moveTo(52,705)
      ctx.lineTo(552,705)
     
      ctx.setTextAlign('center')
      ctx.setFillStyle('#ffffff')
      ctx.setFontSize(24)
      ctx.fillText(userInfo.nickName, 315,170 )
 
      ctx.setFillStyle('#ffffff')
      ctx.setFontSize(32)
      ctx.fillText('发起了一个免单活动', 315,230)

      ctx.stroke()
      ctx.draw()
    })

  },
  sharebtn:function(){
  this.setData({
    show:true
  })
  },

  shareImgbtn:function(){
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
  save:function(){

    var that = this
    that.setData({
      show:false
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

  cancel:function(){
    this.setData({
      show:false
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') 
    { console.log("来自页面内转发按钮"); console.log(res.target); } 
    else { console.log("来自右上角转发菜单") } 
    return { title: '我发起了一个免单活动', path: '/pages/IndexDetail/IndexDetail?bid=1', imageUrl: "", success: (res) => { console.log("转发成功", res); }, fail: (res) => { console.log("转发失败", res); }

  }}
})