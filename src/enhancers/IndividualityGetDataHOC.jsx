import React from 'react'
import config from '../config'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addDiscover,editDiscover} from 'actions/discover'
import {fromJS} from 'immutable'

export default (CreateEditPanel) => {
	class IndividualCreateEditPanel extends React.Component {
		render(){

			return (
				<CreateEditPanel title='创建个性推荐' />
			)
		}
	}
	return connect(state => ({}),dispatch => ({}))(IndividualCreateEditPanel)
}
