var QQMapWX = require('../../qqmap-wx-jssdk.js');
import {
  Config
} from '../../utils/config.js'
var qqmapsdk;
Page({
  data: {
    address:"",
    title:"",
    imageSource: "../../images/addPic.png",
    borderRadius: 5,
    latitude: 0,
    longitude: 0,
    markers: [],
    callout: {
      content: '',
      bgColor: "",
      color: "",
      padding: 10,
      display: "",
      borderRadius: 5
    },
    mobileLocation: {//移动选择位置数据
      longitude: 0,
      latitude: 0,
      address: '',
    }
  },

  onSubmit:function(event){
    var value = event.detail.value;
    var path=this.data.imageToUpload;
    var title=value.title;
    var longitude=this.data.mobileLocation.longitude;
    var latitude=this.data.mobileLocation.latitude;
    var address=this.data.mobileLocation.address
   var phone=value.phone;
   this.setData({
     title:title,
     address:address
   })
         if(path==null){
           console.log("不上传图片")
         }
         else{
           wx.uploadFile({
             url: Config.restUrl + 'shop/edit',
             filePath: path,
             name: 'avatar',
             formData: {
               user_id: 1,
               name: title,
               longitude: longitude,
               latitude: latitude,
               phone: phone,
               add_name: address
             },
             success: function (res) {
               var Json = JSON.parse(res.data);
               console.log(JSON.parse(res.data))
             }
           })
         }
         
   
     
   
   }
  

  ,
  onLoad: function () {
    
   
  },
  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: function (res) {
        that.setData({
          imageSource: res.tempFilePaths[0],
          imageToUpload: res.tempFilePaths[0],
        })
      },
    })
  },

  map: function () {
    this.address()
    this.moveToLocation()
  },
  address:function(){
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'qq-map key'
    });
    var that = this;
    //获取位置
    wx.getLocation({
      type: 'gcj02',//默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标
      success: function (res) {
        console.log(res);
        var marker = [{
          id: 0,
          latitude: res.latitude,
          longitude: res.longitude,
          callout: {//窗体
            content: that.data.callout.content,
            bgColor: that.data.callout.bgColor,
            color: that.data.callout.color,
            padding: that.data.callout.padding,
            display: that.data.callout.display,
            borderRadius: that.data.callout.borderRadius
          },
        }];
        var mobileLocation = {
          latitude: res.latitude,
          longitude: res.longitude,
        };
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: marker,
        });
        //根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            var address = addressRes.result.formatted_addresses.recommend;
            mobileLocation.address = address;
            console.log(address)
            //当前位置信息
            that.setData({
              mobileLocation: mobileLocation,
            });
          }
        });
      }
    });

    this.mapCtx = wx.createMapContext('qqMap');
  },
  //移动选点
  moveToLocation: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        let mobileLocation = {
          longitude: res.longitude,
          latitude: res.latitude,
          address: res.address,
        };
        that.setData({
          mobileLocation: mobileLocation,
        });
      },
      fail: function (err) {
        console.log(err)
      }
    });
  },


  Tijiao:function(){
  if(this.data.title.length==0){
   wx.showToast({
     title: '请填写店铺名称',
     icon:"none"
   })
  }
  else{
    if (this.data.mobileLocation.address.length == 0) {
      wx.showToast({
        title: '请填写店铺地址',
        icon: "none"
      })
    }
    else{
      wx.showToast({
        title: '提交成功'
      })
      setTimeout(function () {
        wx.navigateBack()
      }, 2000) //延迟时间 这里是1秒
    }
  }


  }
});
