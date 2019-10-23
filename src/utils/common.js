export function formatTime(da) {
  var date = new Date(da)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export function formatDate(da) {
	var date = new Date(da)
	var year = date.getFullYear()
	var month = date.getMonth() + 1
	var day = date.getDate()
	return [year, month, day].map(formatNumber).join('-')
}



function formatNumber (n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export function getUrlKey (name) {
  return decodeURIComponent(
    (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}

export let imgUrl = 'https://ldximg.oss-cn-beijing.aliyuncs.com/wqx/hd/wechat.png'