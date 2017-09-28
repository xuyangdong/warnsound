import React from 'react'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import styles from './CreateEditPanel.scss'
import {fromJS} from 'immutable'
import {Form,Input,Select,Checkbox,Upload,Button,Icon,Row,Col,Spin,notification,Switch} from 'antd'
import EnhanceInput from '../../components/common/EnhanceInput'
import EnhanceSelect from '../../components/common/EnhanceSelect'
import config from '../../config'
import ReadGuideInput from '../../components/story/ReadGuideInput'
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
			if(!nextProps.storyTopicInfo.isEmpty()){
				this._init = true
				this.setState({
					coverFileList:nextProps.storyTopicInfo.get('coverurl')?[_.extend(new File([],''),{
						uid:-1,
						url:nextProps.storyTopicInfo.get('coverurl')
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
			return Promise.resolve(this.props.storyTopicInfo.get('coverurl')||'')
		}
	}
	handleSubmit = e => {
		e.preventDefault()
		const {getFieldValue} = this.props.form
		const jsonData = {
			title:getFieldValue('title'),
			content:JSON.stringify(this.refs.readGuide.getData()),
			isShow:getFieldValue('isShow')?1:0
		}
		this.uploadIcon().then(iconurl => {
			jsonData.coverUrl = iconurl
			let formData = jsonToFormData(jsonData)
			this.props.onSubmit(formData).then(res => {
				this.context.router.goBack(0)
			})
		})
	}
	render(){
		const {getFieldDecorator} = this.props.form
		const {storyList,storyTopicInfo} = this.props
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
					  label={<span>标题</span>}
					>
					{getFieldDecorator('title',{
						initialValue:storyTopicInfo.get('title')
					})(
						this.props.type=='edit'?<Input/>:<EnhanceInput />
					)}
					</FormItem>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>内容</span>}
					>
					<ReadGuideInput ref='readGuide' value={storyTopicInfo.get('content')}/>
					</FormItem>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>图标</span>}
					>
					<UploadAvatar widthEdit={true} imageRatio={1.6} value={this.state.coverFileList}
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
					  label={<span>是否显示</span>}
					>
					{getFieldDecorator('isShow',{
						valuePropName:'checked',
						initialValue:storyTopicInfo.get('isshow')==1
					})(
						<Switch />
					)}
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
