<template>
    <view class="content_team">
		<div class="no1_content" style="margin-top:0; padding-top:0;">
			<ul v-if="tab_num===1&&weixinbook_hotNewsList && weixinbook_hotNewsList.length > 1">
				<li v-for="(list,index) in weixinbook_hotNewsList" :key="index" @click="gotoDetail(list.url, 'weixinbook')"><label class="topnum">{{index+1}}</label><span>{{list.word}}</span><a class="c-text c-text-hot" v-if="index<3">热</a></li>
			</ul>
		</div>
		<home ref="Home" :showhome="true"></home>
    </view>
</template>

<script>
import Vue from 'vue'
import ApiClient from '../../utils/apiclient'
import Home from '../components/home.vue'
export default ({
		components: {
			Home
		},
		data() {
			return {
				tab_num: '',
				weixinbook_hotNewsList: []
			}
		},
		methods: {
			get_weixinbookHotNews() {
				console.log('get_weixinbookHotNews')
				ApiClient.Post('/HSBaseWeb/book/weixinbook', {
			}).then(e => {
					this.tab_num = 1
					this.weixinbook_hotNewsList = e.data
				})
				.catch(e => { })
			},
			gotoDetail(word, urlheader) {
				console.log('gotoDetail_book', word)
				var header = ''
				switch (urlheader) {
					case 'weixinbook':
						header = 'https://weread.qq.com'
						window.open(header + '' + word + '')
						break;
				}
			}
		},
		onLoad(options) {
			this.tab_num = options.tabnum
			switch (this.tab_num) {
				case '1':
					this.get_weixinbookHotNews()
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
