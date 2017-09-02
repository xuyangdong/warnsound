import React from 'react'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import styles from './CreateEditPanel.scss'
import {Form,Select,Upload,Input,Button,Spin,notification} from 'antd'
import _ from 'lodash'
const FormItem = Form.Item
const Option = Select.Option
class CreateEditPanel extends React.Component {
	static contextTypes = {
		router:React.PropTypes.object
	}
	constructor(){
		super()
		this.state = {
			fileList:[],
			spin:false
		}
		this.handleSubmit = this.handleSubmit.bind(this)
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
	handleSubmit(e){
		this.setState({
			spin:true
		})
		const {getFieldValue} = this.props.form
		e.preventDefault()
		let formData = new FormData()
		formData.append('parentId',getFieldValue('parent'))
		formData.append('uploadFile',this.state.fileList[0]||new File([],''))
		formData.append('content',getFieldValue('content'))
		if(this.props.type=='edit'){
			formData.append('createTime',getFieldValue('createTime'))
			formData.append('updateTime',getFieldValue('updateTime'))
			formData.append('valid',getFieldValue('valid'))
		}
		this.props.onSubmit(formData).then(res => {
			this.setState({
				spin:true
			})
			notification.success({message:'故事标签上传成功'})
		})
		this.context.router.goBack(0)
	}
	render(){
		const {getFieldDecorator} = this.props.form
		const {storyTags,storyTagInfo} = this.props
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
						  label={<span>父标签</span>}
						>
						{getFieldDecorator('parent',{
							initialValue:''+(storyTagInfo.get('parentId')||'0')
						})(
							<Select style={{width:240}}>
							<Option value="0" key="-1" title="无">无</Option>
							{
								storyTags.map((v,k)=> (
									<Option value={''+v.get('id')} title={v.get('content')} key={v.get('id')}>{v.get('content')}</Option>
								))
							}
							</Select>
						)}
						</FormItem>
						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>图片</span>}
						>
							<Upload
								listType="picture-card"
								fileList={!storyTagInfo.get('iconURL')?this.state.fileList:[{
									uid:-1,
									url:storyTagInfo.get('iconURL')
								}]}
								beforeUpload={(file,fileList)=>{
									this.handlePicDisplay(fileList,'fileList')
									return false
								}}
							>上传图片</Upload>
						</FormItem>
						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>内容</span>}
						>
						{getFieldDecorator('content',{
							initialValue:storyTagInfo.get('content')
						})(
							<Input />
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
