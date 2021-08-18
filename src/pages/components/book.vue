<template>
    <view>
        <p class="tools_p">读书</p>
		<ul class="news_cao">
			<li v-for="(item,index) in newslist" :key="index" @click="gotoNews(item.tabnum, item.name, item.link)">
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
					name: '微信读书',
					tabnum: 1,
					link: ''
				}, {
					url: 'ico_yunbook.png',
					name: '笔趣阁',
					tabnum: 2,
					link: ''
				}]
			}
		},
		methods: {
			gotoNews(tabnum, name, link) {
				switch(tabnum) {
					case 1:
						if(link != null && link.length > 0) {
							window.location.href = link
						} else {
							wx.navigateTo({ url: '/pages/bookList/index?tabnum=' + tabnum + '&name=' + name })
							console.log('gotoNews_book', tabnum, name)
						}
						break
					case 2:
						wx.navigateTo({ url: '/pages/yunbookTops/index?tabnum=' + tabnum + '&name=' + name })
						break
				}
			}
		},
		onLoad() {
		}
	});
</script>

<style>
</style>
