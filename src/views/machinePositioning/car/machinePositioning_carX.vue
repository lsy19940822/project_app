<template>
	<div class="container">
		<!--header-->
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType='2'>
			
		</vant-header>
		<div id="containerS"></div>
		<div class="list-content">
			<ul class="footer_k" :class="{'activeClass': activeClassType}" v-show='!activeClassType'>
				<div @click="activeClassButton()" class="shu"></div>
				<div class="overflow">
					<li @click="$router.push({path:'/car/informationCar'})"><img src="../../../assets/images/exam/car_1.png" alt=""><span>车辆信息</span></li>
					<li>
						<a class="overflow" :href="'tel:' + carInfor.DRIVERPHONE" style="float:right;display: block;color: #666666;">
							<img src="../../../assets/images/exam/car_2.png" alt=""><span>联系司机</span>
						</a>
					</li>
					<!--<li @click="$router.push({path:'/car/machinePositioning_AQ'})"><img src="" alt=""><span>安全范围</span></li>-->
					<!--<li @click="$router.push({path:'/car/machinePositioning_GJ'})"><img src="" alt=""><span>活动轨迹</span></li>-->
				</div>
				
				<div class="position">
					<img :src="ajax.http + carInfor.CARPHOTOURL.slice(2)" alt="">
					<span>{{carInfor.CARNUMBER}}</span>
					<span>{{carInfor.CARTYPE}}</span>
				</div>
			</ul>
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
		DropdownMenu, DropdownItem,Toast
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
				activeClassType:false,
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
				Toast.fail('为获取到车辆信息，请重新获取');
				return;
			}
			Object.assign(this.carInfor, JSON.parse(infor));
			console.log(JSON.parse(infor))
		},
		mounted() {
			this.init()
//			this.getUserWorkPointList()
		},
		methods: {
			init() {
				//定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
				this.map = new qq.maps.Map(document.getElementById("containerS"), {
					center: new qq.maps.LatLng(39.916527,116.397128),      // 地图的中心地理坐标。
					zoom:8
				});
				var anchor = new qq.maps.Point(6, 6),
					size = new qq.maps.Size(40, 19),
					origin = new qq.maps.Point(0, 0),
					icon = new qq.maps.MarkerImage(require('../../../assets/images/exam/car.jpg'), size, origin, anchor, size);
				var marker = new qq.maps.Marker({
					icon: icon,
					map: this.map,
					rotation: Math.random() * 360,
					position: new qq.maps.LatLng(this.carInfor.LATITUDE, this.carInfor.LONGITUDE)
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
			getUserWorkPointList(){
				let that = this;
				// this.$route.query.id=this.value1;
				// console.log(this.value1,this.$route.query.value);
				
				// 工点
				ajax.get('/API/WebAPIDataAudit/getUserWorkPoint').then(res => {
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
	#containerS{
	    min-width:100%;
	  	min-height:100%;
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
        width:54px;
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
		display: inline-block;
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
