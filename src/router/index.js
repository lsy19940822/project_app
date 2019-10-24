import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import ExamList from '@/views/exam/examList'
import ExamItem from '@/views/exam/examItem'

Vue.use(Router)

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