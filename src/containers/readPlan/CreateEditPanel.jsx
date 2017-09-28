import React from 'react'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import styles from './CreateEditPanel.scss'
import {fromJS} from 'immutable'
import {Form,Input,Select,Checkbox,Upload,Button,Icon,Row,Col,Spin,Tag,notification,TreeSelect} from 'antd'
import EnhanceInput from '../../components/common/EnhanceInput'
import EnhanceSelect from '../../components/common/EnhanceSelect'
import config from '../../config'
import UploadAvatar from '../../components/common/UploadAvatar'
import {uploadIcon} from 'actions/common'
import _ from 'lodash'
import {jsonToFormData} from 'project-utils'
import ReadGuideInput from '../../components/story/ReadGuideInput'
import TimePointInput from '../../components/readPlan/TimePointInput'
const FormItem = Form.Item
const Option = Select.Option
const ageGroup = [
// 	{
// 	value:'91',
// 	title:'3个月'
// },{
// 	value:'182',
// 	title:'3-6个月'
// },{
// 	value:'365',
// 	title:'6-12个月'
// },{
// 	value:'547',
// 	title:'12-18个月'
// },{
// 	value:'730',
// 	title:'18-24个月'
// },
{
	value:'730',
	title:'0-2岁'
},{
	value:'1095',
	title:'2-3岁'
},{
	value:'1460',
	title:'3-4岁'
},{
	value:'1825',
	title:'4-5岁'
},{
	value:'2190',
	title:'5-6岁'
},]
class CreateEditPanel extends React.Component {
	static contextTypes = {
		router:React.PropTypes.object
	}
	constructor(){
		super()
		this.state = {
			coverFileList:[]
		}
	}
	componentWillReceiveProps(nextProps){
		// if(!nextProps.storySetInfo.isEmpty()){
		// 	this.setState({
		// 		coverFileList:nextProps.storySetInfo.get('coverUrl')?[_.extend(new File([],''),{
		// 			uid:-1,
		// 			url:nextProps.storySetInfo.get('coverUrl')
		// 		})]:[]
		// 	})
		// }
	}
	uploadIcon = () => {
		if(this.state.coverFileList[0] && this.state.coverFileList[0].size>0){
			return uploadIcon(this.state.coverFileList[0]).then(res => {
				return res.obj.url
			})
		}else{
			return Promise.resolve(this.props.readPlanInfo.get('coverUrl'))
		}
	}
	handleSubmit = e => {
		e.preventDefault()
		const {getFieldValue} = this.props.form
		this.uploadIcon().then(iconUrl => {
			const jsonData = {
				title:getFieldValue('title'),
				timepoint:getFieldValue('timepoint'),
				ageGroup:getFieldValue('ageGroup'),
				content:JSON.stringify(this.refs.readGuide.getData()),
				coverurl:iconUrl
			}
			let formData = jsonToFormData(jsonData)
			return this.props.onSubmit(formData)
		}).then(res => {
			this.context.router.goBack(0)
		})
	}
	render(){
		const {getFieldDecorator} = this.props.form
		const {readPlanInfo} = this.props
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
						initialValue:readPlanInfo.get('title')
					})(
						this.props.type=='edit'?<Input/>:<EnhanceInput />
					)}
					</FormItem>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>时间点</span>}
					>
					{getFieldDecorator('timepoint',{
						initialValue:readPlanInfo.get('timepoint','')
					})(
						<TimePointInput />
					)}
					</FormItem>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>年龄段</span>}
					>
					{getFieldDecorator('ageGroup',{
						initialValue:readPlanInfo.get('ageGroup')
					})(
						<Select>
						{ageGroup.map(v => {
							return <Option value={v.title} key={v.value}>{v.title}</Option>
						})}
						</Select>
					)}
					</FormItem>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>阅读指导</span>}
					>
						<ReadGuideInput ref='readGuide' value={readPlanInfo.get('content')}/>
					</FormItem>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>封面</span>}
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
