import React from 'react'
import styles from './CreateEditPanel.scss'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import {Form,Upload,Input,Button,Icon,Spin,notification} from 'antd'
import PropTypes from 'prop-types'
const FormItem = Form.Item

class CreateEditPanel extends React.Component {
	static contextTypes = {
		router:PropTypes.object
	}
	constructor(){
		super()
		this.state = {
			spin:false
		}
	}
	handleSubmit = (e) => {
		e.preventDefault()
		notification.info({message:'正在上传'})
		const {getFieldValue} = this.props.form
		this.setState({
			spin:true
		})
		let formData = {
			name:getFieldValue('name'),
			description:getFieldValue('description'),
			extra:getFieldValue('extra')
		}
		this.props.onSubmit(formData).then(res => {
			this.setState({
				spin:false
			})
			this.context.router.goBack()
		})

	}
	render(){
		const {getFieldDecorator} = this.props.form
		const {logoInfo} = this.props
		return (
			<div className={styles.container}>
				<div>
					<CreateEditHeader title={this.props.title} onDelete={this.props.onDelete}/>
				</div>
				<div className={styles.formPanel}>
					<Form>
						<FormItem
						  label="名称"
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						>{getFieldDecorator('name',{
							initialValue:logoInfo.get('name')
						})(
							<Input />
						)}
						</FormItem>
						<FormItem
						  label="描述"
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						>{getFieldDecorator('description',{
							initialValue:logoInfo.get('description')
						})(
							<Input />
						)}
						</FormItem>
						<FormItem
						  label="额外信息"
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						>{getFieldDecorator('extra',{
							// initialValue:soundEffectInfo.get('description')
						})(
							<Input />
						)}
						</FormItem>
						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4,offset:2}}
						>{this.state.spin?<Spin/>:<Button onClick={this.handleSubmit}>保存</Button>}
						</FormItem>
					</Form>
				</div>
			</div>
		)
	}
}

export default Form.create()(CreateEditPanel)
