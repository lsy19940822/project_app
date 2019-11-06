export default {
	phoneIn: function (str) {
		return !/^1[3456789]\d{9}$/.test(str);
	},
	password: function (str) {
		return !/^[a-zA-Z0-9]{8,18}$/.test(str);
	},
	email:function(str) {
		return  !/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(str);
	},
	user:function(str) {
		return !/^[a-zA-Z]{1,18}$/.test(str);
	}
	
}
