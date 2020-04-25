<template>
	<div>
		

  <div class="container">
    <!-- <HeadNav/> -->
    <div class="list-content">
      <div class="l-dropdown">
        <van-dropdown-menu>
          <van-dropdown-item v-model="bid" :options="option2" @change="change2(bid)"/>
          <van-dropdown-item v-model="state" :options="option1" @change="change1(state)"/>
        </van-dropdown-menu>
      </div>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <div v-if='safeData.length==0' style="text-align: center;background: #ececec;line-height: 36px;color:#ddd;font-size: 16px;">暂无数据 </div>
      <template v-else>
      		
      <ul class="l-list">
		  <van-list
		  v-model="loading"
		    :finished="finished"
		    finished-text="- 没有更多了 -"
		    :immediate-check="false"
		    @load="onLoad"
		     :offset="120">
        <li
          v-for="(item,index) in safeData"
          :key="index"
          :id="item.id"
          @click="getStatus(item.state,item.id)"
        >
          <div>
            <!-- 标题 -->
            <div class="Title_fontSize">
              <van-row>
                <van-col span="20">标题:{{item.quesDesc}} -{{index}}</van-col>
                <van-col v-if="item.state!==4" span="4" class="font_color">进行中</van-col>
                <van-col v-else span="4" class="font_color">流转成功</van-col>
              </van-row>
            </div>
            <!-- 内容 -->
            <div class="text_p_highly">
              <div class="falx_Layout_img"></div>
              <div class="falx_Layout_text">
                <p>当前节点:{{item.state|getStatusTxt}}</p>
                <p>当前负责人:{{item.solvePeopleName}}</p>
                <p>
                  <span class="head_block1">提出人:{{item.putName}}</span>
                  <span class="head_block">{{item.quesType|getqucsTypes}}</span>
                </p>
              </div>
            </div>
          </div>
        </li>
		</van-list>
      </ul>
	  
	  		
	  	  </template>
	       
	  </van-pull-refresh>
    </div>
  </div>
		</div>
</template>

<script>
  import vantHeader from "@/components/header.vue";
  import Vue from "vue";
  import * as ajax from "@/utils/api";
  import HeadNav from "./HeadNav"
  import {Row, Col, DropdownMenu, DropdownItem, Loading, Divider} from "vant";
import { PullRefresh,List } from 'vant';
  Vue.use(PullRefresh).use(List);
  Vue.use(Row)
    .use(Col)
    .use(DropdownMenu)
    .use(DropdownItem)
    .use(Loading)
    .use(Divider);
  export default {
    data() {
      return {
        questionText: "我的问题",
        option1: [
          {text: "全部状态", value: 0},
          {text: "待解决", value: 2},
          {text: "待抄送", value: 1},
          {text: "待审核", value: 3},
          {text: "驳回问题", value: 5},
          {text: "待复核", value: 6},
          {text: "退回问题", value: 7}
        ],
        option2: [
          {text: "全部问题", value: 0},
          {text: "安全问题", value: 1},
          {text: "质量问题", value: 2},
          {text: "进度问题", value: 3}
        ],
        quesType: 0, //1.安全 2 质量 3 进度
        userId: this.$route.query.userId,
        succ: 2, //1已解决 2待解决
        page: 1,
        size: 10,
		total:0,
        safeData: [],
        bid: 0,
        state: 0,
		loading: false, // 当loading为true时，转圈圈
		finished: false, // 数据是否请求结束，结束会先显示- 没有更多了 -
	refreshing: false
	
      };
    },
    components: {
      vantHeader,
      HeadNav
    },
    mounted() {
      this.selectSafetyListS();
    },
    methods: {
      change1(val) {
        this.state = val;
        this.selectSafetyListS();
      },
      change2(val) {
        this.bid = val;
        this.selectSafetyListS();
      },
      getStatus(sate, id) {
        this.$router.push({
          path:
            "/LeaderProblemG?userId=" + this.$route.query.userId + "&id=" + id
        });
      },
	  selectSafetyListS() {
		var that = this;
	    ajax.getW('/api/safety/selectInitiatedList?userId=' + this.userId + '&state=' + this.state + '&bid=' + this.bid + '&quesType=' + this.quesType + '&succ=' + this.succ + '&page=' + this.page + '&size=' + this.size).then(res => {
	      if (res.status == 200) {
	        if (res.data.code == 200) {
				this.loading = false
				this.total =  res.data.data.total
				var list=res.data.data.list;
				this.safeData = this.safeData.concat(list);
				
				  if (this.safeData.length === 0) {
					this.finished = true
				  }
	  		
	        }
	        if (res.data.code == null) {
	          this.safeData = [];
	   
	        }
	      }
	    })
	  },
	  // 列表加载
	 onLoad () {
		if(this.total<10){
						this.finished = false;
						this.loading = false		  
		}else{
						 setTimeout(() => {	 
							if(this.page == Math.round(this.total/this.size)){
								this.page = Math.round(this.total/this.size)
								this.finished = true;
								this.loading = false
							}else{
								console.log(this.page,this.safeData.length,this.total,Math.round(this.total/this.size))
								this.page++;
								this.finished = false;
								this.loading = true
							  this.selectSafetyListS();
							}
						 }, 1000)
		}	
			  
			   
			 //  console.log("122222")
			 //  this.selectSafetyListS()
			 //  this.loading = true
			 
			  
	  },
	      onRefresh () {
			  setTimeout(() => {
				  this.refreshing = false
				  
				  this.loading = false
				  this.finished = false
			  	this.safeData = []
			  	this.page = 1;
			  	 this.selectSafetyListS()
			  }, 1000)
	      }
    },
	
    filters: {
      //处理当前节点
      getStatusTxt: function (id) {
        var str = "";
        switch (id) {
          case 1:
            str = "待抄送"; //现场负责人
            break;
          case 2:
            str = "待解决"; //相关人整改
            break;
          case 3:
            str = "待审核"; //发起负责人审核
            break;
          case 4:
            str = "流程结束"; //流程结束
            break;
          case 5:
            str = "退回问题"; //发起人修改
            break;
          case 6:
            str = "待复核"; //负责人复核
            break;
          case 7:
            str = "退回问题"; //整改人驳回
            break;
          default:
            str = "无状态";
            break;
        }
        return str;
      },
      //处理进行中
      getqucsTypes: function (pid) {
        var data = "";
        switch (pid) {
          case 1:
            data = "安全"; //现场负责人
            break;
          case 2:
            data = "质量"; //相关人整改
            break;
          case 3:
            data = "进度"; //发起负责人审核
            break;
          default:
            data = "无状态";
            break;
        }
        return data;
      }
    }
  };
</script>

<style scoped>
  * {
    margin: 0;
  }
  img {
    display: block;
    width: 100%;
    height: auto;
  }

  .list-content {
    margin-top: 10px;
  }

  .l-list {
    width: 98%;
    margin: 0 auto;
    font-size: 12px;
    margin-top: 10px;
	height: 650px;
	overflow: auto;
  }

  .l-list li {
    border-bottom: 1px solid #eee;
    background: #fff;
    width: 100%;
    margin: 0 auto;
    height: 120px;
    margin-top: 10px;
  }

  /* .intro {
    font-size: 16px;
    color: #666;
  }
  .item {
    padding: 14px 0;
    font-size: 12px;
  }
  .color7099D0 {
    color: #7099d0;
  }  */
  /*安全问题-蓝色*/

  .head_block {
    display: inline-block;
    width: 148px;
    text-align: right;
  }

  .head_block1 {
    display: inline-block;
    width: 150px;
    text-align: left;
  }

  .text_p_highly {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    display: flex;
  }

  .Title_fontSize {
    padding-left: 10px;
    width: 100%;
    height: 30px;
    background: #dcdcdc;
    line-height: 30px;
  }

  .falx_Layout_img {
    padding-right: 10px;
    box-sizing: border-box;
    flex: 1;
  }

  .falx_Layout_text {
    flex: 9;
  }

  .font_color {
    color: #1e90ff;
  }

</style>
