<template>
	<div class="container">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType='2' >
		</vant-header>
	</div>
</template>

<script>
	import vantHeader from '@/components/header.vue'
	import Vue from 'vue';
	import { Row, Col, DropdownMenu, DropdownItem, Loading } from 'vant';
	Vue.use(Row).use(Col).use(DropdownMenu).use(DropdownItem).use(Loading);
	export default {
		data(){
			return{
				questionText:'提交问题'
			}
		},
		components:{
			vantHeader
		}
	}
</script>

<style scoped>
/*commom*/
*{margin:0;}
.header-right {line-height: 5px;color:#fff;margin: 14px 0;}
img{display: block;width:100%;height:auto}
.color666{color:#666;}
.omit {overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.omit2{display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}
.marginT12{margin-top:12px;}
.container{padding-top:46px;}
</style>