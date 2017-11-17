import React from 'react'
import {Upload,Icon,Modal,Slider,Select} from 'antd'
import _ from 'lodash'
import AvatarEditor from 'react-avatar-editor'
import styles from './UploadAvatar'
import config from '../../config'
const Option = Select.Option
const IMAGE_WIDTH = 250
export default class UploadAvatar extends React.Component {
	static defaultProps = {
		width:250,
		height:250,
		border:50,
		widthEdit:false,
		withSelect:false
	}
	constructor(){
		super()
		this.state = {
			fileList:[],
			scale:1,
			resourceList:[]
		}
	}
	componentDidMount(){
		if(this.props.value){
			this.setState({
				fileList:this.props.value
			})
		}
		fetch(config.api.resource.get(0,10000),{
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => res.json()).then(res => {

			this.setState({
				resourceList:res.obj
			})
		})
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
	handleSelect = (value,option) => {

		let forkFile = new File([],option.props.children.toString())
		forkFile.uid = '-1'
		forkFile.url = value
		// this.setState({
		//
		// })
		this.props.onChange(forkFile,[forkFile])
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
				{this.props.withSelect?<Select dropdownMatchSelectWidth={false} onSelect={this.handleSelect} style={{width:200}}>
				{this.state.resourceList.map((v,k) => {
					return <Option value={''+v.url} key={k}>{v.name}</Option>
				})}
				</Select>:null}
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
					//   this.getImageBlob().then(blob => {
					// 		this.props.onChange(blob,[blob])
					// 		this.handlePicDisplay([blob])
					// 		this.setState({
					// 		   showEditAvatar:false,
					// 		})
					//   })
					this.props.onChange(this.state.editingFile,[this.state.editingFile])
					this.handlePicDisplay([this.state.editingFile])
					this.setState({
						showEditAvatar:false
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
