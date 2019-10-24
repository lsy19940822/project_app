import axios from 'axios'
import {Toast} from 'vant';
// 引用vuex 来判断 token 
// import store from '../store/store.js'
// 创建 axios 实例
export const Axios = axios.create({
  baseURL: 'http://47.95.118.243/API/WebAPIDataAudit/', //测试服
  baseURL: 'http://47.95.118.243/API/WebAPIDataAudit/', //正式服
  timeout: 5000,  //请求接口的时间 毫秒
})
// 添加请求拦截器
Axios.interceptors.request.use(function(config) {
	// 在发送请求之前做些什么 设置token
	// if (store.state.token) {
	// 	// console.log(store.state.token)
	// 	config.headers.token = `${store.state.token}`;
	// }
	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});
// 添加响应拦截器
Axios.interceptors.response.use(function(response) {
	// console.log(response.data.code)
		if (response.status === 200) {            
            return Promise.resolve(response);        
        } else {            
            return Promise.reject(response);        
        }   
	// 对响应数据做点什么
	return response;
}, function(error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});


export default Axios