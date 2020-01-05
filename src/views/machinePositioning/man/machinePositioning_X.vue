<template>
	<div class="container">
		<!--header-->
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType='2'>
			
		</vant-header>
		<div id="containerS"></div>
		<div class="list-content">
			
			<ul class="footer_k" :class="{'activeClass': activeClassType}" v-show='!activeClassType'>
				<div @click="activeClassButton()" class="shu"></div>
				
				
				<div class="position">
					<img :src="userInfor.PHOTOURL" alt="">
					<span>{{userInfor.EXAMNAME}} 
					<van-icon name="manager" color='#00A0E9' style='vertical-align: middle;font-size: 14px;' v-if="userInfor.SEX == '男'"/>
					<van-icon name="manager" color='red' style='vertical-align: middle;font-size: 14px;' v-if="userInfor.SEX == '女'"/>
					</span>
					<span>{{userInfor.WORKTYPE}}</span>
				</div>
				<div class="overflow vanDialog">
					<li @click="$router.push({path:'/information?IDCard='+userInfor.CERTNUMBR})"><img src="../../../assets/images/exam/yuangong.png" alt=""><span>员工信息</span></li>
					<li>
						<a class="overflow" :href="'tel:' + userInfor.TELEPHONE"style="width: 100%;float:right;display: block;color: #666666;">
						<img src="../../../assets/images/exam/car_2.png" alt=""><span>拨打电话</span></a>
					</li>
					
					<li @click="showPicker= true"><img src="../../../assets/images/exam/yuyin.png" alt=""><span>发送语音</span></li>
					<li><img src="../../../assets/images/exam/jingbao.png" alt=""><span>一键报警</span></li>
					<van-popup v-model="showPicker" position="bottom">
					  <van-picker
					    show-toolbar
					    :columns="columns"
					    @cancel="showPicker = false"
					    @confirm="onConfirm"/>
					</van-popup>
					<!-- <van-dialog
					  v-model="show"
					  title="报警提示" 
					  @confirm="confirmButton"
					  @cancel="cancelButton"
					  show-cancel-button>
					  <div class="overflow hader_top">
						 <img src="" alt="">
						  <h3>心碎小猴<van-icon name="manager" /></h3>
						  <p>项目经理/常务副经理</p>
					  </div>
					    <p style="padding: 12px 0;margin: 0 auto !important;color:#333;display: block;text-align: center;" class="hader_top">是否向此员工发送报警提示？</p>
					</van-dialog> -->
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
		DropdownMenu, DropdownItem,
	} from 'vant';
	import { Dialog,Popup,Picker } from 'vant';
	
	// 全局注册
	Vue.use(Dialog).use(Popup).use(Picker);
	Vue.use(Row).use(Col).use(Loading).use(Tab).use(Tabs).use(Icon).use(Search).use(DropdownMenu).use(DropdownItem);
	export default {
		data() {
			return {
				questionText: '员工详情',
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
				show:false,
				columns: ['防空报警', '请带好安全帽',
					'危险请注意','已收到报警，请等待救援',
					"附近有人需要救援","请不要违规作业",
					"请回到岗位","请到办公室","请充电",
					"请联系管理人员","你是否需要帮助",
					"请立即离开","请回电"],//1 2 3 7 8 9 10 11 12 13 14 15 16
				showPicker: false,
				quesType:'',
				value:"",
				userInfor: {},
				LATITUDE:'',
				LONGITUDE:''
			}
		},
		components: {
			vantHeader
		},
		mounted() {
			this.init()
		},
		created() {
			var infor = sessionStorage.getItem("userInfor");
			if(!infor) {
				Toast.fail('未获取到人员信息，请重新获取');
				return;
			}
			Object.assign(this.userInfor, JSON.parse(infor));
			// console.log("=====",JSON.parse(infor))
		},
		methods: {
			confirmButton(){
				console.log("确认提交")
			},
			cancelButton(){
				console.log("取消提交")
			},
			onConfirm(value,index) {
			    this.value = value;
			    this.showPicker = false;
				this.quesType=index+Number(1);
				console.log("---quesType--",this.quesType)
			},
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
				var points = [new BMap.Point(this.userInfor.LONGITUDE, this.userInfor.LATITUDE)];
				// 坐标转化
				var that = this;
				var convertor = new BMap.Convertor();
				convertor.translate(points, 1, 5, function(data) {
					if(data.status === 0) {
						for(var j = 0; j < data.points.length; j++) {
							console.log(data.points)
							var icon = new BMap.Icon(require('../../../assets/images/exam/eimg.png'), new BMap.Size(24, 25), {
								anchor: new BMap.Size(24, 25),
								offset: new BMap.Size(24, 25),
								imageSize: new BMap.Size(24, 25),
							});
							var mkr = new BMap.Marker(data.points[j], {
								icon: icon,
								rotation: 0,
								title: ''
							});
							that.map.addOverlay(mkr);
							
							that.map.setCenter(data.points[j]);
						}
					}
				})
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
			
			
		}
	}
</script>

<style scoped>
	.vanDialog h3 .van-icon{
	    /* margin-top: 5px; */
	    color: #00A0E9;
	    /* visibility: initial; */
	    font-size: 14px;
	}
	/deep/
	.van-dialog__confirm, .van-dialog__confirm:active{
		color:#333333;
	}
	/deep/
	.van-dialog__confirm{
		background: #F7F9FC;
		
	}
	/deep/
	.van-dialog__cancel .van-button__text{
		color:#aaa;
	}
	.hader_top{
		margin: 0 auto;
		width: 90%;
		border-bottom: 1px solid rgba(238,238,238,1);
		margin-top: 25px;
	}
	/deep/
	.van-dialog__header{
		height:48px;
		text-align:left;
		line-height: 48px;
		border-bottom: 1px solid rgba(238,238,238,1);
		padding:0;
		padding-left: 15px;
	}
	/deep/.van-dialog{
		border-radius: 0;
	}
	.vanDialog img{
	    width: 65px;
	    height: 85px;
	    border-radius: 1px;
	    background: rgba(238,238,238,1);
	    border: 1px solid rgba(238,238,238,1);
	    display: block;
	    margin: 0 auto;
	}
	.vanDialog h3, .vanDialog p{
	    text-align: center;
	    margin: 10px 0 !important;
	}
	#containerS{
	    min-width:100%;
	  	    min-height:100%;
	}
	.position{
		border-bottom: 1px solid #eee;
		padding:0 16px 16px;
		margin-bottom: 16px;
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
