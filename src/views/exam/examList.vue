<template>
	<div>
		<vant-header :leftArrow="true" :titleType="1" title="考核测试" :rightType="2">
      <div slot='right_slot'>
        <p>搜索</p>
      </div>
		</vant-header>
	</div>
</template>

<script>
  import vantHeader from '@/components/layout/header.vue'
	import * as ajax from '@/utils/api'

  export default{
    components:{
      vantHeader
    },
    data() {
    	return{

      }
    },
    mounted() {
      this.getExamList()
    },
    methods:{
      getExamList() {
        ajax.get('/API/WebAPIDataAudit/GetPaper?IDcard='+this.$route.query.IDCard).then(res => {
         
        })
      }
    }
  }
</script>

<style>
</style>
