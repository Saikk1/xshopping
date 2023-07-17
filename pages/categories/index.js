import {request} from "../../request/index.js"
import {config} from "../../request/config.js"
Page({
  data:{
    defaultImageUrl:'../../imgs/default.png',
    goodsInfoCarouselList:[],    //轮播图列表
    goodsInfoRecommendList:[],   //推荐商品列表
    currentTab: 0,
    taskList: [],         //分类列表
    contentList:[],       //分类商品列表
    goodsInfoAllList:[],    //所有商品列表
  },
  onLoad:function(){
    this.getGoodsInfoCarouselList();
    this.getGoodsInfoRecommendList();
    this.getGoodsList(1);
    this.getTaskList();
    this.getGoodsInfoAllList();
  },

  //ScrollView
  handleClick(e) {
    let {id} = e.currentTarget.dataset;
    let currentTab = id-1;
   
    this.setData({
      currentIndex: id,
     currentTab:currentTab
    })
  },
  handleSwiper(e) {
    let {id} = e.currentTarget.dataset;
    let {
      current,
      source
    } = e.detail;
    let contentList = this.getGoodsList(current+1);
    if (source === 'autoplay' || source === 'touch') {
      let currentTab = current;
      let currentIndex = current+1;
      this.setData({
        currentTab,
        currentIndex,
        contentList: contentList
      })
    }
  },
  handleTolower(e){
    wx.showToast({
      title: '到底啦'
    })
  },
  refresherpulling() {
    wx.showLoading({
      title: '刷新中'
    })
    setTimeout(() => {
      this.setData({
        isRefresh: false
      })
      wx.showToast({
        title: '加载完成'
      })
    }, 1500)
  },
  //获取轮播图
  getGoodsInfoCarouselList(){
    request({url:'/goodsInfo/page/all?pageNum=1&pageSize=8'}).then(res=>{
      if(res.code==='0'){
        let goodsInfoCarouselList = res.data.list;
        if(!goodsInfoCarouselList||goodsInfoCarouselList.length === 0){
          goodsInfoCarouselList.push({"name": "名称1","url": this.data.defaultImageUrl});
          goodsInfoCarouselList.push({"name": "名称2","url": this.data.defaultImageUrl});
          goodsInfoCarouselList.push({"name": "名称3","url": this.data.defaultImageUrl});
          goodsInfoCarouselList.push({"name": "名称4","url": this.data.defaultImageUrl});
          goodsInfoCarouselList.push({"name": "名称5","url": this.data.defaultImageUrl});
          goodsInfoCarouselList.push({"name": "名称3","url": this.data.defaultImageUrl});
          goodsInfoCarouselList.push({"name": "名称4","url": this.data.defaultImageUrl});
          goodsInfoCarouselList.push({"name": "名称5","url": this.data.defaultImageUrl});
        }else{
          if(goodsInfoCarouselList.length>9){
            goodsInfoCarouselList = goodsInfoCarouselList.slice(0,9);
          }
          goodsInfoCarouselList.forEach(item =>{
            if(!item.fields||item.fields==='[]'){
              item.url = this.data.defaultImageUrl;
            }else{
              let fileArr = JSON.parse(item.fields);
              item.url = config.baseFileUrl+fileArr[0];
            }
          });
        }
        this.setData({
          goodsInfoCarouselList
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

  //获取推荐商品
  getGoodsInfoRecommendList(){
    request({url:'/goodsInfo/findRecommendGoods/'}).then(res=>{
      if(res.code==='0'){
        let goodsInfoRecommendList = res.data.list;
        if(!goodsInfoRecommendList||goodsInfoRecommendList.length === 0){
          goodsInfoRecommendList.push({"name": "名称1","url": this.data.defaultImageUrl});
          goodsInfoRecommendList.push({"name": "名称2","url": this.data.defaultImageUrl});
          goodsInfoRecommendList.push({"name": "名称3","url": this.data.defaultImageUrl});
          goodsInfoRecommendList.push({"name": "名称4","url": this.data.defaultImageUrl});
          goodsInfoRecommendList.push({"name": "名称5","url": this.data.defaultImageUrl});
        }else{
          if(goodsInfoRecommendList.length>6){
            goodsInfoRecommendList = goodsInfoRecommendList.slice(0,goodsInfoRecommendList.length);
          }
          goodsInfoRecommendList.forEach(item =>{
            if(!item.fields||item.fields==='[]'){
              item.url = this.data.defaultImageUrl;
            }else{
              let fileArr = JSON.parse(item.fields);
              item.url = config.baseFileUrl+fileArr[0];
            }
          });
        }
        this.setData({
          goodsInfoRecommendList
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

  //根据类型获取商品列表
  getGoodsList(typeid){
    request({url:'/goodsInfo/findByType/'+typeid}).then(res=>{
      if(res.code==='0'){
          let list = res.data;
          if(list){
            list.forEach(item =>{
              if(!item.fields||item.fields==='[]'){
                item.url = this.data.defaultImageUrl;
              }else{
                let fileArr = JSON.parse(item.fields);
                item.url = config.baseFileUrl+fileArr[0];
              }
            });
            this.setData({
              contentList:list
            })
          }
      }
    })
  },
  //获取顶部菜单
  getTaskList(){
    request({url:'/typeInfo/page/all'}).then(res=>{
      if(res.code==='0'){
        this.setData({
          taskList:res.data.list
        })
      }
    })
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

  bindfocus(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
});
