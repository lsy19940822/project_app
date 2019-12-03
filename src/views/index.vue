<template>
	
	<div id="index">
		<vant-header :leftArrow="false" :titleType="1" :title="questionText" :rightType="2"></vant-header>
		
		<div class="containerIndex">
			
			<div class="login-bg">
				<van-swipe :autoplay="3000">
				  <van-swipe-item v-for="(image, index) in images" :key="index">
					  <img :src="image.PHOTOURL" class="back_img">
				  </van-swipe-item>
				</van-swipe>
			</div>
			<ul class="navList">
				
				<li @click="$router.push({path:'/intelligent?ValueId=0'})"><img src="../assets/images/index_icon/icon_jd@2x.png" alt=""><p>智能进度</p></li>
				<li @click="$router.push({path:'/Intelligence/labor?ValueId=0'})"><img src="../assets/images/index_icon/icon_lw@2x.png" alt=""><p>智能劳务</p></li>
				<li @click="$router.push({path:'/application'})"><img src="../assets/images/index_icon/icon_aq@2x.png" alt=""><p>安全质量</p></li>
				<!-- <li @click="$router.push({path:'/leader_safeQualityList?userId='+$route.query.userId+'&type='+type})"><img src="../assets/images/index_icon/icon_aq@2x.png" alt=""><p>安全质量</p></li> -->
				<li @click="$router.push({path:'/examLogin'})"><img src="../assets/images/index_icon/icon_exam@2x.png" alt=""><p>考核培训</p></li>
				<li @click="$router.push({path:'/machinePositioning?ValueId=0'})"><img src="../assets/images/index_icon/icon_dw@2x.png" alt=""><p>人机定位</p></li>
				<li @click="$router.push({path:'/monitoring'})"><img src="../assets/images/index_icon/icon_jk@2x.png" alt=""><p>智能监控</p></li>
				<li @click="tost()"><img src="../assets/images/index_icon/icon_hj@2x.png" alt=""><p>环境监控</p></li>
				<li @click="$router.push({path:'/faceId'})"><img src="../assets/images/index_icon/icon_scan@2x.jpg" alt=""><p>人脸识别</p></li>
				<!--<li @click="tost()"><img src="../assets/images/index_icon/icon_more@2x.png" alt=""><p>更多</p></li>-->
			</ul>
			<div class="container_list">
				<p class="van-hairline--bottom exam-title"><img src="../assets/images/index_icon/icon_jd@2x.png" alt="">智能进度</p>
			    <div class="container_nav">
					 <div class="navLists">
						<p style="font-size:13px;margin: 0;">
							 <span><img src="../assets/images/index_icon/icon_zjd@2x.png" alt="" width="11px"></span>
							 <span style="color:rgba(102,102,102,1);">项目实际进度</span>
							 <span style="float: right;">
								 <span>72%</span>
								 <span style="color:rgba(64,69,94,1);">/100%</span>
							 </span>
						</p>
						 <p>
							 <van-progress color="#7AB182" :percentage="72" stroke-width="6" />
						 </p>
					 </div>
					 <div class="navLists">
						<p style="font-size:13px;margin: 0;">
							 <span><img src="../assets/images/index_icon/icon_zjd(1).png" alt="" width="11px"></span>
							 <span style="color:rgba(102,102,102,1);">项目计划进度</span>
							 <span style="float: right;">
								 <span>66%</span>
								 <span style="color:rgba(64,69,94,1);">/100%</span>
							 </span>
						</p>
						 <p  style="margin-bottom: 0;">
							 <van-progress color="#AAAAAA" :percentage="66" stroke-width="6" />
						 </p>
					 </div>
				</div>
				<div class="container_nav">
					 <div class="navLists">
						<p style="font-size:13px;margin: 0;">
							 <span><img src="../assets/images/index_icon/icon_zcz@2x.png" alt="" width="11px"></span>
							 <span style="color:rgba(102,102,102,1);">总产值</span>
							 <span style="float: right;">
								 <span>{{getSchedule.CompletedOutputValue}}万</span>
								 <span style="color:rgba(64,69,94,1);">/{{getSchedule.GrossOutput}}万</span>
								
							 </span>
						</p>
						<p>
							 <van-progress color="#DCAA4F" :percentage="getSchedule.PercentCompleted" stroke-width="6" />
						 </p>
					 </div>
					 <div class="navLists">
						<p style="font-size:13px;margin: 0;">
							 <span><img src="../assets/images/index_icon/icon_gq@2x.png" alt="" width="11px"></span>
							 <span style="color:rgba(102,102,102,1);">工期</span>
							 <span style="float: right;">
								 <span>87天</span>
								 <span style="color:rgba(64,69,94,1);">/330天</span>
							 </span>
						</p>
						 <p  style="margin-bottom: 0;">
							 <van-progress color="#6A94B9" :percentage="56" stroke-width="6" />
						 </p>
					 </div>
				</div>
				<div class="container_nav" style="padding: 16px 8px;">
					<div class="nav_br">
						<div class="nav_t" @click="$router.push({path:'/intelligent?ValueId=0'})">
							<div class="tir_List">
								<span><img src="../assets/images/index_icon/icon_bd@2x.png" alt="" width="11px"></span>
								<span>CYCZQ-1标</span>
							</div>
							<div class="tir_List tir_Lists">
								<span>产值:</span><span style="color:#333">2,156万</span><span>/3,1156万</span>
							</div>
							<div class="tir_List tir_Lists">
								<span>超期:</span><span style="color:#C86565">249</span><span>/3,11256</span>
							</div>
							<div class="tir_List tir_Lists" style="margin-bottom: 0;">
								<span style="color:#69966F;font-size: 26px;">32%</span><span style="color:#AAAAAA;font-size:18px;">/36%</span>
							    <span><img src="../assets/images/index_icon/icon_more@2x(1).png" alt="" width="14px" style="float: right;margin-top: 16px;"></span>
							</div>
						</div>
						<div class="nav_t nav_r" @click="$router.push({path:'/intelligent?ValueId=1'})">
							<div class="tir_List">
								<span><img src="../assets/images/index_icon/icon_bd@2x.png" alt="" width="11px"></span>
								<span>CYCZQ-2标</span>
							</div>
							<div class="tir_List tir_Lists">
								<span>产值:</span><span style="color:#333">2,156万</span><span>/3,1156万</span>
							</div>
							<div class="tir_List tir_Lists" >
								<span>超期:</span><span style="color:#C86565">249</span><span>/3,11256</span>
							</div>
							<div class="tir_List tir_Lists" style="margin-bottom: 0;">
								<span style="color:#69966F;font-size: 26px;">32%</span><span  style="color:#AAAAAA;font-size:18px;">/36%</span>
								<span><img src="../assets/images/index_icon/icon_more@2x(1).png" alt="" width="14px" style="float: right;margin-top: 16px;"></span>
							</div>
						</div>
						
					</div>	
					<div class="nav_br">
						<div class="nav_t" @click="$router.push({path:'/intelligent?ValueId=2'})">
							<div class="tir_List">
								<span><img src="../assets/images/index_icon/icon_bd@2x.png" alt="" width="11px"></span>
								<span>CYCZQ-3标</span>
							</div>
							<div class="tir_List tir_Lists">
								<span>产值:</span><span style="color:#333">2,156万</span><span>/3,1156万</span>
							</div>
							<div class="tir_List tir_Lists">
								<span>超期:</span><span style="color:#C86565">249</span><span>/3,11256</span>
							</div>
							<div class="tir_List tir_Lists" style="margin-bottom: 0;">
								<span style="color:#E19B52;font-size: 26px;">32%</span><span  style="color:#AAAAAA;font-size:18px;">/36%</span>
								<span><img src="../assets/images/index_icon/icon_more@2x(1).png" alt="" width="14px" style="float: right;margin-top: 16px;"></span>
							</div>
						</div>
						<div class="nav_t nav_r" @click="$router.push({path:'/intelligent?ValueId=3'})">
							<div class="tir_List">
								<span><img src="../assets/images/index_icon/icon_bd@2x.png" alt="" width="11px"></span>
								<span>CYCZQ-4标</span>
							</div>
							<div class="tir_List tir_Lists">
								<span>产值:</span><span style="color:#333">2,156万</span><span>/3,1156万</span>
							</div>
							<div class="tir_List tir_Lists" >
								<span>超期:</span><span style="color:#C86565">249</span><span>/3,11256</span>
							</div>
							<div class="tir_List tir_Lists" style="margin-bottom: 0;">
								<span style="color:#C86565;font-size: 26px;">32%</span><span  style="color:#AAAAAA;font-size:18px;">/36%</span>
								<span><img src="../assets/images/index_icon/icon_more@2x(1).png" alt="" width="14px" style="float: right;margin-top: 16px;"></span>
							</div>
						</div>
						
					</div>
					<div class="nav_br" @click="$router.push({path:'/intelligent?ValueId=4'})">
						<div class="nav_t">
							<div class="tir_List">
								<span><img src="../assets/images/index_icon/icon_bd@2x.png" alt="" width="11px"></span>
								<span>CYCZQ-5标1</span>
							</div>
							<div class="tir_List tir_Lists">
								<span>产值:</span><span style="color:#333">2,156万</span><span>/3,1156万</span>
							</div>
							<div class="tir_List tir_Lists">
								<span>超期:</span><span style="color:#C86565">249</span><span>/3,11256</span>
							</div>
							<div class="tir_List tir_Lists" style="margin-bottom: 0;">
								<span style="color:#69966F;font-size: 26px;">32%</span><span style="color:#AAAAAA;font-size:18px;">/36%</span>
								<span><img src="../assets/images/index_icon/icon_more@2x(1).png" alt="" width="14px" style="float: right;margin-top: 16px;"></span>
							</div>
						</div>
						<div class="nav_t nav_r" @click="$router.push({path:'/intelligent?ValueId=5'})">
							<div class="tir_List">
								<span><img src="../assets/images/index_icon/icon_bd@2x.png" alt="" width="11px"></span>
								<span>CYCZQ-5标2</span>
							</div>
							<div class="tir_List tir_Lists">
								<span>产值:</span><span style="color:#333">2,156万</span><span>/3,1156万</span>
							</div>
							<div class="tir_List tir_Lists" >
								<span>超期:</span><span style="color:#C86565">249</span><span>/3,11256</span>
							</div>
							<div class="tir_List tir_Lists" style="margin-bottom: 0;">
								<span style="color:#69966F;font-size: 26px;">32%</span><span  style="color:#AAAAAA;font-size:18px;">/36%</span>
								<span><img src="../assets/images/index_icon/icon_more@2x(1).png" alt="" width="14px" style="float: right;margin-top: 16px;"></span>
							</div>
						</div>
						
					</div>
					<div class="nav_br" >
						<div class="nav_t"@click="$router.push({path:'/intelligent?ValueId=6'})">
							<div class="tir_List">
								<span><img src="../assets/images/index_icon/icon_bd@2x.png" alt="" width="11px"></span>
								<span>CYCZQ-6标</span>
							</div>
							<div class="tir_List tir_Lists">
								<span>产值:</span><span style="color:#333">2,156万</span><span>/3,1156万</span>
							</div>
							<div class="tir_List tir_Lists">
								<span>超期:</span><span style="color:#C86565">249</span><span>/3,11256</span>
							</div>
							<div class="tir_List tir_Lists" style="margin-bottom: 0;">
								<span style="color:#69966F;font-size: 26px;">32%</span><span style="color:#AAAAAA;font-size:18px;">/36%</span>
								<span><img src="../assets/images/index_icon/icon_more@2x(1).png" alt="" width="14px" style="float: right;margin-top: 16px;"></span>
							</div>
						</div>
						
						
					</div>
				</div>
			</div>
			
			<div class="container_list">
				<p class="van-hairline--bottom exam-title"><img src="../assets/images/index_icon/icon_aq@2x(1).png" alt="">安全质量</p>
			    <ul class="container_nav" style="padding: 24px 0;">
					<!-- @click="$router.push({path:'/leader_safeQualityList?userId='+$route.query.userId+'&type='+type})" -->
					 <li class="container_nav_aq"  >
						   <p style="position: relative;">待解决<img src="../assets/images/index_icon/icon_zy@2x.png" alt="" width="16px" style="position: absolute;top:4px;right: 12px;"></p> 
						   <p style="color: #C86565;">{{getInFo.d}}个</p>
					 </li>
					 <!-- @click="$router.push({path:'/leader_safeIssue?userId='+$route.query.userId})" -->
					 <li class="container_nav_shu"></li>
					 <li class="container_nav_aq" >
						 <p>安全问题</p> 
						 <p>{{getInFo.a}}个</p>
					 </li>
					 
					 <li class="container_nav_shu"></li>
					 <!-- @click="$router.push({path:'/leader_safeIssueZ?userId='+$route.query.userId})" -->
					 <li class="container_nav_aq" >
						 <p>质量问题</p> 
						 <p>{{getInFo.z}}个</p>
					 </li>
				</ul>
				
			</div>
			<!-- 智能劳务 -->
			<div class="container_list">
				<p class="van-hairline--bottom exam-title"><img src="../assets/images/index_icon/icon_lw@2x.png" alt="">智能劳务</p>
			  
				<div class="container_nav">
					
					 <div class="navLists">
						<p style="font-size:13px;margin: 0;">
							 <span><img src="../assets/images/index_icon/icon_zcq@2x.png" alt="" width="11px"></span>
							 <span style="color:rgba(102,102,102,1);">总出勤职工</span>
							 <span style="float: right;">
								 <span>{{user.UserNumber}}人</span>
								 <span style="color:rgba(64,69,94,1);">/{{user.AllUserNumber}}人</span>
							 </span>
						</p>
						 <p  style="margin-bottom: 0;">
							 <van-progress color="#6A94B9" :percentage="percentage.percentage1" stroke-width="6" />
						 </p>
					 </div>
				</div>
				<div class="container_nav" style="padding: 16px 8px;">
					<div class="nav_br">
						<div class="nav_t" @click="$router.push({path:'/Intelligence/labor?ValueId=0'})">
							<div class="tir_List">
								<span><img src="../assets/images/index_icon/icon_bd@2x.png" alt="" width="11px"></span>
								<span>CYCZQ-1标</span>
							</div>
							<div class="tir_List tir_Lists">
								<span>出勤:</span><span style="color:#333">3,234人</span><span>/3,762人</span>
							</div>
							
							<div class="tir_List tir_Lists" style="margin-bottom: 0;">
								<span style="color:#69966F;font-size: 26px;">92%</span><span style="color:#AAAAAA;font-size:12px;">  考试合格率</span>
							    <span><img src="../assets/images/index_icon/icon_more@2x(1).png" alt="" width="14px" style="float: right;margin-top: 16px;"></span>
							</div>
						</div>
						<div class="nav_t nav_r" @click="$router.push({path:'/Intelligence/labor?ValueId=1'})">
							<div class="tir_List">
								<span><img src="../assets/images/index_icon/icon_bd@2x.png" alt="" width="11px"></span>
								<span>CYCZQ-2标</span>
							</div>
							<div class="tir_List tir_Lists">
								<span>出勤:</span><span style="color:#333">3,234人</span><span>/3,762人</span>
							</div>
							
							<div class="tir_List tir_Lists" style="margin-bottom: 0;">
								<span style="color:#69966F;font-size: 26px;">92%</span><span style="color:#AAAAAA;font-size:12px;">  考试合格率</span>
								<span><img src="../assets/images/index_icon/icon_more@2x(1).png" alt="" width="14px" style="float: right;margin-top: 16px;"></span>
							</div>
						</div>
					</div>	
					<div class="nav_br">
						<div class="nav_t" @click="$router.push({path:'/Intelligence/labor?ValueId=2'})">
							<div class="tir_List">
								<span><img src="../assets/images/index_icon/icon_bd@2x.png" alt="" width="11px"></span>
								<span>CYCZQ-3标</span>
							</div>
							<div class="tir_List tir_Lists">
								<span>出勤:</span><span style="color:#333">3,234人</span><span>/3,762人</span>
							</div>
							
							<div class="tir_List tir_Lists" style="margin-bottom: 0;">
								<span style="color:#69966F;font-size: 26px;">92%</span><span style="color:#AAAAAA;font-size:12px;">  考试合格率</span>
								<span><img src="../assets/images/index_icon/icon_more@2x(1).png" alt="" width="14px" style="float: right;margin-top: 16px;"></span>
							</div>
						</div>
						<div class="nav_t nav_r" @click="$router.push({path:'/Intelligence/labor?ValueId=3'})">
							<div class="tir_List">
								<span><img src="../assets/images/index_icon/icon_bd@2x.png" alt="" width="11px"></span>
								<span>CYCZQ-4标</span>
							</div>
							<div class="tir_List tir_Lists">
								<span>出勤:</span><span style="color:#333">3,234人</span><span>/3,762人</span>
							</div>
							
							<div class="tir_List tir_Lists" style="margin-bottom: 0;">
								<span style="color:#E19B52;font-size: 26px;">92%</span><span style="color:#AAAAAA;font-size:12px;">  考试合格率</span>
								<span><img src="../assets/images/index_icon/icon_more@2x(1).png" alt="" width="14px" style="float: right;margin-top: 16px;"></span>
							</div>
						</div>
					</div>
					<div class="nav_br">
						<div class="nav_t" @click="$router.push({path:'/Intelligence/labor?ValueId=4'})">
							<div class="tir_List">
								<span><img src="../assets/images/index_icon/icon_bd@2x.png" alt="" width="11px"></span>
								<span>CYCZQ-5标1</span>
							</div>
							<div class="tir_List tir_Lists">
								<span>出勤:</span><span style="color:#333">3,234人</span><span>/3,762人</span>
							</div>
							
							<div class="tir_List tir_Lists" style="margin-bottom: 0;">
								<span style="color:#69966F;font-size: 26px;">92%</span><span style="color:#AAAAAA;font-size:12px;">  考试合格率</span>
								<span><img src="../assets/images/index_icon/icon_more@2x(1).png" alt="" width="14px" style="float: right;margin-top: 16px;"></span>
							</div>
						</div>
						<div class="nav_t nav_r" @click="$router.push({path:'/Intelligence/labor?ValueId=5'})">
							<div class="tir_List">
								<span><img src="../assets/images/index_icon/icon_bd@2x.png" alt="" width="11px"></span>
								<span>CYCZQ-5标2</span>
							</div>
							<div class="tir_List tir_Lists">
								<span>出勤:</span><span style="color:#333">3,234人</span><span>/3,762人</span>
							</div>
							
							<div class="tir_List tir_Lists" style="margin-bottom: 0;">
								<span style="color:#C86565;font-size: 26px;">92%</span><span style="color:#AAAAAA;font-size:12px;">  考试合格率</span>
								<span><img src="../assets/images/index_icon/icon_more@2x(1).png" alt="" width="14px" style="float: right;margin-top: 16px;"></span>
							</div>
						</div>
						
					</div>
					<div class="nav_br">
						<div class="nav_t"@click="$router.push({path:'/Intelligence/labor?ValueId=6'})">
							<div class="tir_List">
								<span><img src="../assets/images/index_icon/icon_bd@2x.png" alt="" width="11px"></span>
								<span>CYCZQ-6标</span>
							</div>
							<div class="tir_List tir_Lists">
								<span>出勤:</span><span style="color:#333">3,234人</span><span>/3,762人</span>
							</div>
							
							<div class="tir_List tir_Lists" style="margin-bottom: 0;">
								<span style="color:#69966F;font-size: 26px;">92%</span><span style="color:#AAAAAA;font-size:12px;">  考试合格率</span>
								<span><img src="../assets/images/index_icon/icon_more@2x(1).png" alt="" width="14px" style="float: right;margin-top: 16px;"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<index-footer></index-footer>
	</div>
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import indexFooter from '@/components/indexFooter.vue'
	import * as ajax from '@/utils/api'
	import Vue from 'vue';
	import { Swipe, SwipeItem,Toast,Grid, GridItem,Progress } from 'vant';
	Vue.use(Grid).use(GridItem).use(Progress).use(Swipe).use(SwipeItem).use(Toast)
	export default {
		components: {
			vantHeader,
			indexFooter
			// examFooter
		},
		data() {
			return {
				questionText:"常益长铁路工程信息化管理平台",
				images: [],
				type:'',
				getSchedule:{
					GrossOutput:"",
					CompletedOutputValue:"",
					PercentCompleted:0
				},
				getInFo:{
					a:'',
					b:'',
					c:''
					
				},
				user:{
					UserNumber:'',
					AllUserNumber:'',
					
				},
				percentage:{
					percentage1:0
				},
			}
		},
		created() {
			this.bannerImg()
		},
		mounted() {
			
		},
		
		methods: {
			windowButton(){
				window.location.href='https://www.jiandaoyun.com/sso/custom/5dbea33f85bed20006e0e5e4/iss';
			},
			bannerImg(){
				ajax.get('/API/WebAPIDataAudit/getWorkUserNumber?section='+'&worksite=').then(res => {
					console.log(res.data.data)
					if(res.data.data.UserNumber !=0 || res.data.data.UserNumber !=0 ||res.data.data.UserNumber >0 || res.data.data.UserNumber >0){
						this.user.UserNumber=res.data.data.UserNumber
						this.user.AllUserNumber=res.data.data.AllUserNumber
						this.percentage.percentage1=Number((this.user.UserNumber/this.user.AllUserNumber)*100)
					}else{
						this.user.UserNumber=0
						this.user.AllUserNumber=0
						this.percentage.percentage1=0
					}
					
				})
				ajax.get('/API/WebAPIDataAudit/Banner').then(res => {
					if(res.data.result) {
						console.log(res)
						this.images=res.data.data;
					}
				})
				ajax.getW('/api/safety/selectUserById?id='+this.$route.query.userId).then(res => {
					if(res.status == 200) {
						if(res.data.code == 200) {
							this.type=res.data.data.info.TYPES
							console.log("selectUserById：",res.data);
						}
					}
				})
				ajax.postW('/api/jdyApi/selectDatas').then(res => {
					if(res.status == 200) {
						if(res.data.code == 200) {
							this.getInFo.a=res.data.data.a;
							this.getInFo.d=res.data.data.d;
							this.getInFo.z=res.data.data.z
						}
					}
				})
				ajax.get('/API/WebAPIDataAudit/getSchedule').then(res => {
					if(res.data.result) {
						this.getSchedule.GrossOutput = res.data.data.GrossOutput
						this.getSchedule.CompletedOutputValue = res.data.data.CompletedOutputValue
						this.getSchedule.PercentCompleted = Number((res.data.data.PercentCompleted)*100)
						
					}
				})
			},
			tost(){
				Toast('敬请期待！');
			}
		}
	}
</script>

<style scoped>
	/* p{} */

	.container_nav_aq{
		width: 33%;
		height: auto;
		overflow: hidden;
		float: left;
		text-align: center;
	}
	.container_nav_aq p{
		
	}
	
	.container_nav_aq p:first-child{
		margin: 0;
	}
	.container_nav_aq p:last-child{
		margin-bottom: 0;
		font-size:20px;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:#333333;
		margin-top: 12px;
	}
	.container_nav_shu{
		width:1px;
		height:30px;
		background:rgba(216,216,216,1);
		float: left;
		margin-top: 18px;
	}
	
	.tir_Lists{
		color:#AAAAAA;
		margin:12px 0;
		font-size: 13px;
	}
	.nav_t{
		padding: 12px 8px;
		width: 49%;
		height: auto;
		overflow: hidden;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 2px 0px rgba(17,24,36,0.24);
		border-radius:4px;
		float: left;
	}
	.nav_r{
		float: right;
	}
	.header-right {
		line-height: 5px;
		color:#fff;
	}
	.containerIndex {
		padding-top: 46px;
		    margin-bottom: 60px;
	}
	.nav_br{
		height:auto;
		overflow: hidden;
		margin-bottom: 10px;
		padding: 1px;
	}
	.nav_br:last-child{
		margin-bottom: 0px;
	}
	.login-bg{
		width: 100%;
		height:auto;
		overflow: hidden;
		float: left;
	}
	.containerIndex .login-bg img.back_img {
		width: 100%;
		float: left;
		position: relative;
	}
	.containerIndex .login-bg img.icon_img {
		height: 60px;
		/* width: 100%; */
		float: left;
		position: absolute;
		top:22%;
		left: 50%;
		margin-left: -136px;
	}
	.navList {
		padding: 17px 15px 0;
		height: auto;
		overflow: hidden;
		background: #fff;
		box-shadow:0px 1px 1px 0px rgba(0,0,0,0.1);
	}
	.container_list{
		height: auto;
		overflow: hidden;
		background: #fff;
		box-shadow:0px 1px 1px 0px rgba(0,0,0,0.1);
		margin-top: 10px;
	}
	.container_nav{
		height: auto;
		overflow: hidden;
		border-bottom: 1px solid rgba(238,238,238,1);
		padding: 16px;
	}
	.navList li{
		width: 25%;
		float: left;
		height: auto;
		overflow: hidden;
		text-align: center;
		clor:#333333;
		margin-bottom: 17px;
	}
	.navList p{
		/* line-height: 13px; */
		font-size: 13px;
		margin-bottom: 0;
	}
	.navList img{
		width: 20px;
		height:22px;
		display: block;
		margin: 0 auto;
	}
	.van-hairline--bottom{
		height: 40px;
		line-height: 40px;
		font-size:14px;
		padding-left: 14px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:40px;
		margin: 0;
		border-bottom: 1px solid rgba(238,238,238,1);
	}
	.van-hairline--bottom img{
		width: 12px;
		height: 12px;
		float: left;
		margin-right: 5px;
		margin-top: 14px;
	}
</style>
