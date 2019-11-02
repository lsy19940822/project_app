<template>
	<div class="container">
		<!--header-->
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType='2'>
			<div slot='right_slot' style="top: 10px;" @click="searchShowHide">
				<p class="header-right notice-box">
					<van-icon name="search" />
				</p>
			</div>
		</vant-header>
		<!--search-->
		<div class="search-wrap" v-show="isSearchShow">
			<van-search v-model="searchVal" placeholder="搜索已解决问题" show-action @cancel="searchCancel" @search="onSearch" />
			<van-row type="flex" justify="space-between" class="searh-clear">
				<van-col span="8">搜索历史</van-col>
				<van-col span="8" class="clear-btn">
					<van-icon name="delete" />清除记录</van-col>
			</van-row>
			<div class="s-history clearfix">
				<ul class="s-historyList">
					<li>
						<div class="h-tag">1标主站</div>
					</li>
					<li>
						<div class="h-tag">1标主站</div>
					</li>
					<li>
						<div class="h-tag">1标主站</div>
					</li>
					<li>
						<div class="h-tag">1标主站</div>
					</li>
				</ul>
			</div>
		</div>
		<!--content list-->
		<div class="list-content">

			<van-tabs v-model="active">
				<van-tab title="全部问题">
					<!--检索关键字-->
					<div class="header_inte">
						<div class="inte_gent">
							<ul class="innerLabel">
								<li class='activeLabel'>全部</li>
								<li>CYCZQ-1标</li>
								<li>CYCZQ-2标</li>
								<li>CYCZQ-3标</li>
								<li>CYCZQ-4标</li>
								<li>CYCZQ-5标1</li>
								<li>CYCZQ-5标2</li>
								<li>CYCZQ-6标</li>
							</ul>
						</div>
					</div>
					<ul class="l-list">
						<li>
							<div class="item">
								<h6 class="title">1标主站桥梁存在严重的质量问题，电线直接放在地上</h6>
								<div class="explain marginT12">
									<van-row>
										<van-col span="16">
											<span class="color7099D0">质量问题</span>
											<span class="colorAAA">2019-09-26 22:22:22</span>
										</van-col>
										<van-col span="8" align="right">
											<span class="color53904D">已解决</span>
										</van-col>
									</van-row>
								</div>
								<div class="intro marginT12 omit2">今年以来，根据各地上报数据，全市共有建设项目326个，其中：市级项目32个，六枝特区今年以来，根据各地上报数据，全市共有建</div>
							</div>
						</li>

						<li>
							<div class="item">
								<h6 class="title">1标主站桥梁存在严重的质量问题，电线直接放在地上</h6>
								<div class="explain marginT12">
									<van-row>
										<van-col span="16">
											<span class="color7099D0">安全问题</span>
											<span class="colorAAA">2019-09-26 22:22:22</span>
										</van-col>
										<van-col span="8" align="right">
											<span class="color53904D">已解决</span>
										</van-col>
									</van-row>
								</div>
								<div class="intro marginT12 omit2">今年以来，根据各地上报数据，全市共有建设项目326个，其中：市级项目32个，六枝特区今年以来，根据各地上报数据，全市共有建</div>
							</div>
						</li>
					</ul>
				</van-tab>
				<van-tab title="安全问题">
					<!--检索关键字-->
					<div class="header_inte">
						<div class="inte_gent">
							<ul class="innerLabel">
								<li class='activeLabel'>全部</li>
								<li>CYCZQ-1标</li>
								<li>CYCZQ-2标</li>
								<li>CYCZQ-3标</li>
								<li>CYCZQ-4标</li>
								<li>CYCZQ-5标1</li>
								<li>CYCZQ-5标2</li>
								<li>CYCZQ-6标</li>
							</ul>
						</div>
					</div>
					<ul class="l-list">
						<li>
							<div class="item">
								<h6 class="title">1标主站桥梁存在严重的质量问题，电线直接放在地上</h6>
								<div class="explain marginT12">
									<van-row>
										<van-col span="16">
											<span class="color7099D0">安全问题</span>
											<span class="colorAAA">2019-09-26 22:22:22</span>
										</van-col>
										<van-col span="8" align="right">
											<span class="color53904D">已解决</span>
										</van-col>
									</van-row>
								</div>
								<div class="intro marginT12 omit2">今年以来，根据各地上报数据，全市共有建设项目326个，其中：市级项目32个，六枝特区今年以来，根据各地上报数据，全市共有建</div>
							</div>
						</li>
					</ul>
				</van-tab>
				<van-tab title="质量问题">
					<!--检索关键字-->
					<div class="header_inte">
						<div class="inte_gent">
							<ul class="innerLabel">
								<li class='activeLabel'>全部</li>
								<li>CYCZQ-1标</li>
								<li>CYCZQ-2标</li>
								<li>CYCZQ-3标</li>
								<li>CYCZQ-4标</li>
								<li>CYCZQ-5标1</li>
								<li>CYCZQ-5标2</li>
								<li>CYCZQ-6标</li>
							</ul>
						</div>
					</div>
					<ul class="l-list">
						<li>
							<div class="item">
								<h6 class="title">1标主站桥梁存在严重的质量问题，电线直接放在地上</h6>
								<div class="explain marginT12">
									<van-row>
										<van-col span="16">
											<span class="color7099D0">质量问题</span>
											<span class="colorAAA">2019-09-26 22:22:22</span>
										</van-col>
										<van-col span="8" align="right">
											<span class="color53904D">已解决</span>
										</van-col>
									</van-row>
								</div>
								<div class="intro marginT12 omit2">今年以来，根据各地上报数据，全市共有建设项目326个，其中：市级项目32个，六枝特区今年以来，根据各地上报数据，全市共有建</div>
							</div>
						</li>
					</ul>
				</van-tab>
			</van-tabs>
			<!-- 			<van-loading class="spinner" v-if = 'isLoading' size="24px" type="spinner">加载中...</van-loading>
			<div v-else class="spinner"><span><van-icon name="more-o" /></span>已经到底啦~</div> -->
		</div>

	</div>
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import Vue from 'vue';
	import {
		Row,
		Col,
		Loading,
		Tab,
		Tabs,
		Icon,
		Search
	} from 'vant';
	Vue.use(Row).use(Col).use(Loading).use(Tab).use(Tabs).use(Icon).use(Search);
	export default {
		data() {
			return {
				questionText: '已解决问题',
				isLoading: true,
				active: 0,
				searchVal: '',
				isSearchShow: false
			}
		},
		components: {
			vantHeader
		},
		methods: {
			searchShowHide() {
				this.isSearchShow = !this.isSearchShow
			},
			searchCancel() {
				this.searchShowHide();
			},
			onSearch() {

			}
		}
	}
</script>

<style scoped>
	/*  */
	.innerLabel li.activeLabel {
		background: #595F73;
		border: 1px solid #595F73;
		color: #fff;
	}

	.innerLabel li {
		padding: 0 12px;
		width: auto;
		height: 26px;
		border: 1px solid rgba(204, 204, 204, 1);
		float: left;
		margin-left: 6px;
		color: #AAAAAA;
		font-size: 12px;
		text-align: center;
		-ms-flex-negative: 0;
		flex-shrink: 0;
		transform: all .5s ease;
		border-radius: 2px;
		line-height: 24px;


	}

	.inte_gent,
	.innerLabel {
		width: 100%;
		height: auto;
		float: left;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: middle;
		-ms-flex-align: middle;
		align-items: middle;
		overflow: auto;
	}

	.header_inte {
		width: auto;
		height: auto;
		overflow: hidden;
		padding: 14px 16px;
		background: #fff;
		border-bottom: 1px solid rgba(238, 238, 238, 1);
	}

	/*  */
	.clearfix::after {
		content: '';
		display: block;
		clear: both;
	}

	* {
		margin: 0;
	}

	img {
		display: block;
		width: 100%;
		height: auto
	}

	/deep/ .van-tabs__line {
		background-color: #9499AA;
		width: 33.3% !important;
	}

	.color666 {
		color: #666;
	}

	.omit {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.omit2 {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.marginT12 {
		margin-top: 12px;
	}

	.container {
		padding-top: 46px;
	}

	.van-nav-bar .van-icon {
		font-size: 18px;
		color: #fff;
	}

	/*.notice-box{width:20px;height:20px;}*/
	/*ontent list*/
	.list-content {
		background: #fff;
	}

	.list-content {
		margin-top: 10px;
	}

	.l-list {
		padding: 0 14px;
	}

	.l-list li {
		border-bottom: 1px solid #eee;
	}

	.title {
		font-size: 18px;
		color: #333;
		line-height: 24px;
	}

	.explain {
		font-size: 12px;
	}

	.intro {
		font-size: 16px;
		color: #666;
	}

	.item {
		padding: 14px 0;
	}

	.color7099D0 {
		color: #7099D0;
	}

	/*安全问题-蓝色*/
	.color7099D0 {
		color: #7099D0;
	}

	.colorAAA {
		color: #aaa;
	}

	.colorE19B52 {
		color: #E19B52;
	}

	/*待指派*/
	.color5082C6 {
		color: #5082C6
	}

	/*待解决*/
	.color7081B9 {
		color: #7081B9
	}

	/*带抄送*/
	.colorE6B36F {
		color: #E6B36F
	}

	/*质量问题*/
	.colorC86565 {
		color: #C86565
	}

	/*退回问题*/
	.color5268E1 {
		color: #5268E1;
	}

	/*待审核*/
	.color53904D {
		color: #53904D;
	}

	/*待复核*/
	/*loading*/
	.spinner {
		text-align: center;
		font-size: 14px;
		padding: 15px 0;
		color: #969799;
	}

	/**/
	.small-headPhoto {
		width: 20px;
		height: 20px;
		float: left;
		margin-right: 5px;
	}

	/*检索关键字*/
	.retrieval-box {
		border-bottom: 1px solid #DDD;
		padding: 14px;
	}

	.retrieval-list li {
		padding: 6px 15px;
		border: 1px solid #ccc;
		color: #aaa;
		font-size: 14px;
		float: left;
		margin-right: 5px;
	}

	.retrieval-list li.current {
		color: #fff;
		background: #595F73;
	}

	/*search*/
	.searh-clear {
		padding: 14px;
		color: #666;
		font-size: 16px;
	}

	.clear-btn {
		text-align: right;
	}

	.clear-btn .van-icon {
		top: 2px;
		right: 4px;
	}

	.s-history {
		padding: 0 14px;
	}

	.s-historyList li {
		float: left;
	}

	.h-tag {
		margin-bottom: 10px;
		color: #333;
		padding: 8px 12px;
		background: #fff;
		border: 1px solid #DDD;
		font-size: 14px;
		margin-right: 10px;
	}

	.search-wrap {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 111;
		background: #fff;
	}
</style>
