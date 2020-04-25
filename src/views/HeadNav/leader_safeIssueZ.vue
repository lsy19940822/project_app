<template>
	<div>


  <div class="container">
    <!-- <HeadNav/> -->
	<div class="l-dropdown" style="border-bottom: 1px solid #ddd;">
	  <van-dropdown-menu>
	    <van-dropdown-item v-model="bid" :options="option2" @change="change2(bid)"/>
	    <van-dropdown-item v-model="state" :options="option1" @change="change1(state)"/>
	  </van-dropdown-menu>
	</div>
    <div class="list-content">
	  <!-- <van-pull-refresh  v-model="refreshing" @refresh="onRefresh" :disabled="disabled"> -->
      <div v-if='safeData.length==0' style="text-align: center;background: #ececec;line-height: 36px;color:#ddd;font-size: 16px;">暂无数据 </div>


		  <ul class="l-list"  v-else :style="'height:'+fullHeight+'px'">
			 <!-- <van-list
			  v-model="loading"
			    :finished="finished"
			    finished-text="- 没有更多了 -"
			    :immediate-check="false"
			    @load="onLoad"
			     :offset="10"> -->
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
			  <div style="padding: 15px 0; text-align: center;font-size: 14px;color:#ddd;">- 没有更多了 -</div>
			  <!-- </van-list> -->
		  </ul>


<!-- </van-pull-refresh> -->
    </div>

  </div>
		</div>
</template>

<script>
  import vantHeader from '@/components/header.vue'
  import Vue from 'vue';
  import * as ajax from '@/utils/api'
  import HeadNav from "./HeadNav"
  import { PullRefresh,List } from 'vant';
  Vue.use(PullRefresh).use(List);
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
        quesType: 0,//1.安全 2 质量 3 进度
        userId: this.$route.query.userId,
        succ: 2,
        page: 1,
        size: 100,
        safeData: [],
		list:[],
        msg: '',
		loading: false, // 当loading为true时，转圈圈
		finished: false, // 数据是否请求结束，结束会先显示- 没有更多了 -
		refreshing: false,
		disabled:false,
		fullHeight:document.documentElement.clientHeight-146,
      }
    },
	watch:{
		fullHeight(val){//监控浏览器高度变化
			if(!this.timer){
				this.fullHeight = val
				this.timer=true
				var that=this
				setTimeout(function(){//防止过度调用检测时件，导致卡顿
					this.timer = false
				},400)
			}
		}
	},
    components: {
      vantHeader,
      HeadNav
    },
	// computed: {
	// 	reverseData() {
	// 		return this.safeData.reverse();
	// 	}
	// },
    mounted() {
      this.selectSafetyListS()
	  this.bodyHeight()
	  // let winHeight = document.documentElement.clientHeight                          //视口大小
	  // document.getElementById('list-content').style.height = (winHeight - 46) +'px'  //调整上拉加载框高度
    },
    methods: {
	bodyHeight(){
	  var that = this;
	  window.onresize = ()=>{
		return (() => {
			window.fullHeight = document.documentElement.clientHeight
			that.fullHeight = window.fullHeight-146
		})()
	  }
	},
     change1(val) {
     		// this.safeData = this.safeData.concat(this.safeData);
       this.state = val;
	   this.safeData=[]
       this.selectSafetyListS();
     },
     change2(val) {
		 	// this.safeData = this.safeData.concat(this.safeData);
       this.bid = val;
       this.safeData=[]
       this.selectSafetyListS();
     },

      getStatus(sate, id) {
        if(sate == 1 || sate == 7){
        	this.$router.push({path:'/LeaderProblemQ?userId='+this.$route.query.userId+'&id='+id+'&type='+localStorage.getItem("TYPES")})
        }
        if(sate == 2){
        	this.$router.push({path:'/problemX?userId='+this.$route.query.userId+'&id='+id+'&type='+localStorage.getItem("TYPES")})
        }
        if(sate == 3){
        	this.$router.push({path:'/LeaderProblemS?userId='+this.$route.query.userId+'&id='+id+'&type='+localStorage.getItem("TYPES")})
        }
        if(sate == 5){
        	this.$router.push({path:'/problemXG?userId='+this.$route.query.userId+'&id='+id+'&type='+localStorage.getItem("TYPES")})
        }

        if(sate == 6){
        	this.$router.push({path:'/LeaderProblemY?userId='+this.$route.query.userId+'&id='+id+'&type='+localStorage.getItem("TYPES")})
        }
      },

      selectSafetyListS() {
        ajax.getW('/api/safety/selectSafetyList?userId=' + this.userId +
		'&state=' + this.state + '&bid=' + this.bid + '&quesType=' +
		 this.bid + '&succ=' + this.succ +
		 '&page=' + this.page + '&size=' + this.size).then(res => {
          if (res.status == 200) {
            if (res.data.code == 200) {
				this.loading = false
				this.total =  res.data.data.total
				this.safeData = res.data.data;
				// this.safeData = this.safeData.concat(that);
				// if(this.safeData.length == this.total){
				// 	this.disabled=true
				// }else{
				// 	this.disabled=false
				// }
				 //  if (this.safeData.length === 0) {
					// this.finished = true
				 //  }
            }
            if (res.data.code == null) {
              this.safeData = [];

            }
          }
        })

      },
	   // 列表加载
	   // onLoad () {
	   // 		if(this.total<10){
	   // 			this.finished = false;
	   // 			this.loading = false
	   // 		}else{
	   // 		 setTimeout(() => {
	   // 			if(this.safeData.length == this.total){
	   // 				this.size = this.safeData.length
	   // 				this.finished = true;
	   // 				this.loading = false
	   // 			}else{

	   // 				if(this.safeData.length%2==1){
	   // 					this.page = Math.round(this.total/this.size)+1
	   // 				}else{
	   // 					this.page++;
	   // 					this.finished = false;
	   // 					this.loading = true
	   // 					this.selectSafetyListS();
	   // 			    }
	   // 				// console.log(this.page,this.safeData.length,this.total,Math.round(this.total/this.size))

	   // 			}
	   // 		 }, 1000)
	   // 		}

	   //  },
	   //      onRefresh () {
	   // 			  setTimeout(() => {
	   // 				this.refreshing = false
	   // 				this.loading = false
	   // 				this.finished = false
	   // 				this.safeData = [];
	   // 				this.page=1;
	   // 				this.selectSafetyListS()

	   // 			  }, 1000)
	   //      }

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
  }
</script>

<style scoped>
	.list-content{
	    margin-top: 10px;
	}
	.l-dropdown{
		position: fixed;
		top: 96px;
		left: 0;
		right:0;
		z-index: 10;
	}
	.list-content{
	margin-top: 50px;
	}
	.l-list {
	padding: 0 14px;
	height: 400px;
	overflow: auto;
	margin-bottom: 50px;
	}

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



  .list-content {
    background: #fff;
  }

  .l-dropdown {
	  width:100%;
    background: #fff;
    border-bottom: 1px solid #ECECEC;
	height: 50px;
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
