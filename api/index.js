import * as user from './user'
import Vue from 'vue'

//api返回结果，正确的状态
export const STATUS_OK = '200'

const api = {
	STATUS_OK: STATUS_OK,
	...user
}

Vue.prototype.$api = api
export default api
