import React from 'react'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import styles from './CreateEditPanel.scss'
import {fromJS} from 'immutable'
import {Form,Input,Select,Checkbox,Upload,Button,Icon,Row,Col,Spin,Tag,notification,TreeSelect} from 'antd'
import EnhanceInput from '../../components/common/EnhanceInput'
import config from '../../config'
import AddStoryRoleModal from '../../components/story/AddStoryRoleModal'

import _ from 'lodash'
import DraftComponent from '../../components/DraftComponent'
const FormItem = Form.Item
const Option = Select.Option
const ButtonGroup = Button.Group;
const tags =['pink','red','orange','green','cyan','blue','purple']


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
			guideSoundFileList:[],
			storyTags:[],
			spin:false,
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handlePicDisplay = this.handlePicDisplay.bind(this)
		this.handleSaveAsDraft = this.handleSaveAsDraft.bind(this)
	}
	componentWillReceiveProps(nextProps){
		if(!nextProps.storyInfo.isEmpty()
		&&this.props.storyInfo.get('coverUrl')!=nextProps.storyInfo.get('coverUrl')
		&&this.props.storyInfo.get('preCoverUrl')!=nextProps.storyInfo.get('preCoverUrl')
		&&this.props.storyInfo.get('backgroundUrl')!=nextProps.storyInfo.get('backgroundUrl')){
			this.setState({
				coverFileList:nextProps.storyInfo.get('coverUrl')?[_.extend(new File([],''),{
					uid:-1,
					url:nextProps.storyInfo.get('coverUrl')
				})]:[],
				previewFileList:nextProps.storyInfo.get('preCoverUrl')?[_.extend(new File([],''),{
					uid:-1,
					url:nextProps.storyInfo.get('preCoverUrl')
				})]:[],
				backgroundFileList:nextProps.storyInfo.get('backgroundUrl')?[_.extend(new File([],''),{
					uid:-1,
					url:nextProps.storyInfo.get('backgroundUrl')
				})]:[]
			})
		}
		if(!nextProps.storyRoleInfo.isEmpty()){
			this.setState({
				storyRoleInfo:nextProps.storyRoleInfo
			})
		}
		if(!nextProps.storyTagInfo.isEmpty()){
			this.setState({
				storyTags:nextProps.storyTagInfo.map(v => v.get('id')).toJS()
			})
		}
	}
	handleSubmit(isDraft,e){
		const {getFieldValue} = this.props.form
		this.setState({
			spin:true
		})
		e.preventDefault()
		const formData = new FormData()
		formData.append('title',getFieldValue('title'))
		formData.append('author',getFieldValue('author'))
		// formData.append('soundEffects_id',getFieldValue('soundEffect'))
		formData.append('content',JSON.stringify(this.refs.draft.getData()))
		// TODO: 啥意思
		formData.append('draft',isDraft)
		formData.append('storyTags',this.state.storyTags.join(','))
		formData.append('press',getFieldValue('publish'))
		formData.append('guide',getFieldValue('tips'))
		formData.append('readGuide',getFieldValue('readGuide')||'')
		formData.append('coverFile',this.state.coverFileList[0]||new File([],''))
		formData.append('preCoverFile',this.state.previewFileList[0]||new File([],''))
		formData.append('backgroundFile',this.state.backgroundFileList[0]||new File([],''))
		formData.append('originSoundFile',this.state.audioFileList[0]||new File([],''))
		formData.append('guideSoundFile',this.state.guideSoundFileList[0]||new File([],''))
		formData.append('price',getFieldValue('price')||0)
		formData.append('defaultBackGroundMusicId',getFieldValue('backgroundMusic'))
		if(this.props.type=='create'){
			const roleData = this.roleData||{}
			formData.append('roleName',roleData.roleName||'')
			formData.append('roleIconFile',roleData.roleIconFile||'')
			formData.append('roleAudioFile',roleData.roleAudioFile||'')
			formData.append('roleExtra',JSON.stringify(roleData.roleExtra)||'')
		}
		this.props.onSubmit(formData).then(res => {
			this.setState({
				spin:false
			})

		})
		this.context.router.goBack(0)
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
	addStoryTag(storyId,tagId){

		fetch(config.api.story.tag.add(storyId,tagId),{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			},
		}).then(res => res.json()).then(res => {
			console.log(res)
			notification.success({message:'标签添加成功'})
		})
	}
	deleteStoryTag(storyId,tagId){
		fetch(config.api.story.tag.delete(storyId,tagId),{
			method:'delete',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			},
		}).then(res => res).then(res => {
			notification.success({message:'删除成功'})
		})
	}
	deleteCover(storyId,coverUrl){
		let formData = new FormData()
		formData.append('id',storyId)
		formData.append('query',coverUrl)
		fetch(config.api.story.cover.delete,{
			method:'POST',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			},
			body:formData
		}).then(res => res).then(res => {
			notification.success({message:'删除成功'})
		})
	}
	handleEditStoryRole = roleData => {
		let audioForm = new FormData()
		audioForm.append('audio',roleData.roleAudioFile)
		let iconForm = new FormData()
		iconForm.append('icon',roleData.roleIconFile)
		const uploadPromise = [roleData.roleAudioFile&&roleData.roleAudioFile.size>0?fetch(config.api.role.audio,{
			method:'POST',
			headers:{
				'authorization':sessionStorage.getItem('auth'),
			},
			body:audioForm
		}).then(res => res.json()):null,
		roleData.roleIconFile&&roleData.roleIconFile.size>0?fetch(config.api.role.icon,{
			method:'POST',
			headers:{
				'authorization':sessionStorage.getItem('auth'),
			},
			body:iconForm
		}).then(res => res.json()):null]
		Promise.all(uploadPromise).then(res => {
			fetch(config.api.role.edit(this.props.storyRoleInfo.get('id')||''),{
				method:'PUT',
				headers:{
					'authorization':sessionStorage.getItem('auth'),
					'content-type':'application/json'
				},
				body:JSON.stringify({
					id:this.props.storyRoleInfo.get('id'),
					storyId:this.props.storyInfo.get('id'),
					name:roleData.roleName,
					audio:roleData.roleAudioFile&&roleData.roleAudioFile.size>0?res[0].obj.url:roleData.roleAudioFile?roleData.roleAudioFile.url:'',
					icon:roleData.roleIconFile&&roleData.roleIconFile.size>0?res[1].obj.url:roleData.roleIconFile?roleData.roleIconFile.url:'',
					extra:JSON.stringify(roleData.roleExtra),
				})
			}).then(res => {
				return res.json()
			}).then(res => {
				if(res.status == 2){
					notification.error({
						message:res.errorMes
					})
				}else{
					notification.success({
						message:'角色修改成功'
					})
				}
			})
		})
	}
	renderStoryRole(){
		return (
			<Button size='small' type='primary' onClick={()=>{
				this.setState({
					addStoryRoleDisplay:true
				})
			}}>添加故事角色</Button>
		)
	}
	render(){
		const {storyInfo,storyTags,soundEffects,backgroundMusics,soundEffectByTag} = this.props
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
					<CreateEditHeader onDelete={this.props.onDelete} title={this.props.title}/>
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
						this.props.type=='edit'?<Input/>:<EnhanceInput />
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
						this.props.type=='edit'?<Input/>:<EnhanceInput />
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
						this.props.type=='edit'?<Input/>:<EnhanceInput />
					)}
					</FormItem>

					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>故事标签</span>}
					>
					{this.state.storyTags.map((v,k) => {
						let colorIndex = _.random(0,6)
						return <Tag onClose={(e)=>{
							this.setState({
								storyTags:this.state.storyTags.filter(s => s != v)
							})
							if(this.props.type=='edit'){
								this.deleteStoryTag(storyInfo.get('id'),v)
							}
						}} closable color={tags[colorIndex%7]} key={k}>{storyTags.find(s => s.get('id')==v,fromJS({}),fromJS({})).get('content')}</Tag>
					})}
					{/*<TreeSelect treeData={this.props.storyTagsByParent.toJS()} onSelect={(value) => {
						if(this.props.type=='edit'){
							this.addStoryTag(storyInfo.get('id'),value)
						}
						this.setState({
							storyTags:_.concat(this.state.storyTags,value)
						})
					}}/>*/}
					<Select placeholder={'一级标签'} style={{width:240,marginBottom:10}} value={this.state.firstTag} onSelect={(value)=>{
						this.setState({
							firstTag:value
						})
					}}>
						{this.props.storyTagsByParent.map(v => {
							return (<Option title={v.get('label')} value={v.get('value')} key={v.get('value')}>{v.get('label')}</Option>)
						})}
					</Select>

					<Select placeholder={'二级标签'} style={{width:240}} onSelect={(value)=>{
						if(this.props.type=='edit'){
							this.addStoryTag(storyInfo.get('id'),value)
						}
						this.setState({
							storyTags:_.concat(this.state.storyTags,value)
						})
					}}>
						{this.props.storyTagsByParent.find(v => v.get('value')==this.state.firstTag,fromJS({}),fromJS({})).get('children',fromJS([])).map(v => {
							return (<Option title={v.get('label')} value={v.get('value')} key={v.get('value')}>{v.get('label')}</Option>)
						})}
					</Select>
					</FormItem>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:8}}
					  label={<span>阅读指导</span>}
					>
					{getFieldDecorator('tips',{
						initialValue:storyInfo.get('guide')
					})(
						this.props.type=='edit'?<Input type='textarea' autosize={{minRows:4}}/>:<EnhanceInput type='textarea' autosize={{minRows:4}}/>
					)}
					</FormItem>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:8}}
					  label={<span>朗读指导</span>}
					>
					{getFieldDecorator('readGuide',{
						initialValue:storyInfo.get('readGuide')
					})(
						this.props.type=='edit'?<Input type='textarea' autosize={{minRows:4}}/>:<EnhanceInput type='textarea' autosize={{minRows:4}}/>
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
						fileList={this.state.coverFileList}
						onRemove={file => {
							this.deleteCover(storyInfo.get('id'),'coverUrl')
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
						fileList={this.state.previewFileList}
						onRemove={file => {
							this.deleteCover(storyInfo.get('id'),'preCoverUrl')
							this.setState({
								previewFileList:[]
							})
						}}
						beforeUpload={(file,fileList)=>{
							this.handlePicDisplay(fileList,'previewFileList')
							return false
						}}
					>
					{this.state.previewFileList.length>0?null:'选择图片'}
					</Upload>
					</FormItem>
					<FormItem
						labelCol={{span:2}}
						wrapperCol={{span:4}}
						label={<span>背景图片</span>}
					>
					<Upload
						listType="picture-card"
						fileList={this.state.backgroundFileList}
						onRemove={file => {
							this.deleteCover(storyInfo.get('id'),'backgroundUrl')
							this.setState({
								backgroundFileList:[]
							})
						}}
						beforeUpload={(file,fileList)=>{
							this.handlePicDisplay(fileList,'backgroundFileList')
							return false
						}}
					>
					{this.state.backgroundFileList.length>0?null:'选择图片'}
					</Upload>
					</FormItem>
					<FormItem
						labelCol={{span:2}}
						wrapperCol={{span:4}}
						label={<span>平台录音</span>}
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
					  {storyInfo.get('originSoundUrl')?<div>
					  	  <a href={storyInfo.get('originSoundUrl')}>{storyInfo.get('originSoundUrl')}</a>
						  <audio ref='audio' controls>
							<source src={storyInfo.get('originSoundUrl')} type="audio/wav"/>
						  </audio>
					  </div>:null}
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
					  label={<span>背景音乐</span>}
					>
					{getFieldDecorator('backgroundMusic',{
						initialValue:''+storyInfo.get('defaultBackGroundMusicId')
					})(
						<TreeSelect treeData={_.concat([{
							value:'0',
							label:'无',
							key:'0'
						}],this.props.backgroundMusicByTag.toJS())} style={{width:240}} />
					)}
					</FormItem>
					<FormItem
						labelCol={{span:2}}
						wrapperCol={{span:20}}
						label={<span>内容</span>}
					>
						<DraftComponent ref='draft' soundEffectByTag={soundEffectByTag} soundEffects={soundEffects} value={storyInfo.get('content')}/>
					</FormItem>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>故事角色</span>}
					>
					{this.renderStoryRole()}
					</FormItem>
					<FormItem
						labelCol={{span:2}}
						wrapperCol={{span:4,offset:2}}
					>
					{this.state.spin?<Spin />:<ButtonGroup>
					  <Button type="primary" htmlType="submit">
						{'保存'}
					  </Button>
					  <Button type="primary" htmlType="submit" onClick={this.handleSaveAsDraft}>
						{'保存为草稿'}
					  </Button>
				  </ButtonGroup>}
					</FormItem>
				</Form>
				{this.state.addStoryRoleDisplay?<AddStoryRoleModal
					ref='addStoryRole'
					onOk={(roleData)=>{
						console.log(roleData)
						if(this.props.type=='create'){
							this.roleData = roleData
						}else{
							this.handleEditStoryRole(roleData)
						}
						this.setState({
							addStoryRoleDisplay:false
						})
					}}
					onCancel={()=>{this.setState({
						addStoryRoleDisplay:false
					})}}
					storyRoleInfo={this.props.storyRoleInfo}
					content={this.refs.draft.getData()}
					 />:null}
				</div>
			</div>
		)
	}
}

export default Form.create()(CreateEditPanel)
