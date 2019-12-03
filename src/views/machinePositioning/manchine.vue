<template>
	<div class="list-container">

		<div class="l-dropdown">
			<van-dropdown-menu>
				<van-dropdown-item :id="value1" v-model="value1" :options="option1" @change="change1(value1)" />
				<van-dropdown-item :id="value2" :disabled="disabledSection" v-model="value2" :options="option2" @change="change2(value2)" />
			</van-dropdown-menu>
		</div>
		<div id="container"></div>
		<ul class="footer_k" :class="{'activeClass': activeClassType}" v-show='!activeClassType'>
			<div @click="activeClassButton()"><van-icon name="arrow-up" color="rgba(112, 153, 208, 1)"  size="24px" style="margin-bottom: 10px;text-align: center;display: block;"/></div>
			<li v-show="showList" style="width: 100%;text-align: center;">暂无人员信息</li>
			<li @click="showUserDetails(item)" v-show="!showList" v-for="(item,index) in  Saffdata" v-if="index<5">
				<img :src="item.PHOTOURL" alt="">
				<span style="display: block;">{{item.EXAMNAME}}</span>
			</li>

		</ul>
		<transition name="van-slide-up">
			<ul class="footer_k footer_kS" :class="{'activeClass': activeClassType}" v-show='activeClassType' style="overflow: auto;">
				<div @click="activeClassButton()"><van-icon name="arrow-down" color="rgba(112, 153, 208, 1)" size="24px" style="margin-bottom: 10px;text-align: center;display: block;"/></div>
				<li class="position" v-for="(item,index) in  10" v-if="index>=5"  @click="showUserDetails(item)" style="width: 100%;">
					<img :src="item.PHOTOURL" alt="" style="width: 45px;height: 45x; margin-right: 10px;">
				<!--  v-if="item.STATUS == 1" v-if="item.STATUS == 0"-->
					<span style="float: left;margin: 0;line-height: 45px;">{{item.EXAMNAME}}</span>
					<span class="status" style="margin-left: 14px;margin-top: 10px;display: block;float: left;height: 26px;line-height: 16px;">在线</span>
					<span class="status" style="background: #B9B9B9;margin-left: 14px;margin-top: 10px;display: block;float: left;height: 26px;line-height: 16px;" v-if="item.STATUS == 0">离线</span>
					<span style="float: right;margin: 0;line-height: 45px;">{{item.WORKTYPE}}</span>
				</li>
			</ul>
		  <!-- <div v-show="visible">Slide Up</div> -->
		</transition>
		

		<!-- 			<van-loading class="spinner" v-if = 'isLoading' size="24px" type="spinner">加载中...</van-loading>
		<div v-else class="spinner"><span><van-icon name="more-o" /></span>已经到底啦~</div> -->
	</div>
</template>

<script>
	import vantHeader from '@/components/header.vue';
	import Vue from 'vue';
	import * as ajax from '@/utils/api';
	import {
		Row,
		Col,
		Loading,
		Tab,
		Tabs,
		Icon,
		Search,
		Toast,
		DropdownMenu,
		DropdownItem,
	} from 'vant';
	Vue.use(Row).use(Toast).use(Col).use(Loading).use(Tab).use(Tabs).use(Icon).use(Search).use(DropdownMenu).use(DropdownItem);
	export default {
		data() {
			return {
				questionText: '人机定位',
				isLoading: true,
				active: 0,
				searchVal: '',
				map: null,
				activeClassType: false,
				value1: 0,
				value2: 0,
				ajax: ajax,
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
				}, ],
				Section: "",
				disabledSection: "",
				worksite: '',
				Saffdata: [],
				showList: true,
				longitude: 0, //经度
				latitude: 0, //纬度
				city: ''
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
            this.getUserMessageData();
		},
		mounted() {
			this.init()
			
		},
		methods: {
			init() {
				//定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
				this.map = new BMap.Map("container");
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
			change1(val) {

				let that = this;
				if(val != 0) {
					that.Section = that.option1[val].text
				} else {
					that.Section = '';
				}
				that.option2.splice(1);
				that.getUserWorkPointList();
				that.getUserMessageData();
				that.value2 = Number(0);
			},
			change2(val) {
				let that = this;
				if(val != 0) {
					that.worksite = that.option2[val].text.replace("#","%23")
				} else {
					that.worksite = '';
				}
				that.getUserMessageData();

			},
			getUserWorkPointList() {
				// 根据标段查工点
				ajax.get('/API/WebAPIDataAudit/GetWorkarea?Section=' + this.Section).then(res => {
					if(res.data.result == false) {
						this.disabledSection = true;
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
						return;
					}
				})
			},
			
			getUserMessageData() {
				let that = this;
				ajax.get('/API/WebAPIDataAudit/getUserMessage?Section=' + this.Section + '&worksite=' + this.worksite).then(res => {
 // && res.data.data && res.data.data.length > 0
					if(res.status == 200) {
						console.log('res.data.result:',res.data.result)
						if(res.data.result == 0){
							this.showList = true;
							// 坐标转化
							this.init()
							return;  
						}
						if(res.data.result == 1){
							this.showList = false;
							that.Saffdata = res.data.data;
							var points = [], pointsIndex = [];
							for(var k = 0; k < res.data.data.length; k++) {
								if(res.data.data[k].PHOTOURL != null) {
									res.data.data[k].PHOTOURL = ajax.http + res.data.data[k].PHOTOURL.slice(2)
								}
								if(res.data.data[k].LONGITUDE && res.data.data[k].LATITUDE){
									points.push(new BMap.Point(res.data.data[k].LONGITUDE, res.data.data[k].LATITUDE));
									pointsIndex.push(k);
								}
							}
							// 坐标转化
							var convertor = new BMap.Convertor();
							convertor.translate(points, 1, 5, function(data) {
								if(data.status === 0) {
									for(var j = 0; j < data.points.length; j++) {
										var icon = new BMap.Icon(res.data.data[pointsIndex[j]].PHOTOURL || require('../../assets/images/exam/eimg.png'), new BMap.Size(24, 25), {
											anchor: new BMap.Size(24, 25),
											offset: new BMap.Size(24, 25),
											imageSize: new BMap.Size(24, 25),
										});
										var mkr = new BMap.Marker(data.points[j], {
											icon: icon,
											rotation: 0,
											title: 'awdawa'
										});
										that.map.addOverlay(mkr);
										
										that.map.setCenter(data.points[j]);
									}
								}
							})
							return
						}
						

					}
				})
			},
			showUserDetails(infor) {
				if(!infor.LATITUDE || !infor.LONGITUDE) {
					Toast.fail('暂无人员位置信息');
					return;
				}
				sessionStorage.setItem("userInfor", JSON.stringify(infor));
				this.$router.push("/machinePositioning_X");
			}
		}
	}
</script>

<style scoped>
	.status {
		padding: 5px 10px;
		background: #7AB182;
		border-radius: 2px;
		color: #fff;
		font-size: 12px;
		margin-left: 14px;
	}
	.position img {
	    float: left;
	}
	.position {
		border-bottom: 1px solid #eee;
		padding: 16px;
		line-height: 32px;
		font-size: 17px;
	}
	.position:last-child{
		border-bottom: none;
	}
	.position span:last-child {
		float: right;
		color: #ddd;
		font-size: 14px;
	}
	#container {
		min-width: 100%;
		min-height: 100%;
		top: 70px;
	}
	
	.l-dropdown {
		padding: 10px 0;
		background: #fff;
		border-bottom: 1px solid #ECECEC;
		position: absolute;
		width: 100%;
		top: 0;
		z-index: 1;
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
	
	.list-container {
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