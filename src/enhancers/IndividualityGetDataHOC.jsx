import React from 'react'
import config from '../config'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addDiscover,editDiscover} from 'actions/discover'
import {fromJS} from 'immutable'
import {createQuestion} from 'actions/individual'

export default (CreateEditPanel) => {
	class IndividualCreateEditPanel extends React.Component {
		handleCreate = (data) => {
			console.log(data)
			// this.props.createQuestion(data)
		}
		render(){
			return (
				<CreateEditPanel title='创建个性推荐' onSubmit={this.props.type=='create'?this.handleCreate:null} />
			)
		}
	}
	return connect(state => ({}),dispatch => ({
		createQuestion:bindActionCreators(createQuestion,dispatch)
	}))(IndividualCreateEditPanel)
}
