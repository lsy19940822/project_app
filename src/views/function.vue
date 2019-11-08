<template>
	<div class="study">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2">
			<div slot='right_slot' @click="$router.push({path:'/leaderNew'})">
				<p class="header-right"><img src="../assets/images/index_icon/icon_l.png" alt=""></p>
			</div>
		</vant-header>
		<div class="container overflow">
			<ul class="overflow">
				<li>
					<van-collapse v-model="activeNames">
					  <van-collapse-item name="1">
						<div slot="title">
							<p class="van-hairline--bottom exam-title">
								<img src="../assets/images/index_icon/icon_jd@2x.png" alt="">智能进度
							</p>
						
						</div>
						<van-cell>
						   <ul class="list_ul overflow">
							   <li class="overflow"><img src="" alt=""><span>CYCZQ-1标</span></li>
							   <li class="overflow"><img src="" alt=""><span>CYCZQ-2标</span></li>
							   <li class="overflow"><img src="" alt=""><span>CYCZQ-3标</span></li>
							   <li class="overflow"><img src="" alt=""><span>CYCZQ-4标</span></li>
							   <li class="overflow"><img src="" alt=""><span>CYCZQ-5标1</span></li>
							   <li class="overflow"><img src="" alt=""><span>CYCZQ-5标2</span></li>
							   <li class="overflow"><img src="" alt=""><span>CYCZQ-6标</span></li>
						   </ul>
						</van-cell>
					  </van-collapse-item>
					</van-collapse>
				</li>
				<li>
					<van-collapse v-model="activeNames">
					  <van-collapse-item name="2">
						<div slot="title">
							<p class="van-hairline--bottom exam-title">
								<img src="../assets/images/index_icon/icon_lw@2x.png" alt="">智能劳务
							</p>
						
						</div>
						<van-cell>
						   <ul class="list_ul overflow">
							   <li class="overflow"><img src="" alt=""><span>CYCZQ-1标</span></li>
							   <li class="overflow"><img src="" alt=""><span>CYCZQ-2标</span></li>
							   <li class="overflow"><img src="" alt=""><span>CYCZQ-3标</span></li>
							   <li class="overflow"><img src="" alt=""><span>CYCZQ-4标</span></li>
							   <li class="overflow"><img src="" alt=""><span>CYCZQ-5标1</span></li>
							   <li class="overflow"><img src="" alt=""><span>CYCZQ-5标2</span></li>
							   <li class="overflow"><img src="" alt=""><span>CYCZQ-6标</span></li>
						   </ul>
						</van-cell>
					  </van-collapse-item>
					</van-collapse>
				</li>
				<li>
					<van-collapse v-model="activeNames">
					  <van-collapse-item name="3">
						<div slot="title">
							<p class="van-hairline--bottom exam-title">
								<img src="../assets/images/index_icon/icon_aq@2x.png" alt="">安全质量
							</p>
						</div>
						<van-cell>
						   <ul class="list_ul overflow">
							   <li class="overflow"><img src="" alt=""><span>CYCZQ-1标</span></li>
							   <li class="overflow"><img src="" alt=""><span>CYCZQ-2标</span></li>
							   <li class="overflow"><img src="" alt=""><span>CYCZQ-3标</span></li>
							   <li class="overflow"><img src="" alt=""><span>CYCZQ-4标</span></li>
							   <li class="overflow"><img src="" alt=""><span>CYCZQ-5标1</span></li>
							   <li class="overflow"><img src="" alt=""><span>CYCZQ-5标2</span></li>
							   <li class="overflow"><img src="" alt=""><span>CYCZQ-6标</span></li>
						   </ul>
						</van-cell>
					  </van-collapse-item>
					</van-collapse>
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
	.list_ul li{
		width: 25%;
		float: left;
		padding: 10px 0;
	}
	.list_ul li img{
		width:24px;
		display: block;
		margin: 0 auto;
		background: black;
	}
	.list_ul li span{
		display: block;
		text-align: center;
		line-height: 20px;
		font-size: 12px;
	}
	.van-hairline--bottom{
	    height: 40px;
	    width: 60%;
	    float: left;
	    font-size: 14px;
	    padding-left: 14px;
	    font-family: PingFangSC-Regular,PingFang SC;
	    font-weight: 400;
	    color: rgba(51,51,51,1);
	   
	    margin: 0;
	    /* border-bottom: 1px solid rgba(238,238,238,1); */
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
	    width: 12px;
	    float: left;
	    margin-right: 5px;
	    margin-top: 14px;
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
