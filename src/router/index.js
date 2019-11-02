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
		path:'/study',
		name:'study',
		component: resolve => require(['../views/study.vue'], resolve),
		// redirect: '/study',//默认选中
	},
	{
		path:'/function',
		name:'function',
		component: resolve => require(['../views/function.vue'], resolve),
		// redirect: '/study',//默认选中
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
	  path:"/studyFooter",
	  name:'studyFooter',
	  component:resolve => require(["../components/studyFooter.vue"], resolve),
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
	{//领导二级页面
		path:'/staff_safeQualityList',
		name:'staff_safeQualityList',
		component: resolve => require(['../views/staff/staff_safeQualityList.vue'], resolve)
	},
	{
		path:'/staffUser',
		name:'staffUser',
		component: resolve => require(['../views/staff/staffUser.vue'], resolve)
	},
	{
		path:'/leadershipUser',
		name:'leadershipUser',
		component: resolve => require(['../views/leader/leadershipUser.vue'], resolve)
	},
	{
		path:'/studyrecord',
		name:'studyrecord',
		component: resolve => require(['../views/staff/studyrecord.vue'], resolve),
	},
	{//领导二级页面-安全问题
		path:'/leader_safeIssue',
		name:'leader_safeIssue',
		component: resolve => require(['../views/leader/leader_safeIssue.vue'], resolve)
	},
	{
		path:'/leader_resolved',
		name:'leader_resolved',
		component: resolve => require(['../views/leader/leader_resolved.vue'], resolve)
	},
	{
		path:'/leader_poseProblem',
		name:'leader_poseProblem',
		component: resolve => require(['../views/leader/leader_poseProblem.vue'], resolve)
	},
	{
		path:'/studyCenter',
		name:'studyCenter',
		component: resolve => require(['../views/staff/studyCenter.vue'], resolve)
	},
	{
		path:'/studyCenterS',
		name:'studyCenterS',
		component: resolve => require(['../views/staff/studyCenterS.vue'], resolve)
	},
	{
		path:'/leaderNew',
		name:'leaderNew',
		component: resolve => require(['../views/leader/leaderNew.vue'], resolve)
	},
	{
		path:'/staffNew',
		name:'staffNew',
		component: resolve => require(['../views/staff/staffNew.vue'], resolve)
	},
	{
		path:'/Intelligence',
		name:'Intelligence',
		component: resolve => require(['../views/leader/Intelligence.vue'], resolve)
		
	},
	{
		path:'/information',
		name:'information',
		component: resolve => require(['../views/leader/information.vue'], resolve)
		
	},
	{//员工我的资料
		path:'/staff_information',
		name:'staff_information',
		component: resolve => require(['../views/staff/staff_information.vue'], resolve)
		
	},
	{//问题详情--未解决
		path:'/problemW',
		name:'problemW',
		component: resolve => require(['../views/staff/problemW.vue'], resolve)
		
	},
	{//问题详情--未解决--修改
		path:'/problemX',
		name:'problemX',
		component: resolve => require(['../views/staff/problemX.vue'], resolve)
		
	},
	{//超期工程
		path:'/BeyondThe',
		name:'BeyondThe',
		component: resolve => require(['../views/leader/BeyondThe.vue'], resolve)
	},
	{//
		path:'/fillA',
		name:'fillA',
		component: resolve => require(['../views/leader/fillA.vue'], resolve)
	},
	{//
		path:'/fillB',
		name:'fillB',
		component: resolve => require(['../views/leader/fillB.vue'], resolve)
	},
	{//
		path:'/fillC',
		name:'fillC',
		component: resolve => require(['../views/leader/fillC.vue'], resolve)
	},
	{//
		path:'/fillD',
		name:'fillD',
		component: resolve => require(['../views/leader/fillD.vue'], resolve)
	},
	{//负责人填报
		path:'/fill',
		name:'fill',
		component: resolve => require(['../views/leader/fill.vue'], resolve)
	},
	{//填报详情
		path:'/fillX',
		name:'fillX',
		component: resolve => require(['../views/leader/fillX.vue'], resolve)
	},
	{//问题动态
		path:'/dynamic',
		name:'dynamic',
		component: resolve => require(['../views/leader/dynamic.vue'], resolve)
	},
	{//智能进度
		path:'/intelligent',
		name:'intelligent',
		component: resolve => require(['../views/leader/intelligent.vue'], resolve)
	},
	{//领导-安全质量-问题详情-复核
		path:'/LeaderProblemW',
		name:'LeaderProblemW',
		component: resolve => require(['../views/leader/LeaderProblemW.vue'], resolve)
	},
	{//智能监控
		path:'/monitoring',
		name:'monitoring',
		component: resolve => require(['../views/leader/monitoring.vue'], resolve)
	}
  ]
})
// 输出router
export default router;
