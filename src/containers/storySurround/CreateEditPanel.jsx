import React from 'react'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import styles from './CreateEditPanel.scss'
import {fromJS} from 'immutable'
import {Form,Input,Select,Checkbox,Upload,Button,Icon,Row,Col,Spin,Tag,notification,TreeSelect} from 'antd'
import EnhanceInput from '../../components/common/EnhanceInput'
import EnhanceSelect from '../../components/common/EnhanceSelect'
import config from '../../config'
import ReadGuideInput from '../../components/story/ReadGuideInput'
import ReadGuideInput2 from '../../components/story/ReadGuideInput2'
import UploadAvatar from '../../components/common/UploadAvatar'
import {uploadIcon} from 'actions/common'
import UploadVideo from '../../components/common/UploadVideo'
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
			coverFileList:[],
			videoList:[]
		}
	}
	componentWillReceiveProps(nextProps){
		if(!this._init){
			if(!nextProps.storySurroundInfo.isEmpty()){
				this._init = true
				this.setState({
					coverFileList:nextProps.storySurroundInfo.get('icon')?[_.extend(new File([],''),{
						uid:-1,
						url:nextProps.storySurroundInfo.get('icon')
					})]:[],
					videoList:nextProps.storySurroundInfo.get('videourl')?[_.extend(new File([],''),{
						uid:-1,
						url:nextProps.storySurroundInfo.get('videourl')
					})]:[],
				})
			}
		}
	}
	uploadIcon = () => {
		if(this.state.coverFileList[0] && this.state.coverFileList[0].size>0){
			return uploadIcon(this.state.coverFileList[0]).then(res => {
				return res.obj.url
			})
		}else{
			return Promise.resolve(this.state.coverFileList[0].url||this.props.storySurroundInfo.get('coverUrl')||'')
		}
	}
	uploadVideo = () => {
		if(this.state.videoList[0] && this.state.videoList[0].size>0){
			return uploadIcon(this.state.videoList[0]).then(res => {
				return res.obj.url
			})
		}else{
			return Promise.resolve(this.props.storySurroundInfo.get('coverUrl')||'')
		}
	}
	handleSubmit = e => {
		e.preventDefault()
		const {getFieldValue} = this.props.form
		const jsonData = {
			storyId:getFieldValue('storyId'),
			title:getFieldValue('title'),
			content:JSON.stringify(this.refs.readGuide.getData())
		}
		Promise.all([
			this.uploadIcon(),
			this.uploadVideo()
		]).then(urls => {
			jsonData.icon = urls[0]
			jsonData.videoUrl = urls[1]
			let formData = jsonToFormData(jsonData)
			this.props.onSubmit(formData).then(res => {
				this.context.router.goBack(0)
			})
		})
	}
	render(){
		const {getFieldDecorator} = this.props.form
		const {storyList,storySurroundInfo} = this.props
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
					  label={<span>所属故事</span>}
					>
					{getFieldDecorator('storyId',{
						initialValue:''+(storySurroundInfo.get('storyid')||'')
					})(
						<Select showSearch
						optionFilterProp="children"
						filterOption={(input, option) => option.props.children.indexOf(input) >= 0}>
						{storyList.map((v,k) => {
							return (<Option value={''+v.get('id')} title={v.get('title')} key={k}>{v.get('title')}</Option>)
						}).toJS()}
						</Select>
					)}
					</FormItem>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>标题</span>}
					>
					{getFieldDecorator('title',{
						initialValue:storySurroundInfo.get('title')
					})(
						this.props.type=='edit'?<Input/>:<EnhanceInput />
					)}
					</FormItem>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:14}}
					  label={<span>内容</span>}
					>
					<ReadGuideInput2 ref='readGuide' id='readGuide' value={storySurroundInfo.get('content')}/>
					</FormItem>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>图标</span>}
					>
					<UploadAvatar withSelect={true} widthEdit={true} imageRatio={1.6} value={this.state.coverFileList}
					onChange={(file,fileList)=>{
						this.setState({
							coverFileList:fileList
						})
					}}
					onRemove={() => {
						this.setState({
							coverFileList:[]
						})
					}}
					/>
					</FormItem>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>视频</span>}
					>
					<UploadVideo preLoad='preLoad' value={this.state.videoList} onChange={(file,fileList) => {
						this.setState({
							videoList:fileList
						})
					}}
					onRemove={() => {
						this.setState({
							videoList:[]
						})
					}}
					 />
					</FormItem>
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
