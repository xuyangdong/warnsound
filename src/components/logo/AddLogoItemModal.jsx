import React from 'react'
import {Modal,Form,Input} from 'antd'
import UploadAvatar from '../common/UploadAvatar'
import _ from 'lodash'
const FormItem = Form.Item

class AddLogoItemModal extends React.Component {
	constructor(){
		super()
		this.state = {
			fileList:[],
			imgUploading:false,
		}
	}
	componentDidMount(){
		const {setFieldsValue} = this.props.form
		const {data} = this.props
		if(data){
			setFieldsValue({
				name:data.name,
				description:data.description,
				measure:data.measure,
				extra:data.extra
			})
			this.setState({
				fileList:data.icon?[_.extend(new File([],''),{
					uid:-1,
					url:data.icon
				})]:[]
			})
		}
	}
	handleImgChange = (file,fileList) => {
		this.setState({
			fileList:fileList
		})
	}
	handleImgRemove = () => {
		this.setState({
			fileList:[]
		})
	}
	handleOk = () => {
		const {getFieldValue} = this.props.form
		this.props.onOk({
			name:getFieldValue('name'),
			measure:getFieldValue('measure'),
			description:getFieldValue('description'),
			file:this.state.fileList[0],
			extra:getFieldValue('extra')
		})
	}
	render(){
		const {getFieldDecorator} = this.props.form
		return (
			<Modal
			title='添加徽章项'
			visible={true}
			onOk={this.handleOk}
			onCancel={this.props.onCancel}
			>
				<Form>
					<FormItem
					label='名称'
					labelCol={{span: 4}}
					wrapperCol={{span: 6}}
					>{
						getFieldDecorator('name')(<Input />)
					}
					</FormItem>
					<FormItem
					label='描述'
					labelCol={{span: 4}}
					wrapperCol={{span: 6}}
					>{
						getFieldDecorator('description')(<Input />)
					}
					</FormItem>
					<FormItem
					label='ICON'
					labelCol={{span: 4}}
					wrapperCol={{span: 6}}
					>
					<UploadAvatar
					value={this.state.fileList}
					onChange={this.handleImgChange}
					onRemove={this.handleImgRemove}
					/>
					</FormItem>
					<FormItem
					label='Measure'
					labelCol={{span: 4}}
					wrapperCol={{span: 6}}
					>{
						getFieldDecorator('measure')(<Input />)
					}
					</FormItem>
					<FormItem
					label='extra'
					labelCol={{span: 4}}
					wrapperCol={{span: 6}}
					>{
						getFieldDecorator('extra')(<Input />)
					}
					</FormItem>
				</Form>
			</Modal>
		)
	}
}

export default Form.create()(AddLogoItemModal)
