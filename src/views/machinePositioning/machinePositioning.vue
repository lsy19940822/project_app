<template>
	<div class="container">
		<!--header-->
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType='2'>
			<div slot='right_slot' style="top: 10px;" @click="searchShowHide">
				<p class="header-right notice-box">
					<van-icon name="search" />
				</p>
			</div>
		</vant-header>
		<!--search-->
		<div class="search-wrap" v-show="isSearchShow">
			<van-search v-model="searchVal" placeholder="搜索已解决问题" show-action @cancel="searchCancel" @search="onSearch" />
			<van-row type="flex" justify="space-between" class="searh-clear">
				<van-col span="8">搜索历史</van-col>
				<van-col span="8" class="clear-btn">
					<van-icon name="delete" />清除记录</van-col>
			</van-row>
			<div class="s-history clearfix">
				<ul class="s-historyList">
					<li>
						<div class="h-tag">1标主站</div>
					</li>
					<li>
						<div class="h-tag">1标主站</div>
					</li>
					<li>
						<div class="h-tag">1标主站</div>
					</li>
					<li>
						<div class="h-tag">1标主站</div>
					</li>
				</ul>
			</div>
		</div>
		<!--content list-->
		<div class="list-content">
			<van-tabs v-model="active">
				<van-tab title="人员定位">
					<div class="l-dropdown">
						<van-dropdown-menu>
							  <van-dropdown-item v-model="value1" :options="option1" />
							  <van-dropdown-item v-model="value2" :options="option2" />
						</van-dropdown-menu>
					</div>
					
				</van-tab>
				<van-tab title="车辆定位">
					<div class="l-dropdown">
						<van-dropdown-menu>
							  <van-dropdown-item v-model="value1" :options="option1" />
							  <van-dropdown-item v-model="value2" :options="option2" />
						</van-dropdown-menu>
					</div>
					
				</van-tab>
			</van-tabs>
			<!-- 			<van-loading class="spinner" v-if = 'isLoading' size="24px" type="spinner">加载中...</van-loading>
			<div v-else class="spinner"><span><van-icon name="more-o" /></span>已经到底啦~</div> -->
		</div>

	</div>
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import Vue from 'vue';
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
				questionText: '人机定位',
				isLoading: true,
				active: 0,
				searchVal: '',
				isSearchShow: false,
				value1: 0,
				value2: 0,
				option1: [
					{ text: '全部标段', value: 0 },
					{ text: '1标', value: 1 },
					{ text: '2标', value: 2 },
					{ text: '3标', value: 3 },
					{ text: '4标', value: 4 },
					{ text: '5标-1', value: 5},
					{ text: '5标-2', value: 6 },
					{ text: '6标', value: 7},
				],
				option2: [
					{ text: '全部工点', value: 0 },
				],
			}
		},
		components: {
			vantHeader
		},
		mounted() {
			this.getUserWorkPointList()
			
		},
		methods: {
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
				console.log("当前标段：",this.option1[val].text)
			},
			change2(val){
				this.Worksite = this.option2[val].text
				console.log("当前工点：",this.option2[val].text)
			},
			getUserWorkPointList(){
				let that = this;
				// this.$route.query.id=this.value1;
				// console.log(this.value1,this.$route.query.value);
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
					        console.log(res)
					        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
					
					        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
					
					        var speed = res.speed; // 速度，以米/每秒计
					
					        var accuracy = res.accuracy; // 位置精度
					
					    }
					
					});
				})
				// 工点
				ajax.get('getUserWorkPoint').then(res => {
					if(res.data.result) {
						console.log("1.1.2.获取全部工点名称",res)
						for(let k in res.data.data) {
						   this.option2.push({text:res.data.data[k].WORKAREA,value:Number(k) + Number(1) })
						   // NameArr.push(res.data.data[k])
						}	
						console.log("工点：",this.option2)
					}
				})
			}
		}
	}
</script>

<style scoped>
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
