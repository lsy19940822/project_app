<template>
	<div class="container">
		<vant-header :leftArrow="false" :titleType="1" :title="questionText+`测试`" :rightType="2">
			<div slot='right_slot'>
				<p class="header-right">{{current+1}}/{{total}}</p>
			</div>
		</vant-header>
		<div class="question-container" v-if="questionCurrent.TMLX  == '单选'">
			<p class="van-hairline--bottom exam-title">单选题</p>
			<div>
				<p>{{current+1}}.{{questionCurrent.TIGAN }}</p>
				<ul>
					<li v-for="(item,index) in answerList" @click="choose(index,1)" :class="{active:isSingleActive == index}">
						<span class="chooseIndex">{{index+1 | chooseIndex}}</span>{{item}}
					</li>
				</ul>
			</div>
		</div>
		<div class="question-container" v-if="questionCurrent.TMLX  == '多选'">
			<p class="van-hairline--bottom exam-title">多选题</p>
			<div>
				<p>{{current+1}}.{{questionCurrent.TIGAN }}</p>
				<ul>
					<li v-for="(item,index) in answerList" @click="choose(index,2)" :class="{active:isMultipleActive[index] == true}">
						<span class="chooseIndex">{{index+1 | chooseIndex}}</span>{{item}}
					</li>
				</ul>
			</div>
		</div>
		<div class="question-container" v-if="questionCurrent.TMLX  == '判断'">
			<p class="van-hairline--bottom exam-title">判断题</p>
			<div>
				<p>{{current+1}}.{{questionCurrent.TIGAN }}</p>
				<ul>
					<li v-for="(item,index) in answerList" @click="choose(3)">
						<span class="chooseIndex">{{index+1 | chooseIndex}}</span>{{item}}
					</li>
				</ul>
			</div>
		</div>

		<div class="question-btn">
			<van-button class="primary" :class="{none: preNone}" @click="pre()">上一题</van-button>
			<van-button class="primary" :class="{none: nextNone}" @click="next()">下一题</van-button>
		</div>
		<exam-footer></exam-footer>
	</div>
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import examFooter from '@/components/onlineExamFooter.vue'
	import { formatDate, formatTime } from '@/utils/common.js'
	import * as ajax from '@/utils/api'
	import localStore from '@/utils/storage.js'
	import { Toast, Button, Dialog } from 'vant';
	export default {
		components: {
			[Button.name]: Button,
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
				ExamTimeStart: '',
				rightTotal: 0
			}
		},
		created() {
			this.ExamTimeStart = formatTime(new Date)
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
			getExamList() {
				ajax.get('GetPaper?IDcard=' + this.$route.query.IDCard).then(res => {
					console.log(res)
					if(res.data.result) {
						this.questionList = res.data.data
						this.total = res.data.data.length
						this.questionCurrent = this.questionList[this.current]
						this.questionText = this.questionCurrent.GZ
						for(let k in this.questionCurrent) {
							if(k == 'XA' || k == 'XB' || k == 'XC' || k == 'XD') {
								if(this.questionCurrent[k]) {
									this.answerList.push(this.questionCurrent[k])
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
				if(this.current > 1) {
					this.current--
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
				} else {
					this.nextNone = true
					Toast('已经是最后一题了！');
					setTimeout(function() {
						_this.submitExam();
					}, 2000)

				}
			},
			choose(index, flag) {

				var _this = this;
				if(flag === 1) { //flag 1:单选  2：多选 3：判断
					this.isSingleActive = index;
					this.allAnswers[this.current] = this.answer(index);

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
				}
			},
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
						this.ExamName = this.questionList[0].BIDSECTION + this.questionList[0].GZ + formatDate(new Date(), '/');
					} else {
						return;
				}
				console.log(this.Score)
				localStore.set('score', this.Score); //得分
				localStore.set('examTime', this.time); //答题时间
				localStore.set('misitakeRate',( (this.total - this.rightTotal) / this.total )*100 +'%' ); //错误率
				localStore.set('subject', this.questionText); //考试科目
				localStore.set('ExamName', this.ExamName); //考试名称
				localStore.set('ExamTimeStart', this.ExamTimeStart); //考试时间(开始) 
				localStore.set('mitakeQuesitionTotal', (this.total - this.rightTotal)); //错题数目
				localStore.set('total', this.total); //总题
				localStore.set('allAnswers', this.allAnswers); //作答的答案
				localStore.set('questionList', this.questionList); //返回题信息
				
				Dialog.confirm({
					title: '交卷提醒',
					message: '您的试卷还有' + (this.total - this.selectTotal) + '道题未做答，是否依然提交？'
				}).then(() => {
					

					this.Date = formatTime(new Date())
					ajax.post('SubmitScore?IDCard=' + this.IDCard +
							'&Score=' + this.Score +
							'&ExamName=' + this.ExamName +
							'&Date=' + this.Date
						)
						.then(function(response) {
							console.log(response);
						})
						.catch(function(error) {
							console.log(error);
						});

					this.$router.push({
						path: '/gradeIssue'
					})
					// on confirm
				}).catch(() => {
					// on cancel
				});
			},
			rightAnswerHandle() {
				for(let item in this.questionList) { //存储正确答案
					console.log("this.rightAnswers:", this.questionList[item].ZQDA)
					this.rightAnswers.push(this.questionList[item].ZQDA)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-top: 46px;
	}
	
	.primary {
		width: 165px;
		background: #7099D0;
	}
	
	.primary.none {
		background: #595F74;
	}
	
	.question-container {
		margin: 10px 0;
		background: #fff;
		padding: 15px;
		box-sizing: border-box;
		box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.16);
		li {
			width: 100%;
			/*height: 46px;*/
			line-height: 30px;
			padding: 5px 10px;
			color: #666666;
			margin-bottom: 10px;
			background: #F6F6F6;
			border-radius: 2px;
		}
	}
	
	.question-btn {
		display: flex;
		justify-content: space-around;
		button {
			color: #fff;
		}
	}
	
	.exam-title {
		padding-bottom: 6px;
	}
	
	.question-container li.active {
		background: #7099D0;
		color: #fff;
	}
	
	.header-right {
		line-height: 20px;
		color:#FFF;
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
		margin: 5px 7px 0 0;
	}
	
	.active .chooseIndex {
		/*border: 1px solid #fff;*/
		background: #fff !important;
		color: rgba(112, 153, 208, 1)!important;
	}
</style>