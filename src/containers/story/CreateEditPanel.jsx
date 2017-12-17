import React from 'react'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import styles from './CreateEditPanel.scss'
import {fromJS} from 'immutable'
import {Form,Input,InputNumber,Select,Checkbox,Upload,Button,Icon,Row,Col,Spin,Tag,notification,TreeSelect} from 'antd'
import EnhanceInput from '../../components/common/EnhanceInput'
import EnhanceSelect from '../../components/common/EnhanceSelect'
import config from '../../config'
import AddStoryRoleModal from '../../components/story/AddStoryRoleModal'
import plyr from 'plyr'
import _ from 'lodash'
import DraftComponent from '../../components/DraftComponent'
import ReadGuideInput from '../../components/story/ReadGuideInput'
import classnames from 'classnames'
import MultiRolePanel from '../../components/story/MultiRolePanel'
import {Link} from 'react-router'
import HotStoryModal from '../../components/story/HotStoryModal'
import {uploadToOSS} from 'actions/common'
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
			storyContentData:[],
			displayHotStory:false
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handlePicDisplay = this.handlePicDisplay.bind(this)
		this.handleSaveAsDraft = this.handleSaveAsDraft.bind(this)
	}
	componentDidMount(){
		this.player = plyr.setup(this.refs.backgroundMusic)
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
	uploadCoverFileList = () => {
		if(this.state.coverFileList[0] && this.state.coverFileList[0].size>0){
			return uploadToOSS(this.state.coverFileList[0]).then(res => {
				console.log("coverFileList:",res)
				return res
			})
		}else{
			return Promise.resolve(this.props.storyInfo.get('coverUrl'))
		}
	}
	uploadPreviewFileList = () => {
		if(this.state.previewFileList[0] && this.state.previewFileList[0].size>0){
			return uploadToOSS(this.state.previewFileList[0]).then(res => {
				console.log("previewFileList:",res)
				return res
			})
		}else{
			return Promise.resolve(this.props.storyInfo.get('preCoverUrl'))
		}
	}
	uploadBackgroundFileList = () => {
		if(this.state.backgroundFileList[0] && this.state.backgroundFileList[0].size>0){
			return uploadToOSS(this.state.backgroundFileList[0]).then(res => {
				console.log("backgroundFileList:",res)
				return res
			})
		}else{
			return Promise.resolve(this.props.storyInfo.get('backgroundUrl'))
		}
	}
	//已废弃
	uploadGuideSoundFileList = () => {
		if(this.state.guideSoundFileList[0] && this.state.guideSoundFileList[0].size>0){
			return uploadToOSS(this.state.guideSoundFileList[0]).then(res => {
				console.log("guideSoundFileList:",res)
				return res
			})
		}else{
			return Promise.resolve(this.props.storyInfo.get('guideSoundFile'))
		}
	}
	uploadOriginSoundFileList = () => {
		if(this.state.audioFileList[0] && this.state.audioFileList[0].size>0){
			return uploadToOSS(this.state.audioFileList[0]).then(res => {
				console.log("audioFileList:",res)
				return res
			})
		}else{
			return Promise.resolve(this.props.storyInfo.get('originSoundFile'))
		}
	}
	handleSubmit(isDraft,e){
		const {getFieldValue} = this.props.form
		this.setState({
			spin:true
		})
		e.preventDefault()
		const formData = new FormData()
		let storySetId = getFieldValue('storySet') || []
		if(storySetId.length==0){
			storySetId = 0
		}
		Promise.all([
			this.uploadCoverFileList(),
			this.uploadPreviewFileList(),
			this.uploadBackgroundFileList(),
			this.uploadOriginSoundFileList(),
			this.uploadGuideSoundFileList()
		]).then(([coverFile,preCoverFile,backgroundFile,originSoundFile,guideSoundFile]) => {
			console.log("11-->:",coverFile,preCoverFile,backgroundFile,originSoundFile,guideSoundFile)
			formData.append('title',getFieldValue('title'))
			formData.append('author',getFieldValue('author'))
			// formData.append('soundEffects_id',getFieldValue('soundEffect'))
			formData.append('content',JSON.stringify(this.refs.draft.getDataWithCover()))
			// TODO: 啥意思
			formData.append('draft',isDraft)
			formData.append('tagList',this.state.storyTags.join(','))
			formData.append('press',getFieldValue('publish'))
			formData.append('guide',JSON.stringify(this.refs.readGuide.getData()))
			formData.append('readGuide',getFieldValue('readGuide')||'')
			formData.append('readGuide',JSON.stringify(this.refs.readGuide.getData()))
			formData.append('coverFile',coverFile)
			formData.append('preCoverFile',preCoverFile)
			formData.append('backgroundFile',backgroundFile)
			formData.append('originSoundFile',originSoundFile)
			formData.append('guideSoundFile',guideSoundFile)

			formData.append('price',getFieldValue('price')||0)
			formData.append('defaultBackGroundMusicId',getFieldValue('backgroundMusic'))
			formData.append('albumId',getFieldValue('album').join(',')||'')
			formData.append('setId',storySetId)
			formData.append('readTime',getFieldValue('readTime')||'')
			if(this.props.type=='create'){
				const roleData = this.roleData||{}
				formData.append('roleName',roleData.roleName||'')
				formData.append('roleIconFile',roleData.roleIconFile||'')
				formData.append('roleAudioFile',roleData.roleAudioFile||'')
				formData.append('roleExtra',JSON.stringify(roleData.roleExtra)||'')
				formData.append('roleReadGuide',roleData.roleReadGuide||'')
			}

			this.props.onSubmit(formData).then(res => {
				this.setState({
					spin:false
				})
				if(this.props.type=='create'){
					this.handleAddStoryIntroduction(getFieldValue('storyIntroduction'),res.obj.id)
				}
				// this.context.router.goBack(0)
				// window.location.reload()
			})
		})
	}
	handleAddStoryIntroduction = (introduction,storyId = this.props.storyInfo.get('id')) => {
		const {getFieldValue} = this.props.form
		let formData = new FormData()
		formData.append('storyId',storyId)
		formData.append('introduction',getFieldValue('storyIntroduction'))
		fetch(config.api.story.introduction.add,{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			},
			body:formData
		}).then(res => res.json()).then(res => {
			if(res.status==2){
				notification.error({message:res.errorMes})
			}else{
				notification.success({message:'添加故事简介成功'})
			}
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
				method:'POST',
				headers:{
					'authorization':sessionStorage.getItem('auth'),
					'content-type':'application/json'
				},
				body:JSON.stringify({
					id:this.props.storyRoleInfo.get('id'),
					storyId:this.props.storyInfo.get('id'),
					roleReadGuide:roleData.roleReadGuide,
					name:roleData.roleName,
					audio:roleData.roleAudioFile&&roleData.roleAudioFile.size>0?res[0].obj.url:roleData.roleAudioFile?roleData.roleAudioFile.url:'',
					icon:roleData.roleIconFile&&roleData.roleIconFile.size>0?res[1].obj.url:roleData.roleIconFile?roleData.roleIconFile.url:'',
					extra:JSON.stringify(roleData.roleExtra),
					readTime:roleData.readTime
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
	handleChangeHotLevel = () => {
		const {getFieldValue} = this.props.form
		let formData = new FormData()
		formData.append('id',this.props.storyInfo.get('id'))
		formData.append('tellCount',getFieldValue('tellCount'))
		fetch(config.api.story.tellCount.add,{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			},
			body:formData
		}).then(res => {
			notification.success({message:'更新热度等级成功'})
		}).catch(error => {
			notification.error({message:'更新热度等级失败'})
		})
	}
	getBackgroundMusicInfo = () => {
		const {getFieldValue} = this.props.form
		const backgroundMusicId = getFieldValue('backgroundMusic')
		const backgroundMusicAudio = plyr.get(this.refs.backgroundMusic)
		let musicInfo = fromJS({})
		this.props.backgroundMusicByTag.forEach(v => {
			let _musicInfo = v.getIn(['otherData','backgroundMusic']).find(v2 => v2.get('id')==backgroundMusicId)
			if(_musicInfo){
				musicInfo = _musicInfo
			}
		})
		return musicInfo
	}
	renderBackgroundMusicPlayer = () => {
		const backgroundMusic = this.getBackgroundMusicInfo()
		if(this.player && this.player[0]){
			this.player[0].source({
				type:'audio',
				title:'backgroundMusic',
				sources:[{
					src:backgroundMusic.get('url')
				}]
			})
		}
		const that = this
		const handleClick = (() =>{
			let isStart = false
			return (e) => {
				if(!isStart){
					this.player[0].play()
					isStart = true
				}else{
					this.player[0].pause()
					isStart = false
				}
			}
		})()
		return (
			<div>
			<Icon onClick={handleClick} style={{fontSize:16}} type="play-circle" />
			</div>
		)
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
		const {storyInfo,storyTags,soundEffects,backgroundMusics,soundEffectByTag,albumList,storySetList,storySetInfo} = this.props
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
					{<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>专辑</span>}
					>{getFieldDecorator('album',{
						initialValue:albumList.map(v => v.get('id')).toJS()
					})(
						<EnhanceSelect options={albumList.map(v => ({
							value:v.get('id'),
							title:v.get('name')
						})).toJS()}/>
					)
					}</FormItem>}
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>故事集</span>}
					>{getFieldDecorator('storySet',{
						initialValue:storySetInfo.get('id')?[storySetInfo.get('id')]:[]
					})(
						<EnhanceSelect mode='single' options={storySetList.map(v => ({
							value:v.get('id'),
							title:v.get('title')
						})).toJS()}/>
					)
					}</FormItem>
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
						},()=>{
							console.log("标签测试:",this.state.storyTags)
						})
					}}>
						{this.props.storyTagsByParent.find(v => v.get('value')==this.state.firstTag,fromJS({}),fromJS({})).get('children',fromJS([])).map(v => {
							return (<Option title={v.get('label')} value={v.get('value')} key={v.get('value')}>{v.get('label')}</Option>)
						})}
					</Select>
					</FormItem>
					{this.props.type=='edit'||this.props.type=='create'?(<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:6}}
					  label={<span >故事简介</span>}
					>
					{getFieldDecorator('storyIntroduction',{
						initialValue:storyInfo.get('introduction','')
					})(
						<Input autosize={{minRows:4,maxRows:4}} onBlur={(e)=>{
							if(this.props.type=='edit'){
								this.handleAddStoryIntroduction(e.target.value)
							}

						}} type='textarea'/>
					)}
					</FormItem>):null}
					{this.props.type=='edit'?<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:8}}
					  label={<span>朗读次数（热搜）</span>}
					>
					当前朗读次数：{storyInfo.get('tellCount')}
					{this.state.displayHotStory?<HotStoryModal
						currentStory={storyInfo.get('id')}
						onCancel={()=>{
							this.setState({
								displayHotStory:false
							})
						}}
						/>:<Button onClick={()=>{
						this.setState({
							displayHotStory:true
						})
					}}>点击查看热搜故事</Button>}
					</FormItem>:null}
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:8}}
					  label={<span>阅读指导</span>}
					>
					<ReadGuideInput value={storyInfo.get('guide')} ref='readGuide'/>
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
					  label={<span>朗读时间</span>}
					>
					{getFieldDecorator('readTime',{
						initialValue:storyInfo.get('readTime')
					})(
						this.props.type=='edit'?<Input />:<EnhanceInput />
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
					{this.renderBackgroundMusicPlayer()}
					</FormItem>
					<FormItem
						labelCol={{span:2}}
						wrapperCol={{span:20}}
						label={<span>内容</span>}
					>
						<DraftComponent onBlur={(data) => {
							this.setState({
								storyContentData:data
							})
						}} ref='draft' soundEffectByTag={soundEffectByTag} soundEffects={soundEffects} value={storyInfo.get('content')}/>
					</FormItem>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>故事角色</span>}
					>
					{this.renderStoryRole()}
					</FormItem>
					{
					// 	this.props.type=='edit'?(<FormItem
					//   labelCol={{span:2}}
					//   wrapperCol={{span:21}}
					//   label={<span>故事角色（多角色）</span>}
					// >
					// <MultiRolePanel
					//  storyContent={
					// 	this.state.storyContentData.length==0?
					// 	(this.refs.draft||{getData:()=>[]}).getData():
					// 	this.state.storyContentData} storyId={(''+storyInfo.get('id'))||''}/>
					// </FormItem>):null
				}
				{this.props.type=='edit'?(<FormItem
				labelCol={{span:2}}
				wrapperCol={{span:21}}
				label={<span>故事角色（多角色）</span>}
				>
					<Link to={`/stories/${storyInfo.get('id')}/scenario/create`}>创建故事剧本</Link>
				</FormItem>):null}
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
				<audio ref='backgroundMusic'>
				</audio>
			</div>
		)
	}
}

export default Form.create()(CreateEditPanel)
