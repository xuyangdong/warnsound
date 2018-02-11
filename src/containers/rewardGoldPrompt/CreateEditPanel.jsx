import React from 'react'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import styles from './CreateEditPanel.scss'
import {Form,Select,Input,InputNumber,Button,Spin,notification,Switch} from 'antd'
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
		let formData = new FormData()
		formData.append('typeName',getFieldValue('typeName'))
		formData.append('prompt',getFieldValue('goldAmount'))
		formData.append('des',getFieldValue('lowerLimit'))
		this.props.onSubmit(formData).then(res => {
			this.context.router.goBack(0)
		})
		// this.props.onSubmit(jsonData)
	}
	render(){
		const {getFieldDecorator,setFieldsValue} = this.props.form
		const {rewardGoldPromptInfo,typeList} = this.props
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
						  label={<span>类型</span>}
						>
						{getFieldDecorator('typeName',{
							initialValue:rewardGoldPromptInfo.get('type',' ')
						})(
							<Select style={{width:200}}>
							{typeList.map((v,k) => (
								<Option value={v.get('type')} key={k}>{v.get('name')}</Option>
							))}
							</Select>
						)}
						</FormItem>
						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>提示语</span>}
						>
						{getFieldDecorator('prompt',{
							initialValue:rewardGoldPromptInfo.get('prompt',' ')
						})(
							<Input type='textarea'/>
						)}
						</FormItem>
						<FormItem
						  labelCol={{span:3}}
						  wrapperCol={{span:4}}
						  label={<span>第二条提示语</span>}
						>
						{getFieldDecorator('des',{
							initialValue:rewardGoldPromptInfo.get('des',' ')
						})(
							<Input type='textarea'/>
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
