<template>
	<div id="examrecord">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2">
			
		</vant-header>
		<div class="container">
			<div class="infor_header overflow">
				<img :src="StaffInfoData[0].PHOTOURL" alt="">
				<h3>{{StaffInfoData[0].EXAMNAME}}<van-icon name="manager" /></h3>
				<p>{{StaffInfoData[0].WORKTYPE}}</p>
				<ul class="overflow footer_k">
					<li @click="$router.push({path:'/information?IDCard='+$route.query.IDCard})"><img src="../../assets/images/user_icon/dingwei.png" alt=""><span>查看定位</span></li>
					<li>
						<a class="overflow" :href="'tel:'+StaffInfoData[0].TELEPHONE" style="width: 48%;float:right;display: block;color: #666666;"></a>
						<img src="../../assets/images/user_icon/phone.png" alt=""><span>拨打电话</span>
					</li>
					<li @click="showPicker= true"><img src="../../assets/images/user_icon/yuyin.png" alt=""><span>发送语音</span></li>
					<li><img src="../../assets/images/user_icon/yuangongxinxi.png" alt=""><span>一键报警</span></li>
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
						  <img :src="StaffInfoData[0].PHOTOURL" alt="">
						  <h3>{{StaffInfoData[0].EXAMNAME}}<van-icon name="manager" /></h3>
						  <p>{{StaffInfoData[0].WORKTYPE}}</p>
						
					  </div>
					    <p style="padding: 12px 0;margin: 0 auto !important;color:#333;display: block;text-align: center;" class="hader_top">是否向此员工发送报警提示？</p>
					</van-dialog> -->
				</ul>
			</div>
			<ul class="container_list container_lists">
				<p class="van-hairline--bottom exam-title"><img src="../../assets/images/user_icon/userH@2x.png" alt="">员工详情</p>
				<li>
					<span>所在标段</span>
					<span>{{StaffInfoData[0].BIDSECTION}}</span>
				</li>
				
				<li>
					<span>所在单位</span>
					<span>{{StaffInfoData[0].COMPANY}}</span>
				</li>
				<li>
					<span>所在工点</span>
					<span>{{StaffInfoData[0].WORKPOINT}}</span>
				</li>
				<li>
					<span>手机号</span>
					<span>{{StaffInfoData[0].TELEPHONE}}</span>
				</li>
				<li>
					<span>身份证号</span>
					<span>{{StaffInfoData[0].CERTNUMBR}}</span>
				</li>
				<li>
					<span>负责人姓名</span>
					<span>{{StaffInfoData[0].LEADERUSER}}</span>
				</li>
				<li>
					<span>负责人手机</span>
					<span>{{StaffInfoData[0].LEADERTELEPHONE}}</span>
				</li>
				<li>
					<span>入职时间</span>
					<span>{{StaffInfoData[0].ENTRYDATE=null?StaffInfoData[0].ENTRYDATE:'--'}}</span>
				</li>
				<li>
					<span>离职时间</span>
					<span>{{StaffInfoData[0].QUITDATE=null?StaffInfoData[0].QUITDATE:'--'}}</span>
				</li>
				
			</ul>
			<ul class="container_list">
				<p class="van-hairline--bottom exam-title"><img src="../../assets/images/user_icon/icon_user@2x (9).png" alt="">考试记录</p>
				<li v-if='examRecord==""' style="padding: 10px 16px;color: #969799; font-size: 14px;line-height: 24px;text-align: center;">暂无考试记录</li>
				<li v-for='(item,index) in examRecord' v-if="index<5">
					<van-cell is-link >
						<div class="container_l">
							<span class='container_span_first' v-if="item.ISQUALIFIED == 1?2:1" :style="{'color':(item.ISQUALIFIED == 1?'#69966F':'#C36363')}">{{item.EXAMINATIONSCORES}}</span>
							<span class='container_span_seound' v-if="item.ISQUALIFIED == 1?2:1" :style="{'color':(item.ISQUALIFIED == 1?'#69966F':'#C36363')}">分</span>
							<span class='container_span_firsts'  v-if="item.ISQUALIFIED == 1?2:1" :style="{'color':(item.ISQUALIFIED == 1?'#69966F':'#C36363'),'border':(item.ISQUALIFIED == 1?'1px solid #69966F':'1px solid #C36363')}">{{item.ISQUALIFIED == 1?'合格':'未合格'}}</span>
						</div>
						
						<div class="container_r">
							
							<span class='container_span_three'>{{item.EXAMINATIONBATCH}}</span>
							
							<span class='container_span_seounds' style="">考试时间：{{item.EXAMINATIONDATE}}</span>
						</div>
					</van-cell>
				</li>
			</ul>
			<ul class="container_list">
				<!-- v-if='examRecord!=""' -->
				<li  @click="$router.push({path:'/examrecord?IDCard='+IDCard})" class='more'>
					<van-cell is-link  @click="$router.push({path:'/examrecord?IDCard='+IDCard})">
						更多考试记录
					</van-cell>
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
	import { Dialog } from 'vant';
	
	// 全局注册
	Vue.use(Dialog);
	Vue.use(Button);
	import {Icon, IndexBar, IndexAnchor,Popup,Picker } from 'vant';
	Vue.use(IndexBar).use(IndexAnchor).use(Icon).use(Popup).use(Picker);
	Vue.use(Cell)
	export default {
		components: {
			vantHeader,
			
		},
		data() {
			return {
				questionText:"人员信息",
				examRecord:[],
				examRecordTime:[],
				StaffInfoData:[],
				IDCard:'',
				show:false,
				columns: ['防空报警', '请带好安全帽',
					'危险请注意','已收到报警，请等待救援',
					"附近有人需要救援","请不要违规作业",
					"请回到岗位","请到办公室","请充电",
					"请联系管理人员","你是否需要帮助",
					"请立即离开","请回电"],//1 2 3 7 8 9 10 11 12 13 14 15 16
				showPicker: false,
				quesType:'',
				value:""
			}
		},
		mounted() {
			this.examrecord()
		},
		created() {
			this.StaffInfoF()
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
			StaffInfoF(){
				let that=this;
				that.IDCard=that.$route.query.IDCard;
				ajax.get('/API/WebAPIDataAudit/StaffInfo?IDCard='+that.$route.query.IDCard).then(res => {
					if(res.data.result) {
						console.log(res.data)
						that.StaffInfoData=res.data.data
						that.StaffInfoData[0].PHOTOURL=ajax.http+that.StaffInfoData[0].PHOTOURL.slice(2)
					}
				})
			},
			examrecord(){
				let that=this;
				console.log(that.$route.query.IDCard)
				ajax.get('/API/WebAPIDataAudit/TestRecords?IDCard='+that.$route.query.IDCard).then(res => {
					console.log(res);
					if(res.data.result) {
						console.log("kaoshilihi",res.data.data)
						that.examRecord=res.data.data;
						for(let k in that.examRecord) {
						    that.examRecord[k].EXAMINATIONDATE=that.examRecord[k].EXAMINATIONDATE.replace("T", " ");
						}		
					}
				})
			},
			
		}
	}
</script>

<style scoped>
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
	.footer_k li span{
	    margin-top: 10px;
	    display: block;
	    text-align: center;
	}
	.footer_k li img{
	    width: 32px;
	    height: 32px;
	    background: rgba(133,142,167,1);
	    border-radius: 2px;
	    background: #DDDDDD;
	    display: block;
	    margin: 0 auto;
	}
	.footer_k li{
	    width: 25%;
	    height: auto;
	    overflow: hidden;
	    float: left;
	    font-size: 14px;
	    color: #666666;
	    padding: 0 10px 15px;
	}
	.container_lists li{
		padding: 10px 16px;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
	}
	.container_lists li span:last-child{
		color: #969799;
		    text-align: right;
		display: inline-block;
		float: right;
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
		width:65px;
		height:85px;
		border-radius:1px;
		background: rgba(238,238,238,1);
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
