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
		<router-link to="/machinePositioning/manchine" tag="div" class="routerlink">人员定位</router-link>
		<router-link to="/machinePositioning/car" tag="div" class="routerlink">车辆定位</router-link>

		<!--search-->
		<div class="search-wrap" v-show="isSearchShow">
			<van-search v-model="searchVal" placeholder="搜索人员" show-action @cancel="searchCancel" @search="onSearch" />

			<div class="s-history clearfix">
				<div class="position">
					<img src="" alt="">
					<span>孙悟空</span>
					<span>项目经理/常务副经理</span>
				</div>
			</div>
		</div>
		<!--content list-->
		<div class="list-content">
			<router-view></router-view>
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
		DropdownMenu,
		DropdownItem,
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
				activeClassType: false,
				value1: 0,
				value2: 0,
				option1: [{
						text: '全部标段',
						value: 0
					},
					{
						text: '1标',
						value: 1
					},
					{
						text: '2标',
						value: 2
					},
					{
						text: '3标',
						value: 3
					},
					{
						text: '4标',
						value: 4
					},
					{
						text: '5标-1',
						value: 5
					},
					{
						text: '5标-2',
						value: 6
					},
					{
						text: '6标',
						value: 7
					},
				],
				option2: [{
					text: '全部工点',
					value: 0
				}, ],
			}
		},
		components: {
			vantHeader
		},
		created() {

		},
		mounted() {
			// this.init()
			this.getUserWorkPointList()
		},
		methods: {

			activeClassButton() {
				this.activeClassType = !this.activeClassType
			},
			searchShowHide() {
				this.isSearchShow = !this.isSearchShow
			},
			searchCancel() {
				this.searchShowHide();
			},
			onSearch() {

			},
			change1(val) {
				this.Section = this.option1[val].text
				console.log("当前标段：", this.option1[val].text)
			},
			change2(val) {
				this.Worksite = this.option2[val].text
				console.log("当前工点：", this.option2[val].text)
			},
			getUserWorkPointList() {
				let that = this;
				// 工点
				ajax.get('/API/WebAPIDataAudit/getUserWorkPoint').then(res => {
					if(res.data.result) {
						console.log("1.1.2.获取全部工点名称", res)
						for(let k in res.data.data) {
							this.option2.push({
								text: res.data.data[k].WORKAREA,
								value: Number(k) + Number(1)
							})
						}
						console.log("工点：", this.option2)
					}
				})
			}
		}
	}
</script>

<style scoped>
	.position {
		border-top: 1px solid #eee;
		padding: 16px;
		line-height: 32px;
		font-size: 17px;
	}
	
	.position span:last-child {
		float: right;
		color: #ddd;
		font-size: 14px;
	}
	
	.position img {
		width: 32px;
		height: 32px;
		display: block;
		float: left;
		margin-right: 10px;
		background: #9499AA;
	}
	
	.footer_k {
		width: 100%;
		height: auto;
		overflow: hidden;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px -1px 2px 0px rgba(0, 0, 0, 0.06);
		position: fixed;
		bottom: 0;
		padding: 15px 10px;
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
	
	.footer_k div {
		width: 19px;
		height: 2px;
		background: rgba(112, 153, 208, 1);
		border-radius: 1px;
		margin: 0 auto 10px;
	}
	
	.footer_car li,
	.footer_carS li {
		width: 25% !important;
	}
	
	.footer_car li img,
	.footer_carS li img {
		width: 90% !important;
		height: 46px;
		border-radius: 2px;
		border: 1px solid rgba(238, 238, 238, 1);
	}
	
	.footer_k li {
		width: 20%;
		height: auto;
		overflow: hidden;
		float: left;
	}
	
	.footer_k li img {
		width: 45px;
		height: 45px;
		background: #DDDDDD;
		display: block;
		margin: 0 auto;
	}
	
	.footer_kS li span,
	.footer_carS li span {
		margin: 10px 0;
	}
	
	.footer_k li span {
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
	
	.l-dropdown {
		padding: 10px 0;
		background: #fff;
		border-bottom: 1px solid #ECECEC;
	}
	
	.van-dropdown-menu {
		width: 90%;
		margin: 15px auto;
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
		width: 100%;
		height: 100%;
		padding-top: 46px;
	}
	
	.van-nav-bar .van-icon {
		font-size: 18px;
		color: #fff;
	}
	/*.notice-box{width:20px;height:20px;}*/
	/*ontent list*/
	
	.list-content {
		position: absolute;
		top: 90px;
		width: 100%;
		bottom: 0;
		background: #fff;
		overflow: hidden;
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
		background: #fff;
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
		z-index: 1111;
		background: #ddd;
	}
</style>