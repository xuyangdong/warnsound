import React from 'react'
import styles from './CreateEditPanel.scss'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import {Form,Input,Icon, Button } from 'antd'
import UploadAvatar from '../../components/common/UploadAvatar'

const FormItem = Form.Item

class CreateEditPanel extends React.Component {
	uuid = 0
	handleAdd = () => {
		const {getFieldDecorator,getFieldValue,setFieldsValue} = this.props.form
		const keys = getFieldValue('keys')
		this.uuid ++
		const nextKeys = keys.concat(this.uuid);
		setFieldsValue({
	      keys: nextKeys,
	    });
	}
	handleRemove = (k) => {
		const {getFieldDecorator,getFieldValue,setFieldsValue} = this.props.form
		const keys = getFieldValue('keys')
		const nextKeys = keys.filter(v => v != k)
		setFieldsValue({
			keys: nextKeys
		})
	}
	render(){
		const {getFieldDecorator,getFieldValue} = this.props.form
		//just for data bind, to bind keys -> []
		getFieldDecorator('keys', { initialValue: [] });

		const keys = getFieldValue('keys')
		const answerItems = keys.map(v => {
			return (
				<FormItem
					label={`答案-${v}`}
					labelCol={{span:2}}
					wrapperCol={{span:7}}
					key={`answer-${v}`}
				>
				<div className={styles.itemContent}>
					{getFieldDecorator(`answer-${v}`,{
						// initialValue:soundEffectInfo.get('description')
					})(
						<Input style={{width:150}}/>
					)}
					<UploadAvatar />
					<Icon
		              className={styles.dynamicDeleteButton}
		              type="minus-circle-o"
		              disabled={keys.length === 1}
		              onClick={() => this.handleRemove(v)}
		            />
				</div>
				</FormItem>
			)
		})
		return (
			<div className={styles.container}>
				<div>
					<CreateEditHeader title={this.props.title}/>
				</div>
				<div className={styles.formPanel}>
					<Form>
						<FormItem
						  label="题目"
						  labelCol={{span:2}}
						  wrapperCol={{span:7}}
						>
						<div className={styles.itemContent}>
							{getFieldDecorator('question',{
								// initialValue:soundEffectInfo.get('description')
							})(
								<Input style={{width:150}}/>
							)}
							<UploadAvatar />
						</div>
						</FormItem>
						{answerItems}
						<FormItem
						  label=""
						  labelCol={{span:2}}
						  wrapperCol={{span:4,offset:2}}
						>
							<Button type="dashed" onClick={this.handleAdd}>
				            	<Icon type="plus" /> 添加一个答案
				          	</Button>
						</FormItem>
					</Form>
				</div>
			</div>
		)
	}
}

export default Form.create()(CreateEditPanel)
