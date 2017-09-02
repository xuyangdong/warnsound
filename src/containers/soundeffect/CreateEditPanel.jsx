import React from 'react'
import styles from './CreateEditPanel.scss'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import {Form,Input,Upload,Button,Icon,Select,Spin,notification} from 'antd'
import _ from 'lodash'
import PropTypes from 'prop-types'
import UploadAvatar from '../../components/common/UploadAvatar'
const FormItem = Form.Item
const Option = Select.Option

class CreateEditPanel extends React.Component {
	static contextTypes = {
		router:PropTypes.object
	}
	constructor(){
		super()
		this.state = {
			fileList:[],
			spin:false
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentWillReceiveProps(nextProps){
		if(!nextProps.soundEffectInfo.isEmpty()
		&&this.props.soundEffectInfo.get('icon')!=nextProps.soundEffectInfo.get('icon')){
			console.log("-->:",nextProps.soundEffectInfo.toJS())
			this.setState({
				coverFileList:nextProps.soundEffectInfo.get('icon')?[_.extend(new File([],''),{
					uid:-1,
					url:nextProps.soundEffectInfo.get('icon')
				})]:[]
			})
		}
	}
	handleSubmit(e){
		e.preventDefault()
		this.setState({
			spin:true
		})
		const {getFieldValue} = this.props.form
		let formData = new FormData()
		formData.append('description',getFieldValue('description'))
		this.state.fileList.forEach(v => {
			formData.append('uploadFile',v||new File([],''))
		})
		// formData.append('uploadFile',this.state.fileList[0]||new File([],''))
		formData.append('tagId',getFieldValue('tag'))
		if(this.state.coverFileList[0]&& this.state.coverFileList[0].size>0){
			formData.append('icon',this.state.coverFileList[0])
		}
		this.props.onSubmit(formData).then(res => {
			this.setState({
				spin:false
			})
			notification.success({message:'音效上传成功'})
		})
		this.context.router.goBack()
	}
	render(){
		const {getFieldDecorator} = this.props.form
		const {soundEffectInfo,tagList,soundEffectTag} = this.props
		console.log("ppppp:",this.state.coverFileList)
		return (
			<div className={styles.container}>
				<div>
					<CreateEditHeader onDelete={this.props.onDelete} title={this.props.title}/>
				</div>
				<div className={styles.formPanel}>
				<Form onSubmit={this.handleSubmit}>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>描述</span>}
					>
					{getFieldDecorator('description',{
						initialValue:soundEffectInfo.get('description')
					})(
						<Input />
					)}
					</FormItem>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>标签</span>}
					>
					{getFieldDecorator('tag',{
						initialValue:''+soundEffectTag.getIn([0,'id'])
					})(	<Select style={{width:240}}>
						{
							tagList.map((v,k)=> (
								<Option value={''+v.get('id')} title={v.get('content')} key={v.get('id')}>{v.get('content')}</Option>
							))
						}
						</Select>
					)}
					</FormItem>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>上传</span>}
					>
					<Upload
					   multiple
					   fileList={this.state.fileList}
					   beforeUpload={(file,fileList)=>{
						   this.setState({
							   fileList:_.concat(this.state.fileList,fileList),
						   })
						   return false
					   }}
					   onRemove={(file) => {
						   this.setState({
							   fileList:this.state.fileList.filter(v => v!==file)
						   })
						   return true
					   }}
					>
					   <Button>
						 <Icon type="upload" /> Upload
					   </Button>
					 </Upload>
					</FormItem>
					<FormItem
						labelCol={{span:2}}
				  		wrapperCol={{span:4}}
				  		label={<span>音效图片</span>}
					>
						<UploadAvatar value={this.state.coverFileList} onChange={(file,fileList) => {
							this.setState({
								coverFileList:fileList
							})
						}} onRemove={()=>{
							this.setState({
								coverFileList:[]
							})
						}}/>
					</FormItem>
					<FormItem
						labelCol={{span:2}}
						wrapperCol={{span:4,offset:2}}
					>
					  {this.state.spin?<Spin />:<Button type="primary" htmlType="submit">
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
