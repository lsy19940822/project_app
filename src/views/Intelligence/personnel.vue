<template>
	<div>
		<div class="containers overflow">
			<div class="container_header overflow" style="display: flex;">
				<van-dropdown-menu class='Intelligence-dropdown' style="width:103px;float: left;">
					<van-dropdown-item v-model="value1" :options="option1" class='' @change="change1(value1)" />
				</van-dropdown-menu>
				<div class="van_icon"  style="width:20px;float: left;text-align: center;line-height: 50px;"><van-icon name="arrow"/></div>
				
				<van-dropdown-menu class='Intelligence-dropdown' style="width:103px;float: left;">
					<van-dropdown-item v-model="value4" :options="option4" class='' :disabled="disabledSection" @change="change4(value4)"/>
				</van-dropdown-menu>
				<div class="van_icon"  style="width:20px;float: left;text-align: center;line-height: 50px;"><van-icon name="arrow"/></div>
				<van-dropdown-menu class='Intelligence-dropdown' style="width:103px;float: left;">
					<van-dropdown-item v-model="value2" :options="option2" class='' :disabled="disabledSection"  @change="change2(value2)" />
				</van-dropdown-menu>
				<div class="van_icon"  style="width:20px;float: left;text-align: center;line-height: 50px;"><van-icon name="arrow"/></div>
				<van-dropdown-menu class='Intelligence-dropdown' style="width:103px;float: left;">
					<van-dropdown-item v-model="value3" :options="option3" class='' :disabled="disabledUnit"@change="change3(value3)" />
				</van-dropdown-menu>
			</div>
		</div>
        <div class="flase" v-show="!show" style="text-align:center;padding:20px;font-size: 14px;color: #ddd;">暂无人员</div>	
		<div class="containers-bar overflow" style="position: relative;" v-show="show">
			<van-index-bar :sticky='true' :sticky-offset-top='46' :index-list="indexlist">
				<div v-for="(item,index) in NameArrS">
					<ul class="peploneList">
						<li>
							<van-index-anchor :index="item.letter" />
							<van-cell v-for="(items,index) in item.data" class='vanCell' :CERTNUMBR="items.CERTNUMBR" :key="items.CERTNUMBR" @click="$router.push({path:'/information?IDCard='+items.CERTNUMBR})">
								<img :src="items.PHOTOURL" alt="" :CERTNUMBR="items.CERTNUMBR" @click="$router.push({path:'/information?IDCard='+items.CERTNUMBR})">
								<span :CERTNUMBR="items.CERTNUMBR" @click="$router.push({path:'/information?IDCard='+items.CERTNUMBR})">{{items.EXAMNAME}}</span>
								<span :CERTNUMBR="items.CERTNUMBR" @click="$router.push({path:'/information?IDCard='+items.CERTNUMBR})">{{items.WORKTYPE}}</span>
							</van-cell>
						</li>
					</ul>
				</div>
			</van-index-bar>
		</div>
	</div>
</template>

<script>
	import * as ajax from '@/utils/api'
	import pyjs from 'js-pinyin'
	import Vue from 'vue';
	import { Icon, IndexBar, IndexAnchor, Row, Col, Progress, DropdownMenu, DropdownItem, Cell, Loading, Tab, Tabs, Toast } from 'vant';

	Vue.use(Progress).use(Toast).use(Row).use(Col).use(DropdownMenu).use(DropdownItem).use(Cell).use(Loading).use(Tabs).use(Tab).use(IndexBar).use(IndexAnchor).use(Icon);

	export default {
		components: {},
		data() {
			return {
				disabledSection:false,
				disabledUnit:false,
				value1: 0,
				value2: 0,
				value3: 0,
				value4: 0,
				option1: [
					{ text: '全部标段', value:0},
					{ text: 'CYCZQ-1标', value: 1},
					{ text: 'CYCZQ-2标', value: 2},
					{ text: 'CYCZQ-3标', value: 3},
					{ text: 'CYCZQ-4标', value: 4},
					{ text: 'CYCZQ-5标1', value: 5},
					{ text: 'CYCZQ-5标2', value: 6},
					{ text: 'CYCZQ-6标', value: 7},
				],
				option2: [{ text: '全部单位', value:0},],
				option3: [{ text: '全部工种', value:0},],
                option4: [{ text: '全部工区', value:0},],
				TypeWork: '',
				Unit: '',
				Section: '',
				NameArrS: [],
				
				BD: "",
				GD: "",
				show:true,
				GetWork:""
				
			}
		},
		created() {
           this.getCompanyList()
		   this.StaffRetrieveList();
		   this.GetWorkTypeList();
		   this.GetWorkareaList()
		},
		mounted() {
		},
		computed: {
			indexlist() {
				return this.NameArrS.map(function(i) {
					return i.letter.toUpperCase();
				})
			}
		},
		methods: {
			change1(val) {
				this.Section = this.option1[val].text
				console.log("当前标段：", this.Section);
				if(this.TypeWork != '' || this.Unit != ''){
					this.TypeWork = '';
					this.Unit = '';
					this.value2 = Number(0);
					this.value3 = Number(0);
					this.value4 = Number(0);
				}
				this.option2.splice(1);
				this.option3.splice(1);
				this.option3.splice(1);
				this.StaffRetrieveList();
				this.getCompanyList()
				this.GetWorkTypeList();
			},
			change4(val) {
				this.GetWork = this.option4[val].text.replace("#", "%23")
				console.log("当前工区：", val,this.GetWork)
				if(this.TypeWork != ''){
					this.TypeWork = '';
					this.value3 = Number(0);
					return
				}
				if(this.GetWork== '全部工区'){
					this.GetWork='';
				}
				this.option3.splice(1);
				this.StaffRetrieveList();
				this.GetWorkTypeList();
			},
			change2(val) {
				this.Unit = this.option2[val].text
				console.log("当前单位：", val,this.Unit)
				if(this.TypeWork != ''){
					this.TypeWork = '';
					this.value3 = Number(0);
					return
				}
				if(this.Unit== '全部单位'){
					this.Unit='';
				}
				this.option3.splice(1);
				this.StaffRetrieveList();
				this.getCompanyList()
				this.GetWorkTypeList();
				
			},
			change3(val) {
				this.TypeWork = this.option3[val].text
				console.log("当前工种：",val, this.TypeWork)
				console.log(this.Unit)
				if(this.Section != '' || this.Unit!= '' || this.GetWork!= ''){
					this.Section=this.Section;
					this.Unit=this.Unit;
					this.GetWork=this.GetWork;
				}
				if(this.TypeWork== '全部工种'){
					this.TypeWork='';
				}
				this.StaffRetrieveList();
			},
			StaffRetrieveList() {//列表与查询
				if(this.Section== '全部标段' && this.Unit == '全部单位' && this.TypeWork == '全部工种'&& this.GetWork == '全部工区'){
					this.Section='';
					this.Unit='';
					this.TypeWork='';
					this.GetWork='';
					return;
				}
				console.log('StaffRetrieveList:',this.Unit)
				ajax.get('/API/WebAPIDataAudit/StaffRetrieve?Section=' + this.Section + '&Unit=' + this.Unit + '&TypeWork=' + this.TypeWork+'&Workarea=' + this.GetWork).then(res => {
			        if(res.data.result == false){
			        	this.show=false;
			        	return;
			        }
			        if(res.data.result == true){
			        	let NameArr = []
			        	this.show=true;
			        	for(let k in res.data.data) {
			        		if(res.data.data[k].PHOTOURL != null) {
			        			res.data.data[k].PHOTOURL = ajax.http + res.data.data[k].PHOTOURL.slice(2)
			        		}
							//遍历数组,拿到名称
							let Name = res.data.data[k].EXAMNAME;
							//取全部名称的首字母
							// getFullChars()：获取字符串全部拼音，并且首字母大写；
							// getCamelChars() ： 获取字符串拼音首字母，并大写；
							let fristName = pyjs.getCamelChars(Name).substring(0, 1);//这里截取首字母的第一位
							res.data.data[k].first = fristName;
			        		NameArr.push(res.data.data[k])
			        	}
			        	this.pySegSort(NameArr)
			        	return;
			        }
				})
			},
			pySegSort(arr) {//人员字母排序
				let _this = this;
				let FristPin=["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"]
				let segs = [];
				let curr;
				let cityJson={}
				for (let item in FristPin) {
				 	curr = {
				 		letter: FristPin[item],
				 		data: []
				 	};
				 	for (let item2 in arr) {
				 	 	if(FristPin[item] == arr[item2].first){
				 	 		curr.data.push(arr[item2]);
				 	 	}
					}
					if(curr.data.length) {
						segs.push(curr);
					}
				 	
				};
				this.NameArrS = segs;
				console.log("NameArrS:",this.NameArrS)
				return this.NameArrS;
			},
			getCompanyList(){
				// 1.1.1.根据标段查单位
				if(this.Section== '全部标段'){this.Section= ''}
				ajax.get('/API/WebAPIDataAudit/getCompany?Section='+this.Section).then(res => {
					if(res.data.result == false){
						this.disabledSection=true;
						if(this.disabledSection==true){
							this.disabledUnit=true;
							return;
						}
						return;
					}
					if(res.data.result == true){
						for(let k in res.data.data) {
							if(res.data.data[k].COMPANY != null){
								this.option2.push({
									text:res.data.data[k].COMPANY,
									value:Number(k)+Number(1)
								})
							}
						}
						this.disabledSection=false;
						if(this.disabledSection==false){
							this.disabledUnit=false;
							return;
						}
						
						return;
					}
				})
			},
			GetWorkTypeList(){// 1.1.1.根据单位查工中
			    if(this.Unit == ""){
				    ajax.get('/API/WebAPIDataAudit/GetWorkType?Unit='+this.Unit).then(res => {
						if(res.data.result == false){
							this.disabledUnit=true;
						}
						if(res.data.result == true){
							for(let k in res.data.data) {
								if(res.data.data[k].WORKTYPE != null){
									this.option3.push({
										text:res.data.data[k].WORKTYPE,
										value:Number(k)+Number(1)
									})
								}
							}
							console.log(this.option3)
							return;
						}
				    })
					return;
			    }
				if(this.Unit != ""){
				    ajax.get('/API/WebAPIDataAudit/GetWorkType?Unit='+this.Unit).then(res => {
						if(res.data.result == false){
							this.disabledUnit=true;
						}
						if(res.data.result == true){
							for(let k in res.data.data) {
								if(res.data.data[k].WORKTYPE != null){
									this.option3.push({
										text:res.data.data[k].WORKTYPE,
										value:Number(k)+Number(1)
									})
								}
							}
							console.log(this.option3)
							return;
						}
				    })
					return;
				}
			},
			GetWorkareaList(){// 1.1.1.根据单位查工区
			    if(this.Unit == ""){
				    ajax.get('/API/WebAPIDataAudit/GetWorkarea?Section='+this.Section).then(res => {
						if(res.data.result == false){
							this.disabledUnit=true;
						}
						if(res.data.result == true){
							for(let k in res.data.data) {
								if(res.data.data[k].WORKAREA != null){
									this.option4.push({
										text:res.data.data[k].WORKAREA,
										value:Number(k)
									})
								}
							}
							console.log(this.option4)
							return;
						}
				    })
					return;
			    }
				if(this.Unit != ""){
				    ajax.get('/API/WebAPIDataAudit/GetWorkarea?Section='+this.Section).then(res => {
						if(res.data.result == false){
							this.disabledUnit=true;
						}
						if(res.data.result == true){
							for(let k in res.data.data) {
								if(res.data.data[k].WORKAREA != null){
									this.option4.push({
										text:res.data.data[k].WORKAREA,
										value:Number(k)
									})
								}
							}
							console.log(this.option4)
							return;
						}
				    })
					return;
				}
			}
		}
	}
</script>

<style scoped>
	/* .van-dropdown-menu{
	    width: 90%;
	    margin: 0 auto;
	} */
	/deep/
	.van-ellipsis{
		width:60px !important;
	}
	.container_nav {
		height: auto;
		overflow: hidden;
		border-bottom: 1px solid rgba(238, 238, 238, 1);
		padding: 16px;
		background: #fff;
	}
	
	.l-dropdown {
		padding: 10px 0;
		background: #fff;
	}
	
	.vanCell img {
		width: 27px;
		height: 38px;
		border: 1px solid #ddd;
		border-radius: 5px;
		background: #f2f2f2;
		display: block;
		float: left;
		margin-right: 10px;
	}
	
	.vanCell span {
		display: block;
		float: left;
		line-height: 38px;
	}
	
	.vanCell span:last-child {
		/* width: ; */
		display: block;
		float: right;
		line-height: 38px;
		margin-right: 10%;
		text-align: right;
	}
	
	.van-nav-bar .van-icon {
		font-size: 18px;
		color: #fff;
	}
	
	.header-right {
		line-height: 5px;
		color: #fff;
	}
	
	.containers {
		background: #fff;
		padding: 12px;
		border-bottom: 1px solid #ddd
	}
	
	/deep/ .van-tabs__line {
		background-color: #9499AA;
		width: 50% !important;
	}
	
	/deep/.containers-bar .van-index-bar__sidebar {
		margin-top: 75px;
		margin-right:10px;
	}
	/deep/
	.containers-bar .van-index-bar__sidebar span{
		margin-bottom: 6px;
	}
	/deep/.containers-bar .van-index-anchor {
		height: 20px;
		line-height: 20px;
	}
</style>