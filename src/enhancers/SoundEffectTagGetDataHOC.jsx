import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import CreateEditPanel from '../containers/soundeffecttag/CreateEditPanel'
import {addSoundEffectTag,editSoundEffectTag,deleteSoundEffectTag} from 'actions/soundEffectTag'
export default (CreateEditPanel) => {
	class SoundEffectTagCreateEditPanel extends React.Component {
		handleCreate = (formData) => {
			return this.props.addSoundEffectTag(formData)
		}
		handleEdit = (formData) => {
			return this.props.editSoundEffectTag(formData,this.props.params.id)
		}
		handleSoundEffectTag = () => {
			return this.props.deleteSoundEffectTag(this.props.params.id)
		}
		render(){
			return <CreateEditPanel onDelete={this.handleSoundEffectTag} onSubmit={this.props.type=='edit'?this.handleEdit:this.handleCreate} title={this.props.type=='create'?'新建SoundEffectTag':'编辑SoundEffectTag'}/>
		}
	}
	function mapStateToProps(state){
		return {}
	}
	function mapDispatchToProps(dispatch){
		return {
			addSoundEffectTag:bindActionCreators(addSoundEffectTag,dispatch),
			editSoundEffectTag:bindActionCreators(editSoundEffectTag,dispatch)
		}
	}
	return connect(mapStateToProps,mapDispatchToProps)(SoundEffectTagCreateEditPanel)
}
