import React from 'react'
import {Upload} from 'antd'

export default class UploadDisplayLocal extends React.Component {
	static propTypes = {
		defaultUrl:React.PropTypes.string,
		fileList:React.PropTypes.array
	}
	render(){
		return (
			<Upload
				listType="picture-card"
				fileList={this.props.fileList.length>0?
					this.props.filtList:{
						uid:-1,
						url:this.props.defaultUrl
					}
				}
				beforeUpload={(file,fileList)=>{
					this.handlePicDisplay(fileList,'backgroundFileList')
					return false
				}}
			>
				{this.props.children||'上传图片'}
			</Upload>
		)
	}
}
