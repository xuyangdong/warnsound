import React from 'react'
import {Upload,Icon,Modal,Slider} from 'antd'
import _ from 'lodash'
import AvatarEditor from 'react-avatar-editor'
import styles from './UploadAvatar'
const IMAGE_WIDTH = 250
export default class UploadAvatar extends React.Component {
	static defaultProps = {
		width:250,
		height:250,
		border:50,
		widthEdit:false
	}
	constructor(){
		super()
		this.state = {
			fileList:[],
			scale:1,
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
	getImageBlob = () =>{
		const canvas = this.refs.avatarEditor.getImage()
		return new Promise((resolve,reject) => {
			canvas.toBlob(blob => {
				let file = _.extend(blob,{
					uid:_.uniqueId('image_')
				})
				resolve(file)
			},'image/png',0.95)
		})
	}
	render(){
		const uploadButton = (
	      <div>
	        <Icon type="plus" />
	        <div className="ant-upload-text">{this.props.hint||'upload'}</div>
	      </div>
	    );
		return (
			<div>
				<Upload
				  key='avatar'
		          listType="picture-card"
		          fileList={this.state.fileList}
				  beforeUpload={(file,fileList)=>{
					//   this.props.onChange(file,fileList)
					//   this.handlePicDisplay(fileList)
					if(this.props.widthEdit){
						this.setState({
  						  showEditAvatar:true,
  						  editingFile:file
  					  })
				  }else{
					  this.props.onChange(file,fileList)
					  this.handlePicDisplay(fileList)
				  }

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
				{this.props.widthEdit&&this.state.showEditAvatar?<Modal title='编辑图片' visible={true}
				  onOk={()=>{
					  this.getImageBlob().then(blob => {
							this.props.onChange(blob,[blob])
							this.handlePicDisplay([blob])
							this.setState({
							   showEditAvatar:false,
							})
					  })
				  }}
				  onCancel={()=>{
					  this.getImageBlob().then(blob => {
							this.props.onChange(blob,[blob])
							this.handlePicDisplay([blob])
							this.setState({
							   showEditAvatar:false,
							})
					  })
				  }}
				>
					<div className={styles.avatarContainer}>
						<AvatarEditor
						  ref='avatarEditor'
						  image={this.state.editingFile}
						  width={IMAGE_WIDTH}
						  height={IMAGE_WIDTH/this.props.imageRatio}
						  border={this.props.border}
						  color={[55, 55, 55, 0.6]}
						  scale={this.state.scale}
						/>
						<div className={styles.scaleBar}>
						  <Slider defaultValue={1} min={1} max={2} step={0.01} onChange={(value)=>{
							  this.setState({
								  scale:value
							  })
						  }} onAfterChange={this.onAfterChange} />
						</div>
					</div>
				</Modal>:null}
			</div>
		)
	}
}
