<template>
	<view class="content_team padding30">
		<p class="tools_p">新闻热搜</p>
		<ul class="news_cao">
			<li v-for="(item,index) in newslist" :key="index" @click="gotoNews(item.tabnum, item.name)">
				<image class="ico1" :src="'/static/' + item.url"></image>
				<p>{{item.name}}</p>
			</li>
		</ul>
		<cctv-list ref="CctvList"></cctv-list>
		<movie ref="Movie"></movie>
		<game-list ref="GameList"></game-list>
	</view>
</template>

<script>
	import Vue from 'vue'
	import ApiClient from '../../utils/apiclient'
	import CctvList from '../components/cctvList.vue';
	import GameList from '../components/gameList.vue'
	import Movie from '../components/movie.vue'

	export default Vue.extend({
  		components: {
				GameList,
				Movie,
				CctvList
			},
		data() {
			return {
				newslist: [{
						url: 'ico_baidu.png',
						name: '百度',
						tabnum: 1
					}, {
						url: 'ico_toutiao.png',
						name: '头条',
						tabnum: 2
					}, {
						url: 'ico_weibo.png',
						name: '微博',
						tabnum: 3
					}, {
						url: 'ico_sogou.png',
						name: '搜狗',
						tabnum: 4
					}, {
						url: 'ico_zhihu.png',
						name: '知乎',
						tabnum: 5
					}, {
						url: 'ico_bilibili.png',
						name: 'bilibili',
						tabnum: 6
					}, {
						url: 'ico_douyin.png',
						name: '抖音',
						tabnum: 7
					}]
			}
		},
		methods: {
			gotoNews(tabnum, name) {
				console.log('gotoNews', tabnum, name)
				wx.navigateTo({ url: '/pages/newsList/index?tabnum=' + tabnum + '&name=' + name })
			}
		},
		onLoad() {
		}
	});
</script>

<style>
</style>
