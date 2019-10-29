<template>
	<div class="container">
		<!--header-->
		<vant-header :leftArrow="false" :titleType="1" :title="questionText" :rightType='2' >
			<div slot='right_slot'>
				<p class="header-right"><img src="../../assets/images/index_icon/icon_l.png" alt=""></p>
			</div>
		</vant-header>
		<!--安全质量nav-->
		<div class="l-navBox">
			<van-row>
				<van-col span="6">
					<router-link to='/leader_poseProblem'>
						<div class="img-box">
							<img src="../../assets/images/safeQuality/icon_issue.png" />
						</div>
						<div class="text">问题发起</div>
					</router-link>
				</van-col>
				
				<van-col span="6">
					<router-link to='/leader_safeIssue'>
						<div class="img-box">
							<img src="../../assets/images/safeQuality/icon_safe.png" />
						</div>
						<div class="text">安全问题</div>
					</router-link>
					
				</van-col>
				
				<van-col span="6">
					<div class="img-box">
						<img src="../../assets/images/safeQuality/icon_quality.png" />
					</div>
					<div class="text">质量问题</div>
				</van-col>
				
				<van-col span="6">
					<router-link to='/leader_resolved'>
						<div class="img-box">
							<img src="../../assets/images/safeQuality/icon_solve.png" />
						</div>
						<div class="text">已解决</div>
					</router-link>
				</van-col>
			</van-row>
		</div>
		<!--content list-->
		<div class="list-content">
			<div class="l-dropdown">
				<van-dropdown-menu>
					  <van-dropdown-item v-model="value1" :options="option1" />
					  <van-dropdown-item v-model="value2" :options="option2" />
				</van-dropdown-menu>
			</div>
			<ul class="l-list">
				<li>
					<div class="item">
						<h6 class="title">1标主站桥梁存在严重的质量问题，电线直接放在地上</h6>
						<div class="explain marginT12">
							<van-row>
								<van-col span="16">
									<span class="color7099D0">安全问题</span>
									<span class="colorAAA">2019-09-26  22:22:22</span>
								</van-col>
								<van-col span="8" align="right">
									<span class="colorE19B52">待指派</span>
								</van-col>
							</van-row>
						</div>
						<div class="intro marginT12 omit2">今年以来，根据各地上报数据，全市共有建设项目326个，其中：市级项目32个，六枝特区今年以来，根据各地上报数据，全市共有建</div>
					</div>
				</li>
				
				<li>
					<div class="item">
						<h6 class="title">1标主站桥梁存在严重的质量问题，电线直接放在地上</h6>
						<div class="explain marginT12">
							<van-row>
								<van-col span="16">
									<span class="color7099D0">安全问题</span>
									<span class="colorAAA">2019-09-26  22:22:22</span>
								</van-col>
								<van-col span="8" align="right">
									<span class="color5082C6">待解决</span>
								</van-col>
							</van-row>
						</div>
						<div class="intro marginT12 omit2">今年以来，根据各地上报数据，全市共有建设项目326个，其中：市级项目32个，六枝特区今年以来，根据各地上报数据，全市共有建</div>
					</div>
				</li>
				
				<li>
					<div class="item">
						<h6 class="title">1标主站桥梁存在严重的质量问题，电线直接放在地上</h6>
						<div class="explain marginT12">
							<van-row>
								<van-col span="16">
									<span class="colorE6B36F">质量问题</span>
									<span class="colorAAA">2019-09-26  22:22:22</span>
								</van-col>
								<van-col span="8" align="right">
									<span class="color7081B9">带抄送</span>
								</van-col>
							</van-row>
						</div>
						<div class="intro marginT12 omit2">今年以来，根据各地上报数据，全市共有建设项目326个，其中：市级项目32个，六枝特区今年以来，根据各地上报数据，全市共有建</div>
					</div>
				</li>
				
				<li>
					<div class="item">
						<h6 class="title">1标主站桥梁存在严重的质量问题，电线直接放在地上</h6>
						<div class="explain marginT12">
							<van-row>
								<van-col span="16">
									<span class="color7099D0">安全问题</span>
									<span class="colorAAA">2019-09-26  22:22:22</span>
								</van-col>
								<van-col span="8" align="right">
									<span class="colorC86565">退回问题</span>
								</van-col>
							</van-row>
						</div>
						<div class="intro marginT12 omit2">今年以来，根据各地上报数据，全市共有建设项目326个，其中：市级项目32个，六枝特区今年以来，根据各地上报数据，全市共有建</div>
					</div>
				</li>
			</ul>
			<van-loading class="spinner" v-if = 'isLoading' size="24px" type="spinner">加载中...</van-loading>
			<div v-else class="spinner"><span><van-icon name="more-o" /></span>已经到底啦~</div>
		</div>

	</div>
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import Vue from 'vue';
	import { Row, Col, DropdownMenu, DropdownItem, Loading } from 'vant';
	Vue.use(Row).use(Col).use(DropdownMenu).use(DropdownItem).use(Loading);
	export default {
		data(){
			return{
				questionText:'安全质量',
				value1: 0,
			     value2: 'a',
			     option1: [
			        { text: '全部状态', value: 0 },
			        { text: '待指派', value: 1 },
			        { text: '待解决', value: 2 },
			        { text: '待抄送', value: 3 },
			        { text: '待审核', value: 4 },
			        { text: '退回问题', value: 5 },
			        { text: '待复核', value: 6 },
			        { text: '待指派', value: 7 }
			     ],
			     option2: [
			        { text: '全部标段', value: 'a' },
			        { text: '1标', value: 'b' },
			        { text: '2标', value: 'c' },
			    ],
			    isLoading:true
			}
		},
		components:{
			vantHeader
		}
	}
</script>

<style scoped>
	.header-right {
			line-height: 5px;
			color:#fff;
			margin: 14px 0;
		}
*{margin:0;}
img{display: block;width:100%;height:auto}
.color666{color:#666;}
.omit {overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.omit2{
	display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;
}
.marginT12{margin-top:12px;}
.container{padding-top:46px;}
.van-dropdown-menu{width:90%;margin:0 auto;}
/deep/ .van-dropdown-menu .van-dropdown-menu__item:first-child {border-right:1px solid #ccc;margin-right:10px;}
/deep/ .van-dropdown-menu .van-dropdown-menu__item{border:1px solid #CCC;border-radius: 2px;background:#F9F9F9;}
/*安全质量nav*/
.notice-box{width:20px;height:20px;}
.l-navBox{padding:20px 0;background:#fff;}
.img-box{width:26px;height:26px;margin:0 auto;}
.img-box,.text{color:#333;text-align:center;}
.text{margin-top:10px;}
/*ontent list*/
.list-content{background:#fff;}
.l-dropdown{padding:10px 0;background:#fff;border-bottom:1px solid #ECECEC;}

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
</style>