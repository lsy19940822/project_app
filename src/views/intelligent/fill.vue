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
			<h5>完成情况</h5>
			<ul class="container_list container_lists">
				<!-- <p class="van-hairline--bottom exam-title"><img src="../../assets/images/user_icon/icon_time@2x.png" alt="">完成情况</p> -->
				<li>
					<span>计划开始</span>
					<span>2019-09-04</span>
				</li>
				<li style='border-bottom: 1px solid #EEEEEE;'>
					<span>计划结束</span>
					<span>2019-09-20</span>
				</li>
			</ul>

			<!-- 实际开始 -->
			<van-popup v-model="show" position="bottom">
				<van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" @confirm="confirmFn()" @cancel="cancelFn()" />
			</van-popup>

			<!-- 实际结束 -->
			<van-popup v-model="showS" position="bottom">
				<van-datetime-picker v-model="currentDateS" type="date" :min-date="minDateS" @confirm="confirmFnS()" @cancel="cancelFn()" />
			</van-popup>

			<ul>
				<li style='border-bottom: 1px solid #EEEEEE;' @click="showTimePop()">
					<van-cell is-link>
						<span style="color: #969799;">实际开始</span>
						<span style="float: right;">{{timeValue?timeValue:'请选择'}}</span>
					</van-cell>
				</li>
				<li style='border-bottom: 1px solid #EEEEEE;' @click="showTimePopS()">
					<van-cell is-link>
						<span style="color: #969799;">实际结束</span>
						<span style="float: right;">{{timeValueS?timeValueS:'请选择'}}</span>
					</van-cell>
				</li>
			</ul>
			<ul class="container_list container_lists" style="margin-top:0;">
				<li>
					<span>工程产值（元）</span>
					<span><input type="tel" name="" placeholder="请输入"></span>
				</li>
				<li style='border-bottom: 1px solid #EEEEEE;'>
					<span>总里程（公里）</span>
					<span><input type="tel" name="" placeholder="请输入"></span>
				</li>
				<li style='border-bottom: 1px solid #EEEEEE;'>
					<span>桩径（米）</span>
					<span><input type="tel" name=""  placeholder="请输入"></span>
				</li>
				<li style='border-bottom: 1px solid #EEEEEE;'>
					<span>桩长（米）</span>
					<span><input type="tel" name="" placeholder="请输入"></span>
				</li>
			</ul>

			<h5>延期原因。</h5>
			<div class="container_list">
				<van-cell-group>
					<van-field v-model="message" rows="2" autosize type="textarea" maxlength="300" placeholder="请填写延期出现原因。"
					 show-word-limit />
				</van-cell-group>
			</div>


			<h5>解决方案</h5>
			<div class="container_list">
				<van-cell-group>
					<van-field v-model="messagey" rows="2" autosize type="textarea" maxlength="300" placeholder="请填写延期解决方案。"
					 show-word-limit />
				</van-cell-group>
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

	Vue.use(Field);
	Vue.use(Button);
	import {
		Icon,
		DatetimePicker,
		CellGroup,
		Popup,
		IndexBar,
		IndexAnchor
	} from 'vant';
	Vue.use(IndexBar).use(DatetimePicker).use(IndexAnchor).use(Icon).use(CellGroup).use(Popup);
	Vue.use(Cell)
	export default {
		components: {
			vantHeader,

		},
		data() {
			return {
				questionText: "527# 梁",
				examRecord: [],
				examRecordTime: [],
				StaffInfoData: [],
				IDCard: '',
				message: '',
				messagey:'',
				//实际开始时间
				minDate: new Date(),
				currentDate: new Date(),
				timeValue: '',
				show: false,
				//实际结束时间
				minDateS: new Date(),
				currentDateS: new Date(),
				timeValueS: '',
				showS: false,
			}
		},
		mounted() {
			this.examrecord()
		},
		created() {
			this.StaffInfoF();
			this.timeFormat(new Date());
		},
		methods: {
			sumtrienButton() {
				this.$router.push({path:'/fillX'})
				// this.titShow = false;
			},
			// 实际开始事件
			confirmFn() { // 确定按钮
				this.timeValue = this.timeFormat(this.currentDate);
				console.log('timeValue', this.timeValue)
				this.show = false;
			},
			showTimePop() {
				this.show = true;
				this.currentDate = new Date(this.timeValue.replace(/-/g, "/"));
			},

			cancelFn() {
				this.show = false;
				this.showS = false;
			},
			// 实际结束事件
			confirmFnS() { // 确定按钮
				this.timeValueS = this.timeFormat(this.currentDateS);
				console.log('timeValueS', this.timeValueS)
				this.showS = false;
			},

			showTimePopS() {
				this.showS = true;
				this.currentDateS = new Date(this.timeValueS.replace(/-/g, "/"));
			},
			timeFormat(time) { // 时间格式化 2019-09-08
				let year = time.getFullYear();
				let month = time.getMonth() + 1;
				let day = time.getDate();
				// 月
				if (month < 10) {
					this.month_s = "0" + month
				}
				if (month > 10) {
					this.month_s = month
				}
				if (month === 10) {
					this.month_s = month
				}
				// 日
				if (day < 10) {
					this.day_s = "0" + day
				}
				if (day > 10) {
					this.day_s = day
				}
				if (day === 10) {
					this.day_s = day
				}

				return year + '-' + this.month_s + '-' + this.day_s;
				// this.currentDateX=year + '-' + this.month_s + '-' + this.day_s + " " + this.getHour_s + ":" + this.getMinutes_s

			},
			StaffInfoF() {
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
			examrecord() {
				let that = this;
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
	input {
		width: 90px;
		height: 28px;
		/* padding-right: 5px; */
		/* margin-right: 10px; */
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
		/* height: auto; */
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
