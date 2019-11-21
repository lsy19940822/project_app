<template>
	<div id="examrecord">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2">
			
		</vant-header>
		<div class="container">
			<div class="infor_header overflow">
				<img :src="StaffInfoData[0].PHOTOURL" alt="">
				<h3>{{StaffInfoData[0].EXAMNAME}}<van-icon name="manager" /></h3>
				<p>{{StaffInfoData[0].WORKTYPE}}</p>
			</div>
		</div>
		<h5>语音详情</h5>
		<ul class="container_list">
			<li class="list_li">
				<van-cell is-link @click="showPicker = true">
				   <span>语音类型</span>
				   <span>{{value?value:"请选择"}}</span>
				</van-cell>
				
				<van-popup v-model="showPicker" position="bottom">
				  <van-picker
				    show-toolbar
				    :columns="columns"
				    @cancel="showPicker = false"
				    @confirm="onConfirm"/>
				</van-popup>
			</li>
			
		</ul>
		<ul>
			<li class='Buttond'>
				
				<van-button color="#7099D0 " size="normal" @click='sumtrienButton()' style="width: 100%;">发送语音</van-button>
			</li>
		</ul>
	</div>
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import * as ajax from '@/utils/api'
	import Vue from 'vue';
	import { Cell} from 'vant';
	import { Button } from 'vant';
	import { Field } from 'vant';
	import { Uploader } from 'vant';
	import { Picker } from 'vant';
	import { Dialog } from 'vant';
	Vue.use(Picker);
	Vue.use(Uploader);
	Vue.use(Field);
	Vue.use(Button);
	Vue.use(Dialog);
	import {Icon,CellGroup, Popup,IndexBar, IndexAnchor,Toast,DatetimePicker  } from 'vant';
	Vue.use(IndexBar).use(IndexAnchor).use(Icon).use(CellGroup).use(Toast).use(Popup).use(DatetimePicker);
	Vue.use(Cell)
	export default {
		components: {
			vantHeader,
			
		},
		data() {
			return {
				questionText:"发送语音",
				StaffInfoData:[],
				IDCard:'',
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
		},
		created() {
			this.StaffInfoF()
		},
		methods: {
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
			onConfirm(value,index) {
			    this.value = value;
			    this.showPicker = false;
				this.quesType=index+Number(1);
				console.log("---quesType--",this.quesType)
			},
			sumtrienButton(){
				if(this.value==''){
					Toast("请选择语音类型")
				}
			}
		}
	}
</script>

<style scoped>
	.Buttond{
	    margin: 10px 16px;
	    height: 44px;
	    border-radius: 2px;
	    font-size: 16px;
	    text-align: center;
	    line-height: 44px;
	}
	.container_list li.list_li span:last-child {
	    display: block;
	    float: right;
	}
	.container_list li{
	    height: auto;
	    overflow: hidden;
	}
	.container_list{
	    margin-top: 10px;
	    height: auto;
	    overflow: hidden;
	    background: #fff;
	    -webkit-box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.16);
	    box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.16);
	}
	h5{
	    padding: 10px 16px 0;
	    color: #666666;
	    margin: 0;
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
	
	.container{
		padding-top: 46px;
	}
</style>
