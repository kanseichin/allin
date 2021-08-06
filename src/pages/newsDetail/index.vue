<template>
	<view class="content_team paddingLR30">
		<!-- <div class="detail_t"><span>百度<label class="imp_1">热搜</label></span></div>
		<div class="detail_t" v-if="baidu_hotNewsDetail.desc"><span class="imp_title">{{baidu_hotNewsDetail.desc}}</span></div>
		<div class="detail_t" v-if="baidu_hotNewsDetail.img"><img src="baidu_hotNewsDetail.img" /></div>
		<div class="detail_t" v-if="baidu_hotNewsDetail.word"><span>{{baidu_hotNewsDetail.word}}</span></div>
		<div class="detail_t" v-if="baidu_hotNewsDetail.url"><a href="baidu_hotNewsDetail.url">原文</a></div> -->
		<web-view v-if="url" :src="url"></web-view>
	</view>
</template>

<script lang="ts">
	import Vue from 'vue'
	import ApiClient from '../../utils/apiclient'
	export default Vue.extend({
		data() {
			return {
				url: ''
			}
		},
		methods: {
		},
		onLoad(options) {
			// 把接收到的字符串转换成json对象
			if (options.url != '' && options.url != null) {
				console.log('decode', decodeURIComponent(options.url))
				this.url = decodeURIComponent(options.url)
			}
		}
	});
</script>

<style>
</style>
