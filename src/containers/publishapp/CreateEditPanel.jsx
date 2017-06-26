import React from 'react'
import styles from './CreateEditPanel.scss'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import {Form} from 'antd'
const FormItem = Form.Item

export default class CreateEditPanel extends React.Component {
	render(){
		return (
			<div className={styles.container}>
				<div>
					<CreateEditHeader title={this.props.title}/>
				</div>
				<div className={styles.formPanel}>
					<Form>
						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						>
						</FormItem>
					</Form>
				</div>
			</div>
		)
	}
}
