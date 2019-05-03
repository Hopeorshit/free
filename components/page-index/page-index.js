// components/page-index/page-index.js
import { GoodModel } from '../../model/index-model.js'
let goodModel = new GoodModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    goods: Object
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  ready:function() {

    this.setData({
      goods: goodModel.getHotList()
    })

  },

})
