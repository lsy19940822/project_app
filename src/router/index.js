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
		}
	]
})