<template>
  <div id="exam">
	  <index-header :leftArrow="true" :titleType="1" :title="questionText+`测试`" :rightType="2">
		  <div slot='right_slot'>
		    <p>搜索</p>
		  </div>
	  </index-header>
  </div>
</template>

<script>
  import indexHeader from '../components/header.vue';
  export default {
    name: 'exam',
    data () {
      return {
        // msg: 'Welcome to Your Vue.js App'
      }
    },
	components: {
		indexHeader
	},
  }
</script>

<style>
</style>
