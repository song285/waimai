// 点餐提醒
function onOrdertips(func){
	let tempid = ['ZZnXluVxMSFPky1q28CCt9LIU-ANmAX4i3148PGmvps']
	uni.requestSubscribeMessage({
		tmplIds: tempid,
		success(res) { 
			if(res[tempid[0]] == 'accept'){
				uni.showToast({
					icon:'none',
					title: '提醒设置成功',
					duration: 2000
				});
				console.log("提醒设置成功")
				uni.navigateBack({})
				if(typeof func == 'function') func()
			}
		},
		fail(err){
			console.log(err)
		}
	})
}

export default {
	onOrdertips
}