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
			appFileList:[],
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
		let formData = new FormData()
		formData.append('version',getFieldValue('version'))
		formData.append('updateHint',getFieldValue('updateHint'))
		formData.append('appFile',this.state.appFileList[0]||new File([],''))
		this.props.onSubmit(formData).then(res => {
			this.setState({
				spin:false
			})
			notification.success({message:'app发布成功'})
			this.context.router.goBack()
		})

	}
	render(){
		const {getFieldDecorator} = this.props.form
		return (
			<div className={styles.container}>
				<div>
					<CreateEditHeader title={this.props.title}/>
				</div>
				<div className={styles.formPanel}>
					<Form>
						<FormItem
						  label="版本号"
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						>{getFieldDecorator('version',{
							// initialValue:soundEffectInfo.get('description')
						})(
							<Input />
						)}
						</FormItem>
						<FormItem
						  label="更新提示"
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						>{getFieldDecorator('updateHint',{
							// initialValue:soundEffectInfo.get('description')
						})(
							<Input />
						)}
						</FormItem>
						<FormItem
						  label="APP文件"
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						>
						<Upload
   					 	fileList={this.state.appFileList}
   						beforeUpload={(file,fileList)=>{
   							this.setState({
   								appFileList:fileList,
   							})
   							return false
   						}}
   					 >
   					    <Button>
   					      <Icon type="upload" /> Upload
   					    </Button>
   					  </Upload>
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
