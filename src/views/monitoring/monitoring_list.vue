<template>
	<div class="study">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2">
			<!-- <div slot='right_slot'  @click="$router.push({path:'/staffNew'})">
				<p class="header-right"><img src="../assets/images/index_icon/icon_l.png" alt=""></p>
			</div> -->
		</vant-header>
		<div class="container overflow">
			<div class="container_header overflow l-dropdown">
				<van-dropdown-menu class='van-dropdown'>
				  <van-dropdown-item v-model="value1" :options="option1" />
				  <van-dropdown-item v-model="value2" :options="option2" />
				</van-dropdown-menu>
			</div>
			<ul class="container_list overflow">
				<li class="overflow">
					<div class="list_l overflow"><img src="" alt="" @click="show = true"><p>【5标-1】 指挥部侧门</p></div>
					<div class="list_r overflow"><img src="" alt="" @click="show = true"><p>【5标-1】 指挥部侧门</p></div>
				</li>
				<li class="overflow">
					<div class="list_l overflow"><img src="" alt=""><p>【5标-1】 指挥部侧门</p></div>
					<div class="list_r overflow"><img src="" alt=""><p>【5标-1】 指挥部侧门</p></div>
				</li>
				<li class="overflow">
					<div class="list_l overflow"><img src="" alt=""><p>【5标-1】 指挥部侧门</p></div>
					<div class="list_r overflow"><img src="" alt=""><p>【5标-1】 指挥部侧门</p></div>
				</li>
			</ul>
			<van-dialog
			  v-model="show"
			  title="【5标-1】 指挥部侧门"
			  :showCancelButton='false'
			  confirmButtonText='关闭'
			>
			
			  <img src="https://img.yzcdn.cn/vant/apple-3.jpg" width="100%">
			</van-dialog>
			<!-- <van-loading class="spinner" v-if = 'isLoading' size="24px" type="spinner">加载中...</van-loading> -->
		</div>
		<!-- <study-footer></study-footer> -->
	</div>
	
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import studyFooter from '@/components/studyFooter.vue'
	import * as ajax from '@/utils/api'
	import Vue from 'vue';
	import { DropdownMenu, DropdownItem, Cell,Loading } from 'vant';
	
	import { Dialog } from 'vant';
	Vue.use(Dialog);
	Vue.use(DropdownMenu).use(DropdownItem).use(Cell).use(Loading);
	
	export default {
		components: {
			vantHeader,
			studyFooter
		},
		data() {
			return {
				questionText:"视频监控",
				value1: 0,
			    value2: 0,
				show:false,
				option1: [
					{ text: '1标', value: 0 },
					{ text: '2标', value: 1 },
					{ text: '3标', value: 2 },
					{ text: '4标', value: 3 },
					{ text: '5标-1', value: 4},
					{ text: '5标-2', value:5 },
					{ text: '6标', value: 6},
				],
			    option2: [
					{ text: '全部工点', value: 0 },
					
			    ],
				isLoading:true,
				SectionS:null,
				WorksiteS:null
				
			}
		},
		created() {
			
		},
		mounted() {
			this.getUserWorkPointList()
		},
		methods: {
			getUserWorkPointList(){
				
				//视频
				ajax.get('GetElectricQuantityParticulars?Section=' +''+'&Worksite='+ '').then(res => {
					
					if(res.data.result) {
						
						console.log('视频GetElectricQuantity:',res.data.data)
					}
				})
				// ajax.get('StaffRetrieve?Section=' +''+'&Unit='+'' +'&TypeWork='+'' ).then(res => {
					
				// 	if(res.data.result) {
				// 		console.log('全部员工StaffRetrieve:',res.data.data)
				// 	}
				// })
				
				// let that=this;
				// ajax.get('GetElectricQuantity?Section='+this.SectionS+'&Worksite='+this.WorksiteS).then(res => {
				// 	if(res.data.result) {
				// 		console.log("GetElectricQuantity：",res.data.data)
				// 	}
				// })
				// 工点
				// ajax.get('getUserWorkPoint').then(res => {
				// 	if(res.data.result) {
				// 		console.log("1.1.2.获取全部工点名称",res)
				// 		for(let k in res.data.data) {
				// 		   this.option2.push({text:res.data.data[k].WORKPOINT,value:Number(k) + Number(1) })
				// 		   // NameArr.push(res.data.data[k])
				// 		}	
				// 		console.log("=======",this.option2)
				// 	}
				// })
			}
		}
	}
</script>

<style scoped>
	/deep/
	.van-dialog{
		top: 55%;
	}
	/deep/
	.van-dialog__header{
		text-align: left;
		padding-bottom: 15px;
	}
	/deep/
	.van-dialog .van-button {
		background:rgba(238,238,238,1);
	}
	/deep/
	.van-dialog__confirm, .van-dialog__confirm:active {
		color: #333;
	}
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
	.container_list li img{
		display: block;
		width: 100%;
		height: 104px;
		background: #333;
	}
	.list_l,.list_r{
		width: 48%;
		float: left;
		
	}
	.list_r{
		float:right;
	}
	p{
		margin-bottom: 0;
	}
</style>
