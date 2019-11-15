<template>
	<div class="container">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2">
		</vant-header>
		<div class="view">
			<router-link :to="'/Intelligence/labor?ValueId='+localStorage" replace tag="div" class="routerlink">劳务统计</router-link>
			<router-link  to="/Intelligence/personnel"  replace tag="div" class="routerlink">员工详情</router-link>
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
				localStorage:localStorage.getItem('labor_value_id')
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
