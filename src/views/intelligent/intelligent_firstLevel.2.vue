<template>
	<div class="study">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2"></vant-header>
		
		<div class="container overflow intelligent">
			<router-link to="/intelligent/engineering_a" replace tag="div" class="routerlink" style="color:#7099D0">全部工程</router-link>
			<router-link to="/intelligent/engineering_b" replace tag="div" class="routerlink" style="color:#999">正常工程</router-link>
			<router-link to="/intelligent/engineering_c" replace tag="div" class="routerlink" style="color:#C36363">超期工程</router-link>
			
		</div>
	    <router-view></router-view>
		<!-- <study-footer></study-footer> -->
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
				questionText: "进度详情",
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
	.engineering{
		width: 33.3%;
	}
	.container {
		padding-top: 46px;
		background: #fff;
	}


	
	
</style>
