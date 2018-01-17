import React from 'react'
import LzEditor from 'react-lz-editor'
import {uploadToOSS} from 'actions/common'

export default class ReadGuideInput3 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  htmlContent: '',
		  responseList: [],
		}
		this.receiveHtml=this.receiveHtml.bind(this);
	}
	receiveHtml(content) {
		// console.log("recieved HTML content", content);
		// this.setState({responseList:[]});
		console.log("asdf:",content)
	}
	onFileChange = (state) => {
		let file = state.file
		file.status = 'done'
		file.response = '{"status": "success"}'
		console.log(state)
		this.setState({
			responseList:state.fileList
		})
		return state
	}
	beforeUpload = (file, fileList) => {
		uploadToOSS(file).then(url => {

		})
		return true
	}
	render() {
		let policy = "";
		const uploadProps = {
	      listType: 'picture',
	      fileList: this.state.responseList,
	      multiple: false,
	      showUploadList: true,
		//   onChange:(data) => {
		// 	 console.log(data)
		//   },
		  onSuccess:() => {
			console.log("success")
		  },
		  customRequest:(args) => {
			  console.log(args)
			  args.onSuccess = (body) => {
				  console.log('success',body)
			  }
			  uploadToOSS(args.file).then(url => {
				  this.setState({
					responseList:[{
						uid: args.file.uid,      // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
						name: 'xx.png',   // 文件名
						status: 'done', // 状态有：uploading done error removed
						response: '{"status": "success"}', // 服务端响应内容
						url:url
					}]
				  })
			  })
		  }
	    }
		return (
			  <div>
			    <div>Editor demo 1 (use default html format ):
			    </div>
			    <LzEditor
				active={true}
				importContent={this.state.htmlContent}
				cbReceiver={this.receiveHtml}
				uploadProps={uploadProps}
			    />
			  </div>
			);
	}
}
