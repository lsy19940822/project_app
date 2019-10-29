<template>
	<div class="container">
		<!--header-->
		<vant-header :leftArrow="false" :titleType="1" :title="questionText" :rightType='2' >
			<div slot='right_slot'>
				<p class="header-right"><img src="../../assets/images/index_icon/icon_l.png" alt=""></p>
			</div>
		</vant-header>

		<!--content list-->
		<div class="list-content">
			<van-tabs v-model="active">
			  <van-tab title="待解决">
				<ul class="l-list">
					<li>
						<div class="item">
							<h6 class="title">1标主站桥梁存在严重的质量问题，电线直接放在地上</h6>
							<div class="explain marginT12">
								<van-row>
									<van-col span="16">
										<span class="small-headPhoto"><img src="../../assets/images/safeQuality/img_headPhoto.png"/></span>
										<span class="color666">张总</span>
										<span class="colorAAA">2019-09-26</span>
									</van-col>
									<van-col span="8" align="right">
										<span class="colorC86565">待解决</span>
									</van-col>
								</van-row>
							</div>
							<div class="intro marginT12 omit2">今年以来，根据各地上报数据，全市共有建设项目326个，其中：市级项目32个，六枝特区今年以来，根据各地上报数据，全市共有建</div>
						</div>
					</li>
				</ul>
			  </van-tab>
			  <van-tab title="已解决">
				<ul class="l-list">
					<li>
						<div class="item">
							<h6 class="title">1标主站桥梁存在严重的质量问题，电线直接放在地上</h6>
							<div class="explain marginT12">
								<van-row>
									<van-col span="16">
										<span class="small-headPhoto"><img src="../../assets/images/safeQuality/img_headPhoto.png"/></span>
										<span class="color666">张总</span>
										<span class="colorAAA">2019-09-26</span>
									</van-col>
									<van-col span="8" align="right">
										<span class="colorC86565">已解决</span>
									</van-col>
								</van-row>
							</div>
							<div class="intro marginT12 omit2">今年以来，根据各地上报数据，全市共有建设项目326个，其中：市级项目32个，六枝特区今年以来，根据各地上报数据，全市共有建</div>
						</div>
					</li>
				</ul>
			  </van-tab>
			</van-tabs>
			<van-loading class="spinner" v-if = 'isLoading' size="24px" type="spinner">加载中...</van-loading>
			<div v-else class="spinner"><span><van-icon name="more-o" /></span>已经到底啦~</div>
		</div>
        <study-footer></study-footer>
	</div>
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import studyFooter from '@/components/studyFooter.vue'
	import Vue from 'vue';
	import { Row, Col, Loading, Tab, Tabs  } from 'vant';
	Vue.use(Row).use(Col).use(Loading).use(Tab).use(Tabs);
	export default {
		data(){
			return{
				questionText:'安全质量',
			    isLoading:true,
			    active: 2
			}
		},
		components:{
			vantHeader,
			studyFooter
		}
	}
</script>

<style scoped>
*{margin:0;}
.header-right {
		line-height: 5px;
		color:#fff;
		margin: 14px 0;
	}
img{display: block;width:100%;height:auto}
/deep/ .van-tabs__line{background-color: #9499AA;width:50% !important;}
.color666{color:#666;}
.omit {overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.omit2{display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}
.marginT12{margin-top:12px;}
.container{padding-top:46px;}
/*.notice-box{width:20px;height:20px;}*/
/*ontent list*/
.list-content{background:#fff;}
.list-content{margin-top:10px;}
.l-list{padding:0 14px;}
.l-list li{border-bottom:1px solid #eee;}
.title{font-size:18px;color:#333;line-height:24px;}
.explain{font-size:12px;}
.intro{font-size:16px;color:#666;}
.item{padding:14px 0;}
.color7099D0{color:#7099D0;}/*安全问题-蓝色*/
.color7099D0{color:#7099D0;}
.colorAAA{color:#aaa;}
.colorE19B52{color:#E19B52;}/*待指派*/
.color5082C6{color:#5082C6}/*待解决*/
.color7081B9{color:#7081B9}/*带抄送*/
.colorE6B36F{color:#E6B36F}/*质量问题*/
.colorC86565{color:#C86565}/*退回问题*/
.color5268E1{color:#5268E1;}/*待审核*/
.color53904D{color:#53904D;}/*待复核*/
/*loading*/
.spinner{text-align:center;font-size:14px;padding:15px 0;color:#969799;}
/**/
.small-headPhoto{width:20px;height:20px;float: left;margin-right:5px;}
</style>