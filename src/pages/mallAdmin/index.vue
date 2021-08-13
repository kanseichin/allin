<template>
    <view class="content_team">
		<div class="no1_content" style="margin-top:0; padding-top:0;">
			<ul v-if="taobao_hotNewsList && taobao_hotNewsList.length > 1">
				<li v-for="(list,index) in taobao_hotNewsList" :key="index" @click="gotoDetail(list.url, 'taobao')"><label class="topnum">{{index+1}}</label><span>{{list.word}}</span><a class="c-text c-text-hot" v-if="index<3">热</a></li>
			</ul>
		</div>
		<div class="mall_div">
			<input type="text" placeholder="商品名称" class="name_input" v-model="proinfo.name" />
			<textarea type="text" placeholder="商品url" class="name_textarea" v-model="proinfo.url"></textarea>
			<textarea type="text" placeholder="图片url" class="name_textarea" v-model="proinfo.imgurl"></textarea>
			<a class="a_submit" @click="add_taobaoHotNews">提交</a>
		</div>
    </view>
</template>

<script>
import Vue from 'vue'
import ApiClient from '../../utils/apiclient'
export default ({
		data() {
			return {
				taobao_hotNewsList: [],
				proinfo: {
					url: '',
					name: '',
					imgurl: ''
				}
			}
		},
		methods: {
			get_taobaoHotNews() {
				console.log('get_taobaoHotNews')
				ApiClient.Post('/HSBaseWeb/mall/taobao', {
			}).then(e => {
					this.taobao_hotNewsList = e.data
				})
				.catch(e => { })
			},
			add_taobaoHotNews() {
				console.log('add_taobaoHotNews')
				ApiClient.Post('/HSBaseWeb/assist/addThing', {
			}).then(e => {
					sysThingTable.Url = this.proinfo.url
					sysThingTable.name = this.proinfo.name
					sysThingTable.imgurl = this.proinfo.imgurl
				})
				.catch(e => { })
				console.log('add_taobaoHotNews_done')
			},
			gotoDetail(word, urlheader) {
				console.log('gotoDetail_mall', word)
				var header = ''
				switch (urlheader) {
					case 'taobao':
						header = ''
						window.location.href = header + '' + word + ''
						break;
				}
			}
		},
		onLoad() {
			this.get_taobaoHotNews()
		}
	});
</script>

<style>
</style>
