import React from 'react'
import {Upload,Icon} from 'antd'
import _ from 'lodash'

export default class UploadAvatar extends React.Component {
	constructor(){
		super()
		this.state = {
			fileList:[]
		}
	}
	componentDidMount(){
		if(this.props.value){
			this.setState({
				fileList:this.props.value
			})
		}
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.value){
			this.setState({
				fileList:nextProps.value
			})
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
		  key='avatar'
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
