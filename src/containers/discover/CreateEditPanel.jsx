import React from 'react'
import styles from './CreateEditPanel.scss'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import {Form,Upload,Button,Icon,notification} from 'antd'
import EnhanceInput from '../../components/common/EnhanceInput'
import _ from 'lodash'
import UploadAvatar from '../../components/common/UploadAvatar'
import PropTypes from 'prop-types'
const FormItem = Form.Item


class CreateEditPanel extends React.Component {
	static contextTypes = {
		router:PropTypes.object
	}
	constructor(){
		super()
		this.state = {
			fileList:[],
			zipFileList:[]
		}
	}
	componentWillReceiveProps(nextProps){
		if(!nextProps.discoverInfo.isEmpty()){

			this.setState({
				fileList:nextProps.discoverInfo.get('pictureUrl')?[_.extend(new File([],''),{
					uid:-1,
					url:nextProps.discoverInfo.get('pictureUrl')
				})]:[],
				zipFileList:nextProps.discoverInfo.get('webUrl')?[_.extend({},{
					uid:-1,
					url:nextProps.discoverInfo.get('webUrl'),
					name:nextProps.discoverInfo.get('webUrl')
				})]:[]
			})
		}
	}
	handlePicDisplay(fileList,stateName){
		const fileReader = new FileReader()
		const that = this
		fileReader.onload = function(e){
			that.setState({
				[stateName]:[_.extend(fileList[0],{url:e.target.result,thumbUrl:e.target.result})]
			},()=>{console.log(that.state[stateName])})
		}
		fileReader.readAsDataURL(fileList[0])
	}
	handleSubmit = (e) => {
		const {getFieldValue} = this.props.form
		e.preventDefault()
		let formData = new FormData()
		formData.append('title',getFieldValue('title'))
		formData.append('description',getFieldValue('description'))
		formData.append('picture',this.state.fileList[0]||new File([],''))
		if(this.state.zipFileList[0] && this.state.zipFileList[0].size >0){
			formData.append('zip',this.state.zipFileList[0])
		}else{
			formData.append('zip',new File([],''))
		}
		notification.info({message:'请求已发送'})
		this.props.onSubmit(formData)
		this.context.router.goBack(0)

	}
	render(){
		const {discoverInfo} = this.props
		console.log("asdf",discoverInfo.toJS())
		const {getFieldDecorator} = this.props.form
		return (
			<div className={styles.container}>
				<div>
					<CreateEditHeader title={this.props.title}/>
				</div>
				<div className={styles.formPanel}>
					<FormItem
						label='标题'
						labelCol={{span:2}}
						wrapperCol={{span:4}}
					>{getFieldDecorator('title',{
						initialValue:discoverInfo.get('title')
					})(
						<EnhanceInput />
					)}</FormItem>
					<FormItem
						label='描述'
						labelCol={{span:2}}
						wrapperCol={{span:4}}
					>{getFieldDecorator('description',{
						initialValue:discoverInfo.get('description')
					})(
						<EnhanceInput />
					)}</FormItem>
					<FormItem
						label='图片'
						labelCol={{span:2}}
						wrapperCol={{span:4}}
					>

					<UploadAvatar value={this.state.fileList} onChange={(file,fileList) => {
						this.setState({
							fileList:fileList
						})
					}}
					onRemove={() => {
						this.setState({
							fileList:[]
						})
					}}
					/>
					</FormItem>
					<FormItem
						label='压缩包'
						labelCol={{span:2}}
						wrapperCol={{span:4}}
					>
					<Upload
					   fileList={this.state.zipFileList}
					   onRemove={() => {
						   this.setState({
							   zipFileList:[]
						   })
					   }}
					   beforeUpload={(file,fileList)=>{
						   this.setState({
							   zipFileList:fileList,
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
						wrapperCol={{span:4,offset:2}}
					>
					<Button onClick={this.handleSubmit}>保存</Button>
					</FormItem>
				</div>
			</div>
		)
	}
}

export default Form.create()(CreateEditPanel)
