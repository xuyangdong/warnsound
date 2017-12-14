import React from 'react'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import styles from './CreateEditPanel.scss'
import {Form,Select,Input,Button,Spin,notification,DatePicker} from 'antd'
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
		formData.append('ticker',getFieldValue('ticker'))
		formData.append('title',getFieldValue('title'))
		formData.append('text',getFieldValue('text'))
		formData.append('destinationId',getFieldValue('destinationId'))
		formData.append('startTime',getFieldValue('startTime').format('YYYY-MM-DD HH:mm:ss'))
		formData.append('expireTime',getFieldValue('expireTime').format('YYYY-MM-DD HH:mm:ss'))
		formData.append('pushType',getFieldValue('pushType'))
		this.props.onSubmit(formData).then(res => {
			this.context.router.goBack(0)
		})
		// this.props.onSubmit(jsonData)
	}
	render(){
		const {getFieldDecorator} = this.props.form
		const {pushMessageInfo,destinationList} = this.props
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
						  label={<span>通知栏提示文字</span>}
						>
						{getFieldDecorator('ticker',{
							initialValue:pushMessageInfo.get('ticker',' ')
						})(
							<Input />
						)}
						</FormItem>
						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>通知标题</span>}
						>
						{getFieldDecorator('title',{
							initialValue:pushMessageInfo.get('title',' ')
						})(
							<Input />
						)}
						</FormItem>
						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>通知文字描述</span>}
						>
						{getFieldDecorator('text',{
							initialValue:pushMessageInfo.get('text',' ')
						})(
							<Input type='textarea' />
						)}
						</FormItem>

						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>跳转地</span>}
						>
						{getFieldDecorator('destinationId',{
							initialValue:''+pushMessageInfo.get('destinationId','')
						})(
							<Select>
							{destinationList.map((v,k) => {
								return (
									<Option value={''+v.get('id')} key={k}>{v.get('description')}</Option>
								)
							})}
							</Select>
						)}
						</FormItem>

						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>定时发送时间</span>}
						>
						{getFieldDecorator('startTime',{
							initialValue:moment(pushMessageInfo.get('startTime','2015-01-01 12:33:33'))
						})(
							<DatePicker showTime format='YYYY-MM-DD HH:mm:ss' />
						)}
						</FormItem>

						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>推送的过期时间</span>}
						>
						{getFieldDecorator('expireTime',{
							initialValue:moment(pushMessageInfo.get('expireTime','2015-01-01 12:33:33'))
						})(
							<DatePicker showTime format='YYYY-MM-DD HH:mm:ss' />
						)}
						</FormItem>

						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>推送类型</span>}
						>
						{getFieldDecorator('pushType',{
							initialValue:pushMessageInfo.get('pushType','')
						})(
							<Select style={{width:'100%'}}>
								<Option value='1' key='1'>广播</Option>
							</Select>
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
