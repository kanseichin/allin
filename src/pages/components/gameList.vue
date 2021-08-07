<template>
    <view>
        <p class="tools_p">小霸王<a class="game_resave" @click="is_resaveinput=true">读档</a></p>
		<div v-if="is_resaveinput" class="game_resave_dialog">
			<input type="text" placeholder="输入读档地址" class="resave_input" v-model="resaveinput" />
			<p>
				<a @click="resaveGo">确定</a>
				<a @click="is_resaveinput=false">取消</a>
			</p>
		</div>
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
import ApiClient from '../../utils/apiclient'

export default ({
		data() {
			return {
					gamelist: [{
						url: 'https://20889800.s21i.faiusr.com/2/ABUIABACGAAg7q33_QUojPmniQUwnwM4mgM.jpg',
						name: '大航海时代2',
						palyUrl: 'http://www.return8090.com/mdWeb.html?fccpath=MDC.bin&gameid=dhhsd2',
						desc: 'MD'
					}, {
						url: 'https://20889800.s21i.faiusr.com/2/ABUIABACGAAg7Zag-AUo9NveHjCaAziaAw.jpg',
						name: '火焰纹章外传',
						palyUrl: 'http://www.return8090.com/FCweb3.html?fccpath=FCC.bin&gameid=hyzwzwz',
						desc: 'FC'
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
					}],
					is_resaveinput: false,
					resaveinput: ''
			}
		},
		methods: {
			gotoDefault(palyUrl) {
				console.log('gotoDefault', palyUrl)
				wx.navigateTo({ url: '/pages/newsDetail/index?url=' + encodeURIComponent(palyUrl) })
			},
			resaveGo() {
				console.log('resaveGo', this.resaveinput)
				wx.navigateTo({ url: '/pages/newsDetail/index?url=' + encodeURIComponent(this.resaveinput) })
				this.resaveinput = ''
				this.is_resaveinput = false
			}
		},
		onLoad() {
		}
	});
</script>

<style>
</style>
