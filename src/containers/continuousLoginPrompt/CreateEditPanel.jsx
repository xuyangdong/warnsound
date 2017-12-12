import React from 'react'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import styles from './CreateEditPanel.scss'
import {Form,Select,Upload,Input,InputNumber,Button,Spin,notification,Radio,Cascader} from 'antd'
import _ from 'lodash'
import {uploadIcon,uploadMutil} from 'actions/common'
import {jsonToFormData} from 'project-utils'
import {fromJS} from 'immutable'
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
		}
	}
	handleSubmit = (e) => {
		e.preventDefault()
		const {getFieldValue} = this.props.form
		let formData = new FormData()
		formData.append('prompt',getFieldValue('prompt'))
		formData.append('startTime',getFieldValue('promptStartTime'))
		formData.append('endTime',getFieldValue('promptendTime'))
		this.props.onSubmit(formData).then(res => {
			this.context.router.goBack(0)
		})
		// this.props.onSubmit(jsonData)
	}
	render(){
		const {getFieldDecorator} = this.props.form
		const {continuousLoginPromptInfo} = this.props
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
						  label={<span>提示语</span>}
						>
						{getFieldDecorator('prompt',{
							initialValue:continuousLoginPromptInfo.get('prompt',' ')
						})(
							<Input />
						)}
						</FormItem>
						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>开始时间</span>}
						>
						{getFieldDecorator('promptStartTime',{
							initialValue:continuousLoginPromptInfo.get('promptStartTime','0')
						})(
							<InputNumber />
						)}
						</FormItem>
						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>结束时间</span>}
						>
						{getFieldDecorator('promptendTime',{
							initialValue:continuousLoginPromptInfo.get('promptendTime','23')
						})(
							<InputNumber />
						)}
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
