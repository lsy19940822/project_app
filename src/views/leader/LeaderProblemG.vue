<template>
  <div id="examrecord">
    <div class="container">
      <ul class="container_list container_lists">
        <p class="van-hairline--bottom exam-title">
          <img src="../../assets/images/safeQuality/icon_t@2x (3).png" alt />问题详情
        </p>
        <li>
          <span>问题提出人</span>
          <span :id="StaffInfoData.putNameId">{{StaffInfoData.putName}}</span>
        </li>

        <li>
          <span>所属部门</span>
          <span>{{StaffInfoData.department}}</span>
        </li>
        <li>
          <span>位置:</span>
          <span>经度:{{StaffInfoData.longitude?StaffInfoData.longitude:'暂无'}} &nbsp;纬度:{{StaffInfoData.latitude?StaffInfoData.latitude:'暂无'}}</span>
        </li>
        <li>
          <span>问题类型:</span>
          <span v-if="StaffInfoData.quesType==1">安全问题</span>
          <span v-if="StaffInfoData.quesType==2">质量问题</span>
          <span v-if="StaffInfoData.quesType==3">进度问题</span>
        </li>
        <li>
          <span>紧急类型:</span>
          <span v-if="StaffInfoData.degreeid==1">特别紧急</span>
          <span v-if="StaffInfoData.degreeid==2">紧急</span>
          <span v-if="StaffInfoData.degreeid==3">一般</span>
        </li>
        <li>
          <span>提问时间</span>
          <span>{{StaffInfoData.dates}}</span>
        </li>
      </ul>
      <!-- 张瑞显示的页面 -->
      <div>
        <ul class="container_list container_lists">
          <p class="van-hairline--bottom exam-title">
            <img src="../../assets/images/safeQuality/icon_t@2x (2).png" alt />问题描述
          </p>

          <li>
            <span>问题简述</span>
            <span>{{StaffInfoData.quesDesc}}</span>
          </li>
          <li>
            <span>问题详述</span>
            <span>{{StaffInfoData.quesDetail}}</span>
          </li>
          <li>
            <span>限定时间</span>
            <span>{{StaffInfoData.endDate}}</span>
          </li>
          <li>
            <span>现场负责人</span>
            <span>{{StaffInfoData.principleName}}</span>
          </li>
        </ul>
        <ul class="container_list container_lists">
          <p class="van-hairline--bottom exam-title">
            <img src="../../assets/images/safeQuality/icon_t@2x (5).png" alt />问题照片
          </p>
          <li class="overflow">
            <div v-for="(image, index) in quesPic" :key="index" @click="questionBig(index)">
              <img :src="image" alt v-if="image!=''" preview="0" @click="questionBig(index)" />
            </div>
          </li>
        </ul>
      </div>

      <!-- 郝文杰页面 -->
      <div v-show="TYPES==2">
        <ul class="container_list container_lists">
          <p class="van-hairline--bottom exam-title">
            <img src="../../assets/images/safeQuality/icon_t@2x (2).png" alt />处理进度
          </p>
          <li>
            <span>分配意见:</span>
            <span></span>
            <span v-if="StaffInfoData.opinion==1">同意,请相关人员及时整改</span>
            <span v-if="StaffInfoData.opinion==2">问题详情不明确.请修改</span>
          </li>
          <li>
            <span>指定处理人员</span>
            <span>{{StaffInfoData.solvePeopleName}}</span>
          </li>

          <li class="overflow">
            <p>整改照片</p>
              <div v-for="(image, index) in zhenggaiImg" :key="index" @click="Preview_img(index)">
                <img :src="image" alt v-if="image!=''" preview="0" @click="Preview_img(index)" />
            </div>
          </li>
          <li>
            <span>处理结果</span>
            <span v-if="StaffInfoData.processResult==1">处理</span>
            <span v-if="StaffInfoData.processResult==2">未处理</span>
            <span v-else></span>
          </li>
          <li>
            <span>审核结果</span>
            <span>未通过</span>
          </li>
        </ul>
      </div>

      <!-- 秦兴武显示页面 -->
      <div v-show="TYPES==3">
        <ul class="container_list container_lists">
          <p class="van-hairline--bottom exam-title">
            <img src="../../assets/images/safeQuality/icon_t@2x (2).png" alt />处理进度
          </p>
          <li>
            <span>分配意见:</span>
            <span></span>
            <span v-if="StaffInfoData.opinion==1">同意,请相关人员及时整改</span>
            <span v-if="StaffInfoData.opinion==2">问题详情不明确.请修改</span>
          </li>
          <li>
            <span>指定处理人员:</span>
            <span>{{StaffInfoData.solvePeopleName}}</span>
          </li>
          <li class="overflow">
            <p>整改照片</p>
            <div v-for="(image, index) in zhenggaiImg" :key="index" @click="Preview_img(index)">
              <img :src="image" alt v-if="image!=''" preview="0" @click="Preview_img(index)" />
            </div>
          </li>
          <li>
            <span>处理结果:</span>
            <span v-if="StaffInfoData.processResult==1">处理</span>
            <span v-if="StaffInfoData.processResult==2">未处理</span>
            <!-- <span v-else></span> -->
          </li>
        </ul>
      </div>
    </div>
    <!-- 嵌入图片 -->
    <van-overlay :show="show " @click="onClickHide">
      <div class="wrapper">
        <img class="imgtupian" :src="embedded" alt />
      </div>
    </van-overlay>
    <!-- 嵌入图片/ -->
  </div>
</template>

<script>
import vantHeader from "@/components/header.vue";
import * as ajax from "@/utils/api";
import Vue from "vue";
import { Cell } from "vant";
import { Button } from "vant";
import { Field } from "vant";
import { swipe, ImagePreview, SwipeItem, Overlay } from "vant"; //引入预览
Vue.use(swipe).use(SwipeItem);
Vue.use(Field);
Vue.use(Button);
Vue.use(Overlay);
import { Icon, CellGroup, IndexBar, IndexAnchor, Toast } from "vant";
Vue.use(IndexBar)
  .use(IndexAnchor)
  .use(Icon)
  .use(CellGroup)
  .use(Toast);
Vue.use(Cell);
export default {
  components: {
    vantHeader
  },
  data() {
    return {
      StaffInfoData: {}, //承接数据
      quesPic: [], //承接图片 问题图片 (小)
      imgwentiBig: [], //问题图片(大)
      solvePeopleInfor: {},
      zhengPic: [], //整改图片
      zhenggaiImg: [], //处理整改图片 (小)
      imgzhenggaiBig: [], //处理整改图片(大)
      TYPES: "", //存储当前登录人员权限大小
      show: false, //控制方大缩小图
      embedded: "" // 图片放大后的显示
    };
  },
  mounted() {
    ajax
      .postW("/api/safety/selectSafetyInfoById?id=" + this.$route.query.id)
      .then(res => {
        console.log(res);
        if (res.status == 200) {
          if (res.data.code == 200) {
            this.StaffInfoData = res.data.data;
            //处理问题图片 (小)
            let imgwenti = res.data.data.thumbnailPic;
            this.quesPic = imgwenti.split(",");
            // 处理问题图（大）
            let imgwentiBig = res.data.data.quesPic;
            this.imgwentiBig = imgwentiBig.split(",");
            //处理整改图片 （小）
            let imgzhenggai = res.data.data.thumbnailUp;
            this.zhenggaiImg = imgzhenggai.split(",");
            console.log(imgzhenggai);
            //处理整改图（大）
            let imgzhenggaiBig = res.data.data.upImg;
            this.imgzhenggaiBig = imgzhenggaiBig.split(",");
          }
        }
      });
    this.TYPES = localStorage.getItem("TYPES");
    console.log(this.TYPES);
  },

  methods: {
    //  处理问题图片 (大)
    questionBig(index) {
      this.embedded = this.imgwentiBig[index];
      this.show = true;
      console.log(1111);
    },
    // 处理整改图片小
    Preview_img(index) {
      this.embedded = this.imgzhenggaiBig[index];
      this.show = true;
    },
    /**点击放大图隐藏 */
    onClickHide() {
      this.show = false;
    }
  }

  //     studyActives(index) {
  //       this.num = index;
  //       if (this.num == 1) {
  //         this.show = true;

  //         this.showchuli = false;
  //         sessionStorage.setItem("num", 1);
  //       }
  //       if (this.num == 2) {
  //         this.show = false;
  //         this.showchuli = true;
  //         sessionStorage.setItem("num", 2);
  //       }
  //     },
  //     sumtrienButton() {
  //       let that = this;

  //       if (this.num == 0) {
  //         Toast("请先选择分配意见");
  //       } else {
  //         if (that.num == 1) {
  //           if (that.solvePeopleInfor.username == undefined) {
  //             Toast("请选择抄送人");
  //           } else {
  //             this.a = false;

  //             ajax
  //               .postW(
  //                 "/api/safety/updateSafetyStatusAndType?id=" +
  //                   that.$route.query.id +
  //                   "&opinion=" +
  //                   that.num +
  //                   "&solvePeople=" +
  //                   that.solvePeopleInfor.userid +
  //                   "&solvePeopleName=" +
  //                   that.solvePeopleInfor.username +
  //                   "&approvalOpinion=" +
  //                   that.message
  //               )
  //               .then(res => {
  //                 if (res.status == 200) {
  //                   if (res.data.code == 200) {
  //                     if (res.data.success == true) {
  //                       this.a = true;
  //                       var t2;
  //                       var that = this;
  //                       t2 = setInterval(function() {
  //                         Toast("分配成功");
  //                         clearInterval(t2);
  //                         that.$router.push({
  //                           path: "/leader_safeQualityList",
  //                           query: {
  //                             userId: that.$route.query.userId,
  //                             type: sessionStorage.getItem("TYPES")
  //                           }
  //                         });
  //                       }, 800);
  //                     }
  //                     if (res.data.success == false) {
  //                       this.a = true;
  //                       Toast("分配失败");
  //                     }

  //                     sessionStorage.removeItem("solvePeopl");
  //                     sessionStorage.removeItem("num");
  //                   }
  //                 }
  //               });
  //           }
  //         } else {
  //           if (this.message == "") {
  //             Toast("请填写处理意见");
  //           } else {
  //             ajax
  //               .postW(
  //                 "/api/safety/updateSafetyStatusAndType?id=" +
  //                   that.$route.query.id +
  //                   "&opinion=" +
  //                   that.num +
  //                   "&putNameId=" +
  //                   this.StaffInfoData.putNameId +
  //                   "&putNameString=" +
  //                   this.StaffInfoData.putName +
  //                   "&approvalOpinion=" +
  //                   that.message
  //               )
  //               .then(res => {
  //                 if (res.status == 200) {
  //                   if (res.data.code == 200) {
  //                     if (res.data.success == true) {
  //                       this.a = true;
  //                       var t2;
  //                       var that = this;
  //                       t2 = setInterval(function() {
  //                         Toast("分配成功");
  //                         clearInterval(t2);
  //                         that.$router.push({
  //                           path: "/leader_safeQualityList",
  //                           query: {
  //                             userId: that.$route.query.userId,
  //                             type: sessionStorage.getItem("TYPES")
  //                           }
  //                         });
  //                       }, 800);
  //                     }
  //                     if (res.data.success == false) {
  //                       this.a = true;
  //                       Toast("分配失败");
  //                     }
  //                     sessionStorage.removeItem("solvePeopl");
  //                     sessionStorage.removeItem("num");
  //                   }
  //                 }
  //               });
  //           }
  //         }
  //       }
  //     },
  //     StaffInfoF() {
  //       //'b4194213-fa6f-48c7-a9bc-0115be23df1b
  //       let that = this;
  //       ajax
  //         .getW("/api/safety/selectSafetyInfoById?id=" + that.$route.query.id)
  //         .then(res => {
  //           if (res.status == 200) {
  //             if (res.data.code == 200) {
  //               this.StaffInfoData = res.data.data;
  //               var quesPic = res.data.data.thumbnailPic;
  //               var thumbnailPic = res.data.data.quesPic;
  //               var upImg = res.data.data.thumbnailUp;
  //               var thumbnailUp = res.data.data.upImg;
  //               if (quesPic) {
  //                 //字符串截取为数组
  //                 var strArr = quesPic.split(",");
  //                 for (let j = 0, len = strArr.length; j < len; j++) {
  //                   if (strArr[j] != "") {
  //                     that.quesPic.push(strArr[j]);
  //                   }
  //                 }
  //               }
  //               if (upImg) {
  //                 //字符串截取为数组
  //                 var strArr = upImg.split(",");
  //                 for (let j = 0, len = strArr.length; j < len; j++) {
  //                   if (strArr[j] != "") {
  //                     that.upImg.push(strArr[j]);
  //                   }
  //                 }
  //               }
  //               if (thumbnailPic) {
  //                 //字符串截取为数组
  //                 var strArr = thumbnailPic.split(",");
  //                 for (let j = 0, len = strArr.length; j < len; j++) {
  //                   if (strArr[j] != "") {
  //                     that.thumbnailPic.push(strArr[j]);
  //                   }
  //                 }
  //               }
  //               if (thumbnailUp) {
  //                 //字符串截取为数组
  //                 var strArr = thumbnailUp.split(",");
  //                 for (let j = 0, len = strArr.length; j < len; j++) {
  //                   if (strArr[j] != "") {
  //                     that.thumbnailUp.push(strArr[j]);
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         });
  //     }
  //   }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.imgtupian {
  width: 100%;
  height: 450px;
}
.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
.van-button--normal {
  width: 100%;
  background: rgba(246, 246, 246, 1);
  border-radius: 2px;
  border: 1px solid rgba(238, 238, 238, 1);
  color: #666;
}
.activeLabel {
  border-radius: 2px;
  width: 100%;
  color: rgb(255, 255, 255);
  background: rgb(112, 153, 208);
  border-color: rgb(112, 153, 208);
}
.Buttond {
  margin: 10px 16px;
  height: 44px;
  border-radius: 2px;
  font-size: 16px;
  text-align: center;
  line-height: 44px;
}
.container_lists li div {
  width: 25%;
  height: auto;
  overflow: hidden;
  float: left;
}
.container_lists li div img {
  width: 70px;
  height: 70px;
  overflow: hidden;
  display: block;
  margin: 0 auto;
}
h5 {
  padding: 10px 16px 0;
  color: #666666;
  margin: 0;
}
/deep/ .Buttonds.van-button__text {
  color: #666666;
}
.container_lists li div:last-child {
  margin-right: 0 !important;
}

.container_lists li {
  padding: 10px 16px;
  color: #969799;
  font-size: 14px;
  line-height: 24px;
}
.container_lists li span:last-child {
  width: 65%;
  color: #323233;
  text-align: right;
  display: inline-block;
  float: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.van-hairline--bottom img {
  width: 12px;
  height: 12px;
  float: left;
  margin-right: 5px;
  margin-top: 14px;
}
.van-hairline--bottom {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  padding-left: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 40px;
  margin: 0;
  border-bottom: 1px solid rgba(238, 238, 238, 1);
}
.infor_header p {
  color: #999999;
}
.infor_header h3,
.infor_header p {
  text-align: center;
  margin: 10px 0 !important;
}
.infor_header h3 .van-icon {
  /* margin-top:5px; */
  color: #00a0e9;
  /* visibility: initial; */
  font-size: 14px;
}
/deep/ .infor_header .van-button {
  width: 48%;
}
.infor_header .van-button:last-child {
  float: right;
}
.infor_header img {
  /* width:85px; */
  height: 85px;
  border-radius: 1px;
  border: 1px solid rgba(238, 238, 238, 1);
  display: block;
  margin: 0 auto;
}
.infor_header {
  background: #fff;
  padding: 15px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.16);
  /* margin-bottom: 10px; */
}
.header-right {
  line-height: 5px;
  color: #fff;
}
.container_l {
  width: 20%;
  float: left;
}
.container_r {
  width: 78%;
  float: right;
}
.container_r span {
  display: block;
  width: 100%;
}
.container {
  /* padding-top: 46px; */
}
.container_list {
  margin-top: 10px;
  height: auto;
  overflow: hidden;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.16);
}
.container_list li {
  /* padding: 10px 16px; */
  height: auto;
  overflow: hidden;
  border-bottom: 1px solid #eeeeee;
}
.container_list li:last-child {
  border-bottom: none;
}
.container_list li.more .van-icon {
  margin-top: 0;
}
.container_list li .van-icon {
  margin-top: 15px;
}
.container_span_first {
  width: 42px;
  color: #69966f;
  font-size: 20px;
}

.container_span_seound {
  color: #69966f;
  font-size: 12px;
}
.container_span_three {
  color: #333;
  font-size: 17px;
}
.container_span_firsts {
  width: 42px;
  border: 1px solid #69966f;
  font-size: 12px;
  height: 17px;
  line-height: 14px;
  display: inline-block;
  text-align: center;
  border-radius: 2px;
  color: #69966f;
}
.container_span_seounds {
  color: #aaa;
  font-size: 12px;
}
</style>
