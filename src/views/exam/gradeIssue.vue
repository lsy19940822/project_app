<template>
	<div class="container">
		<vant-header :leftArrow="false" :titleType="1" :title="`成绩发布`" :rightType="2" />
		<div class="grade-box">
			<div class="grade-circle">
				<van-circle v-model="currentRate" :rate="rate" :clockwise="false" color='#7AB182' size="120px" text="逆时针方向">
					<div class="grade-text">
						<h2 class="f42">{{$route.query.Score}}<span class="f12">分</span></h2>
						<p class="g-text f12">本次考试得分</p>
					</div>
				</van-circle>
			</div>
			<div class="grade-cont">
				<van-row>
					<van-col span="8">
						<div class="t-text">100</div>
						<p class="b-text">试卷总分</p>
					</van-col>
					<van-col span="8">
						
						<div class="t-text">{{$route.query.ExamTimeStart}}</div>
						<p class="b-text">答题时间</p>
					</van-col>
					<van-col span="8">
						<div class="t-text c-CB5D5D">{{$route.query.misitakeRate}}</div>
						<p class="b-text">错误率</p>
					</van-col>
				</van-row>
			</div>
		</div>

		<div class="grade-infor">
			<h4 class="grade-infor-title">考试详情</h4>
			<van-row>
				<van-col span="6">考试科目</van-col>
				<van-col span="18">{{$route.query.subject}}</van-col>
			</van-row>
			<van-row>
				<van-col span="6">考试名称</van-col>
				<van-col span="18">2019电工上岗测试</van-col>
			</van-row>
			<van-row>
				<van-col span="6">考试时间</van-col>
				<van-col span="18">{{$route.query.Date}}</van-col>
			</van-row>

		</div>
		<router-link :to="{path:'/gradeIssueDetail',query:{'ExamTimeStart':$route.query.ExamTimeStart,'IDcard':$route.query.IDCard}}" style="color:#fff;">
			<van-button color="#595F74" class="larg-btn">查看试卷</van-button>
		</router-link>
	</div>
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import { Circle, Row, Col, Button } from 'vant';
	import localStore from '@/utils/storage.js'
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
				score:'',
				misitakeRate:'',
				subject:'',
				ExamTimeStart:'',
				ExamName:''
			}
		},
		created(){
			this.storeVal();
		},
		methods:{
			storeVal(){
				// console.log(this.)
				// this.score =this.$route.query.score;
				// this.misitakeRate = localStore.get('misitakeRate');
				// this.subject = localStore.get('subject');
				// this.ExamTimeStart = localStore.get('ExamTimeStart');
				// this.ExamName = localStore.get('ExamName');
			}
		}
	}
</script>

<style scoped>
	.container {
		padding-top: 46px;
	}
	
	* {
		margin: 0;
	}
	
	.grade-box {
		background: #fff;
		padding-bottom: 10px;
		box-shadow: 0 2px 10px 2px #999999;
	}
	
	.grade-cont {
		text-align: center;
		margin-top: 20px;
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
	
	.van-col {
		position: relative;
	}
	
	.grade-cont .van-col:after {
		content: '';
		position: absolute;
		height: 32px;
		width: 1px;
		background: #D8D8D8;
		right: 0;
		top: 3px;
	}
	
	.grade-cont :last-child.van-col:after {
		display: none;
	}
	
	.grade-infor {
		background: #fff;
		padding: 10px;
	}
	
	.larg-btn {
		width: 90%;
		margin: 14px auto 0;
		line-height: 46px;
		display: block;
	}
	
	.grade-infor .van-row {
		border-bottom: 1px solid #D8D8D8;
	}
	
	.grade-infor .van-row :first-child.van-col {
		color: #AAAAAA;
	}
	
	.grade-infor .van-row :last-child.van-col {
		text-align: right;
	}
	
	.grade-infor .van-col {
		line-height: 60px;
	}
	
	.grade-infor-title {
		line-height: 60px;
		border-bottom: 1px solid #D8D8D8;
	}
</style>