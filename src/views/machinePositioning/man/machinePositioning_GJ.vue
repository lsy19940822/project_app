<template>
	<div class="container">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType='2'>
			
		</vant-header>
		<div id="containerS"></div>
		<div class="list-content">
			<div class="header_top"><van-icon name="underway" color='#ddd' style='float: left;margin-top: 16px;sfont-size: 14px;'/><span>今天</span></div>
			<ul class="footer_k" :class="{'activeClass': activeClassType}" v-show='!activeClassType'>
				<van-steps direction="vertical" :active="0" active-color='#304F83'>
				  <van-step>
				    <span>环创企业广场</span>
				    <span style="text-align:center;font-size:12px;float: right;background:#304F83;color:#fff;border-radius:11px;width:69px;height:22px;line-height: 22px;">当前位置</span>
				  </van-step>
				  <van-step>
				    <span>环创企业广场</span>
				    <span style="float: right;"><van-icon name="underway" color='#ddd' style='font-size: 14px;'/> 14:15 - 14:52</span>
				  </van-step>
				  <van-step>
				    <span>环创企业广场</span>
				    <span style="float: right;"><van-icon name="underway" color='#ddd' style='font-size: 14px;'/> 14:15 - 14:52</span>
				  </van-step>
				</van-steps>
			</ul>
			
		</div>

	</div>
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import Vue from 'vue';
	import { Step, Steps } from 'vant';
	
	Vue.use(Step).use(Steps);
	import * as ajax from '@/utils/api'
	import {
		Row,
		Col,
		Loading,
		Tab,
		Tabs,
		Icon,
		Search,
		DropdownMenu, DropdownItem,
	} from 'vant';
	Vue.use(Row).use(Col).use(Loading).use(Tab).use(Tabs).use(Icon).use(Search).use(DropdownMenu).use(DropdownItem);
	export default {
		data() {
			return {
				questionText: '活动轨迹',
				isLoading: true,
				active: 0,
				searchVal: '',
				isSearchShow: false,
				activeClassType:false,
				value1: 0,
				value2: 0,
				option1: [
					{ text: '全部标段', value: 0 },
					{ text: 'CYCZQ-1标', value: 1},
					{ text: 'CYCZQ-2标', value: 2},
					{ text: 'CYCZQ-3标', value: 3},
					{ text: 'CYCZQ-4标', value: 4},
					{ text: 'CYCZQ-5标1', value: 5},
					{ text: 'CYCZQ-5标2', value: 6},
					{ text: 'CYCZQ-6标', value: 7},
				],
				option2: [
					{ text: '全部工区', value: 0 },
				],
			}
		},
		components: {
			vantHeader
		},
		mounted() {
			this.init()
			this.getUserWorkPointList()
		},
		methods: {
			init() {
				//定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
				 var map = new qq.maps.Map(document.getElementById("containerS"), {
					center: new qq.maps.LatLng(39.916527,116.397128),      // 地图的中心地理坐标。
					zoom:8,
					
				});
			},
			activeClassButton(){
				this.activeClassType=!this.activeClassType
			},
			searchShowHide() {
				this.isSearchShow = !this.isSearchShow
			},
			searchCancel() {
				this.searchShowHide();
			},
			onSearch() {
			
			},
			change1(val){
				this.Section = this.option1[val].text
				
			},
			change2(val){
				this.Worksite = this.option2[val].text
				
			},
			getUserWorkPointList(){
				let that = this;
				//视频
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
					jsApiList: ['openLocation'] // 必填，需要使用的JS接口列表
				});
				wx.ready(() => {
					wx.openLocation({
						latitude: 90, // 纬度，浮点数，范围为90 ~ -90
						longitude: 100, // 经度，浮点数，范围为180 ~ -180。
						name: '', // 位置名
						address: '', // 地址详情说明
						scale: 14, // 地图缩放级别,整形值,范围从1~28。默认为最大
						infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
						//										infoUrl: 'http://weixin.qq.com'
					});
					wx.getLocation({
					    type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
					
					    success: function (res) {
					        
					        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
					
					        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
					
					        var speed = res.speed; // 速度，以米/每秒计
					
					        var accuracy = res.accuracy; // 位置精度
					
					    }
					
					});
				})
				// 工区
				ajax.get('/API/WebAPIDataAudit/getUserWorkPoint').then(res => {
					if(res.data.result) {
						
						for(let k in res.data.data) {
						   this.option2.push({text:res.data.data[k].WORKAREA,value:Number(k) + Number(1) })
						   
						}	
						
					}
				})
			}
		}
	}
</script>

<style scoped>
	#containerS{
	    min-width:100%;
	 	    min-height:753px;
			margin-top: -46px;
	}
	.header_top{
		position: fixed;
		top: 46px;
		height: 46px;
		background: #fff;
		line-height: 46px;
		text-align: center;
		right: 0;
		left: 0;
		padding:0 16px;
	}
	.position{
		border-top: 1px solid #eee;
		padding: 16px;
		line-height: 32px;
		font-size:17px;
	}
	.position span:last-child{
		float: right;
		color: #ddd;
		font-size: 14px;
	}
	.position img{
        width:32px;
		height:32px;
		display: block;
		float: left;
		margin-right: 10px;
		background: #9499AA;
	}
	.footer_k{
		width:100%;
		height:auto;
		overflow: hidden;
		background:rgba(255,255,255,1);
		box-shadow:0px -1px 2px 0px rgba(0,0,0,0.06);
		position: fixed;
		bottom: 0;
		padding-top:15px ;
		-webkit-transition: -webkit-transform 0.3s ease-out;
		transition: -webkit-transform 0.3s ease-out;
		transition: transform 0.3s ease-out;
		transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
		-webkit-overflow-scrolling: touch;
		z-index: 999;
	}
	.activeClass {
	    height: 90% !important;
	}
	.footer_k div.shu{
		width:19px;
		height:2px;
		background:rgba(112,153,208,1);
		border-radius:1px;
		margin: 0 auto 10px;
	}
	.footer_k li{
		width: 25%;
		height: auto;
		overflow: hidden;
		float: left;
		font-size:14px;
		color: #666666;
		padding:0 10px 15px;
	}
	.footer_k li img{
		width:32px;
		height:32px;
		background:rgba(133,142,167,1);
		border-radius:2px;
		background: #DDDDDD;
		display: block;
		margin: 0 auto;
	}
	.footer_kS li span{
		margin: 10px 0;
	}
	.footer_k li span{
		margin-top: 10px;
	    display: block;
		text-align: center;
	}
	/*  */
	/deep/ .van-dropdown-menu .van-dropdown-menu__item:first-child {
	    border-right: 1px solid #ccc;
	    margin-right: 10px;
	}
	/deep/.van-dropdown-menu .van-dropdown-menu__item {
	    border: 1px solid #CCC;
	    border-radius: 2px;
	    background: #F9F9F9;
	}
	.l-dropdown{
	    padding: 10px 0;
	    background: #fff;
	    border-bottom: 1px solid #ECECEC;
	}
	.van-dropdown-menu{
	    width: 90%;
	    margin: 0 auto;
	}
	.innerLabel li.activeLabel {
		background: #595F73;
		border: 1px solid #595F73;
		color: #fff;
	}

	.innerLabel li {
		padding: 0 12px;
		width: auto;
		height: 26px;
		border: 1px solid rgba(204, 204, 204, 1);
		float: left;
		margin-left: 6px;
		color: #AAAAAA;
		font-size: 12px;
		text-align: center;
		-ms-flex-negative: 0;
		flex-shrink: 0;
		transform: all .5s ease;
		border-radius: 2px;
		line-height: 24px;


	}

	.inte_gent,
	.innerLabel {
		width: 100%;
		height: auto;
		float: left;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: middle;
		-ms-flex-align: middle;
		align-items: middle;
		overflow: auto;
	}

	.header_inte {
		width: auto;
		height: auto;
		overflow: hidden;
		padding: 14px 16px;
		background: #fff;
		border-bottom: 1px solid rgba(238, 238, 238, 1);
	}

	/*  */
	.clearfix::after {
		content: '';
		display: block;
		clear: both;
	}

	* {
		margin: 0;
	}

	img {
		display: block;
		width: 100%;
		height: auto
	}

	/deep/ .van-tabs__line {
		background-color: #9499AA;
		width: 50% !important;
	}

	.color666 {
		color: #666;
	}

	.omit {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.omit2 {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.marginT12 {
		margin-top: 12px;
	}

	.container {
		padding-top: 46px;
	}

	.van-nav-bar .van-icon {
		font-size: 18px;
		color: #fff;
	}

	/*.notice-box{width:20px;height:20px;}*/
	/*ontent list*/
	.list-content {
		background: #fff;
	}

	.list-content {
		/* margin-top: 10px; */
	}

	.l-list {
		padding: 0 14px;
	}

	.l-list li {
		border-bottom: 1px solid #eee;
	}

	.title {
		font-size: 18px;
		color: #333;
		line-height: 24px;
	}

	.explain {
		font-size: 12px;
	}

	.intro {
		font-size: 16px;
		color: #666;
	}

	.item {
		padding: 14px 0;
	}

	
	/*待复核*/
	/*loading*/
	.spinner {
		text-align: center;
		font-size: 14px;
		padding: 15px 0;
		color: #969799;
	}

	/**/
	.small-headPhoto {
		width: 20px;
		height: 20px;
		float: left;
		margin-right: 5px;
	}

	/*检索关键字*/
	.retrieval-box {
		border-bottom: 1px solid #DDD;
		padding: 14px;
	}

	.retrieval-list li {
		padding: 6px 15px;
		border: 1px solid #ccc;
		color: #aaa;
		font-size: 14px;
		float: left;
		margin-right: 5px;
	}

	.retrieval-list li.current {
		color: #fff;
		background: #595F73;
	}

	/*search*/
	.searh-clear {
		padding: 14px;
		color: #666;
		font-size: 16px;
	}

	.clear-btn {
		text-align: right;
	}

	.clear-btn .van-icon {
		top: 2px;
		right: 4px;
	}

	.s-history {
		padding: 0 14px;
	}

	.s-historyList li {
		float: left;
	}

	.h-tag {
		margin-bottom: 10px;
		color: #333;
		padding: 8px 12px;
		background: #fff;
		border: 1px solid #DDD;
		font-size: 14px;
		margin-right: 10px;
	}

	.search-wrap {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 111;
		background: #fff;
	}
</style>
