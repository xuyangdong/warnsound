import React from 'react'
import {Upload,Icon} from 'antd'

export default class UploadAvatar extends React.Component {
	constructor(){
		super()
		this.state = {
			fileList:[]
		}
	}
	handlePicDisplay = (fileList) => {
		const fileReader = new FileReader()
		const that = this
		fileReader.onload = function(e){
			that.setState({
				fileList:[_.extend(fileList[0],{
					url:e.target.result,
					thumbUrl:e.target.result
				})]
			})
		}
		fileReader.readAsDataURL(fileList[0])
	}
	render(){
		const uploadButton = (
	      <div>
	        <Icon type="plus" />
	        <div className="ant-upload-text">{this.props.hint||'upload'}</div>
	      </div>
	    );
		return (
		<Upload
          listType="picture-card"
          fileList={this.state.fileList}
		  beforeUpload={(file,fileList)=>{
			  this.props.onChange(file,fileList)
			  this.handlePicDisplay(fileList)
			  return false
		  }}
		  onRemove={(file) => {
			  this.props.onRemove()
			  this.setState({
				  fileList:[]
			  })
		  }}
        >
          {this.state.fileList.length >= 1 ? null : uploadButton}
        </Upload>
		)
	}
}
