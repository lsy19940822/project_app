<template>
	<div id="examrecord">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2">

		</vant-header>
		<div class="container">
			<h5>问题情况</h5>
			<ul class="container_list">
				<li class="list_li">
					<van-cell is-link @click="showPicker = true">
					   <span>问题类型</span>
					   <span>{{value?value:"请选择"}}</span>
					</van-cell>

					<van-popup v-model="showPicker" position="bottom">
					  <van-picker
					    show-toolbar
					    :columns="columns"
					    @cancel="showPicker = false"
					    @confirm="onConfirm"/>
					</van-popup>
				</li>
				<li class="list_li">
					<van-cell is-link @click="showPickerS = true">
					   <span>紧急类型</span>
					   <span >{{valueS?valueS:"请选择"}}</span>
					</van-cell>
					<van-popup v-model="showPickerS" position="bottom">
					  <van-picker
					    show-toolbar
					    :columns="columnsS"
					    @cancel="showPickerS = false"
					    @confirm="onConfirmS"/>
					</van-popup>
				</li>
				<li class="list_li">
					<van-cell is-link @click="showTimePopStart">
					   	<span>提问时间</span>
					   	<span>{{timeValueStart?timeValueStart:"请选择"}}</span>
					</van-cell>
					<van-popup v-model="showStart" position="bottom">
						<van-datetime-picker class="order-time-pop" v-model="currentDateStart" type="date" :min-date="minDate" :max-date="maxDate" @confirm="confirmFnStart()" @cancel="cancelFnStart()" />
					</van-popup>
				</li>
				<li class="list_li">
					<van-cell is-link @click="showTimePop">
					   	<span>限定时间</span>
					   	<span>{{timeValue?timeValue:"请选择"}}</span>
					</van-cell>
					<van-popup v-model="show" position="bottom">
						<van-datetime-picker class="order-time-pop" v-model="currentDate" type="date" :min-date="minDate" :max-date="maxDate" @confirm="confirmFn()" @cancel="cancelFn()" />
					</van-popup>
				</li>
			</ul>
			<h5>问题地点</h5>
			<ul class="container_list">
				<li class='more' style="padding: 10px 16px;" v-show="longlat">
					<div style="border:1px dashed #E6EDF7;">
						<van-cell style='color: #304F83;background:#F7FAFF;'>
							<span style="margin-top: 2px; display: block;float: left;"><van-icon name="location-o" color='#304F83'/></span>
							{{city}}{{addr}}
						</van-cell>
						<van-cell style='font-size: 12px;background:#F7FAFF;color:rgba(152,160,174,1);border-bottom:none;'>
							经度：{{latitude}} 纬度：{{longitude}}
						</van-cell>
					</div>
				</li>
				<li class='Buttond'>
					<van-button color="rgba(89,95,115,1) " icon="location-o" size="normal" style='width: 100%;' v-show="!longlat" @click="longlatButton()">获取当前位置</van-button>
				</li>
				<li class='Buttond' v-show="longlat">
					<van-button color="#DDDDDD " size="normal" style='float: left;width:48%' @click="clearButton()"><span style="color: #666;">清空地址</span></van-button>
					<van-button color="rgba(89,95,115,1) " size="normal"style='float: right;width:48%'  @click="longlatButtonD()">重新定位</van-button>
				</li>
			</ul>

			<h5>问题简述</h5>
			<div class="container_list">
				<van-cell-group>
				  <van-field
					v-model="messageQuesc"
					rows="2"
					autosize
					type="textarea"
					maxlength="300"
					placeholder="请简单描述您的问题,方便及时跟进并解决。"
					show-word-limit
				  />
				</van-cell-group>
			</div>
			<h5>问题详情</h5>
			<div class="container_list">
				<van-cell-group>
				  <van-field
					v-model="message"
					rows="2"
					autosize
					type="textarea"
					maxlength="300"
					placeholder="请简单描述您的问题详情,方便及时跟进并解决。"
					show-word-limit
				  />
				</van-cell-group>
			</div>
			<ul class="container_list container_listp">
				<p class="van-hairline--bottom exam-title"><img src="../../assets/images/safeQuality/icon_t@2x (5).png" alt="">上传照片 (最多4张)</p>
				<li class="overflow">
					<van-uploader :after-read="afterRead"  v-model="fileList" multiple :max-count="4" />
				</li>
			</ul>
			<h5>现成负责人</h5>
			<ul class="container_list">
				<li class='more' style="padding: 10px 16px;" v-show="price">
					<div style="border:1px dashed #E6EDF7;">
						<van-cell style='color: #304F83;background:#F7FAFF;'>
							<input type="text" v-model="peleList" style="display: none;">
							<span style="margin-top: 2px; display: block;float: left;"><van-icon name="manager" color='#304F83'/></span>{{principal}}
						</van-cell>
					</div>
				</li>
				<li class='Buttond'>
					<van-button color="rgba(89,95,115,1) " icon="friends-o" size="normal" style='width: 100%;'@click="IntelligenceButton()">{{$route.query.choose==1?"重新选择人员":"点击选择人员"}}</van-button>
				</li>
			</ul>
			<ul>
				<li class='Buttond'>
					<van-button color="#DDDDDD " size="normal" style='float: left;width:48%'  @click="$router.push({path:'/leader_safeQualityList?userId='+$route.query.userId+'&type='+$route.query.type})"><span style="color: #666;">取消</span></van-button>
					<van-button color="#7099D0 " size="normal"style='float: right;width:48%' @click='sumtrienButton()'>提交</van-button>
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
	import { Dialog } from 'vant';
	Vue.use(Picker);
	Vue.use(Uploader);
	Vue.use(Field);
	Vue.use(Button);
	Vue.use(Dialog);
	import {Icon,CellGroup, Popup,IndexBar, IndexAnchor,Toast,DatetimePicker  } from 'vant';
	Vue.use(IndexBar).use(IndexAnchor).use(Icon).use(CellGroup).use(Toast).use(Popup).use(DatetimePicker);
	Vue.use(Cell)
	export default {
		components: {
			vantHeader,

		},
		data() {
			return {
				questionText:"提交问题",
				examRecord:[],
				examRecordTime:[],
				StaffInfoData:[],
				fileList: [],
				fileListImg:[],
				files:{},
				objUrlfileList:[],
				IDCard:'',
				message:'',
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
				addr:'',
				city:'',
				province:'',
				district:'',
				street:'',
				streetNumber:'',
				position:'',
				longlat:false,
				peleList:'',
				quesType:'',
				degreeid:'',
				user:{
					userName:'',
					BID:'',
					userid:'',
					department:'',
					departmentid:''
				},
				a:true,
				fileSrc:"",
				principal:'',
				price:false,
				positiondata:{},
				principalID:sessionStorage.getItem("principalID")
			}
		},
		mounted() {

			this.fileList=window.url;
			// 用户信息
			ajax.getW('/api/safety/selectUserById?id='+this.$route.query.userId).then(res => {
				if(res.status == 200) {
					if(res.data.code == 200) {
						this.user.userName=res.data.data.info.USERNAME
						this.user.BID=res.data.data.info.BID
						this.user.userid=res.data.data.info.USERID
						this.user.department=res.data.data.info.DEPARTMENTNAME
						this.user.departmentid=res.data.data.info.DEPARTMENTID
					}
				}
			});
			// 储值信息
			this.value=sessionStorage.getItem("value");
			this.valueS=sessionStorage.getItem("valueS");
			this.timeValueStart=sessionStorage.getItem("timeValueStart")
			this.timeValue=sessionStorage.getItem("timeValue")
			var princ = sessionStorage.getItem("principal");

			if(sessionStorage.getItem("messageQuesc")=="" || sessionStorage.getItem("messageQuesc")==null){
				sessionStorage.setItem("messageQuesc","")
			}else{
				this.messageQuesc=sessionStorage.getItem("messageQuesc");
			}

			if(sessionStorage.getItem("message")==""|| sessionStorage.getItem("message")==null){
				sessionStorage.setItem("message","")
			}else{
				this.message=sessionStorage.getItem("message");
			}


			if(sessionStorage.getItem("principal")== null){
				this.price= false;
				return;
			}
			if(!princ) {
				sessionStorage.setItem("principal",null);
				if(sessionStorage.getItem("principal")== null){
					this.price= false;
					return;
				}
			}else{
				this.price= true;
				this.principal = sessionStorage.getItem("principal");
			}
			this.peleList=this.principal

			// 位置信息
			let positionS=sessionStorage.getItem("position");
			if(sessionStorage.getItem("position")!= null){
				Object.assign(this.positiondata, JSON.parse(positionS));
				this.latitude = this.positiondata.latitude;
				this.longitude = this.positiondata.longitude;
				this.city=this.positiondata.city
				this.addr=" "+this.positiondata.addr
				this.longlat=true;
				return;
			}
			if(!positionS) {
				sessionStorage.setItem("position",null);
				if(sessionStorage.getItem("position")== null){
					this.longlat=false;
					return;
				}
			}else{
				this.longlat=true;
			}

		},
		created() {

		},
		methods: {
			IntelligenceButton(){
				let that=this;
				if(this.messageQuesc == ''){
					sessionStorage.setItem("messageQuesc",'')
				}else{
					sessionStorage.setItem("messageQuesc",this.messageQuesc)
				}
				if(this.message == ''){
					sessionStorage.setItem("message",'')
				}else{
					sessionStorage.setItem("message",this.message)
				}
				this.$router.push({path:'/IntelligenceHead?userId='+this.$route.query.userId+'&choose=1'+'&type='+this.$route.query.type})
			},

			afterRead(e) {
					window.url=this.fileList;
				let that= this;
				this.fileListImg.push(e);

			},
			longlatButton(){
				Dialog.confirm({
					title: '标题',
					message: '应用将获取您的位置信息？',
					'show-confirm-button': true
				}).then(() => {
					this.longlat=true;
					this.getMyLocation(false);
				}).catch(() => {
					this.longlat=false;
				});
			},
			longlatButtonD(){
				Dialog.confirm({
					title: '标题',
					message: '应用将获取您的位置信息？',
					'show-confirm-button': true
				}).then(() => {
					this.longlat=true;
					this.getMyLocation(false);
				}).catch(() => {
					this.longlat=true;
				});
			},
			clearButton(){
				this.longlat=false;
				this.latitude = '';
				this.longitude ='';
				this.city='';
				this.addr='';
				this.province='';
				this.district='';
				this.street='';
				this.streetNumber='';
				sessionStorage.setItem("position", JSON.stringify({
					'latitude':'',
					'longitude':'',
					'city':'',
					'addr':'',
					'province':'',
					'district':'',
					'street':'',
					'streetNumber':''
				}));
			},

			sumtrienButton() {
				let that = this;
				this.a=false;
				if(this.value == '' || this.value == null){//1 安全 2 质量 3进度
					Toast('请选择问题类型');
					return;
				}
				if(this.valueS == ''|| this.valueS == null){//1特别  2紧急 3一般
					Toast('请选择紧急类型');
					return;
				}
				if(this.timeValueStart == '' || this.timeValueStart == null){
					Toast('请选择开始时间');
					return;
				}
				if(this.timeValue == '' || this.timeValue == null){
					Toast('请选择限定时间');
					return;
				}
				if(this.city == ''){
					Toast('请获取您当前位置');
					return;
				}
				if(this.messageQuesc == ''){
					Toast('请简述您的问题');
					return;
				}
				if(this.message == ''){
					Toast('请简述您的问题详情');
					return;
				}
        console.log(this.fileList);
				if(this.fileList == undefined){
					Toast('请上传照片');
					return;
				}
				if(this.peleList == ''){
					Toast('请选择负责人');
					return;
				}
				if(this.timeValueStart!='' && this.value!='' && this.timeValue!='' && this.peleList!=''  && this.valueS!=''  && this.fileList!=''  && this.message!=''  && this.messageQuesc!=''  && this.city!='' ){
				     var formData = new FormData();
          if(window.url != undefined && window.url != null){
            if(window.url.length!=""){
              for(var item=0;item<window.url.length;item++){

                formData.append("files", window.url[item].file)//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
              }
            }
          }
					 let position=JSON.parse(sessionStorage.getItem("position"));
					 formData.append("putName",this.user.userName);
					 formData.append("putNameId",this.user.userid);
					 formData.append('quesType', sessionStorage.getItem("quesType"));
					 formData.append('degreeid', sessionStorage.getItem("degreeid"));
					 formData.append('dates',this.timeValueStart);
					 formData.append('quesDesc',this.messageQuesc);
					 formData.append('quesDetail',this.message);
					 formData.append('endDate',this.timeValue);
					 formData.append('principle',this.principalID);
					 formData.append('departmentid',this.user.departmentid);
					 formData.append('bid',this.user.BID);
					 formData.append('principleName',this.peleList);
					 formData.append('latitude',position.latitude);
					 formData.append('longitude',position.longitude);
					 formData.append('department',this.user.department);
				     formData.append('location',position.city+" "+position.addr);
					ajax.postW('/api/safety/saveSafety',(formData)).then(res => {

						if(res.status == 200) {
							if(res.data.code == 200) {
								if(res.data.success == true){
									this.a=true;
									var t2;
									var that=this;
									t2=setInterval(function(){
										Toast("操作成功")
										clearInterval(t2);
										that.$router.push({path:'/HeadNav/leader_safeIssue?userId='+that.$route.query.userId+'&type='+that.$route.query.type})
										//
									},800);
								}
								if(res.data.success == false){
									this.a=true;
									Toast("处理失败")
								}


								sessionStorage.removeItem("timeValue")
								sessionStorage.removeItem("valueS")
								sessionStorage.removeItem("timeValueStart")
								sessionStorage.removeItem("value")
								sessionStorage.removeItem("quesType")
								sessionStorage.removeItem("degreeid")
								sessionStorage.removeItem("principalID")
								sessionStorage.removeItem("TYPES")
								sessionStorage.removeItem("principal")
								sessionStorage.removeItem("position")
								sessionStorage.removeItem("message")
								sessionStorage.removeItem("messageQuesc")
							}
						}
					})
				}
			},
			//定位获得当前位置信息精准
			getMyLocation(type) {
				this.curPositionStatus = type;
				this.geolocation = new qq.maps.Geolocation("5TZBZ-MEZCW-KKJR3-RPIHK-AGSAK-HHFSH", "myapp");
				this.geolocation.getLocation(this.showPosition, this.showErr, this.options);
			},
			showPosition(position) {
				console.log(position)
				this.position=position;
				this.latitude = position.lat;
				this.longitude = position.lng;
				this.city=position.city
				this.addr=position.addr
				this.province=position.province,
				this.district=position.district,
				this.street=position.street,
				this.streetNumber=position.streetNumber,
				sessionStorage.setItem("position", JSON.stringify({
					'latitude':this.latitude,
					'longitude':this.longitude,
					'city':position.city,
					'addr':position.addr,
					'province':position.province,
					'district':position.district,
					'street':position.street,
					'streetNumber':position.streetNumber,
				}));
			},
			showErr() {
				if(!this.isFirstPosition) {
					this.geolocation.getIpLocation(this.showPosition, this.showErr);
					this.isFirstPosition = true;
					return;
				}
				Toast("定位失败");
			},
			// 开始时间
			confirmFnStart() { // 确定按钮
				this.timeValueStart = this.timeFormatStart(this.currentDateStart);
				this.showStart = false;
				sessionStorage.setItem("timeValueStart",this.timeValueStart)
			},
			cancelFnStart() {
				this.showStart = false;
			},
			showTimePopStart() {
				this.showStart = true;
				// this.currentDateStart = new Date(this.timeValueStart);
			},
			timeFormatStart(time) { // 时间格式化 2019-09-08
				let year = time.getFullYear();
				let month = time.getMonth() + 1;
				let day = time.getDate();
				// 月
				if(month < 10) {
					this.month_s = "0" + month
				}
				if(month > 10) {
					this.month_s = month
				}
				if(month === 10) {
					this.month_s = month
				}
				// 日
				if(day < 10) {
					this.day_s = "0" + day
				}
				if(day > 10) {
					this.day_s = day
				}
				if(day === 10) {
					this.day_s = day
				}

				return year + '-' + this.month_s + '-' + this.day_s
			},
			// 结束时间
			confirmFn() { // 确定按钮
				this.timeValue = this.timeFormat(this.currentDate);
				this.show = false;
				sessionStorage.setItem("timeValue",this.timeValue)
			},
			cancelFn() {
				this.show = false;
			},
			showTimePop() {
				this.show = true;

			},
			timeFormat(time) { // 时间格式化 2019-09-08
				let year = time.getFullYear();
				let month = time.getMonth() + 1;
				let day = time.getDate();

				// 月
				if(month < 10) {
					this.month_s = "0" + month
				}
				if(month > 10) {
					this.month_s = month
				}
				if(month === 10) {
					this.month_s = month
				}
				// 日
				if(day < 10) {
					this.day_s = "0" + day
				}
				if(day > 10) {
					this.day_s = day
				}
				if(day === 10) {
					this.day_s = day
				}


				return year + '-' + this.month_s + '-' + this.day_s ;


			},
			onConfirm(value,index) {
			    this.value = value;
			    this.showPicker = false;
				this.quesType=index+Number(1);

				sessionStorage.setItem("value",this.value)
				sessionStorage.setItem("quesType",this.quesType)
			},
			onConfirmS(value,index) {
			    this.valueS = value;
			    this.showPickerS = false;
				this.degreeid=index+Number(1);
				sessionStorage.setItem("valueS",this.valueS)
				sessionStorage.setItem("degreeid",this.degreeid)
			},

			StaffInfoF(){

			},


		}
	}
</script>

<style scoped>
	/deep/
	.van-uploader__preview{
		margin-bottom: 0 !important;
	}
	/deep/
	.van-uploader__upload{
		margin-bottom: 0 !important;
	}
	/deep/

	.Buttond{
		    margin: 10px 16px;
		height:44px;
		border-radius:2px;
		font-size:16px;
		text-align: center;
		line-height: 44px;
	}
	.container_lists li div{
		width:23.5%;
		height: auto;
		overflow: hidden;
		float: left;
		margin-right: 2%;
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
	/deep/
	.van-uploader__preview{
		margin: 0 15px 8px 0;
	}
	.container_lists li div img{
		width:70px;
		height:70px;
		/* height: auto; */
		overflow: hidden;
		float: left;
		display: block;
		background: #ddd;
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
	}.van-image-preview__index{
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
	.container_list li.list_li span:last-child{
		display: block;
		float: right;
	}
	.container_list li.more .van-icon{
		margin-top: 0;
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
