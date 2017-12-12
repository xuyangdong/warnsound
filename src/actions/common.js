import config from '../config'
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

export function getSTSAuthorization(){
	return fetch(config.api.auth.sts).then(res => res.json())
}
