<template>
	<div class="exam-footer">
		<!-- <router-view class='content-box'></router-view> -->
		<van-tabbar v-model="active" route>
		  <van-tabbar-item replace to="/study">
		    <span>学习</span>
		    <img
		      slot="icon"
		      slot-scope="iconprops"
		      :src="iconprops.active ? icon[0].active : icon[0].normal"
		    >
		  </van-tabbar-item>
		  <van-tabbar-item to="/staff_safeQualityList">
			  <span>问题</span>
			  <img
			    slot="icon"
			    slot-scope="searchprops"
			    :src="searchprops.active ? icon[1].active : icon[1].normal"
			  >
		  </van-tabbar-item>
		  <van-tabbar-item to="/staffNew" info="1">
			  <span>消息</span>
			  <img
			    slot="icon"
			    slot-scope="settingoprops"
			    :src="settingoprops.active ? icon[2].active : icon[2].normal"
			  >
		  </van-tabbar-item>
		  <van-tabbar-item replace to="/staffUser">
			  <span>我的</span>
			  <img
			    slot="icon"
			    slot-scope="userprops"
			    :src="userprops.active ? icon[3].active : icon[3].normal"
			  >
		  </van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	import { Row, Col, Icon, CountDown } from 'vant';
	import Vue from 'vue';
	import { Tabbar, TabbarItem } from 'vant';
	Vue.use(Tabbar).use(TabbarItem);
	export default {
		components: {
			[Row.name]: Row,
			[Col.name]: Col,
			[Icon.name]: Icon,
			[CountDown.name]: CountDown
		},
		data() {
			return {
                active: 0,
				icon: [{
						normal: require('../assets/images/safeQuality/icon_study@2x (3).png'),
						active: require('../assets/images/safeQuality/icon_study@2x (4).png')
					},
					{
						normal: require('../assets/images/safeQuality/icon_study@2x (1).png'),
						active: require('../assets/images/safeQuality/icon_study@2x (2).png')
					},
					{
						normal: require('../assets/images/index_icon/icon_x-h@2x (2).png'),
						active: require('../assets/images/index_icon/icon_x-h@2x (1).png')
					},
					{
						normal: require('../assets/images/index_icon/ueser@2x.png'),
						active: require('../assets/images/index_icon/user2@2x.png')
					}]
			}
		}
	}
</script>

<style scoped>
	
	.active{
		color: #5A8CD4 !important;
	}
	img {
		padding:5px 0 2px;
		width: 22px;
		height:auto !important;
		display: block;
		margin: 0 auto;
	}
	.exam-footer {
		
		position: fixed;
		left:0;
		right:0;
		bottom:0;
		width: 100%;
		height: 58px;
		text-align: center;
		height:49px;
		background:#F9F9F9;
		box-shadow:0px 1px 0px 0px rgba(0,0,0,0.25);
		border-top: 1px solid #ddd;
	}
	.f-text{
		color:#888888;
		font-size:12px;
		margin:0;
	}
	.icon-box .van-icon{
		font-size: 20px;
	}
	
</style>