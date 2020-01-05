<template>
	<div class="study">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2">
			
		</vant-header>
		<div class="container overflow">
			<div class="container_header overflow l-dropdown">
				<van-dropdown-menu class='van-dropdown'>
				  <van-dropdown-item v-model="value1" :options="option1" @change="change1(value1)"/>
				  <van-dropdown-item v-model="value2" :options="option2" @change="change2(value2)"/>
				</van-dropdown-menu>
			</div>
			<!-- <van-loading class="spinner" v-if = 'isLoading' size="24px" type="spinner">加载中...</van-loading> -->
		</div>
		<div class="flase" v-show="show" style="text-align:center;padding:20px;font-size: 14px;color: #ddd;">暂无数据</div>
		<ul class="overflow" v-show="!show">
			<li v-for="(item,index) in data" :key="index" @click="linkButton(item,item.TimeDays)">
				<van-cell is-link>
					<span v-if="item.PNAME!= null" style="width:150px;display: inline-block;">{{item.PNAME}} - {{item.NAME}}</span>
					<span v-else style="width:150px;display: inline-block;">{{item.NAME}}</span>
					<!-- <span style="color:#AAAAAA;font-size:14px;">{{item.REALENDDATE}}</span> -->
					<span :style="{'color':(item.STATUS==4?'#E19B52':'#C86565')}">{{item.STATUS==4?"超期已完成":"超期未完成"}}</span>
					<!-- <span style="color:#5986C2;font-size:14px;float: right;" v-if="item.STATUS == 1 || item.STATUS == 2">填报</span> -->
					<!-- <span style="font-size:14px;float: right;" v-if="item.STATUS == 3 || item.STATUS == 4 || item.STATUS == 5" :style="{'color':(item.TimeDays>30?'#AAAAAA':'#DA9F63')}">{{item.TimeDays>30?'查看':'修改'}}</span> -->
				</van-cell>
			</li>
		</ul>
		<!-- <study-footer></study-footer> -->
	</div>
	
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import studyFooter from '@/components/studyFooter.vue'
	import Vue from 'vue';
	import { DropdownMenu, DropdownItem, Cell,Loading } from 'vant';
	
	Vue.use(DropdownMenu).use(DropdownItem).use(Cell).use(Loading);
	import * as ajax from '@/utils/api'
	
	export default {
		components: {
			vantHeader,
			studyFooter
		},
		data() {
			return {
				questionText:"超期工程",
				value1: 0,
			    value2: 0,
				option1: [
					{ text: 'CYCZQ-1标', value: 0 },
					{ text: 'CYCZQ-2标', value: 1 },
					{ text: 'CYCZQ-3标', value: 2 },
					{ text: 'CYCZQ-4标', value: 3 },
					{ text: 'CYCZQ-5标1', value: 4 },
					{ text: 'CYCZQ-5标2', value: 5},
					{ text: 'CYCZQ-6标', value: 6 }
				],
			    option2: [
					{ text: '全部超期工程', value: 0 },
					{ text: '超期已完成', value: 1 },
					{ text: '超期未完成', value: 2 },
			    ],
				data:[],
				state:'',
				show:false,
				Ablock:''
			}
		},
		created() {
			this.value1= Number(this.$route.query.index);
			this.Ablock = this.option1[this.value1].text
			this.GetMenuTreeList();
		},
		mounted() {
		},
		methods: {
			change1(val) {
				this.Ablock = this.option1[val].text
				this.value2=Number(0);
				this.state= ''
				this.GetMenuTreeList();
				
			},
			change2(val) {
				console.log(val)
				if(val == 0){
					this.state= ''
				}else if(val == 1){
					this.state= 4
				}else if(val == 2){
					this.state= 5
				}
				this.GetMenuTreeList();
			},
			linkButton(item,TimeDays){
				console.log("linkButton",item,TimeDays)
				sessionStorage.setItem("GetMenuTree_Data",JSON.stringify(item));
				if(item.TimeDays>30){
					this.$router.push({
						path:'/fillX',
						query:{
							TimeDays:TimeDays
						}
					})
				}else{
					this.$router.push({
						path:'/fill',
						query:{
							TimeDays:TimeDays
						}
					})
				}
			},
			GetMenuTreeList() {
				//智能进度
				ajax.get('/API/WebAPIDataAudit/GetMenuTree?id=' + "&name=" +this.Ablock +"&state="+'').then(res => {
					if (res.data.result) {
						ajax.get('/API/WebAPIDataAudit/getAreProject?id='+res.data.data[0].ID+'&state='+this.state).then(res => {
							if(res.data.result == true){
								this.show=false;
								this.data=res.data.data
								for(let item in this.data){
									let time=new Date();
									let usedTime
									if(new Date(this.data[item].REALENDDATE)<time){
										usedTime = time - new Date(this.data[item].REALENDDATE); // 相差的毫秒数
									}else{
										usedTime =new Date(this.data[item].REALENDDATE) - time; // 相差的毫秒数
									}
									let days = Math.floor(usedTime / (24 * 3600 * 1000)); // 计算出天数
									console.log("填报时间：",days)
									if(this.data[item].REALENDDATE != null){
										this.data[item].REALENDDATE=this.data[item].REALENDDATE.replace("T00:00:00","")
										this.data[item].TimeDays=days;
									}else{
										this.data[item].TimeDays=0;
									}
								}
							}else{
								this.show=true;
							}
							
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	ul{
		background: #fff;
		margin-bottom: 59px;
	}
	.van-dropdown-menu{
	    width: 92%;
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
