<template>
	<div class="study">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2"></vant-header>
		<div class="container overflow">
			
			<ul class="overflow">
				<li>
					<van-cell is-link>
						<span>528# 梁 - 1号梁</span>
						<span style="color:#69966F">已完成</span>
					</van-cell>
					
				</li>
				<li>
					<van-cell is-link>
						<span>528# 梁 - 2号梁</span>
						<span style="color:#E19B52">超期已完成</span>
					</van-cell>
				</li>
				<li>
					<van-cell is-link @click="$router.push({path:'/fill'})">
						<span>528# 梁 - 3号梁</span>
						<span style="color:#AAAAAA">未填报</span>
					</van-cell>
				</li>
			</ul>
			<!-- <van-loading class="spinner" v-if = 'isLoading' size="24px" type="spinner">加载中...</van-loading> -->
		</div>
		<!-- <study-footer></study-footer> -->
	</div>
	
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import * as ajax from '@/utils/api'
	import Vue from 'vue';
	import { DropdownMenu, DropdownItem, Cell,Loading } from 'vant';
	
	Vue.use(DropdownMenu).use(DropdownItem).use(Cell).use(Loading);
	
	export default {
		components: {
			vantHeader,
		},
		data() {
			return {
				questionText:this.$route.query.name,
				
				isLoading:true,
			}
		},
		created() {
			this.GetMenuTreeList();
		},
		mounted() {
			
		},
		
		methods: {
			GetMenuTreeList(){
				//智能进度
				// ajax.get('/API/WebAPIDataAudit/GetMenuTree?id=b1'+"&name=").then(res => {
					// if(res.data.result) {
						// this.Treedata=res.data.data;
						// for(let k in res.data.data) {
						//    this.option1.push({text:res.data.data[k].NAME,value:Number(k),id:res.data.data[k].ID})
						// }	
						ajax.get('/API/WebAPIDataAudit/GetMenuTree?id='+this.$route.query.id+"&name=").then(res => {
							if(res.data.result) {
							    this.TreedataO=res.data.data;
								if(res.data.data.length!=''){
									this.show=true
								}else{
									this.show=false
								}
								console.log('智能进度GetMenuTre3:',this.TreedataO)
								for(let k in res.data.data) {
								   this.option2.push({text:res.data.data[k].NAME,value:Number(k)+Number(1)})
								}	
							}
						})
					// }
				// })
			}
		}
	}
</script>

<style scoped>
	
	.van-dropdown-menu{
	    width: 90%;
	    margin: 0 auto;
	}
	.l-dropdown{
	    padding: 10px 0;
	    background: #fff;
	}
	
	.spinner{
	    text-align: center;
	    font-size: 12px;
	    padding: 15px 0;
	}
	.header-right {
		line-height: 5px;
		color:#fff;
	}
	.container{
		padding-top: 46px;
		background: #fff;
		margin-bottom: 59px;
	}
	.container_header{
		border-bottom:1px solid #eee;
	}
	.container_list li{
		padding: 14px 16px;
		border-bottom:1px solid #eee;
	}
	li{
		border-bottom: 1px solid #EEEEEE;
	}
	li:last-child{
		border-bottom:none;
	}
	li span:last-child{
		float: right;
		display: block;
	}
	.container_list li .left_img{
		width:100px;
		height:80px;
		border-radius:3px;
		border:1px solid rgba(170,170,170,1);
		
		float: left;
	}	
	.container_list li .left_img img{
		display: block;
		border-radius:3px;
		float: left;
	}
	.right_title{
		padding-top: 2px !important;
		padding-right: 0 !important;
		padding-bottom: 0 !important;
		padding-left: 8px;
	}
	.right_title li{
		padding: 0 !important;
		border-bottom:none ;
	}
	.right_title li:first-child{
		font-size:14px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:16px;
	}
	.right_title li:nth-of-type(2){
		width:64px;
		height:20px;
		background:rgba(255,255,255,1);
		border-radius:2px;
		border:1px solid rgba(64,83,139,1);
		font-size:12px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(64,83,139,1);
		line-height:18px;
		text-align: center;
		margin-top: 12px;
	}
	.right_title li .van-cell{
		padding: 0 !important;
		
	}
	.right_title li span:first-child{
		color:#AAAAAA;
		font-size:12px;
		margin-top: 14px;
		display: block;
		float: left;
		line-height:12px;
	}
	.right_title li span:last-child{
		color:rgba(112,153,208,1);
		line-height:12px;
		margin-top: 14px;
		font-size:12px;
		float: right;
	}
	.right_title li .van-icon{
		margin-top: 8px;
		color:rgba(112,153,208,1);
	}
</style>
