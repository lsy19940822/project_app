<template>
	<div id="index">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2">

		</vant-header>
		
		<div class="containerIndex">
			<div class="header_inte">
				<div class="inte_gent">
					<ul class="innerLabel" >
						<li ref='style'
						@click="studyActives($event,index)" 
						:class="{activeLabel:num==index}" v-for="(item,index) in cycaqData"
						:id="index">{{item.title}}</li>
					</ul>
				</div>
			</div>
			<div class="container_list">
				<p class="van-hairline--bottom exam-title"><img src="../../assets/images/user_icon/icon_M@2x (1).png" alt="">标段详情</p>
				<div class="container_nav">
					<div class="navLists" prop="percentage">
						<p style="font-size:13px;margin: 0;">
							<span><img src="../../assets/images/user_icon/icon_M@2x (5).png" alt="" width="11px"></span>
							<span style="color:rgba(102,102,102,1);">标段实际进度</span>
							<span style="float: right;">
								<span>{{percentage.percentage1}}<span v-if="percentage.percentage1!=0">%</span></span>
								<span style="color:rgba(64,69,94,1);">/100%</span>
							</span>
						</p>
						<p>
							<van-progress color="#7AB182" :percentage="percentage.percentage1" stroke-width="6" />
						</p>
					</div>
					<div class="navLists" prop="percentage">
						<p style="font-size:13px;margin: 0;">
							<span><img src="../../assets/images/user_icon/icon_M@2x (4).png" alt="" width="11px"></span>
							<span style="color:rgba(102,102,102,1);">标段计划进度</span>
							<span style="float: right;">
								<span>{{percentage.percentage2}}<span v-if="percentage.percentage2!=0">%</span></span>
								<span style="color:rgba(64,69,94,1);">/100%</span>
							</span>
						</p>
						<p style="margin-bottom: 0;">
							<van-progress color="#AAAAAA" :percentage="percentage.percentage2" stroke-width="6" />
						</p>
					</div>
				</div>
				<div class="container_nav">
					<div class="navLists" prop="percentage">
						<p style="font-size:13px;margin: 0;">
							<span><img src="../../assets/images/user_icon/icon_M@2x (3).png" alt="" width="11px"></span>
							<span style="color:rgba(102,102,102,1);">标段产值</span>
							<span style="float: right;">
								<span>{{percentage.percentage3}}<span v-if="percentage.percentage3!=0">万</span></span>
								<span style="color:rgba(64,69,94,1);">/30989.99万</span>

							</span>
						</p>
						<p>
							<van-progress color="#DCAA4F" :percentage="percentage.percentage5" stroke-width="6" />
						</p>
					</div>
					<div class="navLists"prop="percentage">
						<p style="font-size:13px;margin: 0;">
							<span><img src="../../assets/images/user_icon/icon_M@2x (2).png" alt="" width="11px"></span>
							<span style="color:rgba(102,102,102,1);">标段工期</span>
							<span style="float: right;">
								<span>{{percentage.percentage4}}<span v-if="percentage.percentage4!=0">天</span></span>
								<span style="color:rgba(64,69,94,1);">/330天</span>
							</span>
						</p>
						<p style="margin-bottom: 0;">
							<van-progress color="#6A94B9" :percentage="percentage.percentage4" stroke-width="6" />
						</p>
					</div>
				</div>
			</div>
			<ul class="container_list overflow">
				<li class="overflow" @click="$router.push({path:'/BeyondThe'})">
					<van-cell is-link>
						<span>超期工程</span>
						<span class='tag' style="float: right;"><span style='color: #C86565;'>0</span><span class='color:#AAAAAA'>/20325</span></span>
					</van-cell>
				</li>
			</ul>
			<ul>
				<li class='Buttond'  @click="$router.push({path:'/intelligent_firstLevel?ValueId='+num})">
					<van-button color="#7099D0" size="normal" style='width: 100%;' >查看进度详情</van-button>
				</li>
			</ul>
		</div>
		<!-- <index-footer></index-footer> -->

	</div>
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import indexFooter from '@/components/indexFooter.vue'
	import * as ajax from '@/utils/api'
	import Vue from 'vue';
	import {
		Swipe,
		Cell,
		SwipeItem,
		Toast,
		Grid,
		GridItem,
		Progress,
		Button,
	} from 'vant';
	Vue.use(Button).use(Grid).use(GridItem).use(Progress).use(Swipe).use(SwipeItem).use(Toast).use(Cell)
	export default {
		components: {
			vantHeader,
			indexFooter
			// examFooter
		},
		data() {
			return {
				questionText: "智能进度",
				cycaqData:[
					{"title":"CYCZQ-1标"},
					{"title":"CYCZQ-2标"},
					{"title":"CYCZQ-3标"},
					{"title":"CYCZQ-4标"},
					{"title":"CYCZQ-5标1"},
					{"title":"CYCZQ-5标2"},
					{"title":"CYCZQ-6标"},
				],
				num:0,
				transform:0,
				percentage:{
					percentage1:0,
					percentage2:0,
					percentage3:0,
					percentage4:0,
					percentage5:0,
				},
				id:0
			}
		},
		created() {
			this.GetMenuTreeList();
			 this.num=Number(this.$route.query.ValueId);
		},
		mounted() {
           
		  
			
		},
		methods: {
			inte(){
				
			},
			studyActives(event, index) {
				console.log("当前标段id：",event.target.id)
				// this.id=event.target.id;
				this.num=index;
				if(this.num<3){
					this.$refs.style[0].style.marginLeft='0px'
				}else if(this.num == 3){
					this.$refs.style[0].style.marginLeft=Number(-(91/2+(index)*6))+'px'
				}else if(this.num>3){
					this.$refs.style[0].style.marginLeft=Number(-(91/2+(index)*6)*4.5)+'px'
				}
				if(this.num == 1){
					this.percentage.percentage1=Number(32)
					this.percentage.percentage2=Number(61)
					this.percentage.percentage3=Number(32)
					this.percentage.percentage4=Number(61)
					this.percentage.percentage5=Number(32)
					// this.percentage.percentage3=Number(12365)
					// this.percentage.percentage4=Number(65)
				}else{
					this.percentage.percentage1=0
					this.percentage.percentage2=0
					this.percentage.percentage3=0
					this.percentage.percentage4=0
					this.percentage.percentage5=0
				}
				// console.log("左右滑动",index,91/2+(index)*6,this.$refs.style[0],this.$refs.style[0].style.marginLeft=+Number(-(91/2+(index)*6))+'px')
			
			},
             GetMenuTreeList(){
				
			}
		}
	}
</script>

<style scoped>
	/* p{} */
	/*  */
	.innerLabel li.activeLabel{
		background: #595F73;
		border:1px solid #595F73;
		color: #fff;
	} 
	.innerLabel li{
		padding: 0 12px;
		width: auto;
		height:26px;
		border:1px solid rgba(204,204,204,1);
		float: left;
		margin-left: 6px;
		color: #AAAAAA;
		font-size: 12px;
		text-align: center;
		-ms-flex-negative: 0;
		flex-shrink: 0;
		transform: all .5s ease;
		border-radius:2px;
		line-height: 24px;
	}
	.innerLabel li:first-child{
		margin-left: 0;
	}
	.inte_gent,.innerLabel{
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
	.header_inte{
		width: auto;
		height: auto;
		overflow: hidden;
		padding: 14px 16px;
		background: #fff;
		border-bottom: 1px solid rgba(238, 238, 238, 1);
	}
	/*  */
    .Buttond{
		margin: 10px 16px;
		height:44px;
		border-radius:2px;
		font-size:16px;
		text-align: center;
		line-height: 44px;
	}
	.container_nav_aq {
		width: 33%;
		height: auto;
		overflow: hidden;
		float: left;
		text-align: center;
	}

	.container_nav_aq p {}

	.container_nav_aq p:first-child {
		margin: 0;
	}

	.container_nav_aq p:last-child {
		margin-bottom: 0;
		font-size: 20px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
		margin-top: 12px;
	}

	.container_nav_shu {
		width: 1px;
		height: 30px;
		background: rgba(216, 216, 216, 1);
		float: left;
		margin-top: 18px;
	}

	.tir_Lists {
		color: #AAAAAA;
		margin: 12px 0;
		font-size: 13px;
	}

	.nav_t {
		padding: 12px 8px;
		width: 49%;
		height: auto;
		overflow: hidden;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 2px 0px rgba(17, 24, 36, 0.24);
		border-radius: 4px;
		float: left;
	}

	.nav_r {
		float: right;
	}

	.header-right {
		line-height: 5px;
		color: #fff;
	}

	.containerIndex {
		padding-top: 46px;
		margin-bottom: 60px;
	}

	.nav_br {
		height: auto;
		overflow: hidden;
		margin-bottom: 10px;
		padding: 1px;
	}

	.nav_br:last-child {
		margin-bottom: 0px;
	}

	.login-bg {
		width: 100%;
		height: auto;
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
		top: 22%;
		left: 50%;
		margin-left: -136px;
	}

	.navList {
		padding: 17px 15px 0;
		height: auto;
		overflow: hidden;
		background: #fff;
		box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.1);
	}

	.container_list {
		height: auto;
		overflow: hidden;
		background: #fff;
		box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.1);
	}

	.container_nav {
		height: auto;
		overflow: hidden;
		border-bottom: 1px solid rgba(238, 238, 238, 1);
		padding: 16px;
	}

	.navList li {
		width: 25%;
		float: left;
		height: auto;
		overflow: hidden;
		text-align: center;
		clor: #333333;
		margin-bottom: 17px;
	}

	.navList p {
		/* line-height: 13px; */
		font-size: 13px;
		margin-bottom: 0;
	}

	.navList img {
		width: 20px;
		height: 20px;
		display: block;
		margin: 0 auto;
	}

	.van-hairline--bottom {
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		padding-left: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 40px;
		margin: 0;
		border-bottom: 1px solid rgba(238, 238, 238, 1);
	}

	.van-hairline--bottom img {
		width: 12px;
		height: 12px;
		float: left;
		margin-right: 5px;
		margin-top: 14px;
	}
</style>
