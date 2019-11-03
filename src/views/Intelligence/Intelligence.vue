<template>
	<div class="container">
		<div>
		  <div ref="mainw"></div>
		 
		</div>
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2">
			<<!-- div slot='right_slot'>
				<p class="header-right"><van-icon name="search" /></p>
			</div> -->
		</vant-header>
		<van-tabs v-model="active">
		  <van-tab title="劳务统计">
			 
			  <div class="containers overflow">
			  	<div class="container_header overflow">
					<van-dropdown-menu class='van-dropdown'>
					   <van-dropdown-item v-model="value1" :options="option1" @change="change(value1)"/>
					   <van-dropdown-item v-model="value4" :options="option4" @change="change(value4)"/>
					</van-dropdown-menu>
					
				</div>
				
				<!-- <van-loading class="spinner" v-if = 'isLoading' size="24px" type="spinner">加载中...</van-loading> -->
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
				 <div ref="main"></div>
			</div>
				
		  </van-tab>
		  <van-tab title="员工详情">
			<div class="containers overflow">
				<div class="container_header overflow">
					<van-dropdown-menu class='Intelligence-dropdown'>
					  <van-dropdown-item v-model="value1" :options="option1" class='' @change="change1(value1)"/>
					  <van-dropdown-item v-model="value2" :options="option2" class='' @change="change2(value2)"/>
					  <van-dropdown-item v-model="value3" :options="option3" class='' @change="change3(value3)"/>
					</van-dropdown-menu>
				</div>
				<!-- <van-loading class="spinner" v-if = 'isLoading' size="24px" type="spinner">加载中...</van-loading> -->
			</div>
			
			<div class="containers-bar overflow" style="position: relative;">
				<van-icon name="search" style='position: absolute;right:20px;top:2px' @click='searchButton()'/>
				<van-index-bar :sticky='true' :sticky-offset-top='46' :index-list="indexlist">
				    <div v-for="(item,index) in NameArrS">
					  <van-index-anchor :index="item.letter" />
					  <van-cell v-for="(items,index) in item.data" class='vanCell' :CERTNUMBR="items.CERTNUMBR" :key="items.CERTNUMBR" @click="$router.push({path:'/information?IDCard='+items.CERTNUMBR})">
						   <img :src="items.PHOTOURL" alt="" :CERTNUMBR="items.CERTNUMBR" @click="$router.push({path:'/information?IDCard='+items.CERTNUMBR})">
						   <span :CERTNUMBR="items.CERTNUMBR" @click="$router.push({path:'/information?IDCard='+items.CERTNUMBR})">{{items.EXAMNAME}}</span>
						   <span :CERTNUMBR="items.CERTNUMBR" @click="$router.push({path:'/information?IDCard='+items.CERTNUMBR})">{{items.WORKTYPE}}</span>
					  </van-cell>
				    </div>
				</van-index-bar>
			</div>
		  </van-tab>
		</van-tabs>
	
		<!-- <study-footer></study-footer> -->
	</div>
	
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import studyFooter from '@/components/studyFooter.vue'

	import * as ajax from '@/utils/api'
	import Vue from 'vue';
	import {Icon, IndexBar, IndexAnchor } from 'vant';
	Vue.use(IndexBar).use(IndexAnchor).use(Icon);
	import {Row,Col,Progress, DropdownMenu, DropdownItem, Cell,Loading,Tab, Tabs   } from 'vant';
	
	Vue.use(Progress).use(Row).use(Col).use(DropdownMenu).use(DropdownItem).use(Cell).use(Loading).use(Tabs).use(Tab);
	
	export default {
		components: {
			vantHeader,
			studyFooter
		},
		data() {
			return {
				questionText:"智能劳务",
				value1:0,
			    value2:0,
				value3:0,
				value4:0,
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
					{ text: '全部工种', value: 0},
					{ text: '木工', value:1 },
					{ text: '电工',value: 2},
					{ text: '焊接工', value: 3},
					{ text: '架子工', value: 4},
					{ text: '管道工',value: 5},
					{ text: '司机', value: 6},
					{ text: '钳工', value: 7},
					{ text: '项目经理',value: 8},
					{ text: '常务副经理', value:9},
					{ text: '党工委书计', value:10},
					{ text: '总工程师',value: 11},
					{ text: '安全总监', value: 12},
					{ text: '工程部长', value: 13},
					{ text: '中心实验室主任',value:14},
					{ text: '财务部长',value:15},
					{ text: '计划部长',value: 16},
					{ text: '物资部长',value: 17},
					{ text: '设备部长',value:18},
					{ text: '安质部长',value: 19},
					{ text: '测量队长',value: 20},
					{ text: '综合办公室主任',value:21},
					{ text: '办公室副主任',value: 22},
					{ text: '资料员',value:23},
					{ text: '出纳',value: 24},
					{ text: '技术主管',value:25},
					{ text: '会计',value: 26},
					{ text: '预算员',value:27},
					{ text: '资料员',value:28},
					{ text: '技术员',value:29}
				],
				option4: [
					{ text: '全部工点',value:0}
				],
				isLoading:true,
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
			// this.drawLineMothes();
			
		},
		computed:{
			indexlist(){
				return this.NameArrS.map(function(i){
					return i.letter.toUpperCase();
				})
			}
		},
		methods: {
			change1(val){
				this.Section = this.option1[val].text
				console.log("当前标段：",this.option1[val].text)
			},
			change2(val){
				this.Unit = this.option2[val].text
				console.log("当前单位：",this.option2[val].text)
			},
			change3(val){
				this.TypeWork = this.option3[val].text
				console.log("当前工种：",this.option3[val].text)
			},
			searchButton(){
				console.log("当前标段：",this.Section,"当前单位：",this.Unit,"当前工种：",this.TypeWork)
				// this.StaffRetrieveList();
				ajax.get('StaffRetrieve?Section=' + this.Section+'&Unit='+ this.Unit +'&TypeWork='+ this.TypeWork ).then(res => {
					
					if(res.data.result) {
						
						let NameArr=[]
						
						console.log('StaffRetrieve:',res.data.data)
						for(let k in res.data.data) {
							if(res.data.data[k].PHOTOURL!=null){
								res.data.data[k].PHOTOURL=ajax.http+res.data.data[k].PHOTOURL.slice(2)
							}
						   NameArr.push(res.data.data[k])
						}	
						 this.pySegSort(NameArr)
					}
				})
				
				
				
				// ajax.get('getUserTypeNumber?BD='+this.BD +'&GD='+this.GD).then(res => {
				// 	if(res.data.result) {
				// 		console.log("1.1.3.获取每个工种类别下的人员数量",res)
				// 		// this.StaffRetrieveList();
				// 	}
				// })
			},
			StaffRetrieveList() {
				
				// ajax.get('getUserNumber?BD='+this.BD +'&GD='+this.GD).then(res => {
					
				// 	if(res.data.result) {
				// 		console.log("全部人员数量",res)
				// 	}
				// })
    //             ajax.get('getUserWorkPoint').then(res => {
					
				// 	if(res.data.result) {
				// 		console.log("1.1.2.获取全部工点名称",res)
				// 		for(let k in res.data.data) {
				// 		   this.option4.push({text:res.data.data[k].WORKPOINT,value:Number(k) + Number(1) })
				// 		   // NameArr.push(res.data.data[k])
				// 		}	
				// 		console.log("=======",this.option4)
				// 	}
				// })
				ajax.get('StaffRetrieve?Section=' + this.Section+'&Unit='+ this.Unit +'&TypeWork='+ this.TypeWork ).then(res => {
					
					if(res.data.result) {
						
						let NameArr=[]
						
						
						for(let k in res.data.data) {
							if(res.data.data[k].PHOTOURL!=null){
								res.data.data[k].PHOTOURL=ajax.http+res.data.data[k].PHOTOURL.slice(2)
							}
						   NameArr.push(res.data.data[k])
						}	
						 this.pySegSort(NameArr)
					}
				})
			},
			pySegSort(arr) {
				if(!String.prototype.localeCompare)
				  return null;
				
				  var letters = "*abcdefghjklmnopqrstwxyz".split('');
				     var zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('');
				      
				     var segs = [];
				     var curr;
				     letters.forEach(function(item,i){
				         curr = {letter: item.toUpperCase(), data:[]};
				         arr.forEach(function(item2){
				             if((!zh[i-1] || zh[i-1].localeCompare(item2.EXAMNAME) <= 0) && item2.EXAMNAME.localeCompare(zh[i]) == -1) {
				                 curr.data.push(item2);
				             }
				         });
				         if(curr.data.length) {
				             segs.push(curr);
				             curr.data.sort(function(a,b){
				                 return a.EXAMNAME.localeCompare(b);
				             });
				         }
				     });
					 this.NameArrS = segs;
					 
				     return this.NameArrS;
					 
					
			}
		}
	}
</script>

<style scoped>
	/* .van-dropdown-menu{
	    width: 90%;
	    margin: 0 auto;
	} */
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
