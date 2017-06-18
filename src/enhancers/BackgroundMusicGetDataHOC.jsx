import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import CreateEditPanel from '../containers/backgroundmusic/CreateEditPanel'
import config from '../config'

export default (CreateEditPanel) => {
	class BackgroundMusicCreateEditPanel extends React.Component {
		render(){
			return <CreateEditPanel title={this.props.type=='create'?'新建BackgroundMusic':'test'} />
		}
	}
	return connect(state => ({

	}),dispatch => ({

	}))(BackgroundMusicCreateEditPanel)
}
