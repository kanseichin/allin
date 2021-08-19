<template>
    <view class="content_team">
		<div class="search_div"><input type="text" placeholder="输入关键字" class="search_input" maxlength="30" :focus="searchfocus" v-model="searchword" @keydown.enter.native="gotoSearch" /><a class="search_clear" @click="searchClear"></a></div>
		<div class="no1_yunbook">
			<ul v-if="tab_num===2&&yunbook_List && yunbook_List.length > 1">
				<!-- <li v-for="(list,index) in yunbook_List" :key="index" @click="gotoDetail(list, 'biqugekey')">
					<div class="b_title">{{list}}</div>
					<div class="b_div">
						<img src="https://www.quge7.com/bookimg/3563.jpg" />
						<div>
							<p class="b_text">榜一书本</p>
							<p class="b_text">榜二书本</p>
							<p class="b_text">榜三书本</p>
						</div>
					</div>
				</li> -->
				<li v-for="(list,index) in yunbook_List" :key="index" @click="gotoDetail(list, 'biqugekey')">
					<div class="b_div">
						<img :src="'./static/fruits/'+'f_'+(index+1)+'.png'" />
						<div>
							<p class="b_text">{{list}}</p>
						</div>
					</div>
				</li>
			</ul>
		</div>
    </view>
</template>

<script>
import Vue from 'vue'
import ApiClient from '../../utils/apiclient'
export default ({
		data() {
			return {
				tab_num: '',
				yunbook_List: [],
				searchword: '',
				searchfocus: false
			}
		},
		methods: {
			get_yunbookHotNews() {
				ApiClient.Post('/HSBaseWeb/book/biqugekey', {
			}).then(e => {
					this.tab_num = 2
					this.yunbook_List = e.data
				})
				.catch(e => { })
			},
			gotoDetail(word, urlheader) {
				var header = ''
				switch (urlheader) {
					case 'biqugekey':
						this.tab_num = 2
						wx.navigateTo({ url: '/pages/yunbookList/index?tabnum=' + this.tab_num + '&name=' + word })
						break;
				}
			},
			gotoSearch() {
				console.log('gotoSearch')
				if(this.searchword) {
					console.log('gotoSearch1')
					var header = ''
					header = 'https://www.quge7.com/s?q='
					window.open(header + '' + this.searchword + '')
				}
			},
			searchClear() {
				this.searchword = ''
				this.searchfocus = true
			}
		},
		onLoad(options) {
			this.tab_num = options.tabnum
			switch (this.tab_num) {
				case '2':
					this.get_yunbookHotNews()
					break
			}
			wx.setNavigationBarTitle({
				title: options.name  //修改title
			})
		}
	});
</script>

<style>
</style>
