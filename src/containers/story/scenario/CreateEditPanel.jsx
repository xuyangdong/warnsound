import React from 'react'
import CreateEditHeader from '../../../components/common/CreateEditHeader'
import styles from './CreateEditPanel.scss'
import {fromJS} from 'immutable'
import {Form,Input,Select,Checkbox,Upload,Button,Icon,Row,Col,Spin,Tag,notification,TreeSelect,Table} from 'antd'
import EnhanceInput from '../../../components/common/EnhanceInput'
import EnhanceSelect from '../../../components/common/EnhanceSelect'
import config from '../../../config'
import UploadAvatar from '../../../components/common/UploadAvatar'
import {uploadIcon} from 'actions/common'
import _ from 'lodash'
import ScenarioDraftComponent from '../../../components/story/ScenarioDraftComponent'
import MultiRolePanel from '../../../components/story/MultiRolePanel'
const FormItem = Form.Item
const Option = Select.Option

class CreateEditPanel extends React.Component {
	static contextTypes = {
		router:React.PropTypes.object
	}
	constructor(){
		super()
		this.state = {
			coverFileList:[],
			storyContentData:[]
		}
	}
	componentWillReceiveProps(nextProps){

	}
	uploadIcon = () => {
		if(this.state.coverFileList[0] && this.state.coverFileList[0].size>0){
			return uploadIcon(this.state.coverFileList[0]).then(res => {
				return res.obj.url
			})
		}else{
			return Promise.resolve(this.props.storySetInfo.get('coverUrl'))
		}
	}
	handleSubmit = e => {
		e.preventDefault()
		const {getFieldValue} = this.props.form
		const roleMap = this.refs.multiRole.getData()
		let contentData = this.refs.draft.getData()
		contentData = contentData.map(v => {
			v.roleId = roleMap.get(v.order)
			return v
		})
		let formData = new FormData()
		formData.append('storyId',this.props.params.storyId)
		formData.append('roleId',getFieldValue('role'))
		formData.append('content',JSON.stringify(contentData))
		this.props.onSubmit(formData).then(res => {
			this.context.router.goBack(0)
		})
	}
	handleCreateRole = () =>{
		this.props.onCreateRole()
	}
	render(){
		const {getFieldDecorator} = this.props.form
		const {storyId} = this.props.params
		const {storyList,roleList,scenarioInfo} = this.props
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
					  label={<span>剧本</span>}
					>
					<ScenarioDraftComponent value={scenarioInfo.getIn([0,'content'])} ref='draft' onBlur={(data) => {
						this.setState({
							storyContentData:data
						})
					}} />
					</FormItem>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>指定角色</span>}
					>
					{getFieldDecorator('role',{
						initialValue:''+scenarioInfo.getIn([0,'roleid'])
					})(
						<Select>
						{
							roleList.map((v,k) => (
								<Option value={''+v.get('id')} title={v.get('name')} key={k}>{v.get('name')}</Option>
							)).toJS()
						}
						</Select>
					)}
					</FormItem>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:21}}
					  label={<span>角色</span>}
					>
					<MultiRolePanel
					 ref='multiRole'
					 onCreateRole={this.handleCreateRole}
					 storyContent={
						this.state.storyContentData.length==0?
						(this.refs.draft||{getData:()=>[]}).getData():
						this.state.storyContentData} storyId={storyId||''}/>
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
