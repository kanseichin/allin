<template>
    <view class="content_team">
		<div class="no1_yunbook">
			<ul v-if="tab_num===2&&yunbook_List && yunbook_List.length > 1">
				<li v-for="(list,index) in yunbook_List" :key="index" @click="gotoDetail(list, 'biqugekey')">
					<div class="b_title">{{list}}</div>
					<div class="b_div">
						<img src="https://www.quge7.com/bookimg/3563.jpg" />
						<div>
							<p class="b_text">榜一书本</p>
							<p class="b_text">榜二书本</p>
							<p class="b_text">榜三书本</p>
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
				yunbook_List: []
			}
		},
		methods: {
			get_yunbookHotNews() {
				console.log('get_yunbookHotNews')
				ApiClient.Post('/HSBaseWeb/book/biqugekey', {
			}).then(e => {
					this.tab_num = 2
					this.yunbook_List = e.data
				})
				.catch(e => { })
			},
			gotoDetail(word, urlheader) {
				console.log('gotoDetail_book', word)
				var header = ''
				switch (urlheader) {
					case 'biqugekey':
						this.tab_num = 2
						wx.navigateTo({ url: '/pages/yunbookList/index?tabnum=' + this.tab_num + '&name=' + word })
						break;
				}
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
