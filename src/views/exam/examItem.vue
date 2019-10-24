<template>
	<div class="container">
		<vant-header :leftArrow="false" :titleType="1" :title="questionText+`测试`" :rightType="2">
<<<<<<< HEAD
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
						<span>{{index+1 | chooseIndex}}</span>{{item}}
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
						<span>{{index+1 | chooseIndex}}</span>{{item}}
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
=======
      <div slot='right_slot'>
        <p>搜索</p>
      </div>
		</vant-header>
    <div class="question-container" v-if="questionCurrent.TMLX  == '单选'">
      <p>单选题</p>
      <div>
        <p>{{questionCurrent.TIGAN }}</p>
        <ul>
          <li v-for="(item,index) in answerList" @click="choose()">
            <span>{{index+1 | chooseIndex}}</span>{{item}}
          </li>
        </ul>
      </div>
    </div>
    <div class="question-container" v-if="questionCurrent.TMLX  == '多选'">
      <p>单选题</p>
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
>>>>>>> 55d294a123c7087c0e63cdf0960c1fb2864335af
	</div>
</template>

<script>
<<<<<<< HEAD
	import vantHeader from '@/components/layout/header.vue'
	import examFooter from '@/components/layout/onlineExamFooter.vue'
	import { formatDate, formatTime } from '@/utils/common.js'
	import * as ajax from '@/utils/api'
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
				//				mistakesAnswers: [],
				//				rightAnswers: [],
				allAnswers: [],
				isSingleActive: -1,
				isMultipleActive: [false, false, false, false],
				multipleChose: '',
				show: true,
				selectTotal: 0,
				IDCard: this.$route.query.IDCard,
				Score: 0,
				ExamName: '',
				Date: ''
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

				Dialog.confirm({
					title: '交卷提醒',
					message: '您的试卷还有' + (this.total - this.selectTotal) + '道题未做答，是否依然提交？'
				}).then(() => {
					if(this.questionList.length != 0) {
						this.ExamName = this.questionList[0].BIDSECTION + this.questionList[0].GZ + formatDate(new Date(), '/');
					} else {
						return;
					}
					this.Date = formatTime(new Date()) 
					
					ajax.post('SubmitScore?IDCard='+this.IDCard+
						'&Score='+ this.Score+
						'&ExamName='+this.ExamName+
						'&Date='+ this.Date
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
	}
</style>
=======
  import vantHeader from '@/components/layout/header.vue'
	import * as ajax from '@/utils/api'
  import {Toast,Button} from 'vant';
	export default{
		components:{
			[Button.name]:Button,
      vantHeader
		},
    data() {
    	return{
        questionText: '',
        questionList: [],
        questionCurrent: {},
        answerList: [],
        current: 1,
        total: null,
        nextNone: false,
        preNone: true
      }
    },
    mounted() {
      this.getExamList()
    },
    watch: {
      'current': function(newValue,oldValue) {
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
    methods:{
      getExamList() {
        ajax.get('GetPaper?IDcard='+this.$route.query.IDCard).then(res => {
          if(res.data.result){
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
          }
        })
      },
      pre() {
        if(this.current>1) {
          this.current--
        }else{
          this.preNone = true
        }
      },
      next() {
        if(this.current<this.total) {
          this.current++
        }else{
          this.nextNone = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .primary{
    width: 165px;
  }
  .primary.none{
    background: #595F74;
  }
  .question-container{
    margin: 10px 0;
    background: #fff;
    padding: 0 15px;
    box-sizing: border-box;
    box-shadow:0px 1px 2px 0px rgba(0,0,0,0.16);
    li{
      width:335px;
      height:46px;
      line-height: 46px;
      padding-left: 10px;
      color: #fff;
      margin-bottom: 10px;
      background:rgba(112,153,208,1);
      border-radius:2px;
    }
  }
  .question-btn{
    display: flex;
    justify-content: space-around;
    button{
      color: #fff;
    }
  }
</style>
>>>>>>> 55d294a123c7087c0e63cdf0960c1fb2864335af
