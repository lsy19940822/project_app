<template>
	<div class="container">
		<!--header-->
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType='2'>
			
		</vant-header>
		
		<!--content list-->
		<div class="list-content">
			<van-tabs v-model="active">
				<van-tab title="电表">
					<div class="l-dropdown">
						<van-dropdown-menu>
							<van-dropdown-item v-model="value1" :options="option1" @change="change1(value1)"/>
							<van-dropdown-item v-model="value2" :options="option2" @change="change2(value2)"/>
						</van-dropdown-menu>
					</div>
					<!-- <van-icon name="search" style='position: absolute;right:20px;top:2px' @click='searchButton()'/> -->
					<ul class="l-list" v-for="(item,index) in QuantityData" :key='index'>
						<li>
							<van-cell is-link @click="$router.push('/monitoring_list_X?id=' + item.ID +'&type=1')">
								<span>{{item.WORKSITE}}</span>
								<span>{{item.ELECTRO}}</span>
							</van-cell>
						</li>
					</ul>
				</van-tab>
				<van-tab title="水表">
					<div class="l-dropdown">
						<van-dropdown-menu>
							<van-dropdown-item v-model="value1" :options="option1" @change="change1(value1)"/>
							<van-dropdown-item v-model="value2" :options="option2" @change="change4(value2)"/>
						</van-dropdown-menu>
					</div>
					<!-- <van-icon name="search" style='position: absolute;right:20px;top:2px' @click='searchButton()'/> -->
					<ul class="l-list">
						<li v-for="(item,index) in cularsData" :key='index' @click="$router.push('/monitoring_list_X?id=' + item.ID +'&type=2')">
							<van-cell is-link>
								<span>{{item.WORKSITE}}</span>
								<span>{{item.WATERYIELD}}</span>
							</van-cell>
						</li>
					</ul>
				</van-tab>
				
			</van-tabs>
			<!-- 			<van-loading class="spinner" v-if = 'isLoading' size="24px" type="spinner">加载中...</van-loading>
			<div v-else class="spinner"><span><van-icon name="more-o" /></span>已经到底啦~</div> -->
		</div>

	</div>
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import Vue from 'vue';
	import {
		Row,
		Col,
		Loading,
		Tab,
		Tabs,
		Icon,
		Search,
		Cell,
		DropdownMenu, DropdownItem,
	} from 'vant';
	Vue.use(Row).use(Cell).use(Col).use(Loading).use(Tab).use(Tabs).use(Icon).use(Search).use(DropdownMenu).use(DropdownItem);
	import * as ajax from '@/utils/api'
	export default {
		data() {
			return {
				questionText: '能耗监控',
				isLoading: true,
				active: 0,
				searchVal: '',
				isSearchShow: false,
				value1: 0,
				value2: 0,
				option1: [
					{ text: '1标', value: 0 },
					{ text: '2标', value: 1 },
					{ text: '3标', value:2 },
					{ text: '4标', value:3 },
					{ text: '5标-1', value:4},
					{ text: '5标-2', value:5},
					{ text: '6标', value:6},
				],
				option2: [
					{ text: '全部工点', value: 0 },
				],
				Section:'',
				Worksite:'',
				QuantityData:[],
				cularsData:[]
			}
		},
		components: {
			vantHeader
		},
		created() {
			// 
			
		},
		mounted() {
			this.GetElectricQuantityList()
		},
		methods: {
			change1(val){
				this.Section = this.option1[val].text
		      	console.log("this.Section：",this.Section,"this.Worksite：",this.Worksite)
			},
			change2(val){
				if(this.option2[val].text == '全部工点'){
					this.Worksite = ''
				}else{
					this.Worksite = this.option2[val].text.replace("#", "%23")
				}
				
				console.log("this.Section：",this.Section,"this.Worksite：",this.Worksite)
				ajax.get('GetElectricQuantity?Section=' +this.Section+'&Worksite='+ this.Worksite).then(res => {
					
					if(res.data.result) {
						console.log('电表list:',res.data.data)
					    this.QuantityData=res.data.data;
					}
				})
				
				ajax.get('GetWaterMeter?Section=' +this.Section+'&Worksite='+ this.Worksite).then(res => {
					
					if(res.data.result) {
						console.log('水表list:',res.data.data)
					    this.cularsData=res.data.data;
					}
				})
			},
			GetElectricQuantityList(){
				let that = this;
				// this.$route.query.id=this.value1;
				// console.log(this.value1,this.$route.query.value);
				ajax.get('GetElectricQuantity?Section=' +this.Section+'&Worksite='+ this.Worksite).then(res => {
					
					if(res.data.result) {
						console.log('电表list:',res.data.data)
					    that.QuantityData=res.data.data;
					}
				})
				ajax.get('GetWaterMeter?Section=' +this.Section+'&Worksite='+ this.Worksite).then(res => {
					
					if(res.data.result) {
						console.log('水表list:',res.data.data)
					    that.cularsData=res.data.data;
					}
				})
				
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
	/*  */
	.l-list li span:last-child{
		width:65%;
		color:#999999;
		text-align: right;
		display: inline-block;
		float: right;
		overflow: hidden;
		font-size: 14px;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	/deep/ .van-dropdown-menu .van-dropdown-menu__item:first-child {
	    border-right: 1px solid #ccc;
	    margin-right: 10px;
	}
	/deep/.van-dropdown-menu .van-dropdown-menu__item {
	    border: 1px solid #CCC;
	    border-radius: 2px;
	    background: #F9F9F9;
	}
	.l-dropdown{
	    padding: 10px 0;
	    background: #fff;
	    border-bottom: 1px solid #ECECEC;
	}
	.van-dropdown-menu{
	    width: 90%;
	    margin: 0 auto;
	}
	.innerLabel li.activeLabel {
		background: #595F73;
		border: 1px solid #595F73;
		color: #fff;
	}

	.innerLabel li {
		padding: 0 12px;
		width: auto;
		height: 26px;
		border: 1px solid rgba(204, 204, 204, 1);
		float: left;
		margin-left: 6px;
		color: #AAAAAA;
		font-size: 12px;
		text-align: center;
		-ms-flex-negative: 0;
		flex-shrink: 0;
		transform: all .5s ease;
		border-radius: 2px;
		line-height: 24px;


	}

	.inte_gent,
	.innerLabel {
		width: 100%;
		height: auto;
		float: left;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: middle;
		-ms-flex-align: middle;
		align-items: middle;
		overflow: auto;
	}

	.header_inte {
		width: auto;
		height: auto;
		overflow: hidden;
		padding: 14px 16px;
		background: #fff;
		border-bottom: 1px solid rgba(238, 238, 238, 1);
	}

	/*  */
	.clearfix::after {
		content: '';
		display: block;
		clear: both;
	}

	* {
		margin: 0;
	}

	img {
		display: block;
		width: 100%;
		height: auto
	}

	/deep/ .van-tabs__line {
		background-color: #9499AA;
		width: 50% !important;
	}

	.color666 {
		color: #666;
	}

	.omit {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.omit2 {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.marginT12 {
		margin-top: 12px;
	}

	.container {
		padding-top: 46px;
	}
	.van-nav-bar .van-icon {
		font-size: 18px;
		color: #fff;
	}

	/*.notice-box{width:20px;height:20px;}*/
	/*ontent list*/
	.list-content {
		background: #fff;
	}

	.list-content {
		margin-top: 10px;
	}

	.l-list {
		padding: 0 14px;
	}

	.l-list li {
		border-bottom: 1px solid #eee;
	}

</style>
