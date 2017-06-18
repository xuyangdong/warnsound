import React from 'react'
import config from '../config'
import {fromJS} from 'immutable'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addStory,editStory} from 'actions/story'
import {addStoryTag} from 'actions/storyTag'
import SoundEffectGetDataHOC from './SoundEffectGetDataHOC'
import SoundEffectTagGetDataHOC from './SoundEffectTagGetDataHOC'
import BackgroundMusicGetDataHOC from './BackgroundMusicGetDataHOC'

export default (type) => {
	if(type=='story'){
		return CreateEditPanel => {
			class StoryCreateEditPanel extends React.Component {
				constructor(){
					super()
					this.state = {
						storyInfo:fromJS({}),
						soundEffects:fromJS([]),
						backgroundMusics:fromJS([]),
						backgroundMusicInfo:fromJS({})
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
					}):null
					//--------------soundEffect
					fetch(config.api.soundEffect.get(0,25),{
						headers: {
							'authorization': sessionStorage.getItem('auth')
						},
					}).then(res => res.json()).then(res => {
						this.setState({
							soundEffects:fromJS(res)
						})
					})
					//--------------backgroundMusic
					fetch(config.api.backgroundmusic.get(0,25),{
						headers: {
							'authorization': sessionStorage.getItem('auth')
						},
					}).then(res => res.json()).then(res => {
						this.setState({
							backgroundMusics:fromJS(res)
						})
					})
					//--------------backgroundMusicInfo
					fetch(config.api.backgroundmusic.query(100055),{
						headers: {
							'authorization': sessionStorage.getItem('auth')
						},
					}).then(res => res.json()).then(res => {
						this.setState({
							backgroundMusicInfo:fromJS(res)
						})
					})
				}
				handleCreate(formData){
					return this.props.addStory(formData)
				}
				handleEdit(formData){
					return this.props.editStory(formData,this.props.params.id)
				}
				render(){
					const {storyInfo,soundEffects,backgroundMusics,backgroundMusicInfo} = this.state
					const props = {
						storyInfo,
						soundEffects,
						backgroundMusics,
						backgroundMusicInfo
					}
					return (
						<CreateEditPanel onSubmit={this.props.type=='create'?this.handleCreate:this.handleEdit} title={this.props.type=='create'?'新建Story':`Story ${storyInfo.get('title')}`} {...props}/>
					)
				}
			}
			function mapStateToProps(state){
				return {}
			}
			function mapDispatchToProps(dispatch){
				return {
					addStory:bindActionCreators(addStory,dispatch),
					editStory:bindActionCreators(editStory,dispatch)
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
					}):null
					fetch(config.api.storyTag.get(0,25),{
						headers: {
							'authorization': sessionStorage.getItem('auth')
						}
					}).then(res => res.json()).then(res => {
						this.setState({
							storyTags:fromJS(res)
						})
					})
				}
				handleCreate(formData){
					return this.props.addStoryTag(formData)
				}
				render(){
					const {storyTagInfo,storyTags} = this.state
					const props = {
						storyTagInfo,
						storyTags,
						type:this.props.type
					}
					return <CreateEditPanel onSubmit={this.props.type=='create'?this.handleCreate:null} title={this.props.type=='create'?'新建StoryTag':`StoryTag ${storyTagInfo.get('content')}`} {...props}/>
				}
			}
			function mapStateToProps(state){
				return {}
			}
			function mapDispatchToProps(dispatch){
				return {
					addStoryTag:bindActionCreators(addStoryTag,dispatch)
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
	}
}
