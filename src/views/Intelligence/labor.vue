<template>
	<div>
		<div class="containers overflow">
			<!-- <div v-model="value1" :id="value1">value1</div> -->
			<div class="container_header overflow">
				<van-dropdown-menu class='van-dropdown' >
				   <van-dropdown-item :id="value1" v-model="value1" :options="option1" @change="change1(value1)"/>
				   <van-dropdown-item :id="value1" v-model="value2" :options="option2" @change="change2(value2)"/>
				</van-dropdown-menu>		
			</div>
		</div>
		<div class="container_nav">
			 <div class="navLists">
				<p style="font-size:13px;margin: 0;">
					 <span><img src="../../assets/images/index_icon/icon_zcq@2x.png" alt="" width="11px"></span>
					 <span style="color:rgba(102,102,102,1);">总出勤职工</span>
					 <span style="float: right;">
						 <span>32,234人</span>
						 <span style="color:rgba(64,69,94,1);">/38,762人</span>
					 </span>
				</p>
				 <p  style="margin-bottom: 0;">
					 <van-progress color="#6A94B9" :percentage="56" stroke-width="6" />
				 </p>
			 </div>
		</div>
		<div class="container_list container_lists">
			<p class="van-hairline--bottom exam-title"><img src="../../assets/images/safeQuality/icon_pro@2x.png" alt="">工种统计</p>
			<div id="chart_example">
				 
			</div>
		</div>
		<div class="container_list container_lists">
			<p class="van-hairline--bottom exam-title"><img src="../../assets/images/safeQuality/icon_bor@2x.png" alt="">人员变化</p>
			<div id="chart_examples">
				 
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
					{ text: 'CYCZQ-1标', value: 0, name:'1标'},
					{ text: 'CYCZQ-2标', value: 1, name:'2标'},
					{ text: 'CYCZQ-3标', value: 2, name:'3标'},
					{ text: 'CYCZQ-4标', value: 3, name:'4标'},
					{ text: 'CYCZQ-5标1', value: 4, name:'5-1标'},
					{ text: 'CYCZQ-5标2', value: 5, name:'5-2标'},
					{ text: 'CYCZQ-6标', value: 6, name:'6标'},
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
				eachatDataX:[]
			}
		},
		created() {
			this.value1=Number(this.$route.query.ValueId)
			localStorage.setItem("labor_value_id",this.value1)
		},
		mounted() {
			this.StaffRetrieveList();
			this.capacityEachart();
			this.capacityEachartS();
		},
		computed:{
			
		},
		methods: {
			// 工种统计
			capacityEachart(){
			  let this_ = this;
			  let myChart = this.$echarts.init(document.getElementById('chart_example'));
			  // 1.1.3.获取每个工种类别下的人员数量
			  // BD	String	输入文本如: '2标'
			  // GD	String	输入文本如: '汉寿梁场'
			  this.BD="2标";this.GD="汉寿梁场"
			  ajax.get('/API/WebAPIDataAudit/getUserTypeNumber?BD='+this.BD+'&GD='+this.GD).then(res => {
			  	
			  	if(res.data.result) {
			  		
			  	    this.eachatDataX=res.data.data;
					console.log("获取每个工种类别下的人员数量",this.eachatDataX)
					var eachatData_xAxis=[]
					for(var i = 0;i<this.eachatDataX.length;i++){
					    eachatData_xAxis.push(this.eachatDataX[i].WORKTYPE)
					}
					var eachatData_yAxis=[]
					for(var i = 0;i<this.eachatDataX.length;i++){
					    eachatData_yAxis.push(this.eachatDataX[i].COUNT)
					}
					console.log("eachatData_xAxis",this.eachatDataX.length,eachatData_xAxis,eachatData_yAxis)
					let option = {
						color: ['#f44'],
						tooltip : {
						  trigger: 'axis',
						  axisPointer : {
							type : 'shadow'
						  }
						},
						grid: {
							left: '0%',
							right: '0%',
							bottom: '10%',
							containLabel: true
						},
						xAxis : [
						  {
							type : 'category',
							data :eachatData_xAxis,
							axisTick: {
							  alignWithLabel: true
							}
						  }
						],
						yAxis : [
						  {
							type : 'value'
						  }
						],
						series : [
						  {
							name:'人数',
							type:'bar',
							barWidth: '60%',
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
				// 1.1.3.获取每个工种类别下的人员数量
				// BD	String	输入文本如: '2标'
				// GD	String	输入文本如: '汉寿梁场'
				// this.BD="2标";this.GD="汉寿梁场"
				// ajax.get('/API/WebAPIDataAudit/getUserTypeNumber?BD='+this.BD+'&GD='+this.GD).then(res => {
					
				// 	if(res.data.result) {
				// 		console.log("getUserTypeNumber",res)
				// 	    this.eachatDataX=res.data.data;
				// 	}
				// })
				// ajax.get('/API/WebAPIDataAudit/getUserNumber?BD='+this.BD+'&GD='+this.GD).then(res => {
					
				// 	if(res.data.result) {
				// 		console.log("getUserNumber",res)
					
				// 	}
				// })
				
			  let this_ = this;
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
			          data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
			      },
			      yAxis: {
			          type: 'value'
			      },
			      series: [{
			          data: [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12],
			          type: 'line'
			      }]
			  };

			  myChart.setOption(option);
			  //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
			  window.addEventListener('resize',function() {myChart.resize()});
				
			},
			change1(val){
				this.Section = this.option1[val].name
				console.log("当前标段：",this.option1[val].name)
				this.StaffRetrieveList() 
			},
			change2(val){
				this.Unit = this.option2[val].text
				console.log("当前工点：",this.option2[val].text)
			},
			
			StaffRetrieveList() {
                ajax.get('/API/WebAPIDataAudit/getUserWorkPoint?Section='+this.Section).then(res => {
					
					if(res.data.result) {
						console.log("全部工点名称",res)
						for(let k in res.data.data) {
						   this.option2.push({text:res.data.data[k].WORKAREA,value:Number(k) + Number(1) })
						   
						}	
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
