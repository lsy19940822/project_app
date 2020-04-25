<template>
	<div class="container overflow">
		<index-header :leftArrow="false" class="header" :titleType="1" title="精品常益长"></index-header>
		<div class="login-bg">
			<van-swipe :autoplay="3000">
				<van-swipe-item v-for="(image, index) in images" :key="index">
					<img :src="image.PHOTOURL" class="back_img">
				</van-swipe-item>
			</van-swipe>
			<van-swipe :loop="false">
				<van-swipe-item class="banner-box">
					<img src="../assets/images/exam/login_txt.png" class="back_img1">
					<img src="../assets/images/exam/bj.png" class="back_img">
				</van-swipe-item>
			</van-swipe>
			<div class="login-form">

				<div class="form overflow">
					<h3>登录系统</h3>
					<div class="formInput"><img src="../assets/icon_user@2x.png" alt=""><input type="text" placeholder="请输入手机号/用户名" v-model="user"></div>
					<div class="formInput"><img src="../assets/icon_password@2x.png" alt=""><input type="passWord" placeholder="请输入密码" v-model="passWord"></div>
					<div class="loginButton" @click="phoneLogin()">登录系统</div>

					<div class="overflow">
						<van-checkbox v-model="checked" shape="square" @click="toggle(checked)" style="color: #999;">记住密码</van-checkbox>
					</div>

				</div>
				
			</div>
		</div>
	</div>
</template>
<script>
	import indexHeader from './header.vue'; //首页-左侧组件
	import * as ajax from '@/utils/api'
	import RegExp from '../utils/regExp'
	import Vue from 'vue';
	import { Tab, Tabs } from 'vant';
	Vue.use(Tab).use(Tabs);

	import { Checkbox, CheckboxGroup } from 'vant';
	Vue.use(Checkbox).use(CheckboxGroup);
	import { Swipe, SwipeItem } from 'vant';
	Vue.use(Swipe).use(SwipeItem);
	import { Toast, Button, Field, CellGroup, Popup } from 'vant';
	Vue.use(Toast).use(Button).use(Field).use(Popup).use(CellGroup);

	import qs from 'qs'
	export default {
		components: {
			indexHeader
		},
		data() {
			return {
				user: '',
				passWord: '',
				IDCard: '',
				images: [],
				active: 0,
				checked: false
			}
		},
		created() {
		},
		mounted() {
			this.localStorageUser();
		},
		methods: {
			toggle(val) {
				
				if(val == false || val == null) {
					localStorage.setItem("user", (/^\w+$/.test(this.user) ? this.user : null || /^\d+$/.test(this.user) ? this.user : null))
					localStorage.setItem("passWord", this.passWord)
					localStorage.setItem("checked", true)
				} else {
					localStorage.setItem("user", '')
					localStorage.setItem("passWord", '')
					localStorage.setItem("checked", false)
					
				}
				this.localStorageUser();
			},
			
			bannerImg(){
				ajax.get('/API/WebAPIDataAudit/Banner').then(res => {
					if(res.data.result) {
						
						this.images = res.data.data;
					}
				})
			},
           
			phoneLogin() {
				if(!this.user || this.user.trim() == "") {
					Toast('请输入用户名/手机号！');
					return;
				}
				if(/^\d+$/.test(this.user) && RegExp.phoneIn(this.user)) {
					Toast('请输入正确格式手机号');
					return;
				}
				if(/^[a-zA-Z]+$/.test(this.user) && RegExp.user(this.user)) {
					Toast('请输入正确格式用户名');
					return;
				}
				if(RegExp.phoneIn(this.user) && RegExp.user(this.user)) {
					Toast('请输入正确格式用户名或手机号');
					return;
				}
				if(this.passWord == '') {
					Toast('请输入密码！');
					return;
				}
				if(this.user.trim() != '' && this.passWord != '') {
					const toast = Toast.loading({
						duration: 0, // 持续展示 toast
						forbidClick: true, // 禁用背景点击
						loadingType: 'spinner',
						message: '登录中...'
					});
					ajax.postParams('/API/WebAPIDataAudit/UserLanding', {
						'USERCODE': /^\w+$/.test(this.user) ? this.user : null,
						'CELLPHONE': /^\d+$/.test(this.user) ? this.user : null,
						'PASSWORD': this.passWord
					}).then(res => {
						if(res.data.result) {
							localStorage.setItem("user", (/^\w+$/.test(this.user) ? this.user : null || /^\d+$/.test(this.user) ? this.user : null))
							sessionStorage.setItem("chang_yi_User_token", true)
							
							toast.clear();
							this.$router.push({
								path: '/index',
								query: {
									userId: res.data.data[0].USERID
								}
							})
							
							res.data.data[0].PHOTOURL=ajax.http+res.data.data[0].PHOTOURL.slice(2)
							sessionStorage.setItem("chang_yi_UserData", JSON.stringify(res.data.data[0]))
							

						} else {
							Toast(res.data.resultMsg);
						}
					})
				}

			},
			localStorageUser(){
				this.user=localStorage.getItem("user")
				this.passWord=localStorage.getItem("passWord")
				this.checked=localStorage.getItem("checked")	
			},
		}
	}
</script>
<style scoped>
	.container .login-bg {
		width: 100%;
		height: auto;
		margin-top: 46px;
		overflow: hidden;
		float: left;
	}
	.banner-box {
		position: relative;
	}
	.banner-box img.back_img1 {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-100%);
		-webkit-transform: translateX(-50%) translateY(-100%);
		-moz-transform: translateX(-50%) translateY(-100%);
		-ms-transform: translateX(-50%) translateY(-100%);
		-o-transform: translateX(-50%) translateY(-100%);
	}
	.container .login-bg img.back_img {
		width: 100%;
		float: left;
	}
	
	.container .login-form {
		width: 94%;
		background: #fff;
		padding: 15px;
		box-sizing: border-box;
		box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
		margin: 0 auto;
		border-radius: 7px;
		transform: translateY(-40px);
	}
	
	.container .login-form .login-form-title {
		font-size: 14px;
		color: #999;
		text-align: center;
		margin: 0;
		position: relative;
	}
	
	.container .login-form .login-form-title:before,
	.container .login-form .login-form-title:after {
		display: block;
		content: "";
		position: absolute;
		width: 30%;
		height: 1px;
		background: #EEEEEE;
		top: 50%;
		transform: translateY(-50%);
	}
	
	.container .login-form .login-form-title:before {
		left: 10px;
	}
	
	.container .login-form .login-form-title:after {
		right: 10px;
	}
	
	.container .login-form .van-cell-group {
		margin: 30px 0;
		border: 1px solid rgba(221, 221, 221, 1);
		padding-left: 30px;
	}
	
	.van-cell-group .login-form-icon {
		position: absolute;
		left: 12px;
		width: 16px;
		height: 16px;
		display: inline-block;
		top: 50%;
		transform: translateY(-50%);
	}
	
	.login-form-icon img {
		width: 100%;
	}
	
	.van-cell-group .van-cell {
		padding-left: 10px;
	}
	
	.container .login-form .primary {
		color: #fff;
		width: 100%;
		cursor: pointer;
	}
	
	.login-tips {
		width: 94%;
		/* width: 340px; */
		padding: 20px;
		font-size: 14px;
		color: #999;
		box-sizing: border-box;
	}
	
	.login-tips h3 {
		margin: 0;
		color: #333;
		font-size: 20px;
	}
	
	.login-tips .primary {
		width: 100%;
		border-radius: 6px;
		background: #AAAAAA;
		color: #fff;
	}
	
	.login-tips .primary.on {
		background: #7099D0;
		cursor: pointer;
	}
	
	.loginButton {
		color: #fff;
		text-align: center;
		line-height: 50px;
		font-size: 14px;
		height: 50px;
		background: rgba(104, 153, 230, 1);
		border-radius: 2px;
		margin-bottom: 20px;
	}
	
	.formInput {
		width: 100%;
		height: 48px;
		background: rgba(255, 255, 255, 0.15);
		border-radius: 2px;
		padding: 10px 15px;
		border: 1px solid #ddd;
		margin-bottom: 25px;
	}
	
	.formInput img {
		width: 18px;
		height: 18px;
		margin: 5px 10px 0;
	}
	
	input::-webkit-input-placeholder {
		color: #7d7e80;
	}
	
	input::-moz-input-placeholder {
		color: #7d7e80;
	}
	
	input::-ms-input-placeholder {
		color: #7d7e80;
	}
	
	.formInput input {
		border: none;
		background: none;
		outline: none;
		color: rgba(82, 103, 141, 1);
	}
	
	.formInput img,
	.formInput input {
		display: block;
		float: left;
	}
	
	.formInput input {
		width: 80%;
		margin-top: -2px;
	}
	/deep/ .van-tabs__line {
		border-bottom: 3px solid #9499AA;
		width: 50% !important;
		color: #333;
	}
	
	h3 {
		height: 24px;
		font-size: 17px;
		font-family: PingFangSC-Medium, PingFang SC;
		text-align: center;
		color: rgba(51, 51, 51, 1);
		margin: 0 0 10px;
		line-height: 24px;
	}
	
	h4 {
		height: 33px;
		font-size: 28px;
		font-family: FZZCHJW--GB1-0, FZZCHJW--GB1;
		font-weight: normal;
		color: rgba(255, 255, 255, 1);
		line-height: 33px;
		text-align: center;
		margin: 24px 0 0;
	}
	
	p {
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		margin: 0 !important;
		color: #333;
		float: right;
	}
</style>