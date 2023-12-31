// 同时发送异步请求的次数
let ajaxTimes = 0;
export const request = (params) =>{
  ajaxTimes ++;
  wx.showLoading({
    title: '加载中',
    mask:true
  })
  // const baseUrl = 'http://192.168.1.12:8888';
  const baseUrl = 'http://localhost:8888';
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      method:params.method,
      data:params.data,
      url: baseUrl + params.url,
      success:(result)=>{
        resolve(result.data);
      },
      fail:(err)=>{
        reject(err);
      },
      complete:()=>{
        ajaxTimes --;
        if(ajaxTimes===0){
          wx.hideLoading();
        }
      }
    })
  });
}