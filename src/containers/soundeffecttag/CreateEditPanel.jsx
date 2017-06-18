import React from 'react'
import styles from './CreateEditPanel.scss'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import {Form,Input,Upload,Button,Icon} from 'antd'
import _ from 'lodash'
const FormItem = Form.Item

class CreateEditPanel extends React.Component {
	render(){
		const {getFieldDecorator} = this.props.form
		return (
			<div className={styles.container}>
				<div>
					<CreateEditHeader title={this.props.title}/>
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
						  <Button type="primary" htmlType="submit">
							保存
						  </Button>
						</FormItem>
					</Form>
				</div>
			</div>
		)
	}
}

export default Form.create()(CreateEditPanel)
