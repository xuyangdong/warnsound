import React from 'react'
import config from '../config'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import {notification} from 'antd'
import {addFeedbackTemplet,editFeedbackTemplet,deleteFeedbackTemplet} from 'actions/feedbackTemplet'

export default (CreateEditPanel) => {
	class FeedbackTempletCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				feedbackTempletInfo:fromJS({})
			}
		}
		componentDidMount(){
			if(this.props.type=='edit'){
				fetch(config.api.feedbackTemplet.query(this.props.params.id),{
					headers:{
						'authorization':sessionStorage.getItem('auth')
					}
				}).then(res => res.json()).then(res => {
					this.setState({
						feedbackTempletInfo:fromJS(res.obj)
					})
				})
			}
		}
		handleCreate = formData => {
			return this.props.addFeedbackTemplet(formData)
		}
		handleEdit = formData => {
			// console.log(formData)
			formData.append('id',this.props.params.id)
			return this.props.editFeedbackTemplet(formData)
		}
		handleDelete = () => {
			return this.props.deleteFeedbackTemplet(this.props.params.id)
		}
		render(){
			const {feedbackTempletInfo} = this.state
			const props = {
				feedbackTempletInfo
			}
			return (
				<CreateEditPanel type={this.props.type} title={this.props.type=='edit'?'编辑系统通知':'创建系统通知'} onSubmit={this.props.type=='create'?this.handleCreate:this.handleEdit} onDelete={this.handleDelete} {...props}/>
			)
		}
	}
	return connect(state => ({}),dispatch => ({
		addFeedbackTemplet:bindActionCreators(addFeedbackTemplet,dispatch),
		editFeedbackTemplet:bindActionCreators(editFeedbackTemplet,dispatch),
		deleteFeedbackTemplet:bindActionCreators(deleteFeedbackTemplet,dispatch)
	}))(FeedbackTempletCreateEditPanel)
}
