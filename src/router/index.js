import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router)
//创建路有实例并配置路由映射
const router = new Router({
  routes:[
	{
		path:"/",
		component:resolve => require(["../components/header.vue"], resolve),
		redirect: '/index',//默认选中--首页
	},
	{
	  	path: '/login',//登录
		name:'login',
	  	component: resolve => require(['../components/login.vue'], resolve),
	},
	{
	  	path: '/examLogin',//考試登录
		name:'examLogin',
	  	component: resolve => require(['../components/examLogin.vue'], resolve),
	},
	{
	    path:"/index",//首页
		name:'index',
	    component:resolve => require(["../views/index.vue"], resolve),
	},
	{
		path:'/study',//学习
		name:'study',
		component: resolve => require(['../views/study.vue'], resolve),
	},
	//智能进度模块
	{
		path:'/intelligent',
		name:'intelligent',
		component: resolve => require(['../views/intelligent/intelligent.vue'], resolve)
	},
	{//一级列表
		path:'/fillD',
		name:'fillD',
		component: resolve => require(['../views/intelligent/fillD.vue'], resolve)
	},
	{//超期工程
		path:'/BeyondThe',
		name:'BeyondThe',
		component: resolve => require(['../views/intelligent/BeyondThe.vue'], resolve)
	},
	{//二级列表
		path:'/fillB',
		name:'fillB',
		component: resolve => require(['../views/intelligent/fillB.vue'], resolve)
	},
	{//三级列表
		path:'/fillC',
		name:'fillC',
		component: resolve => require(['../views/intelligent/fillC.vue'], resolve)
	},
	{//四级列表
		path:'/fillA',
		name:'fillA',
		component: resolve => require(['../views/intelligent/fillA.vue'], resolve)
	},
	{//负责人填报
		path:'/fill',
		name:'fill',
		component: resolve => require(['../views/intelligent/fill.vue'], resolve)
	},
	{//填报详情
		path:'/fillX',
		name:'fillX',
		component: resolve => require(['../views/intelligent/fillX.vue'], resolve)
	},
	//考试模块
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
	// 智能劳务
	{
		path:'/Intelligence',
		name:'Intelligence',
		component: resolve => require(['../views/Intelligence/Intelligence.vue'], resolve),
	    redirect: '/Intelligence/labor',//默认选中
	    children: [
	      {
	        path:"labor",
	        component:resolve => require(["../views/Intelligence/labor.vue"], resolve),
	    
	      },
	      {
	        path:"personnel",
	        component:resolve => require(["../views/Intelligence/personnel.vue"], resolve)
	      }] 
	},
	{
		path:'/information',
		name:'information',
		component: resolve => require(['../views/Intelligence/information.vue'], resolve)
	},
	{//人机定位
		path:'/machinePositioning',
		name:'machinePositioning',
		component: resolve => require(['../views/machinePositioning/machinePositioning.vue'], resolve),
        redirect: '/machinePositioning/manchine',//默认选中
		children: [
          {
            path:"manchine",
            component:resolve => require(["../views/machinePositioning/manchine.vue"], resolve),
        
          },
          {
            path:"car",
            component:resolve => require(["../views/machinePositioning/car.vue"], resolve)
          }] 	
	},
	{//人机定位-员工性情
		path:'/machinePositioning_X',
		name:'machinePositioning_X',
		component: resolve => require(['../views/machinePositioning/man/machinePositioning_X.vue'], resolve)
	},
	{//人机定位-安全范围
		path:'/machinePositioning_AQ',
		name:'machinePositioning_AQ',
		component: resolve => require(['../views/machinePositioning/man/machinePositioning_AQ.vue'], resolve)
	},
	{//人机定位-活动轨迹
		path:'/machinePositioning_GJ',
		name:'machinePositioning_GJ',
		component: resolve => require(['../views/machinePositioning/man/machinePositioning_GJ.vue'], resolve)
	},
	{//人机定位-员工性情
		path:'/machinePositioning_carX',
		name:'machinePositioning_carX',
		component: resolve => require(['../views/machinePositioning/car/machinePositioning_carX.vue'], resolve)
	},
	{//人机定位-员工性情
		path:'/car/informationCar',
		name:'informationCar',
		component: resolve => require(['../views/machinePositioning/car/informationCar.vue'], resolve)
	},
	{//人机定位-安全范围
		path:'/car/machinePositioning_AQ',
		name:'machinePositioning_AQ',
		component: resolve => require(['../views/machinePositioning/car/machinePositioning_AQ.vue'], resolve)
	},
	{//人机定位-活动轨迹
		path:'/car/machinePositioning_GJ',
		name:'machinePositioning_GJ',
		component: resolve => require(['../views/machinePositioning/car/machinePositioning_GJ.vue'], resolve)
	},
	{//智能监控
		path:'/monitoring',
		name:'monitoring',
		component: resolve => require(['../views/monitoring/monitoring.vue'], resolve)
	},
	{//智能监控-视频监控
		path:'/monitoring_list',
		name:'monitoring_list',
		component: resolve => require(['../views/monitoring/monitoring_list.vue'], resolve)
	},
	{//智能监控-能耗监控
		path:'/monitoring_list_N',
		name:'monitoring_list_N',
		component: resolve => require(['../views/monitoring/monitoring_list_N.vue'], resolve)
	},
	{//智能监控-无人机
		path:'/monitoring_list_W',
		name:'monitoring_list_W',
		component: resolve => require(['../views/monitoring/monitoring_list_W.vue'], resolve)
	},
	{//智能监控-能耗监控
		path:'/monitoring_list_X',
		name:'monitoring_list_X',
		component: resolve => require(['../views/monitoring/monitoring_list_X.vue'], resolve)
	},
	{//功能
		path:'/function',
		name:'function',
		component: resolve => require(['../views/function.vue'], resolve),
		// redirect: '/study',//默认选中
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
	
	
	

	
	
	
	{//问题动态
		path:'/dynamic',
		name:'dynamic',
		component: resolve => require(['../views/leader/dynamic.vue'], resolve)
	},
	
	{//领导-安全质量-问题详情-复核
		path:'/LeaderProblemW',
		name:'LeaderProblemW',
		component: resolve => require(['../views/leader/LeaderProblemW.vue'], resolve)
	},
	
	{//领导-安全质量-问题提交
		path:'/SubmitQuestions',
		name:'SubmitQuestions',
		component: resolve => require(['../views/leader/SubmitQuestions.vue'], resolve)
	},
	{//指派负责人
		path:'/IntelligenceHead',
		name:'IntelligenceHead',
		component: resolve => require(['../views/leader/IntelligenceHead.vue'], resolve)
	}
	
	
	
	
  ]
})
// 输出router
export default router;
