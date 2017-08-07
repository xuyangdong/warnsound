import React from 'react'
import {Upload,Button,Icon} from 'antd'

export default class UploadOtherFile extends React.Component {
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
		console.log('other',nextProps)
		if(nextProps.value){
			this.setState({
				fileList:nextProps.value
			})
		}
	}
	render(){
		return (
	      <Upload
		  key='other'
		  fileList={this.state.fileList}
		  beforeUpload={(file,fileList)=>{
			  this.props.onChange(file,fileList)
			  this.setState({
				  fileList:fileList
			  })
			  return false
		  }}
		  onRemove={file => {
			  this.props.onRemove()
			  this.setState({
				  fileList:[]
			  })
		  }}
		  >
		    <Button>
		      <Icon type="upload" /> {this.props.hint||'upload'}
		    </Button>
		  </Upload>
		)
	}
}
