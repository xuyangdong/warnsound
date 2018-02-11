import React from 'react'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import styles from './CreateEditPanel.scss'
import {Form,Select,Input,Button,Spin,notification,DatePicker,Switch} from 'antd'
import _ from 'lodash'
import {jsonToFormData} from 'project-utils'
import {fromJS} from 'immutable'
import moment from 'moment'
const FormItem = Form.Item
const Option = Select.Option

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
		const worksTagInfo = this.props.worksTagInfo
		let formData = new FormData()
		getFieldValue('content')==worksTagInfo.get('content')?null:formData.append('content',getFieldValue('content'))
		getFieldValue('description')==worksTagInfo.get('description')?null:formData.append('description',getFieldValue('description')||'')
		formData.append('valid',getFieldValue('valid')?1:0)
		this.props.onSubmit(formData).then(res => {
			this.context.router.goBack(0)
		})
		// this.props.onSubmit(jsonData)
	}
	render(){
		const {getFieldDecorator,setFieldsValue} = this.props.form
		const {worksTagInfo} = this.props
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
						  label={<span>内容</span>}
						>
						{getFieldDecorator('content',{
							initialValue:worksTagInfo.get('content',' ')
						})(
							<Input />
						)}
						</FormItem>
						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>描述</span>}
						>
						{getFieldDecorator('description',{
							initialValue:worksTagInfo.get('description',' ')
						})(
							<Input />
						)}
						</FormItem>
						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>有效</span>}
						>
						{getFieldDecorator('valid',{
							valuePropName:'checked',
							initialValue:worksTagInfo.get('valid','0')==1
						})(
							<Switch />
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
