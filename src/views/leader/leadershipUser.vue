<template>
	<div id="leadershipUser">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2" >
			
		</vant-header>
		<div class="container overflow">
			<div class="userHeader overflow" @click="$router.push({path:'/leader_information'})">
				<van-cell is-link @click="$router.push({path:'/leader_information'})">
					<div class="user_header" @click="$router.push({path:'/leader_information'})">
						<img :src="userData.PHOTOURL" alt="">
					</div>
					<div class="user_title overflow" @click="$router.push({path:'/leader_information'})">
						<p>{{userData.EXAMNAME}}</p>
						<p>{{userData.WORKTYPE}}</p>
					</div>
				</van-cell>
			</div>
			<ul class="user_ul overflow">
				<li class="overflow" @click="sumbit()">
					<div class="icon_user" @click="sumbit()">
						<img src="../../assets/images/user_icon/icon_user@2x (1).png" alt="" width="18px">
						</div>
					<div class="user_t" @click="sumbit()">
						<van-cell is-link @click="sumbit()">
						    <span>提出问题</span>
						</van-cell>
					</div>
				</li>
				<li class="overflow" @click="$router.push({path:'/dynamic?userId='+$route.query.userId})">
					<div class="icon_user" @click="$router.push({path:'/dynamic?userId='+$route.query.userId})">
						<img src="../../assets/images/user_icon/icon_user@2x (6).png" alt="" width="18px">
					</div>
					<div class="user_t" @click="$router.push({path:'/dynamic?userId='+$route.query.userId})">
						<van-cell is-link @click="$router.push({path:'/dynamic?userId='+$route.query.userId})">
						    <span>暂存问题</span>
							<span class='tag' >2</span>
						</van-cell>
					</div>
				</li>
				<li class="overflow" @click="$router.push({path:'/leader_resolved?userId='+$route.query.userId})">
					<div class="icon_user" @click="$router.push({path:'/leader_resolved?userId='+$route.query.userId})">
						<img src="../../assets/images/user_icon/icon_user@2x (2).png" alt="" width="18px">
					</div>
					<div class="user_t"  style="border-bottom:none" @click="$router.push({path:'/leader_resolved?userId='+$route.query.userId})">
						<van-cell is-link @click="$router.push({path:'/leader_resolved?userId='+$route.query.userId})">
						    <span>问题记录</span>
						</van-cell>
					</div>
				</li>
			</ul>
			<ul class="user_ul overflow">
				<li class="overflow" @click="$router.push({path:'/leader_information'})">
					<div class="icon_user" @click="$router.push({path:'/leader_information'})">
						<img src="../../assets/images/user_icon/icon_user@2x (3).png" alt="" width="18px">
					</div>
					<div class="user_t" style="border-bottom:none" @click="$router.push({path:'/leader_information'})">
						<van-cell is-link @click="$router.push({path:'/leader_information'})">
						    <span>我的资料</span>
						</van-cell>
					</div>
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
	import { Cell} from 'vant';
	
	Vue.use(Cell)
	export default {
		components: {
			vantHeader,
			indexFooter
		},
		data() {
			return {
				questionText:"我的",
				userData:{}
			}
		},
		created() {
			let userData=sessionStorage.getItem("chang_yi_UserData")
			Object.assign(this.userData, JSON.parse(userData));
		},
		methods:{
			sumbit(){
				// let that=this;
			 //    if(that.$route.query.type == 1){
				// 	that.$router.push({path:'/SubmitQuestions?userId='+that.$route.query.userId})
				// }else{
				// 	Toast("你暂无发起权限")
				// }
			},
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
		width:47px;
		height:58px;
		border-radius:4px;
		display: block;
		float: left;
		background: #f2f2f2;
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
