<template>
	<div>
		<vant-header :leftArrow="false" :titleType="1" title="考核测试" :rightType="2">
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
        ajax.get('GetPaper?IDcard='+this.$route.query.IDCard).then(res => {
          console.log(res.data)
        })
      }
    }
  }
</script>

<style>
</style>
