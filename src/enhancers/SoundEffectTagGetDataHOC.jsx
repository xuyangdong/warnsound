import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import CreateEditPanel from '../containers/soundeffecttag/CreateEditPanel'

export default (CreateEditPanel) => {
	class SoundEffectTagCreateEditPanel extends React.Component {
		render(){
			return <CreateEditPanel title={this.props.type=='create'?'新建SoundEffectTag':'test'}/>
		}
	}
	function mapStateToProps(state){
		return {}
	}
	function mapDispatchToProps(dispatch){
		return {}
	}
	return connect(mapStateToProps,mapDispatchToProps)(SoundEffectTagCreateEditPanel)
}
