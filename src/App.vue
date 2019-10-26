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
	.navLists .van-progress__pivot{
		display: none;
	}
	/* 答题卡遮罩 */
	.van-overlay {
		top: 46px !important;
	}
	.header{
	    background: #212841!important;	
		height:46px !important;
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
</style>
