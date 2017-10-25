import React from 'react'
import config from '../config'
import {notification} from 'antd'
import {fromJS} from 'immutable'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addStory,editStory,deleteStory} from 'actions/story'
import {addStoryTag,editStoryTag,deleteStoryTag} from 'actions/storyTag'
import SoundEffectGetDataHOC from './SoundEffectGetDataHOC'
import SoundEffectTagGetDataHOC from './SoundEffectTagGetDataHOC'
import BackgroundMusicGetDataHOC from './BackgroundMusicGetDataHOC'
import AppGetDataHOC from './APPGetDataHOC'
import DiscoverGetDataHOC from './DiscoverGetDataHOC'
import IndividualityGetDataHOC from './IndividualityGetDataHOC'
import LogoGetDataHOC from './LogoGetDataHOC'
import AlbumGetDataHOC from './AlbumGetDataHOC'
import StorySetGetDataHOC from './StorySetGetDataHOC'
import UserGetDataHOC from './UserGetDataHOC'
import UserWorkGetDataHOC from './UserWorkGetDataHOC'
import StorySurroundGetDataHOC from './StorySurroundGetDataHOC'
import ScenarioGetDataHOC from './ScenarioGetDataHOC'
import ReadPlanGetDataHOC from './ReadPlanGetDataHOC'
import BabyReadGetDataHOC from './BabyReadGetDataHOC'
import StoryTopicGetDataHOC from './StoryTopicGetDataHOC'
import NoticeGetDataHOC from './NoticeGetDataHOC'
import AdminGetDataHOC from './AdminGetDataHOC'
import PermissionGetDataHOC from './PermissionGetDataHOC'
import InitImageGetDataHOC from './InitImageGetDataHOC'

function buildTree(listData,parentId=0){
	let result = fromJS([])
	listData.forEach(v => {
		v.set('children',listData.filter(n => n.get('parentId')==parentId))
	})
}
export default (type) => {
	if(type=='story'){
		return CreateEditPanel => {
			class StoryCreateEditPanel extends React.Component {
				constructor(){
					super()
					this.state = {
						storyInfo:fromJS({}),
						storyTags:fromJS([]),
						storyTagsByParent:fromJS([]),
						soundEffects:fromJS([]),
						backgroundMusics:fromJS([]),
						backgroundMusicInfo:fromJS({}),
						storyTagInfo:fromJS({}),
						soundEffectByTag:fromJS([]),
						backgroundMusicByTag:fromJS([]),
						storyRoleInfo:fromJS({}),
						albumList:fromJS([]),
						storySetList:fromJS([]),
						storySetInfo:fromJS([]),
						roleList:fromJS([])
					}
					this.handleCreate = this.handleCreate.bind(this)
					this.handleEdit = this.handleEdit.bind(this)
				}
				componentDidMount(){
					this.props.type=='edit'?fetch(config.api.story.query(this.props.params.id),{
						headers: {
							'authorization': sessionStorage.getItem('auth')
						}
					}).then(res => res.json()).then(res => {
						this.setState({
							storyInfo:fromJS(res)
						})
					}):this.setState({
						storyInfo:fromJS({
							title:'缺省标题',
							author:'佚名',
							press:'缺省出版社',
							guide:'0-13岁',
							defaultBackGroundMusicId:'0'
						})
					})
					//--------------storyTag
					fetch(config.api.storyTag.get(0,1000),{
						headers: {
							'authorization':sessionStorage.getItem('auth')
						}
					}).then(res => res.json()).then(res => {
						let treeData = res.obj.filter(v => v.parentId == 0).map(v => ({
							value:''+v.id,
							key:''+v.id,
							label:v.content,
							otherData:v
						}))
						treeData = treeData.map(v => ({
							...v,
							children:res.obj.filter(t => t.parentId == v.value).map(t => ({
								value:''+t.id,
								key:''+t.id,
								label:t.content,
								otherData:t
							}))
						}))
						this.setState({
							storyTags:fromJS(res.obj),
							storyTagsByParent:fromJS(treeData)
						})
					})
					//--------------soundEffect
					fetch(config.api.soundEffectTag.get(0,1000),{
						headers: {
							'authorization': sessionStorage.getItem('auth')
						}
					}).then(res => res.json()).then(res => {
						let soundEffectList = res.obj
						let soundEffectByTagPromise = []

						soundEffectList.forEach(v => {
							soundEffectByTagPromise.push(fetch(config.api.soundEffectTag.soundEffect.get(v.id),{
								headers: {
									'authorization': sessionStorage.getItem('auth')
								}
							}).then(res => res.json()).then(res => {
								return {
									soundEffectTag:v,
									soundEffect:res.obj
								}
							}))
						})
						Promise.all(soundEffectByTagPromise).then(res => {
							this.setState({
								soundEffectByTag:fromJS(res)
							})
						})
					})
					//--------------backgroundMusic
					fetch(config.api.backgroundmusic.get(0,1000),{
						headers: {
							'authorization': sessionStorage.getItem('auth')
						},
					}).then(res => res.json()).then(res => {
						this.setState({
							backgroundMusics:fromJS(res.obj)
						})
					})
					//--------------backgroundMusicInfo
					fetch(config.api.backgroundmusic.query(100055),{
						headers: {
							'authorization': sessionStorage.getItem('auth')
						},
					}).then(res => res.json()).then(res => {
						this.setState({
							backgroundMusicInfo:fromJS(res.obj)
						})
					})
					//--------------storyTagInfo
					this.props.type=='edit'?fetch(config.api.story.tag.query(this.props.params.id),{
						headers: {
							'authorization':sessionStorage.getItem('auth')
						}
					}).then(res => res.json()).then(res => {
						this.setState({
							storyTagInfo:fromJS(res.obj||{})
						})
					}):null
					//-------------bakcgroundMubsicByTag
					fetch(config.api.backgroundMusicTag.get(0,10000),{
						headers:{
							'authorization':sessionStorage.getItem('auth')
						}
					}).then(res => res.json()).then(res => {
						let backgroundMusicTagList = res.obj
						let backgroundMusicPromise = []
						backgroundMusicTagList.forEach(v => {
							backgroundMusicPromise.push(fetch(config.api.backgroundMusicTag.backgroundMusic.query(v.id),{
								headers:{
									'authorization':sessionStorage.getItem('auth')
								}
							}).then(res => res.json()).then(res => ({
								backgroundMusicTag:v,
								backgroundMusic:res.obj
							})))
						})
						Promise.all(backgroundMusicPromise).then(res => {
							let treeData = res.map(v => {
								return {
									label:v.backgroundMusicTag.content,
									value:''+v.backgroundMusicTag.id,
									key:''+v.backgroundMusicTag.id,
									otherData:v,
									children:v.backgroundMusic.map(t => ({
										label:t.description,
										value:''+t.id,
										key:''+t.id,
										otherData:t
									}))
								}
							})
							this.setState({
								backgroundMusicByTag:fromJS(treeData)
							})
						})
					})

					//-------------storyRoleInfo
					this.props.type=='edit'?fetch(config.api.story.role.query(this.props.params.id),{
						headers:{
							'authorization':sessionStorage.getItem('auth')
						}
					}).then(res => res.json()).then(res => {
						this.setState({
							storyRoleInfo:fromJS({
								...res.obj[0],
								extra:res.obj[0]?JSON.parse(res.obj[0].extra||'[]'):[]
							})
						})
					}):null

					fetch(config.api.album.get(0,10000),{
						headers:{
							'authorization':sessionStorage.getItem('auth')
						}
					}).then(res => res.json()).then(res => {
						this.setState({
							albumList:fromJS(
								res.obj
							)
						})
					})
					//-------------storySetList
					fetch(config.api.storySet.get(0,10000),{
						headers:{
							'authorization':sessionStorage.getItem('auth')
						}
					}).then(res => res.json()).then(res => {
						this.setState({
							storySetList:fromJS(res.obj)
						})
					})
					//-------------storySetInfo
					this.props.type=='edit'?fetch(config.api.story.storySet.query(this.props.params.id),{
						headers:{
							'authorization':sessionStorage.getItem('auth')
						}
					}).then(res => res.json()).then(res => {
						if(res.status == 2){
							notification.error({message:res.errorMes})
						}else{
							this.setState({
								storySetInfo:fromJS(res)
							})
						}

					}):null

				}
				handleDelete = () => {
					return this.props.deleteStory(this.props.params.id)
				}
				handleCreate(formData){
					return this.props.addStory(formData)
				}
				handleEdit(formData){
					return this.props.editStory(formData,this.props.params.id)
				}
				render(){
					const {storyInfo,storyTags,storyTagsByParent,storyTagInfo,soundEffects,backgroundMusics,backgroundMusicInfo,soundEffectByTag,backgroundMusicByTag,storyRoleInfo,albumList,storySetList,storySetInfo,roleList} = this.state
					const props = {
						storyInfo,
						storyTags,
						storyTagsByParent,
						storyTagInfo,
						soundEffects,
						backgroundMusics,
						backgroundMusicInfo,
						soundEffectByTag,
						backgroundMusicByTag,
						storyRoleInfo,
						albumList,
						storySetList,storySetInfo,
						roleList
					}
					return (
						<CreateEditPanel type={this.props.type} onDelete={this.handleDelete} onSubmit={this.props.type=='create'?this.handleCreate:this.handleEdit} title={this.props.type=='create'?'新建Story':`Story ${storyInfo.get('title')}`} {...props}/>
					)
				}
			}
			function mapStateToProps(state){
				return {}
			}
			function mapDispatchToProps(dispatch){
				return {
					addStory:bindActionCreators(addStory,dispatch),
					editStory:bindActionCreators(editStory,dispatch),
					deleteStory:bindActionCreators(deleteStory,dispatch)
				}
			}
			return connect(mapStateToProps,mapDispatchToProps)(StoryCreateEditPanel)
		}
	}else if(type == 'storyTag'){
		return CreateEditPanel => {
			class StoryTagCreateEditPanel extends React.Component {
				constructor(){
					super()
					this.state = {
						storyTagInfo:fromJS({}),
						storyTags:fromJS([])
					}
					this.handleCreate = this.handleCreate.bind(this)
				}
				componentDidMount(){
					this.props.type=='edit'?fetch(config.api.storyTag.query(this.props.params.id),{
						headers: {
							'authorization': sessionStorage.getItem('auth')
						}
					}).then(res => res.json()).then(res => {
						this.setState({
							storyTagInfo:fromJS(res)
						})
					}):this.setState({
						storyTagInfo:fromJS({
							content:'缺省内容',
						})
					})
					fetch(config.api.storyTag.get(0,1000),{
						headers: {
							'authorization': sessionStorage.getItem('auth')
						}
					}).then(res => res.json()).then(res => {
						this.setState({
							storyTags:fromJS(res.obj)
						})
					})
				}
				handleCreate = (formData) => {
					return this.props.addStoryTag(formData)
				}
				handleEdit = (formData) => {
					return this.props.editStoryTag(formData,this.props.params.id)
				}
				handleDelete = () => {
					return this.props.deleteStoryTag(this.props.params.id)
				}
				render(){
					const {storyTagInfo,storyTags} = this.state
					const props = {
						storyTagInfo,
						storyTags,
						type:this.props.type
					}
					return <CreateEditPanel onDelete={this.handleDelete} onSubmit={this.props.type=='create'?this.handleCreate:this.handleEdit} title={this.props.type=='create'?'新建StoryTag':`StoryTag ${storyTagInfo.get('content')}`} {...props}/>
				}
			}
			function mapStateToProps(state){
				return {}
			}
			function mapDispatchToProps(dispatch){
				return {
					addStoryTag:bindActionCreators(addStoryTag,dispatch),
					editStoryTag:bindActionCreators(editStoryTag,dispatch),
					deleteStoryTag:bindActionCreators(deleteStoryTag,dispatch)
				}
			}
			return connect(mapStateToProps,mapDispatchToProps)(StoryTagCreateEditPanel)
		}
	}else if(type == 'soundEffect'){
		return SoundEffectGetDataHOC
	}else if(type == 'soundEffectTag'){
		return SoundEffectTagGetDataHOC
	}else if(type == 'backgroundMusic'){
		return BackgroundMusicGetDataHOC
	}else if(type == 'app'){
		return AppGetDataHOC
	}else if(type == 'discover'){
		return DiscoverGetDataHOC
	}else if(type == 'individuality'){
		return IndividualityGetDataHOC
	}else if(type == 'logo'){
		return LogoGetDataHOC
	}else if(type == 'album'){
		return AlbumGetDataHOC
	}else if(type == 'storyset'){
		return StorySetGetDataHOC
	}else if(type == 'user'){
		return UserGetDataHOC
	}else if(type == 'userWork'){
		return UserWorkGetDataHOC
	}else if(type == 'storySurround'){
		return StorySurroundGetDataHOC
	}else if(type == 'scenario'){
		return ScenarioGetDataHOC
	}else if(type == 'readPlan'){
		return ReadPlanGetDataHOC
	}else if(type == 'babyRead'){
		return BabyReadGetDataHOC
	}else if(type == 'storyTopic'){
		return StoryTopicGetDataHOC
	}else if(type == 'notice'){
		return NoticeGetDataHOC
	}else if(type == 'admin'){
		return AdminGetDataHOC
	}else if(type == 'permission'){
		return  PermissionGetDataHOC
	}else if(type == 'initImage'){
		return InitImageGetDataHOC
	}
}
