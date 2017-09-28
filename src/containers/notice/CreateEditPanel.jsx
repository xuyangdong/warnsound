import React from 'react'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import styles from './CreateEditPanel.scss'
import {fromJS} from 'immutable'
import {Form,Input,Select,Upload,Button,Icon,notification,Switch} from 'antd'
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
		}
	}
	handleSubmit = e => {
		e.preventDefault()
		const {getFieldValue} = this.props.form
		const jsonData = {
			content:JSON.stringify(this.refs.readGuide.getData())
		}
		this.props.onSubmit(jsonData).then(res => {
			this.context.router.goBack(0)
		})
	}
	render(){
		const {getFieldDecorator} = this.props.form
		const {noticeInfo} = this.props
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
					  label={<span>内容</span>}
					>
					<ReadGuideInput ref='readGuide' value={noticeInfo.get('content')}/>
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
