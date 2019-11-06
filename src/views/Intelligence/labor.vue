<template>
	<div>
		<div class="containers overflow">
			<div class="container_header overflow">
				<van-dropdown-menu class='van-dropdown'>
				   <van-dropdown-item v-model="value1" :options="option1" @change="change1(value1)"/>
				   <van-dropdown-item v-model="value2" :options="option2" @change="change2(value2)"/>
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
			<p class="van-hairline--bottom exam-title"><img src="../../assets/images/safeQuality/icon_t@2x (3).png" alt="">7天{{$route.query.type==1?'电量':'水量'}}统计</p>
			<div id="chart_example">
				 
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
					{ text: '全部标段', value: 0 },
					{ text: '1标', value: 1 },
					{ text: '2标', value: 2 },
					{ text: '3标', value: 3 },
					{ text: '4标', value: 4 },
					{ text: '5-1标', value: 5 },
					{ text: '5-2标', value: 6 },
					{ text: '6标', value: 7 },
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
			}
		},
		created() {
			
		},
		mounted() {
			
			this.StaffRetrieveList();
			this.capacityEachart();
			// this.drawLineMothes();
			
		},
		computed:{
			
		},
		methods: {
			capacityEachart(){
			  let this_ = this;
			  let myChart = this.$echarts.init(document.getElementById('chart_example'));
			  let option = {
				color: ['#f44'],
				tooltip : {
				  trigger: 'axis',
				  axisPointer : {
					type : 'shadow'
				  }
				},
				xAxis : [
				  {
					type : 'category',
					data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月',],
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
					name:'每月花费',
					type:'bar',
					barWidth: '60%',
					data:[995,666,444,858,654,236,645,546,846,225,547,356]
				  }
				]
			  };
			  myChart.setOption(option);
		 
			  //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
			  window.addEventListener('resize',function() {myChart.resize()});
				
			},
			change1(val){
				this.Section = this.option1[val].text
				console.log("当前标段：",this.option1[val].text)
			},
			change2(val){
				this.Unit = this.option2[val].text
				console.log("当前工点：",this.option2[val].text)
			},
			
			StaffRetrieveList() {
			
                ajax.get('getUserWorkPoint').then(res => {
					
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
	#chart_example{
	    width: 90%;
	    height: 500px;
	    margin: 0 auto;
	}
	.container_nav{
	    height: auto;
	    overflow: hidden;
	    border-bottom: 1px solid rgba(238,238,238,1);
	    padding: 16px;
		background: #fff;
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
