<template>
  <div  id="login">
	  <index-header :leftArrow="true" class="header" :titleType="1" title="常益长铁路工程管理平台"></index-header>
	  <div class="container">
	  		<div class="login-bg">
	  			<van-swipe :autoplay="3000">
	  			  <van-swipe-item v-for="(image, index) in images" :key="index">
	  				  <img :src="image.PHOTOURL" class="back_img">
	  			  </van-swipe-item>
	  			</van-swipe>
	  		</div>
	  		<div class="login-form">
	  			<p class="login-form-title">登录考试系统</p>
	  			<van-cell-group>
	  				<i class="login-form-icon"><img src="../assets/code-icon.png"></i>
	  				<van-field v-model="IDCard" placeholder="请输入您的身份证号码" />
	  			</van-cell-group>
				<van-button type="primary" @click="login()" style="width: 100%;margin-bottom: 25px;">人脸认证</van-button>
	  			<van-button color="#7232dd" @click="login()" style="width: 100%;"><span style="color:#fff">登录系统</span></van-button>
	  		</div>
	  	</div>
	  	<van-popup v-model="showTips" class="login-tips">
	  		<div>
	  			<div>
	  				<h3>《常益长铁路考试须知》</h3>
	  				<p>1.考前三十分钟，考生需持带有照片的有效证件(身份证、临时身份证、护照和港澳台通行证)和自行打印的准考证进入规定的考场。
	  					<p>2.考试期间考生可以在考桌上方的可携带物品：签字笔、铅笔、橡皮、二十四色彩笔(包含黑色、蓝色、棕色、绿色、灰色、橙色、粉色、紫色、红色、黄色)铅笔盒、塑料瓶装水、药品、纸巾和准考证。</p>
	  					<p> 3.考试期间需放在指定区域的禁止携带物品：处于关闭状态下的手机、相机或任何其他电子产品、字典、笔记本、修正液/修正带等、纸张、书包、手提包、行李箱。</p>
	  					<p> 4.考场内不得相互借用文具。严禁在考场内饮食。</p>
	  			</div>
	  			<van-button :type="primary" :color="color" :disabled="disabled" :class="{on:end}" @click="goNext()"  style="width: 100%;">请仔细阅读（{{time}}s…）后继续</van-button>
	  		</div>
	  	</van-popup>
	  </div>
  </div>
</template>

<script>
	import indexHeader from './header.vue'; //首页-左侧组件
	import * as ajax from '@/utils/api'
	import Vue from 'vue';
	import { Swipe, SwipeItem } from 'vant';
	Vue.use(Swipe).use(SwipeItem);
	import { Toast, Button, Field, CellGroup, Popup } from 'vant';
	Vue.use(Toast).use(Button).use(Field).use(Popup).use(CellGroup);
	export default {
		components: {
			indexHeader
		},
		data() {
			return {
				IDCard: '111111111111111111',
				showTips: false,
				time: 6,
				end: false,
				primary:"default",//primary
				disabled:true,
				color:"#ddd",
				images: []
			}
		},
		created() {
			this.bannerImg()
		},
		methods: {
			bannerImg(){
				ajax.get('Banner').then(res => {
					if(res.data.result) {
						console.log(res)
						this.images=res.data.data;
					}
				})
			},
			login() {
				ajax.get('Login?IDCard=' + this.IDCard).then(res => {
					console.log(res.data)
					if(res.data.result) {
						localStorage.setItem('IDCard',this.IDCard)
						this.showTips = true
						let second = 6;
						const timer = setInterval(() => {
							second--;
							if(second) {
								this.time = second
							} else {
								this.end = true
								this.time = 0
								clearInterval(timer);
								this.primary="primary";
								this.disabled=false;
								this.color='#07c160'
							}
						}, 1000);
					} else {
						Toast(res.data.resultMsg);
					}
				})
			},
			goNext() {
				if(this.end) {
					this.$router.push({
						path: '/examItem',
						query: {
							IDCard: this.IDCard
						}
					})
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	/*.container{
		padding-top: 46px;
	}*/
	.container .login-bg{
		width: 100%;
		height:auto;
		overflow: hidden;
		float: left;
	}
	.container .login-bg img.back_img {
		width: 100%;
		float: left;
		/* position: relative; */
	}
	.container .login-form{
		width:90%;
		/* height: 200px; */
		/* margin: 0 auto; */
		position: fixed;
		left: 50%;
		margin-left: -45%;
		top: 36%;
		background: #fff;
		padding: 15px;
		box-sizing: border-box;
		box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
	}
	.container .login-form .login-form-title{
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
	.container .login-form .login-form-title:before{
		left: 10px;
	}
	.container .login-form .login-form-title:after{
		right: 10px;
	}
	.container .login-form .van-cell-group{
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
		width:94%;
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
 
</style>
