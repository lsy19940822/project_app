<template>
	<div class="container">
		<vant-header :leftArrow="false" :titleType="1" :title="questionText+`测试`" :rightType="2">
			<div slot='right_slot'>
				<p class="header-right">{{current+1}}/{{total}}</p>
			</div>
		</vant-header>
		<div class="question-container">
			<p class="van-hairline--bottom exam-title">{{questionType}}题</p>
			<div>
				<p>{{current+1}}.{{questionList[current].TIGAN }}</p>
				<ul>
					<li v-for="(item,index) in answerList" :class="classArr[index]">
						<span class="chooseIndex">{{index+1 |chooseIndex}}</span>{{item}}
					</li>
				</ul>
			</div>
		</div>
		<div class="question-container">
			<p class="van-hairline--bottom exam-title">问题解析</p>
			<div>
				<div class="right-answer">正确答案： {{windsurf}}</div>
				<div class="question-text">建筑工程是社会发展的重要体现,所以必须加强对建筑工程中施工技术的重视程度.在实际施工的过程中认真分析每项施工技术,并针对该技术容易出现的问题进行分析,并根据具体的施工要求采取相应的解决措施.施工人员是施工技术的主要实施者,同时也是施工技术问题的解决者。</div>
			</div>
		</div>

		<div class="question-btn">
			<van-button class="primary" @click="pre">上一题</van-button>
			<van-button class="primary" @click="next">下一题</van-button>
		</div>
	</div>
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import * as ajax from '@/utils/api'
	import localStore from '@/utils/storage.js'
	import { Toast, Button, Dialog } from 'vant';
	import chooseIndex from '@/utils/filters'
	export default {
		components: {
			[Button.name]: Button,
			vantHeader
		},
		data() {
			return {
				total: 0,
				questionList: [],
				allAnswers: [],
				classArr: [],
				current: -1,
				questionText: '',
				questionCurrent: {},
				answerList: [],
				classArr: [],
				questionType: '',
				windsurf: ''

			}
		},
		created() {
			this.localStoreVal();
			this.questionRender();
			this.addClassHandle();
		},
		watch: {
			'$route' (to, from) {
				console.log(to, from, to.query.index)
				this.current
			},
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
			localStoreVal() {
				//				this.mitakeQuesitionTotal = localStore.get('mitakeQuesitionTotal');
				this.total = localStore.get('total');
				this.questionList = localStore.get('questionList');
				this.allAnswers = localStore.get('allAnswers');
			},
			questionRender() {
				this.current = parseInt(this.$route.query.index);
				this.questionText = this.questionList[0].GZ;
				this.questionType = this.questionList[this.current].TMLX;
			},
			addClassHandle() {
				this.classArr = [];
				if(this.questionType === '单选') {
					this.windsurf = this.questionList[this.current].ZQDA
					let index = this.answer(this.questionList[this.current].ZQDA);
					this.classArr[index] = 'bgRightS'
					console.log(this.allAnswers)
					if(this.questionList[this.current].ZQDA === this.allAnswers[this.current]) {
						this.classArr[index] = 'bgRightS'
					} else if(this.allAnswers[this.current] != null || this.allAnswers[this.current] != undefined || this.allAnswers[this.current] != '') {
						this.classArr[this.answer(this.allAnswers[this.current])] = 'bgMistakeS'
					} else {
						this.classArr[this.answer(this.allAnswers[this.current])] = 'bgDefault'
					}

				} else if(this.questionType === '多选') {
					console.log(this.questionList[this.current].ZQDA.split(''));
					this.windsurf = this.questionList[this.current].ZQDA
					var answerRightCrrent = this.questionList[this.current].ZQDA.split('');
					answerRightCrrent.filter(function(item, index, arr) {
						this.classArr[this.answer(item)] = 'bgRightS'
					}, this)
				}

			},
			answer(n) {
				var questAnswer;
				switch(n) {
					case 'A':
						questAnswer = 0;
						break;
					case 'B':
						questAnswer = 1;
						break;
					case 'C':
						questAnswer = 2;
						break;
					case 'D':
						questAnswer = 3;
						break;

				}
				return questAnswer;
			},
			pre() {
				if(this.current > 0) {
					this.current -= 1

					this.$router.push({
						path: '/questionDetail',
						query: {
							index: this.current
						}
					})
					this.localStoreVal();
					this.questionRender();
					this.addClassHandle();
					console.log(1000000)
				}

			},
			next() {
				if(this.current < this.total-1) {
					this.current += 1
					this.$router.push({
						path: '/questionDetail',
						query: {
							index: this.current
						}
					})
					this.localStoreVal();
					this.questionRender();
					this.addClassHandle();
				}

			}
		}
	}
</script>

<style scoped>
	.container {
		padding-top: 46px;
	}
	
	.primary {
		width: 165px;
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
	}
	
	.question-container li {
		width: 100%;
		/*height: 46px;*/
		line-height: 30px;
		padding: 5px 10px;
		color: #666666;
		margin-bottom: 10px;
		background: #F6F6F6;
		border-radius: 2px;
	}
	
	.question-btn {
		display: flex;
		justify-content: space-around;
	}
	
	.question-btn button {
		color: #fff;
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
		color: #fff;
	}
	
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
	/*.active .chooseIndex {
		background: #fff !important;
		color: rgba(112, 153, 208, 1)!important;
	}*/
	
	.right-answer {
		background: #7AB182;
		line-height: 46px;
		color: #fff;
		padding: 0 10px;
		margin-bottom: 7px;
	}
	
	.question-text {
		color: #666;
		font-size: 16px;
	}
	
	.primary {
		width: 165px;
		background: #7099D0;
	}
	
	.primary.none {
		background: #595F74;
	}
	
	.question-container li.bgRightS {
		background: #7AB182;
		color: #fff;
	}
	
	.question-container li.bgRightS .chooseIndex {
		background: #fff;
		color: #7AB182;
	}
	
	.question-container li.bgMistakeS {
		background: #C36363;
		color: #fff;
	}
	
	.question-container li.bgMistakeS .chooseIndex {
		background: #fff;
		color: #C36363;
	}
	
	.question-container li.bgDefault {
		background: #F6F6F6;
	}
	
	.question-container li.bgDefault .chooseIndex {
		background: #fff;
		color: #F6F6F6;
	}
</style>