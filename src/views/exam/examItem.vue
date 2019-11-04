<template>
	<div class="container">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText+`测试`" :rightType="2">

			<div slot='right_slot'>
				<p class="header-right">{{current+1}}/{{total}}</p>
			</div>
		</vant-header>
		<van-count-down style="display: none;" ref="countDown" millisecond :time="time" format="HH:mm:ss" @finish="('countDown')" />
		<!-- <van-count-down millisecond @finish="finish('time')"  :ref="time" :time="time" format="mm:ss"/> -->
		<div class="question-container" v-if="questionCurrent.TMLX  == '单选'">
			<p class="van-hairline--bottom exam-title">单选题</p>
			<div>
				<p :id="questionCurrent.ID">{{current+1}}.{{questionCurrent.TIGAN }}</p>
				<ul>
					<li v-for="(item,index) in answerList" @click="choose(index,1)" :class="{active:isSingleActive == index}">
						<span class="chooseIndex">{{index+1 | chooseIndex}}</span><span>{{item}}</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="question-container" v-if="questionCurrent.TMLX  == '多选'">
			<p class="van-hairline--bottom exam-title">多选题</p>
			<div>
				<p :id="questionCurrent.ID">{{current+1}}.{{questionCurrent.TIGAN }}</p>
				<ul>
					<li v-for="(item,index) in answerList" @click="choose(index,2)" :class="{active:isMultipleActive[index] == true}">
						<span class="chooseIndex">{{index+1 | chooseIndex}}</span><span>{{item}}</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="question-container" v-if="questionCurrent.TMLX  == '判断'">
			<p class="van-hairline--bottom exam-title">判断题</p>
			<div>
				<p :id="questionCurrent.ID">{{current+1}}.{{questionCurrent.TIGAN }}</p>
				<ul>
					<li v-for="(item,index) in answerList" :id="item.ID" @click="choose(index,3)">
						<span class="chooseIndex">{{index+1 | chooseIndex}}</span>{{item}}
					</li>
				</ul>
			</div>
		</div>
		<!-- 答题卡遮罩 -->
		<van-popup v-model="showTips" class="login-tips">

			<div class="answer-container">
				<h4>试卷答题卡</h4>
			</div>
			<ul class="answer-list">
				<li v-for="(item,index) in questionList.length">
					<div class="answer-button" :class="alreadyCheck[index]" @click="gotoQuestion(index)">{{index+1}}</div>
				</li>
				<div class="answer-buttons answer-error" @click="cancel()">取消</div>
				<div class="answer-buttons answer-success" @click="submitExam()">交卷</div>
			</ul>

		</van-popup>
		<!-- 答题卡结束 -->
		<div class="question-btn">
			<van-button class="primary" :class="{none: preNone}" @click="pre()">上一题</van-button>
			<van-button class="primary" :class="{none: nextNone}" @click="next()">下一题</van-button>
		</div>
		<exam-footer @list="showButton" @examItem="submitExam()" @showtip="shwotipChange" :showtip='showTips' :allAnswers="allAnswers" :alreadyCheck="alreadyCheck"></exam-footer>
	</div>
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import examFooter from '@/components/onlineExamFooter.vue'
	import { formatDate, formatTime } from '@/utils/common.js'
	import locstorage from '@/utils/storage.js'
	import * as ajax from '@/utils/api'
	import Vue from 'vue';
	import { Toast, Button, Checkbox, CheckboxGroup, RadioGroup, Radio, Dialog, Popup, CountDown } from 'vant';
	Vue.use(Toast).use(Button).use(Checkbox).use(CheckboxGroup).use(RadioGroup).use(Radio).use(Popup)
		.use(CountDown);
	export default {
		components: {
			vantHeader,
			examFooter
		},
		data() {
			return {
				questionText: '',
				questionList: [],
				questionCurrent: {},
				answerList: [],
				current: 0,
				total: null,
				nextNone: false,
				preNone: true,
				//mistakesAnswers: [],
				rightAnswers: [],
				allAnswers: [],
				isSingleActive: -1,
				isMultipleActive: [false, false, false, false],
				multipleChose: '',
				show: true,
				selectTotal: 0,
				IDCard: this.$route.query.IDCard,
				Score: 0,
				ExamName: '',
				Date: '',
				showTips: false,
				ExamTimeStart: '',
				rightTotal: 0,
				time: 60 * 60 * 60 * 12.5, //考试倒计时
				examTime: "", //考试所用的时间
				answerAlrealTotal: 0, // 作答题数
				alreadyCheck: [],
				classArr: [],
			}
		},
		created() {
			this.ExamTimeStart = formatTime(new Date)
			this.submitExam();

		},
		mounted() {
			this.getExamList()
		},
		watch: {
			'current': function(newValue, oldValue) {
				this.questionCurrent = this.questionList[this.current]
				this.answerList = []
				for(let k in this.questionCurrent) {
					if(k == 'XA' || k == 'XB' || k == 'XC' || k == 'XD') {
						if(this.questionCurrent[k]) {

							this.answerList.push(this.questionCurrent[k])
						}
					}
				}
			}
		},
		methods: {
			shwotipChange(val, val2) {
				console.log(this.showTips, "22", val2)
				this.showTips = val;
			},
			showButton(data) {
				// 
				console.log(data);
				this.showTips = data;
			},
			cancel() {
				this.showTips = false;
			},
			gotoQuestion(index) {
				this.showTips = false;
				this.current = Number(index);
			},
			getExamList() {
				ajax.get('GetPaper?IDcard=' + this.$route.query.IDCard).then(res => {
					if(res.data.result) {
						this.questionList = res.data.data
						this.total = res.data.data.length
						this.questionCurrent = this.questionList[this.current]
						this.questionText = this.questionCurrent.GZ
						for(let k in this.questionCurrent) {

							if(k == 'XA' || k == 'XB' || k == 'XC' || k == 'XD') {
								if(this.questionCurrent[k]) {
									this.answerList.push(this.questionCurrent[k])
									console.log("questionCurrent", this.questionCurrent[k], "answerList", this.answerList)
								}
							}
						}
						this.rightAnswerHandle();
					}
				})

			},
			pre() {
				this.isSingleActive = -1;
				this.isMultipleActive = [false, false, false, false]
				if(this.current > 0) {
					this.current--
					this.addClassHandle();
				} else {
					this.preNone = true
					Toast('这是第一题！');
					
				}
			},
			next() {
				var _this = this;
				this.isSingleActive = -1;
				this.isMultipleActive = [false, false, false, false]
				if(this.current < this.total - 1) {
					this.current++
                    this.addClassHandle();
				} else {
					this.nextNone = false
					//					Toast('已经是最后一题了！');
					_this.submitExam();
					

				}
			},
			rightAnswerHandle() {
				for(let item in this.questionList) { //存储正确答案
					console.log("this.rightAnswers:", this.questionList[item].ZQDA)
					this.rightAnswers.push(this.questionList[item].ZQDA)
				}
			},
			choose(index, flag) {

				var _this = this;
				if(flag === 1) { //flag 1:单选  2：多选 3：判断
					this.isSingleActive = index;

					this.allAnswers[this.current] = _this.answer(index)
					console.log("序号", this.current + 1, "本题单选", "我选择的答案是：", this.allAnswers[this.current], "本题的答案：", this.questionList[this.current].ZQDA)

				} else if(flag === 2) {
					var multipleChoseData = [],
						multipleChose = '';
					this.$set(this.isMultipleActive, index, !this.isMultipleActive[index]);
					this.isMultipleActive.filter(function(item, index, arr) {
						if(item == true) {
							multipleChose += _this.answer(index);
						}
						return multipleChose
					})
					this.allAnswers[this.current] = multipleChose;
					console.log("序号", this.current + 1, "本题多选", "我选择的答案是：", this.allAnswers[this.current], "本题的答案：", this.questionList[this.current].ZQDA)
				}

				this.selectTotal = 0;
				this.allAnswers.filter(function(item, index, arr) {

					if(item != undefined && item != '') {
						_this.selectTotal += 1;
					}
				})
			},
			// addClassHandle() {
			// 	this.classArr = [];
			// 	this.questionType = this.questionList[this.current].TMLX;
			// 	if(this.questionType === '单选') {
			// 		console.log("addClassHandle",this.questionList[this.current].ZQDA ,this.allAnswers[this.current])
			// 		let index = this.answer(this.questionList[this.current].ZQDA);
			// 		this.classArr[index] = 'bgRightS'
			// 		if(this.questionList[this.current].ZQDA === this.allAnswers[this.current]) {
			// 			this.classArr[index] = 'bgRightS'
			// 		}
			
			// 	} else if(this.questionType === '多选') {
					
					
			// 		let answerRightCrrent = this.questionList[this.current].ZQDA.split('');
				
			// 		answerRightCrrent.filter(function(item, index, arr) {
			// 			console.log(item, index)
			// 			this.classArr[index] = 'bgRightS'
			// 		}, this);
					
					
			// 		if(this.questionList[this.current].ZQDA === this.allAnswers[this.current]) {
			// 			var answerRightCrrent = this.allAnswers[this.current].split('');
			// 			answerRightCrrent.filter(function(item, index, arr) {
			// 				this.classArr[this.answer(item)] = 'bgRightS'
			// 			}, this);
			// 		}
					
			// 	}
			
			// },
			answer(n) {
				var questAnswer;
				switch(n) {
					case 0:
						questAnswer = 'A';
						break;
					case 1:
						questAnswer = 'B';
						break;
					case 2:
						questAnswer = 'C';
						break;
					case 3:
						questAnswer = 'D';
						break;

				}
				return questAnswer;
			},
			submitExam() {
				var _this = this;
				_this.selectTotal = 0;
				this.allAnswers.filter(function(item, index, arr) {

					if(item != undefined && item != '') {
						_this.selectTotal += 1;
					}
				})
				for(var i = 0; i < this.rightAnswers.length; i++) {
					if(this.rightAnswers[i] === this.allAnswers[i]) {
						this.Score += 4;
						this.rightTotal += 1;
					}
				}
				if(this.questionList.length != 0) {
					this.ExamName = this.questionList[0].BIDSECTION + this.questionList[0].GZ + formatDate(new Date(), '');

				} else {
					return;
				}

				var timestamp = this.$moment(new Date()).format("YYYY/MM/DD");
				//				 console.log("timestamp",timestamp,"xffff")
				var date1 = new Date(timestamp + ' 00:45:00'); //开始时间
				var date2 = new Date(timestamp + ' ' + this.$refs.countDown.$el.innerHTML);
				var date3 = date1.getTime() - date2.getTime(); //时间差的毫秒数
				console.log("timestamp", timestamp + ' ' + this.$refs.countDown.$el.innerHTML, "data1:", date1, "data2:", new Date(timestamp + ' ' + this.$refs.countDown.$el.innerHTML), "data3:", date3)

				//计算出相差天数
				var days = Math.floor(date3 / (24 * 3600 * 1000))
				//计算出小时数
				var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
				var hours = Math.floor(leave1 / (3600 * 1000))
				//计算相差分钟数
				var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
				var minutes = Math.floor(leave2 / (60 * 1000))
				//计算相差秒数
				var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
				var seconds = Math.round(leave3 / 1000)
				hours = hours == 0 ? '00' : (hours < 9 ? '0' + hours : hours)
				minutes = minutes == 0 ? '00' : (minutes < 9 ? '0' + minutes : minutes)
				seconds = seconds == 0 ? '00' : (seconds < 9 ? '0' + seconds : seconds)
				this.examTime = hours + ':' + minutes + ':' + seconds;
				console.log(this.examTime)
				localStorage.setItem('mitakeQuesitionTotal', (this.total - ((this.total - this.selectTotal) + this.rightTotal))) //答错的题
				this.allAnswers.filter(function(item, index, arr) {
					if(item) {
						_this.answerAlrealTotal += 1;
					}
					return _this.answerAlrealTotal
				})
				localStorage.setItem('mitakeQuesitionTotal', (this.answerAlrealTotal - this.rightTotal)) //错题数（不包含未答题数）
				localStorage.setItem('mitakeQuesitionTotal1', (this.total - this.answerAlrealTota)) //未答题数
				localStorage.setItem('allAnswers', this.allAnswers); //作答的答案
				console.log(
					"总题数：", this.total,
					"答对的题数：", this.rightTotal,
					"未答的题：", (this.total - this.selectTotal),
					"答错的题：", (this.total - ((this.total - this.selectTotal) + this.rightTotal)),
					"作答的答案", this.allAnswers
				)

				locstorage.set('total', this.total); //总题
				locstorage.set('allAnswers', this.allAnswers); //作答的答案
				locstorage.set('questionList', this.questionList); //返回题信息

				Dialog.confirm({
					title: '交卷提醒',
					message: '您的试卷还有' + (this.total - this.selectTotal) + '道题未做答，是否依然提交？'
				}).then(() => {

					let year = new Date().getFullYear();
					let month = new Date().getMonth() + 1;
					let day = new Date().getDate();
					let getHour = new Date().getHours();
					let getmin = new Date().getMinutes();
					let getSeconds = new Date().getSeconds();
					this.Date = year + "/" + month + "/" + day + " " + getHour + ":" + getmin + ":" + getSeconds

					ajax.post('SubmitScore?IDCard=' + this.IDCard +
							'&Score=' + this.Score +
							'&ExamName=' + this.ExamName
						)
						.then(function(response) {
							console.log("提交成功", response);

						})
						.catch(function(error) {
							console.log(error);
						});
					this.$router.push({
						path: '/gradeIssue',
						query: {
							IDCard: this.IDCard,
							Score: this.Score, //分数
							ExamName: this.ExamName, //考试科目
							Date: this.Date, //时间
							misitakeRate: ((this.total - this.rightTotal) / this.total) * 100 + '%', //错误率
							subject: this.questionText, //考试科目
							ExamTimeStart: this.examTime, //考试时间(开始) 
						}
					})
					// on confirm
				}).catch(() => {
					// on cancel
				});
			}

		}
	}
</script>

<style scoped>
	/* 答题卡 */
	
	.answer-buttons {
		height: 48px;
		background: rgba(255, 255, 255, 1);
		width: 50%;
		float: left;
		text-align: center;
		line-height: 48px;
		position: fixed;
		z-index: 9999;
		bottom: 0
	}
	
	.answer-error {
		color: #AAAAAA;
		left: 0;
	}
	
	.answer-success {
		color: #fff;
		right: 0;
		background: rgba(112, 153, 208, 1);
	}
	
	.answer-list {
		height: 320px;
		overflow: auto;
		margin-top: 16px;
		border-bottom: 1px solid #eee;
		margin-bottom: 48px;
	}
	
	.answer-button {
		width: 38px;
		height: 38px;
		background: rgba(204, 204, 204, 1);
		/* background:rgba(138,171,215,1); */
		border-radius: 4px;
		line-height: 38px;
		color: #fff;
		margin: 0 auto;
	}
	
	.answer-list li {
		float: left;
		width: 20%;
		text-align: center;
		margin: 0 auto 16px;
	}
	
	.login-tips {
		width: 94%;
		/* height: 85%; */
		margin-top: 15px;
		font-size: 14px;
		color: #999;
		box-sizing: border-box;
	}
	
	.answer-container h4 {
		padding-left: 15px;
		height: 46px;
		line-height: 46px;
		color: #333333;
		margin: 0 !important;
		border-bottom: 1px solid #eee;
	}
	/* 答题卡end */
	
	.container {
		padding-top: 46px;
	}
	
	.primary {
		background: #595F74;
		float: right;
	}
	
	.primary.none {
		background: #7099D0;
		float: left;
	}
	
	.question-container {
		margin: 10px 0;
		background: #fff;
		padding: 15px;
		box-sizing: border-box;
		box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.16);
	}
	
	.question-container li {
		width: 100%;
		height: auto;
		overflow: hidden;
		padding:10px;
		color: #666666;
		margin-bottom: 10px;
		background: #F6F6F6;
		border-radius: 2px;
	}
	
	.question-container li span {
		display: block;
		float: left;
	}
	
	.question-container li span:last-child {
		width: 92%;
		float: right;
	}
	
	.question-btn {
		padding: 0 15px;
		display: flex;
		justify-content: space-around;
		margin-bottom: 60px;
	}
	
	.question-btn button {
		width: 48%;
		color: #fff;
		border-radius: 2px;
	}
	
	.exam-title {
		margin: 0;
		padding-bottom: 6px;
	}
	
	.question-container li.active {
		background: #7099D0;
		color: #fff;
	}
	
	.header-right {
		line-height: 20px;
		color: #fff;
	}
	/*1*/
	
	.chooseIndex {
		width: 10%;
		display: block;
		width: 16px;
		height: 16px;
		background: rgba(120, 158, 209, 1);
		color: #fff;
		border-radius: 50%;
		text-align: center;
		line-height: 16px;
		font-size: 12px;
		float: left;
		margin: 2px 0 0 0;
	}
	
	.active .chooseIndex {
		/*border: 1px solid #fff;*/
		background: #fff !important;
		color: rgba(112, 153, 208, 1)!important;
	}
	
	.yesChecked {
		background: #8AABD7;
		color: #fff;
	}
	
	.noChecked {}
</style>