import config from '../config'
import {notification} from 'antd'
export function uploadIcon(iconFile) {
	let formData = new FormData()
	formData.append('icon',iconFile)
	if(!iconFile || !(iconFile.size>0)){
		return Promise.resolve({obj:{}})
	}
	return fetch(config.api.icon.post,{
		method:'POST',
		headers: {
			'authorization': sessionStorage.getItem('auth'),
		},
		body:formData
	}).then(res => res.json())
}

export function uploadAudio(audioFile) {
	let formData = new FormData()
	formData.append('audio',audioFile)
	if(!audioFile || !(audioFile.size>0)){
		return Promise.resolve({obj:{}})
	}
	return fetch(config.api.audio.post,{
		method:'POST',
		headers: {
			'authorization': sessionStorage.getItem('auth'),
		},
		body:formData
	}).then(res => res.json())
}

export function uploadMutil(fileList) {
	let formData = new FormData()
	let uploadIndex = []
	let nofile = true
	fileList.forEach((v,k) => {
		if(!v || !(v.size > 0)){
		}else{
			nofile = false
			uploadIndex[k] = '1'
			formData.append('files',v)
		}

	})
	if(nofile){
		return Promise.resolve({obj:{
			multiUrls:fileList.map(v => v?v.url:'')
		}})
	}
	return fetch(config.api.file.post,{
		method:'POST',
		headers: {
			'authorization': sessionStorage.getItem('auth'),
		},
		body:formData
	}).then(res => res.json()).then(res => {
		return fileList.map((v,k) => {
			if(!uploadIndex[k]){
				return (v||{}).url || ''
			}else{
				let multiUrls = res.obj.multiUrls
				return multiUrls.shift()
			}
		})
	})
}

export function getOssSignature(){
	return fetch(config.api.auth.oss,{
	}).then(res => res.json())
}

export function uploadToOSS(file){
	return getOssSignature().then(res => {
		const formData = new FormData()
		let originalFileName = file.name
		let suffix = originalFileName.split('.').slice(-1)[0]
		let ossFileName = originalFileName.split('.').join('')+Date.now()+'.'+suffix
		let successUrl = `${res.obj.host}/${res.obj.dir}/${ossFileName}`
		formData.append('name',ossFileName)
		formData.append('key', res.obj.dir+'/'+ossFileName)
		formData.append('policy', res.obj.policy)
		formData.append('OSSAccessKeyId', res.obj.accessid)
		formData.append('success_action_status', '200')
		formData.append('signature', res.obj.signature)
		formData.append('file', file)

		return fetch(`${res.obj.host}/`,{
			method:'post',
			body:formData
		}).then(res => {
			if(res.status == 200){
				notification.success({message:'上传成功'})
			}else{
				notification.error({message:res})
			}
			return successUrl
		})
	})
}
