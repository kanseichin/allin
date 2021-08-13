<template>
    <view>
        <p class="tools_p">热销榜</p>
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
					url: 'ico_weixinbook.png',
					name: '淘宝',
					tabnum: 1
				}]
			}
		},
		methods: {
			gotoNews(tabnum, name) {
				wx.navigateTo({ url: '/pages/mallList/index?tabnum=' + tabnum + '&name=' + name })
				console.log('gotoNews_mall', tabnum, name)
			}
		},
		onLoad() {
		}
	});
</script>

<style>
</style>