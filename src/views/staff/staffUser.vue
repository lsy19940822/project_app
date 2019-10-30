<template>
	<div id="staffUser">
		<vant-header :leftArrow="false" :titleType="1" :title="questionText" :rightType="2" >
			<div slot='right_slot' @click="$router.push({path:'/staffNew'})">
				<p class="header-right"><img src="../../assets/images/index_icon/icon_l.png" alt=""></p>
			</div>
		</vant-header>
		<div class="container overflow">
			<div class="userHeader overflow">
				<van-cell is-link>
				<div class="user_header">
					<img :src="userHeader" alt="">
				</div>
				<div class="user_title overflow">
					<p>孙悟空</p>
					<p>CYCZQ-1标【电工】</p>
				</div>
				</van-cell>
			</div>
			<ul class="user_ul overflow">
				<li class="overflow" @click="$router.push({path:'/studyrecord'})">
					<div class="icon_user">
						<img src="../../assets/images/user_icon/icon_user@2x (5).png" alt="" width="18px">
					</div>
					<div class="user_t" style="border-bottom:none">
						<van-cell is-link>
						    <span>学习记录</span>
						</van-cell>
					</div>
				</li>
			</ul>
			<ul class="user_ul overflow" @click="$router.push({path:'/examrecord'})">
				<li class="overflow" >
					<div class="icon_user">
						<img src="../../assets/images/user_icon/icon_user@2x (9).png" alt="" width="18px">
					</div>
					<div class="user_t" style="border-bottom:none">
						<van-cell is-link>
						    <span>考试记录</span>
						</van-cell>
					</div>
				</li>
			</ul>
			<ul class="user_ul overflow">
				<li class="overflow" @click="$router.push({path:'/staff_safeQualityList'})">
					<div class="icon_user">
						<img src="../../assets/images/user_icon/icon_user@2x (8).png" alt="" width="18px">
						</div>
					<div class="user_t">
						<van-cell is-link>
						    <span>解决问题</span>
							<span class='tag' >2</span>
						</van-cell>
					</div>
				</li>
				<li class="overflow">
					<div class="icon_user">
						<img src="../../assets/images/user_icon/icon_user@2x (2).png" alt="" width="18px">
					</div>
					<div class="user_t" style="border-bottom:none">
						<van-cell is-link>
						    <span>问题记录</span>
						</van-cell>
					</div>
				</li>
			</ul>
			<ul class="user_ul overflow" style="margin-bottom: 59px;">
				<li class="overflow">
					<div class="icon_user">
						<img src="../../assets/images/user_icon/icon_user@2x (3).png" alt="" width="18px">
					</div>
					<div class="user_t" style="border-bottom:none">
						<van-cell is-link>
						    <span>我的资料</span>
						</van-cell>
					</div>
				</li>
			</ul>
			
		</div>
		<study-footer></study-footer>
	</div>
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import studyFooter from '@/components/studyFooter.vue'
	import Vue from 'vue';
	import { Cell} from 'vant';
	
	Vue.use(Cell)
	export default {
		components: {
			vantHeader,
			studyFooter
		},
		data() {
			return {
				questionText:"我的",
				userHeader:"http://b-ssl.duitang.com/uploads/item/201704/04/20170404153225_EiMHP.jpeg"
			}
		}
	}
</script>

<style scoped>
	.container{
		padding-top: 46px;
	}
	.header-right {
		line-height: 5px;
		color:#fff;
	}
	.userHeader{
		padding: 12px 0 0;
		background:linear-gradient(121deg,rgba(33,40,65,1) 0%,rgba(29,43,95,1) 100%) ;
		box-shadow:0px 1px 1px 0px rgba(0,0,0,0.06);
	}
	.userHeader .van-cell{
		background: none !important;
	}
	.user_header,.user_header img{
		width:58px;
		height:58px;
		border-radius:4px;
		display: block;
		float: left;
	}
	.user_title {
		float: left;
		margin-left: 18px;
		padding-top:5px;
	}
	.user_title p:first-child{
		font-size:22px;
		font-family:PingFangSC-Semibold,PingFang SC;
		font-weight:600;
		color:rgba(255,255,255,1);
		line-height:22px;
		margin: 0;
	}
	.user_title p:last-child{
		background:rgba(255,255,255,1);
		border-radius:10px;
		opacity:0.5;
		font-size:13px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(32,42,79,1);
		line-height:13px;
		padding: 2px 5px;
	}
	.userHeader .van-icon{
		color: #fff !important;
		margin-top: 20px;
	}
	.user_ul{
		margin-top: 10px;
		background: #fff;
		box-shadow:0px 1px 1px 0px rgba(0,0,0,0.06);
	}
	.user_ul li{
		padding-left: 16px;
		padding-right:0 ;
	}
	.icon_user{width: 10%;float: left;padding:16px 0 12px;}
	.user_t .van-cell{
		padding:0;
		padding-right: 16px;
	}
	.user_t{
		width: 90%;
		float: left;
		border-bottom: 1px solid #EEEEEE;
		padding: 12px 0;
	}
	.tag{
		line-height:18px;text-align:center;color:#fff;display: block;
		float: right; border-radius:50%;width:18px;height:18px;
		background:rgba(217,108,108,1);
		margin-top:3px;
	}
</style>
