<template>
  <div id="HeadNav">
    <van-row class="HeadNav">
      <van-col span="6" @click="sumbit">
        <img src="../../assets/images/safeQuality/icon_issue.png" alt />
        <p >问题发起</p>
      </van-col>
      <van-col span="6">
		<router-link :to="'/HeadNav/leader_safeIssue?userId='+$route.query.userId" replace tag="div" class="routerLink">
			<img src="../../assets/images/safeQuality/icon_safe.png" alt class="img"/>
			<p>我的问题</p>
		</router-link>
      </van-col>
      <van-col span="6">
		  <router-link :to="'/HeadNav/leader_safeIssueZ?userId='+$route.query.userId" replace tag="div" class="routerLink">
			<img src="../../assets/images/safeQuality/icon_quality.png" alt class="img"/>
			<p>未解决</p>
		  </router-link>
      </van-col>
      <van-col span="6">
		  <router-link :to="'/HeadNav/leader_resolved?userId='+$route.query.userId" replace tag="div" class="routerLink">
			<img src="../../assets/images/safeQuality/icon_quality (2).png" alt class="img"/>
			<p>已解决</p>
		 </router-link>
      </van-col>
    </van-row>
	<router-view></router-view>
  </div>
</template>

<script>
	import vantHeader from '@/components/header.vue'
import * as ajax from "@/utils/api";
import Vue from "vue";
import {
  Row,
  Col,
  DropdownMenu,
  DropdownItem,
  Loading,
  Toast,
  Tabs,
  Tab
} from "vant";
Vue.use(Row).use(Col);
Vue.use(Tab).use(Tabs);
export default {
  name: "HeadNav",
  data() {
    return {
      ToId: "", //处理高亮问题
      type: "", //处理 权限
      questionText:'我的问题',
      active: 2,
	  num:0
    };
  },
  components: {
  	vantHeader,
  	
  },
  // props: ["type"],
  mounted() {
    let _this = this;
    ajax.getW("/api/safety/selectUserById?id=" + _this.$route.query.userId).then(res => {
        if (res.status == 200) {
          if (res.data.code == 200) {
            // this.type = res.data.data.info.TYPES;
            // console.log(res.data.data.info.TYPES);
            _this.ToId = res.data.data.info.userId;
            _this.type = res.data.data.info.TYPES;
            localStorage.setItem("TYPES", res.data.data.info.TYPES);
          }
        }
      });
  },
  methods: {
    //处理 跳转权限问题
    sumbit() {
      let _this = this;
      ajax.getW("/api/safety/selectUserById?id=" + this.$route.query.userId).then(res => {
          if (res.status == 200) {
            if (res.data.code == 200) {
              _this.ToId = res.data.data.info.userId;
              localStorage.setItem("TYPES", res.data.data.info.TYPES);
              if (res.data.data.info.TYPES == 1) {
                _this.$router.push({
                  path: "/SubmitQuestions?userId=" +_this.$route.query.userId +"&type=" +res.data.data.info.TYPES
                });
              } else {
                Toast("你暂无发起权限");
              }
            }
          }
        });
    }
    // 处理高亮问题
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.router-link-active{
	/* margin: 0 auto; */
}
#HeadNav {
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  position: fixed;
  top: 0;
  right:0;
  left:0;
  z-index: 10;
}
img {
  width: 26px;
  height: 28px;
  display: block;
  margin: 0 auto;
}
p {
  width: 70px;
  height: 30px;
  margin-top: 5px;
  text-align: center;
  margin: 0 auto;
}
#HeadNav .routerLink{
	width: 100% !important;
	display: block;
}
.active {
  border-bottom: 3px solid #6495ed;
}
.HeadNav{
	padding: 20px 0 10px;
}
</style>