<template>
    <view>
        <p class="tools_p">电影</p>
		<ul class="news_cao">
			<li v-for="(item,index) in newslist" :key="index" @click="gotoNews(item.tabnum, item.name)">
				<image class="ico1" :src="'/static/' + item.url"></image>
				<p>{{item.name}}</p>
			</li>
		</ul>
    </view>
</template>

<script>

export default ({
		data() {
			return {
				newslist: [{
					url: 'ico_douban.png',
					name: '豆瓣',
					tabnum: 1
				}, {
					url: 'ico_yugao.png',
					name: '预告',
					tabnum: 2
				}]
			}
		},
		methods: {
			gotoNews(tabnum, name) {
				wx.navigateTo({ url: '/pages/movieList/index?tabnum=' + tabnum + '&name=' + name })
				console.log('gotoNews_movie', tabnum, name)
			}
		},
		onLoad() {
		}
	});
</script>

<style>
</style>
