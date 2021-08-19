<template>
    <view>
        <a class="home" v-if="showhome" @click="gohome"></a>
    </view>
</template>

<script>

export default ({
		props: {
			showhome: Boolean
		},
		data() {
			return {
			}
		},
		methods: {
			gohome() {
				wx.navigateTo({ url: '/pages/default/index' })
			}
		},
		onLoad() {
		}
	});
</script>

<style>
</style>