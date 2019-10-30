<template>
	<div class="container">
		<vant-header :leftArrow="false" :titleType="1" :title="questionText" :rightType="2">
			<div slot='right_slot'>
				<p class="header-right"><img src="../../assets/images/index_icon/icon_l.png" alt=""></p>
			</div>
		</vant-header>
		<van-tabs v-model="active">
		  <van-tab title="劳务统计">
			<div class="containers overflow">
				<ul class="container_header overflow l-dropdown">
					<van-dropdown-menu class='Intelligence-dropdown'>
					  <van-dropdown-item v-model="value1" :options="option1" class=''/>
					  <van-dropdown-item v-model="value2" :options="option2" class=''/>
					  <van-dropdown-item v-model="value3" :options="option3" class=''/>
					</van-dropdown-menu>
				</ul>
				<!-- <van-loading class="spinner" v-if = 'isLoading' size="24px" type="spinner">加载中...</van-loading> -->
			</div>
			
			<div class="containers-bar overflow">
				<van-index-bar :sticky='true' :sticky-offset-top='46'>
				  <van-index-anchor index="A" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  
				<van-index-anchor index="B" />
				<van-cell title="文本" />
				<van-cell title="文本" />
				<van-cell title="文本" />
				<van-cell title="文本" />
				<van-cell title="文本" />
				<van-cell title="文本" />
					
					
				  <van-index-anchor index="C" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  
				  <van-index-anchor index="D" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  
				  <van-index-anchor index="E" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-index-anchor index="F" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-index-anchor index="G" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-index-anchor index="H" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-index-anchor index="I" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-index-anchor index="J" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-index-anchor index="K" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-index-anchor index="L" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-index-anchor index="M" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-index-anchor index="N" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-index-anchor index="O" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  
				  <van-index-anchor index="P" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  
				  
				  <van-index-anchor index="R" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  
				  
				  <van-index-anchor index="S" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  
				  
				  <van-index-anchor index="T" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  
				  
				  <van-index-anchor index="O" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  
				  
				  <van-index-anchor index="U" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  
				  
				  <van-index-anchor index="V" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  
				  
				  <van-index-anchor index="W" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  
				  
				  <van-index-anchor index="X" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  
				  
				  <van-index-anchor index="Y" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  
				  
				  <van-index-anchor index="Z" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				  <van-cell title="文本" />
				</van-index-bar>
			</div>
			
			
			
		  </van-tab>
		  <van-tab title="员工详情">
			<ul class="l-list">
				<li>
					
				</li>
			</ul>
		  </van-tab>
		</van-tabs>
		
		<!-- <study-footer></study-footer> -->
	</div>
	
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import studyFooter from '@/components/studyFooter.vue'
	import Vue from 'vue';
	import * as ajax from '@/utils/api'
	import { IndexBar, IndexAnchor } from 'vant';
	Vue.use(IndexBar).use(IndexAnchor);
	import {Row,Col, DropdownMenu, DropdownItem, Cell,Loading,Tab, Tabs   } from 'vant';
	
	Vue.use(Row).use(Col).use(DropdownMenu).use(DropdownItem).use(Cell).use(Loading).use(Tabs).use(Tab);
	
	export default {
		components: {
			vantHeader,
			studyFooter
		},
		data() {
			return {
				questionText:"学习课程",
				value1:0,
			    value2:0,
				value3:0,
				active:0,
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
					{ text: '全部单位', value: 0 },
					{ text: '中铁三局集团有限公司', value: 1 },
					{ text: '中铁十二局集团有限公司',value: 2 },
					{ text: '中铁五局集团有限公司',value: 3 },
					{ text: '中铁上海工程局集团有限公司',value: 4 },
					{ text: '中铁二十四局集团有限公司',value:5 },
					{ text: '湖南路桥建设集团有限公司',value: 6 },
					{ text: '中铁十一局集团有限公司',value:7 },
			    ],
				option3: [
					{ text: '全部工种', value: 0 },
					{ text: '建筑规范', value: 1 },
					{ text: '建筑规范2',value: 2 },
				],
				isLoading:true,
				TypeWork:'',//工种
				Unit:'',//单位
				Section:''//所在标段
			}
		},
		created() {
			
		},
		mounted() {
			this.StaffRetrieveList();
		},
		
		methods: {
			StaffRetrieveList() {
				ajax.get('StaffRetrieve?Section=' + this.Section+'&Unit='+ this.Unit +'&TypeWork='+ this.TypeWork ).then(res => {
					
					if(res.data.result) {
						console.log(res.data)
						if(!String.prototype.localeCompare)
						  return null;
						 var letters = "*abcdefghjklmnopqrstwxyz".split('');  
					}
				})
			},
		}
	}
</script>

<style scoped>
	/* .van-dropdown-menu{
	    width: 90%;
	    margin: 0 auto;
	} */
	.header-right {
		line-height: 5px;
		color:#fff;
	}
	.containers{background: #fff;padding:12px;border-bottom:1px solid #ddd}
	.container{
	    padding-top: 46px;
	}
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
