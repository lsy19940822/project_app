<template>
  <div class="container">
    <!-- <HeadNav/> -->
    <div class="list-content">
      <div class="l-dropdown">
        <van-dropdown-menu>
          <van-dropdown-item v-model="quesType" :options="option2" @change="change2(quesType)"/>
          <van-dropdown-item v-model="state" :options="option1" @change="change1(state)"/>
        </van-dropdown-menu>
      </div>
      <div v-if='safeData.length==0'
           style="text-align: center;background: #ececec;line-height: 36px;color:#ddd;font-size: 16px;">暂无数据
      </div>
      <ul class="l-list" v-else>

        <li v-for="(item,index) in safeData" :key="index" :id="item.id" @click="getStatus(item.state,item.id)">
          <div class="item" :id="item.id">
            <h6 class="title" :id="item.id">{{item.quesDesc}}</h6>
            <div class="explain marginT12" :id="item.id">
              <van-row :id="item.id">
                <van-col span="16" :id="item.id">
                  <span class="color7099D0" :id="item.id">{{item.quesType|getqucsTypes}}</span>
                  <span class="colorAAA" :id="item.id">{{item.createTime}}</span>
                </van-col :id="item.id">
                <van-col span="8" align="right" :id="item.id">
                  <span class="color5082C6" :id="item.id">{{item.state | getStatusTxt}}</span>
                </van-col>
              </van-row>
            </div>
            <div class="intro marginT12 omit2" :id="item.id">{{item.quesDetail}}</div>
          </div>
        </li>
      </ul>

    </div>

  </div>
</template>

<script>
  import vantHeader from '@/components/header.vue'
  import Vue from 'vue';
  import * as ajax from '@/utils/api'
  import HeadNav from "./HeadNav"
  import {Row, Col, DropdownMenu, DropdownItem, Loading} from 'vant';

  Vue.use(Row).use(Col).use(DropdownMenu).use(DropdownItem).use(Loading);
  export default {
    data() {
      return {
        questionText: '我的问题',
        bid: 0,
        state: 0,
        option1: [
          {text: '全部状态', value: 0},
          {text: '待解决', value: 2},
          {text: '待抄送', value: 1},
          {text: '待审核', value: 3},
          {text: '驳回问题', value: 5},
          {text: '待复核', value: 6},
          {text: '退回问题', value: 7},
        ],
        option2: [
          {text: '全部问题', value: 0},
          {text: '安全问题', value: 1},
          {text: '质量问题', value: 2},
          {text: '进度问题', value: 3},

        ],
        isLoading: true,
        quesType: 0,//1.安全 2 质量 3 进度
        userId: this.$route.query.userId,
        succ: 2,
        page: 1,
        size: 10,
        safeData: [],
        msg: ''
      }
    },
    components: {
      vantHeader,
      HeadNav
    },
    mounted() {
      this.selectSafetyListS()
    },
    methods: {
      change1(val) {

        this.state = val
        this.selectSafetyListS()
      },
      change2(val) {

        this.quesType = val
        this.selectSafetyListS()
      },
      getStatus(sate, id) {
        if (sate == 1) {
          this.$router.push({path: '/LeaderProblemG?userId=' + this.$route.query.userId + '&id=' + id})
        }
        if (sate == 2) {
          this.$router.push({path: '/problemX?userId=' + this.$route.query.userId + '&id=' + id})
        }
        if (sate == 3) {
          this.$router.push({path: '/LeaderProblemS?userId=' + this.$route.query.userId + '&id=' + id})
        }
        if (sate == 5) {
          this.$router.push({path: '/LeaderProblemW?userId=' + this.$route.query.userId + '&id=' + id})
        }

        if (sate == 6) {
          this.$router.push({path: '/LeaderProblemY?userId=' + this.$route.query.userId + '&id=' + id})
        }
      },
      sumbit() {
        let type = sessionStorage.getItem("TYPES")
        if (type == 1) {
          this.$router.push({path: '/SubmitQuestions?userId=' + this.$route.query.userId})
        } else {
          Toast("你暂无发起权限")
        }
      },
      selectSafetyListS() {
        ajax.getW('/api/safety/selectSafetyList?userId=' + this.userId + '&state=' + this.state + '&bid=' + this.bid + '&quesType=' + this.quesType + '&succ=' + this.succ + '&page=' + this.page + '&size=' + this.size).then(res => {
          if (res.status == 200) {
            if (res.data.code == 200) {
              this.safeData = res.data.data.list;
            }
            if (res.data.code == null) {
              this.safeData = [];
            }
          }
        })

      },
    },
    filters: {
      getStatusTxt(id) {
        var str = "";
        switch (id) {
          case 1:
            str = "待抄送";//现场负责人
            break;
          case 2:
            str = "待解决";//相关人整改
            break;
          case 3:
            str = "待审核";//发起负责人审核
            break;
          case 4:
            str = "已解决";//流程结束
            break;
          case 5:
            str = "退回问题";//发起人修改
            break;
          case 6:
            str = "待复核";//负责人复核
            break;
          case 7:
            str = "退回问题";//整改人驳回
            break;
          default:
            str = "无状态";
            break;
        }
        return str;
      },
      //处理进行中
      getqucsTypes: function(pid) {
        var data = "";
        switch (pid) {
          case 1:
            data = "安全问题"; //现场负责人
            break;
          case 2:
            data = "质量问题"; //相关人整改
            break;
          case 3:
            data = "进度问题"; //发起负责人审核
            break;
          default:
            data = "无状态";
            break;
        }
        return data;
      }
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
  }

  .header-right {
    line-height: 5px;
    color: #fff;
    margin: 14px 0;
  }

  img {
    display: block;
    width: 100%;
    height: auto
  }

  .color666 {
    color: #666;
  }

  .omit {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .omit2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .marginT12 {
    margin-top: 12px;
  }

  .van-dropdown-menu {
    width: 90%;
    margin: 0 auto;
  }

  /deep/ .van-dropdown-menu .van-dropdown-menu__item:first-child {
    border-right: 1px solid #ccc;
    margin-right: 10px;
  }

  /deep/ .van-dropdown-menu .van-dropdown-menu__item {
    border: 1px solid #CCC;
    border-radius: 2px;
    background: #F9F9F9;
  }

  .list-content {
    background: #fff;
  }

  .l-dropdown {
    padding: 10px 0;
    background: #fff;
    border-bottom: 1px solid #ECECEC;
  }

  .list-content {
    margin-top: 10px;
  }

  .l-list {
    padding: 0 14px;
  }

  .l-list li {
    border-bottom: 1px solid #eee;
  }

  .title {
    font-size: 18px;
    color: #333;
    line-height: 24px;
  }

  .explain {
    font-size: 12px;
  }

  .intro {
    font-size: 16px;
    color: #666;
  }

  .item {
    padding: 14px 0;
  }

  .color7099D0 {
    color: #7099D0;
  }

  /*安全问题-蓝色*/
  .color7099D0 {
    color: #7099D0;
  }

  .colorAAA {
    color: #aaa;
  }

  .colorE19B52 {
    color: #E19B52;
  }

  /*待指派*/
  .color5082C6 {
    color: #5082C6
  }

  /*待解决*/
  .color7081B9 {
    color: #7081B9
  }

  /*带抄送*/
  .colorE6B36F {
    color: #E6B36F
  }

  /*质量问题*/
  .colorC86565 {
    color: #C86565
  }

  /*退回问题*/
  .color5268E1 {
    color: #5268E1;
  }

  /*待审核*/
  .color53904D {
    color: #53904D;
  }

  /*待复核*/
  .spinner {
    text-align: center;
    font-size: 14px;
    padding: 15px 0;
    color: #969799;
  }
</style>
