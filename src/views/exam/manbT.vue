<template>
	<div id="examrecord">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2"></vant-header>
		<ul id="Bt_list">
			<li><img src="../../assets/exam_man@2x (3).png" alt="">
				<div>光线充足<br>正对手机</div>
			</li>
			<li><img src="../../assets/exam_man@2x (2).png" alt="">
				<div>不要在灰暗<br>或逆光下扫描</div>
			</li>
			<li><img src="../../assets/exam_man@2x (1).png" alt="">
				<div>不要斜视<br>手机</div>
			</li>
		</ul>
		<div class="scanning-box" v-show="scanImg"></div>
		<div class="uploader-img-box" v-show="scanImg">
			<span class="line"></span>
			<van-image :src="uploaderImg" class="uploader-img" />
		</div>
		<van-uploader :after-read="afterRead" class="upload-btn" ref="uploadBtn">
			<van-button type="primary" :square="true" size="large" style="font-size: 16px;">开始验证</van-button>
		</van-uploader>
	</div>
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import * as ajax from '@/utils/api'
	import Vue from 'vue';
	import { Cell } from 'vant';
	import { Uploader } from 'vant';
	import { Button } from 'vant';
	import { Image } from 'vant';
	import { Toast } from 'vant';

	Vue.use(Toast);

	Vue.use(Image);

	Vue.use(Button);

	Vue.use(Uploader);

	Vue.use(Cell)
	export default {
		components: {
			vantHeader,
		},
		data() {
			return {
				questionText: "人脸识别",
				uploaderImg: "",
				scanImg: false
			}
		},
		created() {

		},
		mounted() {
			// dom渲染完后将UI上传组件的input添加属性，使之只可以拍照上传
			this.$refs.uploadBtn.$el.getElementsByTagName("input")[0].setAttribute("capture", "camera");
		},
		methods: {
			afterRead(file) {
				var _this = this;
				this.scanImg = true;
				console.log(file)
				this.uploaderImg = file.content;
				console.log(file.file)
				var formData = new FormData();
				formData.append("imageFile",file.file);
				formData.append("groupName", '2标');
				
				setTimeout(function() {
					ajax.postW('/api/faceRecognition/recognizeFace', formData).then(res => {
						console.log(res)
						_this.scanImg = false;
						if(res.status == 200 && res.data.code == 200) {
							if(res.data.data.Data.length > 0)
								_this.$router.push("/information?IDCard="+res.data.data.Data[0].image);
							else Toast('未匹配到相关人员');
						} else {
							Toast(res.data.msg || '未匹配到相关人员');
						}
					});
				}, 1000)
			}
		}
	}
</script>

<style scoped>
	#examrecord {
		padding-top: 46px;
		background: #fff;
		position: fixed;
		top: 0;
		width: 100%;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: auto;
	}
	
	#Bt_list {
		width: 90%;
		height: auto;
		overflow: hidden;
		margin: 0 auto;
	}
	
	li {
		width: 100%;
		height: auto;
		padding: 20px 0;
		overflow: hidden;
		border-bottom: 1px solid #ddd;
	}
	
	li img {
		width: 108px;
		height: 108px;
		border: 1px dashed #ddd;
		float: left;
		display: block;
		margin-left: 50px;
	}
	
	li div {
		margin: 24px 16px;
		float: left;
	}
	
	input.file {
		position: relative;
		-moz-opacity: 0;
		filter: alpha(opacity: 0);
		opacity: 0;
		z-index: 2;
	}
	
	.wrapper {
		color: #fff;
		background-color: #31b0d5;
		border-color: #269abc;
		margin-top: 5px;
		margin-bottom: 5px;
		display: inline-block;
		padding: 6px 12px;
		margin-bottom: 0;
		font-size: 14px;
		font-weight: 400;
		line-height: 1.42857143;
		text-align: center;
		white-space: nowrap;
		vertical-align: middle;
		-ms-touch-action: manipulation;
		touch-action: manipulation;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		background-image: none;
		border: 1px solid transparent;
		border-radius: 4px;
	}
	
	.upload-btn {
		margin-bottom: 10px;
	}
	
	.scanning-box {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .3);
		z-index: 49;
	}
	
	.uploader-img-box {
		position: fixed;
		top: 50%;
		left: 20%;
		z-index: 50;
		width: 60%;
		height: auto;
		transform: translateY(-70%);
		-webkit-transform: translateY(-70%);
		-moz-transform: translateY(-70%);
		-ms-transform: translateY(-70%);
		-o-transform: translateY(-70%);
	}
	
	.uploader-img-box:before,
	.uploader-img-box:after,
	.uploader-img:before,
	.uploader-img:after {
		content: '';
		display: inline-block;
		position: absolute;
		width: 30px;
		height: 30px;
		border: 5px solid #fff;
	}
	
	.uploader-img-box:before {
		top: -10px;
		left: -10px;
		border-right: none;
		border-bottom: none;
	}
	
	.uploader-img-box:after {
		right: -10px;
		top: -10px;
		border-left: none;
		border-bottom: none;
	}
	
	.uploader-img:before {
		bottom: -10px;
		left: -10px;
		border-top: none;
		border-right: none;
	}
	
	.uploader-img:after {
		right: -10px;
		bottom: -10px;
		border-left: none;
		border-top: none;
	}
	
	.line {
		display: inline-block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 3px;
		background: #666;
		border-radius: 50%;
		z-index: 51;
		animation: moving 1s linear infinite;
		-webkit-animation: moving 1s linear infinite;
		-moz-animation: moving 1s linear infinite;
		-ms-animation: moving 1s linear infinite;
		-o-animation: moving 1s linear infinite;
	}
	
	@keyframes moving {
		0% {
			top: 0;
		}
		100% {
			top: 100%;
		}
	}
	
	@-webkit-keyframes moving {
		0% {
			top: 0;
		}
		100% {
			top: 100%;
		}
	}
	
	@-moz-keyframes moving {
		0% {
			top: 0;
		}
		100% {
			top: 100%;
		}
	}
	
	@-ms-keyframes moving {
		0% {
			top: 0;
		}
		100% {
			top: 100%;
		}
	}
	
	.uploader-img {
		display: inline-block;
		width: 100%;
		height: auto;
	}
</style>