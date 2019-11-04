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
				  <van-dropdown-item v-model="value1" :options="option1" @change="change1(value1)"/>
				  <van-dropdown-item v-model="value2" :options="option2" @change="change2(value2)"/>
				</van-dropdown-menu>
			</div>
			<ul class="container_list overflow">
				<li class="overflow" v-for='(item,index) in GetVideoData' :key="index">
					<img :src="item.VIDEOURL" alt="" @click="show = true"><p>【{{item.SECTION}}】 {{item.VIDEONAME}}</p>
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
	
	import Vue from 'vue';
	import { DropdownMenu, DropdownItem, Cell,Loading } from 'vant';
	
	import { Dialog } from 'vant';
	Vue.use(Dialog);
	Vue.use(DropdownMenu).use(DropdownItem).use(Cell).use(Loading);
	import * as ajax from '@/utils/api'
	export default {
		components: {
			vantHeader,
			studyFooter
		},
		data() {
			return {
				questionText:"视频监控",
				value1:0,
			    value2: 0,
				show:false,
				GetVideoData:[],
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
				Section:'',
				Worksite:''
				
			}
		},
		created() {
			// 
			
		},
		mounted() {
			this.getUserWorkPointList()
			
		},
		methods: {
			change1(val){
				this.Section = this.option1[val].text
				console.log("当前标段：",this.option1[val].text)
			},
			change2(val){
				this.Worksite = this.option2[val].text
				console.log("当前工点：",this.option2[val].text)
			},
			getUserWorkPointList(){
				let that = this;
				// this.$route.query.id=this.value1;
				// console.log(this.value1,this.$route.query.value);
				//视频
				ajax.get('GetVideo?Section=' +this.Section+'&Worksite='+ this.Worksite).then(res => {
					if(res.data.result) {
						console.log('视频GetVideo:',res.data.data)
					    that.GetVideoData=res.data.data;
					}
				})
				// 工点
				ajax.get('getUserWorkPoint').then(res => {
					if(res.data.result) {
						console.log("1.1.2.获取全部工点名称",res)
						for(let k in res.data.data) {
						   this.option2.push({text:res.data.data[k].WORKAREA,value:Number(k) + Number(1) })
						   // NameArr.push(res.data.data[k])
						}	
						console.log("工点：",this.option2)
					}
				})
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
	.container_list{
		padding: 14px 16px 0;
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
		width: 48%;
		float: left;
		padding-bottom: 16px;
		border-bottom:1px solid #eee;
	}
	.container_list li:nth-of-type(2n){
		float:right;
	}
	.container_list li img{
		display: block;
		width: 100%;
		height: 104px;
		background: #333;
	}
	p{
		margin-bottom: 0;
	}
</style>
