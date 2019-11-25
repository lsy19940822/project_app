<template>
	<div class="study">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2">
		</vant-header>
		<div class="container overflow">
			<ul class="overflow function">
				<li  v-for="(item,index) in dataList" :key="index" class="index">
					<van-collapse v-model="activeNames" v-if="item.router != 2 && item.router != 3 && item.router != 5 && item.router != 6">
					  <van-collapse-item :name="index-1">
						<div slot="title">
							<p class="van-hairline--bottom exam-title">
								<img :src="item.img" alt="" >{{item.title}}
							</p>
						</div>
						<van-cell>
						   <ul class="list_ul overflow">
							    <li class="overflow" v-if='item.router==0' v-for="(list,index) in item.data" :key="index" @click="$router.push({path:'/intelligent?ValueId='+index})">
							        <img :src="list.imgsrcOne" alt=""><span>{{list.text}}</span>
							    </li>
								<li class="overflow" v-if='item.router==1' v-for="(list,index) in item.data" :key="index" @click="$router.push({path:'/Intelligence/labor?ValueId='+index})">
								    <img :src="list.imgsrcOne" alt=""><span>{{list.text}}</span>
								</li>
								<!-- <li class="overflow" v-if='item.router==2 && list.router==0' v-for="(list,index) in item.data" :key="index" @click="$router.push({path:'/SubmitQuestions'})">
								    <img :src="list.imgsrcOne" alt="" style="width: 14px;margin-top: 3px;"><span>{{list.text}}</span>
								</li>
								<li class="overflow" v-if='item.router==2 && list.router==1' v-for="(list,index) in item.data" :key="index" @click="$router.push({path:'/leader_resolved'})">
								    <img :src="list.imgsrcOne" alt="" style="width: 14px;margin-top: 3px;"><span>{{list.text}}</span>
								</li>
								<li class="overflow" v-if='item.router==2 && list.router==2' v-for="(list,index) in item.data" :key="index" @click="$router.push({path:'/leader_safeIssue'})">
								    <img :src="list.imgsrcOne" alt="" style="width: 14px;margin-top: 3px;"><span>{{list.text}}</span>
								</li>
								<li class="overflow" v-if='item.router==2 && list.router==3' v-for="(list,index) in item.data" :key="index" @click="$router.push({path:'/leader_safeIssueZ'})">
								    <img :src="list.imgsrcOne" alt="" style="width: 14px;margin-top: 3px;"><span>{{list.text}}</span>
								</li> -->
								<li class="overflow" v-if='item.router==4' v-for="(list,index) in item.data" :key="index" @click="$router.push({path:'/monitoring_list?value='+index})">
								    <img :src="list.imgsrcOne" alt="" style="width: 14px;margin-top: 3px;"><span>{{list.text}}</span>
								</li>
						   </ul>
						</van-cell>
					  </van-collapse-item>
					</van-collapse>
					<van-cell is-link class="link" style="padding: 0 14px;border-bottom: 1px solid #eee;" v-if="item.router ==2" @click="$router.push({path:'/application'})">
					    <img :src="item.img" alt="" width="14" style="margin-right: 5px;float: left;">
						<span>{{item.title}}</span>
					</van-cell>
					<van-cell is-link class="link" style="padding: 0 14px;" v-if="item.router == 3" @click="$router.push({path:'/examLogin'})">
					    <img :src="item.img" alt="" width="14" style="margin-right: 5px;float: left;">
						<span>{{item.title}}</span>
					</van-cell>
					<van-cell is-link class="link" style="padding: 0 14px;border-bottom: 1px solid #eee;" v-if="item.router == 5" @click="$router.push({path:'/machinePositioning?ValueId=0'})">
					    <img :src="item.img" alt="" width="14" style="margin-right: 5px;float: left;">
						<span>{{item.title}}</span>
					</van-cell>
					<van-cell is-link class="link" style="padding: 0 14px;" v-if="item.router == 6">
					    <img :src="item.img" alt="" width="14" style="margin-right: 5px;float: left;">
						<span>{{item.title}}</span>
					</van-cell>
				</li>
				
			</ul>
			<!-- <van-loading class="spinner" v-if = 'isLoading' size="24px" type="spinner">加载中...</van-loading> -->
		</div>
		<index-footer></index-footer>
		
	</div>
	
</template>

<script>
	import vantHeader from '@/components/header.vue'
    import indexFooter from '@/components/indexFooter.vue'
	import Vue from 'vue';
	import { Collapse, CollapseItem } from 'vant';
	
	Vue.use(Collapse).use(CollapseItem);
	import { DropdownMenu, DropdownItem, Cell,Loading ,Icon} from 'vant';
	
	Vue.use(DropdownMenu).use(DropdownItem).use(Cell).use(Loading).use(Icon);
	
	export default {
		components: {
			vantHeader,
			indexFooter
		},
		data() {
			return {
				questionText:"常益长铁路工程管理平台",
				isLoading:true,
				activeNames: ['-1'],
				dataList:[
					{
						title:"智能进度",
						router:'0',
						img:require('../assets/images/index_icon/icon_jd@2x.png'),
						data:[
							{
								text:'CYCZQ-1标',
						        imgsrcOne:require('../assets/engineering/engineering@2x.png'),
							},
							{
								text:'CYCZQ-2标',
							    imgsrcOne:require('../assets/engineering/engineering@2x(1).png'),
							},
							{
								text:'CYCZQ-3标',
							    imgsrcOne:require('../assets/engineering/engineering@2x(2).png'),
							},
							{
								text:'CYCZQ-4标',
							    imgsrcOne:require('../assets/engineering/engineering@2x(3).png'),
							},
							{
								text:'CYCZQ-5标1',
							    imgsrcOne:require('../assets/engineering/engineering@2x(4).png'),
							},
							{
								text:'CYCZQ-5标2',
							    imgsrcOne:require('../assets/engineering/engineering@2x(5).png'),
							},
							{
								text:'CYCZQ-5标6',
							    imgsrcOne:require('../assets/engineering/engineering@2x(6).png'),
							},
						]
					},
					{
						title:"智能劳务",
						router:'1',
						img:require('../assets/engineering/icon_lw@2x.png'),
						data:[
							{
								text:'CYCZQ-1标',
						        imgsrcOne:require('../assets/engineering/engineering@2x(7).png'),
							},
							{
								text:'CYCZQ-2标',
							    imgsrcOne:require('../assets/engineering/engineering@2x(8).png'),
							},
							{
								text:'CYCZQ-3标',
							    imgsrcOne:require('../assets/engineering/engineering@2x(9).png'),
							},
							{
								text:'CYCZQ-4标',
							    imgsrcOne:require('../assets/engineering/engineering@2x(10).png'),
							},
							{
								text:'CYCZQ-5标1',
							    imgsrcOne:require('../assets/engineering/engineering@2x(11).png'),
							},
							{
								text:'CYCZQ-5标2',
							    imgsrcOne:require('../assets/engineering/engineering@2x(11).png'),
							},
							{
								text:'CYCZQ-5标6',
							    imgsrcOne:require('../assets/engineering/engineering@2x(12).png'),
							},
						]
					},
					{
						title:"应用管理",
						router:'2',
						img:require('../assets/images/index_icon/icon_aq@2x.png'),
						data:[]
					},
					// {
					// 	title:"安全质量",
					// 	router:'2',
					// 	img:require('../assets/images/index_icon/icon_aq@2x.png'),
					// 	data:[
					// 		{
					// 			text:'提出问题',
					// 			router:'0',
					// 	        imgsrcOne:require('../assets/engineering/engineering_t@2x.png'),
					// 		},
					// 		{
					// 			text:'已解决问题',
					// 			router:'1',
					// 		    imgsrcOne:require('../assets/engineering/engineering_j@2x.png'),
					// 		},
					// 		{
					// 			text:'安全问题',
					// 			router:'2',
					// 		    imgsrcOne:require('../assets/engineering/engineering_aq@2x.png'),
					// 		},
					// 		{
					// 			text:'质量问题',
					// 			router:'3',
					// 		    imgsrcOne:require('../assets/engineering/engineering_c@2x.png'),
					// 		},
							
					// 	]
					// },
					{
						title:"考核培训",
						router:'3',
						img:require('../assets/engineering/exam@2x.png'),
						data:[]
					},
					{
						title:"智能监控",
						router:'4',
						img:require('../assets/engineering/monitoring@2x.png'),
						data:[
							{
								text:'CYCZQ-1标',
						        imgsrcOne:require('../assets/engineering/gongcheng@2x (1).png'),
							},
							{
								text:'CYCZQ-2标',
							    imgsrcOne:require('../assets/engineering/gongcheng@2x (5).png'),
							},
							{
								text:'CYCZQ-3标',
							    imgsrcOne:require('../assets/engineering/gongcheng@2x (6).png'),
							},
							{
								text:'CYCZQ-4标',
							    imgsrcOne:require('../assets/engineering/gongcheng@2x (4).png'),
							},
							{
								text:'CYCZQ-5标1',
							    imgsrcOne:require('../assets/engineering/gongcheng@2x (2).png'),
							},
							{
								text:'CYCZQ-5标2',
							    imgsrcOne:require('../assets/engineering/gongcheng@2x (2).png'),
							},
							{
								text:'CYCZQ-5标6',
							    imgsrcOne:require('../assets/engineering/gongcheng@2x (3).png'),
							},
						]
					},
				    {
				    	title:"人机定位",
				    	router:'5',
				    	img:require('../assets/engineering/dingwei@2x.png'),
				    	data:[]
				    },
					{
						title:"环境监控",
						router:'6',
						img:require('../assets/engineering/huanjing@2x.png'),
						data:[]
					},
				]
			}
		},
		created() {
			
		},
		mounted() {
			
		},
		
		methods: {
		}
	}
</script>

<style scoped>
	
	.list_ul li{padding: 10px 0;}
	.list_ul li img{
		width:20px;
		margin-right: 10px;
		float: left;
	}
	.list_ul li span{
		display: block;
		line-height: 20px;
		font-size: 12px;
	}
	p.van-hairline--bottom,p.van-cell__value,.link .van-cell__value{
	    height: 50px;
	    width: 100%;
	    float: left;
	    font-size: 14px;
	    padding-left: 14px;
	    font-family: PingFangSC-Regular,PingFang SC;
	    font-weight: 400;
	    color: rgba(51,51,51,1);
	    margin: 0;
		line-height: 50px;
	}
	.link .van-cell__value{
		  padding-left: 0px;
	}
	p.van-hairline--bottom img,p.van-cell__value img,.link .van-cell__value img {
	    width: 14px;
	    float: left;
	    margin-right: 5px;
	    margin-top: 18px;
	}
	/deep/
	.van-collapse-item__title{
		padding: 0;
		padding-right: 14px;
	}
	/deep/
	.van-cell__right-icon {
	    margin-left: 5px;
		margin-top: 15px;
	}
	
	/deep/
	.van-collapse-item__title .van-cell__right-icon::before{
		    -webkit-transform: rotate(0deg);
		    transform: rotate(0deg);
		    -webkit-transition: -webkit-transform .3s;
		    transition: -webkit-transform .3s;
		    transition: transform .3s;
		    transition: transform .3s, -webkit-transform .3s;
		    transition: transform .3s,-webkit-transform .3s;
	}
	/deep/
	.van-collapse-item__title--expanded .van-cell__right-icon::before{
		-webkit-transform: rotate(90deg) !important;
		transform: rotate(90deg) !important;
	}
	/deep/
	.van-collapse-item__wrapper .van-collapse-item__content{padding: 0 !important;}
	.van-collapse-item__content .van-cell{
		background:rgba(249,249,249,1);
		font-size:14px;
		border-bottom:rgba(238,238,238,1);
	}
	.van-dropdown-menu{
	    width: 90%;
	    margin: 0 auto;
	}
	.l-dropdown{
	    padding: 10px 0;
	    background: #fff;
	}
	
	.spinner{
	    text-align: center;
	    font-size: 12px;
	    padding: 15px 0;
	}
	.header-right {
		line-height: 5px;
		color:#fff;
	}
	.container{
		padding-top: 46px;
		background: #fff;
		margin-bottom: 59px;
	}
</style>
