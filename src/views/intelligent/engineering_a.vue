<template>
	<div class="overflow Treedata">
		 <!-- 筛选路径 -->
		<div class="header_inte" v-show="EngineeringPath">
			<div class="inte_gent">
				<ul class="innerLabel" >
					<li class="van-tabs van-tabs--line" v-for="(item,index) in cycaqData">
						<div class="van-tabs__wrap van-hairline--top-bottom" >
							<div role="tablist" class="van-tabs__nav van-tabs__nav--line">
								<!-- -->
								<div role="tab" aria-selected="true" class="van-tab van-tab--active">
									<i class="van-icon van-icon-clear van-uploader__preview-delete"  @click="activedelete()" v-show="activedeleteArror"></i>
									<span class="van-ellipsis cycaqData_r van-ellipsis" :id="item.id"  @click="cycaqDataButton(index,item.id)" :index="index">{{item.title}}</span>
									<span class="van_icon"><van-icon :name="item.arrow" :index="index" ref="index_arrow"/></span>
								</div>
							</div>
						</div>
					</li>
				</ul>	
			</div>
		</div>
		<ul class="overflow function" v-show="EngineeringPathY">
			<li  v-for="(item,index) in dataList" :key="index" class="cyc_List" @click="studyActives($event,index,item.title)" >
				<van-cell is-link class="link"><span>{{item.title}}</span></van-cell>
			</li>
		</ul>
		<div class="flase" v-show="showArror" style="text-align:center;padding:20px;font-size: 14px;color: #ddd;">暂无数据</div>
		<ul class="overflow" v-show="showSuccess">
			<li v-for="(item,index) in Treedata" :key="index"  class="cyc_Lists" :id="item.ID" @click="ActivesList(index,item.ID,item.NAME,item)">
				<van-cell is-link class="link">
					<div slot="title" >
						<span style="float: left;width:75%" class="van-ellipsis">{{item.NAME}}</span>		
						<span style="color: #aaa;float: right;">已完成</span>
						<span style="color: #69966F;float: right;">78% </span>
					</div>
				</van-cell>
				
			</li>

		</ul>
		<!-- <van-loading class="spinner" v-if = 'isLoading' size="24px" type="spinner">加载中...</van-loading> -->
	</div>

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
				showSuccess: false,
				showArror:false,
				showList: false,
				Treedata: [],
				Treedata_r: [],
				disabledSection:false,
				activedeleteArror:true,//标段删除按钮显示
				state:'',
				GetMenuTree:'',
				dataList:[
					{ title:'CYCZQ-1标' },
					{ title:'CYCZQ-2标' },
					{ title:'CYCZQ-3标' },
					{ title:'CYCZQ-4标' },
					{ title:'CYCZQ-5标1' },
	                { title:'CYCZQ-5标2' },
					{ title:'CYCZQ-6标' },
				],
				EngineeringPath:false,//筛选框删除显示
				EngineeringPathY:true//标段列表删除显示
			}
		},
		created() {
			this.show=true;
		},
		mounted() {
		
		},
		methods: {
			GetMenuTreeList() {
				//智能进度
				ajax.get('/API/WebAPIDataAudit/GetMenuTree?id=' + "&name=" + sessionStorage.getItem("intelligent_CycName")+"&state="+this.state).then(res => {
					if (res.data.result == false) {
						
						Toast("暂无数据")
						return;
					}
					if (res.data.result== true) {
						ajax.get('/API/WebAPIDataAudit/GetMenuTree?id='+res.data.data[0].ID+ "&name="+"&state="+this.state).then(res => {//一级
							if(res.data.result == false){
								Toast("暂无数据")
								this.cycaqData=[];
								this.EngineeringPathY=this.EngineeringPathY;
								return;
							}
							if(res.data.result == true){
								this.Treedata = res.data.data;
								console.log(this.cycaqData)
								this.showSuccess=!this.showSuccess
							    this.EngineeringPathY= !this.EngineeringPathY;
								this.EngineeringPath = !this.EngineeringPath;
								return;
							}
						})
						return;
					}
					
				})
			},
			activedelete(){//标段取消删除
				this.EngineeringPath=false;
				this.EngineeringPathY=true;
				this.cycaqData.splice(0);
				this.showArror = false;
				this.showSuccess = false;	
			},
			studyActives(event, index,name) {//标段列表
				sessionStorage.setItem("intelligent_CycName",name)
				this.CycName=sessionStorage.getItem("intelligent_CycName")
				console.log("当前标段名：",name)
				
				ajax.get('/API/WebAPIDataAudit/GetMenuTree?id=' + "&name=" + sessionStorage.getItem("intelligent_CycName")+"&state="+this.state).then(res => {
					if (res.data.result == false) {
						
						Toast("暂无数据")
						return;
					}
					if(res.data.result == true){
						this.cycaqData.push({
							title:sessionStorage.getItem("intelligent_CycName"),
							arrow:'',
							id:res.data.data[0].ID,
							index:index
						})
						
						this.GetMenuTreeList();
						return
					}
					
				})
				
			},
			ActivesList(index,id,name,item){
				console.log(index,id,name)
				let that=this;
				sessionStorage.setItem("GetMenuTree",name)
				ajax.get('/API/WebAPIDataAudit/GetMenuTree?id=' + id + "&name="+"&state="+this.state).then(res => {
					console.log('that.cycaqData:',that.cycaqData)
					if (res.data.result == false){
						Toast("暂无数据")
						return
					}
					// if (res.data.result == false && this.cycaqData.length>1){
					// 	this.$router.push({path:'/fill'})
					// 	// Toast("暂无数据")
					// 	return
					// }
					if (res.data.result == true) {
						this.activedeleteArror = false;
						that.cycaqData.push({
							title:sessionStorage.getItem("GetMenuTree"),
							arrow:'',
							id:id,
							index:index
						});
						// console.log('that.cycaqData:',that.cycaqData)
						for(let i in that.cycaqData){
							this.cycaqData[(this.cycaqData.length-1)-1].arrow="arrow"
						}
						// this.Treedata.splice(0)//一级列表
						sessionStorage.setItem("GetMenuTree_list_id",id);
						sessionStorage.setItem("GetMenuTree_Data",JSON.stringify(item));
						this.GetMenuTreelistid()
						return
					}
					
				})
			},
			GetMenuTreelistid(){
				ajax.get('/API/WebAPIDataAudit/GetMenuTree?id='+sessionStorage.getItem("GetMenuTree_list_id")+"&name="+"&state="+this.state).then(res => {
					if(res.data.result == true){
						this.Treedata=res.data.data;	
						return;
					}
					if(res.data.result == false){
						console.log("fasle")
						return;
					}
				})
			},
			cycaqDataButton(index,id){
				
				this.cycaqData.splice(index+1,this.cycaqData.length-(index+1))
				this.cycaqData[index].arrow=""
				
				if(this.cycaqData.length == 1){
					this.activedeleteArror = true;
				}else{
					this.activedeleteArror = false;
				}
				
				ajax.get('/API/WebAPIDataAudit/GetMenuTree?id='+id+ "&name="+"&state="+this.state).then(res => {
					if(res.data.result == false){
						this.showArror = true;
						this.showSuccess = false;	
						return;
					}
					if(res.data.result == true){
						this.Treedata = res.data.data;
						this.showArror = false;
						this.showSuccess = true;	
						return;
					}
				})
			}
		}
	}
</script>

<style scoped>
	.van-uploader__preview-delete {
    position: absolute;
    top: -8px;
    right: 36px;
    color: #969799;
    font-size: 18px;
    background-color: #fff;
    border-radius: 100%;
}
.van-icon-arrow:before{
	margin-top:5px;
}
	.van-icon {
	    position: relative;
	    display: inline-block;
	    font: normal normal normal 14px/1 "vant-icon";
	    font-size: inherit;
	    text-rendering: auto;
	    -webkit-font-smoothing: antialiased;
	}
	.cyc_List .van-cell{
		background: none !important;
	}
	.cyc_List.activeLabel{
		background: #595F73 !important;
		border:1px solid #595F73 !important;
	} 
	.cyc_List.activeLabel span{color: #fff !important;}
	.link{
		padding: 0 16px!important;
	}
	.cyc_List,.cyc_Lists{
		padding: 12px 0;
		border-bottom: 1px solid #eee;
	}
	
	.cyc_List span{float: left !important; }
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
