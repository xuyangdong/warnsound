import React from 'react'
import config from '../config'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import {notification} from 'antd'
import {addIcon} from 'actions/icon'

export default (CreateEditPanel) => {
	class IconCreateEditPanel extends React.Component {
		constructor(){
			super()

		}
		handleCreate = (formData) => {
			return this.props.addIcon(formData)
		}
		render(){
			const props = {}
			return (
				<CreateEditPanel onSubmit={this.handleCreate} title='新建资源' {...props}/>
			)
		}
	}
	return connect(state => ({}),dispatch => ({
		addIcon:bindActionCreators(addIcon,dispatch)
	}))(IconCreateEditPanel)
}
