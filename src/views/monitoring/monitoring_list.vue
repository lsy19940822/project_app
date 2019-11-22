<template>
	<div class="study">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2" v-show="curPlayerId == ''">
		</vant-header>
		<div class="container overflow" :class="{'container-full': curPlayerId != ''}">
			<div class="container_header overflow l-dropdown" v-show="curPlayerId == ''">
				<van-dropdown-menu class='van-dropdown'>
					<van-dropdown-item v-model="value1" :options="option1" @change="change1(value1)" />
					<van-dropdown-item v-model="value2" :disabled="disabledSection" :options="option2" @change="change2(value2)" />
				</van-dropdown-menu>
			</div>
			<div class="flase" v-show="!GetVideoDatashow" style="background: none; text-align:center;padding:20px;font-size: 14px;color: #ddd;">暂无视频源</div>
			<ul class="container_list" v-show="GetVideoDatashow">
				<li class="overflow" v-for='(item,index) in GetVideoData' :key="index">
					<div class="video-cover" :class="{'video-play': curPlayerId == 'myPlayer' + (index + 1)}" ontouchmove="return false;">
						<!-- controls -->

						<van-icon name="cross" class="video-close" v-show="curPlayerId == 'myPlayer' + (index + 1)" @click="videoButton('myPlayer' + (index + 1), 'pause')" />
						<video webkit-playsinline playsinline :ref="'myPlayer' + (index + 1)" :id="'myPlayer' + (index + 1)" width="100%" height="100%" poster="../../assets/images/exam/video_cover2.png" x-webkit-airplay="true" x5-video-player-fullscreen="true" preload="auto" x5-video-player-typ="h5">

							<source :src="item.VIDEOURL" type="application/x-mpegURL" />
						</video>
						<!--<video ref="myPlayer1" id="myPlayer1" width="100%" height="auto" controls playsInline webkit-playsinline>
							<source :src="curPlayVideo.VIDEOURL" type="application/x-mpegURL" />
						</video>-->
						<div class="video-coverS" v-show="curPlayerId != 'myPlayer' + (index + 1)"></div>
						<img src="../../assets/images/exam/video.png" alt="" class="video" v-show="curPlayerId != 'myPlayer' + (index + 1)" @click="videoButton('myPlayer' + (index + 1), 'play')">
						<img src="../../assets/images/exam/video_cover2.png" alt="" width="100%" height="100%" @click="playVideo(item)">
					</div>
					<p>【{{item.SECTION}}】 {{item.VIDEONAME}}</p>
				</li>

			</ul>
			<!-- <van-dialog v-model="show" :title="'【' + curPlayVideo.SECTION + '】' + curPlayVideo.VIDEONAME" @close="videoClose" :showCancelButton='false' confirmButtonText='关闭'>
				
			</van-dialog> -->
			<!-- <van-loading class="spinner" v-if = 'isLoading' size="24px" type="spinner">加载中...</van-loading> -->
		</div>
		<!-- <study-footer></study-footer> -->
	</div>

</template>

<script>
	import vantHeader from '@/components/header.vue'
	import studyFooter from '@/components/studyFooter.vue'

	import Vue from 'vue';
	import { DropdownMenu, DropdownItem, Cell, Loading, Icon } from 'vant';

	import { Dialog } from 'vant';
	Vue.use(Dialog);
	Vue.use(DropdownMenu).use(DropdownItem).use(Cell).use(Loading).use(Icon);
	import * as ajax from '@/utils/api'
	export default {
		components: {
			vantHeader,
			studyFooter
		},
		data() {
			return {
				questionText: "视频监控",
				value1: 0,
				value2: 0,
				show: false,
				GetVideoData: [],
				option1: [{
						text: 'CYCZQ-1标',
						value: 0
					},
					{
						text: 'CYCZQ-2标',
						value: 1
					},
					{
						text: 'CYCZQ-3标',
						value: 2
					},
					{
						text: 'CYCZQ-4标',
						value: 3
					},
					{
						text: 'CYCZQ-5标1',
						value: 4
					},
					{
						text: 'CYCZQ-5标2',
						value: 5
					},
					{
						text: 'CYCZQ-6标',
						value: 6
					},
				],
				option2: [{
					text: '全部工点',
					value: 0
				}],
				isLoading: true,
				Section: '',
				Worksite: '',
				disabledSection: false,
				GetVideoDatashow: true,
				curPlayVideo: {},
				player: "",
				curPlayerId: ""
			}
		},
		created() {
			this.value1 = Number(this.$route.query.value || 0);
			this.change1(this.value1)
			this.StaffRetrieveList()
			this.getUserWorkPointList();
		},
		mounted() {
			this.getUserWorkPointList();
			var video = document.querySelector('#mainvideo');
			var videobox = document.querySelector('.videobox');

			//播放时改变外层包裹的宽度，使video宽度增加，
			//相应高度也增加了,播放器控件被挤下去，配合overflow：hidden
			//控件看不见也触摸不到了
			var setVideoStyle = function() {
				videobox.style.width = '120%';
				videobox.style.left = '-10%';
				video.style.width = '100%';
			}
			//			this.player = new EZUIPlayer(this.$refs.myPlayer);
			//			this.player = new EZUIPlayer('myPlayer1');
			//			setTimeout(function () {
			//				this.player.play();
			//			}.bind(this), 3000)
		},
		methods: {
			change1(val) {
				this.Section = this.option1[val].text
				console.log("当前标段：", this.option1[val].text)
				this.StaffRetrieveList();
				this.getUserWorkPointList();
				this.option2.splice(1);
			},
			change2(val) {
				if(val == 0){
					this.Worksite = '';
				}else{
					this.Worksite = this.option2[val].text.replace("#", "%23")
				}
				
				console.log("当前工点：", this.option2[val].text);
				this.getUserWorkPointList();
			},
			getUserWorkPointList() {
				let that = this;
				//视频
				ajax.get('/API/WebAPIDataAudit/GetVideo?Section=' + this.Section + '&Worksite=' + this.Worksite).then(res => {
					if(res.data.result == false) {
						that.GetVideoDatashow = false;
						return;
					}
					if(res.data.result == true) {
						that.GetVideoDatashow = true;
						that.GetVideoData = res.data.data;
						/// 微信端自动播放
						//						document.addEventListener("WeixinJSBridgeReady", function() {
						//							for(var v = 1; v <= that.GetVideoData.length; v++) {
						//								document.getElementById('myPlayer' + v).play();
						//							}
						//						}, false);
						//						wx.getNetworkType({
						//							success: function(res) {
						//								for(var v2 = 1; v2 <= that.GetVideoData.length; v2++) {
						//									document.getElementById('myPlayer' + v2).play();
						//								}
						//							}
						//						});
						return;
					}
				})

			},
			// 工点
			StaffRetrieveList() {
				let that = this;
				ajax.get('/API/WebAPIDataAudit/GetWorkarea?Section=' + this.Section).then(res => {
					if(res.data.result == false) {
						that.disabledSection = true;
						return;
					}
					if(res.data.result == true) {
						for(let k in res.data.data) {
							if(res.data.data[k].WORKAREA != null) {
								that.option2.push({
									text: res.data.data[k].WORKAREA,
									value: Number(k)
								})
							}
						}
						that.disabledSection = false;
						return;
					}
				})
			},
			playVideo(item) {
				this.show = true;

				Object.assign(this.curPlayVideo, item);
			},
			//进入全屏
			//			FullScreen(el) {
			//				var ele = this.$refs[el][0];
			//				if(ele.requestFullscreen) {
			//					ele.requestFullscreen();
			//				} else if(ele.mozRequestFullScreen) {
			//					ele.mozRequestFullScreen();
			//				} else if(ele.webkitRequestFullScreen) {
			//					ele.webkitRequestFullScreen();
			//				}
			//			},
			// //退出全屏
			// exitFullscreen() {

			//     var de = this.$refs.myPlayer;
			//     if (de.exitFullscreen) {
			//         de.exitFullscreen();
			//     } else if (de.mozCancelFullScreen) {
			//         de.mozCancelFullScreen();
			//     } else if (de.webkitCancelFullScreen) {
			//         de.webkitCancelFullScreen();
			//     }
			// },
			videoButton(el, type) {
				console.log(this.$refs[el])
				if(type == 'play') {
					this.curPlayerId = el;
					this.$refs[el][0].play();
					return;
				}
				if(type == 'pause') {
					this.curPlayerId = '';
					this.$refs[el][0].pause();
				}
			},
			videoClose() {
				//				this.curPlayVideo.VIDEOURL = "";
				//				this.player.stop();
				//				this.$refs.myPlayer.stop();
			}
		}
	}
</script>

<style scoped>
	.study {
		height: 100%;
	}
	/* 去掉全屏时显示的自带控制条 */
	
	video::-webkit-media-controls {
		display: none !important;
	}
	/*video默认全屏按钮*/
	
	video::-webkit-media-controls-fullscreen-button {
		display: none !important;
	}
	/*video默认aduio音量按钮*/
	
	video::-webkit-media-controls-mute-button {
		display: none !important;
	}
	/*video默认setting按钮*/
	
	video::-internal-media-controls-overflow-button {
		display: none !important;
	}
	/*腾讯云点播禁用firefox全屏、设置按钮*/
	
	.trump-button[sub-component="fullscreen_btn"],
	.trump-button[now="fullscreen"] {
		display: none!important;
	}
	
	.trump-button[sub-component="setting"] {
		display: none !important;
	}
	
	/deep/ .van-dialog {
		top: 55%;
	}
	
	/deep/ .van-dialog__header {
		text-align: left;
		padding-bottom: 15px;
	}
	
	/deep/ .van-dialog .van-button {
		background: rgba(238, 238, 238, 1);
	}
	
	/deep/ .van-dialog__confirm,
	.van-dialog__confirm:active {
		color: #333;
	}
	
	.container_list {
		padding: 14px 16px 0;
		height: 540px;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}
	
	.van-dropdown-menu {
		width: 90%;
		margin: 0 auto;
	}
	
	.l-dropdown {
		padding: 10px 0;
		background: #fff;
	}
	
	.spinner {
		text-align: center;
		font-size: 12px;
		padding: 15px 0;
	}
	
	.header-right {
		line-height: 5px;
		color: #fff;
	}
	
	.container {
		padding-top: 46px;
		background: #fff;
		margin-bottom: 59px;
	}
	
	.container_header {
		border-bottom: 1px solid #eee;
	}
	
	.container_list li {
		width: 48%;
		float: left;
		padding-bottom: 16px;
		color: #666;
		font-size: 14px;
	}
	
	.container_list li:nth-of-type(2n) {
		float: right;
	}
	
	.container_list li img {
		display: block;
		background: #666;
	}
	
	p {
		margin-bottom: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.video {
		position: absolute;
		top: 25px;
		background: none !important;
		left: 50%;
		margin-left: -24px;
	}
	
	.video-coverS {
		width: 100%;
		height: 100px;
		border-radius: 7px;
		overflow: hidden;
		position: absolute;
		top: 0;
		background: rgba(0, 0, 0, .5);
	}
	
	.video-cover {
		width: 100%;
		height: 100px;
		border-radius: 7px;
		overflow: hidden;
		position: relative;
	}
	
	.video-play {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		height: 100%!important;
		background: #333;
		z-index: 500;
		transition: all 0.3s linear;
	}
	
	.video-close {
		position: fixed;
		top: 10px;
		right: 10px;
		font-size: 30px;
		color: #fff;
		z-index: 500;
	}
	.container-full {
		height: 100%;
		padding-top: 0!important;
		background: #333!important;
		overflow: visible!important;
	}
</style>