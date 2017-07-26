import React from 'react'
import styles from './CreateEditPanel.scss'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import {Form,Input,Upload,Button,Icon,Spin,notification} from 'antd'
import _ from 'lodash'
const FormItem = Form.Item

class CreateEditPanel extends React.Component {
	static contextTypes = {
		router:React.PropTypes.object
	}
	constructor(){
		super()
		this.state = {
			spin:false
		}
	}
	handleSubmit = (e) => {
		e.preventDefault()
		this.setState({
			spin:true
		})
		const {getFieldValue} = this.props.form
		let formData = new FormData()
		formData.append('body',getFieldValue('content'))
		this.props.onSubmit(formData).then(res => {
			this.setState({
				spin:true
			})
			notification.success({message:'音效标签添加成功'})
		})
		this.context.router.goBack()
	}
	render(){
		const {getFieldDecorator} = this.props.form
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
						{getFieldDecorator('content',{
							// initialValue:soundEffectInfo.get('description')
						})(
							<Input />
						)}
						</FormItem>
						<FormItem
							labelCol={{span:2}}
							wrapperCol={{span:4,offset:2}}
						>
						  {this.state.spin?<Spin />:<Button type="primary" htmlType="submit">
							保存
						  </Button>}
						</FormItem>
					</Form>
				</div>
			</div>
		)
	}
}

export default Form.create()(CreateEditPanel)
