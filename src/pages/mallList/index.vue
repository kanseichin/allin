<template>
    <view class="content_team">
		<div class="no1_content" style="margin-top:0; padding-top:0;">
			<ul v-if="tab_num===1&&taobao_hotNewsList && taobao_hotNewsList.length > 1">
				<li v-for="(list,index) in taobao_hotNewsList" :key="index" @click="gotoDetail(list.url, 'taobao')"><label class="topnum">{{index+1}}</label><span>{{list.word}}</span><a class="c-text c-text-hot" v-if="index<3">热</a></li>
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
				taobao_hotNewsList: []
			}
		},
		methods: {
			get_taobaoHotNews() {
				console.log('get_taobaoHotNews')
				ApiClient.Post('/HSBaseWeb/mall/taobao', {
			}).then(e => {
					this.tab_num = 1
					this.taobao_hotNewsList = e.data
				})
				.catch(e => { })
			},
			gotoDetail(word, urlheader) {
				console.log('gotoDetail_mall', word)
				var header = ''
				switch (urlheader) {
					case 'taobao':
						header = ''
						window.location.href = header + '' + word + ''
						break;
				}
			}
		},
		onLoad(options) {
			this.tab_num = options.tabnum
			switch (this.tab_num) {
				case '1':
					this.get_taobaoHotNews()
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
