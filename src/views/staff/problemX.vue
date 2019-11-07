<template>
	<div id="examrecord">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2">
			
		</vant-header>
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
					<!-- //1.安全 2 质量 3 进度 -->
					<span>问题类型</span>
					<span v-if="StaffInfoData.quesType==1">安全问题</span>
					<span v-if="StaffInfoData.quesType==2">质量问题</span>
					<span v-if="StaffInfoData.quesType==3">进度问题</span>
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
					<van-cell style='color: #304F83;'>
						{{StaffInfoData.location?StaffInfoData.location:'暂无地址信息'}}
					</van-cell>
				</li>
				<li class='more'>
					<van-cell style='font-size: 12px;color:rgba(152,160,174,1);border-bottom:none;'>
						经度：{{StaffInfoData.longitude?StaffInfoData.longitude:'暂无'}}
					</van-cell>
				</li>
				<li class='Buttond'>
					<van-button color="rgba(89,95,115,1) " size="normal" style='width: 100%;'>查看位置信息</van-button>
				</li>
			</ul>
			<ul class="container_list container_lists">
				<p class="van-hairline--bottom exam-title"><img src="../../assets/images/safeQuality/icon_t@2x (2).png" alt="">问题简述</p>
				<!-- v-if='examRecord!=""' -->
				<li>
					{{StaffInfoData.quesDesc}}
				</li>
			</ul>
			<ul class="container_list container_lists">
				<p class="van-hairline--bottom exam-title"><img src="../../assets/images/safeQuality/icon_t@2x (3).png" alt="">问题描述</p>
				<li>
					{{StaffInfoData.quesDetail}}
				</li>
			</ul>
			
			<ul class="container_list container_lists">
				<p class="van-hairline--bottom exam-title"><img src="../../assets/images/safeQuality/icon_t@2x (5).png" alt="">现场照片</p>
				<li class="overflow">
					<div><img :src="StaffInfoData.quesPic" alt=""></div>
					<!-- <div v-for='(item,index) in StaffInfoData.quesPic'><img :src="item" alt=""></div> -->
				</li>
			</ul>
			<h5>处理情况</h5>
			<ul class="container_list">
				<li class='Buttond Buttond' style='color:#666666;display: none;'>
					<van-button color="#EEEEEE" size="normal" style='width: 100%;border-radius:2px;
                       border:1px solid rgba(238,238,238,1);'>已处理问题</van-button>
				</li>
				<li class='Buttond'>
					<van-button color="#7099D0" size="normal" style='width: 100%;'>未处理问题</van-button>
				</li>
			</ul>
			<h5>问题原因</h5>
			<div class="container_list">
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
			<h5>解决方案</h5>
			<div class="container_list">
				<van-cell-group>
				  <van-field
					v-model="message"
					rows="2"
					autosize
					type="textarea"
					maxlength="300"
					placeholder="请填写问题解决方案。"
					show-word-limit
				  />
				</van-cell-group>
			</div>
			<ul class="container_list container_listp">
				<p class="van-hairline--bottom exam-title"><img src="../../assets/images/safeQuality/icon_t@2x (5).png" alt="">上传照片 (最多4张)</p>
				<li class="overflow">
					<van-uploader :before-read="beforeRead"  v-model="fileList"multiple :max-count="4" />
				
				</li>
			</ul>
			<ul>
				<li class='Buttond'  @click='sumtrienButton()'>
					<van-button color="#DA9F63" size="normal" style='width: 100%;'>修改</van-button>
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
	
	Vue.use(Uploader);
	Vue.use(Field);
	Vue.use(Button);
	import {Icon,CellGroup, IndexBar, IndexAnchor,Toast } from 'vant';
	Vue.use(IndexBar).use(IndexAnchor).use(Icon).use(CellGroup).use(Toast);
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
				message:`今年以来，根据各地上报数据，全市共,
				有建设项目326个，其中：市级项目32个，今年以
				来，根据各地上报数据，全市共有建设项目326个
				，其中：市级项目32个，六枝特区32个盘今年以来，根据各地上报数据，全市共有建设项目326个，其中：市级项目32个，六枝特区32个盘今年以来，根据各地上报数据，全市共有建设项目326个，其中：市级项目32个，
				六枝特区32个盘今年以来，根据各地上报数据
				，全市共有建设项目326个，其中：市级项目32
				个，六枝特区32个盘。`
			}
		},
		mounted() {
			this.StaffInfoF()
		},
		created() {
			
		},
		methods: {
			sumtrienButton() {
				this.$router.push({
					path:'/problemX?id='+this.$route.query.id,
				})
				// this.titShow = false;
			},
			// 返回布尔值
			beforeRead(file) {
			    if (file.type !== 'image/jpeg') {
					Toast('请上传 jpg 格式图片');
					return false;
				}
			    return true;
			},
			 // 返回 Promise
			asyncBeforeRead(file) {
			  return new Promise((resolve, reject) => {
				if (file.type !== 'image/jpeg') {
				  Toast('请上传 jpg 格式图片');
				  reject();
				} else {
				  resolve();
				}
			  });
			},
			StaffInfoF(){//'b4194213-fa6f-48c7-a9bc-0115be23df1b
				let that=this;
				ajax.getW('/api/safety/selectSafetyInfoById?id='+that.$route.query.id).then(res => {
					if(res.status == 200) {
						if(res.data.code == 200) {
							console.log("selectSafetyInfoById",res.data);
							res.data.data.quesPic=(res.data.data.quesPic.slice(res.data.data.quesPic.length-1)==',')?res.data.data.quesPic.slice(0,-1):res.data.data.quesPic;
							this.StaffInfoData=res.data.data;
						}
					}
				})
			},
			
			
		}
	}
</script>

<style scoped>
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
		padding-top: 46px;
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
