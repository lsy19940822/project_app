import request from '@/utils/request'

export const path = 'http://47.95.118.243/API/WebAPIDataAudit/'
export const http = 'http://47.95.118.243'
export const pathW = 'http://47.95.118.243:8080/api/' //问题模块接口
export const userid = 'aed68230-f1ba-4715-9686-15354e8cb7b5'
export function post(url, data) {
	return request({
		url: path + url,
		method: 'POST',
		data
	})
}
export function postParams(url, data) {
	return request({
		url: path + url,
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
		url: path + url,
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
		url: path + url,
		method: 'DELETE',
		data
	})
}
export function put(url, data) {
	return request({
		url: path + url,
		method: 'PUT',
		data
	})
}