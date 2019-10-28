<template>
	<div id="examrecord">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2">
			<div slot='right_slot'>
				<p class="header-right"><img src="../../assets/images/index_icon/icon_l.png" alt=""></p>
			</div>
		</vant-header>
		<div class="container">
			<ul class="container_list">
				<li>
					<van-cell is-link >
						<div class="container_l">
							<span class='container_span_first'>98</span>
							<span class='container_span_seound'>分</span>
							<span class='container_span_three'>2019电工上岗测试</span>
						</div>
						
						<div class="container_l">
							<span class='container_span_firsts' >合格</span>
							<span class='container_span_seounds' style="">考试时间：2019-09-27 20:22:32</span>
						</div>
						
						
					</van-cell>
				</li>
				<li>
					<van-cell is-link >
						<div class="container_l">
							<span class='container_span_first' style="color: #C36363;">98</span>
							<span class='container_span_seound' style="color: #C36363;">分</span>
							<span class='container_span_three'>2019电工上岗测试</span>
						</div>
						
						<div class="container_l">
							<span class='container_span_firsts' style="color: #C36363;border: 1px solid #C36363;">未合格</span>
							<span class='container_span_seounds' style="">考试时间：2019-09-27 20:22:32</span>
						</div>
						
						
					</van-cell>
				</li>
			</ul>
		</div>
		
	</div>
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import Vue from 'vue';
	import { Cell} from 'vant';
	
	Vue.use(Cell)
	export default {
		components: {
			vantHeader,
			
		},
		data() {
			return {
				questionText:"考试记录"
			}
		}
	}
</script>

<style>
	.header-right {
		line-height: 5px;
		color:#fff;
	}
	.container{
		padding-top: 46px;
	}
	.container_list{
		margin-top: 10px;
		height: auto;
		overflow: hidden;
		background: #fff;
		box-shadow:0px 1px 2px 0px rgba(0,0,0,0.16);
	}
	.container_list li{
		/* padding: 10px 16px; */
		height: auto;
		overflow: hidden;
		border-bottom: 1px solid #EEEEEE;
	}
	.container_list li:last-child{
		border-bottom: none;
	}
	.container_list li .van-icon{
		margin-top: 15px;
	}
	.container_span_first{
		width: 42px;
		color:#69966F;font-size:20px;
	}
	
	.container_span_seound{
		color:#69966F;font-size:12px;
	}
	.container_span_three{
		color:#333;font-size:17px;margin-left: 20px;
	}
	.container_span_firsts{
		width: 42px;
		border:1px solid #69966F;font-size:12px;height:17px;line-height: 14px;display: inline-block;text-align: center;
	     border-radius: 2px;
		 color:#69966F;
	}
	.container_span_seounds{
		color:#aaa;font-size:12px;margin-left: 16px;
	}
</style>
