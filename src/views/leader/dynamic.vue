<template>
	<div class="container">
		<!--header-->
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType='2' >
		
		</vant-header>

		<!--content list-->
		<div class="list-content" >
			<van-tabs v-model="active">
			  <van-tab title="问题动态">
				<ul class="l-list">
					<li>
						<div class="item">
							<h6 class="title">发起问题</h6>
							<div class="explain marginT12">
								<van-row>
									<van-col span="16" class='headPhoto'>
										<span class="small-headPhoto"><img src="../../assets/images/safeQuality/img_headPhoto.png"/></span>
										<span class="color666">张总(中铁总经理)</span>
										<!-- <span class="colorAAA">2019-09-26</span> -->
									</van-col>
									<van-col span="8" align="right">
										<span class="colorC86565">提交</span>
									</van-col>
								</van-row>
							</div>
							<div class="intro marginT12 omit2">处理时间：2019-10-09 22:23:23</div>
						</div>
					</li>
					<li>
						<div class="item">
							<h6 class="title">同意分配</h6>
							<div class="explain marginT12">
								<van-row>
									<van-col span="16"  class='headPhoto'>
										<span class="small-headPhoto"><img src="../../assets/images/safeQuality/img_headPhoto.png"/></span>
										<span class="color666">张总(中铁总经理)</span>
										<!-- <span class="colorAAA">2019-09-26</span> -->
									</van-col>
									<van-col span="8" align="right">
										<span class="colorC86565">提交</span>
									</van-col>
								</van-row>
							</div>
							<div class="intro marginT12 omit2">处理时间：2019-10-09 22:23:23</div>
						</div>
					</li>
				</ul>
			  </van-tab>
			  <van-tab title="流程图">
				    <ul class="flowChart overflow">
						<div id='shu3-5'></div>
						<div id='shu3-6'></div>
						<div id='shu3-7'></div>
						<div id='shu3-8'></div>
						<li class='flowChart—li' style="background:rgba(241,247,242,1);border:1px solid rgba(122,177,130,1)"><img src="../../assets/images/index_icon/start@2x.png" alt="" style="width: 15px;float: left;margin-left: 20px;margin-top: 12px;"/><label style="margin-left: -10px;">发起问题</label></li>
						<li class='flowChart—s'><span></span></li>
						<span class='shu3'></span>
						<span class='shu4'></span>
						<div class="overflow" style="margin-top: -5px;">
							<li class='flowChart—li' style="position: relative;background:rgba(112,153,208,1);color: #fff;float: left;"><img src="../../assets/images/index_icon/icon@2x (1).png" alt="" style="width: 12px;float: left;margin-left: 20px;margin-top: 12px;"/><label style="margin-left: -10px;">现场负责人</label><span class='shu3' id='shu3-1'></span></li>
							<li class='flowChart—li' style="position: relative;float: left;"><img src="../../assets/images/index_icon/icon@2x (3).png" alt="" style="width: 12px;float: left;margin-left: 20px;margin-top: 12px;"/>发起人修改<span class='shu3' id='shu3-2'></span></li>
						</div>
						
					
						<li class='flowChart—s'><span class='shu2'></span></li>
						<li class='flowChart—li' style="position: relative;"><img src="../../assets/images/index_icon/icon@2x (2).png" alt="" style="width: 12px;float: left;margin-left: 16px;margin-top: 12px;"/>抄送相关人员<div id='shu3-3'></div></li>
						<li class='flowChart—s'><span class='shu2'></span></li>
						<li class='flowChart—li'style="position: relative;"><img src="../../assets/images/index_icon/icon@2x (2).png" alt="" style="width: 12px;float: left;margin-left: 16px;margin-top: 12px;"/>相关人员整改<span class='shu3' id='shu3-4'></span></li>
						<li class='flowChart—s'><span class='shu2'></span></li>
						<li class='flowChart—li'style="position: relative;"><img src="../../assets/images/index_icon/icon@2x (2).png" alt="" style="width: 12px;float: left;margin-left: 20px;margin-top: 12px;"/>负责人审批<div  id='shu3-3'></div></li>
						<li class='flowChart—s'><span class='shu2'></span></li>
						<li class='flowChart—li' style="position: relative;"><img src="../../assets/images/index_icon/icon@2x (2).png" alt="" style="width: 12px;float: left;margin-left: 20px;margin-top: 12px;"/>发起人复核<div  id='shu3-3' style="width: 100px;top: 62px;left: -35px"></div><span class='shu4'style="top: 22px;right: -68px"></span></li>
						<li class='flowChart—s'><span class='shu2' style="height: 51px;"></span></li>
						<li class='flowChart—li'><img src="../../assets/images/index_icon/icon@2x (2).png" alt="" style="width: 12px;float: left;margin-left: 20px;margin-top: 14px;"/>问题归档</li>
						
					</ul>
			  </van-tab>
			</van-tabs>
<!-- 			<van-loading class="spinner" v-if = 'isLoading' size="24px" type="spinner">加载中...</van-loading>
			<div v-else class="spinner"><span><van-icon name="more-o" /></span>已经到底啦~</div> -->
		</div>
        <!-- <study-footer></study-footer> -->
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
				questionText:'问题流程',
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

.flowChart span{
		display: block;
		position: relative;
		background: #DDDDDD;
}
.flowChart span:after{  
    content: '';  
    display: block;  
    border-top: 4px solid transparent;  
    border-bottom: 4px solid transparent;   
    border-left: 4px solid #7FA6DA;  
    position: absolute;   
    right: -1px;
	bottom: -2px;
	z-index: 10;
	transform: rotate(90deg);
}
#shu3-4{width:18px;height:2px;top: 18px;left: -20px;position: absolute;}
#shu3-1{width:18px;height:2px;top: 18px;left: -20px;position: absolute;}
#shu3-3{width:18px;height:2px;top: 18px;left: -20px;background: #DDDDDD;position: absolute;}
#shu3-5{width: 2px;height: 69px;top: 109px;left: 11px;background: #DDDDDD;position: absolute;}
#shu3-6{width: 2px;height: 69px;top: 243px;left: 11px;background: #DDDDDD;position: absolute;}
#shu3-7{width: 2px;height: 358px;top: 64px;left: 0px;background: #DDDDDD;position: absolute;}
#shu3-8{width: 2px;height: 360px;top: 63px;left: 272px;background: #DDDDDD;position: absolute;}
#shu3-2{width: 32px;height: 2px;top: 18px;left: -34px;position: absolute;}
.flowChart span.shu3{width:102px;height:2px;top: -28px;left: -5px;}
.flowChart span.shu3:after{right: -1px;bottom: -3px;z-index: 10;transform: rotate(0deg);  border-left: 4px solid #DDDDDD;}
.flowChart span.shu4{width:173px;height:2px;top: -30px;
   right: -101px;transform: rotate(180deg);}
.flowChart span.shu4:after{right: -1px;bottom: -3px;z-index: 10;transform: rotate(0deg);  border-left: 4px solid #DDDDDD;}
.flowChart{
	margin: 20px;
	padding-bottom: 20px;
	position: relative;
}
.flowChart li{
	margin-left: 32px;
}
.flowChart li.flowChart—li{
	width:134px;
	height:40px;
	background:rgba(246,246,246,1);
	border-radius:2px;
	border:1px solid rgba(238,238,238,1);
	text-align: center;
	line-height: 40px;
}
.flowChart li.flowChart—s{
	width:134px;
	overflow: hidden;
	height: auto;
}
.flowChart li.flowChart—s span.shu2{
	height:27px;background: #DDDDDD;
}
.flowChart li.flowChart—s span.shu2:after{  border-left: 4px solid #DDDDDD;}
.flowChart li.flowChart—s span{
	display: block;
	margin: 0 auto;
	width:2px;
	height:51px;
	background: #7FA6DA;
	position: relative;   
}
.flowChart li.flowChart—s span:after{  
    content: '';  
    display: block;  
    border-top: 4px solid transparent;  
    border-bottom: 4px solid transparent;   
    border-left: 4px solid #7FA6DA;  
    position: absolute;   
    right: -1px;
	bottom: -2px;
	z-index: 10;
	transform: rotate(90deg);
}
.headPhoto{
	line-height: 20px;
}
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
/* .list-content{margin-top:10px;} */
.l-list{padding:0 14px;}
.l-list li{border-bottom:1px solid #eee;}
.title{font-size:18px;color:#333;line-height:24px;}
.explain{font-size:12px;}
.intro{font-size:14px;color:#666;}
.item{padding:14px 0;}
.color7099D0{color:#7099D0;}/*安全问题-蓝色*/
.color7099D0{color:#7099D0;}
.colorAAA{color:#aaa;}
.colorE19B52{color:#E19B52;}/*待指派*/
.color5082C6{color:#5082C6}/*待解决*/
.color7081B9{color:#7081B9}/*带抄送*/
.colorE6B36F{color:#E6B36F}/*质量问题*/
.colorC86565{color:#304F83}/*退回问题*/
.color5268E1{color:#5268E1;}/*待审核*/
.color53904D{color:#53904D;}/*待复核*/
/*loading*/
.spinner{text-align:center;font-size:14px;padding:15px 0;color:#969799;}
/**/
.small-headPhoto{width:20px;height:20px;float: left;margin-right:5px;}
</style>