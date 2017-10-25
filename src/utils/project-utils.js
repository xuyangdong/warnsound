export function jsonToFormData(jsonData){
	let formData = new FormData()
	Object.keys(jsonData).forEach(v => {
		if(typeof jsonData[v] != 'undefined' && jsonData != ''){
			formData.append(v,jsonData[v])
		}
	})
	return formData
}
