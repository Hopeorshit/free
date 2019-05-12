// pages/test/test.js
import {
  Test
} from "../../model/test.js";
let http = new Test();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // http.userId((res)=>{
    //   console.log(res);
    // })

    http.promotionNew((res) => {
      console.log(res);
    });

    // http.promotionList((res) => {
    //   console.log(res);
    // });

    // http.promotionDetail((res) => {
    //   console.log(res);
    // });

  },




})