<template>
	<div id="examrecord">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2">
			
		</vant-header>
		<div class="container">
			<h5>问题情况</h5>
			<ul class="container_list">
				<li class="list_li">
					<van-cell is-link @click="showPicker = true">
					   <span>问题类型</span>
					   <span>{{value?value:"请选择"}}</span>
					</van-cell>
					<!-- <van-picker :columns="columns" @change="onChange" /> -->
					<van-popup v-model="showPicker" position="bottom">
					  <van-picker
					    show-toolbar
					    :columns="columns"
					    @cancel="showPicker = false"
					    @confirm="onConfirm"/>
					</van-popup>
				</li>
				<li class="list_li">
					<van-cell is-link @click="showPickerS = true">
					   <span>紧急类型</span>
					   <span >{{valueS?valueS:"请选择"}}</span>
					</van-cell>
					<van-popup v-model="showPickerS" position="bottom">
					  <van-picker
					    show-toolbar
					    :columns="columnsS"
					    @cancel="showPickerS = false"
					    @confirm="onConfirmS"/>
					</van-popup>
				</li>
				<li class="list_li">
					<van-cell is-link @click="showTimePop">
					   	<span>限定时间</span>
					   	<span>{{timeValue?timeValue:"请选择"}}</span>
					</van-cell>
					<van-popup v-model="show" position="bottom">
						<van-datetime-picker class="order-time-pop" v-model="currentDate" type="datetime" :min-date="minDate" :max-date="maxDate" @confirm="confirmFn()" @cancel="cancelFn()" />
					</van-popup>
				</li>
			</ul>
			<h5>问题地点</h5>
			<ul class="container_list">
				<li class='more' style="padding: 10px 16px;">
					<div style="border:1px dashed #E6EDF7;">
						<van-cell style='color: #304F83;background:#F7FAFF;'>
							<span style="margin-top: 2px; display: block;float: left;"><van-icon name="location-o" color='#304F83'/></span>北京市昌平区霍营乡回龙观东大街龙腾苑东1区
						</van-cell>
						<van-cell style='font-size: 12px;background:#F7FAFF;color:rgba(152,160,174,1);border-bottom:none;'>
							经度：40.14567 纬度：116.24567
						</van-cell>
					</div>
				</li>
				<li class='Buttond'>
					<van-button color="rgba(89,95,115,1) " icon="location-o" size="normal" style='width: 100%;'>获取当前位置</van-button>
				</li>
				<li class='Buttond'>
					<van-button color="#DDDDDD " size="normal" style='float: left;width:48%'><span style="color: #666;">清空地址</span></van-button>
					<van-button color="rgba(89,95,115,1) " size="normal"style='float: right;width:48%'>重新定位</van-button>
				</li>
			</ul>
			
			<h5>问题简述</h5>
			<div class="container_list">
				<van-cell-group>
				  <van-field
					v-model="message"
					rows="2"
					autosize
					type="textarea"
					maxlength="300"
					placeholder="请检单描述您的问题,方便及时跟进并解决。"
					show-word-limit
				  />
				</van-cell-group>
			</div>
			<h5>问题详情</h5>
			<div class="container_list">
				<van-cell-group>
				  <van-field
					v-model="message"
					rows="2"
					autosize
					type="textarea"
					maxlength="300"
					placeholder="请检单描述您的问题,方便及时跟进并解决。"
					show-word-limit
				  />
				</van-cell-group>
			</div>
			<ul class="container_list container_listp">
				<p class="van-hairline--bottom exam-title"><img src="../../assets/images/safeQuality/icon_t@2x (5).png" alt="">上传解决后的现场照片(最多4张)</p>
				<li class="overflow">
					<van-uploader :before-read="beforeRead"  v-model="fileList"multiple :max-count="4" />
				
				</li>
			</ul>
			<h5>现成负责人</h5>
			<ul class="container_list">
				<li class='more' style="padding: 10px 16px;">
					<div style="border:1px dashed #E6EDF7;">
						<van-cell style='color: #304F83;background:#F7FAFF;'>
							<span style="margin-top: 2px; display: block;float: left;"><van-icon name="manager" color='#304F83'/></span>孙悟空（CYCZQ-5标-1负责人）
						</van-cell>
					</div>
				</li>
				<li class='Buttond'>
					<van-button color="rgba(89,95,115,1) " icon="friends-o" size="normal" style='width: 100%;'>点击选择人员</van-button>
				</li>
				<li class='Buttond'>
					<van-button color="rgba(89,95,115,1) " icon="friends-o" size="normal" style='width: 100%;'>重新选择人员</van-button>
				</li>
			</ul>
			<ul>
				<li class='Buttond'>
					<van-button color="#DDDDDD " size="normal" style='float: left;width:48%'><span style="color: #666;">暂存</span></van-button>
					<van-button color="#7099D0 " size="normal"style='float: right;width:48%' @click='sumtrienButton()'>提交</van-button>
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
	import { Uploader } from 'vant';
	import { Picker } from 'vant';
	
	Vue.use(Picker);
	Vue.use(Uploader);
	Vue.use(Field);
	Vue.use(Button);
	import {Icon,CellGroup, Popup,IndexBar, IndexAnchor,Toast,DatetimePicker  } from 'vant';
	Vue.use(IndexBar).use(IndexAnchor).use(Icon).use(CellGroup).use(Toast).use(Popup).use(DatetimePicker );
	Vue.use(Cell)
	export default {
		components: {
			vantHeader,
			
		},
		data() {
			return {
				questionText:"提交问题",
				examRecord:[],
				examRecordTime:[],
				StaffInfoData:[],
				 fileList: [],
				IDCard:'',
				message:'',
				// 问题类型
			    columns: ['安全问题', '质量问题','进度问题'],
				value: '',
				showPicker: false,
				// 紧急类型
				columnsS: ['特别紧急', '紧急',"一般紧急","不紧急"],
				valueS: '',
				showPickerS: false,
				// 限定时间
				minHour: 10,
				maxHour: 20,
				minDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), new Date().getMinutes()),
				maxDate: new Date(new Date().getFullYear()+5, new Date().getMonth(), new Date().getDate(),new Date().getHours(), new Date().getMinutes()),
				currentDate: new Date(),
				// currentDateX:"",
				show: false, // 用来显示弹出层
				timeValue: '',
				// 小于10 大于10 时间
				getHour_s: "",
				getMinutes_s: "",
				day_s: "",
				month_s: "",
			}
		},
		mounted() {
			this.examrecord()
		},
		created() {
			this.StaffInfoF()
		},
		methods: {
			confirmFn() { // 确定按钮
				this.timeValue = this.timeFormat(this.currentDate);
				this.show = false;
			},
			cancelFn() {
				this.show = false;
			},
			showTimePop() {
				this.show = true;
				this.currentDate = new Date(this.timeValue.replace(/-/g, "/"));
			},
			timeFormat(time) { // 时间格式化 2019-09-08
				let year = time.getFullYear();
				let month = time.getMonth() + 1;
				let day = time.getDate();
				let getHour = time.getHours();
			
				let getMinutes = time.getMinutes();
			
				let Nowdate = new Date().getHours();
			
				// 时
				if(getHour < 10) {
					this.getHour_s = "0" + getHour
				}
				if(getHour > 10 || getHour === 10) {
					this.getHour_s = getHour
				}
				// 分
				if(getMinutes < 10) {
					this.getMinutes_s = "0" + getMinutes
				}
				if(getMinutes > 10 || getMinutes === 10) {
					this.getMinutes_s = getMinutes
				}
				// 月
				if(month < 10) {
					this.month_s = "0" + month
				}
				if(month > 10) {
					this.month_s = month
				}
				if(month === 10) {
					this.month_s = month
				}
				// 日
				if(day < 10) {
					this.day_s = "0" + day
				}
				if(day > 10) {
					this.day_s = day
				}
				if(day === 10) {
					this.day_s = day
				}
			
				return year + '-' + this.month_s + '-' + this.day_s + " " + this.getHour_s + ":" + this.getMinutes_s;
				// this.currentDateX=year + '-' + this.month_s + '-' + this.day_s + " " + this.getHour_s + ":" + this.getMinutes_s
			
			},
			onConfirm(value) {
			    this.value = value;
			    this.showPicker = false;
			},
			onConfirmS(value) {
			    this.valueS = value;
			    this.showPickerS = false;
			},
			sumtrienButton() {
				this.$router.push({path:'/problemX'})
				// this.titShow = false;
			},
			// 返回布尔值
			beforeRead(file) {
			    if (file.type !== 'image/jpeg') {
					Toast('请上传 jpg 格式图片');
					return false;
				}
			    return true;
			},
			 // 返回 Promise
			asyncBeforeRead(file) {
			  return new Promise((resolve, reject) => {
				if (file.type !== 'image/jpeg') {
				  Toast('请上传 jpg 格式图片');
				  reject();
				} else {
				  resolve();
				}
			  });
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
	.container_listp li{
		padding: 10px 16px;
	}
	/deep/
	.van-uploader__preview-image {
	    display: block;
	    width: 79px;
	    height: 79px;
	}
	/deep/
	.van-uploader__preview:last-child{
	 margin-right: 0 !important;
	}.van-image-preview__index{
		top:56px;
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
	.container_list li.list_li span:last-child{
		display: block;
		float: right;
	}
	.container_list li.more .van-icon{
		margin-top: 0;
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
