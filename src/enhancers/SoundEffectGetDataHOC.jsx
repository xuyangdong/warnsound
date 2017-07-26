import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import CreateEditPanel from '../containers/soundeffect/CreateEditPanel'
import config from '../config'
import {addSoundEffect,editSoundEffect,deleteSoundEffect} from 'actions/soundEffect'


export default (CreateEditPanel) => {
	class SoundEffectCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				soundEffectInfo:fromJS([]),
				tagList:fromJS([]),
				soundEffectTag:fromJS({})
			}
		}
		componentDidMount(){
			this.props.type=='edit'?fetch(config.api.soundEffect.query(this.props.params.id),{
				headers: {
					'authorization': sessionStorage.getItem('auth')
				},
			}).then(res => res.json()).then(res => {
				this.setState({
					soundEffectInfo:fromJS(res)
				})
			}):null
			fetch(config.api.soundEffectTag.get(0,100),{
				headers:{
					'authorization': sessionStorage.getItem('auth')
				}
			}).then(res => res.json()).then(res => {
				this.setState({
					tagList:fromJS(res.obj)
				})
			})
			this.props.type=='edit'?fetch(config.api.soundEffect.soundEffectTag.query(this.props.params.id),{
				headers: {
					'authorization': sessionStorage.getItem('auth')
				},
			}).then(res => res.json()).then(res => {
				this.setState({
					soundEffectTag:fromJS(res.obj)
				})
			}):null
		}
		handleCreate = (formData) => {
			return this.props.addSoundEffect(formData)
		}
		handleEdit = (formData) => {
			return this.props.editSoundEffect(formData,this.props.params.id)
		}
		handleDelete = () => {
			return this.props.deleteSoundEffect(this.props.params.id)
		}
		render(){
			const {soundEffectInfo,tagList,soundEffectTag} = this.state
			const props = {
				soundEffectInfo,
				tagList,
				soundEffectTag
			}
			return <CreateEditPanel onDelete={this.handleDelete} onSubmit={this.props.type=='create'?this.handleCreate:this.handleEdit} title={this.props.type=='create'?'新建SoundEffect':`SoundEffect ${soundEffectInfo.get('description')}`} {...props}/>
		}
	}
	function mapStateToProps(state){
		return {}
	}
	function mapDispatchToProps(dispatch){
		return {
			addSoundEffect:bindActionCreators(addSoundEffect,dispatch),
			editSoundEffect:bindActionCreators(editSoundEffect,dispatch),
			deleteSoundEffect:bindActionCreators(deleteSoundEffect,dispatch)
		}
	}
	return connect(mapStateToProps,mapDispatchToProps)(SoundEffectCreateEditPanel)
}
