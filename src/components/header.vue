<template>
	<div id="header" v-show="HeaderShow">
		<!-- 头部 -->
		<van-nav-bar class='header' 
		    :left-arrow="leftArrow"
		    :left-text="leftText"
		    :border="border"
		    :fixed="fixed"
		    :z-index="zIndex"
		    @click-left="onClickLeft"
		    @click-right="onClickRight">
		    <div slot="title">
		        <span v-if="titleType == 1">{{title}}</span>
		        <slot v-else name="title_slot"></slot>
		    </div>
		    <div slot="right">
		        <span v-if="rightType == 1">{{rightText}}</span>
		        <slot v-else name="right_slot"></slot>
		    </div>
		</van-nav-bar>
	</div>
 
</template>

<script>
	import { NavBar } from 'vant';
	export default {
		components:{
			[NavBar.name]: NavBar,
		},
		data(){
			return{
				HeaderShow:true
			}
		},
		props: {
			leftArrow: { type: Boolean, default: true }, //是否显示左侧箭头
			rightType: { type: Number, default: 1}, //右侧样式,1文字，其他自定义
			titleType: { type: Number, default: 1}, //标题样式,1文字，其他自定义
			title: { type: String,default: '标题'}, //标题内容
			leftText: { type: String,default: ''}, //左侧文案
			rightText: { type: String,fault: ''},  //右侧文案
			border: { type: Boolean,default: false}, //是否显示下边框
			preventGoBack: {type: Boolean,default: false},//是否阻止返回
			preventGoLink: {type: String,default: '/'},//是否阻止返回并使用自定义返回链接
			fixed: { type: Boolean,default: true},  //是否固定在顶部
			zIndex: { type: Number,default: 100}//元素 z-index
		},
		created() {
			sessionStorage.getItem("chang_yi_headerHide");
			if(sessionStorage.getItem("chang_yi_headerHide") == 'false'){
				
				this.HeaderShow = false
			}
		},
		methods:{
			onClickLeft() {
				
				if(this.preventGoBack){
					this.$emit('on-click-left');
					this.$router.push({path: this.preventGoLink})
				}else{
					this.$router.go(-1);
				}
			},
			onClickRight() {
				this.$emit('on-click-right');
			}
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	/deep/
	.van-nav-bar__title{
		width:85%;
		max-width: 85%;
	}
  a{
    display: block;
  }
#indexHeader{
      max-width: 1920px;
      height: auto;
      margin: 0 auto;
      border-bottom: 2px solid #133f8e;
}
.header_top{
      height: 46px;
      background-color: #242a3a;
}
.margin p,.user,.user a,.zhong{
      font-size: 13px;
      font-family: Microsoft YaHei;
      font-weight: 300;
      color: #e2e7f4;
      line-height: 46px;
      text-align: left;
}
.inputs{
  width: 233px;
      height: 26px;
      background-color: #242a3a;
      margin: 10px auto 0;
      border-radius: 13px;
      border: 1px solid #303748;
}
.inputs input{
      float: left;
      width: 80%;
      background: none;
      height: 100%;
      border: none;
      text-indent: 16px;
          color: #e2e7f4;
}
.icon{
      float: right;
}
.icon .el-icon-search{
      width: 14px;
      height: 14px;
      margin: 6px 21px 0 0;
          color: #e2e7f4;
}
.zhong{text-align: center;}
.header_bottom{
  height: 100px;
  background: #fff;
}
.logo,.logo img{
      width: 277px;
      height: 73px;
      margin: 15px 0 0 0;
}
#nav{

      line-height: 110px;
      min-width: 65px;
      cursor: default;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      padding: 0 10px 0 10px;
      text-align: center;
}
#nav a{color:#333}
.current,.exactClass,.router-link-active{
      background: rgba(12, 57, 143, 0.06);
}
</style>
