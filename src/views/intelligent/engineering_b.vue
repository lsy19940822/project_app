<template>

		<div class="overflow Treedata">
			<div class="header_inte" style="text-align: center;color:#999;">
				<div class="inte_gent">
			      暂无数据
				</div>
			</div>
			
			<div id="SlideBar" class="box">
			        <div class="item" ref="slide" :style="slideStyle" @touchstart="start($event)" @touchmove="move($event)" @touchend="end($event)">
			          <img src="http://img2.imgtn.bdimg.com/it/u=2555191195,2735808065&fm=26&gp=0.jpg" alt="">
			          <div class="right">
			            <div class="title">你好!</div>
			            <p class="text">哈哈哈</p>
			            <p class="price">好不</p>
			          </div>
			        </div>
			        <div class="btn" ref="btn">
			            <button>编辑</button>
			            <button style="background:#387ef5;color:#fff">收藏</button>
			        </div>
			    </div>
		</div>	

</template>

<script>
	import vantHeader from '@/components/header.vue'
	import * as ajax from '@/utils/api'
	import Vue from 'vue';
	import {
		Collapse,
		CollapseItem,
		Toast
	} from 'vant';
import { Tab, Tabs } from 'vant';

Vue.use(Tab).use(Tabs);
	Vue.use(Collapse).use(CollapseItem).use(Toast);
	import {
		DropdownMenu,
		DropdownItem,
		Cell,
		Loading,
		Icon
	} from 'vant';

	Vue.use(DropdownMenu).use(DropdownItem).use(Cell).use(Loading).use(Icon);

	export default {
		components: {
			vantHeader,
		},
		data() {
			return {
				flag: false,
				startX: 0,
				endX: 0,
				slideStyle: {
					left: 0,
					transition: 'none'
				}
			}
		},
		created() {
			
			
		},
		mounted() {
			var _this = this;
			// 使用js的现代事件监听transition过渡结束
			this.$refs.slide.addEventListener('transitionend',function(){
				_this.endX = this.offsetLeft;
			})
		},
		methods: {
			start (e){  //记录开始滑动屏幕的X轴的位置
				this.flag = true;
				this.startX = e.touches[0].clientX;
				this.endX = this.$refs.slide.offsetLeft;
				this.slideStyle.transition = 'none';
			},
			move (e){
				if(this.flag){
					// 处理鼠标移动的逻辑
					var moveX = this.endX + (e.touches[0].clientX - this.startX);  //计算滑动的距离
					if(Math.abs(moveX) >= this.$refs.btn.offsetWidth && moveX < 0){  //判断滑动的距离是否大于class:btn的宽度
						moveX = (Math.abs(moveX) - this.$refs.btn.offsetWidth) * 0.1; // 0.3阻力系数
						this.slideStyle.left = - this.$refs.btn.offsetWidth - moveX + 'px';
					}else if(moveX >= 0){  //滑动距离是否大于等于0
						this.slideStyle.left = 0 + 'px';  //大于等于0让class:item等于0
					}else{
						this.slideStyle.left = moveX + 'px';  //小于0让class:item等于滑动的距离
					}
				}
			},
			end (e){
				if(this.flag){
					this.flag = false;
					// endX = slide.offsetLeft;
					var moveX = e.changedTouches[0].clientX - this.startX;  //计算滑动的距离
					this.slideStyle.transition = 'left .3s';
					var btnWidth = this.$refs.btn.offsetWidth;  //class:btn的宽度
					if(moveX < 0){
						if(Math.abs(moveX) >= btnWidth / 2 || Math.abs(this.$refs.slide.offsetLeft) >= this.$refs.btn.offsetWidth){ //是否大于class:btn宽度的一半
							this.slideStyle.left = - btnWidth + 'px';  //左滑超过class:btn宽度的一半就滑回去
						}else if(Math.abs(moveX) < btnWidth / 2){  //小于class:btn宽度的一半
							this.slideStyle.left = 0 + 'px';  //左滑没有超过class:btn宽度的一半回原位
						}
					}else if(moveX > 0 && this.endX != 0){
						if(Math.abs(moveX) >= btnWidth / 2){
							this.slideStyle.left = 0 + 'px';  //右滑超过class:btn宽度的一半就滑回去
						}else if(Math.abs(moveX) < btnWidth / 2){
							this.slideStyle.left = - btnWidth + 'px';  //右滑没有超过class:btn宽度的一半回原位
						}
					}
				}
			}
		}
	}
</script>

<style scoped>
	
	
	/*  */
	.box{
	    position:relative;
	    border-bottom:0.026667rem solid #666666;
	}
	.btn{
	  height:100%;
	  position:absolute;
	  right:0;
	  top:0;
	  background:red;
	  display:flex;
	}
	button{
	  width:1.6rem;
	  height:100%;
	  background:#f8f8f8;
	  border:none;
	}
	.item{
	  padding:0.266667rem;
	  display:flex;
	  position:relative;
	  background:#fff;
	  z-index: 2;
	  box-shadow: 0.026667rem 0 0.053333rem #ddd;
	}
	.item img{
	  width:2.133333rem;
	  height:2.133333rem;
	  margin-right:0.4rem;
	  border-radius: 0.133333rem;
	}
	
	.item .title{
	  font-size:0.48rem;
	  float: left;
	}
	.item .text{
	  font-size:0.426667rem;
	  color:#888;
	  float: left;
	  margin: 0 1.33rem;
	}
	.item .price{
	  color:#888;
	  float: left;
	  margin: 0 1.33rem;
	}
	/*  */
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/deep/
	.van-tabs__line{
		display: none;
	}
	/deep/
	.van-tabs__nav{
		padding-bottom: 0;
	}
	/deep/
	.van-tab,.van-tabs__nav,.innerLabel .van-hairline--top-bottom{
		height: 32px;
		line-height: 32px;
	}
	/deep/
	.van-tab{
		padding: 0;
	}
	/*隐藏掉滚动条*/
	.innerLabel{
		display: -webkit-box;
		overflow-x: auto;
		/*适应苹果*/
		-webkit-overflow-scrolling:touch;
	}
	.innerLabel::-webkit-scrollbar {
		display: none;
	}
	.innerLabel .divData{
		float: left;
	}
	
	.innerLabel li span.van_icon{
		float: left;
		line-height: 32px;
		padding: 0 12px;
	}
	.innerLabel li span.cycaqData_r{
		padding: 0 12px;
		width: 120px;
		height:32px;
		border:1px solid rgba(204,204,204,1);
			float: left;
		margin-left: 6px;
		color: #333333;
		background:rgba(249,249,249,1);
		font-size: 12px;
		text-align: center;
		border-radius:2px;
		line-height: 30px;
		
	}
	.innerLabel li span:first-child{
		margin-left: 0;
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
	/deep/
	.van-cell{
		padding: 13px 16px;
	}
	/deep/ .van-collapse-item__title .van-cell__right-icon::before {
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
		-webkit-transition: -webkit-transform .3s;
		transition: -webkit-transform .3s;
		transition: transform .3s;
		transition: transform .3s, -webkit-transform .3s;
		transition: transform .3s, -webkit-transform .3s;
	}

	/deep/ .van-collapse-item__title--expanded .van-cell__right-icon::before {
		-webkit-transform: rotate(90deg) !important;
		transform: rotate(90deg) !important;
	}

	/deep/ .van-collapse-item__wrapper .van-collapse-item__content {
		padding: 0 !important;
	}

	.van-collapse-item__content .van-cell {
		background: rgba(249, 249, 249, 1);
		font-size: 14px;
		border-bottom: rgba(238, 238, 238, 1);
	}

	.van-dropdown-menu {
		width: 90%;
		margin: 0 auto;
	}

	.l-dropdown {
		padding: 10px 0;
		background: #fff;
	}

	.spinner {
		text-align: center;
		font-size: 12px;
		padding: 15px 0;
	}

	.header-right {
		line-height: 5px;
		color: #fff;
	}

	.container {
		padding-top: 46px;
		background: #fff;
		margin-bottom: 59px;
	}

	.container_header {
		border-bottom: 1px solid #eee;
	}

	.container_list li {
		padding: 14px 16px;
		border-bottom: 1px solid #eee;
	}

	
	li:last-child {
		border-bottom: none;
	}

	li span:last-child {
		float: right;
		display: block;
	}

	.container_list li .left_img {
		width: 100px;
		height: 80px;
		border-radius: 3px;
		border: 1px solid rgba(170, 170, 170, 1);

		float: left;
	}

	.container_list li .left_img img {
		display: block;
		border-radius: 3px;
		float: left;
	}

	.right_title {
		padding-top: 2px !important;
		padding-right: 0 !important;
		padding-bottom: 0 !important;
		padding-left: 8px;
	}

	.right_title li {
		padding: 0 !important;
		border-bottom: none;
	}

	.right_title li:first-child {
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 16px;
	}

	.right_title li:nth-of-type(2) {
		width: 64px;
		height: 20px;
		background: rgba(255, 255, 255, 1);
		border-radius: 2px;
		border: 1px solid rgba(64, 83, 139, 1);
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(64, 83, 139, 1);
		line-height: 18px;
		text-align: center;
		margin-top: 12px;
	}

	.right_title li .van-cell {
		padding: 0 !important;

	}

	.right_title li span:first-child {
		color: #AAAAAA;
		font-size: 12px;
		margin-top: 14px;
		display: block;
		float: left;
		line-height: 12px;
	}

	.right_title li span:last-child {
		color: rgba(112, 153, 208, 1);
		line-height: 12px;
		margin-top: 14px;
		font-size: 12px;
		float: right;
	}

	.right_title li .van-icon {
		margin-top: 8px;
		color: rgba(112, 153, 208, 1);
	}
</style>
