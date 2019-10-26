
<template>
	<!--在线考试底部-->
	<div class="exam-footer">
		<van-row>
			<van-col span="8" >
				<div class="icon-box" @click = "onchange1">
					<van-icon name="newspaper-o" />
					<p class="f-text">答题卡</p>
				</div>
			</van-col>
			<van-col span="8">
				<div class="icon-box">
					<van-icon name="underway-o" style="font-size: 26px;margin-top: -9px;" />
					<div class="f-text">
						<van-count-down millisecond :time="time" format="HH:mm:ss" ref= 'timesVal' />
					</div>
				</div>
			</van-col>
			<van-col span="8" @click = "submitPaper">
				<div class="icon-box">
					<van-icon name="todo-list-o" />
					<p  class="f-text">交卷</p>
				</div>
			</van-col>
		</van-row>
	</div>
</template>

<script>
	import { Row, Col, Icon, CountDown } from 'vant';
	export default {
		components: {
			[Row.name]: Row,
			[Col.name]: Col,
			[Icon.name]: Icon,
			[CountDown.name]: CountDown,
			
		},
		props:['showtip','allAnswers','alreadyCheck'],
		data() {
			return {
				time:45*60*1000,
//				isShow:this.shwowtip
			}
		},
		methods:{
			onchange1(){
				
				var allAnswers=this.allAnswers;
				var alreadyCheck = this.alreadyCheck;
				console.log(allAnswers)
				allAnswers.filter(function(item,index,arr){
					if(allAnswers[index] != null && allAnswers[index] != undefined && allAnswers[index] != ''){
						alreadyCheck[index] = 'yesChecked'
					}else{
						alreadyCheck[index] = 'answer-button'
					}
					
					return alreadyCheck
				})
				
				var showVar = !this.showtip;
				this.$emit('showtip',showVar,alreadyCheck)
			},
			submitPaper(){
				this.$emit('examItem')
			}
		}
		
		
	}
</script>

<style scoped>
	img {
		width: 100%;
		height: auto;
		display: block;
	}
	
	.exam-footer {
		padding-top:15px;
		position: fixed;
		left:0;
		right:0;
		bottom:0;
		width: 100%;
		height: 58px;
		text-align: center;
		background: url(../assets/images/exam/bg_exam_footer.png) no-repeat;
		background-size: contain;
	}
	.f-text{
		color:#888888;
		font-size:12px;
		margin:0;
	}
</style>