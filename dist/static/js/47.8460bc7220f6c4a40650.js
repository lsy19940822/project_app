webpackJsonp([47],{"9PiM":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("J7DX");var n=a("Iz4n"),s=a.n(n),i=(a("RB7Z"),a("3TLy")),r=a.n(i),u=(a("cnGM"),a("S6j6")),o=a.n(u),l=(a("uTM9"),a("Jq84")),c=a.n(l),d=a("Cz8s"),v=a("VsUZ");a("7+uW").default.use(s.a).use(r.a).use(o.a).use(c.a);var f={components:{vantHeader:d.default},data:function(){return{questionText:this.$route.query.name,isLoading:!0}},created:function(){this.GetMenuTreeList()},mounted:function(){},methods:{GetMenuTreeList:function(){var t=this;v.get("/API/WebAPIDataAudit/GetMenuTree?id="+this.$route.query.id+"&name=").then(function(e){if(e.data.result)for(var a in t.TreedataO=e.data.data,""!=e.data.data.length?t.show=!0:t.show=!1,console.log("智能进度GetMenuTre3:",t.TreedataO),e.data.data)t.option2.push({text:e.data.data[a].NAME,value:Number(a)+Number(1)})})}}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"study"},[a("vant-header",{attrs:{leftArrow:!0,titleType:1,title:t.questionText,rightType:2}}),t._v(" "),a("div",{staticClass:"container overflow"},[a("ul",{staticClass:"overflow"},[a("li",[a("van-cell",{attrs:{"is-link":""}},[a("span",[t._v("528# 梁 - 1号梁")]),t._v(" "),a("span",{staticStyle:{color:"#69966F"}},[t._v("已完成")])])],1),t._v(" "),a("li",[a("van-cell",{attrs:{"is-link":""}},[a("span",[t._v("528# 梁 - 2号梁")]),t._v(" "),a("span",{staticStyle:{color:"#E19B52"}},[t._v("超期已完成")])])],1),t._v(" "),a("li",[a("van-cell",{attrs:{"is-link":""},on:{click:function(e){return t.$router.push({path:"/fill"})}}},[a("span",[t._v("528# 梁 - 3号梁")]),t._v(" "),a("span",{staticStyle:{color:"#AAAAAA"}},[t._v("未填报")])])],1)])])],1)},staticRenderFns:[]};var _=a("VU/8")(f,p,!1,function(t){a("F+se")},"data-v-6ec5603a",null);e.default=_.exports},"F+se":function(t,e){}});
//# sourceMappingURL=47.8460bc7220f6c4a40650.js.map