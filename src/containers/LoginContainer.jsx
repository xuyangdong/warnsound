import React from 'react'
import styles from './LoginContainer.scss'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {login} from '../actions/user'
const FormItem = Form.Item

class LoginContainer extends React.Component {
	static contextTypes = {
		router:React.PropTypes.object
	}
	handleSubmit(e){
		e.preventDefault();
		const {getFieldValue} = this.props.form
		this.props.login(getFieldValue('userName'),getFieldValue('password')).then(res =>{
			this.context.router.push('/stories')
		})
	}
	render(){
		const { getFieldDecorator } = this.props.form
		return (
			<div className={styles.container}>
				<div className={styles.loginForm}>
					<Form onSubmit={this.handleSubmit.bind(this)}>
						<FormItem>
						  {getFieldDecorator('userName', {
							rules: [{ required: true, message: 'Please input your username!' }],
						  })(
							<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
						  )}
						</FormItem>
						<FormItem>
				          {getFieldDecorator('password', {
				            rules: [{ required: true, message: 'Please input your Password!' }],
				          })(
				            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
				          )}
				        </FormItem>
						<FormItem>
				          <Button type="primary" htmlType="submit" className="login-form-button">
				            Log in
				          </Button>
				        </FormItem>
					</Form>
				</div>
			</div>
		)
	}
}
function mapStateToProps(state){
	return {}
}
function mapDispatchToProps(dispatch){
	return {
		login:bindActionCreators(login,dispatch)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(LoginContainer))
