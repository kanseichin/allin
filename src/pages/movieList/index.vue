<template>
    <view class="content_team">
		<div class="no1_content" style="margin-top:0; padding-top:0;">
			<ul v-if="tab_num===1&&douban_hotNewsList && douban_hotNewsList.length > 1">
				<li v-for="(list,index) in douban_hotNewsList" :key="index" @click="gotoDetail(list.url, 'douban')"><label class="topnum">{{index+1}}</label><span>{{list.word}}</span><a class="c-text c-text-hot" v-if="index<3">热</a></li>
			</ul>
			<ul v-if="tab_num===2&&yugao_hotNewsList && yugao_hotNewsList.length > 1">
				<li v-for="(list,index) in yugao_hotNewsList" :key="index" @click="gotoDetail(list.url, 'yugao')"><label class="topnum">{{index+1}}</label><span>{{list.word}}</span><a class="c-text c-text-hot" v-if="index<3">热</a></li>
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
				douban_hotNewsList: [],
				yugao_hotNewsList: []
			}
		},
		methods: {
			get_doubanHotNews() {
				console.log('get_doubanHotNews')
				ApiClient.Post('/HSBaseWeb/media/douban', {
			}).then(e => {
					this.tab_num = 1
					this.douban_hotNewsList = e.data
				})
				.catch(e => { })
			},
			get_yugaoHotNews() {
				console.log('get_yugaoHotNews')
				ApiClient.Post('/HSBaseWeb/media/yugao', {
			}).then(e => {
					this.tab_num = 2
					this.yugao_hotNewsList = e.data
				})
				.catch(e => { })
			},
			gotoDetail(word, urlheader) {
				console.log('gotoDetail_movie', word)
				var header = ''
				switch (urlheader) {
					case 'douban':
						header = ''
						window.open(header + '' + word + '')
						break;
					case 'yugao':
						header = 'https://www.yugaopian.cn'
						window.open(header + '' + word + '')
						break;
				}
			}
		},
		onLoad(options) {
			this.tab_num = options.tabnum
			switch (this.tab_num) {
				case '1':
					this.get_doubanHotNews()
					break
				case '2':
					this.get_yugaoHotNews()
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
