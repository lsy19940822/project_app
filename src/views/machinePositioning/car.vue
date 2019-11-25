<template>
	<div class="list-container">

		<div class="l-dropdown">
			<van-dropdown-menu>
				<van-dropdown-item :id="value1" v-model="value1" :options="option1" @change="change1(value1)" />
				<van-dropdown-item :id="value2" :disabled="disabledSection" v-model="value2" :options="option2" @change="change2(value2)" />
			</van-dropdown-menu>
		</div>
		<div id="containerS"></div>
		<ul class="footer_k footer_car" :class="{'activeClass': activeClassType}" v-show='!activeClassType'>
			<div @click="activeClassButton()"><van-icon name="arrow-down" color="rgba(112, 153, 208, 1)" size="24px" style="margin-bottom: 10px;text-align: center;display: block;"/></div>
			<li v-show="showList" style="width: 100%;text-align: center;">暂无车辆信息</li>
			<!--$router.push({path:'/machinePositioning_carX'})-->
			<li @click="showCarDetails(item)" v-show="!showList" v-for="item in carList.slice(0,4)"><img :src="ajax.http + item.CARPHOTOURL.slice(2)" alt=""><span>{{item.CARNUMBER}}</span></li>
		</ul>
		<transition name="van-slide-up">
			<ul class="footer_k footer_carS" :class="{'activeClass': activeClassType}" v-show='activeClassType' style="overflow: auto;">
				<div @click="activeClassButton()"><van-icon name="arrow-down" color="rgba(112, 153, 208, 1)" size="24px" style="margin-bottom: 10px;text-align: center;display: block;"/></div>
				<li v-show="showList" style="width: 100%;text-align: center;">暂无车辆信息</li>
				
				<li @click="showUserDetails(item)" v-show="!showList" v-for="(item,index) in  Saffdata" v-if="index>=5"><img :src="item.PHOTOURL" alt=""><span>{{item.EXAMNAME}}</span></li>
			</ul>
		  <!-- <div v-show="visible">Slide Up</div> -->
		</transition>
		

		<!-- 			<van-loading class="spinner" v-if = 'isLoading' size="24px" type="spinner">加载中...</van-loading>
		<div v-else class="spinner"><span><van-icon name="more-o" /></span>已经到底啦~</div> -->
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
		Toast
	} from 'vant';
	Vue.use(Row).use(Col).use(Loading).use(Tab).use(Tabs).use(Icon).use(Search).use(DropdownMenu).use(DropdownItem).use(Toast);
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
				Section: '',
				value2: 0,
				Worksite: '',
				ajax: ajax,
				showList: true,
				map: null,
				carList: [],
				option1: [{
						text: '全部标段',
						value: 0
					},
					{
						text: 'CYCZQ-1标',
						value: 1
					},
					{
						text: 'CYCZQ-2标',
						value: 2
					},
					{
						text: 'CYCZQ-3标',
						value: 3
					},
					{
						text: 'CYCZQ-4标',
						value: 4
					},
					{
						text: 'CYCZQ-5标1',
						value: 5
					},
					{
						text: 'CYCZQ-5标2',
						value: 6
					},
					{
						text: 'CYCZQ-6标',
						value: 7
					},
				],
				option2: [{
					text: '全部工点',
					value: 0
				}],
				disabledSection: "",
			}
		},
		components: {
			vantHeader
		},
		created() {
			this.value1 = Number(this.$route.query.ValueId);
			if(this.value1 == 0) {
				this.Section == '';
			} else {
				this.change1(this.value1);
			}
			this.getUserWorkPointList();
		},
		mounted() {
			this.init();
			this.getAllGPS();
		},
		methods: {
			init() {
				this.map = new BMap.Map("containerS");
				var point = new BMap.Point(116.404, 39.915);
				this.map.centerAndZoom(point, 15);
				this.map.addControl(new BMap.MapTypeControl({
					mapTypes: [
						BMAP_NORMAL_MAP,
						BMAP_HYBRID_MAP
					]
				}));
				this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
			},
			activeClassButton() {
				if(this.Saffdata.length<5){
					Toast("暂无更多数据")
				}else{
					this.activeClassType = !this.activeClassType
				}
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
				let that = this;
				if(val != 0) {
					that.Section = that.option1[val].text
				} else {
					that.Section = '';
				}
				that.option2.splice(1);
				that.getUserWorkPointList();
				that.getAllGPS();
			},
			change2(val) {
				let that = this;
				if(val != 0) {
					that.Worksite = that.option2[val].text
				} else {
					that.Worksite = '';
				}
				that.Worksite = that.option2[val].text.replace("#", "%23")
			    that.getAllGPS();
			},
			getUserWorkPointList() {
				ajax.get('/API/WebAPIDataAudit/GetWorkarea?Section=' + this.Section).then(res => {
					if(res.data.result == false) {
						this.disabledSection = true;
						this.showList = true;
						return;
					}
					if(res.data.result == true) {
						for(let k in res.data.data) {
							if(res.data.data[k].WORKAREA != null) {
								this.option2.push({
									text: res.data.data[k].WORKAREA,
									value: Number(k)
								})
							}
						}
						this.disabledSection = false;
						this.showList = false;
						return;
					}
				})
			},
			getAllGPS() {
				let that = this;
				ajax.get('/API/WebAPIDataAudit/getCarInfo?Section=' + this.Section + '&worksite=' + this.Worksite).then(res => {
					if(res.status == 200 && res.data.data && res.data.data.length > 0) {
						var data = res.data.data;
						that.carList = data;
						var dr = [],
							points = [];
						for(var i = 0; i < data.length; i++) {
							if(data[i].LONGITUDE && data[i].LATITUDE)
								points.push(new BMap.Point(data[i].LONGITUDE, data[i].LATITUDE));
						}
						// 坐标转化
						var convertor = new BMap.Convertor();
						convertor.translate(points, 1, 5, function(data) {
							if(data.status === 0) {
								for(var j = 0; j < data.points.length; j++) {
									console.log(data.points)
									var icon = new BMap.Icon(require('../../assets/images/exam/car.jpg'), new BMap.Size(40, 19), {
										anchor: new BMap.Size(40, 19),
										offset: new BMap.Size(40, 19),
										imageSize: new BMap.Size(40, 19),
									});
									var mkr = new BMap.Marker(data.points[j], {
										icon: icon,
										rotation: Math.random() * 360,
										title: 'awdawa'
									});
									that.map.addOverlay(mkr);
									//									that.map.addOverlay(new BMap.Marker(data.points[j]));
									that.map.setCenter(data.points[j]);
								}
							}
						})
					}
				})
			},
			showCarDetails(infor) {
				console.log(infor)
				if(!infor.LATITUDE || !infor.LONGITUDE) {
					Toast.fail('暂无车辆位置信息');
					return;
				}
				sessionStorage.setItem("curCarInfor", JSON.stringify(infor));
				this.$router.push("/machinePositioning_carX");
			}
		}
	}
</script>

<style scoped>
	#containerS {
		min-width: 100%;
		min-height: 100%;
		top: 70px;
	}
	
	.l-dropdown {
		padding: 10px 0;
		background: #fff;
		border-bottom: 1px solid #ECECEC;
		position: fixed;
		width: 100%;
		top: 90px;
		z-index: 999;
	}
	
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
	

	.footer_car li,
	.footer_carS li {
		width: 25% ;
		float: left;
	}
	
	.footer_car li img,
	.footer_carS li img {
		width: 90% !important;
		height: 46px;
		border-radius: 2px;
		border: 1px solid rgba(238, 238, 238, 1);
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
	
	.van-dropdown-menu {
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
	
	.list-container {
		width: 100%;
		height: 100%;
		background: #fff;
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