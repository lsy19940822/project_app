import request from '@/utils/request'

export const path = 'http://47.95.118.243/API/WebAPIDataAudit/'
export const http = 'http://47.95.118.243'
export function post(url, data) {
  return request({
    url: path + url,
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
