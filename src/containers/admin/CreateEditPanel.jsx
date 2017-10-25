import React from 'react'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import styles from './CreateEditPanel.scss'
import {fromJS} from 'immutable'
import {Form,Input,Select,Checkbox,Upload,Button,Icon,notification} from 'antd'
import EnhanceInput from '../../components/common/EnhanceInput'
import EnhanceSelect from '../../components/common/EnhanceSelect'
import config from '../../config'
import _ from 'lodash'
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
			username:getFieldValue('username'),
			password:getFieldValue('password')
		}
		this.props.onSubmit(jsonData).then(res => {
			this.context.router.goBack(0)
		})
	}
	render(){
		const {getFieldDecorator} = this.props.form
		const {adminInfo} = this.props
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
					  label={<span>用户名</span>}
					>
					{getFieldDecorator('username',{
						initialValue:''+(adminInfo.get('username')||'')
					})(
						<Input />
					)}
					</FormItem>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>密码</span>}
					>
					{getFieldDecorator('password',{
						initialValue:adminInfo.get('password')
					})(
						this.props.type=='edit'?<Input/>:<EnhanceInput />
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
