import React from 'react'
import styles from './CreateEditPanel.scss'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import {Form,Upload,Button,Icon} from 'antd'
import EnhanceInput from '../../components/common/EnhanceInput'
import _ from 'lodash'
const FormItem = Form.Item


class CreateEditPanel extends React.Component {
	constructor(){
		super()
		this.state = {
			fileList:[],
			zipFileList:[]
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
		formData.append('zip',this.state.zipFileList[0]||new File([],''))
		this.props.onSubmit(formData)
	}
	render(){
		const {discoverInfo} = this.props
		console.log(discoverInfo.toJS())
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
					<Upload
						listType="picture-card"
						fileList={!discoverInfo.get('pictureUrl')?this.state.fileList:[{
							uid:-1,
							url:discoverInfo.get('pictureUrl')
						}]}
						onRemove={file => {
							this.setState({
								fileList:[]
							})
						}}
						beforeUpload={(file,fileList)=>{
							this.handlePicDisplay(fileList,'fileList')
							return false
						}}
					>
						选择图片
					</Upload>
					</FormItem>
					<FormItem
						label='压缩包'
						labelCol={{span:2}}
						wrapperCol={{span:4}}
					>
					<Upload
					   fileList={this.state.zipFileList}
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
