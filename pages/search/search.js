import {request} from "../../request/index.js"
import {config} from "../../request/config.js"
Page({
  data: {
    defaultImageUrl: '../../imgs/default.png',
    goodsInfoGoodsList: [],           //本站商品列表
  },
  onLoad:function(){
    this.getGoodsInfoAllList();
    this.getGoodsInfoGoodsList('all');
  },
  //获取本站所有商品
  getGoodsInfoAllList(){
    request({url:'/goodsInfo/page/all?pageNum=1&pageSize=100'}).then(res=>{
      if(res.code==='0'){
        let goodsInfoAllList = res.data.list;
        if(!goodsInfoAllList||goodsInfoAllList.length === 0){
          goodsInfoAllList.push({"name": "名称1","url": this.data.defaultImageUrl});
          goodsInfoAllList.push({"name": "名称2","url": this.data.defaultImageUrl});
          goodsInfoAllList.push({"name": "名称3","url": this.data.defaultImageUrl});
          goodsInfoAllList.push({"name": "名称4","url": this.data.defaultImageUrl});
          goodsInfoAllList.push({"name": "名称5","url": this.data.defaultImageUrl});
          goodsInfoAllList.push({"name": "名称3","url": this.data.defaultImageUrl});
          goodsInfoAllList.push({"name": "名称4","url": this.data.defaultImageUrl});
          goodsInfoAllList.push({"name": "名称5","url": this.data.defaultImageUrl});
        }else{
          if(goodsInfoAllList.length>9){
            goodsInfoAllList = goodsInfoAllList.slice(0,goodsInfoAllList.length);
          }
          goodsInfoAllList.forEach(item =>{
            if(!item.fields||item.fields==='[]'){
              item.url = this.data.defaultImageUrl;
            }else{
              let fileArr = JSON.parse(item.fields);
              item.url = config.baseFileUrl+fileArr[0];
            }
          });
        }
        this.setData({
          goodsInfoAllList
        }),
        this.setData({
          current:0
        })
      }else{
        wx.showToast({
          title: res.msg,
          icon:'none'
        })
      }
    })
  },

   //获取本站所有商品
   getGoodsInfoGoodsList(name){
    if(name==null||name==''||name==' '){
      name = 'all';
    }
    request({url: '/goodsInfo/page/'+name+'?pageNum=1&pageSize=100'}).then(res => {
      if(res.code === '0'){
        let goodsInfoGoodsList = res.data.list;        
        goodsInfoGoodsList.forEach(item => {
          if (!item.fields||item.fields==='[]') {
            item.url = this.data.defaultImageUrl;
          }else{
            let fileArr = JSON.parse(item.fields);
            item.url = config.baseFileUrl+fileArr[0];
          }
        });
        this.setData({
          goodsInfoGoodsList
        })
      }else{
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
    /**
   * 根据商品名称模糊搜索
   */
  search: function(e) {
    var name = e.detail.value;
    this.getGoodsInfoGoodsList(name);
  }
});
