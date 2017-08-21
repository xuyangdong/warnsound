import React from 'react'
import styles from './CreateEditPanel.scss'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import {Form,Input,Icon, Button } from 'antd'
import UploadAvatar from '../../components/common/UploadAvatar'
import _ from 'lodash'
import config from '../../config'
const FormItem = Form.Item

class CreateEditPanel extends React.Component {
	constructor(){
		super()
		this.state = {
			fileList:[]
		}
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.albumInfo.get('icon')){
			this.setState({
				fileList:[_.extend(new File([],''),{
					uid:-1,
					url:nextProps.albumInfo.get('icon')
				})]
			})
		}
	}
	uploadIcon = () =>{
		const {getFieldValue} = this.props.form
		if(this.state.fileList.length>0 && this.state.fileList[0].size>0){
			let formData = new FormData()
			formData.append('files',this.state.fileList[0])
			return fetch(config.api.file.post,{
				method:'post',
				headers:{
					authorization:sessionStorage.getItem('auth')
				},
				body:formData
			}).then(res => res.json()).then(res => {
				const iconUrls = res.obj.multiUrls
				let jsonData = {
					name:getFieldValue('name'),
					description:getFieldValue('description'),
					icon:iconUrls[0]
				}
				return jsonData
			})
		}else{
			return Promise.resolve({
				name:getFieldValue('name'),
				description:getFieldValue('description'),
				icon:this.props.albumInfo.get('icon')
			})
		}
	}
	handleSave = () => {
		const {getFieldValue} = this.props.form
		this.uploadIcon().then(jsonData => {
			this.props.onSubmit(jsonData)
		})
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
						label="名称"
						labelCol={{span:2}}
						wrapperCol={{span:4}}
					>{getFieldDecorator('name',{
						initialValue:this.props.albumInfo.get('name')
					})(
						<Input />
					)}
					</FormItem>
					<FormItem
						label="描述"
						labelCol={{span:2}}
						wrapperCol={{span:4}}
					>{getFieldDecorator('description',{
						initialValue:this.props.albumInfo.get('description')
					})(
						<Input />
					)}
					</FormItem>
					<FormItem
						label="封面"
						labelCol={{span:2}}
						wrapperCol={{span:4}}
					>
						<UploadAvatar value={this.state.fileList}
						onChange={(file,fileList)=>{
							this.setState({
								fileList:fileList
							})
						}}
						onRemove={()=>{
							this.setState({
								fileList:[]
							})
						}}
						 />
					</FormItem>
					<FormItem
					  label=""
					  labelCol={{span:2}}
					  wrapperCol={{span:4,offset:2}}
					>
						<Button type="primary" onClick={this.handleSave}>
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
