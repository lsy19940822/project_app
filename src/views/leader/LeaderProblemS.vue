<template>
	<div id="examrecord">
		<div class="container">
			<ul class="container_list container_lists">
				<p class="van-hairline--bottom exam-title"><img src="../../assets/images/safeQuality/icon_t@2x (3).png" alt="">问题详情</p>
				<li>
					<span>问题提出人</span>
					<span :id="StaffInfoData.putNameId">{{StaffInfoData.putName}}</span>
				</li>

				<li>
					<span>所属部门</span>
					<span>{{StaffInfoData.department}}</span>
				</li>
				<li>
				    <div @click="showPicker = true"> <span>问题类型</span>
					    <span>{{value}}</span></div>
					    <van-popup v-model="showPicker" position="bottom">
					     <van-picker
					       show-toolbar
					       :columns="columns"
					       @cancel="showPicker = false"
					       @confirm="onConfirm"/>
					    </van-popup>
					<van-popup v-model="showPicker" position="bottom">
					   <van-picker
					    show-toolbar
					    :columns="columns"
					    @cancel="showPicker = false"
					    @confirm="onConfirm"/>
					</van-popup>
				</li>
				<li>
					<span>紧急类型</span>
					<span v-if="StaffInfoData.degreeid==1">特别紧急</span>
					<span v-if="StaffInfoData.degreeid==2">紧急</span>
					<span v-if="StaffInfoData.degreeid==3">一般</span>
				</li>
				<li>
					<span>提问时间</span>
					<span>{{StaffInfoData.dates}}</span>
				</li>
				<li>
					<span>问题负责人</span>
					<span>{{StaffInfoData.principleName}}</span>
				</li>
				<li>
					<span>限定时间</span>
					<span>{{StaffInfoData.endDate}}</span>
				</li>
			</ul>
			<ul class="container_list">
				<p class="van-hairline--bottom exam-title"><img src="../../assets/images/safeQuality/icon_t@2x (1).png" alt="">问题地点</p>
				<li class='more'>
					<van-cell>
						<span style="color: #304F83">{{StaffInfoData.location?StaffInfoData.location:'暂无地址信息'}}</span>
					</van-cell>
				</li>
				
				<li class='more'>
					<van-cell style='font-size: 12px;color:rgba(152,160,174,1);border-bottom:none;'>
						经度：{{StaffInfoData.longitude?StaffInfoData.longitude:'暂无'}} 纬度：{{StaffInfoData.latitude?StaffInfoData.latitude:'暂无'}}
					</van-cell>
				</li>
				<li class='Buttond'>
					<van-button color="rgba(89,95,115,1) " size="normal" style='width: 100%;'@click="$router.push({path:'/ProblemWhere'})">查看位置信息</van-button>
				</li>
			</ul>
			<ul class="container_list container_lists">
				<p class="van-hairline--bottom exam-title"><img src="../../assets/images/safeQuality/icon_t@2x (2).png" alt="">问题简述</p>
			
				<li>
					{{StaffInfoData.quesDesc}}
				</li>
			</ul>
			<ul class="container_list container_lists">
				<p class="van-hairline--bottom exam-title"><img src="../../assets/images/safeQuality/icon_t@2x (3).png" alt="">问题详情</p>
				<li>
					{{StaffInfoData.quesDetail}}
				</li>
			</ul>
			<div class="make" style="position: fixed;top: 0;bottom: 0; left: 0;right: 0;background: rgba(0,0,0,.7);z-index: 99;" id="0" v-show="show0">
				<van-swipe :autoplay="10000" class="swiper">
					<van-swipe-item v-for="(image, index) in quesPic" :key="index" >
						<img :src="image"/>
					</van-swipe-item>
				</van-swipe>
			</div>
			<div class="make" style="position: fixed;top: 0;bottom: 0; left: 0;right: 0;background: rgba(0,0,0,.7);z-index: 99;"  v-show="show1">
				<van-swipe :autoplay="10000" class="swiper">
					<van-swipe-item v-for="(image, index) in upImg" :key="index" >
						<img :src="image"/>
					</van-swipe-item>
				</van-swipe>
			</div>
			<ul class="container_list container_lists ul">
				<p class="van-hairline--bottom exam-title"><img src="../../assets/images/safeQuality/icon_t@2x (5).png" alt="">现场照片</p>
				<li class="overflow">
					<div v-for="(image,index) in quesPic" :key="index" :id="index"  @click="Preview_img(thumbnailPic,index,0)" id="0"><img :src="image" alt="" @click="Preview_img(thumbnailPic,index,0)" id="0"></div>
					
				</li>
			</ul>
			<ul class="container_list container_lists ul">
				<p class="van-hairline--bottom exam-title"><img src="../../assets/images/safeQuality/icon_t@2x (5).png" alt="">整改后的现场照片</p>
				<li class="overflow">
					
					<div v-for="(image,index) in upImg" :key="index"  @click="Preview_img(thumbnailUp,index,1)" id="1"><img :src="image" alt=""@click="Preview_img(thumbnailUp,index,1)" id="1"></div>
				</li>
			</ul>
			<div>
				<h5>处理情况</h5>
				<ul class="container_list">
					<li class='Buttond' style='color:#333;border-bottom: none;' >
						<button  class="van-button--default van-button--normal" @click="studyActives(1)" :class="{activeLabel:num==1}">
							<span class="">同意</span>
						</button>
					</li>
					<li class='Buttond' style="border-bottom: none;">
						<button class="van-button--default van-button--normal"  @click="studyActives(2)" :class="{activeLabel:num==2}">
							<span class="">不同意</span>
						</button>
					</li>
				</ul>
			</div>
			<ul>
				<li class='Buttond' v-if="a" @click='sumtrienButton()'>
					<van-button color="#7099D0"  size="normal" style='width: 100%;'>提交</van-button>
				</li>
				<li class='Buttond' v-if="!a">
					<van-button color="#7099D0" v-if="!a" size="normal" style='width: 100%;'>提交中...</van-button>
				</li>
			</ul>
			
		</div>
		
	</div>
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import * as ajax from '@/utils/api'
	import Vue from 'vue';
	
	import { Button } from 'vant';
	import { Field } from 'vant';
	
	Vue.use(Field);
	Vue.use(Button);
	import {swipe,ImagePreview,SwipeItem} from 'vant';//引入预览
	Vue.use(swipe).use(SwipeItem);
	import {Icon,CellGroup, IndexBar, IndexAnchor } from 'vant';
	Vue.use(IndexBar).use(IndexAnchor).use(Icon).use(CellGroup);
	import { Cell} from 'vant';
	Vue.use(Cell)
	import { Uploader } from 'vant';
	import { Picker } from 'vant';
	import { Dialog } from 'vant';
	Vue.use(Picker);
	Vue.use(Uploader);
	Vue.use(Dialog);
	import {Popup,Toast,DatetimePicker  } from 'vant';
	Vue.use(Toast).use(Popup).use(DatetimePicker);
	export default {
		components: {
			vantHeader,
		},
		data() {
			return {
				questionText:"问题详情",
				examRecord:[],
				examRecordTime:[],
				StaffInfoData:[],
				IDCard:'',
				message:'',
				quesPic:[],
				upImg:[],
				showPicker: false,
				// 问题类型
				columns: ['安全问题', '质量问题','进度问题'],
				value: '',
				quesType:'',
				num:-1,
				processOpinion:'',
				a:true,
				show0:false,
				show1:false,
				thumbnailPic:[],
				thumbnailUp:[]
				
			}
		},
		mounted() {
			this.StaffInfoF()
		},
		created() {
			if(sessionStorage.getItem("num")==1){
				this.show = true
				this.num=1;
				
			}
			if(sessionStorage.getItem("num") == 2){
				this.show = false;
				
				this.num=2;
			} 
		},
		methods: {
			// 轮播图预览
			Preview_img(images, index,id) {
				console.log(id);
				if(id == 0){
					ImagePreview({
						images: this.thumbnailPic,//图片数组
						showIndex: true,
						loop: false,
						startPosition: index
					})
				}else if(id == 1){
					ImagePreview({
						images: this.thumbnailUp,//图片数组
						showIndex: true,
						loop: false,
						startPosition: index
					})
				}
				
			},
			studyActives(index) {
				this.num=index;
				if(this.num == 1){
					this.show = true
					sessionStorage.setItem("num",1)
				}
			    if(this.num == 2){
			    	this.show = false
					sessionStorage.setItem("num",2)
			    } 
			},
			onConfirm(value,index) {
			    this.value = value;
			    this.showPicker = false;
				this.quesType=index+Number(1);
				sessionStorage.setItem("value",this.value)
				sessionStorage.setItem("quesType",this.quesType)
			},
			sumtrienButton() {
				let that=this;
				
				if(that.num == -1){
					Toast("请先选择处理情况")
				}else{
				this.a=false;
				if(that.num == 1){
					ajax.postW('/api/safety/updateSafetyPutReview?id='+that.$route.query.id+'&reviewOpinion='+
					that.num+'&processOpinion='+that.processOpinion+'&putNameId='+this.StaffInfoData.putNameId+'&putName='+this.StaffInfoData.putName).then(res => {
						if(res.status == 200) {
							if(res.data.code == 200) {
								if(res.data.success == true){
									this.a=true;
									var t2;
									var that=this;
									t2=setInterval(function(){
										Toast("提交成功")
										clearInterval(t2);
										that.$router.push({
											path:'/leader_safeQualityList',
											query:{
												userId:that.$route.query.userId,
												type:sessionStorage.getItem("TYPES")
											}
										})
										
									},800);
									
								}
								if(res.data.success == false){
									this.a=true;
									Toast("提交失败")
								}
								sessionStorage.removeItem("solvePeopl")
								sessionStorage.removeItem("num");
							}
						}
					})
				}else{
					ajax.postW('/api/safety/updateSafetyPutReview?id='+that.$route.query.id+'&reviewOpinion='+
					that.num+'&processingId='+this.StaffInfoData.processingId+'&processingName='+this.StaffInfoData.processingName).then(res => {
						if(res.status == 200) {
							if(res.data.code == 200) {
								if(res.data.success == true){
									this.a=true;
									var t2;
									var that=this;
									t2=setInterval(function(){
										Toast("提交成功")
										clearInterval(t2);
										that.$router.push({
											path:'/leader_safeQualityList',
											query:{
												userId:that.$route.query.userId,
												type:sessionStorage.getItem("TYPES")
											}
										})
										// that.$router.push({path:'/leader_safeQualityList?userId='+that.$route.query.userId+'&type='+that.$route.query.type})
									},800);
									
								}
								if(res.data.success == false){
									this.a=true;
									Toast("提交失败")
									// var t2;
									// t2=setInterval(function(){
										
									// 	clearInterval(t);
									// },800);
								}
								sessionStorage.removeItem("solvePeopl");
								sessionStorage.removeItem("num");
							}
						}
					})
				}
				}
			},
			StaffInfoF(){
				let that=this;
				ajax.getW('/api/safety/selectSafetyInfoById?id='+that.$route.query.id).then(res => {
					if(res.status == 200) {
						if(res.data.code == 200) {
							var quesPic=res.data.data.thumbnailPic;
							var thumbnailPic=res.data.data.quesPic;
							var upImg=res.data.data.thumbnailUp;
							var thumbnailUp=res.data.data.upImg;
							if(quesPic){
								//字符串截取为数组
								var strArr=quesPic.split(",");
								for(let j = 0,len=strArr.length; j < len; j++) {
									if(strArr[j] !=""){
										that.quesPic.push(strArr[j])
									}
								};
							}
							if(upImg){
								//字符串截取为数组
								var strArr=upImg.split(",");
								for(let j = 0,len=strArr.length; j < len; j++) {
									if(strArr[j] !=""){
										that.upImg.push(strArr[j])
									}
								};
							}
							if(thumbnailPic){
								//字符串截取为数组
								var strArr=thumbnailPic.split(",");
								for(let j = 0,len=strArr.length; j < len; j++) {
									if(strArr[j] !=""){
										that.thumbnailPic.push(strArr[j])
									}
								};
							}
							if(thumbnailUp){
								//字符串截取为数组
								var strArr=thumbnailUp.split(",");
								for(let j = 0,len=strArr.length; j < len; j++) {
									if(strArr[j] !=""){
										that.thumbnailUp.push(strArr[j])
									}
								};
							}
							this.StaffInfoData=res.data.data;
							
							if(res.data.data.quesType==1){
								this.value="安全问题"
							}
							if(res.data.data.quesType==2){
								this.value="质量问题"
							}
							if(res.data.data.quesType==3){
								this.value="进度问题"
							}
							
						}
					}
				})
			}
			
		}
	}
</script>

<style scoped>
	.van-button--normal{
		width: 100%; 
		background:rgba(246,246,246,1);
		border-radius:2px;
		border:1px solid rgba(238,238,238,1);
		color: #666;
	}
	.activeLabel{
		border-radius:2px;
		width: 100%; color: rgb(255, 255, 255); background: rgb(112, 153, 208); border-color: rgb(112, 153, 208); 
	}
	/deep/
	.van-popup--bottom{
		width: 100% !important;
	}
	/deep/
	.van-picker{
		width: 100%;
	}
	.Buttond{
		    margin: 10px 16px;
		height:44px;
		border-radius:2px;
		font-size:16px;
		text-align: center;
		line-height: 44px;
	}
	.ul li div{
		width:25%;
		height: auto;
		overflow: hidden;
		float: left;
	}
	.ul li div img{
		width:70px;
		height:70px;
		/* height: auto; */
		overflow: hidden;
		display: block;
		/* background: #ddd; */
		margin:  0 auto;
	}
	h5{
		padding: 10px 16px 0;
		color:#666666;
		margin: 0;
	}
	/deep/
	.Buttonds.van-button__text{
		color:#666666;
	}
	.container_lists li div:last-child{
		margin-right: 0 !important;
	}
	
	.container_lists li{
		padding: 10px 16px;
		color:  #969799;
		font-size: 14px;
		line-height: 24px;
	}
	.container_lists li span:last-child{
		width:65%;
		color:#323233;
		text-align: right;
		display: inline-block;
		float: right;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.van-hairline--bottom img{
	    width: 12px;
	    height: 12px;
	    float: left;
	    margin-right: 5px;
	    margin-top: 14px;
	}
	.van-hairline--bottom{
	    height: 40px;
	    line-height: 40px;
	    font-size: 14px;
	    padding-left: 14px;
	    font-family: PingFangSC-Regular,PingFang SC;
	    font-weight: 400;
	    color: rgba(51,51,51,1);
	    line-height: 40px;
	    margin: 0;
	    border-bottom: 1px solid rgba(238,238,238,1);
	}
	.infor_header p{
		color:#999999;
	}
	.infor_header h3,.infor_header p{
		text-align: center;
		margin: 10px 0 !important;
	}
	.infor_header h3 .van-icon{
		/* margin-top:5px; */
		color:#00A0E9;
		/* visibility: initial; */
		font-size: 14px;
		
	}
	/deep/
	.infor_header .van-button{
		width:48%;
	} 
	.infor_header .van-button:last-child{
		float: right;
	}
	.infor_header img{
		/* width:85px; */
		height:85px;
		border-radius:1px;
		border:1px solid rgba(238,238,238,1);
		display: block;
		margin: 0 auto;
	}
	.infor_header{
		background:#fff;
		padding:15px;
		box-shadow:0px 1px 2px 0px rgba(0,0,0,0.16);
		/* margin-bottom: 10px; */
	}
	.header-right {
		line-height: 5px;
		color:#fff;
	}
	.container_l{
		width:20%;
		float:left;
	}
	.container_r{
		width:78%;
		float:right;
	}
	.container_r span{
		display: block;
		width: 100%;
	}
	.container{
		/* padding-top: 46px; */
	}
	.container_list{
		margin-top: 10px;
		height: auto;
		overflow: hidden;
		background: #fff;
		box-shadow:0px 1px 2px 0px rgba(0,0,0,0.16);
	}
	.container_list li{
		/* padding: 10px 16px; */
		height: auto;
		overflow: hidden;
		border-bottom: 1px solid #EEEEEE;
	}
	.container_list li:last-child{
		border-bottom: none;
	}
	.container_list li.more .van-icon{
		margin-top: 0;
	}
	.container_list li .van-icon{
		margin-top: 15px;
	}
	.container_span_first{
		width: 42px;
		color:#69966F;font-size:20px;
	}
	
	.container_span_seound{
		color:#69966F;font-size:12px;
	}
	.container_span_three{
		color:#333;font-size:17px;
	}
	.container_span_firsts{
		width: 42px;
		border:1px solid #69966F;font-size:12px;height:17px;line-height: 14px;display: inline-block;text-align: center;
	     border-radius: 2px;
		 color:#69966F;
	}
	.container_span_seounds{
		color:#aaa;font-size:12px;
	}
</style>
