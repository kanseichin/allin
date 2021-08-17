<template>
    <view>
        <p class="tools_p">电视直播</p>
		<ul class="news_cao">
			<li v-for="(item,index) in cctvlist" :key="index" @click="gotoDefault(item.palyUrl)">
				<image class="ico1" :src="'/static/' + item.url"></image>
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
					cctvlist: [{
						url: 'ico_cctv.png',
						name: '央视CCTV',
						palyUrl: 'https://tv.cctv.com/live/m/',
					}]
			}
		},
		methods: {
			gotoDefault(palyUrl) {
				window.open(palyUrl)
			}
		},
		onLoad() {
		}
	});
</script>

<style>
</style>
