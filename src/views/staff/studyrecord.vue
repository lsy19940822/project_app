 <template>
	<div class="studyrecord">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2">
			<div slot='right_slot' @click="$router.push({path:'/staffNew'})">
				<p class="header-right"><img src="../../assets/images/index_icon/icon_l.png" alt=""></p>
			</div>
		</vant-header>
		<div class="container overflow">
			<div class="container_header overflow l-dropdown">
				<van-dropdown-menu class='van-dropdown'>
				  <van-dropdown-item v-model="value1" :options="option1" />
				  <van-dropdown-item v-model="value2" :options="option2" />
				</van-dropdown-menu>
			</div>
			<ul class="container_list overflow">
				<li>
					<div class="left_img"><img src="../../assets/images/safeQuality/img_study@2x.png" alt="" width="100%"></div>
					<ul class="right_title overflow">
						<li>火灾自动报警系统设计规范</li>
						<li>建筑规范</li>
						<li>
							<van-cell is-link >
								<span>2019-10-17 22:22:22</span>
								<span>已学习</span>
							</van-cell>
						</li>   
					</ul>
				</li>
				<li>
					<div class="left_img"><img src="../../assets/images/safeQuality/img_studys@2x.png" alt="" width="100%"></div>
					<ul class="right_title overflow">
						<li>给排水工程造价</li>
						<li style="border:1px solid rgba(112,153,208,1);color: #7099D0;">视频课程</li>
						<li>
							<van-cell is-link >
								<span>2019-10-17 22:22:22</span>
								<span>已学习</span>
							</van-cell>
						</li>
					</ul>
				</li>
				
			</ul>
			<!-- <van-loading class="spinner" v-if = 'isLoading' size="24px" type="spinner">加载中...</van-loading> -->
		</div>
		<study-footer class='studyrecordFooter' v-model="active"></study-footer>
	</div>
	
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import studyFooter from '@/components/studyFooter.vue'
	import Vue from 'vue';
	import { DropdownMenu, DropdownItem, Cell,Loading } from 'vant';
	
	Vue.use(DropdownMenu).use(DropdownItem).use(Cell).use(Loading);
	
	export default {
		components: {
			vantHeader,
			studyFooter
		},
		data() {
			return {
				questionText:"学习课程",
				value1: 0,
			    value2: 0,
				option1: [
					{ text: '全部课程', value: 0 },
					{ text: '火灾自动报警系统设计规范', value: 1 },
					{ text: '给排水工程造价', value: 2 }
				],
			    option2: [
					{ text: '全部类型', value: 0 },
					{ text: '建筑规范', value: 1 },
					{ text: '建筑规范2', value: 2 },
			    ],
				isLoading:true,
				active:3
			}
		},
		created() {
			
		},
		mounted() {
			
		},
		
		methods: {
		}
	}
</script>

<style scoped>
	
	.van-dropdown-menu{
	    width: 90%;
	    margin: 0 auto;
	}
	.l-dropdown{
	    padding: 10px 0;
	    background: #fff;
	}
	
	.spinner{
	    text-align: center;
	    font-size: 12px;
	    padding: 15px 0;
	}
	.header-right {
		line-height: 5px;
		color:#fff;
	}
	.container{
		padding-top: 46px;
		background: #fff;
		margin-bottom: 59px;
	}
	.container_header{
		border-bottom:1px solid #eee;
	}
	.container_list li{
		padding: 14px 16px;
		border-bottom:1px solid #eee;
	}
	.container_list li .left_img{
		width:100px;
		height:80px;
		border-radius:3px;
		border:1px solid rgba(170,170,170,1);
		
		float: left;
	}	
	.container_list li .left_img img{
		display: block;
		border-radius:3px;
		float: left;
	}
	.right_title{
		padding-top: 2px !important;
		padding-right: 0 !important;
		padding-bottom: 0 !important;
		padding-left: 8px;
	}
	.right_title li{
		padding: 0 !important;
		border-bottom:none ;
	}
	.right_title li:first-child{
		font-size:14px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:16px;
	}
	.right_title li:nth-of-type(2){
		width:64px;
		height:20px;
		background:rgba(255,255,255,1);
		border-radius:2px;
		border:1px solid rgba(64,83,139,1);
		font-size:12px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(64,83,139,1);
		line-height:18px;
		text-align: center;
		margin-top: 12px;
	}
	.right_title li .van-cell{
		padding: 0 !important;
		
	}
	.right_title li span:first-child{
		color:#AAAAAA;
		font-size:12px;
		margin-top: 14px;
		display: block;
		float: left;
		line-height:12px;
	}
	.right_title li span:last-child{
		color:rgba(112,153,208,1);
		line-height:12px;
		margin-top: 14px;
		font-size:12px;
		float: right;
	}
	.right_title li .van-icon{
		margin-top: 8px;
		color:rgba(112,153,208,1);
	}
</style>
