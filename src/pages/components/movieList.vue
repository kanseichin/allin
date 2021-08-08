<template>
    <view>
        <p class="tools_p">电影预告</p>
		<ul class="news_cao">
			<li v-for="(item,index) in movielist" :key="index" @click="gotoDefault(item.palyUrl)">
				<image class="ico1" :src="item.url"></image>
				<p>{{item.name}}</p>
				<p style="font-size:20rpx; color:#999; height:20rpx; line-height:20rpx; min-height:10rpx;">{{item.desc}}</p>
			</li>
		</ul>
    </view>
</template>

<script>

export default ({
		data() {
			return {
					movielist: [{
						url: 'https://www.yugaopian.cn/files/mpic/202010/p30811.jpg?1642',
						name: '怒火·重案',
						palyUrl: 'http://video.mtime.com/81030?mid=263501',
						desc: '2021-07-30(中国大陆)'
					}, {
						url: 'https://www.yugaopian.cn/files/mpic/202104/p31666.jpg?1133',
						name: '尚气与十环传奇',
						palyUrl: 'http://video.mtime.com/80335?mid=262628',
						desc: '2021-09-03(美国)'
					}, {
						url: 'https://www.yugaopian.cn/files/mpic/202107/p32208.jpg?0729',
						name: '测谎人',
						palyUrl: 'http://video.mtime.com/81118/?mid=270705',
						desc: '2021-08-20(中国大陆)'
					}, {
						url: 'http://img5.mtime.cn/pi/2019/01/04/180800.55514141_220X220.jpg',
						name: '皮皮虾总裁',
						palyUrl: 'http://video.mtime.com/80510/?mid=259945',
						desc: '2021-08-13(中国大陆)'
					}, {
						url: 'https://www.yugaopian.cn/files/mpic/201905/p28276.jpg?0307',
						name: '忠犬流浪记',
						palyUrl: 'http://video.mtime.com/76184/?mid=264559',
						desc: '2021-08-20(中国大陆)'
					}]
			}
		},
		methods: {
			gotoDefault(palyUrl) {
				console.log('gotoDefault', palyUrl)
				wx.navigateTo({ url: '/pages/newsDetail/index?url=' + encodeURIComponent(palyUrl) })
			}
		},
		onLoad() {
		}
	});
</script>

<style>
</style>
