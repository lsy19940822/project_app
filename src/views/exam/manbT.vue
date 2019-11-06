<template>
	<div id="examrecord">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2">
			
		</vant-header>
		<ul id="Bt_list">
			<li><img src="../../assets/exam_man@2x (3).png" alt=""><div>光线充足<br>正对手机</div></li>
			<li><img src="../../assets/exam_man@2x (2).png" alt=""><div>不要在灰暗<br>或逆光下扫描</div></li>
			<li><img src="../../assets/exam_man@2x (1).png" alt=""><div>不要斜视<br>手机</div></li>
		</ul>
		<div class="button">开始验证</div>
	</div>
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import * as ajax from '@/utils/api'
	import Vue from 'vue';
	import { Cell} from 'vant';
	
	Vue.use(Cell)
	export default {
		components: {
			vantHeader,
		},
		data() {
			return {
				questionText:"人脸识别"
			}
		},
		mounted() {
		},
		created() {
			
		},
		methods: {
			
			
		}
	}
</script>

<style scoped>
	#examrecord{
		/* padding-top: 46px; */
		background: #fff;
		position: fixed;
		top: 46px;
		width: 100%;
		left: 0;
		right: 0;
		bottom: 0;
		
	}
	.button{
		width: 90%;
		height:46px;
		margin: 0 auto;
		background: #00A0E9;
		color: #fff;
		line-height: 46px;
		border-radius: 2px;
		text-align: center;
	}
	#Bt_list{
		width: 90%;
		height: auto;
		overflow: hidden;
		margin: 0 auto;
	}
	li{
		width: 100%;
		height: auto;
		padding: 20px 0;
		overflow: hidden;
		border-bottom: 1px solid #ddd;
	}
	li img{
		width: 108px;
		height: 108px;
		border: 1px dashed #ddd;
		float: left;
		display: block;
		margin-left: 50px;
	}
	li div{
		margin: 24px 16px;
		float: left;
	}
</style>
