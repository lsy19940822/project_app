webpackJsonp([3],{cSta:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});i("oVsm");var a=i("95Mb"),n=i.n(a),o=(i("GKy3"),i("4vvA")),s=i.n(o),r=(i("jgNZ"),i("syWm")),l=i.n(r),u=(i("dKGA"),i("kSul")),d=i.n(u),c=(i("J7DX"),i("Iz4n")),h=i.n(c),v=(i("RB7Z"),i("3TLy")),p=i.n(v),f=(i("cnGM"),i("S6j6")),C=i.n(f),S=(i("uTM9"),i("Jq84")),m=i.n(S),x=(i("CCOf"),i("rrcz")),g=i.n(x),k=(i("3evy"),i("Irlo")),U=i.n(k),W=(i("2lDz"),i("t42S")),y=i.n(W),R=(i("79O3"),i("fpgn")),T=i.n(R),w=(i("jydU"),i("WQwN")),b=i.n(w),N=i("VsUZ"),A=i("xOwF"),_=i.n(A);i("7+uW").default.use(n.a).use(s.a).use(l.a).use(d.a).use(h.a).use(p.a).use(C.a).use(m.a).use(g.a).use(U.a).use(y.a).use(T.a).use(b.a);var G={components:{},data:function(){return{disabledSection:!1,disabledUnit:!1,value1:0,value2:0,value3:0,value4:0,option1:[{text:"全部标段",value:0},{text:"CYCZQ-1标",value:1},{text:"CYCZQ-2标",value:2},{text:"CYCZQ-3标",value:3},{text:"CYCZQ-4标",value:4},{text:"CYCZQ-5标1",value:5},{text:"CYCZQ-5标2",value:6},{text:"CYCZQ-6标",value:7}],option2:[{text:"全部单位",value:0}],option3:[{text:"全部工种",value:0}],option4:[{text:"全部工区",value:0}],TypeWork:"",Unit:"",Section:"",NameArrS:[],BD:"",GD:"",show:!0,GetWork:""}},created:function(){this.getCompanyList(),this.StaffRetrieveList(),this.GetWorkTypeList(),this.GetWorkareaList()},mounted:function(){},computed:{indexlist:function(){return this.NameArrS.map(function(t){return t.letter.toUpperCase()})}},methods:{change1:function(t){this.Section=this.option1[t].text,console.log("当前标段：",this.Section),""==this.TypeWork&&""==this.Unit||(this.TypeWork="",this.Unit="",this.value2=Number(0),this.value3=Number(0),this.value4=Number(0)),this.option2.splice(1),this.option3.splice(1),this.option3.splice(1),this.StaffRetrieveList(),this.getCompanyList(),this.GetWorkTypeList()},change4:function(t){if(this.GetWork=this.option4[t].text.replace("#","%23"),console.log("当前工区：",t,this.GetWork),""!=this.TypeWork)return this.TypeWork="",void(this.value3=Number(0));"全部工区"==this.GetWork&&(this.GetWork=""),this.option3.splice(1),this.StaffRetrieveList(),this.GetWorkTypeList()},change2:function(t){if(this.Unit=this.option2[t].text,console.log("当前单位：",t,this.Unit),""!=this.TypeWork)return this.TypeWork="",void(this.value3=Number(0));"全部单位"==this.Unit&&(this.Unit=""),this.option3.splice(1),this.StaffRetrieveList(),this.getCompanyList(),this.GetWorkTypeList()},change3:function(t){this.TypeWork=this.option3[t].text,console.log("当前工种：",t,this.TypeWork),console.log(this.Unit),""==this.Section&&""==this.Unit&&""==this.GetWork||(this.Section=this.Section,this.Unit=this.Unit,this.GetWork=this.GetWork),"全部工种"==this.TypeWork&&(this.TypeWork=""),this.StaffRetrieveList()},StaffRetrieveList:function(){var t=this;if("全部标段"==this.Section&&"全部单位"==this.Unit&&"全部工种"==this.TypeWork&&"全部工区"==this.GetWork)return this.Section="",this.Unit="",this.TypeWork="",void(this.GetWork="");console.log("StaffRetrieveList:",this.Unit),N.get("/API/WebAPIDataAudit/StaffRetrieve?Section="+this.Section+"&Unit="+this.Unit+"&TypeWork="+this.TypeWork+"&Workarea="+this.GetWork).then(function(e){if(0!=e.data.result)if(1!=e.data.result);else{var i=[];for(var a in t.show=!0,e.data.data){null!=e.data.data[a].PHOTOURL&&(e.data.data[a].PHOTOURL=N.http+e.data.data[a].PHOTOURL.slice(2));var n=e.data.data[a].EXAMNAME,o=_.a.getCamelChars(n).substring(0,1);e.data.data[a].first=o,i.push(e.data.data[a])}t.pySegSort(i)}else t.show=!1})},pySegSort:function(t){var e=["A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","T","W","X","Y","Z"],i=[],a=void 0;for(var n in e){for(var o in a={letter:e[n],data:[]},t)e[n]==t[o].first&&a.data.push(t[o]);a.data.length&&i.push(a)}return this.NameArrS=i,this.NameArrS},getCompanyList:function(){var t=this;"全部标段"==this.Section&&(this.Section=""),N.get("/API/WebAPIDataAudit/getCompany?Section="+this.Section).then(function(e){if(0==e.data.result)return t.disabledSection=!0,1==t.disabledSection?void(t.disabledUnit=!0):void 0;if(1==e.data.result){for(var i in e.data.data)null!=e.data.data[i].COMPANY&&t.option2.push({text:e.data.data[i].COMPANY,value:Number(i)+Number(1)});return t.disabledSection=!1,0==t.disabledSection?void(t.disabledUnit=!1):void 0}})},GetWorkTypeList:function(){var t=this;""!=this.Unit&&""==this.Unit||N.get("/API/WebAPIDataAudit/GetWorkType?Unit="+this.Unit).then(function(e){if(0==e.data.result&&(t.disabledUnit=!0),1!=e.data.result);else{for(var i in e.data.data)null!=e.data.data[i].WORKTYPE&&t.option3.push({text:e.data.data[i].WORKTYPE,value:Number(i)+Number(1)});console.log(t.option3)}})},GetWorkareaList:function(){var t=this;""!=this.Unit&&""==this.Unit||N.get("/API/WebAPIDataAudit/GetWorkarea?Section="+this.Section).then(function(e){if(0==e.data.result&&(t.disabledUnit=!0),1!=e.data.result);else{for(var i in e.data.data)null!=e.data.data[i].WORKAREA&&t.option4.push({text:e.data.data[i].WORKAREA,value:Number(i)});console.log(t.option4)}})}}},L={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"containers overflow"},[i("div",{staticClass:"container_header overflow",staticStyle:{display:"flex"}},[i("van-dropdown-menu",{staticClass:"Intelligence-dropdown",staticStyle:{width:"103px",float:"left"}},[i("van-dropdown-item",{attrs:{options:t.option1},on:{change:function(e){return t.change1(t.value1)}},model:{value:t.value1,callback:function(e){t.value1=e},expression:"value1"}})],1),t._v(" "),i("div",{staticClass:"van_icon",staticStyle:{width:"20px",float:"left","text-align":"center","line-height":"50px"}},[i("van-icon",{attrs:{name:"arrow"}})],1),t._v(" "),i("van-dropdown-menu",{staticClass:"Intelligence-dropdown",staticStyle:{width:"103px",float:"left"}},[i("van-dropdown-item",{attrs:{options:t.option4,disabled:t.disabledSection},on:{change:function(e){return t.change4(t.value4)}},model:{value:t.value4,callback:function(e){t.value4=e},expression:"value4"}})],1),t._v(" "),i("div",{staticClass:"van_icon",staticStyle:{width:"20px",float:"left","text-align":"center","line-height":"50px"}},[i("van-icon",{attrs:{name:"arrow"}})],1),t._v(" "),i("van-dropdown-menu",{staticClass:"Intelligence-dropdown",staticStyle:{width:"103px",float:"left"}},[i("van-dropdown-item",{attrs:{options:t.option2,disabled:t.disabledSection},on:{change:function(e){return t.change2(t.value2)}},model:{value:t.value2,callback:function(e){t.value2=e},expression:"value2"}})],1),t._v(" "),i("div",{staticClass:"van_icon",staticStyle:{width:"20px",float:"left","text-align":"center","line-height":"50px"}},[i("van-icon",{attrs:{name:"arrow"}})],1),t._v(" "),i("van-dropdown-menu",{staticClass:"Intelligence-dropdown",staticStyle:{width:"103px",float:"left"}},[i("van-dropdown-item",{attrs:{options:t.option3,disabled:t.disabledUnit},on:{change:function(e){return t.change3(t.value3)}},model:{value:t.value3,callback:function(e){t.value3=e},expression:"value3"}})],1)],1)]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.show,expression:"!show"}],staticClass:"flase",staticStyle:{"text-align":"center",padding:"20px","font-size":"14px",color:"#ddd"}},[t._v("暂无人员")]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"containers-bar overflow",staticStyle:{position:"relative"}},[i("van-index-bar",{attrs:{sticky:!0,"sticky-offset-top":46,"index-list":t.indexlist}},t._l(t.NameArrS,function(e,a){return i("div",[i("ul",{staticClass:"peploneList"},[i("li",[i("van-index-anchor",{attrs:{index:e.letter}}),t._v(" "),t._l(e.data,function(e,a){return i("van-cell",{key:e.CERTNUMBR,staticClass:"vanCell",attrs:{CERTNUMBR:e.CERTNUMBR},on:{click:function(i){return t.$router.push({path:"/information?IDCard="+e.CERTNUMBR})}}},[i("img",{attrs:{src:e.PHOTOURL,alt:"",CERTNUMBR:e.CERTNUMBR},on:{click:function(i){return t.$router.push({path:"/information?IDCard="+e.CERTNUMBR})}}}),t._v(" "),i("span",{attrs:{CERTNUMBR:e.CERTNUMBR},on:{click:function(i){return t.$router.push({path:"/information?IDCard="+e.CERTNUMBR})}}},[t._v(t._s(e.EXAMNAME))]),t._v(" "),i("span",{attrs:{CERTNUMBR:e.CERTNUMBR},on:{click:function(i){return t.$router.push({path:"/information?IDCard="+e.CERTNUMBR})}}},[t._v(t._s(e.WORKTYPE))])])})],2)])])}),0)],1)])},staticRenderFns:[]};var E=i("VU/8")(G,L,!1,function(t){i("vxAs")},"data-v-3f02827f",null);e.default=E.exports},vxAs:function(t,e){}});
//# sourceMappingURL=3.5540fa33c204ae4b9e94.js.map