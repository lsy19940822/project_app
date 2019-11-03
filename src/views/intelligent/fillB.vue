<template>
	<div class="study">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2">
			  <!-- @click="$router.push({path:'/staffNew'})" -->
			<div slot='right_slot'>
				<p class="header-right"><van-icon name="search" color='#fff'/></p>
			</div>
		</vant-header>
		<div class="container overflow">
			<div class="container_header overflow l-dropdown">
				<van-dropdown-menu class='van-dropdown'>
				  <van-dropdown-item v-model="value1" :options="option1" />
				  <van-dropdown-item v-model="value2" :options="option2" />
				</van-dropdown-menu>
			</div>
			<ul class="overflow">
				<li>
					<van-collapse v-model="activeNames">
					  <van-collapse-item name="1">
						<div slot="title">阮江特大桥
							<span style="color: #aaa;float: right;">已完成</span>
							<span style="color: #69966F;float: right;">78% </span>
						</div>
						<van-cell is-link @click="$router.push({path:'/fillC'})">
						   <img src="../../assets/images/user_icon/icon_up@2x (1).png" alt="" width='12'>&nbsp;&nbsp;上部工程
						  <span style="color: #aaa;float: right;">已完成</span>
						  <span style="color: #69966F;float: right;">78% </span>
						</van-cell>
						<van-cell is-link>
						   <img  src="../../assets/images/user_icon/icon_up@2x (2).png" alt="" width='12'>&nbsp;&nbsp;下部工程
						  <span style="color: #aaa;float: right;">已完成</span>
						  <span style="color: #69966F;float: right;">78% </span>
						</van-cell>
					    
					  </van-collapse-item>
					</van-collapse>
				</li>
				<li>
					<van-collapse v-model="activeNames">
					  <van-collapse-item name="2">
						<div slot="title">阮江特大桥
							<span style="color: #aaa;float: right;">已完成</span>
							<span style="color: #7099D0;float: right;">100% </span>
						</div>
						<van-cell is-link >
						  <img src="../../assets/images/user_icon/icon_up@2x (1).png" alt="" width='12'>&nbsp;&nbsp;上部工程
						  <span style="color: #aaa;float: right;">已完成</span>
						  <span style="color: #69966F;float: right;">22% </span>
						</van-cell>
						<van-cell is-link>
						  <img  src="../../assets/images/user_icon/icon_up@2x (2).png" alt="" width='12'>&nbsp;&nbsp;下部工程
						  <span style="color: #aaa;float: right;">已完成</span>
						  <span style="color: #69966F;float: right;">78% </span>
						</van-cell>
					    
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
	import studyFooter from '@/components/studyFooter.vue'
	import Vue from 'vue';
	import { Collapse, CollapseItem } from 'vant';
	
	Vue.use(Collapse).use(CollapseItem);
	import { DropdownMenu, DropdownItem, Cell,Loading ,Icon} from 'vant';
	
	Vue.use(DropdownMenu).use(DropdownItem).use(Cell).use(Loading).use(Icon);
	
	export default {
		components: {
			vantHeader,
			studyFooter
		},
		data() {
			return {
				questionText:"CYCZQ-1标",
				value1: 0,
			    value2: 0,
				option1: [
					{ text: '一部分', value: 0 },
					{ text: '二部分', value: 1 },
					{ text: '三部分', value: 2 },
					{ text: '四部分', value: 3 },
					{ text: '五部分', value: 4 },
					{ text: '六部分', value: 5},
				],
			    option2: [
					{ text: '全部工程', value: 0 },
					{ text: '全部工程1', value: 1 },
					{ text: '全部工程2', value: 2 },
			    ],
				isLoading:true,
				activeNames: ['1']
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
	.container_header{
		border-bottom:1px solid #eee;
	}
	.container_list li{
		padding: 14px 16px;
		border-bottom:1px solid #eee;
	}
	li{
		border-bottom: 1px solid #EEEEEE;
	}
	li:last-child{
		border-bottom:none;
	}
	li span:last-child{
		float: right;
		display: block;
	}
	.container_list li .left_img{
		width:100px;
		height:80px;
		border-radius:3px;
		border:1px solid rgba(170,170,170,1);
		
		float: left;
	}	
	.container_list li .left_img img{
		display: block;
		border-radius:3px;
		float: left;
	}
	.right_title{
		padding-top: 2px !important;
		padding-right: 0 !important;
		padding-bottom: 0 !important;
		padding-left: 8px;
	}
	.right_title li{
		padding: 0 !important;
		border-bottom:none ;
	}
	.right_title li:first-child{
		font-size:14px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:16px;
	}
	.right_title li:nth-of-type(2){
		width:64px;
		height:20px;
		background:rgba(255,255,255,1);
		border-radius:2px;
		border:1px solid rgba(64,83,139,1);
		font-size:12px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(64,83,139,1);
		line-height:18px;
		text-align: center;
		margin-top: 12px;
	}
	.right_title li .van-cell{
		padding: 0 !important;
		
	}
	.right_title li span:first-child{
		color:#AAAAAA;
		font-size:12px;
		margin-top: 14px;
		display: block;
		float: left;
		line-height:12px;
	}
	.right_title li span:last-child{
		color:rgba(112,153,208,1);
		line-height:12px;
		margin-top: 14px;
		font-size:12px;
		float: right;
	}
	.right_title li .van-icon{
		margin-top: 8px;
		color:rgba(112,153,208,1);
	}
</style>
