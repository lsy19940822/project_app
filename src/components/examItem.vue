<template>
  <div id="exam">
	  <index-header :leftArrow="true" :titleType="1" class="header" :title="questionText+`测试`" :rightType="2">
		  <div slot='right_slot' class="right_slot">
		    <p>{{current+1}}/{{questionList.length}}</p>
		  </div>
	  </index-header>
	  <div class="question-container" v-if="questionCurrent.TMLX  == '单选'">
	    <h4>单选题</h4>
	    <div class="question-title">
	      <p>{{current+1}}.{{questionCurrent.TIGAN }}</p>
		  <van-radio-group v-model="radioChoose">
		    <van-radio v-for="(itemR,index) in answerList" :key="index" :name="itemR" class="items" :class="{'activeradio': radioChoose.indexOf(itemR) != -1}"><span class='chooseIndex'>{{index+1 | chooseIndex}}</span><span class="title_t">{{itemR}}</span></van-radio>
		  </van-radio-group>
	    </div>
	  </div>
	  <div class="question-container" v-if="questionCurrent.TMLX  == '多选'">
	    <h4>多选题</h4>
	    <div class="question-title">
	      <p >{{current+1}}.{{questionCurrent.TIGAN }}</p>
	      <van-checkbox-group v-model="checkboxChoose">
	      	<van-checkbox v-for="(item,index) in answerList" :key="index" :name="item" class="items" :class="{'active': checkboxChoose.indexOf(item) != -1}"><span class='chooseIndex'>{{index+1 | chooseIndex}}</span><span class="title_t">{{item}}</span></van-checkbox>
	      </van-checkbox-group>
	    </div>
	  </div>
	  <div class="question-btn">
	    <van-button class="buttonPreNone" :class="{none: preNone}" @click="pre()">上一题</van-button>
	    <van-button class="buttonnextNone" :class="{none: nextNone}" @click="next()">下一题</van-button>
	  </div>
	  <exam-footer></exam-footer>
  </div>
</template>

<script>
  import indexHeader from '../components/header.vue';
  import examFooter from '../components/footer.vue';
  import * as ajax from '@/utils/api';
  import Vue from 'vue';
  import {Toast,Button,Checkbox, CheckboxGroup,RadioGroup, Radio  } from 'vant';
  Vue.use(Toast).use(Button).use(Checkbox).use(CheckboxGroup).use(RadioGroup).use(Radio);
  export default {
    name: 'exam',
    data () {
        return {
		   questionText: '',
		   questionList: [],
		   questionCurrent: {},
		   answerList: [],
		   current:0,
		   total: null,
		   nextNone: false,
		   preNone: true,
		   checkboxChoose:[],
		   radioChoose:''
        }
    },
	components: {
		indexHeader,
		examFooter
	},
	mounted() {
	  this.getExamList()
	},
	watch: {
	  'current': function(newValue,oldValue) {
	    this.questionCurrent = this.questionList[this.current];
	    this.answerList = []
	    for(let k in this.questionCurrent) {
	      if(k == 'XA' || k == 'XB' || k == 'XC' || k == 'XD') {
	        if(this.questionCurrent[k]) {
	          this.answerList.push(this.questionCurrent[k])
	        }
	      }
	    }
	  }
	},
	methods:{
	  getExamList() {
	    ajax.get('GetPaper?IDcard='+this.$route.query.IDCard).then(res => {
	      if(res.data.result){
	        this.questionList = res.data.data
			console.log( this.questionList)
	        this.total = res.data.data.length
	        this.questionCurrent = this.questionList[this.current]
	        this.questionText = this.questionCurrent.GZ
	        for(let k in this.questionCurrent) {
	          if(k == 'XA' || k == 'XB' || k == 'XC' || k == 'XD') {
	            if(this.questionCurrent[k]) {
	              this.answerList.push(this.questionCurrent[k])
	            }
	          }
	        }
	      }
	    })
	  },
	  pre() {
	    if(this.current>0) {
	      this.current--
	    }else{
	      this.preNone = true
	    }
	  },
	  next() {
	    if(this.current<this.total) {
	      this.current++
	    }else{
	      this.nextNone = true
	    }
	  }
	}
  }
</script>

<style>
	.right_slot p{
		line-height: 18px;
		color: #fff;
	}
	.primary{
	  width: 165px;
	}
	.question-title{
		padding:0 15px 15px;
	}
	.primary.none{
	  background: #595F74;
	}

	.question-container h4{
		padding-left: 15px;
		height:40px;
		line-height: 40px;
		width: 100%;
		margin: 0 !important;
		border-bottom:1px solid #eee;
	}
	.question-container{
	  margin: 10px 0;
	  background: #fff;
	  /* padding:0 15px; */
	  box-sizing: border-box;
	  box-shadow:0px 1px 2px 0px rgba(0,0,0,0.16);
	 
	}
	.question-container li{
	  /* width:335px; */
	  height:46px;
	  /* line-height: 46px; */
	  padding-left: 10px;
	  color: #fff;
	  margin-bottom: 10px;
	  background:rgba(112,153,208,1);
	  border-radius:2px;
	}
	.question-btn{
		
		padding: 0 15px;
	  display: flex;
	  justify-content: space-around;
	  color: #fff;
	  margin-bottom: 60px;

	}
	.buttonPreNone,.buttonnextNone{
		width: 48%;
		float: left;
		border-radius:2px;
		background:#6473A9;
	}
	.buttonnextNone{float: right;background:rgba(89,95,116,1);}
	.question-btn button{
	  color: #fff;
	}
	.chooseIndex{
		width: 10%;
		display: block;
		width:16px;
		height:16px;
		background:rgba(120,158,209,1);
		color:#fff;
		border-radius: 50%;
		text-align: center;
		line-height: 16px;
		font-size: 12px;
		float: left;
		margin-right: 7px;
	}
	.title_t{
		width: 90%;
			display: block;
		font-size: 16px;
		float: right;
		line-height: 18px;
	}
</style>
