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
				<div class="login-form">
					<p class="login-form-title">登录考试系统</p>
					<van-cell-group>
						<i class="login-form-icon"><img src="../assets/code-icon.png"></i>
						<van-field v-model="IDCard" placeholder="请输入您的身份证号码" />
					</van-cell-group>
					<van-button type="primary" @click="login()" style="width: 100%;margin-bottom: 25px;"><span style="color:#fff">登录系统</span></van-button>
				</div>
				<div style="width:85%;position:fixed;bottom: 15px;left:50%;margin-left:-42.5%">
					<van-button  color="rgba(112,153,208,1)" @click="goNextS()" style="width:100%;" ><span style="color:#fff">进入培训系统</span></van-button>
				</div>
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
	import RegExp from '../utils/regExp';
	import { Toast, Button, Field, CellGroup, Popup } from 'vant';
	Vue.use(Toast).use(Button).use(Field).use(Popup).use(CellGroup);
	export default {
		components: {
			indexHeader
		},
		data() {
			return {
				IDCard: '',
				showTips: false,
				time: 3,
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
		mounted() {
			
		},
		methods: {
			bannerImg(){
				ajax.get('/API/WebAPIDataAudit/Banner').then(res => {
					if(res.data.result) {
						console.log(res)
						this.images=res.data.data;
					}
				})
			},
			login() {
				if(this.IDCard == ''){
					Toast("请输入身份证号码");
				}else if(this.IDCard.length!=18){
					Toast("请输入有效身份证号码");
				}else{
					ajax.get('/API/WebAPIDataAudit/Login?IDCard=' + this.IDCard).then(res => {
							console.log(res.data)
							if(res.data.result) {
								localStorage.setItem('IDCard',this.IDCard)
								this.showTips = true
								let second = 3;
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
				}
					
				// let code=/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
				
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
			},
			goNextS() {
				this.$router.push({
					path: '/study'
				})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.container{
		padding-top: 46px;
	}
	.container .login-bg{
		width: 100%;
		height:auto;
		overflow: hidden;
		float: left;
	}
	.container .login-bg img.back_img {
		width: 100%;
		float: left;
	}
	.container .login-form{
		width: 94%;
		background: #fff;
		padding: 15px;
		box-sizing: border-box;
		box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
		margin: 0 auto;
		border-radius: 7px;
		transform: translateY(-40px);
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
