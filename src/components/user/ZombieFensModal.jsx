import React from 'react'
import {Modal,InputNumber,Form,Input} from 'antd'
import config from '../../config'
const FormItem = Form.Item

class ZombieFensModal extends React.Component {
	handleOk = () => {
		const {getFieldValue} = this.props.form
		let formData = new FormData()
		formData.append('count',getFieldValue('count'))
		formData.append('userNameField',getFieldValue('userNameField'))
		formData.append('babyNameField',getFieldValue('babyNameField'))
		fetch(config.api.user.zombieFens.add,{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			},
			body:formData
		})
		this.props.onCancel()
	}
	render(){
		const {getFieldDecorator} = this.props.form
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 6 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 14 },
			},
		};
		return (
			<Modal
				title='添加僵尸粉'
				visible={true}
				onCancel={this.props.onCancel}
				onOk={this.handleOk}
			>
			<Form onSubmit={(e) => {e.preventDefault()}}>
		        <FormItem
		          {...formItemLayout}
		          label="数量"
		          hasFeedback
		        >
				{getFieldDecorator('count',{

				})(
					<InputNumber />
				)}
				</FormItem>
				<FormItem
		          {...formItemLayout}
		          label="用户名取自这段话"
		        >
				{getFieldDecorator('userNameField',{

				})(
					<Input type='textarea' />
				)}
				</FormItem>
				<FormItem
		          {...formItemLayout}
		          label="宝宝名取自这段话"
		        >
				{getFieldDecorator('babyNameField',{

				})(
					<Input type='textarea' />
				)}
				</FormItem>
			</Form>
			</Modal>
		)
	}
}

export default Form.create()(ZombieFensModal)
