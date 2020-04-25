<template>
	<div class="study">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2">
		</vant-header>
		<div class="container overflow">
			<ul class="overflow">
				<li  v-for="(item,index) in dataList" :key="index">
					<van-collapse v-model="activeNames" v-if="item.router != 1 && item.router != 2 && item.router != 3 && item.router != 4">
					  <van-collapse-item :name="index-1">
						<div slot="title">
							<p class="van-hairline--bottom exam-title">
								<img :src="item.img" alt="" >{{item.title}}
							</p>
						</div>
						<van-cell>
						   <ul class="list_ul overflow">
							    <li class="overflow" v-if='item.router==0' v-for="(list,index) in item.data" :key="index" @click="$router.push({path:'/monitoring_list?value='+index})">
							        <img :src="list.imgsrcOne" alt=""><span>{{list.text}}</span>
							    </li>
						   </ul>
						</van-cell>
					  </van-collapse-item>
					</van-collapse>
					<van-cell is-link @click="tost()" class="link" style="padding: 0 14px;line-height: 40px;border-bottom: 1px solid #eee;" v-if="item.router == 1" >
					    <img :src="item.img" alt="" width="14" style="margin-right: 5px;float: left;">
						<span>{{item.title}}</span>
					</van-cell>
					<van-cell is-link @click="tost()" class="link" style="padding: 0 14px;line-height: 40px;border-bottom: 1px solid #eee;" v-if="item.router == 2" >
					    <img :src="item.img" alt="" width="14" style="margin-right: 5px;float: left;">
						<span>{{item.title}}</span>
					</van-cell>
					<van-cell is-link class="link" @click="tost()" style="padding: 0 14px;line-height: 40px;border-bottom: 1px solid #eee;" v-if="item.router == 3">
					    <img :src="item.img" alt="" width="14" style="margin-right: 5px;float: left;">
						<span>{{item.title}}</span>
					</van-cell>
					<van-cell is-link  class="link" @click="tost()" style="padding: 0 14px;line-height: 40px;" v-if="item.router == 4">
					    <img :src="item.img" alt="" width="14" style="margin-right: 5px;float: left;">
						<span>{{item.title}}</span>
					</van-cell>
				</li>
				
			</ul>

		</div>
		<index-footer></index-footer>
		
	</div>
	
</template>

<script>
	import vantHeader from '@/components/header.vue'
    import indexFooter from '@/components/indexFooter.vue'
	import Vue from 'vue';
	import { Collapse, CollapseItem,Toast } from 'vant';
	
	Vue.use(Collapse).use(CollapseItem).use(Toast);
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
						title:"视频监控",
						router:'0',
						img:require('../../assets/engineering/icon_jk@2x (3).png'),
						data:[
							{
								text:'CYCZQ-1标',
						        imgsrcOne:require('../../assets/engineering/gongcheng@2x (1).png'),
							},
							{
								text:'CYCZQ-2标',
							    imgsrcOne:require('../../assets/engineering/gongcheng@2x (5).png'),
							},
							{
								text:'CYCZQ-3标',
							    imgsrcOne:require('../../assets/engineering/gongcheng@2x (6).png'),
							},
							{
								text:'CYCZQ-4标',
							    imgsrcOne:require('../../assets/engineering/gongcheng@2x (4).png'),
							},
							{
								text:'CYCZQ-5标1',
							    imgsrcOne:require('../../assets/engineering/gongcheng@2x (2).png'),
							},
							{
								text:'CYCZQ-5标2',
							    imgsrcOne:require('../../assets/engineering/gongcheng@2x (2).png'),
							},
							{
								text:'CYCZQ-6标',
							    imgsrcOne:require('../../assets/engineering/gongcheng@2x (3).png'),
							},
						]
					},
					
					{
						title:"能耗监控",
						router:'1',
						img:require('../../assets/engineering/icon_jk@2x (4).png'),
						data:[]
					},
					
				    {
				    	title:"无人机巡查",
				    	router:'2',
				    	img:require('../../assets/engineering/icon_jk@2x (5).png'),
				    	data:[]
				    },
					{
						title:"VR全景展示",
						router:'3',
						img:require('../../assets/engineering/icon_jk@2x (1).png'),
						data:[]
					},
					{
						title:"基坑监测",
						router:'4',
						img:require('../../assets/engineering/icon_jk@2x (2).png'),
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
			tost(){
				Toast('敬请期待！');
			}
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
		 line-height: 40px;
	}
	/deep/
	.van-cell__right-icon {
	    margin-left: 5px;
		margin-top: 8px;
	}
	.van-hairline--bottom img{
	    width: 14px;
	    float: left;
	    margin-right: 5px;
	    margin-top: 12px;
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
