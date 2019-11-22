<template>
	<div class="container">
			<!--header-->
			<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType='2' >
				
			</vant-header>
			<!--安全质量nav-->
			<iframe src="https://www.jiandaoyun.com/sso/custom/5dbea33f85bed20006e0e5e4/iss" width="100%" height="650" frameborder="0" scrolling="auto" style="
			position:absolute;top: 46px;left: 0px;right: 0;">
			</iframe>
			
	
		</div>
</template>

<script>
	import vantHeader from '@/components/header.vue'
	export default {
		data(){
			return{
				questionText:"应用管理"
			}
		},
		components:{
			vantHeader
		},
		created() {
		},
		mounted(){
			
		},
		methods: {
			
		}
		
	}
</script>

<style scoped>
.container{padding-top:46px;}

</style>

