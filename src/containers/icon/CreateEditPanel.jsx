import React from 'react'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import styles from './CreateEditPanel.scss'
import {fromJS} from 'immutable'
import {Form,Input,Select,Checkbox,Upload,Button,Icon,Row,Col,Spin,notification,Switch} from 'antd'
import EnhanceInput from '../../components/common/EnhanceInput'
import config from '../../config'
import UploadAvatar from '../../components/common/UploadAvatar'
import UploadAudio from '../../components/common/UploadAudio'
import UploadVideo from '../../components/common/UploadVideo.jsx'
import {uploadIcon} from 'actions/common'
import _ from 'lodash'
import {jsonToFormData} from 'project-utils'
const Option = Select.Option
const FormItem = Form.Item

class CreateEditPanel extends React.Component {
	_init = false
	static contextTypes = {
		router:React.PropTypes.object
	}
	constructor(){
		super()
		this.state = {
			resourceType:'ICON',
			iconFileList:[],
			audioFileList:[],
			videoFileList:[]
		}
	}
	handleSubmit = e => {
		e.preventDefault()
		const {getFieldValue} = this.props.form
		let resourceFile = 'iconFileList'
		switch (this.state.resourceType) {
			case 'ICON':
				resourceFile = 'iconFileList'
				break;
			case 'AUDIO':
				resourceFile = 'audioFileList'
				break;
			case 'VIDEO':
				resourceFile = 'videoFileList'
				break;
			default:
				resourceFile = 'iconFileList'
		}
		let formData = new FormData()
		formData.append('description',getFieldValue('description'))
		formData.append('resourceType',this.state.resourceType)
		formData.append('file',this.state[resourceFile][0])
		this.props.onSubmit(formData).then(res => {
			this.context.router.goBack(0)
		})
	}
	renderResoureUploader = () => {
		switch (this.state.resourceType) {
			case 'ICON':
				return (<UploadAvatar widthEdit={false} value={this.state.iconFileList}
				onChange={(file,fileList)=>{
					this.setState({
						iconFileList:fileList
					})
				}}
				onRemove={() => {
					this.setState({
						iconFileList:[]
					})
				}}
				/>)
			case 'AUDIO':
				return (<UploadAudio value={this.state.audioFileList}
					onChange={(file,fileList) => {
						this.setState({
							audioFileList:fileList
						})
					}}
					onRemove={(file,fileList) => {
						this.setState({
							audioFileList:fileList
						})
					}}
					/>)
			case 'VIDEO':
				return (<UploadVideo value={this.state.videoFileList}
					onChange={(file,fileList) => {
						this.setState({
							videoFileList:fileList
						})
					}}
					onRemove={(file,fileList) => {
						this.setState({
							videoFileList:fileList
						})
					}}
					/>)
			default:

		}
	}
	render(){
		const {getFieldDecorator} = this.props.form
		const {initImageInfo} = this.props
		return (
			<div className={styles.container}>
				<div>
					<CreateEditHeader onDelete={this.props.onDelete} title={this.props.title}/>
				</div>
				<div className={styles.formPanel}>
				<Form onSubmit={this.handleSubmit}>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>资源描述</span>}
					>
					{getFieldDecorator('description',{
						// initialValue:initImageInfo.get('description')
					})(
						<Input />
					)}
					</FormItem>
					<FormItem
						labelCol={{span:2}}
						wrapperCol={{span:4}}
						label={<span>资源类型</span>}
					>
					<Select value={this.state.resourceType} onSelect={value => {
						this.setState({
							resourceType:value
						})
					}}>
						<Option value='ICON' key='icon'>图标</Option>
						<Option value='AUDIO' key='audio'>音频</Option>
						<Option value='VIDEO' key='video'>视频</Option>
					</Select>
					</FormItem>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>资源文件</span>}
					>
					{this.renderResoureUploader()}
					</FormItem>
					{this.props.type=='edit'?(<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>是否显示</span>}
					>
					{getFieldDecorator('isShow',{
						valuePropName:'checked',
						initialValue:initImageInfo.get('isshow')==1
					})(
						<Switch onChange={this.handleSwitch} />
					)}
					</FormItem>):null}
					<FormItem
						labelCol={{span:2}}
						wrapperCol={{span:4,offset:2}}
					>
					{<Button type="primary" htmlType="submit">
						{'保存'}
					  </Button>}
					</FormItem>
				</Form>
				</div>
			</div>
		)
	}
}

export default Form.create()(CreateEditPanel)
