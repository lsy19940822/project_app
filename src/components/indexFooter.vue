<template>
	<!--在线考试底部-->
	<div class="exam-footer">
		<van-row>
			<van-col span="6">
				<div class="icon-box">
					<!-- <van-icon name="newspaper-o" /> -->
					<img src="../assets/images/index_icon/home@2x.png" alt="">
					<p class="f-text active">首页</p>
				</div>
			</van-col>
			<van-col span="6">
				<div class="icon-box">
					<img src="../assets/images/index_icon/icon_gn@2x.png" alt="">
					<p class="f-text">功能</p>
					<!-- <van-icon name="underway-o"/> -->
					<!-- <van-count-down millisecond :time="time" format="HH:mm:ss" /> -->
				</div>
			</van-col>
			<van-col span="6">
				<div class="icon-box">
					<van-icon name="comment-o" color="#AAAAAA" style="padding:5px 0 2px;font-size: 26px;"/>
					<p class="f-text" style="margin: -5px 0 0 0;">信息</p>
				</div>
			</van-col>
			<van-col span="6">
				<div class="icon-box">
					<img src="../assets/images/index_icon/ueser@2x.png" alt="">
					<p class="f-text">我的</p>
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
			[CountDown.name]: CountDown
		},
		data() {
			return {
                time:60*60*60*12.5
			}
		}
	}
</script>

<style scoped>
	.active{
		color: #5A8CD4 !important;
	}
	img {
		padding:5px 0 2px;
		width: 22px;
		height: auto;
		display: block;
		margin: 0 auto;
	}
	.exam-footer {
		
		position: fixed;
		left:0;
		right:0;
		bottom:0;
		width: 100%;
		height: 58px;
		text-align: center;
		height:49px;
		background:#F9F9F9;
		box-shadow:0px 1px 0px 0px rgba(0,0,0,0.25);
		border-top: 1px solid #ddd;
	}
	.f-text{
		color:#888888;
		font-size:12px;
		margin:0;
	}
	.icon-box .van-icon{
		font-size: 20px;
	}
	
</style>