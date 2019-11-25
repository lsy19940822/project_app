<template>
	<div class="leaderNew">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2">
		</vant-header>
		<ul class="container_list overflow">
			<div class="colok">20:23</div>
			<li class="overflow">
				<div class="overflow"><h3>发现新的安全问题待解决</h3> <span>new</span></div>
				<!-- @click="$router.push({path:'/staff_safeQualityList'})" -->
				<p class="coloks">2019-02-25 19:22:22</p>
				<p class='title'>1标主站桥梁存在严重的质量问题，电线直接放在地上</p>
				<img src="../../assets/icon_ck@2x.png" alt="" width="65px" >
			</li>
		</ul>
		<ul class="container_list overflow">
			<div class="colok" style="width: 84px;">2019-09-26</div>
			<li class="overflow">
				<div class="overflow"><h3>发现新的安全问题待解决</h3></div>
				
				<p class="coloks">2019-02-25 19:22:22</p>
				<p class='title'>1标主站桥梁存在严重的质量问题，电线直接放在地上</p>
				<img src="../../assets/icon_ck@2x.png" alt="" width="65px" >
			</li>
		</ul>
		<index-footer></index-footer>
	</div>
	
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import indexFooter from '@/components/indexFooter.vue'
	import Vue from 'vue';
	import { DropdownMenu, DropdownItem, Cell,Loading } from 'vant';
	
	Vue.use(DropdownMenu).use(DropdownItem).use(Cell).use(Loading);
	
	export default {
		components: {
			vantHeader,
			indexFooter
		},
		data() {
			return {
				questionText:"通知消息",
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
	
	.leaderNew{
		padding-top: 46px;
		margin-bottom: 59px;
	}
	.container_list{padding:0 11px;}
	.colok{
		width:56px;
		height:20px;
		background:rgba(205,205,205,1);
		border-radius:12px;
		font-size:12px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		padding: 2px 5px;
		color:rgba(255,255,255,1);
		line-height:16px;
		text-align: center;
		margin: 20px auto;
	}
	.container_list li{
		background: #fff;
		padding: 16px;
		box-shadow:0px 1px 4px 0px rgba(0,0,0,0.06);
	}
	.container_list li h3{
		font-size:17px;
		margin: 0;
		float: left;
		margin-bottom: 5px;
	}
	.container_list li span{
		display: block;
		float: left;
		width:29px;
		height:15px;
		background:rgba(112,153,208,1);
		border-radius:2px;
		font-size:12px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		text-align: center;
		color:rgba(255,255,255,1);
		line-height:12px;
		margin:5px 10px;
	}
	.coloks{
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		font-size:14px;
		color:rgba(170,170,170,1);
		line-height:20px;
		margin: 0;
	}
	.title{
		font-size:14px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(102,102,102,1);
		line-height:24px;
		margin-bottom: 10px;
		padding-bottom: 12px;
		border-bottom: 1px solid #EEEEEE;
	}
</style>
