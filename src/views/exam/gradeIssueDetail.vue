<template>
	<div class="container" :class="{ headeractive: isActive }">
		<vant-header :leftArrow="true" :titleType="1" :title="`试卷详情`" :rightType="2" />

		<div class="grade-cont">
			<van-row>
				<van-col span="8">
					<p class="b-text">试卷总分</p>
					<div class="t-text">100</div>
				</van-col>
				<van-col span="8">
					<p class="b-text">答题时间</p>
					<div class="t-text">{{$route.query.ExamTimeStart}}</div>
				</van-col>
				<van-col span="8">
					<p class="b-text">错题数</p>
					<div class="t-text">{{mitakeQuesitionTotal}}<span class="s-text">道</span></div>
				</van-col>
			</van-row>
		</div>
		<div class="question-box">
			<div class="answer-container">
				<h4>所有题目</h4>
			</div>

			<ul class="answer-list">
				<li v-for="(item,index) in total">

					<div :class="classArr[index]" class="answer-button" :index="index">
						<div @click="everyQuesitionDetail(index)" :index="index">{{index+1}}</div>
					</div>


				</li>
			</ul>

		</div>

	</div>
</template>

<script>
	import vantHeader from '@/components/header.vue'
	
	import {Circle,Row,Col,Button} from 'vant';
	import localStore from '@/utils/storage.js'
	import * as ajax from '@/utils/api'
	export default {
		components: {
			[Circle.name]: Circle,
			[Row.name]: Row,
			[Col.name]: Col,
			[Button.name]: Button,
			vantHeader
		},
		data() {
			return {
				currentRate: 0,
				rate: 80,
				totalList: [],
				mitakeQuesitionTotal: '',
				total: 0,
				questionList: [],
				allAnswers: [],
				classArr: [],
				isActive:false
			}
		},
		created() {
			this.localStoreVal();
			sessionStorage.getItem("chang_yi_headerHide");
			if(sessionStorage.getItem("chang_yi_headerHide") == 'false'){
				
				this.isActive = true
			}
		},
		methods: {
			everyQuesitionDetail(index) {
				this.$router.push({
					path: '/questionDetail?index=' + index
				})
			},
			localStoreVal() {
				this.mitakeQuesitionTotal = localStore.get('mitakeQuesitionTotal');
				this.total = localStore.get('total');
				this.questionList = localStore.get('questionList');
				this.allAnswers = localStore.get('allAnswers');
				for(var item in this.questionList){
					if(this.questionList[item].ZQDA === this.allAnswers[item] ){
						this.classArr[item] = 'bgRight' 
					}else if(this.allAnswers[item] != null && this.allAnswers[item] != undefined){
						this.classArr[item] = 'bgMistake'
					}else{
						this.classArr[item] = 'bgNoMake'
					}
				}
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

		border-radius: 4px;
		line-height: 38px;
		color: #fff;
		margin: 0 auto;

	}
	
.answer-button div{
	width: 38px;
	height: 38px;
	/* background: #ccc; */
	border-radius: 4px;
	    line-height: 38px;
	    color: #fff;
	    margin: 0 auto;
}
	.answer-list li {
		float: left;
		width: 16.6%;
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

	.question-list {
		flex-wrap: wrap;
	}

	.flex {
		display: flex;
		align-content: space-between;

	}

	* {
		margin: 0;
	}

	.q-item {
		width: 16.6%;
		float: left;
		text-align: center;

	}

	.bgRight {
		width: 38px;
		height: 38px;
		background: #7AB182 !important;
	}

	.bgMistake {
		width: 38px;
		height: 38px;
		background: #CE6F6F !important;
	}

	.bgNoMake {
		width: 38px;
		height: 38px;
		background: #ccc !important;
	}

	.grade-box {
		background: #fff;
		padding-bottom: 10px;
		box-shadow: 0 2px 10px 2px #999999;
	}

	.grade-cont {
		text-align: center;
		background: #fff;
		padding: 20px 0;
	}

	.grade-circle {
		padding: 18px 0;
		text-align: center;
	}

	.grade-text {
		padding: 10px;
		color: #666;
	}

	.f42 {
		font-size: 42px;
		color: #7AB182;
	}

	.f12 {
		font-size: 12px;
	}

	.t-text {
		font-size: 20px;
		color: #333;
	}

	.s-text {
		font-size: 12px;
	}

	.c-CB5D5D {
		color: #CB5D5D;
	}

	.b-text {
		color: #AAA;
		font-size: 14px;
	}

	.question-box {
		background: #fff;
		margin-top: 10px;
	}

	.q-title {
		line-height: 38px;
		font-size: 14px;
		padding-left: 16px;
	}
</style>
