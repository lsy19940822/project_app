<template>
	<div id="examrecord" :class="{ headeractive: isActive }">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2"></vant-header>
		<div class="container">
			<div v-if='examRecord==""' style="padding: 10px 16px;color: #969799; font-size: 14px;line-height: 24px;text-align: center;background: none;">暂无考试记录</div>
			<ul class="container_list">
				<li v-for='(item,index) in examRecord' v-if="index<10">
					<van-cell is-link >
						<div class="container_l">
							<span class='container_span_first' v-if="item.ISQUALIFIED == 1?2:1" :style="{'color':(item.ISQUALIFIED == 1?'#69966F':'#C36363')}">{{item.EXAMINATIONSCORES}}</span>
							<span class='container_span_seound' v-if="item.ISQUALIFIED == 1?2:1" :style="{'color':(item.ISQUALIFIED == 1?'#69966F':'#C36363')}">分</span>
							<span class='container_span_firsts'  v-if="item.ISQUALIFIED == 1?2:1" :style="{'color':(item.ISQUALIFIED == 1?'#69966F':'#C36363'),'border':(item.ISQUALIFIED == 1?'1px solid #69966F':'1px solid #C36363')}">{{item.ISQUALIFIED == 1?'合格':'未合格'}}</span>
						</div>
						
						<div class="container_r">
							
							<span class='container_span_three'>{{item.EXAMINATIONBATCH}}</span>
							
							<span class='container_span_seounds' style="">考试时间：{{item.EXAMINATIONDATE}}</span>
						</div>
					</van-cell>
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
	
	Vue.use(Cell)
	export default {
		components: {
			vantHeader,
			
		},
		data() {
			return {
				questionText:"考试记录",
				examRecord:[],
				examRecordTime:[],
				IDCard:"",
				isActive:false
			}
		},
		mounted() {
			this.examrecord()
		},
		created() {
			sessionStorage.getItem("chang_yi_headerHide");
			if(sessionStorage.getItem("chang_yi_headerHide") == 'false'){
				
				this.isActive = true
			}
		},
		methods: {
			examrecord(){
				let that=this;
				that.IDCard=that.$route.query.IDCard;
				ajax.get('/API/WebAPIDataAudit/TestRecords?IDCard='+that.$route.query.IDCard).then(res => {
					if(res.data.result) {
						this.examRecord=res.data.data;
						for(let k in this.examRecord) {
						    this.examRecord[k].EXAMINATIONDATE=this.examRecord[k].EXAMINATIONDATE.replace("T", " ");
						}	
					}
				})
			},
			
		}
	}
</script>

<style scoped>
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
	.container_list li{
		/* padding: 10px 16px; */
		height: auto;
		overflow: hidden;
		border-bottom: 1px solid #EEEEEE;
	}
	.container_list li:last-child{
		border-bottom: none;
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
