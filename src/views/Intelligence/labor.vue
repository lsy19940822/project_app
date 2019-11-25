<template>
	<div>
		<div class="containers overflow">
			<!-- <div v-model="value1" :id="value1">value1</div> -->
			<div class="container_header overflow">
				<van-dropdown-menu class='van-dropdown' >
				   <van-dropdown-item :id="value1" v-model="value1" :options="option1" @change="change1(value1)"/>
				   <van-dropdown-item :id="value2" :disabled="disabledSection" v-model="value2" :options="option2" @change="change2(value2)"/>
				</van-dropdown-menu>		
			</div>
		</div>
		<div class="container_nav">
			 <div class="navLists">
				<p style="font-size:13px;margin: 0;">
					 <span><img src="../../assets/images/index_icon/icon_zcq@2x.png" alt="" width="11px"></span>
					 <span style="color:rgba(102,102,102,1);">总出勤职工</span>
					 <span style="float: right;">
						 <span>{{user.UserNumber}}人</span>
						 <span style="color:rgba(64,69,94,1);">/{{user.AllUserNumber}}人</span>
					 </span>
				</p>
				 <p  style="margin-bottom: 0;">
					 <van-progress color="#6A94B9" :percentage="percentage.percentage1" stroke-width="6" />
				 </p>
			 </div>
		</div>
		<div class="container_list container_lists" :style="{'height': !eachatft ? '100px' : 'auto'}">
			<p class="van-hairline--bottom exam-title"><img src="../../assets/images/safeQuality/icon_pro@2x.png" alt="">工种统计</p>
			<div class="flase" v-show="!eachatft" style="text-align:center;padding:20px;font-size: 14px;color: #ddd;">暂无工种统计</div>		
			<div id="chart_example" :class="{isShowEt: !eachatft}">
				 
			</div>
		</div>
		<div class="container_list container_lists" :style="{'height': !eachatft ? '100px' : 'auto'}">
			<p class="van-hairline--bottom exam-title"><img src="../../assets/images/safeQuality/icon_bor@2x.png" alt="">人员变化</p>
			<div class="flase" v-show="!eachatft"style="text-align:center;padding:20px;font-size: 14px;color: #ddd;">暂无人员变化</div>		
			<div id="chart_examples" :class="{isShowEt: !eachatft}">
				 
			</div>
		</div>
	</div>
</template>

<script>
	import * as ajax from '@/utils/api'
	import Vue from 'vue';
	import {Icon, IndexBar, IndexAnchor } from 'vant';
	 
	Vue.use(IndexBar).use(IndexAnchor).use(Icon);
	import {Row,Col,Progress, DropdownMenu, DropdownItem, Cell,Loading,Tab, Tabs   } from 'vant';
	
	Vue.use(Progress).use(Row).use(Col).use(DropdownMenu).use(DropdownItem).use(Cell).use(Loading).use(Tabs).use(Tab);
	
	export default {
		data() {
			return {
				value1:0,
			    value2:0,
				option1: [
					{ text: 'CYCZQ-1标', value: 0},
					{ text: 'CYCZQ-2标', value: 1},
					{ text: 'CYCZQ-3标', value: 2},
					{ text: 'CYCZQ-4标', value: 3},
					{ text: 'CYCZQ-5标1', value: 4},
					{ text: 'CYCZQ-5标2', value: 5},
					{ text: 'CYCZQ-6标', value: 6},
				],
			    
				option2: [
					{ text: '全部工点',value:0}
				],
				TypeWork:'',//工种
				Unit:'',//单位
				Section:'',//所在标段
				NameArrS:[],
				examRecord:[],
				// 1.1.1.获取全部人员数量参数
				BD:"",
				GD:"",
				eachatDataX:[],
				eachatDataY:[],
		        eachatft:false,
				disabledSection:false,
				user:{
					UserNumber:'',
					AllUserNumber:'',
					
				},
				percentage:{
					percentage1:0
				},
			}
		},
		created() {
			this.value1=Number(this.$route.query.ValueId)
		this.change1(this.value1)
			// if(this.value1 == 0||this.value1 == 2||this.value1 == 3||this.value1 == 4||this.value1 == 5||this.value1 == 6){
			// 	this.eachatft = false;
			// }else if(this.value1 == 1){
			// 	this.eachatft = true;
			// }
			localStorage.setItem("labor_value_id",this.value1)
			this.StaffRetrieveList();
			this.getWorkUserNumberS()
			this.capacityEachart();
			this.capacityEachartS();
			
		},
		mounted() {
			
		},
		computed:{
			
		},
		methods: {
			change1(val){
				this.Section = this.option1[val].text
				console.log("当前标段：",this.option1[val].text)
				this.option2.splice(1);
				this.StaffRetrieveList();
				this.capacityEachart();
				this.capacityEachartS();
				this.getWorkUserNumberS()
				if(val == 1){
					this.eachatft = true;
				}else{
					this.eachatft = false;
				}
				localStorage.setItem("labor_value_id",val)
			},
			change2(val){
				// this.Unit = this.option2[val].text
				this.Unit = this.option2[val].text.replace("#", "%23")
				// this.option2.splice(1);
				console.log("当前工点：",this.option2[val].text)
			    this.getWorkUserNumberS()
				// this.StaffRetrieveList();
				this.capacityEachart();
				this.capacityEachartS();
				this.getWorkUserNumberS()
			},
			// 工种统计
			capacityEachart(){
			  let this_ = this;
			 if(this.Unit == "全部工点"){
				 this.Unit='';
			 }
			  ajax.get('/API/WebAPIDataAudit/getUserTypeNumber?BD='+this.Section+'&GD='+this.Unit).then(res => {
			  	
			  	if(res.data.result) {
					if(res.data.data==""){
						this.eachatft = false;
					}else{
						this.eachatft = true;
					}
			  		let myChart = this.$echarts.init(document.getElementById('chart_example'));
			  	    this.eachatDataX=res.data.data;
					var eachatData_xAxis=[]
					for(var i = 0;i<this.eachatDataX.length;i++){
					    eachatData_xAxis.push(this.eachatDataX[i].WORKTYPE)
					}
					var eachatData_yAxis=[]
					for(var i = 0;i<this.eachatDataX.length;i++){
					    eachatData_yAxis.push(this.eachatDataX[i].COUNT)
					}
					var dataShadow = [];
					
					let option = {
					    xAxis: {
					        data: eachatData_xAxis,
							axisLabel: {
							    interval:0,
							    formatter:function(value){
								   return value.split("").join("\n");
							    }
							},
							axisTick: {
							    alignWithLabel: true
							}
					    },
						grid: {
							left: '10%',
							bottom:'30%',
							
						},
					    yAxis: {
					        
					    },
					    dataZoom: [
					        {
					            type: 'inside',
					            throttle:'50',
					            minValueSpan:4,
					            start: 0,
					            end: 20
					        }
					    ],
						
					    series: [
					        {
					       		name:'人数',
					       		type:'bar',
					       		barWidth :20,//柱图宽度
					       		data:eachatData_yAxis
					       	}
					    ]
					};
					
					myChart.setOption(option);
					//建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
					window.addEventListener('resize',function() {myChart.resize()});
			  	}
			  })
			},
			capacityEachartS(){
				let date=new Date()
				let year=date.getFullYear();
				console.log("year",year)
				ajax.get('/API/WebAPIDataAudit/getPeopleNumber?year='+year).then(res => {
					
					if(res.data.result) {
						console.log("getUserTypeNumber",res)
					    this.eachatDataY=res.data.data;
						var eachatData_xAxis=[]
						for(var i = 0;i<this.eachatDataY.length;i++){
						    eachatData_xAxis.push(this.eachatDataY[i].MONTH)
						}
						var eachatData_yAxis=[]
						for(var i = 0;i<this.eachatDataY.length;i++){
						    eachatData_yAxis.push(this.eachatDataY[i].PEOPLENUMBER)
						}
						let myChart = this.$echarts.init(document.getElementById('chart_examples'));
						let option = {
							grid: {
								left: '0%',
								right: '0%',
								bottom: '10%',
								containLabel: true
							},
						    xAxis: {
						        type: 'category',
						        data : eachatData_xAxis,
						    },
						    yAxis: {
						        type: 'value'
						    },
						    series: [{
						        data: eachatData_yAxis,
						        type: 'line'
						    }]
						};
						
						myChart.setOption(option);
						//建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
						window.addEventListener('resize',function() {myChart.resize()});
					}
				})
			  
				
			},
			
			
			StaffRetrieveList() {
                ajax.get('/API/WebAPIDataAudit/GetWorkarea?Section='+this.Section).then(res => {	
					if(res.data.result == false){
						this.disabledSection=true;
						return;
					}
					if(res.data.result == true){
						for(let k in res.data.data) {
							if(res.data.data[k].WORKAREA != null){
								this.option2.push({
									text:res.data.data[k].WORKAREA,
									value:Number(k)
								})
							}
						}
						this.disabledSection=false;
						return;
					}
				})
				
			},
			getWorkUserNumberS(){
				ajax.get('/API/WebAPIDataAudit/getWorkUserNumber?BD='+this.Section+'&GD='+this.Unit).then(res => {
					console.log(res.data.data)
					if(res.data.data.UserNumber !=0 || res.data.data.UserNumber !=0 ||res.data.data.UserNumber >0 || res.data.data.UserNumber >0){
						this.user.UserNumber=res.data.data.UserNumber
						this.user.AllUserNumber=res.data.data.AllUserNumber
						this.percentage.percentage1=Number((this.user.UserNumber/this.user.AllUserNumber)*100)
					}else{
						this.user.UserNumber=0
						this.user.AllUserNumber=0
						this.percentage.percentage1=0
					}
					
				})
			}
		}
	}
</script>

<style scoped>
	.container_list{
	    height: auto;
	    overflow: hidden;
	    background: #fff;
	    -webkit-box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.1);
	    box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.1);
	    margin-top: 10px;
	}
	#chart_example{
	    width: 90%;
	    height: 320px;
	    margin: 0 auto;
	}
	#chart_examples{
	    width: 90%;
	    height: 320px;
	    margin: 0 auto;
	}
	.container_nav{
	    height: auto;
	    overflow: hidden;
	    border-bottom: 1px solid rgba(238,238,238,1);
	    padding: 16px;
		background: #fff;
	}
	.van-hairline--bottom{
	    height: 40px;
	    line-height: 40px;
	    font-size: 14px;
	    padding-left: 14px;
	    font-family: PingFangSC-Regular,PingFang SC;
	    font-weight: 400;
	    color: rgba(51,51,51,1);
	    line-height: 40px;
	    margin: 0;
	    border-bottom: 1px solid rgba(238,238,238,1);
	}
	.van-hairline--bottom img{
	    width: 12px;
	    height: 12px;
	    float: left;
	    margin-right: 5px;
	    margin-top: 14px;
	}
	.l-dropdown{
	    padding: 10px 0;
	    background: #fff;
	}
	.vanCell img{
	    width:27px;
		height:38px;
		border:1px solid #ddd;
		border-radius: 5px;
		background: #f2f2f2;
		display: block;
		float: left;
		margin-right: 10px;
		
	}
	.vanCell span{
	    display: block;
		float: left;
		line-height: 38px;
		
	}
	.vanCell span:last-child{
		/* width: ; */
	    display: block;
		float: right;
		line-height: 38px;
		margin-right: 10%;
		text-align: right;
		
	}
	.van-nav-bar .van-icon {font-size: 18px;color: #fff;}
	.header-right {
		line-height: 5px;
		color:#fff;
	}
	.isShowEt {
		visibility: hidden;
		/*height: 0!important;*/
		overflow: hidden;
	}
	.containers{background: #fff;padding:12px;border-bottom:1px solid #ddd}

    /deep/  .van-tabs__line {
	    background-color: #9499AA;
	    width: 50% !important;
	}
  /deep/.containers-bar .van-index-bar__sidebar{
	  margin-top: 90px;
  }
  /deep/.containers-bar .van-index-anchor{
	  height: 20px;
	  line-height: 20px;
  }
</style>
