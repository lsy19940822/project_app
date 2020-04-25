<template>
	<div class="container">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType='2'>

		</vant-header>
		<div id="containerS"></div>
		<div class="list-content">
			<ul class="footer_k" :class="{'activeClass': activeClassType}" v-show='!activeClassType'>
				<div class="shu"></div>
				<div class="position">
					<img :src="ajax.http + carInfor.CARPHOTOURL.slice(2)" alt="">
				
					<span>{{carInfor.CARNUMBER}}</span>
					<span class="status" v-if="carInfor.STATUS == 1">运行中</span>
					<span class="status" style="background: #A52A2A" v-if="carInfor.STATUS == 2">静止时间 00:00:00</span>
					<span class="status" style="background: #B9B9B9" v-if="carInfor.STATUS == 0">离线状态</span>
					<span>{{carInfor.CARTYPE}}</span>
				</div>
				<div class="overflow">
					<li @click="$router.push({path:'/car/informationCar'})"><img src="../../../assets/images/exam/car@2x.png" alt=""></li>
					<li>
						<a class="overflow" :href="'tel:' + carInfor.DRIVERPHONE" style="display: block;color: #666666;">
							<img src="../../../assets/images/exam/phone@2x (1).png" alt="">
						</a>
					</li>
				</div>

				
			</ul>
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
		Toast
	} from 'vant';
	Vue.use(Row).use(Col).use(Loading).use(Tab).use(Tabs).use(Icon).use(Search).use(DropdownMenu).use(DropdownItem).use(Toast);
	export default {
		data() {
			return {
				questionText: '车辆详情',
				isLoading: true,
				active: 0,
				ajax: ajax,
				searchVal: '',
				isSearchShow: false,
				activeClassType: false,
				map: null,
				carInfor: {}
			}
		},
		components: {
			vantHeader
		},
		created() {
			var infor = sessionStorage.getItem("curCarInfor");
			if(!infor) {
				Toast.fail('未获取到车辆信息，请重新获取');
				return;
			}
			Object.assign(this.carInfor, JSON.parse(infor));
			
		},
		mounted() {
			this.init()
			
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
				let points = [new BMap.Point(this.carInfor.LONGITUDE, this.carInfor.LATITUDE)];
				let direction = this.carInfor.DIRECTION.replace(/[^0-9]/ig,"")
				// 坐标转化
				let that = this;
				var convertor = new BMap.Convertor();
				convertor.translate(points, 1, 5, function(data) {
					
					
					if(data.status === 0) {
						for(var j = 0; j < data.points.length; j++) {
							var icon = new BMap.Icon(require('../../../assets/images/exam/car.jpg'), new BMap.Size(40, 19), {
								anchor: new BMap.Size(40, 19),
								offset: new BMap.Size(40, 19),
								imageSize: new BMap.Size(40, 19),
							});
							var marker = new BMap.Marker(data.points[j], {
							        position: that.map.setCenter(data.points[j]),
							        map: that.map,
									icon: icon,
									rotation:direction,
									content:'文本标注'
							    });
								let STATUS = ''
								if(that.carInfor.STATUS == 1){
									STATUS= '运行中'
								}else if(that.carInfor.STATUS == 0){
									STATUS= '离线状态'
								}
							var sContent =
								"<h4 style='margin:0 0 5px 0;padding:0.2em 0'>车辆信息</h4>" + 
								
								"<ul style='margin:4px'>" + 
							 	    "<li style='margin-top:5px'>设备编号："+that.carInfor.IMEIS+"</li>" + 
							 		"<li style='margin-top:5px'>车牌号码："+that.carInfor.CARNUMBER+"</li>" +
									"<li style='margin-top:5px'>驾驶司机："+that.carInfor.DRIVERNAME+"</li>" +
									"<li style='margin-top:5px'>手机号码："+that.carInfor.DRIVERPHONE+"</li>" + 
									"<li style='margin-top:5px'>车辆类型："+that.carInfor.CARTYPE+"</li>" + 
							 		"<li style='margin-top:5px'>行驶状态："+STATUS+"</li>" + 
								"</ul>" +
								 "<img style='margin:4px' id='imgDemo' src='"+that.ajax.http + that.carInfor.CARPHOTOURL.slice(2)+"' width='162' height='96'/>" + 
								"</div>"
							var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
							that.map.addOverlay(marker);
							marker.addEventListener("click", function(){          
							   this.openInfoWindow(infoWindow);
							   //图片加载完毕重绘infowindow
							   document.getElementById('imgDemo').onload = function (){
								   infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
							   }
							});
						}
					}
				})
			},
		
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
	
	#containerS {
		min-width: 100%;
		min-height: 100%;
	}
	.position{
		border-bottom: 1px solid #eee;
		padding:0 16px 16px;
		margin-bottom: 16px;
		line-height: 32px;
		font-size:17px;
	}
	
	
	.position span:last-child {
		float: right;
		color: #ddd;
		font-size: 14px;
	}
	
	.position img {
		width: 54px;
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
		padding-top: 15px;
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
	
	.footer_k div.shu {
		width: 19px;
		height: 2px;
		background: rgba(112, 153, 208, 1);
		border-radius: 1px;
		margin: 0 auto 10px;
	}
	
	.footer_k li {
		display: inline-block;
		width: 50%;
		height: auto;
		overflow: hidden;
		float: left;
		font-size: 14px;
		color: #666666;
		padding: 0 10px 15px;
	}
	
	
	.footer_kS li span {
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