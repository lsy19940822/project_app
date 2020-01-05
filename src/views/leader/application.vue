<template>
	<div class="container">
			<!--header-->
			<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType='2' >
				
			</vant-header>
			<!--安全质量nav-->
			
			<iframe ref='iframe1' :src="href" width="100%" height="650" frameborder="0" scrolling="auto" style="
			position:absolute;top: 46px;left: 0px;right: 0;">
			</iframe>
			
	
		</div>
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import * as ajax from '@/utils/api'
	export default {
		data(){
			return{
				questionText:"安全质量",
				href:"",
				userData:{}
			}
		},
		components:{
			vantHeader
		},
		created() {
			
			let userData=sessionStorage.getItem("chang_yi_UserData")
			Object.assign(this.userData, JSON.parse(userData));
			// console.log(this.userData.USERID)
			ajax.postW('/sys/jdy/appGetUserIdLg?userid='+this.userData.USERID).then(res => {
				if(res.data.success == true){
					console.log(this.userData.USERID)
					this.href="https://www.jiandaoyun.com/sso/custom/5dbea33f85bed20006e0e5e4/iss"
				}
				console.log(res.data.success)
			});
			
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

