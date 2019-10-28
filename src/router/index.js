import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router)
//创建路有实例并配置路由映射
const router = new Router({
  routes:[
	{
		path:"/",
		component:resolve => require(["../components/header.vue"], resolve),
		redirect: '/index',//默认选中
	},
	{
	    path:"/index",
		name:'index',
	    component:resolve => require(["../views/index.vue"], resolve),
	},
	{
	  	path: '/login',
		name:'login',
	  	component: resolve => require(['../components/login.vue'], resolve),
	},
	{
	  path:"/footer",
	  name:'footer',
	  component:resolve => require(["../components/footer.vue"], resolve),
	},
	{
	  path:"/onlineExamFooter",
	  name:'onlineExamFooter',
	  component:resolve => require(["../components/onlineExamFooter.vue"], resolve),
	},
	{
		path:'/gradeIssue',
		name:'gradeIssue',
		component: resolve => require(['../views/exam/gradeIssue.vue'], resolve)
	},
	{
		path:'/gradeIssueDetail',
		name:'gradeIssueDetail',
		component: resolve => require(['../views/exam/gradeIssueDetail.vue'], resolve)
	},
	{
		path:'/examItem',
		name:'examItem',
		component: resolve => require(['../views/exam/examItem.vue'], resolve)
	},
	{
		path:'/questionDetail',
		name:'questionDetail',
		component: resolve => require(['../views/exam/questionDetail.vue'], resolve)
	},
	{
		path:'/examrecord',
		name:'examrecord',
		component: resolve => require(['../views/exam/examrecord.vue'], resolve)
	},
	{
		path:'/leader_safeQualityList',
		name:'leader_safeQualityList',
		component: resolve => require(['../views/leader/leader_safeQualityList.vue'], resolve)
	},
	{
		path:'/staff_safeQualityList',
		name:'staff_safeQualityList',
		component: resolve => require(['../views/staff/staff_safeQualityList.vue'], resolve)
	}
  ]
})
// 输出router
export default router;
