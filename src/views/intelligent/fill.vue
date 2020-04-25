<template>
	<div id="examrecord">
		<vant-header :leftArrow="true" :titleType="1" :title="GetMenuTree_Data.NAME" :rightType="2">

		</vant-header>
		<div class="container">
			<ul class="container_list container_lists">
				<p class="van-hairline--bottom exam-title"><img src="../../assets/images/user_icon/icon_b@2x.png" alt="">工程详情</p>
				<li>
					<span>所在标段</span>
					<span>{{GetMenuTree_Data.BIDSECTION}}</span>
				</li>

				<li>
					<span>所在部门</span>
					<span>{{GetMenuTree_Data.WORKAREA}}</span>
				</li>
				<li>
					<span>工程类型</span>
					<span>{{GetMenuTree_Data.WORKPOINT}}</span>
				</li>
				<li>
					<span>桥梁名称</span>
					<span>{{GetMenuTree_Data.PNAME}}</span>
				</li>
				<li>
					<span>重要性</span>
					<span style="float: right;" v-if="GetMenuTree_Data.STATUS == 1 || GetMenuTree_Data.STATUS == 3|| GetMenuTree_Data.STATUS == 2">普通工程</span>
					<span style="float: right;" v-if="GetMenuTree_Data.STATUS == 4 || GetMenuTree_Data.STATUS == 5">超期工程</span>
				</li>
				<li>
					<span>工程部分</span>
					<span>{{GetMenuTree_Data.POSITION}}</span>
				</li>
				<li>
					<span>构件名称</span>
					<span>{{GetMenuTree_Data.NAME}}</span>
				</li>
			</ul>
			<h5>完成情况</h5>
			<van-popup v-model="Planshow" position="bottom">
				<van-datetime-picker v-model="currentDatePlanshow" type="date" :min-date="minDatePlanshow" @confirm="confirmFnPlanshow()" @cancel="cancelFn()" />
			</van-popup>
			
			<van-popup v-model="PlanshowS" position="bottom">
				<van-datetime-picker v-model="currentDatePlanshowS" type="date" :min-date="minDatePlanshowS" @confirm="confirmFnPlanshowS()" @cancel="cancelFn()" />
			</van-popup>
			<van-popup v-model="show" position="bottom">
				<van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" @confirm="confirmFn()" @cancel="cancelFn()" />
			</van-popup>
			
			<van-popup v-model="showS" position="bottom">
				<van-datetime-picker v-model="currentDateS" type="date" :min-date="minDateS" @confirm="confirmFnS()" @cancel="cancelFn()" />
			</van-popup>
			
			<ul style="margin-top: 10px;">
				<li style='border-bottom: 1px solid #EEEEEE;' @click="showTimeplan()"v-show='!start'>
					<van-cell is-link>
						<span style="color: #969799;">计划开始</span>
						<span style="float: right;">{{PlanshowtimeValue?PlanshowtimeValue:'请选择'}}</span>
					</van-cell>
				</li>
				<li style='border-bottom: 1px solid #EEEEEE;' @click="showTimeplanS()"v-show='!end'>
					<van-cell is-link>
						<span style="color: #969799;">计划结束</span>
						<span style="float: right;">{{PlanshowtimeValueS?PlanshowtimeValueS:'请选择'}}</span>
					</van-cell>
				</li>
				<li style='border-bottom: 1px solid #EEEEEE;' v-show='start' @click="ToastButton()">
					<van-cell is-link>
						<span style="color: #969799;">计划开始</span>
						<span style="float: right;">{{PlanshowtimeValue?PlanshowtimeValue:'请选择'}}</span>
					</van-cell>
				</li>
				<li style='border-bottom: 1px solid #EEEEEE;' v-show='end' @click="ToastButton()">
					<van-cell is-link>
						<span style="color: #969799;">计划结束</span>
						<span style="float: right;">{{PlanshowtimeValueS?PlanshowtimeValueS:'请选择'}}</span>
					</van-cell>
				</li>
			</ul>
			<ul>
				<li style='border-bottom: 1px solid #EEEEEE;' @click="showTimePop()" v-show='!start'>
					<van-cell is-link>
						<span style="color: #969799;">实际开始</span>
						<span style="float: right;" >{{timeValue?timeValue:'请选择'}}</span>
					</van-cell>
				</li>
				<li style='border-bottom: 1px solid #EEEEEE;' @click="showTimePopS()"v-show='!end'>
					<van-cell is-link>
						<span style="color: #969799;">实际结束</span>
						<span style="float: right;">{{timeValueS?timeValueS:'请选择'}}</span>
					</van-cell>
				</li>
				<li style='border-bottom: 1px solid #EEEEEE;' v-show='start' @click="ToastButton()">
					<van-cell is-link>
						<span style="color: #969799;">实际开始</span>
						<span style="float: right;" >{{timeValue?timeValue:'请选择'}}</span>
					</van-cell>
				</li>
				<li style='border-bottom: 1px solid #EEEEEE;' v-show='end' @click="ToastButton()">
					<van-cell is-link>
						<span style="color: #969799;">实际结束</span>
						<span style="float: right;">{{timeValueS?timeValueS:'请选择'}}</span>
					</van-cell>
				</li>
			</ul>
			<ul class="container_list container_lists" style="margin-top:0;">
				<li>
					<span>工程产值（元）</span>
					<span>{{GetMenuTree_Data.OUTVALUE?GetMenuTree_Data.OUTVALUE:'0'}}</span>
				</li>
				<li style='border-bottom: 1px solid #EEEEEE;'>
					<span>总里程（公里）</span>
					<span>{{GetMenuTree_Data.MILEAGE?GetMenuTree_Data.MILEAGE:'0'}}</span>
				</li>
				<li style='border-bottom: 1px solid #EEEEEE;'>
					<span>桩径（米）</span>
					<span>{{GetMenuTree_Data.PILEDIAMETER?GetMenuTree_Data.PILEDIAMETER:'0'}}</span>
				</li>
				<li style='border-bottom: 1px solid #EEEEEE;'>
					<span>桩长（米）</span>
					<span>{{GetMenuTree_Data.PILELONG?GetMenuTree_Data.PILELONG:'0'}}</span>
				</li>
			</ul>
            <div v-show="fillWirte">
				 <h5>延期原因。</h5>
				 <div class="container_list">
				 	<van-cell-group>
				 		<van-field v-model="message" rows="2" autosize type="textarea" maxlength="300" placeholder="请填写延期出现原因。"
				 		 show-word-limit />
				 	</van-cell-group>
				 </div>
			</div>
            <div v-show="fillWirte">
				<h5>解决方案</h5>
				<div class="container_list">
					<van-cell-group>
						<van-field v-model="messagey" rows="2" autosize type="textarea" maxlength="300" placeholder="请填写延期解决方案。"
						 show-word-limit />
					</van-cell-group>
				</div>
			</div>			
			<ul>
				<li class='Buttond' @click='sumtrienButton()'>
					<van-button color="#7099D0" size="normal" style='width: 100%;'>提交</van-button>
				</li>
			</ul>


		</div>

	</div>
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import * as ajax from '@/utils/api'
	import Vue from 'vue';
	import {
		Cell
	} from 'vant';
	import {
		Button
	} from 'vant';
	import {
		Field
	} from 'vant';
import { Dialog } from 'vant';
	Vue.use(Field);
	Vue.use(Button);
	import {
		Icon,
		DatetimePicker,
		CellGroup,
		Popup,
		IndexBar,
		IndexAnchor,
		Toast
	} from 'vant';
	Vue.use(IndexBar).use(DatetimePicker).use(IndexAnchor).use(Icon).use(CellGroup).use(Popup);
	Vue.use(Cell).use(Toast)
	export default {
		components: {
			vantHeader,

		},
		data() {
			return {
				
				examRecord: [],
				examRecordTime: [],
				StaffInfoData: [],
				IDCard: '',
				message: '',
				messagey:'',
				
				
				minDatePlanshow: new Date(),
				currentDatePlanshow: new Date(),
				PlanshowtimeValue: '',
				Planshow: false,
				
				minDatePlanshowS: new Date(),
				currentDatePlanshowS: new Date(),
				PlanshowtimeValueS: '',
				PlanshowS: false,
				
				minDate: new Date(),
				currentDate: new Date(),
				timeValue: '',
				show: false,
				
				minDateS: new Date(),
				currentDateS: new Date(),
				timeValueS: '',
				showS: false,
				GetMenuTree_Data:{},
				chang_yi_UserData:{},
				getHour_s: "",
				getMinutes_s: "",
				day_s: "",
				month_s: "",
				fillWirte:false,
				start:false,
				end:false,
				fillName:'',
			}
		},
		mounted() {
		},
		filters: {
			getStatus(id) {
				var str = "";
				
				switch(id) {
					case 1:
						str = "未开工";
						break;
					case 2:
						str = "正在进行";
						break;
					case 3:
						str = "已完成";
						
						break;
					case 4:
						str = "延期已完成";
						break;
					case 5:
						str = "延期未完成";
						break;
				}
				return str;
			}
		},
		created() {
			
			Object.assign(this.GetMenuTree_Data, JSON.parse(sessionStorage.getItem("GetMenuTree_Data")));
			Object.assign(this.chang_yi_UserData, JSON.parse(sessionStorage.getItem("chang_yi_UserData")));
			
			if(this.GetMenuTree_Data.PLANBEGINDATE !=null){
				this.PlanshowtimeValue = this.GetMenuTree_Data.PLANBEGINDATE.replace("T00:00:00","")
			}
			if(this.GetMenuTree_Data.PLANENDDATE!=null){
				this.PlanshowtimeValueS = this.GetMenuTree_Data.PLANENDDATE.replace("T00:00:00","")
			}
			if(this.GetMenuTree_Data.REALBEGINDATE!=null){
				this.timeValue = this.GetMenuTree_Data.REALBEGINDATE.replace("T00:00:00","")
			}
			if(this.GetMenuTree_Data.REALENDDATE!=null){
				this.timeValueS = this.GetMenuTree_Data.REALENDDATE.replace("T00:00:00","")
			}
			if(this.$route.query.TimeDays>30){
				this.start=true;
				this.end=true;
			}
			if(this.GetMenuTree_Data.STATUS == 4 || this.GetMenuTree_Data.STATUS == 5){
				this.fillWirte=true;
			}
			this.timeFormat(new Date());
		},
		methods: {
			ToastButton(){
				Toast('已超出30天期限，现无法修改')
			},
			showTimeplan() {
				this.Planshow = true;
				this.currentDatePlanshow = new Date(this.PlanshowtimeValue.replace(/-/g, "/"));
			},
			confirmFnPlanshow() { // 确定按钮
				this.PlanshowtimeValue = this.timeFormat(this.currentDatePlanshow);
				
				this.Planshow = false;
			},
			confirmFnPlanshowS() { // 确定按钮
				this.PlanshowtimeValueS = this.timeFormat(this.currentDatePlanshowS);
				
				this.PlanshowS = false;
			},
			showTimeplanS() {
				this.PlanshowS = true;
				this.currentDatePlanshowS = new Date(this.PlanshowtimeValueS.replace(/-/g, "/"));
			},
			confirmFn() { // 确定按钮
				this.timeValue = this.timeFormat(this.currentDate);
				
			},
			showTimePop() {
				this.show = true;
				this.currentDate = new Date(this.timeValue.replace(/-/g, "/"));
			},

			cancelFn() {
				this.show = false;
				this.Planshow = false;
				
				this.PlanshowS = false;
				this.showS = false;
			},
			// 实际结束事件
			confirmFnS() { // 确定按钮
				this.timeValueS = this.timeFormat(this.currentDateS);
				
				this.showS = false;
				let time=new Date();
				let usedTime = this.time - this.currentDateS; // 相差的毫秒数
				let days = Math.floor(usedTime / (24 * 3600 * 1000)); // 计算出天数
				
				if(days>30){
					this.fillWirte= true;
				}else{
					this.fillWirte= false;
				}
			},

			showTimePopS() {
				this.showS = true;
				this.currentDateS = new Date(this.timeValueS.replace(/-/g, "/"));
			},
			timeFormat(time) { // 时间格式化 2019-09-08
				let year = time.getFullYear();
				let month = time.getMonth() + 1;
				let day = time.getDate();
				let getHour = time.getHours();
			
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
			
				return year + '-' + this.month_s + '-' + this.day_s;
				
			
			},
			ProgressAllowedData(){
				ajax.postParams('/API/WebAPIDataAudit/ProgressAllowed',{
					PLANBEGINDATE:(this.PlanshowtimeValue.replace(/-/g, "/") || this.GetMenuTree_Data.PLANBEGINDATE.replace("T00:00:00","")),
					PLANENDDATE:(this.PlanshowtimeValueS.replace(/-/g, "/")|| this.GetMenuTree_Data.PLANENDDATE.replace("T00:00:00","")),
					REALBEGINDATE:(this.timeValue.replace(/-/g, "/") || this.GetMenuTree_Data.REALBEGINDATE.replace("T00:00:00","")),
					REALENDDATE:(this.timeValueS.replace(/-/g, "/")|| this.GetMenuTree_Data.REALENDDATE.replace("T00:00:00","")),
					ID:this.GetMenuTree_Data.ID,
					INFORMANT:this.chang_yi_UserData.EXAMNAME,
				}).then(res => {
					if(res.data.result == true) {
						this.GetMenuTree_Data.PLANBEGINDATE = this.PlanshowtimeValue
						this.GetMenuTree_Data.PLANENDDATE = this.PlanshowtimeValueS 
						this.GetMenuTree_Data.REALBEGINDATE = this.timeValue
						this.GetMenuTree_Data.REALENDDATE = this.timeValueS
						this.GetMenuTree_Data.FULLDATE = this.timeValueS
					
						this.$router.push({
							path:'/fillX',
							query:{
								PLANBEGINDATE:this.PlanshowtimeValue,
								PLANENDDATE:this.PlanshowtimeValueS,
								REALBEGINDATE:this.timeValue,
								REALENDDATE:this.timeValueS
							}
						})
					}
				})
			},
			
			sumtrienButton() {
				if(this.fillWirte == false){
					if(this.PlanshowtimeValue == ''){
						Toast("请选择计划开始日期")
						return
					}
					if(this.PlanshowtimeValueS == ''){
						Toast("请选择计划结束日期")
						return
					}
					if(this.timeValue == ''){
						Toast("请选择实际开始日期")
					}
					if(this.timeValueS == ''){
						Toast("请选择实际结束日期")
						return
					}
					if(this.PlanshowtimeValue != '' && this.PlanshowtimeValueS != '' && this.timeValue != '' && this.timeValueS != ''){
						
						this.ProgressAllowedData()
						
						return
					}
					return
					
				}else{
					if(this.PlanshowtimeValue == ''){
						Toast("请选择计划开始日期")
					}else if(this.PlanshowtimeValueS == ''){
						Toast("请选择计划结束日期")
					}else if(this.timeValue == ''){
						Toast("请选择实际开始日期")
					}else if(this.timeValueS == ''){
						Toast("请选择实际结束日期")
					}else{
						this.ProgressAllowedData()
					}
				}
			},

		}
	}
</script>

<style scoped>
	input {
		width: 90px;
		height: 28px;
		text-align: right;
		border: none;
	}

	.Buttond {
		margin: 10px 16px;
		height: 44px;
		border-radius: 2px;
		font-size: 16px;
		text-align: center;
		line-height: 44px;
	}

	.container_lists li div {
		width: 23.5%;
		height: auto;
		overflow: hidden;
		float: left;
		margin-right: 2%;
	}

	h5 {
		padding: 10px 16px 0;
		color: #666666;
		margin: 0;
	}

	/deep/ .Buttonds.van-button__text {
		color: #666666;
	}

	.container_lists li div:last-child {
		margin-right: 0 !important;
	}

	.container_lists li div img {
		width: 70px;
		height: 70px;
		overflow: hidden;
		float: left;
		display: block;
		background: #ddd;
	}

	.container_lists li {
		padding: 10px 16px;
		color: #969799;
		font-size: 14px;
		line-height: 24px;
	}

	.container_lists li span:last-child {
		width: 65%;
		color: #323233;
		text-align: right;
		display: inline-block;
		float: right;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
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
		color: #00A0E9;
		font-size: 14px;

	}

	/deep/ .infor_header .van-button {
		width: 48%;
	}

	.infor_header .van-button:last-child {
		float: right;
	}

	.infor_header img {
		/* width:85px; */
		height: 85px;
		border-radius: 1px;
		border: 1px solid rgba(238, 238, 238, 1);
		display: block;
		margin: 0 auto;
	}

	.infor_header {
		background: #fff;
		padding: 15px;
		box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.16);
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
