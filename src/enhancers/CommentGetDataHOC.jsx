import React from 'react'
import config from '../config'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import {notification} from 'antd'
import {addComment} from 'actions/comment'

export default (CreateEditPanel) => {
	class CommentCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				commentInfo:fromJS({})
			}
		}
		componentDidMount(){
		}
		componentWillReceiveProps(nextProps){
		}
		handleCreate = formData => {
			formData.append('ambitusId',this.props.params.storySurroundId)
			return this.props.addComment(formData)
		}
		handleEdit = formData => {
			// console.log(formData)
			// formData.append('id',this.props.params.id)
			// return this.props.editWorksTag(formData,this.props.params.id)
		}
		handleDelete = () => {
			// return this.props.deleteWorksTag(this.props.params.id)
		}
		render(){
			const {commentInfo} = this.state
			const props = {
				commentInfo
			}
			return (
				<CreateEditPanel type={this.props.type} title={this.props.type=='edit'?'编辑评论':'创建评论'} onSubmit={this.props.type=='create'?this.handleCreate:this.handleEdit} onDelete={this.handleDelete} {...props}/>
			)
		}
	}
	return connect(state => ({
	}),dispatch => ({
		addComment:bindActionCreators(addComment,dispatch)
	}))(CommentCreateEditPanel)
}
