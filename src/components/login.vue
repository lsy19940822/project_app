<template>
	<div class="login">
		<h3>登录系统</h3>
		<img src="../assets/login-bg.png" alt="">
		<h4>常益长铁路信息化管理平台</h4>
		<p>Changyi-Changsha Railway Informatization Management Platform</p>
		<div class="form overflow">
			<div class="formInput"><img src="" alt=""><input type="text" placeholder="请输入手机号/用户名"></div>
			<div class="formInput"><img src="" alt=""><input type="text" placeholder="请输入密码"></div>
		    <div class="loginButton">登录</div>
			<p>忘记密码？</p>
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
	.login{
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left:0;
		background: url(../assets/login-bg.png) no-repeat;
		background-size: 100% 100%;
	}
	.loginButton{
		color: #fff;
		text-align: center;
		line-height: 50px;
		font-size: 14px;
		height:50px;
		background:rgba(104,153,230,1);
		border-radius:26px;
		margin-bottom: 25px;
	}
	.formInput{
		width: 100%;
		height:48px;
		background:rgba(255,255,255,0.15);
		border-radius:25px;
		padding:10px 15px;
		
		margin-bottom: 30px;
	}
	.formInput img{
		width: 18px;
		height: 18px;
		margin: 5px 10px 0;
	}
	.formInput input{
		border: none;
		background: none;
		outline: none;
	}
	.formInput img,.formInput input{
		display: block;
		float: left;
	}
	.form{
		padding: 15px;
		margin-top: 20px;
	}
	h3{
		height:24px;
		font-size:17px;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
		line-height:24px;
		text-align:center;
	}
	img{
		width:123px;
		height:89px;
		display: block;
		margin: 25px auto 24px; 
	}
	h4{
		height:33px;
		font-size:28px;
		font-family:FZZCHJW--GB1-0,FZZCHJW--GB1;
		font-weight:normal;
		color:rgba(255,255,255,1);
		line-height:33px;
        text-align: center; 	
		margin: 24px 0 0;	
	}
	p{
		/* height:14px; */
		font-size:12px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:14px;
		text-align: center; 
		overflow: hidden;
		margin: 0 !important;
	}
</style>
