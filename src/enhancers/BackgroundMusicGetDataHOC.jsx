import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import CreateEditPanel from '../containers/backgroundmusic/CreateEditPanel'
import config from '../config'
import {addBackgroundMusic,editBackgroundMusic,deleteBackgroundMusic} from 'actions/backgroundMusic'

export default (CreateEditPanel) => {
	class BackgroundMusicCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				backgroundMusicInfo:fromJS({}),
				backgroundMusicTag:fromJS({}),
				tagList:fromJS([])
			}
		}
		componentDidMount(){
			this.props.type=='edit'?fetch(config.api.backgroundmusic.query(this.props.params.id),{
				headers:{
					'authorization':sessionStorage.getItem('auth')
				}
			}).then(res => res.json()).then(res => {
				this.setState({
					backgroundMusicInfo:fromJS(res)
				})
			}):null
			this.props.type=='edit'?fetch(config.api.backgroundmusic.backgroundMusicTag.query(this.props.params.id),{
				headers:{
					'authorization':sessionStorage.getItem('auth')
				}
			}).then(res => res.json()).then(res => {
				this.setState({
					backgroundMusicTag:fromJS(res.obj)
				})
			}):null
			fetch(config.api.backgroundMusicTag.get(0,10000),{
				headers:{
					'authorization':sessionStorage.getItem('auth')
				}
			}).then(res => res.json()).then(res => {
				this.setState({
					tagList:fromJS(res.obj)
				})
			})
		}
		handleCreate = (formData) => {
			return this.props.addBackgroundMusic(formData)
		}
		handleEdit = (formData) => {
			return this.props.editBackgroundMusic(formData,this.props.params.id)
		}
		handleDelete = () => {
			return this.props.deleteBackgroundMusic(this.props.params.id)
		}
		render(){
			const {backgroundMusicInfo,backgroundMusicTag,tagList} = this.state
			const props = {
				backgroundMusicInfo,backgroundMusicTag,tagList
			}
			return <CreateEditPanel type={this.props.type} onDelete={this.handleDelete} onSubmit={this.props.type=='edit'?this.handleEdit:this.handleCreate} title={this.props.type=='create'?'新建BackgroundMusic':'编辑BackgroundMusic'} {...props}/>
		}
	}
	return connect(state => ({

	}),dispatch => ({
		addBackgroundMusic:bindActionCreators(addBackgroundMusic,dispatch),
		editBackgroundMusic:bindActionCreators(editBackgroundMusic,dispatch),
		deleteBackgroundMusic:bindActionCreators(deleteBackgroundMusic,dispatch)
	}))(BackgroundMusicCreateEditPanel)
}
