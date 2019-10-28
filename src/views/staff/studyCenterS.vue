<template>
	<div class="studyCenterS">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2">
		</vant-header>
		<div class="overflow" style="float: left;">
		    <img src="../../assets/images/index_icon/icon_img@2x(1).png" alt="" width="100%"style="float: left;">
		</div>
		<div class="studyCenter_header overflow">
			<h3>给排水工程造价</h3>
			<span>视频课程</span>
			<span>2019-10-17 22:22:22</span>
		</div>
		<ul class="studyCenter_title overflow">
			<li class="overflow">
				<span class="title"></span>
				<span class="titles">课程详情</span>
			</li>
			<li class="overflow">
				3.1.1 建筑工程施工现场监控系统应由捕影、传输、信息处理与显示三部分构成，系统架构示意图。
			</li>
			<li class="overflow">
			    3.1.2 捕影部分应通过摄像机获取施工现场的视频信号，视频信号通过有线或无线的传输方式
			    传输给视频服务器或硬盘录像机，由视频服务器或硬盘录像机对视频信号进行压缩与编码。
			</li>
			<li class="overflow">
			   3.1.3 传输部分应通过网络连接异地的监控中心，使得监控中心能够访问和管理位
			   于施工现场的视频服务器或硬盘录像机。
			</li>
			<li class="overflow">
			    3.1.4 信息处理与显示部分应通过信息处理单元的视频解码软件或数字解码器将
				位于施工现场的视频服务器或硬盘录像机上的各种视频信号、
				数字信号进行处理并展示在信息显示单元的视频显示设备上。
			</li>
			
			<li class="overflow">
			    3.1.2 捕影部分应通过摄像机获取施工现场的视频信号，视频信号通过有线或无线的传输方式
			    传输给视频服务器或硬盘录像机，由视频服务器或硬盘录像机对视频信号进行压缩与编码。
			</li>
		</ul>
		<div class="studyButton" @click="$router.push({path:'/studyrecord'})">完成学习</div>
	</div>
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import studyFooter from '@/components/studyFooter.vue'
	import Vue from 'vue';
	import { DropdownMenu, DropdownItem, Cell,Loading } from 'vant';
	
	Vue.use(DropdownMenu).use(DropdownItem).use(Cell).use(Loading);
	
	export default {
		components: {
			vantHeader,
			studyFooter
		},
		data() {
			return {
				questionText:"课程内容",
				
			}
		},
		created() {
			
		},
		mounted() {
			
		},
		
		methods: {
		}
	}
</script>

<style scoped>
		.titles{
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:500;
			color:rgba(64,83,139,1);
			line-height:16px;
			display:block;float:left;
			font-size:16px;
			margin-bottom: 16px;
		}
	.title{
	margin-right:4px;display:block;float:left;width:4px;height:16px;background:rgba(112,153,208,1);	
	}
	.studyCenterS{
		padding-top: 46px;
	}
	.header-right {
		line-height: 5px;
		color:#fff;
	}
	.studyCenter_header{
		padding: 16px 18px;
		/* border-bottom: 1px solid #eee; */
		background: #fff;
		box-shadow:0px 1px 2px 0px rgba(0,0,0,0.16);
		margin-bottom: 10px;
	}
	.studyCenter_header h3{
		margin-top: 0;
	    margin-bottom: 14px;
	}
	.studyCenter_header span:nth-of-type(1) {
		display: block;
		float: left;
	    width: 64px;
	    height: 20px;
	    background: rgba(255,255,255,1);
	    border-radius: 2px;
	    border: 1px solid #7099D0;
	    font-size: 12px;
	    font-family: PingFangSC-Regular,PingFang SC;
	    font-weight: 400;
	    color: #7099D0;
	    line-height: 18px;
	    text-align: center;
	}
	.studyCenter_header span:nth-of-type(2){
		display: block;
		float: left;
		color: #AAAAAA;
		font-size: 12px;
		display: block;
		float: left;
		line-height:20px;
		margin-left: 14px;
	}
	.studyCenter_title{
		background: #fff;
		padding:16px;
		box-shadow:0px 1px 2px 0px rgba(0,0,0,0.16);
		margin-bottom: 59px;
	}
	.studyCenter_title{
		font-size:16px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:26px;
	}
	.studyButton{
		width: 100%;
		height:49px;
		background:rgba(112,153,208,1);
		box-shadow:0px -1px 2px 0px rgba(0,0,0,0.06);
		font-size:16px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:49px;
		text-align: center;
		position: fixed;
		bottom: 0;
	}
	
</style>
