import React from 'react'
import {getOssSignature,getSTSAuthorization} from 'actions/common'
import OSSUtils from 'oss-utils'
// import OSS from 'ali-oss'
// import co from 'co'
// const STS = OSS.STS
export default class OssUploadComponent extends React.Component {
	handleFileChange = (e) => {
		var file = e.target.files[0]
		let originalFileName = file.name

		getOssSignature().then(res => {
			console.log(res)
			const formData = new FormData()
			formData.append('name','test.jpg')
			formData.append('key', res.obj.dir+'/'+originalFileName)
	        formData.append('policy', res.obj.policy)
	        formData.append('OSSAccessKeyId', res.obj.accessid)
	        formData.append('success_action_status', '200')
	        formData.append('signature', res.obj.signature)
	        formData.append('file', file)
			fetch(`${res.obj.host}/`,{
				method:'post',
				body:formData
			}).then(res => {
				console.log(res)
			})
		})
		// getSTSAuthorization().then(res => {
		// 	console.log(res)
		// })
	}
	render(){
		return (
			<div>
				<input type="file" onChange={this.handleFileChange}/>
			</div>
		)
	}
}
