webpackJsonp([8],{"0JvR":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWBAMAAAA2mnEIAAAAKlBMVEVqlLlplrlqlLn///+lvtV+osLE1OPO2+iYtc/d5u+4zN2LrMjv8/irwtc6j5uJAAAAAnRSTlPiSRXbpWIAAAB3SURBVBjTYxBQggFGBiY4W4FBCQHQ2CrGIOAEZqtOcXFx8QyCqJkExJpQ9dVJSmptUPa2DKW2aihby6t87SKYmdc6UuDmuyHYWpdCdWFqtiuFKpVC2aVAdhiUPSnCZSvULtUzQOecgbDVwW4rwnAzgo3sRyS/AwDqJy7Mw4f5SQAAAABJRU5ErkJggg=="},"7XL5":function(t,e,a){"use strict";(function(t){var n=a("FDxC"),s=(a.n(n),a("w+oK")),i=a.n(s),r=a("wdxn"),l=(a.n(r),a("iFG0")),c=a.n(l),o=a("poYN"),u=(a.n(o),a("jpYq")),A=a.n(u),d=a("oVsm"),g=(a.n(d),a("95Mb")),p=a.n(g),h=a("08XL"),m=(a.n(h),a("24wo")),v=a.n(m),S=a("G/J0"),f=(a.n(S),a("beN6")),_=a.n(f),y=a("GKy3"),C=(a.n(y),a("4vvA")),B=a.n(C),b=a("cnGM"),x=(a.n(b),a("S6j6")),P=a.n(x),N=a("Cz8s"),M=a("p/R4"),E=a("VsUZ");a("7+uW").default.use(i.a).use(c.a).use(A.a).use(p.a).use(v.a).use(_.a).use(B.a).use(P.a),e.a={components:{vantHeader:N.default,indexFooter:M.a},data:function(){return{questionText:"智能进度",cycaqData:[{title:"CYCZQ-1标",name:"1标"},{title:"CYCZQ-2标",name:"2标"},{title:"CYCZQ-3标",name:"3标"},{title:"CYCZQ-4标",name:"4标"},{title:"CYCZQ-5标1",name:"5标1"},{title:"CYCZQ-5标2",name:"5标2"},{title:"CYCZQ-6标",name:"6标"}],num:0,percentage:{percentage1:0,percentage2:0,percentage3:0,percentage4:0,percentage5:0},getSchedule:{Day:"",SumDay:"",TimeS:0,GrossOutput:"",CompletedOutputValue:"",PercentCompleted:0,targetAdvance:"",targetAdvanceOk:"",targetAdvancePercentage:0,ProjectAll:"",AreProject:""},index:0}},created:function(){var t=this;this.GetMenuTreeList(),this.num=Number(this.$route.query.ValueId),sessionStorage.setItem("GetMenuTree_list_name",null),sessionStorage.setItem("GetMenuTree_list_index",null),E.get("/API/WebAPIDataAudit/GetProgress?section="+this.cycaqData[this.num].name).then(function(e){e.data.result&&(t.getSchedule.Day=e.data.data.Day,t.getSchedule.SumDay=e.data.data.SumDay,t.getSchedule.TimeS=Number(Math.floor(t.getSchedule.Day/t.getSchedule.SumDay*100)),t.getSchedule.GrossOutput=e.data.data.GrossOutput,t.getSchedule.ProjectAll=e.data.data.ProjectAll,t.getSchedule.AreProject=e.data.data.AreProject,t.getSchedule.CompletedOutputValue=e.data.data.CompletedOutputValue,t.getSchedule.PercentCompleted=Number(e.data.data.PercentCompleted),t.getSchedule.targetAdvancePercentage=Number(e.data.data.targetAdvancePercentage))})},mounted:function(){this.num>3&&t(".innerLabel li:eq(0)").css("margin-left",Number(4.5*-(45.5+6*this.num))+"px")},methods:{link_get:function(){0==this.getSchedule.AreProject?B()("暂无超期工程"):this.$router.push({path:"/BeyondThe?index="+this.index})},link:function(){this.$router.push({path:"/intelligent_firstLevel?index="+this.index})},studyActives:function(t,e){var a=this;this.index=t,console.log("当前标段名：",e),sessionStorage.setItem("intelligent_CycName",e),this.CycName=sessionStorage.getItem("intelligent_CycName"),this.num=t,this.num<3?this.$refs.style[0].style.marginLeft="0px":3==this.num?this.$refs.style[0].style.marginLeft=Number(-(45.5+6*t))+"px":this.num>3&&(this.$refs.style[0].style.marginLeft=Number(4.5*-(45.5+6*t))+"px"),E.get("/API/WebAPIDataAudit/GetProgress?section="+e).then(function(t){t.data.result&&(a.getSchedule.Day=t.data.data.Day,a.getSchedule.SumDay=t.data.data.SumDay,a.getSchedule.TimeS=Number(Math.floor(a.getSchedule.Day/a.getSchedule.SumDay*100)),a.getSchedule.GrossOutput=t.data.data.GrossOutput,a.getSchedule.ProjectAll=t.data.data.ProjectAll,a.getSchedule.AreProject=t.data.data.AreProject,a.getSchedule.CompletedOutputValue=t.data.data.CompletedOutputValue,a.getSchedule.PercentCompleted=Number(t.data.data.PercentCompleted),a.getSchedule.targetAdvancePercentage=Number(t.data.data.targetAdvancePercentage))})},GetMenuTreeList:function(){}}}}).call(e,a("7t+N"))},BAg5:function(t,e){},GMzX:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("7XL5"),s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"index"}},[a("vant-header",{attrs:{leftArrow:!0,titleType:1,title:t.questionText,rightType:2}}),t._v(" "),a("div",{staticClass:"containerIndex"},[a("div",{staticClass:"header_inte"},[a("div",{staticClass:"inte_gent"},[a("ul",{staticClass:"innerLabel"},t._l(t.cycaqData,function(e,n){return a("li",{ref:"style",refInFor:!0,class:{activeLabel:t.num==n},attrs:{id:n},on:{click:function(a){return t.studyActives(n,e.name)}}},[t._v(t._s(e.title))])}),0)])]),t._v(" "),a("div",{staticClass:"container_list"},[t._m(0),t._v(" "),a("div",{staticClass:"container_nav"},[a("div",{staticClass:"navLists",attrs:{prop:"percentage"}},[a("p",{staticStyle:{"font-size":"13px",margin:"0"}},[t._m(1),t._v(" "),a("span",{staticStyle:{color:"rgba(102,102,102,1)"}},[t._v("标段实际进度")]),t._v(" "),a("span",{staticStyle:{float:"right"}},[a("span",[t._v(t._s(t.getSchedule.PercentCompleted)),0!=t.getSchedule.PercentCompleted?a("span",[t._v("%")]):t._e()]),t._v(" "),a("span",{staticStyle:{color:"rgba(64,69,94,1)"}},[t._v("/100%")])])]),t._v(" "),a("p",[a("van-progress",{attrs:{color:"#7AB182",percentage:t.getSchedule.PercentCompleted,"stroke-width":"6"}})],1)]),t._v(" "),a("div",{staticClass:"navLists",attrs:{prop:"percentage"}},[a("p",{staticStyle:{"font-size":"13px",margin:"0"}},[t._m(2),t._v(" "),a("span",{staticStyle:{color:"rgba(102,102,102,1)"}},[t._v("标段计划进度")]),t._v(" "),a("span",{staticStyle:{float:"right"}},[a("span",[t._v(t._s(t.getSchedule.targetAdvancePercentage)+"%")]),a("span",{staticStyle:{color:"rgba(64,69,94,1)"}},[t._v("/100%")])])]),t._v(" "),a("p",{staticStyle:{"margin-bottom":"0"}},[a("van-progress",{attrs:{color:"#AAAAAA",percentage:t.getSchedule.targetAdvancePercentage,"stroke-width":"6"}})],1)])]),t._v(" "),a("div",{staticClass:"container_nav"},[a("div",{staticClass:"navLists",attrs:{prop:"percentage"}},[a("p",{staticStyle:{"font-size":"13px",margin:"0"}},[t._m(3),t._v(" "),a("span",{staticStyle:{color:"rgba(102,102,102,1)"}},[t._v("标段产值")]),t._v(" "),a("span",{staticStyle:{float:"right"}},[a("span",[t._v(t._s(t.getSchedule.CompletedOutputValue)+"万元")]),t._v(" "),a("span",{staticStyle:{color:"rgba(64,69,94,1)"}},[t._v("/"+t._s(t.getSchedule.GrossOutput)+"万元")])])]),t._v(" "),a("p",[a("van-progress",{attrs:{color:"#DCAA4F",percentage:t.getSchedule.PercentCompleted,"stroke-width":"6"}})],1)]),t._v(" "),a("div",{staticClass:"navLists",attrs:{prop:"percentage"}},[a("p",{staticStyle:{"font-size":"13px",margin:"0"}},[t._m(4),t._v(" "),a("span",{staticStyle:{color:"rgba(102,102,102,1)"}},[t._v("标段工期")]),t._v(" "),a("span",{staticStyle:{float:"right"}},[a("span",[t._v(t._s(t.getSchedule.Day)+"天")]),a("span",{staticStyle:{color:"rgba(64,69,94,1)"}},[t._v("/"+t._s(t.getSchedule.SumDay)+"天")])])]),t._v(" "),a("p",{staticStyle:{"margin-bottom":"0"}},[a("van-progress",{attrs:{color:"#6A94B9",percentage:t.getSchedule.TimeS,"stroke-width":"6"}})],1)])])]),t._v(" "),a("ul",{staticClass:"container_list overflow",staticStyle:{"margin-top":"10px"}},[a("li",{staticClass:"overflow",on:{click:function(e){return t.link_get()}}},[a("van-cell",{attrs:{"is-link":""}},[a("span",{staticStyle:{color:"#C86565"}},[t._v("超期工程")]),t._v(" "),a("span",{staticClass:"tag",staticStyle:{float:"right"}},[a("span",{staticStyle:{color:"#C86565"}},[t._v(t._s(t.getSchedule.AreProject))]),t._v(" "),a("span",{staticClass:"color:#AAAAAA"},[t._v("/"+t._s(t.getSchedule.ProjectAll))])])])],1)]),t._v(" "),a("ul",[a("li",{staticClass:"Buttond",on:{click:function(e){return t.link()}}},[a("van-button",{staticStyle:{width:"100%"},attrs:{color:"#7099D0",size:"normal"}},[t._v("进度填报")])],1)])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"van-hairline--bottom exam-title"},[e("img",{attrs:{src:a("ezVn"),alt:""}}),this._v("标段详情")])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",[e("img",{attrs:{src:a("dG0b"),alt:"",width:"11px"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",[e("img",{attrs:{src:a("as/e"),alt:"",width:"11px"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",[e("img",{attrs:{src:a("r7yh"),alt:"",width:"11px"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",[e("img",{attrs:{src:a("0JvR"),alt:"",width:"11px"}})])}]};var i=function(t){a("gsWA")},r=a("VU/8")(n.a,s,!1,i,"data-v-6a2f1cec",null);e.default=r.exports},"as/e":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWBAMAAAA2mnEIAAAAJ1BMVEWqqqqrq6uqqqrW1tb39/fw8PC3t7ewsLC+vr7R0dHKysrm5ube3t485xW4AAAAAnRSTlPiSRXbpWIAAAB9SURBVBjTYxBQggFGBiY4W4FBCQEw2MUu5jC2lnO5ySIIWyM6SUnLtQnMTmlSUtva4QZmT1ZSByqxBLNtlJbYRABFQGzT0ONK2dsgbMvsbUo1ocEQttLSw55Kh6F6tZyLoHpTOoAWaEDM1AhZBLSgCcMNKG7D6n5kPyL5HQCe+THd3RBxZwAAAABJRU5ErkJggg=="},dG0b:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWBAMAAAA2mnEIAAAAJFBMVEV6sYJ6soF6sYL4+/nA2sTe7ODv9fDJ4MyBtYmRv5iZxJ+rzrFRgai3AAAAAnRSTlPiSRXbpWIAAABYSURBVBjTYxBQggFGBiY4W4FBCQHQ2MnGIGAGZpuXA0G1Mpht4gIE3pPB7NJQEAjH0BuWBgKpMPUrOjqaMdjIapD1IpsJtmvlZIQbJiljuA27+5H9iOR3AJ5hMegh55d/AAAAAElFTkSuQmCC"},ezVn:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcBAMAAACAI8KnAAAAMFBMVEVHcEw/U4w/U4tDUY3///9AU4vo6/Hb3+mBjbJebp7Jzt6pssuXocD09fhte6a/xtg8/p4OAAAABHRSTlMA8K0mz/NSEwAAAIFJREFUGNNjYFYMhQMhAwbDUCQgzKCKzA1iEEXmBjKEogAgN8QFAnygXLc0MMiAcktRFaNzI2cCAYILNqwVzo1aBQRP0fTuPYrCdbkK5UZ0dAB1lnxFGOUXGhoJ0xu9e/dO3M6AMI+0EsOFevBKK4r3XSBclMBBCzq0gEULdtRIAQAP+olNpQNTfgAAAABJRU5ErkJggg=="},gsWA:function(t,e){},iFG0:function(t,e,a){"use strict";e.__esModule=!0,e.default=void 0;var n=a("VxeN"),s=a("JsfV"),i=a("vIjE"),r=(0,n.createNamespace)("grid"),l=r[0],c=r[1],o=l({mixins:[(0,s.ParentMixin)("vanGrid")],props:{square:Boolean,gutter:[Number,String],iconSize:[Number,String],clickable:Boolean,columnNum:{type:Number,default:4},center:{type:Boolean,default:!0},border:{type:Boolean,default:!0}},computed:{style:function(){var t=this.gutter;if(t)return{paddingLeft:(0,n.addUnit)(t)}}},render:function(){var t;return(0,arguments[0])("div",{style:this.style,class:[c(),(t={},t[i.BORDER_TOP]=this.border&&!this.gutter,t)]},[this.slots()])}});e.default=o},jpYq:function(t,e,a){"use strict";var n=a("R6lU");e.__esModule=!0,e.default=void 0;var s=n(a("lt8z")),i=a("VxeN"),r=a("vIjE"),l=a("JsfV"),c=a("lz04"),o=n(a("WQwN")),u=(0,i.createNamespace)("grid-item"),A=u[0],d=u[1],g=A({mixins:[(0,l.ChildrenMixin)("vanGrid")],props:(0,s.default)({},c.routeProps,{dot:Boolean,text:String,icon:String,info:[Number,String]}),computed:{style:function(){var t=this.parent,e=t.square,a=t.gutter,n=t.columnNum,s=100/n+"%",r={flexBasis:s};if(e)r.paddingTop=s;else if(a){var l=(0,i.addUnit)(a);r.paddingRight=l,this.index>=n&&(r.marginTop=l)}return r},contentStyle:function(){var t=this.parent,e=t.square,a=t.gutter;if(e&&a){var n=(0,i.addUnit)(a);return{right:n,bottom:n,height:"auto"}}}},methods:{onClick:function(t){this.$emit("click",t),(0,c.route)(this.$router,this)},renderContent:function(){var t=this.$createElement,e=this.slots();return e||[this.slots("icon")||this.icon&&t(o.default,{attrs:{name:this.icon,dot:this.dot,info:this.info,size:this.parent.iconSize},class:d("icon")}),this.slots("text")||this.text&&t("span",{class:d("text")},[this.text])]}},render:function(){var t,e=arguments[0],a=this.parent,n=a.center,s=a.border,i=a.square,l=a.gutter,c=a.clickable;return e("div",{class:[d({square:i})],style:this.style},[e("div",{style:this.contentStyle,attrs:{role:c?"button":null,tabindex:c?0:null},class:[d("content",{center:n,square:i,clickable:c,surround:s&&l}),(t={},t[r.BORDER]=s,t)],on:{click:this.onClick}},[this.renderContent()])])}});e.default=g},poYN:function(t,e,a){a("XqYu"),a("s1Ps"),a("tJSp")},r7yh:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWBAMAAAA2mnEIAAAAJ1BMVEXcqk/cq1Dcqk/iuGv9+vXt1aj58N/esV3rz5vnxIb79ez15szdrVWJ6wfKAAAAAnRSTlPiSRXbpWIAAACBSURBVBjTYxBQggFGBiY4W4FBCQHQ2ephLqlFUPasYCXTlRC2ZjKQNpsEZlcZmSsVKy8Hs0OV2sozgCSInaykkdakZAZmOym7uLgYqUDYSkoRSkoQdjJYXAOqFyiufAhqptJMJW1TuF3K1SZwN6h2m8Dc5qkx2wzTzXA2sh+R/A4ANNgssj/bem4AAAAASUVORK5CYII="},tJSp:function(t,e){},wdxn:function(t,e,a){a("XqYu"),a("BAg5")}});
//# sourceMappingURL=8.9659ce89e75a0b0c1fb9.js.map