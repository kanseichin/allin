<template>
	<view class="content_team paddingLR30">
		<p class="tools_p">新闻热搜</p>
		<ul class="news_cao">
			<li v-for="(item,index) in newslist" :key="index" @click="gotoNews(item.tabnum)">
				<image class="ico1" :src="'/static/' + item.url"></image>
				<p>{{item.name}}热搜</p>
			</li>
		</ul>
		<p class="tools_p">即将上映</p>
		<ul class="news_cao">
			<li v-for="(item,index) in movielist" :key="index" @click="gotoMovie(item.palyUrl)">
				<image class="ico1" :src="item.url"></image>
				<p>{{item.name}}</p>
				<p style="font-size:20rpx; color:#999; height:20rpx; line-height:20rpx; min-height:10rpx;">{{item.desc}}</p>
			</li>
		</ul>
	</view>
</template>

<script lang="ts">
	import Vue from 'vue'
	import ApiClient from '../../utils/apiclient'
	export default Vue.extend({
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
					}],
					movielist: [{
						url: 'https://img9.doubanio.com/view/photo/l/public/p2674123936.webp',
						name: '测谎人',
						palyUrl: 'http://video.mtime.com/81118/?mid=270705',
						desc: '2021-08-20(中国大陆)'
					}, {
						url: 'http://img5.mtime.cn/pi/2019/01/04/180800.55514141.jpg',
						name: '皮皮虾总裁',
						palyUrl: 'http://video.mtime.com/80510/?mid=259945',
						desc: '2021-08-13(中国大陆)'
					}, {
						url: 'https://img2.doubanio.com/view/photo/l/public/p2560606153.webp',
						name: '忠犬流浪记',
						palyUrl: 'http://video.mtime.com/76184/?mid=264559',
						desc: '2021-08-20(中国大陆)'
					}]
			}
		},
		methods: {
			gotoNews(tabnum) {
				console.log('gotoNews', tabnum)
				wx.navigateTo({ url: '/pages/newsList/index?tabnum=' + tabnum })
			},
			gotoMovie(palyUrl) {
				console.log('gotoMovie', palyUrl)
				wx.navigateTo({ url: '/pages/newsDetail/index?url=' + encodeURIComponent(palyUrl) })
			}
		},
		onLoad() {
		}
	});
</script>

<style>
</style>
