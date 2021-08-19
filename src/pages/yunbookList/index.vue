<template>
    <view class="content_team">
		<div class="no1_content" style="margin-top:0; padding-top:0;">
			<ul v-if="tab_num===2&&yunbook_List && yunbook_List.length > 1">
				<li v-for="(list,index) in yunbook_List" :key="index" @click="gotoDetail(list.word, 'biqugekey')"><label class="topnum">{{index+1}}</label><span>{{list.word}}</span><a class="c-text c-text-hot" v-if="index<3">热</a></li>
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
				yunbook_List: []
			}
		},
		methods: {
			get_yunbookHotNews(word) {
				console.log('get_yunbookHotNews')
				ApiClient.Post('/HSBaseWeb/book/biqugebook', {
					'key': word
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
						header = 'https://www.quge7.com/s?q='
						window.open(header + '' + word + '')
						break;
				}
			}
		},
		onLoad(options) {
			this.tab_num = options.tabnum
			switch (this.tab_num) {
				case '2':
					this.get_yunbookHotNews(options.name)
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
