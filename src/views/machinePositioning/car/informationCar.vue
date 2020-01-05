<template>
	<div id="examrecord">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2">

		</vant-header>
		<div class="container">
			<div class="infor_header overflow">
				<img :src="ajax.http + carInfor.CARPHOTOURL.slice(2)" alt="">
				<h3>{{carInfor.CARNUMBER}}</h3>
				<p>{{carInfor.CARTYPE}}</p>

			</div>
			<ul class="container_list container_lists">
				<p class="van-hairline--bottom exam-title"><img src="../../../assets/images/user_icon/car@2x.png" alt="">车辆详情</p>
				<li>
					<span>所在标段</span>
					<span>{{carInfor.BIDSECTION}}</span>
				</li>
				<li>
					<span>所在工区</span>
					<span>{{carInfor.WORKPOINT}}</span>
				</li>
				<li>
					<span>司机姓名</span>
					<span>{{carInfor.DRIVERNAME}}</span>
				</li>

				<li>
					<span>手机号</span>
					<span>{{carInfor.DRIVERPHONE}}</span>
				</li>

			</ul>
			<div class="button">
				<a :href="'tel:' + carInfor.DRIVERPHONE">联系司机</a>
			</div>

		</div>

	</div>
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import * as ajax from '@/utils/api'
	import Vue from 'vue';
	import { Cell } from 'vant';
	import { Button } from 'vant';

	Vue.use(Button);
	import { Icon, IndexBar, IndexAnchor } from 'vant';
	Vue.use(IndexBar).use(IndexAnchor).use(Icon);
	Vue.use(Cell)
	export default {
		components: {
			vantHeader,

		},
		data() {
			return {
				questionText: "车辆信息",
				examRecord: [],
				examRecordTime: [],
				StaffInfoData: [],
				IDCard: '',
				ajax: ajax,
				carInfor: {}
			}
		},
		mounted() {},
		created() {
			this.StaffInfoF()
		},
		methods: {
			StaffInfoF() {
				var infor = sessionStorage.getItem("curCarInfor");
				if(!infor) {
					Toast.fail('为获取到车辆信息，请重新获取');
					return;
				}
				Object.assign(this.carInfor, JSON.parse(infor));
				console.log(JSON.parse(infor))
			}
		}
	}
</script>

<style scoped>
	.button {
		width: 90%;
		height: 44px;
		background: rgba(112, 153, 208, 1);
		border-radius: 2px;
		line-height: 44px;
		text-align: center;
		margin: 10px auto;
	}
	
	.button a {
		display: block;
		color: #fff;
	}
	
	.container_lists li {
		padding: 10px 16px;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
	}
	
	.container_lists li span:last-child {
		color: #969799;
		text-align: right;
		display: inline-block;
		float: right;
	}
	
	.van-hairline--bottom img {
		width: 12px;
		height: 12px;
		float: left;
		margin-right: 5px;
		margin-top: 14px;
	}
	
	.van-hairline--bottom {
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		padding-left: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 40px;
		margin: 0;
		border-bottom: 1px solid rgba(238, 238, 238, 1);
	}
	
	.infor_header p {
		color: #999999;
	}
	
	.infor_header h3,
	.infor_header p {
		text-align: center;
		margin: 10px 0 !important;
	}
	
	.infor_header h3 .van-icon {
		/* margin-top:5px; */
		color: #00A0E9;
		/* visibility: initial; */
		font-size: 14px;
	}
	
	/deep/ .infor_header .van-button {
		width: 48%;
	}
	
	.infor_header .van-button:last-child {
		float: right;
	}
	
	.infor_header img {
		width: 128px;
		height: 85px;
		border-radius: 2px;
		background: #ddd;
		border-radius: 1px;
		border: 1px solid rgba(238, 238, 238, 1);
		display: block;
		margin: 0 auto;
	}
	
	.infor_header {
		background: #fff;
		padding: 15px;
		box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.16);
		/* margin-bottom: 10px; */
	}
	
	.header-right {
		line-height: 5px;
		color: #fff;
	}
	
	.container_l {
		width: 20%;
		float: left;
	}
	
	.container_r {
		width: 78%;
		float: right;
	}
	
	.container_r span {
		display: block;
		width: 100%;
	}
	
	.container {
		padding-top: 46px;
	}
	
	.container_list {
		margin-top: 10px;
		height: auto;
		overflow: hidden;
		background: #fff;
		box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.16);
	}
	
	.container_list li {
		/* padding: 10px 16px; */
		height: auto;
		overflow: hidden;
		border-bottom: 1px solid #EEEEEE;
	}
	
	.container_list li:last-child {
		border-bottom: none;
	}
	
	.container_list li.more .van-icon {
		margin-top: 0;
	}
	
	.container_list li .van-icon {
		margin-top: 15px;
	}
	
	.container_span_first {
		width: 42px;
		color: #69966F;
		font-size: 20px;
	}
	
	.container_span_seound {
		color: #69966F;
		font-size: 12px;
	}
	
	.container_span_three {
		color: #333;
		font-size: 17px;
	}
	
	.container_span_firsts {
		width: 42px;
		border: 1px solid #69966F;
		font-size: 12px;
		height: 17px;
		line-height: 14px;
		display: inline-block;
		text-align: center;
		border-radius: 2px;
		color: #69966F;
	}
	
	.container_span_seounds {
		color: #aaa;
		font-size: 12px;
	}
</style>