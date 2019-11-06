<template>
	<div class="container">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2">
			<<!-- div slot='right_slot'>
				<p class="header-right"><van-icon name="search" /></p>
			</div> -->
		</vant-header>
		<div class="view">
			<router-link to="/Intelligence/labor" tag="div" class="routerlink">劳务统计</router-link>
			<router-link to="/Intelligence/personnel"  tag="div" class="routerlink">员工详情</router-link>
			<router-view></router-view>
		</div>
	</div>
	
</template>

<script>
	import vantHeader from '@/components/header.vue'
	export default {
		components: {
			vantHeader,
		},
		data() {
			return {
				questionText:"智能劳务",
				
			}
		},
		created() {
			
		},
		mounted() {
			
		},
		computed:{
			
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.container{
	    padding-top: 46px;
	}
</style>
