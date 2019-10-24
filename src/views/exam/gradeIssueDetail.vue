<template>
	<div class="container">
		<vant-header :leftArrow="false" :titleType="1" :title="`试卷详情`" :rightType="2" />

		<div class="grade-cont">
			<van-row>
				<van-col span="8">
					<p class="b-text">试卷总分</p>
					<div class="t-text">100</div>
				</van-col>
				<van-col span="8">
					<p class="b-text">答题时间</p>
					<div class="t-text">34<span class="s-text">分</span>20<span class="s-text">秒</span></div>
				</van-col>
				<van-col span="8">
					<p class="b-text">错题数</p>
					<div class="t-text">34<span class="s-text">道</span></div>
				</van-col>
			</van-row>
		</div>
		<div class="question-box">
			<div class="van-hairline-bottom q-title">所有题目</div>
			<ul class="question-list flex">
				<li class="q-item" @click="everyQuesitionDetail">1</li>
				<li class="q-item bgRight">1</li>
				<li class="q-item">1</li>
				<li class="q-item">1</li>
				<li class="q-item">1</li>
				<li class="q-item">1</li>
				<li class="q-item">1</li>
				<li class="q-item bgMistake">1</li>
				<li class="q-item">1</li>
				<li class="q-item">1</li>
				<li class="q-item">12</li>
				<li class="q-item">100</li>
				<li class="q-item">1</li>
				<li class="q-item bgRight">1</li>
				<li class="q-item">1</li>
				<li class="q-item">1</li>
				<li class="q-item">1</li>
				<li class="q-item">1</li>
				<li class="q-item">1</li>
				<li class="q-item bgMistake">1</li>
				<li class="q-item">1</li>
				<li class="q-item">1</li>
				<li class="q-item">12</li>
				<li class="q-item">100</li>
			</ul>
		</div>

	</div>
</template>

<script>
	import vantHeader from '@/components/layout/header.vue'
	import { Circle, Row, Col, Button } from 'vant';
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
				rate: 80
			}
		},
		methods:{
			everyQuesitionDetail(){
				this.$router.push({path:'/questionDetail'})
			}
		}
	}
</script>

<style scoped>
	.question-list{
		flex-wrap:wrap;
	}
	.flex{
		display: flex;
		align-content: space-between;
		
	}
	* {
		margin: 0;
	}
	.q-item{
		width:38px;
		height:38px;
		text-align: center;
		line-height: 38px;
		border-radius: 3px;
		background:#CCC;
		margin:6.8px;
		color:#fff;
		/*flex: 1;*/
	}
	.bgRight{
		background:#7AB182;
	}
	.bgMistake{
		background: #CE6F6F;
	}
	.bgNoMake{
		background:#ccc;
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
	.question-box{
		background: #fff;
		margin-top:10px;
	}
	.q-title{
		line-height: 38px;
		font-size:14px;
		padding-left:16px;
	}
</style>