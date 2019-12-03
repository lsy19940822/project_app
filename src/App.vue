<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
	.Treedata{
		background: #fff;
	}
	.van-uploader__wrapper .van-uploader__preview:last-child,.van-uploader__wrapper .van-uploader__upload{
		margin-right: 0 !important;
	}
	html,body,#app {
		width: 100%;
		height: 100%;
	}
	/*  */
	.intelligent .routerlink{
		
		width: 33.3% !important;
		
	} 
	.routerlink{
		width:50%;
		height: 44px;
		line-height: 44px;
		float: left;
		text-align: center;
		color: #7d7e80;
		font-size: 14px;
		border-bottom: 1px solid #eee;
		background: #fff;
	}
	.intelligent div.router-link-active:nth-of-type(1){
		border-bottom:3px solid rgb(112, 153, 208) !important;
	}
	.intelligent div.router-link-active:nth-of-type(2){
		border-bottom:3px solid #999 !important;
	}
	.intelligent div.router-link-active:nth-of-type(3){
		border-bottom:3px solid rgb(195, 99, 99) !important;
	}
/* 	.intelligent .router-link-active{
		border-bottom:3px solid #999 !important;
		width: 33.3% !important;
		color: #333;
	} */
	/* */
	.router-link-active{
		border-bottom:3px solid #9499AA;
		width: 50% !important;
		color: #333;
	}
	/*  */
	
	
	.van-image-preview__index{
		top: 56px !important;
	}
	.van-tabbar-item .van-info{
		margin-top:8px !important;
	}
	.van-dropdown .van-dropdown-menu__item:first-child {
	    border-right: 1px solid #ccc;
	    margin-right: 10px;
	}
	.Intelligence-dropdown .van-dropdown-menu__item:first-child {
		margin-left: 0 !important;
	}
	.Intelligence-dropdown .van-dropdown-menu__item:first-child .van-ellipsis{
			width:auto;
	}
	.Intelligence-dropdown .van-dropdown-menu__item{
		/* width: 32%; */
		float: left;
		border: 1px solid #CCC;
		border-radius: 2px;
		background: #F9F9F9;
		margin-left: 2%;
	}
	.Intelligence-dropdown .van-dropdown-menu__title{
		padding: 0;
		padding-right:12px;
	}
	.Intelligence-dropdown .van-ellipsis{
		width: 60px;
	}
	.van-dropdown .van-ellipsis{
		width: 80px;
	}
	.van-dropdown .van-dropdown-menu__item {
	    border: 1px solid #CCC;
	    border-radius: 2px;
	    background: #F9F9F9;
	}
	#leadershipUser .header{
		background:linear-gradient(121deg,rgba(33,40,65,1) 0%,rgba(29,43,95,1) 100%) !important;
	}
	
	#staffUser .header{
		background:linear-gradient(121deg,rgba(33,40,65,1) 0%,rgba(29,43,95,1) 100%) !important;
	}
	.exam-footer .van-tabbar-item__icon{
		margin-bottom: 2px;
	}
	.overflow{
		height: auto;
		overflow: hidden;
	}
	.navLists .van-progress__pivot{
		display: none;
	}
	/* 答题卡遮罩 */
	.van-overlay {
		/*top: 46px !important;*/
	}
	.header{
	    background: #212841!important;	
		height:46px !important;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
	}
	.header span,.header .van-icon-arrow-left,.active .van-checkbox__label{
		color:#fff !important;
	}
	.question-container .van-checkbox__icon,.question-container .van-radio__icon{
	    display: none !important;
	}
	body{
		background:rgba(236,236,236,1);
	}
	.question-title .items {
		background:rgba(246,246,246,1);
		border-radius:2px;
		padding:14px 12px;
		margin-bottom: 14px;
	}
	.question-title .items:last-child{
		margin-bottom:0;
	}
	.question-title .van-radio__label,.question-title .van-checkbox__label{
		display: block;
		width: 100% !important;
	}
	.question-title .van-checkbox-group .active {
		background:rgba(112,153,208,1);
		color:#fff !important;
	}
	.question-title .van-radio-group .activeradio{
		background:rgba(112,153,208,1);
		
	}
	.question-title .van-radio-group .activeradio .title_t{
		color:#fff !important;
	}
	.question-title .van-checkbox-group .active .chooseIndex{
		/* border: 1px solid #fff ; */
		background:#fff   !important;
		color:rgba(112,153,208,1)!important;
	}
	.question-title .van-radio-group .activeradio .chooseIndex{
		/* border: 1px solid #fff ; */
		background:#fff   !important;
		color:rgba(112,153,208,1)!important;
	}
		*{
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		-ms-box-sizing: border-box;
		-o-box-sizing: border-box;
		box-sizing: border-box
	}
	.upload-btn, .upload-btn .van-uploader__wrapper, .upload-btn .van-uploader__input-wrapper {
		display: inline-block;
		width: 100%!important;
		padding: 0 2%;
		text-align: center;
	}
</style>
