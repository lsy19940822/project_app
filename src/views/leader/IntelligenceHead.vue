<template>
	<div class="container">
		<vant-header :leftArrow="true" :titleType="1" :title="questionText" :rightType="2">
			<div slot='right_slot'>
				<p class="header-right">
					<van-button color="rgba(89,95,115,1) " size="normal" style='position: absolute;
						top: -22px;
						right: 0px;
						width: 60px;
						height: 26px;
						line-height: 26px;'>确认</van-button>
				</p>
	        </div>
	</vant-header>
    <van-search placeholder="请输入负责人" v-model="value" />
	<div class="containers-bar overflow" style="position: relative;">
		<van-icon name="search" style='position: absolute;right:20px;top:2px' @click='searchButton()' />
		<van-index-bar :sticky='true' :sticky-offset-top='46' :index-list="indexlist">
			<div v-for="(item,index) in NameArrS">
				<van-index-anchor :index="item.letter" />
				<van-cell v-for="(items,index) in item.data" class='vanCell' :CERTNUMBR="items.CERTNUMBR" :key="items.CERTNUMBR">
					 <van-radio-group v-model="radio" style='float: left;margin: 10px 10px 0 0 '>
					   <van-radio :name="items"></van-radio>
					 </van-radio-group>
					<img :src="items.PHOTOURL" alt="" :CERTNUMBR="items.CERTNUMBR"> 
					<span :CERTNUMBR="items.CERTNUMBR">{{items.EXAMNAME}}</span>
					<span :CERTNUMBR="items.CERTNUMBR">{{items.WORKTYPE}}</span>
				</van-cell>
			</div>
		</van-index-bar>
	</div>
	</div>

</template>

<script>
	import vantHeader from '@/components/header.vue'
	import studyFooter from '@/components/studyFooter.vue'

	import * as ajax from '@/utils/api'
	import Vue from 'vue';
	import { RadioGroup, Radio } from 'vant';
	import { Search } from 'vant';
	
	Vue.use(Search);
	Vue.use(RadioGroup);
	Vue.use(Radio);
	import {
		Icon,
		IndexBar,
		IndexAnchor
	} from 'vant';
	Vue.use(IndexBar).use(IndexAnchor).use(Icon);
	import {
		Row,
		Col,
		Progress,
		DropdownMenu,
		DropdownItem,
		Cell,
		Loading,
		Tab,
		Tabs,
		Button
	} from 'vant';

	Vue.use(Progress).use(Button).use(Row).use(Col).use(DropdownMenu).use(DropdownItem).use(Cell).use(Loading).use(Tabs).use(Tab);

	export default {
		components: {
			vantHeader,
			studyFooter
		},
		data() {
			return {
				questionText: "指派负责人",
				radio: '',
				value:'',
				isLoading: true,
				TypeWork: '', //工种
				Unit: '', //单位
				Section: '', //所在标段
				NameArrS: [],
				examRecord: [],
				// 1.1.1.获取全部人员数量参数
				BD: "",
				GD: "",
			}
		},
		created() {

		},
		mounted() {
			this.StaffRetrieveList();
			this.drawLineMothes();

		},
		computed: {
			indexlist() {
				return this.NameArrS.map(function(i) {
					return i.letter.toUpperCase();
				})
			}
		},
		methods: {
			drawLineMothes() {},
			searchButton() {
				// ajax.get('getUserTypeNumber?BD=' + this.BD + '&GD=' + this.GD).then(res => {
				// 	if (res.data.result) {
				// 		console.log("1.1.3.获取每个工种类别下的人员数量", res)
				// 		this.StaffRetrieveList();
				// 	}
				// })
			},
			StaffRetrieveList() {

				ajax.getW('/api/safety/selectUserList').then(res => {

					if(res.data.result) {
						console.log("3.查询系统用户列表 用于指定负责人及工人",res)
					}
				})
				ajax.get('/API/WebAPIDataAudit/StaffRetrieve?Section=' + this.Section + '&Unit=' + this.Unit + '&TypeWork=' + this.TypeWork).then(res => {

					if (res.data.result) {

						let NameArr = []


						for (let k in res.data.data) {
							if (res.data.data[k].PHOTOURL != null) {
								res.data.data[k].PHOTOURL = ajax.http + res.data.data[k].PHOTOURL.slice(2)
							}
							NameArr.push(res.data.data[k])
						}
						this.pySegSort(NameArr)
					}
				})
			},
			pySegSort(arr) {
				if (!String.prototype.localeCompare)
					return null;

				var letters = "*abcdefghjklmnopqrstwxyz".split('');
				var zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('');

				var segs = [];
				var curr;
				letters.forEach(function(item, i) {
					curr = {
						letter: item.toUpperCase(),
						data: []
					};
					arr.forEach(function(item2) {
						if ((!zh[i - 1] || zh[i - 1].localeCompare(item2.EXAMNAME) <= 0) && item2.EXAMNAME.localeCompare(zh[i]) == -1) {
							curr.data.push(item2);
						}
					});
					if (curr.data.length) {
						segs.push(curr);
						curr.data.sort(function(a, b) {
							return a.EXAMNAME.localeCompare(b);
						});
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

	.container {
		padding-top: 46px;
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
