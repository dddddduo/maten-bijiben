import urlConfig from './config.js'
const request = {}
const headers = {}

const globalRequest = (url, method, data, power) => {
  let token = '';
  uni.getStorage({
    key: 'Authorization',
    success: function(t) {
      token = t.data
    }
  })
  headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  uni.showLoading({
    title: '加载中'
  });
  if (token) {
    headers['Authorization'] = 'Bearer ' + token
  }
  return uni.request({
    url: urlConfig + url,
    method,
    data: {
      ...data
    },
    dataType: 'json',
    header: headers,
  }).then(res => {
    uni.hideLoading();
    if (res[1].data.code === 200) {
      return res[1]
    } else {
      throw res[1].data
    }
  }).catch(parmas => {
    uni.hideLoading();
    uni.showToast({
      title: parmas.message,
      icon: 'none'
    })
    return Promise.reject()
  })
 }
export default {
  globalRequest
}