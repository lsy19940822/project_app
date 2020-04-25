import request from '@/utils/request'
export const http = 'http://47.95.118.243'
export const pathW = 'http://47.95.118.243:8080'//线上问题模块接口
// export const pathW = 'http://127.0.0.1:801'//本地
// export const userid = 'aed68230-f1ba-4715-9686-15354e8cb7b5'
export function post(url, data) {
	return request({
		url: http + url,
		method: 'POST',
		data
	})
}
export function postParams(url, data) {
	return request({
		url: http + url,
		method: 'POST',
		params: data
	})
}
export function postParamsW(url, data) {
	return request({
		url: pathW + url,
		method: 'POST',
		params: data
	})
}
export function postW(url, data) {
	return request({
		url: pathW + url,
		method: 'POST',
		data
	})
}

export function get(url, data) {
	return request({
		url: http + url,
//		responseType: 'text',//请求页面返回的数据类型
		method: 'GET',
		data
	})
}
export function getW(url, data) {
	return request({
		url: pathW + url,
		method: 'GET',
		data
	})
}

export function del(url, data) {
	return request({
		url: http + url,
		method: 'DELETE',
		data
	})
}
export function put(url, data) {
	return request({
		url: http + url,
		method: 'PUT',
		data
	})
}
