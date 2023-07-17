import {request} from "../../request/index.js"


Page({
  data: {
    isLogin: 0,    //0未登录，1已登录
    userInfo: {},  //用户信息
    avatarUrl: '', //用户头像
    account: 0,      //用户余额
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    wx.setStorageSync('avatarUrl', avatarUrl);
    this.setData({
      avatarUrl,
    })
  },
  getUserInfo: function(e) {
    var userInfo = e.detail.userInfo;
    var avatarUrl = userInfo.avatarUrl;
    wx.setStorageSync('avatarUrl', avatarUrl);

    var data = {
      name: userInfo.nickName,
      code: userInfo.avatarUrl,
      nickname: userInfo.nickName,
      sex: "男",
      age: "22",
      phone: "13212312345",
      address: "测试基地",
      password: "123456",
      account: 80000
    }

    request({url:"/register",data: data,method:"POST"}).then(res => {
      if (res.code === '0') {
        wx.showToast({
          title: '登录成功',
          mask: true
        })
        this.setData({
          isLogin: 1,
          userInfo: res.data,
          account: res.data.account
        });
        wx.setStorageSync('user', res.data);
      } else {
        wx.showToast({
          title: '登录失败',
          mask: true
        })
      }
    })
  },

  onLoad: function() {

    let user = wx.getStorageSync('user');
    let avatarUrl = wx.getStorageSync('avatarUrl');
    if (user) {
      this.setData({
        isLogin: 1,
        userInfo: user,
        avatarUrl: avatarUrl,
      })
    }
    request({url:"/userInfo/"+user.id}).then(res => {
      if (res.code === "0") {
        this.setData({
          account: res.data.account
        })
      }
    })
  },

  onShow: function () {
    let user = wx.getStorageSync('user');
    let avatarUrl = wx.getStorageSync('avatarUrl');
    if (user) {
      this.setData({
        isLogin: 1,
        userInfo: user,
        avatarUrl: avatarUrl
      })
    }
    request({url:"/userInfo/"+user.id}).then(res => {
      if (res.code === "0") {
        this.setData({
          account: res.data.account
        })
      }
    })
  },

  bindfocus: function() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  about: function() {
    wx.navigateTo({
      url: '/pages/about/index',
    })
  },

  notice: function() {
    wx.navigateTo({
      url: '/pages/notice/index',
    })
  },

  logout: function() {
    wx.removeStorageSync('user');
    wx.removeStorageSync('avatarUrl');
    let user = wx.getStorageSync('user');
    if (!user) {
      wx.showToast({
        title: '退出成功',
        mask:true
      })
    }

    this.setData({
      isLogin: 0,    //0未登录，1已登录
      userInfo: {},  //用户信息
      avatarUrl: '', //用户头像
      account: 0      //用户余额
    })
  },

  recharge: function() {
    let user = wx.getStorageSync('user');
    if (!user) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: '/pages/recharge/index',
      })
    }
  },

  navigateToOrder: function(e) {
    let user = wx.getStorageSync('user');
    if (!user) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    } else {
      let state = e.currentTarget.dataset.state;
      wx.navigateTo({
        url: '/pages/orderInfo/index?state=' + state
      })
    }
  },
})