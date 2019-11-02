<template>
	<div id="examrecord">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2">
			
			<div slot='right_slot'>
				<p class="header-right"><img src="../../assets/images/user_icon/icon_lc@2x.png" width="16" alt=""></p>
			</div>
		</vant-header>
		<div class="container">
			<ul class="container_list container_lists">
				<p class="van-hairline--bottom exam-title"><img src="../../assets/images/safeQuality/icon_t@2x (3).png" alt="">问题详情</p>
				<li>
					<span>问题提出人</span>
					<span>孙悟空(中铁总经理)</span>
				</li>
				
				<li>
					<span>所属部门</span>
					<span>中铁集团</span>
				</li>
				<li>
					<span>问题类型</span>
					<span>安全问题</span>
				</li>
				<li>
					<span>紧急类型</span>
					<span>一般紧急</span>
				</li>
				<li>
					<span>提问时间</span>
					<span>2019-10-07 20:30</span>
				</li>
				<li>
					<span>问题负责人</span>
					<span>孙悟空(1标-工点1项目负责人)</span>
				</li>
				<li>
					<span>限定时间</span>
					<span>2019-10-07 20:30</span>
				</li>
				<li>
					<span>分配意见</span>
					<span style="color: #7AA0D3;">同意</span>
				</li>
				<li>
					<span>分配意见</span>
					<span style="color: #C86565;">问题描述不明确、请修改</span>
				</li>
			</ul>
			<ul class="container_list">
				<p class="van-hairline--bottom exam-title"><img src="../../assets/images/safeQuality/icon_t@2x (1).png" alt="">问题地点</p>
				<li class='more'>
					<van-cell style='color: #304F83;'>
						北京市昌平区霍营乡回龙观东大街龙腾苑东1区
					</van-cell>
				</li>
				<li class='more'>
					<van-cell style='font-size: 12px;color:rgba(152,160,174,1);border-bottom:none;'>
						经度：40.14567 纬度：116.24567
					</van-cell>
				</li>
				<li class='Buttond'>
					<van-button color="rgba(89,95,115,1) " size="normal" style='width: 100%;'>查看位置信息</van-button>
				</li>
			</ul>
			<ul class="container_list container_lists">
				<p class="van-hairline--bottom exam-title"><img src="../../assets/images/safeQuality/icon_t@2x (2).png" alt="">问题简述</p>
				<!-- v-if='examRecord!=""' -->
				<li>
					1标主站桥梁存在严重的质量问题，电线直接放在地上1标主站桥梁存在严重的质量问题，电线直接放在地上
				</li>
			</ul>
			<ul class="container_list container_lists">
				<p class="van-hairline--bottom exam-title"><img src="../../assets/images/safeQuality/icon_t@2x (3).png" alt="">问题描述</p>
				<li>
					问题描述中的供电系统之前由于调试中所以出现不稳定状态，目前正常使用中没有问题，问题已核实。
				</li>
			</ul>
			
			<ul class="container_list container_lists">
				<p class="van-hairline--bottom exam-title"><img src="../../assets/images/safeQuality/icon_t@2x (5).png" alt="">现场照片</p>
				<li class="overflow">
					<div><img src="" alt=""></div>
					<div><img src="" alt=""></div>
					<div><img src="" alt=""></div>
					<div><img src="" alt=""></div>
				</li>
			</ul>
			<!-- 驳回修改按钮显示 -->
			<div>
				<h5>处理情况</h5>
				<ul class="container_list">
					<li class='Buttond Buttond' style='color:#666666;display: none;'>
						<van-button color="#EEEEEE" size="normal" style='width: 100%;border-radius:2px;
				           border:1px solid rgba(238,238,238,1);'>确认问题已解决</van-button>
					</li>
					<li class='Buttond'>
						<van-button color="#7099D0" size="normal" style='width: 100%;'>问题依然存在，修改后继续整改</van-button>
					</li>
				</ul>
			</div>
				<!-- 驳回修改按钮end -->
			<ul class="container_list container_lists">
				<p class="van-hairline--bottom exam-title"><img src="../../assets/images/safeQuality/icon_t@2x (5).png" alt="">抄送给解决人</p>
				<li class="overflow">
					<div style="margin: 0;width: 25%;"><img src="" alt="" style="width: 45px;height: 45px;display: block;margin: 0 auto;"><p style="text-align: center;">孙悟空</p></div>
					<div style="margin: 0;width: 25%;"><img src="" alt="" style="width: 45px;height: 45px;display: block;margin: 0 auto;"><p style="text-align: center;">孙悟空</p></div>
					<div style="margin: 0;width: 25%;"><img src="" alt="" style="width: 45px;height: 45px;display: block;margin: 0 auto;"><p style="text-align: center;">孙悟空</p></div>
					<div style="margin: 0;width: 25%;"><img src="" alt="" style="width: 45px;height: 45px;display: block;margin: 0 auto;"><p style="text-align: center;">孙悟空</p></div>
				</li>
			</ul>
			<!-- 驳回提交按钮 -->
			<ul>
				<li class='Buttond'  @click='sumtrienButton()'>
					<van-button color="#7099D0" size="normal" style='width: 100%;'>提交</van-button>
				</li>
			</ul>
				<!-- 驳回提交按钮end -->
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
	import {Icon,CellGroup, IndexBar, IndexAnchor } from 'vant';
	Vue.use(IndexBar).use(IndexAnchor).use(Icon).use(CellGroup);
	Vue.use(Cell)
	export default {
		components: {
			vantHeader,
			
		},
		data() {
			return {
				questionText:"问题详情",
				examRecord:[],
				examRecordTime:[],
				StaffInfoData:[],
				IDCard:'',
				message:''
			}
		},
		mounted() {
			this.examrecord()
		},
		created() {
			this.StaffInfoF()
		},
		methods: {
			sumtrienButton() {
				this.$router.push({path:'/problemX'})
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
				console.log(that.$route.query.IDCard)
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
