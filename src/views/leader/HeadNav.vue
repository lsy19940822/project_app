<template>
  <div id="HeadNav">
    <!-- <van-tabs v-model="active">
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs> -->

    <van-row>

		
		<!-- <router-link to="/machinePositioning/car?ValueId=0" replace tag="div" class="routerlink">车辆定位</router-link> -->
      <van-col span="6" @click="sumbit">
        <img src="../../assets/images/safeQuality/icon_issue.png" alt />
        <p >问题发起</p>
      </van-col>
      <van-col span="6">
		<router-link :to="'/HeadNav/leader_safeIssue?userId='+$route.query.userId" replace tag="div">
			<img src="../../assets/images/safeQuality/icon_safe.png" alt />
			<p>我的问题</p>
		</router-link>
      </van-col>
      <van-col span="6">
		  <router-link :to="{path:'/HeadNav/leader_safeIssueZ?userId='+$route.query.userId}" replace tag="div">
			<img src="../../assets/images/safeQuality/icon_quality.png" alt />
			<p>未解决</p>
		  </router-link>
      </van-col>
      <van-col span="6">
		  <router-link :to="'/HeadNav/leader_resolved?userId='+$route.query.userId" replace tag="div">
			<img src="../../assets/images/safeQuality/icon_quality.png" alt />
			<p>已解决</p>
		 </router-link>
      </van-col>
    </van-row>
	<router-view></router-view>
  </div>
</template>

<script>
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
     
      active: 2,
	  num:0
    };
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
    // clickto2() {
    //   this.$router.push({
    //     path: "/leader_safeIssue?userId=" + this.$route.query.userId
    //   });
    // },
    // clickto3() {
    //   this.$router.push({
    //     path: "/leader_safeIssueZ?userId=" + this.$route.query.userId
    //   });
    // },
    // clickto4() {
    //   this.$router.push({
    //     path: "/leader_resolved?userId=" + this.$route.query.userId
    //   });
    // },
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
	margin: 0 auto;
}
#HeadNav {
  width: 100%;
  height: 96px;
  padding: 20px 0;
  box-sizing: border-box;
  text-align: center;
  background: #fff;
}
img {
  width: 26px;
  height: 28px;
}
p {
  width: 70px;
  height: 30px;
  margin-top: 5px;
  margin: 0 auto;
}
.active {
  border-bottom: 3px solid #6495ed;
}
</style>