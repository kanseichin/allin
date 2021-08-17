<template>
    <view class="content_team">
		<div class="no1_content" style="margin-top:0; padding-top:0;">
			<ul v-if="taobao_hotNewsList && taobao_hotNewsList.length > 0">
				<li v-for="(list,index) in taobao_hotNewsList" :key="index"><label class="topnum">{{index+1}}</label><span>{{list.word}}</span><a class="c-text c-text-hot" @click="del_taobaoHotNews(list.id)">删除</a></li>
			</ul>
		</div>
		<a class="mall_addbtn" @click="dialog_mall_div=true">添加</a>
		<div class="mall_div" v-if="dialog_mall_div">
			<input type="text" placeholder="商品名称" class="name_input" v-model="proinfo.name" />
			<textarea type="text" placeholder="商品url" class="name_textarea" v-model="proinfo.url"></textarea>
			<textarea type="text" placeholder="图片url" class="name_textarea" v-model="proinfo.imgurl"></textarea>
			<a class="a_submit" @click="add_taobaoHotNews">提交</a>
			<a class="a_cancel marginleft10" @click="add_taobaoHotNews_close">取消</a>
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
				},
				dialog_mall_div: false
			}
		},
		methods: {
			get_taobaoHotNews() {
				ApiClient.Post('/HSBaseWeb/mall/taobao', {
			}).then(e => {
				this.taobao_hotNewsList = e.data
				console.log('get_taobaoHotNews', this.taobao_hotNewsList)
			})
			.catch(e => { })
			},
			add_taobaoHotNews() {
				if(this.proinfo.url == '' || this.proinfo.name == '' || this.proinfo.imgurl == '') {
					alert('还未输入.')
					return
				}
				console.log('add_taobaoHotNews')
				ApiClient.Post('/HSBaseWeb/assist/addThing', {
					'sysThingTable.Url': this.proinfo.url,
					'sysThingTable.Name': this.proinfo.name,
					'sysThingTable.Img': this.proinfo.imgurl
				}).then(e => {
					console.log(e)
					this.add_taobaoHotNews_close()
					this.get_taobaoHotNews()
				})
				.catch(err => {
					err.msg && Utils.alert(err.msg)
				})
			},
			add_taobaoHotNews_close() {
				this.dialog_mall_div = false
				this.proinfo.url = ''
				this.proinfo.name = ''
				this.proinfo.imgurl = ''
			},
			del_taobaoHotNews(id) {
				ApiClient.Post('/HSBaseWeb/assist/delThing', {
					'sysThingTable.Id': id
				}).then(e => {
					console.log(e)
					this.get_taobaoHotNews()
				})
				.catch(err => {
					err.msg && Utils.alert(err.msg)
				})
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
