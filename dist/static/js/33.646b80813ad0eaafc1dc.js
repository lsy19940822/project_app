webpackJsonp([33],{EbMM:function(t,e){},X1pY:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("mvHQ"),s=a.n(i),n=(a("jgNZ"),a("syWm")),o=a.n(n),l=(a("GKy3"),a("4vvA")),r=a.n(l),c=(a("dKGA"),a("kSul")),u=a.n(c),v=(a("uTM9"),a("Jq84")),p=a.n(v),h=(a("3evy"),a("Irlo")),d=a.n(h),f=(a("CCOf"),a("rrcz")),g=a.n(f),m=(a("jydU"),a("WQwN")),w=a.n(m),x=(a("9ULi"),a("lQdh")),C=a.n(x),_=(a("J7DX"),a("Iz4n")),y=a.n(_),S=(a("RB7Z"),a("3TLy")),M=a.n(S),T=a("Cz8s"),b=a("7+uW"),A=a("VsUZ");b.default.use(o.a).use(r.a).use(u.a).use(p.a).use(d.a).use(g.a).use(w.a).use(C.a).use(y.a).use(M.a);var k={data:function(){return{questionText:"人机定位",isLoading:!0,active:0,searchVal:"",map:null,activeClassType:!1,value1:0,value2:0,ajax:A,option1:[{text:"全部标段",value:0},{text:"CYCZQ-1标",value:1},{text:"CYCZQ-2标",value:2},{text:"CYCZQ-3标",value:3},{text:"CYCZQ-4标",value:4},{text:"CYCZQ-5标1",value:5},{text:"CYCZQ-5标2",value:6},{text:"CYCZQ-6标",value:7}],option2:[{text:"全部工区",value:0}],Section:"",disabledSection:"",worksite:"",Saffdata:[],showList:!0,longitude:0,latitude:0,city:""}},components:{vantHeader:T.default},created:function(){this.value1=Number(this.$route.query.ValueId),0==this.value1?this.Section:this.change1(this.value1),this.getUserWorkPointList()},mounted:function(){this.init(),this.getUserMessageData()},methods:{init:function(){this.map=new BMap.Map("container");var t=new BMap.Point(116.404,39.915);this.map.centerAndZoom(t,15),this.map.addControl(new BMap.MapTypeControl({mapTypes:[BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]})),this.map.enableScrollWheelZoom(!0)},activeClassButton:function(){this.Saffdata.length<5?r()("暂无更多数据"):this.activeClassType=!this.activeClassType},change1:function(t){this.Section=0!=t?this.option1[t].text:"",this.option2.splice(1),this.getUserWorkPointList(),this.getUserMessageData(),this.value2=Number(0)},change2:function(t){this.worksite=0!=t?this.option2[t].text.replace("#","%23"):"",this.getUserMessageData()},getUserWorkPointList:function(){var t=this;A.get("/API/WebAPIDataAudit/GetWorkarea?Section="+this.Section).then(function(e){if(0!=e.data.result)if(1!=e.data.result);else{for(var a in e.data.data)null!=e.data.data[a].WORKAREA&&t.option2.push({text:e.data.data[a].WORKAREA,value:Number(a)});t.disabledSection=!1}else t.disabledSection=!0})},getUserMessageData:function(){var t=this,e=this;A.get("/API/WebAPIDataAudit/getUserMessage?Section="+this.Section+"&worksite="+this.worksite).then(function(i){if(200==i.status){if(0==i.data.result)return t.showList=!0,void t.init();if(1==i.data.result){t.showList=!1;var s=i.data.data;e.Saffdata=s;for(var n=[],o=0;o<s.length;o++)null!=s[o].PHOTOURL&&(s[o].PHOTOURL=A.http+s[o].PHOTOURL.slice(2)),s[o].LONGITUDE&&s[o].LATITUDE&&n.push(new BMap.Point(s[o].LONGITUDE,s[o].LATITUDE));console.log("points：",n);var l=new BMap.Convertor;return console.log("convertor",l),void l.translate(n,1,5,function(t){if(t.status=0,console.log(t,t.points=n),0===t.status)for(var i=0;i<t.points.length;i++){var s=new BMap.Icon(a("y6Rf"),new BMap.Size(24,25),{anchor:new BMap.Size(24,25),offset:new BMap.Size(24,25),imageSize:new BMap.Size(24,25)}),o=new BMap.Marker(t.points[i],{icon:s,rotation:0,title:"awdawa"});e.map.addOverlay(o),e.map.setCenter(t.points[i])}})}}})},showUserDetails:function(t){t.LATITUDE&&t.LONGITUDE?(sessionStorage.setItem("userInfor",s()(t)),this.$router.push("/machinePositioning_X")):r.a.fail("暂无人员位置信息")}}},U={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"list-container"},[a("div",{staticClass:"l-dropdown"},[a("van-dropdown-menu",[a("van-dropdown-item",{attrs:{id:t.value1,options:t.option1},on:{change:function(e){return t.change1(t.value1)}},model:{value:t.value1,callback:function(e){t.value1=e},expression:"value1"}}),t._v(" "),a("van-dropdown-item",{attrs:{id:t.value2,disabled:t.disabledSection,options:t.option2},on:{change:function(e){return t.change2(t.value2)}},model:{value:t.value2,callback:function(e){t.value2=e},expression:"value2"}})],1)],1),t._v(" "),a("div",{attrs:{id:"container"}}),t._v(" "),a("ul",{directives:[{name:"show",rawName:"v-show",value:!t.activeClassType,expression:"!activeClassType"}],staticClass:"footer_k",class:{activeClass:t.activeClassType}},[a("div",{on:{click:function(e){return t.activeClassButton()}}},[a("van-icon",{staticStyle:{"margin-bottom":"10px","text-align":"center",display:"block"},attrs:{name:"arrow-up",color:"rgba(112, 153, 208, 1)",size:"24px"}})],1),t._v(" "),a("li",{directives:[{name:"show",rawName:"v-show",value:t.showList,expression:"showList"}],staticStyle:{width:"100%","text-align":"center"}},[t._v("暂无人员信息")]),t._v(" "),t._l(t.Saffdata,function(e,i){return i<5?a("li",{directives:[{name:"show",rawName:"v-show",value:!t.showList,expression:"!showList"}],on:{click:function(a){return t.showUserDetails(e)}}},[a("img",{attrs:{src:e.PHOTOURL,alt:""}}),t._v(" "),a("span",{staticStyle:{display:"block"}},[t._v(t._s(e.EXAMNAME))])]):t._e()})],2),t._v(" "),a("transition",{attrs:{name:"van-slide-up"}},[a("ul",{directives:[{name:"show",rawName:"v-show",value:t.activeClassType,expression:"activeClassType"}],staticClass:"footer_k footer_kS",class:{activeClass:t.activeClassType},staticStyle:{overflow:"auto"}},[a("div",{on:{click:function(e){return t.activeClassButton()}}},[a("van-icon",{staticStyle:{"margin-bottom":"10px","text-align":"center",display:"block"},attrs:{name:"arrow-down",color:"rgba(112, 153, 208, 1)",size:"24px"}})],1),t._v(" "),t._l(t.Saffdata,function(e,i){return i>=5?a("li",{staticClass:"position",staticStyle:{width:"100%"},on:{click:function(a){return t.showUserDetails(e)}}},[a("img",{staticStyle:{width:"45px",height:"45x","margin-right":"10px"},attrs:{src:e.PHOTOURL,alt:""}}),t._v(" "),a("span",{staticStyle:{float:"left",margin:"0","line-height":"45px",width:"120px"}},[t._v(t._s(e.EXAMNAME))]),t._v(" "),1==e.STATE?a("span",{staticClass:"status",staticStyle:{"margin-left":"14px","margin-top":"10px",display:"block",float:"left",height:"26px","line-height":"16px"}},[t._v("在职")]):t._e(),t._v(" "),0==e.STATE?a("span",{staticClass:"status",staticStyle:{background:"#B9B9B9","margin-left":"14px","margin-top":"10px",display:"block",float:"left",height:"26px","line-height":"16px"}},[t._v("离职")]):t._e(),t._v(" "),a("span",{staticStyle:{float:"right",margin:"0","line-height":"45px"}},[t._v(t._s(e.WORKTYPE))])]):t._e()})],2)])],1)},staticRenderFns:[]};var L=a("VU/8")(k,U,!1,function(t){a("EbMM")},"data-v-5208c6ac",null);e.default=L.exports},y6Rf:function(t,e,a){t.exports=a.p+"static/img/eimg.4a6cd73.png"}});
//# sourceMappingURL=33.646b80813ad0eaafc1dc.js.map