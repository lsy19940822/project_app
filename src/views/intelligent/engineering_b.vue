<template>
	<!-- <div class="study"> -->
		<div class="overflow Treedata">
			<div class="header_inte">
				<div class="inte_gent">
					
			<!-- 		
					<ul class="slide-box">
					
					    <li class="slide-item"></li>
					
					    <li class="slide-item"></li>
					
					    <li class="slide-item"></li>
					
					    <li class="slide-item"></li>
					
					    <li class="slide-item"></li>
					
					</ul> -->
					
					<ul class="innerLabel" >
						<li class="van-tabs van-tabs--line" v-for="(item,index) in cycaqData">
							<div class="van-tabs__wrap van-hairline--top-bottom" >
								<div role="tablist" class="van-tabs__nav van-tabs__nav--line">
									<div role="tab" aria-selected="true" class="van-tab van-tab--active">
										<span class="van-ellipsis cycaqData_r van-ellipsis">{{item.title}}</span>
										<span class="van_icon"><van-icon :name="item.arrow" :index="index" ref="index_arrow"/></span>
									</div>
								</div>
							</div>
						</li>
						<!-- <van-tabs>
						<van-tab  :title="item.title">
						 <span class="van_icon"><van-icon :name="item.arrow" :index="index" ref="index_arrow"/></span>
						</van-tab>
						</van-tabs>	 -->
					<!-- 		<li  class="divData overflow">
							<van-tabs>
							  <van-tab v-for="(item,index) in cycaqData" :title="" >
								   
							  </van-tab>
							</van-tabs>
							
								<span class="cycaqData_r van-ellipsis" @click="">{{item.title}}</span>
							
						</li> -->
						<!-- <div class="overflow" > -->
							
							<!-- <li v-for="(item,index) in (cycaqData.length-1)"><van-icon name="arrow" /></li> -->
						<!-- </div> -->
					</ul>	
				</div>
			</div>
			<div class="flase" v-show="!show" style="text-align:center;padding:20px;font-size: 14px;color: #ddd;">暂无数据</div>
			<ul class="overflow" v-show="show">
				<li v-for="(item,index) in Treedata" :key="index">
					<van-collapse v-model="activeNames" @change="change(activeNames,item.ID,index,item.NAME)" :id="item.ID">
						<van-collapse-item :name="index">
							<div slot="title">{{item.NAME}}
								<span style="color: #aaa;float: right;">已完成</span>
								<span style="color: #69966F;float: right;">78% </span>
							</div>
							<div class="flase" v-show="!showList" style="background-color:rgba(249,249,249,1);text-align:center;padding:20px;font-size: 14px;color: #ddd;">暂无数据</div>
							<div v-show="showList">
								<van-cell is-link v-for="(list,index) in Treedata_r" :key="index" :id="list.ID" @click="TreedataR($event,list.ID,index)">
									<img src="../../assets/images/user_icon/icon_g@2x (4).png" alt="" width='12' :id="list.ID" v-if="list.NAME=='桥涵专业'" @click="TreedataR($event,list.ID,index)">
									<img src="../../assets/images/user_icon/icon_g@2x (2).png" alt="" width='12' :id="list.ID" v-if="list.NAME=='轨道专业'" @click="TreedataR($event,list.ID,index)">
									<img src="../../assets/images/user_icon/icon_g@2x (1).png" alt="" width='12' :id="list.ID" v-if="list.NAME=='路基专业'" @click="TreedataR($event,list.ID,index)">
									&nbsp;&nbsp;{{list.NAME}}
									<span style="color: #aaa;float: right;":id="list.ID" @click="TreedataR($event,list.ID,index)">已完成</span>
									<span style="color: #69966F;float: right;":id="list.ID" @click="TreedataR($event,list.ID,index)">22% </span>
								</van-cell>
							
							</div>

						</van-collapse-item>
					</van-collapse>
				</li>

			</ul>
			<!-- <van-loading class="spinner" v-if = 'isLoading' size="24px" type="spinner">加载中...</van-loading> -->
		</div>
		<!-- <study-footer></study-footer> -->
	<!-- </div> -->

</template>

<script>
	import vantHeader from '@/components/header.vue'
	import * as ajax from '@/utils/api'
	import Vue from 'vue';
	import {
		Collapse,
		CollapseItem,
		Toast
	} from 'vant';
import { Tab, Tabs } from 'vant';

Vue.use(Tab).use(Tabs);
	Vue.use(Collapse).use(CollapseItem).use(Toast);
	import {
		DropdownMenu,
		DropdownItem,
		Cell,
		Loading,
		Icon
	} from 'vant';

	Vue.use(DropdownMenu).use(DropdownItem).use(Cell).use(Loading).use(Icon);

	export default {
		components: {
			vantHeader,
		},
		data() {
			return {
				questionText: "进度详情",
				cycaqData:[],
				isLoading: true,
				activeNames: ['-1'],
				show: false,
				showList: false,
				Treedata: [],
				Treedata_r: [],
				disabledSection:false,
				state:1,
				GetMenuTree:''
			}
		},
		created() {
			this.cycaqData.push({
				title:sessionStorage.getItem("intelligent_CycName"),
				arrow:'',//
			})
			// this.cycaqData=sessionStorage.getItem("intelligent_CycName")
			this.GetMenuTreeList();
			this.value1 = Number(this.$route.query.ValueId)
			// this.change1(this.value1) 
			// localStorage.setItem("intellgent_option1_value",this.$route.query.ValueId)
			// localStorage.setItem("labor_value_name", this.option1[this.value1].text)
			
		},
		mounted() {
		},
		methods: {
			// change1(val) {
			// 	this.option2.splice(1);
			// 	localStorage.setItem("labor_value_id", val);
			// 	localStorage.setItem("labor_value_name", this.option1[val].text)
			// 	this.GetMenuTreeList();
			// },
			// change2(val) {
			// 	console.log("当前工程：", this.option2[val].text)
			// },
			GetMenuTreeList() {
				//智能进度
				ajax.get('/API/WebAPIDataAudit/GetMenuTree?id=' + "&name=" + sessionStorage.getItem("intelligent_CycName")+"&state="+this.state).then(res => {
					if (res.data.result) {
						ajax.get('/API/WebAPIDataAudit/GetMenuTree?id='+res.data.data[0].ID+ "&name="+"&state="+this.state).then(res => {
							if(res.data.result == false){
								this.disabledSection=true;
								this.show = false;
								return;
							}
							if(res.data.result == true){
								this.Treedata = res.data.data;
								// for(let k in res.data.data) {
								// 		this.option2.push({
								// 			text:res.data.data[k].NAME,
								// 			value:Number(k)+ Number(1)
								// 		})
								// }
								this.disabledSection=false;
								this.show = true;	
								return;
							}
						})
					}
				})
			},
			change(activeNames,id,index,name) {
				console.log("activeNames",activeNames,name)
				this.GetMenuTree= name;
				localStorage.setItem("intellgent_option1_value", index);
				localStorage.setItem("intellgent_option1_GetMenuTree_id", id);
				ajax.get('/API/WebAPIDataAudit/GetMenuTree?id=' + id + "&name="+"&state="+this.state).then(res => {
					if (res.data.result == true) {
						this.Treedata_r = res.data.data;
						this.showList = res.data.result;
					} else {
						this.showList = res.data.result
					}
				})
			},
			TreedataR(event,id,index){
				let that=this;
				ajax.get('/API/WebAPIDataAudit/GetMenuTree?id=' + id + "&name="+"&state="+this.state).then(res => {
					if (res.data.result == true) {
						that.cycaqData.push({
							title:this.GetMenuTree,
							arrow:'',//
						})
						for(let i in that.cycaqData){
							that.cycaqData[(that.cycaqData.length-1)-1].arrow="arrow"
						}
						
						sessionStorage.setItem("GetMenuTree_list_id",id);
						this.GetMenuTreelistid()
					} else {
						Toast("暂无数据")
					}
				})
			},
			GetMenuTreelistid(){
				this.Treedata=[];
				this.Treedata_r=[];
				ajax.get('/API/WebAPIDataAudit/GetMenuTree?id='+sessionStorage.getItem("GetMenuTree_list_id")+"&name="+"&state="+this.state).then(res => {
					if(res.data.result == true){
						this.Treedata=res.data.data;	
						return;
					}
					for(let i in that.cycaqData){
						that.cycaqData[(that.cycaqData.length-1)-1].arrow="arrow"
					}
				})
			}
		}
	}
</script>

<style scoped>
	/deep/
	.van-tabs__line{
		display: none;
	}
	/deep/
	.van-tabs__nav{
		padding-bottom: 0;
	}
	/deep/
	.van-tab,.van-tabs__nav,.innerLabel .van-hairline--top-bottom{
		height: 32px;
		line-height: 32px;
	}
	/deep/
	.van-tab{
		padding: 0;
	}
	/*隐藏掉滚动条*/
	.innerLabel{
		display: -webkit-box;
		overflow-x: auto;
		/*适应苹果*/
		-webkit-overflow-scrolling:touch;
	}
	.innerLabel::-webkit-scrollbar {
		display: none;
	}
	.innerLabel .divData{
		float: left;
	}
	
	.innerLabel li span.van_icon{
		float: left;
		line-height: 32px;
		padding: 0 12px;
	}
	.innerLabel li span.cycaqData_r{
		padding: 0 12px;
		width: 120px;
		height:32px;
		border:1px solid rgba(204,204,204,1);
			float: left;
		margin-left: 6px;
		color: #333333;
		background:rgba(249,249,249,1);
		font-size: 12px;
		text-align: center;
		border-radius:2px;
		line-height: 30px;
		
	}
	.innerLabel li span:first-child{
		margin-left: 0;
	}
	.header_inte{
		width: auto;
		height: auto;
		overflow: hidden;
		padding: 14px 16px;
		background: #fff;
		border-bottom: 1px solid rgba(238, 238, 238, 1);
	}
	/*  */
	/deep/
	.van-cell{
		padding: 13px 16px;
	}
	/deep/ .van-collapse-item__title .van-cell__right-icon::before {
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
		-webkit-transition: -webkit-transform .3s;
		transition: -webkit-transform .3s;
		transition: transform .3s;
		transition: transform .3s, -webkit-transform .3s;
		transition: transform .3s, -webkit-transform .3s;
	}

	/deep/ .van-collapse-item__title--expanded .van-cell__right-icon::before {
		-webkit-transform: rotate(90deg) !important;
		transform: rotate(90deg) !important;
	}

	/deep/ .van-collapse-item__wrapper .van-collapse-item__content {
		padding: 0 !important;
	}

	.van-collapse-item__content .van-cell {
		background: rgba(249, 249, 249, 1);
		font-size: 14px;
		border-bottom: rgba(238, 238, 238, 1);
	}

	.van-dropdown-menu {
		width: 90%;
		margin: 0 auto;
	}

	.l-dropdown {
		padding: 10px 0;
		background: #fff;
	}

	.spinner {
		text-align: center;
		font-size: 12px;
		padding: 15px 0;
	}

	.header-right {
		line-height: 5px;
		color: #fff;
	}

	.container {
		padding-top: 46px;
		background: #fff;
		margin-bottom: 59px;
	}

	.container_header {
		border-bottom: 1px solid #eee;
	}

	.container_list li {
		padding: 14px 16px;
		border-bottom: 1px solid #eee;
	}

	
	li:last-child {
		border-bottom: none;
	}

	li span:last-child {
		float: right;
		display: block;
	}

	.container_list li .left_img {
		width: 100px;
		height: 80px;
		border-radius: 3px;
		border: 1px solid rgba(170, 170, 170, 1);

		float: left;
	}

	.container_list li .left_img img {
		display: block;
		border-radius: 3px;
		float: left;
	}

	.right_title {
		padding-top: 2px !important;
		padding-right: 0 !important;
		padding-bottom: 0 !important;
		padding-left: 8px;
	}

	.right_title li {
		padding: 0 !important;
		border-bottom: none;
	}

	.right_title li:first-child {
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 16px;
	}

	.right_title li:nth-of-type(2) {
		width: 64px;
		height: 20px;
		background: rgba(255, 255, 255, 1);
		border-radius: 2px;
		border: 1px solid rgba(64, 83, 139, 1);
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(64, 83, 139, 1);
		line-height: 18px;
		text-align: center;
		margin-top: 12px;
	}

	.right_title li .van-cell {
		padding: 0 !important;

	}

	.right_title li span:first-child {
		color: #AAAAAA;
		font-size: 12px;
		margin-top: 14px;
		display: block;
		float: left;
		line-height: 12px;
	}

	.right_title li span:last-child {
		color: rgba(112, 153, 208, 1);
		line-height: 12px;
		margin-top: 14px;
		font-size: 12px;
		float: right;
	}

	.right_title li .van-icon {
		margin-top: 8px;
		color: rgba(112, 153, 208, 1);
	}
</style>
