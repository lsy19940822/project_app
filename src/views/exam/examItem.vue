<template>
	<div class="container">
		<vant-header :leftArrow="false" :titleType="1" :title="questionText+`测试`" :rightType="2">
			<div slot='right_slot'>
				<p>{{current}}/{{total}}</p>
			</div>
		</vant-header>
		<div class="question-container" v-if="questionCurrent.TMLX  == '单选'">
			<p class="van-hairline--bottom exam-title">单选题</p>
			<div>
				<p>{{current}}.{{questionCurrent.TIGAN }}</p>
				<ul>
					<li v-for="(item,index) in answerList" @click="choose(index)" :class="{active:isActive == index}">
						<span>{{index+1 | chooseIndex}}</span>{{item}}
					</li>
				</ul>
			</div>
		</div>
		<div class="question-container" v-if="questionCurrent.TMLX  == '多选'">
			<p class="van-hairline--bottom exam-title">多选题</p>
			<div>
				<p>{{questionCurrent.TIGAN }}</p>
				<ul>
					<li v-for="(item,index) in answerList" @click="choose()">
						<span>{{index+1 | chooseIndex}}</span>{{item}}
					</li>
				</ul>
			</div>
		</div>
		<div class="question-container" v-if="questionCurrent.TMLX  == '判断'">
			<p class="van-hairline--bottom exam-title">判断题</p>
			<div>
				<p>{{questionCurrent.TIGAN }}</p>
				<ul>
					<li v-for="(item,index) in answerList" @click="choose()">
						<span>{{index+1 | chooseIndex}}</span>{{item}}
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
	import vantHeader from '@/components/layout/header.vue'
	import examFooter from '@/components/layout/onlineExamFooter.vue'
	import * as ajax from '@/utils/api'
	import { Toast, Button } from 'vant';
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
				current: 1,
				total: null,
				nextNone: false,
				preNone: true,
				mistakesAnswers: [],
				rightAnswers: [],
				isActive: -1
			}
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
						//						console.log(this.answerList,":this.answerList");
					}
					//					console.log(this.questionList)
				})
			},
			pre() {
				this.isActive = -1;
				if(this.current > 1) {
					this.current--
				} else {
					this.preNone = true
				}
			},
			next() {
				this.isActive = -1;
				if(this.current < this.total) {
					this.current++
				} else {
					this.nextNone = true
				}
			},
			choose(index) {
				this.isActive = index;
				for(var item in this.questionList) {
					if(this.answerList[index]) {

					}
				}

				console.log(this.isActive)
			},
			aswer(n) {
//				questAnswer = ;
				switch(n) {
					case 'A':
						break;
					case 'B':
						break;
					case 'C':
						break;
					case 'D':
						break;

				}
				return 
			}
		}
	}
</script>

<style lang="scss" scoped>
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
		li {
			width: 335px;
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
</style>