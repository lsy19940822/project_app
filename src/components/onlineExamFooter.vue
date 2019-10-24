<<<<<<< HEAD:src/components/layout/onlineExamFooter.vue
<template>
	<!--在线考试底部-->
	<div class="exam-footer">
		<van-row>
			<van-col span="8">
				<div class="icon-box">
					<!--<div class="f-icon"><img src="" alt="" /></div>-->
					<van-icon name="newspaper-o" />
					<p class="f-text">答题卡</p>
				</div>
			</van-col>
			<van-col span="8">
				<div class="icon-box">
					<!--<div class="f-icon"><img src="" alt="" /></div>-->
					<van-icon name="underway-o" />
					<div class="f-text">
						<van-count-down millisecond :time="time" format="HH:mm:ss" />
					</div>
				</div>
			</van-col>
			<van-col span="8">
				<div class="icon-box">
					<!--<div class="f-icon"><img src="" alt="" /></div>-->
					<van-icon name="todo-list-o" />
					<p class="f-text">交卷</p>
				</div>
			</van-col>
		</van-row>
	</div>
</template>

<script>
	//	import Vue from 'vue';
	import { Row, Col, Icon, CountDown } from 'vant';
	//
	//	Vue.use(Row).use(Col);
	export default {
		components: {
			[Row.name]: Row,
			[Col.name]: Col,
			[Icon.name]: Icon,
			[CountDown.name]: CountDown

		},
		data() {
			return {
				time: 30 * 60 * 60 * 1000
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
		padding-top: 15px;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 58px;
		text-align: center;
		background: url(../../assets/images/exam/bg_exam_footer.png) no-repeat;
		background-size: contain;
	}
	
	.f-text {
		color: #888888;
		font-size: 12px;
		margin: 0;
	}
=======
<template>
	<!--在线考试底部-->
	<div class="exam-footer">
		<van-row>
			<van-col span="8">
				<div class="icon-box">
					<!--<div class="f-icon"><img src="" alt="" /></div>-->
					<van-icon name="newspaper-o" />
					<p class="f-text">答题卡</p>
				</div>
			</van-col>
			<van-col span="8">
				<div class="icon-box">
					<!--<div class="f-icon"><img src="" alt="" /></div>-->
					<van-icon name="underway-o" />
					<p  class="f-text">02:23</p>
				</div>
			</van-col>
			<van-col span="8">
				<div class="icon-box">
					<!--<div class="f-icon"><img src="" alt="" /></div>-->
					<van-icon name="todo-list-o" />
					<p  class="f-text">交卷</p>
				</div>
			</van-col>
		</van-row>
	</div>
</template>

<script>
//	import Vue from 'vue';
	import { Row, Col, Icon } from 'vant';
//
//	Vue.use(Row).use(Col);
	export default {
		components: {
			[Row.name]: Row,
			[Col.name]: Col,
			[Icon.name]: Icon

		},
		data() {
			return {

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
		background: url(../../assets/images/exam/bg_exam_footer.png) no-repeat;
		background-size: contain;
	}
	.f-text{
		color:#888888;
		font-size:12px;
		margin:0;
	}
>>>>>>> 55d294a123c7087c0e63cdf0960c1fb2864335af:src/components/onlineExamFooter.vue
</style>