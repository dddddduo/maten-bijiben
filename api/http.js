// import flyio from 'flyio'
var Fly=require("flyio/dist/npm/wx")
var fly=new Fly
import qs from 'qs'

//设置超时
fly.config.timeout = 50000;
//设置请求基地址
import baseurl from './config.js'
fly.config.baseURL = baseurl;		// http请求地址

// 添加请求拦截器
fly.interceptors.request.use((request) => {
  // request.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
	// 在发送请求之前做些什么
	// let token = uni.getStorageSync('Authorization')
  let token = 'eyJ1Ijoie1widWlkXCI6XCIxXCIsXCJ1c2VybmFtZVwiOlwiXFx1OTFkMVxcdTUzNTNcIixcImRwX2xpbWl0XCI6XCIyMiwyNCwzMiwzMywyOTYsOCw5LDI2LDMwLDI0MCwxMCwyNjcsMTcsMjYwLDEyLDI3MSwyNzMsMjc0LDEzLDE0LDI1MSwyNTIsMjUzLDI2NCwyNjUsMjAzLDIxMCwyNTAsMjU2LDI5OCwxOCwxOSw5MSw1Miw1NSwxMTAsNTgsNTksNjAsMTA0LDY3LDY4LDgwLDY5LDExMiwxMTQsNzAsNzEsNzQsMTA3LDc1LDc2XCIsXCJwb3NfaWRcIjpcIjlcIixcImRlcGFfaWRcIjpcIjEwXCJ9IiwidCI6MTYwNjcwMTAwNywia2V5IjoiNzBmZTcxMmU3MDI1ZWVkNzNhNmUzMGIxMzNjNWE4MDYifQ=='
  // console.log(token)
	if (token) {
		request.headers['Authorization'] = 'Bearer ' + token
	}
  if (request.method === 'POST' || request.method === 'post') {
    request.body = qs.stringify(request.body)
  }
  // console.log(request)
	return request
}, function(error) {
  // console.log(error)
	// 对请求错误做些什么
	return Promise.reject(error)
})

fly.interceptors.response.use((res) => {
  // console.log(res)
  if (res.data.status === 403) {
    uni.removeStorage({
      key: 'Authorization'
    })
  }
	// 对响应数据做些事
	// if (!res.data) {
	// return Promise.reject(res)
	// }
	return res
}, (error) => {
	return Promise.reject(error)
})

export default fly

