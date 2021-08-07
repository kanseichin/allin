<template>
	<view class="content_team padding30">
		<p class="tools_p">新闻热搜</p>
		<ul class="news_cao">
			<li v-for="(item,index) in newslist" :key="index" @click="gotoNews(item.tabnum, item.name)">
				<image class="ico1" :src="'/static/' + item.url"></image>
				<p>{{item.name}}</p>
			</li>
		</ul>
		<p class="tools_p">即将上映</p>
		<ul class="news_cao">
			<li v-for="(item,index) in movielist" :key="index" @click="gotoDefault(item.palyUrl)">
				<image class="ico1" :src="item.url"></image>
				<p>{{item.name}}</p>
				<p style="font-size:20rpx; color:#999; height:20rpx; line-height:20rpx; min-height:10rpx;">{{item.desc}}</p>
			</li>
		</ul>
		<p class="tools_p">小霸王</p>
		<ul class="news_cao">
			<li v-for="(item,index) in gamelist" :key="index" @click="gotoDefault(item.palyUrl)">
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
					}, {
						url: 'ico_bilibili.png',
						name: 'bilibili',
						tabnum: 6
					}, {
						url: 'ico_douyin.png',
						name: '抖音',
						tabnum: 7
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
					}],
					gamelist: [{
						url: 'https://20889800.s21i.faiusr.com/2/ABUIABACGAAg7q33_QUojPmniQUwnwM4mgM.jpg',
						name: '大航海时代2',
						palyUrl: 'http://www.return8090.com/mdWeb.html?fccpath=MDC.bin&gameid=dhhsd2',
						desc: 'MD'
					}, {
						url: 'https://20889800.s21i.faiusr.com/2/ABUIABACGAAgitL-9wUo856EuQEwmgM4mgM.jpg',
						name: '超级马里奥1',
						palyUrl: 'http://www.return8090.com/FCweb3.html?fccpath=FCC.bin&gameid=cjml1',
						desc: 'FC'
					}, {
						url: 'https://20889800.s21i.faiusr.com/2/ABUIABACGAAglIv0-AUogMm93wYwvQM4mgM.jpg',
						name: '星之卡比3',
						palyUrl: 'http://www.return8090.com/FCweb4_1.html?fccpath=FCC.bin&gameid=xzkb3',
						desc: 'SFC'
					}, {
						url: 'https://20889800.s21i.faiusr.com/2/ABUIABACGAAgiOT2-QUohemNcDC5AziaAw.jpg',
						name: '超级马里奥弹珠台',
						palyUrl: 'http://www.return8090.com/gbaWeb.html?fccpath=GBAC.bin&gameid=cjmladzt',
						desc: 'GBA'
					}, {
						url: 'https://20889800.s21i.faiusr.com/2/ABUIABACGAAgj6z-gAYohJSqqgYwlgM4kAM.jpg',
						name: '火焰纹章DS',
						palyUrl: 'http://www.return8090.com/ndsWeb.html?fccpath=NDSC.bin&gameid=hywzds',
						desc: 'NDS'
					}, {
						url: 'https://20889800.s21i.faiusr.com/2/ABUIABACGAAg2LXW_gUojPOTuQMwggQ4mgM.jpg',
						name: '恐龙世界',
						palyUrl: 'http://www.return8090.com/mameWeb.html?fccpath=MAMEC.bin&gameid=dino',
						desc: '街机'
					}]
			}
		},
		methods: {
			gotoNews(tabnum, name) {
				console.log('gotoNews', tabnum, name)
				wx.navigateTo({ url: '/pages/newsList/index?tabnum=' + tabnum + '&name=' + name })
			},
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
