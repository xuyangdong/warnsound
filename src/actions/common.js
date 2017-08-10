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
