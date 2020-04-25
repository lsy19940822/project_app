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
					<span>问题类型</span>
					<span></span>
					<span v-if="StaffInfoData.quesType==1">安全问题</span>
					<span v-if="StaffInfoData.quesType==2">质量问题</span>
					<span v-if="StaffInfoData.quesType==3">进度问题</span>
				</li>
				<li>
					<span>紧急类型</span>
					<span></span>
					<span v-if="StaffInfoData.degreeid==1">特别紧急</span>
					<span v-if="StaffInfoData.degreeid==2">紧急</span>
					<span v-if="StaffInfoData.degreeid==3">一般</span>
				</li>
				<li>
					<span>提问时间</span>
					<span>{{StaffInfoData.dates}}</span>
				</li>
				<li>
					<span>限定时间</span>
					<span>{{StaffInfoData.endDate}}</span>
				</li>
				<li>
					<span>问题负责人</span>
					<span>{{principal?principal:StaffInfoData.principleName}}</span>
				</li>
				
			</ul>
			<ul class="container_list">
				<p class="van-hairline--bottom exam-title"><img src="../../assets/images/safeQuality/icon_t@2x (1).png" alt="">问题地点</p>
				<li class='more'>
					<van-cell style='color: #304F83;'>
						{{StaffInfoData.location?StaffInfoData.location:'暂无地址信息'}}
					</van-cell>
				</li>
				<li class='more'>
					<van-cell style='font-size: 12px;color:rgba(152,160,174,1);border-bottom:none;'>
						经度：{{StaffInfoData.longitude?StaffInfoData.longitude:'暂无'}} 纬度：{{StaffInfoData.latitude?StaffInfoData.latitude:'暂无'}}
					</van-cell>
				</li>
				<li class='Buttond'>
					<van-button color="rgba(89,95,115,1) " size="normal" style='width: 100%;' @click="$router.push({path:'/ProblemWhere?id='+$route.query.id})">查看位置信息</van-button>
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
			<div class="make" style="position: fixed;top: 0;bottom: 0; left: 0;right: 0;background: rgba(0,0,0,.7);z-index: 99;" v-show="showMake">
				<van-swipe :autoplay="10000" class="swiper">
					<van-swipe-item v-for="(image, index) in thumbnailPic" :key="index" >
						<img :src="image"/>
					</van-swipe-item>
				</van-swipe>
			</div>
			<ul class="container_list container_lists">
				<p class="van-hairline--bottom exam-title"><img src="../../assets/images/safeQuality/icon_t@2x (5).png" alt="">现场照片</p>
			
				<li class="overflow">
					<div v-for="(image,index) in quesPic" :key="index"  @click="Preview_img(thumbnailPic,index)"><img :src="image" alt="" @click="Preview_img(thumbnailPic,index)"></div>
				</li>
			</ul>
			
			<ul class="container_list container_listp" v-show="show3">
				<p class="van-hairline--bottom exam-title"><img src="../../assets/images/safeQuality/icon_t@2x (5).png" alt="">上传照片 (最多4张)</p>
				<li class="overflow">
					<div class="overflow"><van-uploader :after-read="afterRead"  v-model="fileList" multiple :max-count="4" /></div>
				</li>
			</ul>
			<ul class="container_list container_lists">
				<p class="van-hairline--bottom exam-title"><img src="../../assets/images/safeQuality/icon_t@2x (3).png" alt="">处理意见</p>
				<li>
					{{StaffInfoData.approvalOpinion?StaffInfoData.approvalOpinion:"暂无意见"}}
				</li>
			</ul>
			<h5>处理情况</h5>
			<ul class="container_list">
				<li class='Buttond' style='color:#333;border-bottom: none;' >
					<button  class="van-button--default van-button--normal" @click="studyActives(1)" :class="{activeLabel:num==1}">
						<span class="">已处理问题</span>
					</button>
				</li>
				<li class='Buttond' style="border-bottom: none;">
					<button class="van-button--default van-button--normal"  @click="studyActives(2)" :class="{activeLabel:num==2}">
						<span class="">未处理问题</span>
					</button>
				</li>
			</ul>
			<h5 v-show="show1">未处理原因</h5>
			<div class="container_list" v-show="show1">
				<van-cell-group>
				  <van-field
					v-model="message"
					rows="2"
					autosize
					type="textarea"
					maxlength="300"
					placeholder="请填写问题出现原因。"
					show-word-limit
				  />
				</van-cell-group>
			</div>
			<h5 v-show="show2">解决方案</h5>
			<div class="container_list" v-show="show2">
				<van-cell-group>
				  <van-field
					v-model="messageplan"
					rows="2"
					autosize
					type="textarea"
					maxlength="300"
					placeholder="请填写问题解决方案。"
					show-word-limit
				  />
				</van-cell-group>
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
	import { Cell} from 'vant';
	import { Button } from 'vant';
	import { Field } from 'vant';
	import { Uploader } from 'vant';
	import { Picker } from 'vant';
	import {swipe,ImagePreview,SwipeItem} from 'vant';//引入预览
	Vue.use(swipe).use(SwipeItem);
	Vue.use(Picker);
	Vue.use(Uploader);
	Vue.use(Field);
	Vue.use(Button);
	import {Icon,CellGroup, IndexBar, IndexAnchor,Toast,Popup,DatetimePicker } from 'vant';
	Vue.use(IndexBar).use(IndexAnchor).use(Icon).use(CellGroup).use(Toast).use(Popup).use(DatetimePicker);
	Vue.use(Cell)
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
				fileList: [],
				IDCard:'',
				messageas:'',
				message:'',
				messageplan:"",
				quesPic:[],
				show1:false,
				show2:false,
				show3:true,
				fileListImg:[],
				principalID:'',
				peleList:'',
				id:'',
				num:-1,
				value:'',
				// 问题类型
				columns: ['安全问题', '质量问题','进度问题'],
				value: '',
				showPicker: false,
				// 紧急类型特别紧急紧急一般
				columnsS: ['特别紧急', '紧急',"一般"],
				valueS: '',
				showPickerS: false,
				// 时间
				minHour: 10,
				maxHour: 20,
				minDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), new Date().getMinutes()),
				maxDate: new Date(new Date().getFullYear()+5, new Date().getMonth(), new Date().getDate(),new Date().getHours(), new Date().getMinutes()),
				// 开始时间
				currentDateStart: new Date(),
				showStart: false, // 用来显示弹出层
				timeValueStart: '',
				// 限定时间
				currentDate: new Date(),
				show: false, // 用来显示弹出层
				timeValue: '',
				// 小于10 大于10 时间
				getHour_s: "",
				getMinutes_s: "",
				day_s: "",
				month_s: "",
				location:'',
				messageQuesc:'',
				longitude: 0, //经度
				latitude: 0, //纬度
				curPositionStatus: false, // 记录当前自动定位的环境，地图里面定位还是初始化页面的定位
				// 点击起止点弹出地图时记录点击的是起止点标示 start/end
				isFirstPosition: false,
				geolocation: "",
				options: { //精确定位信息
					timeout: 8000,
					failTipFlag: true
				},
				principal:sessionStorage.getItem("principal"),
				a:true,
				thumbnailPic:[],
				thumbnailUp:[],
				showMake:false
			}
		},
		mounted() {
			this.StaffInfoF()
			
		},
		created() {
			if(sessionStorage.getItem("num")==1){
				this.show1 = false;
				this.num=1;
				
			}
			if(sessionStorage.getItem("num") == 2){
				this.show1 = true
				this.num=2;
			}
			
		},
		methods: {
			IntelligenceButton(){
				this.$router.push({path:'/IntelligenceHead?userId='+this.$route.query.userId+'&id='+this.$route.query.id+'&type='+this.$route.query.type+'&problemX=2'})
			},
			// 轮播图预览
			Preview_img(images, index) {
				ImagePreview({
					images: this.thumbnailPic,//图片数组
					showIndex: true,
					loop: false,
					startPosition: index
				})
			},
			studyActives(index) {
				this.num=index;
				if(this.num == 1){
					this.show1 = false
					sessionStorage.setItem("num",1)
				}
			    if(this.num == 2){
			    	this.show1 = true
					sessionStorage.setItem("num",2)
			    } 
			},
			sumtrienButton() {
				
				let that=this;
				if(this.fileList == ''){
					Toast('请上传照片');
				}else if(that.num == -1){
					Toast('请选择处理情况');
				}else{
				if(that.num == 1){
					var formData = new FormData();
					for(var item=0;item<this.fileListImg.length;item++){
						
						formData.append("files", this.fileListImg[item].file)//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file 
					}
					formData.append("id",this.id);
					formData.append("processResult",this.num);
					formData.append("principle",this.principalID);
					formData.append("principleName",this.peleList)
						this.a=false;
						ajax.postW('/api/safety/updateSafetyRectification',(formData)).then(res => {
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
													type:that.$route.query.type
												}
											})
											
										},800);
										
									}
									if(res.data.success == false){
										this.a=true;
										Toast("提交失败")
									}
									
									sessionStorage.removeItem("solvePeopl");
									sessionStorage.removeItem("num");
								}
							}
						})
					
				}else{
					var formData = new FormData();
					
					for(var item=0;item<this.fileListImg.length;item++){
						formData.append("files", this.fileListImg[item].file)//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file 
					}
					formData.append("id",this.id);
					formData.append("processResult",this.num);
					formData.append("processOpinion",this.message);
					formData.append("principle",this.principalID);
					formData.append("principleName",this.peleList)
					if(this.message == ''){
						Toast("请填写处理原因")
					}else{
						this.a=false;
						ajax.postW('/api/safety/updateSafetyRectification',(formData)).then(res => {
							if(res.status == 200) {
								if(res.data.code == 200) {
									this.a=true;
									var t2;
									var that=this;
									t2=setInterval(function(){
										Toast("修改成功")
										clearInterval(t2);
										that.$router.push({
											path:'/leader_safeQualityList',
											query:{
												userId:that.$route.query.userId,
												type:that.$route.query.type
											}
										})
										
									},800);
									if(res.data.success == false){
										this.a=true;
										Toast("修改失败")
									}
									sessionStorage.removeItem("solvePeopl");
									sessionStorage.removeItem("num");
								}
							}
						})
					}
					
				}
				}
			},
			afterRead(e) {
			  // 此时可以自行将文件上传至服务器
				let that= this;
				this.fileListImg.push(e);
			},
			StaffInfoF(){
				let that=this;
				ajax.getW('/api/safety/selectSafetyInfoById?id='+that.$route.query.id).then(res => {
					if(res.status == 200) {
						if(res.data.code == 200) {
								this.StaffInfoData=res.data.data;
								this.principalID=res.data.data.principle
								this.peleList=res.data.data.principleName
								this.id=res.data.data.id
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
							
						}
					}
				})
			},
		}
	}
</script>

<style scoped>
	/deep/
	.van-cell-group{
		width: 100%;
	}
	/deep/
	.van-picker{
		width:100%;
	}
	/deep/
	.van-datetime-picker{
		width: 100%;
	}
	/deep/
	.van-picker-column{
		width: 100%;
	}
	/deep/
	.list_li .van-icon{
		display: none;
	}
	/deep/
	.van-uploader__preview-delete{
		top: -1px;
	}
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
	.Buttond{
		    margin: 10px 16px;
		height:44px;
		border-radius:2px;
		font-size:16px;
		text-align: center;
		line-height: 44px;
	}
	
	.container_lists li div{
		width: 25%;
		height: auto;
		overflow: hidden;
		float: left;
		/* margin-right: 2%; */
		padding: 0;
		border-bottom: none;
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
	.container_lists li div img{
		width:70px;
		height:70px;
		/* height: auto; */
		overflow: hidden;
		display: block;
		/* background: #ddd; */
		margin:  0 auto;
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
	.container_listp li{
		padding: 10px 16px;
	}
	/deep/
	.van-uploader__preview-image {
	    display: block;
	    width: 79px;
	    height: 79px;
	}
	/deep/
	.van-uploader__preview:last-child{
	 margin-right: 0 !important;
	}
	.van-image-preview__index{
		top:56px;
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
	.container_list li.list_li span:first-child{
		color:#969799;
	}
	/* .container_list li .van-icon{
		margin-top: 15px;
	} */
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
