<template>
	<div>
		<vant-header :leftArrow="true" :titleType="1" title="进度详情" :rightType="2"></vant-header>
		<div class="containers overflow">
			<div class="container_header overflow">
				<van-dropdown-menu class='Intelligence-dropdown' style="width:30%;float: left;">
					<van-dropdown-item v-model="value1" :options="option1" class='' @change="change1(value1)" />
				</van-dropdown-menu>
				<div class="van_icon"  style="width:5%;float: left;text-align: center;line-height: 50px;"><van-icon name="arrow"/></div>
				<van-dropdown-menu class='Intelligence-dropdown' style="width:30%;float: left;">
					<van-dropdown-item v-model="value2" :options="option2" class='' :disabled="disabledSection"  @change="change2(value2)" />
				</van-dropdown-menu>
				<div class="van_icon"  style="width:5%;float: left;text-align: center;line-height: 50px;"><van-icon name="arrow"/></div>
				<van-dropdown-menu class='Intelligence-dropdown'  style="width:30%;float: left;">
					<van-dropdown-item v-model="value3" :options="option3" class='' :disabled="disabledUnit" @change="change3(value3)" />
				</van-dropdown-menu>
			</div>
		</div>
		<div class="flase" v-show="show" style="text-align:center;padding:20px;font-size: 14px;color: #ddd;">暂无数据</div>
		<div class="showTOP" v-show="showTop">
			<div class="container_top"  v-show="showTop">
				<ul>
					<li class="activeButton" @click="studyActives(0,'墩')" :class="{activeLabel:num==0}">墩</li>
					<li class="activeButton" @click="studyActives(1,'梁')" :class="{activeLabel:num==1}">梁</li>
					<li class="activeButton" @click="studyActives(2,'桩基')" :class="{activeLabel:num==2}">桩基</li>
					<li class="activeButton" @click="studyActives(3,'承台')" :class="{activeLabel:num==3}">承台</li>
					<li class="activeButton" @click="studyActives(4,'墩台')" :class="{activeLabel:num==4}">墩台</li>
				</ul>
				<form action="/">
				  <van-search
				    v-model="searchValue"
				    placeholder="请输入墩号/梁号"
				    show-action
				    @search="onSearch">
				   <div slot="action" @click="onSearch" class="onSearch">搜索</div>
				   </van-search>
				</form>
			</div>
			<div class="flase" v-show="!showList" style="text-align:center;padding:20px;font-size: 14px;color: #ddd;">暂无数据</div>
			<ul class="container_list" v-show="showList" style="overflow: auto;height: 580px;">
				<li class="list" v-for="(item,index) in PierNo" :key="index" v-show="list" @click="Buttonlist(item.NAME)">
					<van-cell is-link  style="padding-left:0;">
						<span class="van-ellipsis" style="text-align: left;">{{item.NAME}}</span>
						<span style="color:#69966F">{{item.ZHUANGSHU}}桩</span>
						<span>{{item.CHENGTAI}}承台</span>
						<span>{{item.DUNTAI}}墩台</span>
					</van-cell>
				</li>
				<li class="list_one" v-show="!list"  v-for="(item,index) in PierSearch" :key="index" @click="linkButton(item,item.TimeDays)">
					<van-cell is-link  style="padding-left:0;">
						<!-- margin-right:10%; -->
						<span class="list_one" style="margin-right:10%;width:110px;display: inline-block;">
							<span style="color:#aaa;font-size:14px;">{{item.PierName}}/</span><span style="color:#333;font-size:16px;">{{item.NAME}}</span>
						</span>
						<span class="list_one">
							<span style="color: #aaa;font-size:14px;" v-if="item.STATUS == 1 || item.STATUS == 5">{{item.STATUS | getStatus}}</span>
							<span style="color: #69966F;font-size:14px;" v-if="item.STATUS == 3">{{item.STATUS | getStatus}}</span>
							<span style="color: #C86565;font-size:14px;" v-if="item.STATUS == 2">{{item.STATUS | getStatus}}</span>
							<span style="color: #E19B52;font-size:14px;" v-if="item.STATUS == 4">{{item.STATUS | getStatus}}</span>
							<span style="color:#AAAAAA;font-size:14px;">{{item.REALENDDATE}}</span>
						</span>
						<span style="color:#5986C2;font-size:14px;float: right;" v-if="item.STATUS == 1 || item.STATUS == 2 || item.STATUS == 5">填报</span>
						<span style="font-size:14px;float: right;" v-if="item.STATUS == 3 || item.STATUS == 4" :style="{'color':(item.TimeDays>30?'#AAAAAA':'#DA9F63')}">{{item.TimeDays>30?'查看':'修改'}}</span>
					</van-cell>
				</li>
				
			</ul>
		</div>
		
	</div>
	
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import * as ajax from '@/utils/api'
	import pyjs from 'js-pinyin'
	import Vue from 'vue';
	import { Search } from 'vant';
	
	Vue.use(Search);
	import { Icon, IndexBar, IndexAnchor, Row, Col, Progress, DropdownMenu, DropdownItem, Cell, Loading, Tab, Tabs, Toast } from 'vant';

	Vue.use(Progress).use(Toast).use(Row).use(Col).use(DropdownMenu).use(DropdownItem).use(Cell).use(Loading).use(Tabs).use(Tab).use(IndexBar).use(IndexAnchor).use(Icon);

	export default {
		components: {
			vantHeader,
		},
		data() {
			return {
				value1: 0,
				value2: 0,
				value3: 0,
				option1: [
					{ text: 'CYCZQ-1标', value: 0},
					{ text: 'CYCZQ-2标', value: 1},
					{ text: 'CYCZQ-3标', value: 2},
					{ text: 'CYCZQ-4标', value: 3},
					{ text: 'CYCZQ-5标1', value: 4},
					{ text: 'CYCZQ-5标2', value: 5},
					{ text: 'CYCZQ-6标', value: 6},
				],
				option2: [{ text: '工区', value:0},],
				option3: [{ text: '工点', value:0},],
				disabledSection:false,
				disabledUnit:false,
				searchValue:'',
				show:false,
				showTop:false,
				showList:false,
				state:'',
				WorkArea:'',
				Ablock:'',
				worksite:'',
				num:-1,
				PierNo:[],
				list:true,
				PierName:'',
				PierSearch:[],
			}
		},
		created() {
			this.Ablock='CYCZQ-1标'
			this.GetMenuTreeList()
		},
		mounted() {
			

		},
		filters: {
			// (1-未开工、2-正在进行、3-已完成、4-延期已完成、5-延期未完成)
			getStatus(id) {
				var str = "";
				switch(id) {
					case 1:
						str = "未开工";
						break;
					case 2:
						str = "正在进行";
						break;
					case 3:
						str = "已完成";
						
						break;
					case 4:
						str = "延期已完成";
						break;
					case 5:
						str = "延期未完成";
						break;
				}
				return str;
			}
		},
		computed: {
		},
		methods: {
			change1(val) {
				this.option2.splice(1);
				localStorage.setItem("labor_value_id", val);
				this.Ablock=this.option1[val].text
				this.value2=Number(0);
				this.value3=Number(0);
				sessionStorage.setItem("GetMenuTree_list_name",null);
				sessionStorage.setItem("GetMenuTree_list_index",null);
				this.GetMenuTreeList();
			},
			change2(val) {
				sessionStorage.setItem("GetMenuTree_list_id",this.option2[val].id);
				this.value3=Number(0);
				this.option3.splice(1);
				this.WorkArea=this.option2[val].text.replace("#", "%23")
				this.GetMenuTreelistidchange2();
				this.GetMenuTreelistidchange3();
			},
			change3(val) {
				sessionStorage.setItem("GetMenuTree_list_id",this.option3[val].id);
				this.WorkArea=this.option3[val].text.replace(/#/, "%23")
				
				this.GetMenuTreelistidchange3();
				
			},
			linkButton(item,TimeDays){
				sessionStorage.setItem("GetMenuTree_Data",JSON.stringify(item));
				this.$router.push({
					path:'/fill',
					query:{
						TimeDays:TimeDays
					}
				})
			},
			// 列表点击
			Buttonlist(name){
				
				ajax.post('/API/WebAPIDataAudit/FillInProgress?worksite='+sessionStorage.getItem("GetMenuTree_list_id")+
				'&ButtonValue='+sessionStorage.getItem("GetMenuTree_list_name")+'&TextboxValue='+name.replace("号墩",'')).then(res => {
					if(res.data.result == true){
						this.showList=true;
						this.list=false;
						this.PierNo.splice(0);
						this.PierSearch = res.data.data;
						sessionStorage.setItem("GetMenuTree_type",false);
						for(let item in this.PierSearch){
							let time=new Date();
							let usedTime = time - new Date(this.PierSearch[item].REALENDDATE); // 相差的毫秒数
							let days = Math.floor(usedTime / (24 * 3600 * 1000)); // 计算出天数
							
							if(this.PierSearch[item].REALENDDATE != null){
								this.PierSearch[item].REALENDDATE=this.PierSearch[item].REALENDDATE.replace("T00:00:00","")
								this.PierSearch[item].TimeDays=days;
							}else{
								this.PierSearch[item].TimeDays=0;
							}
							this.PierSearch[item].PierName=name;
						}
						
						return;
					}
					if(res.data.result == false){
						this.showList=false;
						return;
					}
				});
			},
			// 搜索
			onSearch(){
				if(this.searchValue == ''){
					Toast("请输入墩号/梁号")
				}else{
					ajax.post('/API/WebAPIDataAudit/FillInProgress?worksite='+sessionStorage.getItem("GetMenuTree_list_id")+
					'&ButtonValue='+sessionStorage.getItem("GetMenuTree_list_name")+'&TextboxValue='+this.searchValue).then(res => {
						if(res.data.result == true){
							sessionStorage.setItem("GetMenuTree_type",false);
							this.showList=true;
							this.list=false;
							this.PierNo.splice(0);
							sessionStorage.setItem("GetMenuTree_searchValue_name",this.searchValue+"号墩");
							this.PierSearch = res.data.data;
							for(let item in this.PierSearch){
								let time=new Date();
								let usedTime = time - new Date(this.PierSearch[item].FULLDATE); // 相差的毫秒数
								let days = Math.floor(usedTime / (24 * 3600 * 1000)); // 计算出天数
								if(this.PierSearch[item].FULLDATE != null){
									this.PierSearch[item].REALENDDATE=this.PierSearch[item].REALENDDATE.replace("T"," ")
									this.PierSearch[item].TimeDays=days;
								}else{
									this.PierSearch[item].TimeDays=0;
								}
								this.PierSearch[item].PierName=sessionStorage.getItem("GetMenuTree_searchValue_name");
							}
							return;
						}
						if(res.data.result == false){
							this.showList=false;
							return;
						}
					});
				}
				
			},
			GetMenuTreeList() {
				//智能进度
				ajax.get('/API/WebAPIDataAudit/GetMenuTree?id=' + "&name=" +this.Ablock +"&state="+this.state).then(res => {
					if (res.data.result) {
						ajax.get('/API/WebAPIDataAudit/GetMenuTree?id='+res.data.data[0].ID+ "&name="+ this.Ablock).then(res => {
							if(res.data.result == false){
								this.disabledSection=true;
								this.show = true;
								this.showTop=false;
								this.disabledUnit = true
								return;
							}
							if(res.data.result == true){
								for(let k in res.data.data) {
									this.option2.push({
										text:res.data.data[k].NAME,
										value:Number(k)+ Number(1),
										id:res.data.data[k].ID
									})
								}
								this.disabledSection=false;
								this.show = true;	
								this.showTop=false;
								this.disabledUnit = true
								return;
							}
						})
					}
				})
			},
			GetMenuTreelistidchange2(){
				ajax.get('/API/WebAPIDataAudit/GetMenuTree?id='+sessionStorage.getItem("GetMenuTree_list_id")+"&name="+ this.WorkArea+"&state="+this.state).then(res => {
					
					if(res.data.result == true){
						this.disabledUnit = false
						for(let k in res.data.data) {
							this.option3.push({
								text:res.data.data[k].NAME,
								value:Number(k)+ Number(1),
								id:res.data.data[k].ID
							})
						}
						return;
					}
					if(res.data.result == false){
						this.disabledUnit = true
						return;
					}
				})
			},
			GetMenuTreelistidchange3(){
				ajax.get('/API/WebAPIDataAudit/GetMenuTree?id='+sessionStorage.getItem("GetMenuTree_list_id")+"&name="+ this.WorkArea+"&state="+this.state).then(res => {
					
					if(res.data.result == true){
						
						this.showTop=true;
						this.show = false;	
						return;
					}
					if(res.data.result == false){
						this.showTop=false;
						this.show = false;	
						return;
					}
				})
				let that=this;
				
				// console.log())
				if(that.PierSearch != ''){
					ajax.post('/API/WebAPIDataAudit/FillInProgress?worksite='+sessionStorage.getItem("GetMenuTree_list_id")+
					'&ButtonValue='+sessionStorage.getItem("GetMenuTree_list_name")+'&TextboxValue='+that.searchValue).then(res => {
						if(res.data.result == true){
							that.showList=true;
							that.list=true;
							that.PierSearch.splice(0);
							that.PierNo=res.data.data;
							console.log("that.PierNo:",that.PierNo)
							return;
						}
						if(res.data.result == false){
							that.showList=true;
							
							that.list=false
							return;
						}
					});
					return;
				}
				if(sessionStorage.getItem("GetMenuTree_list_name")!=null && sessionStorage.getItem("GetMenuTree_list_index")!=null){
					
					let index=sessionStorage.getItem("GetMenuTree_list_index");
					let name=sessionStorage.getItem("GetMenuTree_list_name");
					that.studyActives(index,name)
					return;
				}
			},
			// 选项 墩 梁。。。。。。
			studyActives(index,name) {
				sessionStorage.setItem("GetMenuTree_list_name",name);
				sessionStorage.setItem("GetMenuTree_list_index",index);
			
				this.num=index;
				ajax.post('/API/WebAPIDataAudit/FillInProgress?worksite='+sessionStorage.getItem("GetMenuTree_list_id")+
				'&ButtonValue='+name+'&TextboxValue='+this.searchValue).then(res => {
					if(res.data.result == true){
						
						this.showList=true;
						this.PierNo.splice(0);
						this.PierNo=res.data.data;
						return;
					}
					if(res.data.result == false){
						this.showList=false;
						return;
					}
				});
				
			
			},
		}
	}
</script>

<style scoped>
	.container_top li.activeLabel{
		background: #595F73;
		border:1px solid #595F73;
		color: #fff;
	} 
	.containers {
		background: #fff;
		padding: 14px;
		border-bottom: 1px solid #ddd;
		margin-top: 46px;
	}
	.container_top{
		padding: 14px;
		background: #fff;
		height: auto;
		overflow: hidden;
		border-bottom: 1px solid rgba(221,221,221,1);
	}
	.container_top ul,.container_list,.showTOP{
		height: auto;
		overflow: hidden;
	}
	.container_top li{
		width: 16%;
		float: left;
		height: auto;
		overflow: hidden;
		heihgt:28px;
		text-align: center;
		line-height: 28px;
		margin-right: 5%;
		color: rgba(204,204,204,1);
		border: 1px solid rgba(204,204,204,1);
	}
	.container_top li:last-child{
		margin-right: 0;
	}
	.container_top li .activeButton{
		width: 90%;
		
	}
	/deep/
	.van-search{
		padding:0;
		margin-top: 16px;
	}
	.van-search__content{
		background:rgba(243,243,243,1);
		border-radius:4px;
	}
	.van-search__action{
		padding-right: 0;
	}
	.onSearch{
		width:63px;
		height:30px;
		background:rgba(114,154,207,1);
		border-radius:4px;
		font-size:14px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:30px;
		text-align: center;
	}
	.container_list li{
		background: #fff;
		height: auto;
		overflow: hidden;
		padding-left: 18px;
	}
	.container_list li .van-cell{
		border-bottom: 1px solid rgba(227,227,227,1);
	}
	.container_list li:last-child .van-cell{
		border-bottom:none;
	}
	.container_list li.list span:nth-of-type(1){
		display: block;
		float: left;
		width:102px;
		margin-right: 15%;
	}
	.container_list li.list span:nth-of-type(2){
		width:50px;
		margin-right: 5%;
	}
	.container_list li.list span:nth-of-type(3){
		width:50px;
		margin-right: 5%;
	}
	.container_list li.list span:nth-of-type(4){
		float: right;
	}
	/deep/	
	.van-ellipsis{
		width: 80px !important;
		text-align: center;
	}
</style>