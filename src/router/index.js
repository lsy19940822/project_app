import Vue from 'vue';
import Router from 'vue-router';


<<<<<<< HEAD
export default new Router({
	routes: [{
			path: '/',
			name: 'login',
			component: Login
		},
		{
			path: '/examList',
			name: 'examList',
			component: ExamList
		},
		{
			path: '/examItem',
			name: 'examItem',
			component: ExamItem
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
			path:'/questionDetail',
			name:'questionDetail',
			component: resolve => require(['../views/exam/questionDetail.vue'], resolve)
		}
	]
})
=======
Vue.use(Router)
//创建路有实例并配置路由映射
const router = new Router({
  routes:[
	{
	    path:"/",
	    component:resolve => require(["../components/header.vue"], resolve),
	    redirect: '/login',//默认选中
	},
	{
	  	path: '/login',
		name:'login',
	  	component: resolve => require(['../components/login.vue'], resolve)
	},
	{
	  path:"/examItem",
	  name:'examItem',
	  component:resolve => require(["../components/examItem.vue"], resolve),
	},
	{
	  path:"/footer",
	  name:'footer',
	  component:resolve => require(["../components/footer.vue"], resolve),
	}
  ]
})
// 输出router
export default router;
>>>>>>> 55d294a123c7087c0e63cdf0960c1fb2864335af
