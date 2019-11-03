<template>
	<div id="examrecord">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2">
			
		</vant-header>
		<div class="container">
			<ul class="container_list container_lists">
				<p class="van-hairline--bottom exam-title"><img src="../../assets/images/user_icon/icon_b@2x.png" alt="">工程详情</p>
				<li>
					<span>所在标段</span>
					<span>CYCZQ-5标-1</span>
				</li>
				
				<li>
					<span>所在部门</span>
					<span>一分部</span>
				</li>
				<li>
					<span>工程类型</span>
					<span>桥梁</span>
				</li>
				<li>
					<span>桥梁名称</span>
					<span>阮江特大桥</span>
				</li>
				<li>
					<span>重要性</span>
					<span>普通工程</span>
				</li>
				<li>
					<span>工程部分</span>
					<span>梁</span>
				</li>
				<li>
					<span>构件名称</span>
					<span>527# 梁</span>
				</li>
			</ul>
			
				<ul class="container_list container_lists">
					<p class="van-hairline--bottom exam-title"><img src="../../assets/images/user_icon/icon_time@2x.png" alt="">完成情况</p>
					<li>
						<span>计划开始</span>
						<span>2019-09-04</span>
					</li>
					<li>
						<span>计划结束</span>
						<span>2019-09-20</span>
					</li>
					<li>
						<span>实际开始</span>
						<span>2019-09-04</span>
					</li>
					<li>
						<span>实际结束</span>
						<span>2019-09-20</span>
					</li>
					<li>
						<span>进度状态</span>
						<span style="color: #E19B52;">延期完成</span>
					</li>
					<li>
						<span>工程产值（元）</span>
						<span>3,025,316</span>
					</li>
					<li>
						<span>总里程（公里）</span>
						<span>1255</span>
					</li>
					<li>
						<span>桩径（米）</span>
						<span>242</span>
					</li>
					<li>
						<span>桩长（米）</span>
						<span>15</span>
					</li>
				</ul>
				<ul class="container_list">
					<p class="van-hairline--bottom exam-title">
						<img src="../../assets/images/user_icon/icon_eror@2x (1).png" alt="">延期原因
					</p>
					<li style="padding: 10px 16px;">
						今年以来，根据各地上报数据，全市共有
						建设项目326个，其中：市级项目32个，今年以
						来，根据各地上报数据，全市共有建设项目326个
						，其中：市级项目32个，六枝特区32个盘今年以来，
						根据各地上报数据，全市共有建设项目326个，其中：市级项
						目32个，六枝特区32个盘今年以来，根据各地上报数据，全市共有建设项目326个，其中：
						市级项目32个，六枝特区32个盘今年以来，根据各地上报数据，全市共有建设。
					</li>
				</ul>
				<ul class="container_list" style="margin-bottom: 20px;">
					<p class="van-hairline--bottom exam-title">
						<img src="../../assets/images/user_icon/icon_sz@2x.png" alt="">解决方案
					</p>
					<li style="padding: 10px 16px;">
						今年以来，根据各地上报数据，全市共有
						建设项目326个，其中：市级项目32个，今年以
						来，根据各地上报数据，全市共有建设项目326个
						，其中：市级项目32个，六枝特区32个盘今年以来，
						根据各地上报数据，全市共有建设项目326个，其中：市级项
						目32个，六枝特区32个盘今年以来，根据各地上报数据，全市共有建设项目326个，其中：
						市级项目32个，六枝特区32个盘今年以来，根据各地上报数据，全市共有建设。
					</li>
				</ul>
		</div>
		
	</div>
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import * as ajax from '@/utils/api'
	import Vue from 'vue';
	import { Cell} from 'vant';
	import { Button } from 'vant';
	import { Field } from 'vant';
	
	Vue.use(Field);
	Vue.use(Button);
	import {Icon,DatetimePicker ,CellGroup,Popup, IndexBar, IndexAnchor } from 'vant';
	Vue.use(IndexBar).use(DatetimePicker).use(IndexAnchor).use(Icon).use(CellGroup).use(Popup);
	Vue.use(Cell)
	export default {
		components: {
			vantHeader,
			
		},
		data() {
			return {
				questionText:"527# 梁",
				examRecord:[],
				examRecordTime:[],
				StaffInfoData:[],
				IDCard:'',
				message:'',
			}
		},
		mounted() {
			this.examrecord()
		},
		created() {
			this.StaffInfoF();
			
		},
		methods: {
			sumtrienButton(){
			    // this.titShow = false;
			},
			
			StaffInfoF(){
				// let that=this;
				// that.IDCard=that.$route.query.IDCard;
				// ajax.get('StaffInfo?IDCard='+that.$route.query.IDCard).then(res => {
				// 	if(res.data.result) {
				// 		console.log(res.data)
				// 		that.StaffInfoData=res.data.data
				// 		that.StaffInfoData[0].PHOTOURL=ajax.http+that.StaffInfoData[0].PHOTOURL.slice(2)
				// 	}
				// })
			},
			examrecord(){
				let that=this;
				// console.log(that.$route.query.IDCard)
				// ajax.get('TestRecords?IDCard='+that.$route.query.IDCard).then(res => {
				// 	console.log(res);
				// 	if(res.data.result) {
				// 		console.log("kaoshilihi",res.data.data)
				// 		that.examRecord=res.data.data;
				// 		for(let k in that.examRecord) {
				// 		    that.examRecord[k].EXAMINATIONDATE=that.examRecord[k].EXAMINATIONDATE.replace("T", " ");
				// 		}		
				// 	}
				// })
			},
			
		}
	}
</script>

<style scoped>
	input{
		width:48px;height:16px;text-align: right;border: none;
	}
	.Buttond{
		    margin: 10px 16px;
		height:44px;
		border-radius:2px;
		font-size:16px;
		text-align: center;
		line-height: 44px;
	}
	.container_lists li div{
		width:23.5%;
		height: auto;
		overflow: hidden;
		float: left;
		margin-right: 2%;
	}
	h5{
		padding: 10px 16px 0;
		color:#666666;
		margin: 0;
	}
	/deep/
	.Buttonds.van-button__text{
		color:#666666;
	}
	.container_lists li div:last-child{
		margin-right: 0 !important;
	}
	.container_lists li div img{
		width:70px;
		height:70px;
		/* height: auto; */
		overflow: hidden;
		float: left;
		display: block;
		background: #ddd;
	}
	.container_lists li{
		padding: 10px 16px;
		color:  #969799;
		font-size: 14px;
		line-height: 24px;
	}
	.container_lists li span:last-child{
		width:65%;
		color:#323233;
		text-align: right;
		display: inline-block;
		float: right;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.van-hairline--bottom img{
	    width: 12px;
	    height: 12px;
	    float: left;
	    margin-right: 5px;
	    margin-top: 14px;
	}
	.van-hairline--bottom{
	    height: 40px;
	    line-height: 40px;
	    font-size: 14px;
	    padding-left: 14px;
	    font-family: PingFangSC-Regular,PingFang SC;
	    font-weight: 400;
	    color: rgba(51,51,51,1);
	    line-height: 40px;
	    margin: 0;
	    border-bottom: 1px solid rgba(238,238,238,1);
	}
	.infor_header p{
		color:#999999;
	}
	.infor_header h3,.infor_header p{
		text-align: center;
		margin: 10px 0 !important;
	}
	.infor_header h3 .van-icon{
		/* margin-top:5px; */
		color:#00A0E9;
		/* visibility: initial; */
		font-size: 14px;
		
	}
	/deep/
	.infor_header .van-button{
		width:48%;
	} 
	.infor_header .van-button:last-child{
		float: right;
	}
	.infor_header img{
		/* width:85px; */
		height:85px;
		border-radius:1px;
		border:1px solid rgba(238,238,238,1);
		display: block;
		margin: 0 auto;
	}
	.infor_header{
		background:#fff;
		padding:15px;
		box-shadow:0px 1px 2px 0px rgba(0,0,0,0.16);
		/* margin-bottom: 10px; */
	}
	.header-right {
		line-height: 5px;
		color:#fff;
	}
	.container_l{
		width:20%;
		float:left;
	}
	.container_r{
		width:78%;
		float:right;
	}
	.container_r span{
		display: block;
		width: 100%;
	}
	.container{
		padding-top: 46px;
	}
	.container_list{
		margin-top: 10px;
		height: auto;
		overflow: hidden;
		background: #fff;
		box-shadow:0px 1px 2px 0px rgba(0,0,0,0.16);
	}
	.container_list li{
		/* padding: 10px 16px; */
		height: auto;
		overflow: hidden;
		border-bottom: 1px solid #EEEEEE;
	}
	.container_list li:last-child{
		border-bottom: none;
	}
	.container_list li.more .van-icon{
		margin-top: 0;
	}
	.container_list li .van-icon{
		margin-top: 15px;
	}
	.container_span_first{
		width: 42px;
		color:#69966F;font-size:20px;
	}
	
	.container_span_seound{
		color:#69966F;font-size:12px;
	}
	.container_span_three{
		color:#333;font-size:17px;
	}
	.container_span_firsts{
		width: 42px;
		border:1px solid #69966F;font-size:12px;height:17px;line-height: 14px;display: inline-block;text-align: center;
	     border-radius: 2px;
		 color:#69966F;
	}
	.container_span_seounds{
		color:#aaa;font-size:12px;
	}
</style>
