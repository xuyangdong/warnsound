import React from 'react'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import styles from './CreateEditPanel.scss'
import {Form,Select,Upload,Input,InputNumber,Button,Spin,notification,Radio,Cascader} from 'antd'
import _ from 'lodash'
import UploadAvatar from '../../components/common/UploadAvatar'
import UploadAudio from '../../components/common/UploadAudio'
import {uploadIcon,uploadMutil} from 'actions/common'
import {jsonToFormData} from 'project-utils'
const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

class CreateEditPanel extends React.Component {
	_init = false
	static contextTypes = {
		router:React.PropTypes.object
	}
	constructor(){
		super()
		this.state = {
			audioFileList:[],
			headImgList:[],
			coverList:[]
		}
	}
	componentWillReceiveProps(nextProps){
		if(!nextProps.workInfo.isEmpty() && !this._init){
			this._init = true
			this.setState({
				audioFileList:nextProps.workInfo.get('url')?[_.extend(new File([],''),{
					uid:-1,
					url:nextProps.workInfo.get('url')
				})]:[],
				headImgList:nextProps.workInfo.get('headImgUrl')?[_.extend(new File([],''),{
					uid:-1,
					url:nextProps.workInfo.get('headImgUrl')
				})]:[],
				coverList:nextProps.workInfo.get('coverUrl')?[_.extend(new File([],''),{
					uid:-1,
					url:nextProps.workInfo.get('coverUrl')
				})]:[],
			})
		}
	}
	uploadFile = () => {
		const {audioFileList,headImgList,coverList} = this.state
		return uploadMutil([
			audioFileList[0],headImgList[0],coverList[0]
		])
	}
	handleSubmit = (e) => {
		e.preventDefault()
		const {getFieldValue} = this.props.form
		this.uploadFile().then(urls => {
			let jsonData = {
				// userId:this.props.userInfo.get('id'),
				userId:getFieldValue('userId'),
				storyId:getFieldValue('storyId'),
				// storyTitle:this.props.storyList.find(v => v.get('id')==getFieldValue('storyId'),{}).get('title'),
				storyTitle:this.props.workInfo.get('storyTitle'),
				username:this.props.userInfo.get('nickname'),
				url:urls[0],
				headImgUrl:urls[1],
				coverUrl:urls[2],
				reviewCount:getFieldValue('reviewCount')||0,
				listenCount:getFieldValue('listenCount')||0,
				duration:getFieldValue('duration')
			}
			let formData = jsonToFormData(jsonData)
			this.props.onSubmit(formData).then(res => {
				this.context.router.goBack(0)
			})
		})
		// this.props.onSubmit(jsonData)
	}
	render(){
		const {getFieldDecorator} = this.props.form
		const {userInfo,storyList,workInfo,userList} = this.props
		return (
			<div className={styles.container}>
				<div>
					<CreateEditHeader onDelete={this.props.onDelete} title={this.props.title}/>
				</div>
				<div>
					<Form onSubmit={this.handleSubmit}>
						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>故事</span>}
						>
						{getFieldDecorator('storyId',{
							initialValue:''+workInfo.get('storyId',' ')
						})(
							<Select disabled={this.props.indexType=='story'}>
							{storyList.map((v,k) => {
								return <Option value={''+v.get('id')} title={v.get('title')} key={k}>{v.get('title')}</Option>
							}).toJS()}
							</Select>
						)}
						</FormItem>
						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>用户</span>}
						>
						{getFieldDecorator('userId',{
							initialValue:''+workInfo.get('userId',' ')
						})(
							<Select disabled={this.props.indexType=='user'}>
							{userList.map((v,k) => {
								return <Option value={''+v.get('id')} title={v.get('nickname')} key={k}>{v.get('nickname')}</Option>
							}).toJS()}
							</Select>
						)}
						</FormItem>
						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>浏览器次数</span>}
						>
						{getFieldDecorator('reviewCount',{
							initialValue:workInfo.get('reviewCount')
						})(
							<InputNumber />
						)}
						</FormItem>

						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>收听次数</span>}
						>
						{getFieldDecorator('listenCount',{
							initialValue:workInfo.get('listenCount')
						})(
							<InputNumber />
						)}
						</FormItem>

						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>音频文件</span>}
						>
							<UploadAudio preLoad='preLoad' value={this.state.audioFileList}
							onChange={(file,fileList) => {
								this.setState({
									audioFileList:fileList
								})
							}}
							onRemove={() => {
								this.setState({
									audioFileList:[]
								})
							}}
							/>
						</FormItem>

						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>音频时长</span>}
						>
						{getFieldDecorator('duration',{
							initialValue:workInfo.get('duration')
						})(
							<Input />
						)}
						</FormItem>

						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>故事标题图</span>}
						>
							<UploadAvatar value={this.state.headImgList}
							onChange={(file,fileList) => {
								this.setState({
									headImgList:fileList
								})
							}}
							onRemove={() => {
								this.setState({
									headImgList:[]
								})
							}}/>
						</FormItem>

						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>封面图</span>}
						>
							<UploadAvatar value={this.state.coverList}
							onChange={(file,fileList) => {
								this.setState({
									coverList:fileList
								})
							}}
							onRemove={() => {
								this.setState({
									coverList:[]
								})
							}}/>
						</FormItem>

						<FormItem
							labelCol={{span:2}}
							wrapperCol={{span:4,offset:2}}
						>
						  {this.state.spin?<Spin/>:<Button type="primary" htmlType="submit">
							{this.state.spin?<Spin size='small'/>:'保存'}
						  </Button>}
						</FormItem>
					</Form>
				</div>
			</div>
		)
	}
}

export default Form.create()(CreateEditPanel)
