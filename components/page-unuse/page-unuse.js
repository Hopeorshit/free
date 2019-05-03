// components/page-unuse/page-unuse.js
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
 checked1:0,
 checked2:0
  /*传入good.checked*/
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  use1:function(){
   var that=this
   if(!this.data.checked1){
    wx.showModal({
      title: '提示',
      content: '确定立即使用吗',
      success: function (res) {
           if(res.confirm){
           that.setData({
             checked1:1
           })
           }else{

           }
        } 
    })
  
   }},
    use2: function() {
      var that = this
      if (!this.data.checked2) {
        wx.showModal({
          title: '提示',
          content: '确定立即使用吗',
          success: function (res) {
            if (res.confirm) {
              that.setData({
                checked2: 1
              })
            } else {

            }

          }


        })


      }



  },

 
  }
  
})
