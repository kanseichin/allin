<template>
	<view class="content_team">
		<div class="no1_content" style="margin-top:0; padding-top:0;">
			<ul v-if="tab_num===1&&baidu_hotNewsList && baidu_hotNewsList.length > 1">
				<li v-for="(list,index) in baidu_hotNewsList" :key="index" @click="gotoDetail(list.word, 'baidu')"><label class="topnum">{{index+1}}</label><span>{{list.word}}</span><a class="c-text c-text-hot" v-if="index<3">热</a></li>
			</ul>
			<ul v-if="tab_num===2&&toutiao_hotNewsList && toutiao_hotNewsList.length > 1">
				<li v-for="(list,index) in toutiao_hotNewsList" :key="index" @click="gotoDetail(list.word, 'toutiao')"><label class="topnum">{{index+1}}</label><span>{{list.word}}</span><a class="c-text c-text-hot" v-if="index<3">热</a></li>
			</ul>
			<ul v-if="tab_num===3&&weibo_hotNewsList && weibo_hotNewsList.length > 1">
				<li v-for="(list,index) in weibo_hotNewsList" :key="index" @click="gotoDetail(list.word, 'weibo')"><label class="topnum">{{index+1}}</label><span>{{list.word}}</span><a class="c-text c-text-hot" v-if="index<3">热</a></li>
			</ul>
			<ul v-if="tab_num===4&&sogou_hotNewsList && sogou_hotNewsList.length > 1">
				<li v-for="(list,index) in sogou_hotNewsList" :key="index" @click="gotoDetail(list.word, 'sogou')"><label class="topnum">{{index+1}}</label><span>{{list.word}}</span><a class="c-text c-text-hot" v-if="index<3">热</a></li>
			</ul>
			<ul v-if="tab_num===5&&zhihu_hotNewsList && zhihu_hotNewsList.length > 1">
				<li v-for="(list,index) in zhihu_hotNewsList" :key="index" @click="gotoDetail(list.word, 'zhihu')"><label class="topnum">{{index+1}}</label><span>{{list.word}}</span><a class="c-text c-text-hot" v-if="index<3">热</a></li>
			</ul>
			<ul v-if="tab_num===6&&bilibili_hotNewsList && bilibili_hotNewsList.length > 1">
				<li v-for="(list,index) in bilibili_hotNewsList" :key="index" @click="gotoDetail(list.url, 'bilibili')"><label class="topnum">{{index+1}}</label><span>{{list.word}}</span><a class="c-text c-text-hot" v-if="index<3">热</a></li>
			</ul>
			<ul v-if="tab_num===7&&douyin_hotNewsList && douyin_hotNewsList.length > 1">
				<li v-for="(list,index) in douyin_hotNewsList" :key="index" @click="gotoDetail(list.word, 'douyin')"><label class="topnum">{{index+1}}</label><span>{{list.word}}</span><a class="c-text c-text-hot" v-if="index<3">热</a></li>
			</ul>
		</div>
		<home ref="Home" :showhome="true"></home>
	</view>
</template>

<script>
	import Vue from 'vue'
	import ApiClient from '../../utils/apiclient'
	import Home from '../components/home.vue'
	export default Vue.extend({
		components: {
			Home
		},
		data() {
			return {
				tab_num: '',
				baidu_hotNewsList: [],
				toutiao_hotNewsList: [],
				weibo_hotNewsList: [],
				sogou_hotNewsList: [],
				zhihu_hotNewsList: [],
				bilibili_hotNewsList: [],
				douyin_hotNewsList: [],
				douban_hotNewsList: []
			}
		},
		methods: {
			get_BaiduHotNews() {
				console.log('get_BaiduHotNews')
				ApiClient.Post('/HSBaseWeb/news/baidu', {
			}).then(e => {
					this.tab_num = 1
					console.log('get_BaiduHotNews', e.data)
					this.baidu_hotNewsList = e.data
				})
				.catch(e => { })
			},
			get_toutiaoHotNews() {
				console.log('get_toutiaoHotNews')
				ApiClient.Post('/HSBaseWeb/news/toutiao', {
			}).then(e => {
					this.tab_num = 2
					this.toutiao_hotNewsList = e.data
				})
				.catch(e => { })
			},
			get_weiboHotNews() {
				console.log('get_weiboHotNews')
				ApiClient.Post('/HSBaseWeb/news/weibo', {
			}).then(e => {
					this.tab_num = 3
					this.weibo_hotNewsList = e.data
				})
				.catch(e => { })
			},
			get_sogouHotNews() {
				console.log('get_sogouHotNews')
				ApiClient.Post('/HSBaseWeb/news/sogou', {
			}).then(e => {
					this.tab_num = 4
					this.sogou_hotNewsList = e.data
				})
				.catch(e => { })
			},
			get_zhihuHotNews() {
				console.log('get_zhihuHotNews')
				ApiClient.Post('/HSBaseWeb/news/zhihu', {
			}).then(e => {
					this.tab_num = 5
					this.zhihu_hotNewsList = e.data
				})
				.catch(e => { })
			},
			get_bilibiliHotNews() {
				console.log('get_bilibiliHotNews')
				ApiClient.Post('/HSBaseWeb/news/bilibili', {
			}).then(e => {
					this.tab_num = 6
					this.bilibili_hotNewsList = e.data
				})
				.catch(e => { })
			},
			get_douyinHotNews() {
				console.log('get_douyinHotNews')
				ApiClient.Post('/HSBaseWeb/news/douyin', {
			}).then(e => {
					this.tab_num = 7
					this.douyin_hotNewsList = e.data
				})
				.catch(e => { })
			},
			gotoDetail(word, urlheader) {
				console.log('encode', encodeURIComponent(word))
				var header = ''
				switch (urlheader) {
					case 'baidu':
						header = 'https://www.baidu.com/s?wd='
						// wx.navigateTo({ url: '/pages/newsDetail/index?url=' + encodeURIComponent(header + '' + word + '') })
						window.open(header + '' + word + '')
						break
					case 'toutiao':
						header = 'https://so.toutiao.com/search?keyword='
						// wx.navigateTo({ url: '/pages/newsDetail/index?url=' + encodeURIComponent(header + '%23' + word + '%23') })
						window.open(header + '%23' + word + '%23')
						break
					case 'weibo':
						header = 'https://m.weibo.cn/search?containerid=231522type%3D1%26q%3D'
						// wx.navigateTo({ url: '/pages/newsDetail/index?url=' + encodeURIComponent(header + '' + word + '') })
						window.open(header + '' + word + '')
						break;
					case 'sogou':
						header = 'https://www.sogou.com/sogou?query='
						// wx.navigateTo({ url: '/pages/newsDetail/index?url=' + encodeURIComponent(header + '' + word + '&ie=utf8&pid=sogou-wsse-721e049e9903c3a7') })
						window.open(header + '' + word + '&ie=utf8&pid=sogou-wsse-721e049e9903c3a7')
						break;
					case 'zhihu':
						header = 'https://www.zhihu.com/search?q='
						// wx.navigateTo({ url: '/pages/newsDetail/index?url=' + encodeURIComponent(header + '' + word + '&type=content') })
						window.open(header + '' + word + '&type=content')
						break;
					case 'bilibili':
						header = 'https://'
						// wx.navigateTo({ url: '/pages/newsDetail/index?url=' + encodeURIComponent(header + '' + word.slice(2) + '') })
						window.open(header + '' + word.slice(2) + '')
						break;
					case 'douyin':
						header = 'https://www.douyin.com/search/'
						// wx.navigateTo({ url: '/pages/newsDetail/index?url=' + encodeURIComponent(header + '' + word + '') })
						window.open(header + '' + word + '')
						break;
				}
			},
		},
		onLoad(options) {
			this.tab_num = options.tabnum
			switch (this.tab_num) {
				case '1':
					this.get_BaiduHotNews()
					break
				case '2':
					this.get_toutiaoHotNews()
					break
				case '3':
					this.get_weiboHotNews()
					break
				case '4':
					this.get_sogouHotNews()
					break
				case '5':
					this.get_zhihuHotNews()
					break
				case '6':
					this.get_bilibiliHotNews()
					break
				case '7':
					this.get_douyinHotNews()
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
