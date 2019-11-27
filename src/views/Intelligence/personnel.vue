<template>
	<div>
		<div class="containers overflow">
			<div class="container_header overflow">
				<van-dropdown-menu class='Intelligence-dropdown'>
					<van-dropdown-item v-model="value1" :options="option1" class='' @change="change1(value1)" />
					<van-dropdown-item v-model="value2" :options="option2" class='' :disabled="disabledSection"  @change="change2(value2)" />
					<van-dropdown-item v-model="value3" :options="option3" class='' :disabled="disabledUnit"@change="change3(value3)" />
				</van-dropdown-menu>
			</div>
		</div>
        <div class="flase" v-show="!show" style="text-align:center;padding:20px;font-size: 14px;color: #ddd;">暂无人员</div>	
		<div class="containers-bar overflow" style="position: relative;" v-show="show">
			
			<!--<van-icon name="search" style='position: absolute;right:20px;top:2px' @click='searchButton()' />-->
			<van-index-bar :sticky='true' :sticky-offset-top='46' :index-list="indexlist">
				<div v-for="(item,index) in NameArrS">
					<van-index-anchor :index="item.letter" />
					<van-cell v-for="(items,index) in item.data" class='vanCell' :CERTNUMBR="items.CERTNUMBR" :key="items.CERTNUMBR" @click="$router.push({path:'/information?IDCard='+items.CERTNUMBR})">
						<img :src="items.PHOTOURL" alt="" :CERTNUMBR="items.CERTNUMBR" @click="$router.push({path:'/information?IDCard='+items.CERTNUMBR})">
						<span :CERTNUMBR="items.CERTNUMBR" @click="$router.push({path:'/information?IDCard='+items.CERTNUMBR})">{{items.EXAMNAME}}</span>
						<span :CERTNUMBR="items.CERTNUMBR" @click="$router.push({path:'/information?IDCard='+items.CERTNUMBR})">{{items.WORKTYPE}}</span>
					</van-cell>
				</div>
			</van-index-bar>
		</div>
	</div>
</template>

<script>
	import * as ajax from '@/utils/api'
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
				option3: [{ text: '全部工种', value: 0},],

				TypeWork: '',
				Unit: '',
				Section: '',
				NameArrS: [],
				
				BD: "",
				GD: "",
				show:true
			}
		},
		created() {
           this.getCompanyList()
		   this.StaffRetrieveList();
		   this.GetWorkTypeList()
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
				this.option2.splice(1);
				this.option3.splice(1);
				
					// this.option2[0].text='全部单位'
				
				// this.Section= '';
				this.getCompanyList();
				this.searchButton(); 
				this.StaffRetrieveList();
				this.GetWorkTypeList()
			},
			change2(val) {
				this.Unit = this.option2[val].text
				console.log("当前单位：", val,this.Unit)
				this.option3.splice(1);
				this.getCompanyList();
				this.searchButton(); 
				this.StaffRetrieveList();
				this.GetWorkTypeList();
				
			},
			change3(val) {
				this.TypeWork = this.option3[val].text
				console.log("当前工种：",val, this.TypeWork)
				if(this.TypeWork == "全部工种"){
				}
				this.searchButton();
				this.StaffRetrieveList();
				// this.GetWorkTypeList();
			},
			getCompanyList(){
				// 1.1.1.根据标段查单位
				if(this.Section== '全部标段'){
					this.Section= '';
					
				}
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
				// 1.1.2.根据单位查工种
				// if(this.disabledSection == true){
					
				// }
				
			},
			GetWorkTypeList(){
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
						return;
					}
					
				})
			},
			searchButton() {
				console.log("当前标段：", this.Section, "当前单位：", this.Unit, "当前工种：", this.TypeWork)
				if(this.Section== '全部标段' || this.Unit == '全部单位' || this.TypeWork == '全部工种'){
					this.Section="";
					this.Unit='';
					this.TypeWork='';
					
				}
				ajax.get('/API/WebAPIDataAudit/StaffRetrieve?Section=' + this.Section + '&Unit=' + this.Unit + '&TypeWork=' + this.TypeWork).then(res => {

					if(res.data.result) {

						let NameArr = []

						console.log('StaffRetrieve:', res.data.data)
						for(let k in res.data.data) {
							if(res.data.data[k].PHOTOURL != null) {
								res.data.data[k].PHOTOURL = ajax.http + res.data.data[k].PHOTOURL.slice(2)
							}
							NameArr.push(res.data.data[k])
						}
						this.pySegSort(NameArr)
						return;
					}
					// Toast(res.data.resultMsg || '查询失败，请重试！');
				})
			},
			// 全部员工
			StaffRetrieveList() {
                if(this.Section== '全部标段' || this.Unit == '全部单位' || this.TypeWork == '全部工种'){
					this.Section="";
					this.Unit='';
					this.TypeWork='';
				}
				ajax.get('/API/WebAPIDataAudit/StaffRetrieve?Section=' + this.Section + '&Unit=' + this.Unit + '&TypeWork=' + this.TypeWork).then(res => {
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
                    		NameArr.push(res.data.data[k])
                    	}
                    	this.pySegSort(NameArr)
                    	return;
                    }
				})
			},
			pySegSort(arr) {
				if(!String.prototype.localeCompare)
					return null;

				var letters = "*abcdefghjklmnopqrstwxyz".split('');
				// "妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀
				var zh = "阿八嚓哒额发高哈及咔垃马拏噢妑七呥扨它穵夕丫帀".split('');
				var segs = [];
				var curr;
				letters.forEach(function(item, i) {
					curr = {
						letter: item.toUpperCase(),
						data: []
					};
					
					arr.forEach(function(item2) {
						if((!zh[i - 1] || zh[i - 1].localeCompare(item2.EXAMNAME) <= 0) && item2.EXAMNAME.localeCompare(zh[i]) == -1) {
							curr.data.push(item2);
						}
					});
					if(curr.data.length) {
						segs.push(curr);
						curr.data.sort(function(a, b) {
							return a.EXAMNAME.localeCompare(b);
						});
						console.log("curr====",curr)
					}
					
				});
				this.NameArrS = segs;

				return this.NameArrS;

			}
		}
	}
</script>

<style scoped>
	/* .van-dropdown-menu{
	    width: 90%;
	    margin: 0 auto;
	} */
	
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
		margin-top: 90px;
	}
	
	/deep/.containers-bar .van-index-anchor {
		height: 20px;
		line-height: 20px;
	}
</style>