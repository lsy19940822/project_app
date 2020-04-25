<template>
	<div class="container">
		<div class="l-dropdown" style="border-bottom: 1px solid #ddd;">
			<van-dropdown-menu>
				<van-dropdown-item v-model="bid" :options="option2" @change="onClick(bid)"/>
			</van-dropdown-menu>
		</div>
		<div class="list-content">
			
			<!-- <van-pull-refresh  v-model="refreshing" @refresh="onRefresh" :disabled="disabled"> -->
				<div v-if='safeData.length==0' style="text-align: center;background: #ececec;line-height: 36px;color:#ddd;font-size: 16px;">暂无数据 </div>
					
				<ul class="l-list" v-else :style="'height:'+fullHeight+'px'">
					<!-- <van-list
					v-model="loading"
					  :finished="finished"
					  finished-text="- 没有更多了 -"
					  :immediate-check="false"
					  @load="onLoad"
					   :offset="120"> -->
					<li v-for="(item,index) in safeData" :key="index" :id="item.id" v-if="item.quesType == 1" @click="$router.push({path:'/LeaderProblemJ?userId='+$route.query.userId+'&id='+item.id})">
						<div class="item">
							<h6 class="title">{{item.quesDesc}}</h6>
							<div class="explain marginT12">
								<van-row>
									<van-col span="16">
										<span class="color7099D0" v-if="item.quesType == 1">安全问题</span>
										<span class="colorAAA">{{item.createTime}}</span>
									</van-col>
									<van-col span="8" align="right">
										<span class="color53904D">已解决</span>
									</van-col>
								</van-row>
							</div>
							<div class="intro marginT12 omit2">{{item.quesDetail}}</div>
						</div>
					</li>
					<li v-for="(item,index) in safeData" :key="index" :id="item.id" v-if="item.quesType == 2" @click="$router.push({path:'/LeaderProblemJ?userId='+$route.query.userId+'&id='+item.id})">
						<div class="item">
							<h6 class="title">{{item.quesDesc}}</h6>
							<div class="explain marginT12">
								<van-row>
									<van-col span="16">
										<span class="color7099D0" v-if="item.quesType == 2">质量问题</span>
										<span class="colorAAA">{{item.createTime}}</span>
									</van-col>
									<van-col span="8" align="right">
										<span class="color53904D">已解决</span>
									</van-col>
								</van-row>
							</div>
							<div class="intro marginT12 omit2">{{item.quesDetail}}</div>
						</div>
					</li>
					<li v-for="(item,index) in safeData" :key="index" :id="item.id" v-if="item.quesType == 3" @click="$router.push({path:'/LeaderProblemJ?userId='+$route.query.userId+'&id='+item.id})">
						<div class="item">
							<h6 class="title">{{item.quesDesc}}</h6>
							<div class="explain marginT12">
								<van-row>
									<van-col span="16">
										<span class="color7099D0" v-if="item.quesType == 3">进度问题</span>
										<span class="colorAAA">{{item.createTime}}</span>
									</van-col>
									<van-col span="8" align="right">
										<span class="color53904D">已解决</span>
									</van-col>
								</van-row>
							</div>
							<div class="intro marginT12 omit2">{{item.quesDetail}}</div>
						</div>
					</li>
					<div style="padding: 15px 0; text-align: center;font-size: 14px;color:#ddd;">- 没有更多了 -</div>
					<!-- </van-list> -->
				</ul>
		  <!-- </van-pull-refresh> -->
		</div>
	</div>
</template>

<script>
	import VueScroller from 'vue-scroller';
	Vue.use(VueScroller)
	import vantHeader from '@/components/header.vue'
	import * as ajax from '@/utils/api'
	import HeadNav from './HeadNav.vue'
	import Vue from 'vue';
	import {
		Row,
		Col,

		Tab,
		Tabs,
		Icon,
		Search
	} from 'vant';
	import {DropdownMenu, DropdownItem} from 'vant';
	Vue.use(Row).use(Col).use(DropdownMenu).use(DropdownItem);
	Vue.use(Tab).use(Tabs).use(Icon).use(Search);
	import { PullRefresh,List } from 'vant';
	  Vue.use(PullRefresh).use(List);
	export default {
		data() {
			return {
				questionText: '我的问题',
				isLoading: true,
				active: 0,
				searchVal: '',
				isSearchShow: false,
				quesType0:0,//1.安全 2 质量 3 进度
				userId:this.$route.query.userId,
				succ:1,//1已解决
				page:1,
				size:100,
				total:0,
				safeData:[],
				bid:0,
				num:0,
				num1:0,
				num2:0,
				option2: [
                     { text: '全部问题', value: 0 },
					{ text: '安全问题', value: 1 },
					{ text: '质量问题', value: 2 },
					{ text: '进度问题', value: 3 },

				],
				loading: false, // 当loading为true时，转圈圈
				finished: false, // 数据是否请求结束，结束会先显示- 没有更多了 -
				refreshing: false,
				disabled:false,
				fullHeight:document.documentElement.clientHeight-146,
			}
		},
		watch:{
			fullHeight(val){//监控浏览器高度变化
				if(!this.timer){
					this.fullHeight = val
					this.timer=true
					var that=this
					setTimeout(function(){//防止过度调用检测时件，导致卡顿
						this.timer = false
					},400)
				}
			}
		},
		components: {
			vantHeader,
			HeadNav
		},
		// computed: {
		// 	reverseData() {
		// 		return this.safeData.reverse();
		// 	}
		// },
		mounted(){
			this.selectSafetyListS()
			this.bodyHeight()
		},
		methods: {
			bodyHeight(){
			  var that = this;
			  window.onresize = ()=>{
				return (() => {
					window.fullHeight = document.documentElement.clientHeight
					that.fullHeight = window.fullHeight-146
				})()
			  }
			},
			
			onClick(title){
				this.safeData = [];
				console.log(title)
				this.quesType0=title
				this.selectSafetyListS()
			},


			searchShowHide() {
				this.isSearchShow = !this.isSearchShow
			},
			searchCancel() {
				this.searchShowHide();
			},
			onSearch() {

			},
			selectSafetyListS() {
				ajax.getW('/api/safety/selectSafetyList?userId=' + this.userId+'&bid='+this.bid+'&quesType='+this.quesType0+'&succ='+this.succ+'&page='+this.page+'&size='+this.size).then(res => {
					if (res.status == 200) {
					  if (res.data.code == 200) {
							this.loading = false
							this.total =  res.data.data.total
							this.safeData = res.data.data;
							// this.safeData = this.safeData.concat(list);
							// if(this.safeData.length == this.total){
							// 	this.disabled=true
							// }else{
							// 	this.disabled=false
							// }
						 //  if (this.safeData.length === 0) {
							// this.finished = true
						 //  }
							
					  }
					  if (res.data.code == null) {
					    this.safeData = [];
						   
					  }
					}
				})

			},
			// 列表加载
			// onLoad () {
			// 		if(this.total<10){
			// 			this.finished = false;
			// 			this.loading = false		  
			// 		}else{
			// 		 setTimeout(() => {	 
			// 			if(this.safeData.length == this.total){
			// 				this.size = this.safeData.length
			// 				this.finished = true;
			// 				this.loading = false
			// 			}else{
							
			// 				if(this.safeData.length%2==1){
			// 					this.page = Math.round(this.total/this.size)+1
			// 				}else{
			// 					this.page++;
			// 					this.finished = false;
			// 					this.loading = true
			// 					this.selectSafetyListS();
			// 			    }
			// 				// console.log(this.page,this.safeData.length,this.total,Math.round(this.total/this.size))
							
			// 			}
			// 		 }, 1000)
			// 		}	
						  
			//  },
			//      onRefresh () {
			// 			  setTimeout(() => {
			// 				this.refreshing = false
			// 				this.loading = false
			// 				this.finished = false
			// 				this.safeData = [];
			// 				this.page=1;
			// 				this.selectSafetyListS()
							
			// 			  }, 1000)
			//      }
		}

	}
</script>

<style scoped>

	/deep/
	.van-list__finished-text{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 10;
		background: #fff;
	}
	/deep/
	.van-list__placeholder{
		height: 50px;
	}
	.l-list {
	  padding: 0 14px;
		 margin-top: 10px;
		height: 400px;
		overflow: auto;
	}
	/*  */
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
		width: 33.3% !important;
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
		/* padding-top: 46px; */
	}

	.van-nav-bar .van-icon {
		font-size: 18px;
		color: #fff;
	}
.l-dropdown{
	position: fixed;
	top: 96px;
	left: 0;
	right:0;
	z-index: 10;
}
.list-content{
margin-top: 50px;
}
	/*.notice-box{width:20px;height:20px;}*/
	/*ontent list*/
	.list-content {
		background: #fff;
	}

	.l-list li {
		border-bottom: 1px solid #eee;
	}

	.title {
		font-size: 18px;
		color: #333;
		line-height: 24px;
	}

	.explain {
		font-size: 12px;
	}

	.intro {
		font-size: 16px;
		color: #666;
	}

	.item {
		padding: 14px 0;
	}

	.color7099D0 {
		color: #7099D0;
	}

	/*安全问题-蓝色*/
	.color7099D0 {
		color: #7099D0;
	}

	.colorAAA {
		color: #aaa;
	}

	.colorE19B52 {
		color: #E19B52;
	}

	/*待指派*/
	.color5082C6 {
		color: #5082C6
	}

	/*待解决*/
	.color7081B9 {
		color: #7081B9
	}

	/*带抄送*/
	.colorE6B36F {
		color: #E6B36F
	}

	/*质量问题*/
	.colorC86565 {
		color: #C86565
	}

	/*退回问题*/
	.color5268E1 {
		color: #5268E1;
	}

	/*待审核*/
	.color53904D {
		color: #53904D;
	}

	/*待复核*/
	/*loading*/
	.spinner {
		text-align: center;
		font-size: 14px;
		padding: 15px 0;
		color: #969799;
	}

	/**/
	.small-headPhoto {
		width: 20px;
		height: 20px;
		float: left;
		margin-right: 5px;
	}

	/*检索关键字*/
	.retrieval-box {
		border-bottom: 1px solid #DDD;
		padding: 14px;
	}

	.retrieval-list li {
		padding: 6px 15px;
		border: 1px solid #ccc;
		color: #aaa;
		font-size: 14px;
		float: left;
		margin-right: 5px;
	}

	.retrieval-list li.current {
		color: #fff;
		background: #595F73;
	}

	/*search*/
	.searh-clear {
		padding: 14px;
		color: #666;
		font-size: 16px;
	}

	.clear-btn {
		text-align: right;
	}

	.clear-btn .van-icon {
		top: 2px;
		right: 4px;
	}

	.s-history {
		padding: 0 14px;
	}

	.s-historyList li {
		float: left;
	}

	.h-tag {
		margin-bottom: 10px;
		color: #333;
		padding: 8px 12px;
		background: #fff;
		border: 1px solid #DDD;
		font-size: 14px;
		margin-right: 10px;
	}

	.search-wrap {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 111;
		background: #fff;
	}
</style>
