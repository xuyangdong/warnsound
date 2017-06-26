import React from 'react'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import styles from './CreateEditPanel.scss'
import {fromJS} from 'immutable'
import {Form,Input,Select,Checkbox,Upload,Button,Icon,Row,Col} from 'antd'
import EnhanceInput from '../../components/common/EnhanceInput'

import _ from 'lodash'
import DraftComponent from '../../components/DraftComponent'
const FormItem = Form.Item
const Option = Select.Option
const ButtonGroup = Button.Group;


class CreateEditPanel extends React.Component {
	static contextTypes = {
		router:React.PropTypes.object
	}
	constructor(){
		super()
		this.state = {
			autoBeauty:true,
			coverFileList:[],
			previewFileList:[],
			backgroundFileList:[],
			audioFileList:[],
			guideSoundFileList:[]
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handlePicDisplay = this.handlePicDisplay.bind(this)
		this.handleSaveAsDraft = this.handleSaveAsDraft.bind(this)
	}
	handleSubmit(isDraft,e){
		const {getFieldValue} = this.props.form
		e.preventDefault()
		console.log(isDraft)
		const formData = new FormData()
		formData.append('title',getFieldValue('title'))
		formData.append('author',getFieldValue('author'))
		// formData.append('soundEffects_id',getFieldValue('soundEffect'))
		formData.append('content',JSON.stringify(this.refs.draft.getData()))
		// TODO: 啥意思
		formData.append('draft',isDraft)
		formData.append('press',getFieldValue('publish'))
		formData.append('guide',getFieldValue('tips'))
		formData.append('coverFile',this.state.coverFileList[0]||new File([],''))
		formData.append('preCoverFile',this.state.previewFileList[0]||new File([],''))
		formData.append('backgroundFile',this.state.backgroundFileList[0]||new File([],''))
		formData.append('originSoundFile',this.state.audioFileList[0]||new File([],''))
		formData.append('guideSoundFile',this.state.guideSoundFileList[0]||new File([],''))
		formData.append('price',getFieldValue('price'))
		formData.append('defaultBackGroundMusicId',getFieldValue('backgroundMusic'))
		this.props.onSubmit(formData).then(res => {
			this.context.router.goBack(0)
		})
	}
	// TODO: 目前支持能做到单文件，不知道怎么做到fileList显示一整个列表
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
	handleContent(content){
		if(content)
			return JSON.parse(content).map(v => v.content).join('\n')
		return content
	}
	handleSaveAsDraft(e){
		this.handleSubmit(1,e)
	}
	render(){
		const {storyInfo,soundEffects,backgroundMusics} = this.props
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			  	labelCol: {
					xs: { span: 24 },
					sm: { span: 6 },
				},
				wrapperCol: {
					xs: { span: 24 },
					sm: { span: 14 },
				},
			 };
		return (
			<div className={styles.container}>
				<div>
					<CreateEditHeader title={this.props.title}/>
				</div>
				<div className={styles.formPanel}>
				<Form onSubmit={this.handleSubmit.bind(this,0)}>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>标题</span>}
					>
					{getFieldDecorator('title',{
						initialValue:storyInfo.get('title')
					})(
						<Input />
					)}
					</FormItem>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>作者</span>}
					>
					{getFieldDecorator('author',{
						initialValue:storyInfo.get('author')
					})(
						<Input />
					)}
					</FormItem>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>出版社</span>}
					>
					{getFieldDecorator('publish',{
						initialValue:storyInfo.get('press')
					})(
						<Input />
					)}
					</FormItem>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>阅读指导</span>}
					>
					{getFieldDecorator('tips',{
						initialValue:storyInfo.get('guide')
					})(
						<Input />
					)}
					</FormItem>
					<FormItem
						labelCol={{span:2}}
						wrapperCol={{span:4}}
						label={<span>首页图片</span>}
					>
					<div className={styles.clearfix}>
					<Upload
						listType="picture-card"
						fileList={!storyInfo.get('coverUrl')?this.state.coverFileList:[{
							uid:-1,
							url:storyInfo.get('coverUrl')
						}]}
						onRemove={file => {
							this.setState({
								coverFileList:[]
							})
						}}
						beforeUpload={(file,fileList)=>{
							this.handlePicDisplay(fileList,'coverFileList')
							return false
						}}
					>
						{this.state.coverFileList.length>0?null:'选择图片'}
					</Upload>
					</div>
					</FormItem>
					<FormItem
						labelCol={{span:2}}
						wrapperCol={{span:4}}
						label={<span>预览界面</span>}
					>
					<Upload
						listType="picture-card"
						fileList={!storyInfo.get('preCoverUrl')?this.state.previewFileList:[{
							uid:-1,
							url:storyInfo.get('preCoverUrl')
						}]}
						beforeUpload={(file,fileList)=>{
							this.handlePicDisplay(fileList,'previewFileList')
							return false
						}}
					>
						选择图片
					</Upload>
					</FormItem>
					<FormItem
						labelCol={{span:2}}
						wrapperCol={{span:4}}
						label={<span>背景图片</span>}
					>
					<Upload
						listType="picture-card"
						fileList={!storyInfo.get('backgroundUrl')?this.state.backgroundFileList:[{
							uid:-1,
							url:storyInfo.get('backgroundUrl')
						}]}

						beforeUpload={(file,fileList)=>{
							this.handlePicDisplay(fileList,'backgroundFileList')
							return false
						}}
					>
						选择图片
					</Upload>
					</FormItem>
					<FormItem
						labelCol={{span:2}}
						wrapperCol={{span:4}}
						label={<span>背景音效</span>}
					>
					 <Upload
					 	fileList={this.state.audioFileList}
						beforeUpload={(file,fileList)=>{
							this.setState({
								audioFileList:fileList,
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
						wrapperCol={{span:4}}
						label={<span>朗读指导</span>}
					>
					 <Upload
					 	fileList={this.state.guideSoundFileList}
						beforeUpload={(file,fileList)=>{
							this.setState({
								guideSoundFileList:fileList,
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
					  wrapperCol={{span:4}}
					  label={<span>价格</span>}
					>
					{getFieldDecorator('price',{
						initialValue:storyInfo.get('price')
					})(
						<Input />
					)}
					</FormItem>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>背景音效</span>}
					>
					{getFieldDecorator('backgroundMusic',{
						initialValue:''+storyInfo.get('defaultBackGroundMusicId')
					})(
						<Select style={{width:240}}>
						{
							backgroundMusics.map((v,k)=> (
								<Option value={''+v.get('id')} title={v.get('description')} key={v.get('id')}>{v.get('description')}</Option>
							))
						}
						</Select>
					)}
					</FormItem>
					<FormItem
						labelCol={{span:2}}
						wrapperCol={{span:20}}
						label={<span>内容</span>}
					>
						<DraftComponent ref='draft' soundEffects={soundEffects} value={storyInfo.get('content')}/>
					</FormItem>
					<FormItem
						labelCol={{span:2}}
						wrapperCol={{span:4,offset:2}}
					>
					<ButtonGroup>
					  <Button type="primary" htmlType="submit">
						保存
					  </Button>
					  <Button type="primary" htmlType="submit" onClick={this.handleSaveAsDraft}>
						保存为草稿
					  </Button>
				  </ButtonGroup>
					</FormItem>
				</Form>
				</div>
			</div>
		)
	}
}

export default Form.create()(CreateEditPanel)
