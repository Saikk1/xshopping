import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getNotice();
  },
       /**
   * 获取公告列表
   */
  getNotice(){
    request({url:"/advertiserInfo/page/all?pageNum=1&pageSize=100"}).then(res => {
      if(res.code === "0"){
        this.setData({
          noticeList: res.data.list
        })
      }else{
        wx.showToast({
          title: res.msg,
          icon: 'error'
        })
      }
    })
  },
})