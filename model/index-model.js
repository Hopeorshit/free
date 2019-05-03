class GoodModel{
  getHotList() {
    
      /* url: '',*/
      /*数据来源*/
      var data=[{
        id:"1",/*首页点击详情时需要传入唯一的id号*/
        checkeduse: 0,/*免单券使用状态 默认值是0*/
        image:"/images/food.jpg",/*六个值是商家发起填的表单*/
        title:"小东北 豪华双人套餐",
        dianzanshu:66,
        date:"04月01日 18:00",
        address:"集美区集美大道66号",
        guoqi:"2019-05-23",
        num:2
       
      },
      { id:"2",
        image: "/images/food2.jpg",
        title: "益禾堂 草莓奶盖芝士草莓奶盖草莓大杯",
        dianzanshu: 38,
        date:"05月11日 09:00",
        address:"集美区集美区华侨大学三楼四楼五楼",
        guoqi:"2010-07-03",
        checkeduse: 0,
        num:3
      },
        { id:"3",
          image: "/images/food2.jpg",
          title: "炸酱面 草莓芝士奶盖芝士草莓奶盖草莓大杯",
          dianzanshu: 108,
          date: "05月11日 09:00",
          address:"万达广场金街233号",
          guoqi:"2019-06-12",
          checkeduse: 0,
          num:4
        }
      ]
      return data
  }
}
export {GoodModel}