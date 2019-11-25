<template>
	<div class="study">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2">
			
		</vant-header>
		<div class="container overflow">
			<div class="container_header overflow l-dropdown">
				<van-dropdown-menu class='van-dropdown'>
					<van-dropdown-item :id="value1" v-model="value1" :options="option1" @change="change1(value1)"/>
					<van-dropdown-item :id="value2" :disabled="disabledSection" v-model="value2" :options="option2" @change="change2(value2)"/>
				</van-dropdown-menu>
			</div>
			<div class="flase" v-show="!show" style="text-align:center;padding:20px;font-size: 14px;color: #ddd;">暂无数据</div>
			<ul class="overflow" v-show="show">
				<li v-for="(item,index) in Treedata" :key="index">
					<van-collapse v-model="activeNames" @change="change(activeNames,item.ID,index)" :id="item.ID">
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
				value1: 0,
				value2: 0,
				option1: [{
						text: 'CYCZQ-1标',
						value: 0
					},
					{
						text: 'CYCZQ-2标',
						value: 1
					},
					{
						text: 'CYCZQ-3标',
						value: 2
					},
					{
						text: 'CYCZQ-4标',
						value: 3
					},
					{
						text: 'CYCZQ-5标1',
						value: 4
					},
					{
						text: 'CYCZQ-5标2',
						value: 5
					},
					{
						text: 'CYCZQ-6标',
						value: 6
					},
				],
				option2: [{
						text: '全部工程',
						value: 0
					},

				],
				isLoading: true,
				activeNames: ['-1'],
				show: false,
				showList: false,
				Treedata: [],
				Treedata_r: [],
				disabledSection:false
			}
		},
		created() {
			// this.GetMenuTreeList();
			this.value1 = Number(this.$route.query.ValueId)
			this.change1(this.value1) 
			localStorage.setItem("intellgent_option1_value",this.$route.query.ValueId)
			localStorage.setItem("labor_value_name", this.option1[this.value1].text)
			
		},
		mounted() {

		},
		methods: {
			change1(val) {
				this.option2.splice(1);
				localStorage.setItem("labor_value_id", val);
				localStorage.setItem("labor_value_name", this.option1[val].text)
				this.GetMenuTreeList();
			},
			change2(val) {
				console.log("当前工程：", this.option2[val].text)
			},
			GetMenuTreeList() {
				//智能进度
				ajax.get('/API/WebAPIDataAudit/GetMenuTree?id=' + "&name=" + localStorage.getItem("labor_value_name")).then(res => {
					if (res.data.result) {
						ajax.get('/API/WebAPIDataAudit/GetMenuTree?id='+res.data.data[0].ID+ "&name=").then(res => {
							if(res.data.result == false){
								this.disabledSection=true;
								this.show = false;
								return;
							}
							if(res.data.result == true){
								this.Treedata = res.data.data;
								for(let k in res.data.data) {
										this.option2.push({
											text:res.data.data[k].NAME,
											value:Number(k)+ Number(1)
										})
								}
								this.disabledSection=false;
								this.show = true;	
								return;
							}
						})
					}
				})
			},
			change(activeNames,id,index) {
				localStorage.setItem("intellgent_option1_value", index);
				localStorage.setItem("intellgent_option1_GetMenuTree_id", id);
				ajax.get('/API/WebAPIDataAudit/GetMenuTree?id=' + id + "&name=").then(res => {
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
				ajax.get('/API/WebAPIDataAudit/GetMenuTree?id=' + id + "&name=").then(res => {
					if (res.data.result == true) {
						that.$router.push({
							path:'/intelligent_secondLevel',
							query:{
								ValueId:localStorage.getItem("intellgent_option1_value"),
								id:id
							}
						});
					} else {
						Toast("暂无数据")
					}
				})
			}
		}
	}
</script>

<style scoped>
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
