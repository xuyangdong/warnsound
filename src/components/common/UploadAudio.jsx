import React from 'react'
import {Upload,Button,Icon} from 'antd'

export default class UploadAudio extends React.Component {
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
	handlePlay = (fileList) => {
		let fileUrl = URL.createObjectURL(fileList[0])
		this.setState({
			audioUrl:fileUrl
		})
	}
	render(){
		return (
			<div>
				<Upload accept="audio/*" fileList={this.state.fileList}
				onRemove={(file) => {
					this.props.onRemove()
					this.setState({
						fileList:[]
					})
				}}
				beforeUpload={(file,fileList)=>{

					this.props.onChange(file,fileList)
					this.props.preLoad=='preLoad'?this.handlePlay(fileList):null
					this.props.preUpload?this.props.preUpload(file):null
					return false
				}} fileList={this.state.fileList}>
					<Button>
					  <Icon type="upload" /> upload
					</Button>
				</Upload>
				{this.props.preLoad=='preLoad'?(<div>
					<audio src={this.state.audioUrl} style={{display:'block'}} controls></audio>
				</div>):null}
			</div>
		)
	}
}
