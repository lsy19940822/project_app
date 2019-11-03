<template>
	<div class="container">
		<!--header-->
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType='2'>
			
		</vant-header>
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
		<!--content list-->
		<div class="list-content">
			<ul class="l-list">
				<li>
					<van-cell is-link>
						<span>指挥部侧门 - 监控</span>
						<span></span>
					</van-cell>
				</li>
				<li>
					<van-cell is-link>
						<span>指挥部侧门 - 监控</span>
						<span></span>
					</van-cell>
				</li>
			</ul>
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
		Search,
		Cell,
		DropdownMenu, DropdownItem,
	} from 'vant';
	Vue.use(Row).use(Cell).use(Col).use(Loading).use(Tab).use(Tabs).use(Icon).use(Search).use(DropdownMenu).use(DropdownItem);
	export default {
		data() {
			return {
				questionText: '无人机监控',
				isLoading: true,
				active: 0,
				searchVal: '',
				isSearchShow: false,
				
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
	.innerLabel li.activeLabel{
		background: #5082C6;
		border:1px solid #5082C6;
		color: #fff;
	} 
	.innerLabel li{
		padding: 0 12px;
		width: auto;
		height:26px;
		border:1px solid rgba(204,204,204,1);
		float: left;
		margin-left: 6px;
		color: #AAAAAA;
		font-size: 12px;
		text-align: center;
		-ms-flex-negative: 0;
		flex-shrink: 0;
		transform: all .5s ease;
		border-radius:2px;
		line-height: 24px;
		
		
	}
	.inte_gent,.innerLabel{
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
	.header_inte{
		width: auto;
		height: auto;
		overflow: hidden;
		padding: 14px 16px;
		background: #fff;
		border-bottom: 1px solid rgba(238, 238, 238, 1);
	}
	/*  */
	/*  */
	.l-list li span:last-child{
		width:65%;
		color:#999999;
		text-align: right;
		display: inline-block;
		float: right;
		overflow: hidden;
		font-size: 14px;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	/deep/ .van-dropdown-menu .van-dropdown-menu__item:first-child {
	    border-right: 1px solid #ccc;
	    margin-right: 10px;
	}
	/deep/.van-dropdown-menu .van-dropdown-menu__item {
	    border: 1px solid #CCC;
	    border-radius: 2px;
	    background: #F9F9F9;
	}
	.l-dropdown{
	    padding: 10px 0;
	    background: #fff;
	    border-bottom: 1px solid #ECECEC;
	}
	.van-dropdown-menu{
	    width: 90%;
	    margin: 0 auto;
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
		width: 50% !important;
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

</style>
