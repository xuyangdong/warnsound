import React from 'react'
import styles from './CreateEditPanel.scss'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import {Form,Upload,Input,Button,Icon,Spin,notification} from 'antd'
import PropTypes from 'prop-types'
import {uploadToOSS} from 'actions/common'
import _ from 'lodash'
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
	componentWillReceiveProps(nextProps){
		if(!nextProps.appInfo.isEmpty()){
			this.setState({
				appFileList:nextProps.appInfo.get('url')?[_.extend(new File([],nextProps.appInfo.get('url')),{
					uid:-1,
					url:nextProps.appInfo.get('url')
				})]:[]
			})
		}
	}
	uploadResources = () => {
		if(this.state.appFileList[0] && this.state.appFileList[0].size>0){
			return uploadToOSS(this.state.appFileList[0]).then(res => {
				return res
			})
		}else{
			return Promise.resolve(this.props.appInfo.get('url'))
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
		this.uploadResources().then(res => {
			formData.append('version',getFieldValue('version'))
			formData.append('updateHint',getFieldValue('updateHint'))
			formData.append('appFile',res)
			this.props.onSubmit(formData).then(res => {
				this.setState({
					spin:false
				})
				notification.success({message:'app发布成功'})
				this.context.router.goBack()
			})
		})
	}
	render(){
		const {getFieldDecorator} = this.props.form
		const {appInfo} = this.props
		return (
			<div className={styles.container}>
				<div>
					<CreateEditHeader onDelete={this.props.onDelete} title={this.props.title}/>
				</div>
				<div className={styles.formPanel}>
					<Form>
						<FormItem
						  label="版本号"
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						>{getFieldDecorator('version',{
							initialValue:appInfo.get('version')
						})(
							<Input />
						)}
						</FormItem>
						<FormItem
						  label="更新提示"
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						>{getFieldDecorator('updateHint',{
							initialValue:appInfo.get('updateHint')
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
