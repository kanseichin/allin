<template>
	<view class="content_team paddingLR30">
		<p class="tools_p">新闻热搜</p>
		<ul class="news_cao">
			<li v-for="(item,index) in newslist" :key="index" @click="gotoNews(item.tabnum)">
				<image class="ico1" :src="'/static/' + item.url"></image>
				<p>{{item.name}}热搜</p>
			</li>
		</ul>
		<p class="tools_p">新闻热搜</p>
		<ul class="news_cao">
			<li v-for="(item,index) in newslist" :key="index" @click="gotoNews(item.tabnum)">
				<image class="ico1" :src="'/static/' + item.url"></image>
				<p>{{item.name}}热搜</p>
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
					}]
			}
		},
		methods: {
			gotoNews(tabnum) {
				console.log('tabnum', tabnum)
				wx.navigateTo({ url: '/pages/newsList/index?tabnum=' + tabnum })
			}
		},
		onLoad() {
		}
	});
</script>

<style>
</style>
