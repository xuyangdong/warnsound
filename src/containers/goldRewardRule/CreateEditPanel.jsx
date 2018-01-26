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
		formData.append('goldAmount',getFieldValue('goldAmount'))
		formData.append('lowerLimit',getFieldValue('lowerLimit'))
		formData.append('upperLimit',getFieldValue('upperLimit'))
		formData.append('io',getFieldValue('io')?1:0)
		this.props.onSubmit(formData).then(res => {
			this.context.router.goBack(0)
		})
		// this.props.onSubmit(jsonData)
	}
	render(){
		const {getFieldDecorator,setFieldsValue} = this.props.form
		const {goldRewardRuleInfo,typeList} = this.props
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
							initialValue:goldRewardRuleInfo.get('type',' ')
						})(
							<Select style={{width:200}}>
							{typeList.map((v,k) => (
								<Option value={v} key={k}>{v}</Option>
							))}
							</Select>
						)}
						</FormItem>
						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>金币数量</span>}
						>
						{getFieldDecorator('goldAmount',{
							initialValue:goldRewardRuleInfo.get('goldAmount',' ')
						})(
							<InputNumber type='textarea'/>
						)}
						</FormItem>
						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>次数下限</span>}
						>
						{getFieldDecorator('lowerLimit',{
							initialValue:goldRewardRuleInfo.get('lowerLimit',' ')
						})(
							<InputNumber type='textarea'/>
						)}
						</FormItem>
						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>次数上限</span>}
						>
						{getFieldDecorator('upperLimit',{
							initialValue:goldRewardRuleInfo.get('upperLimit',' ')
						})(
							<InputNumber type='textarea'/>
						)}
						</FormItem>
						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>授予or消耗</span>}
						>
						{getFieldDecorator('io',{
							valuePropName:'checked',
							initialValue:goldRewardRuleInfo.get('io','1')==1
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
