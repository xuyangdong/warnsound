import React from 'react'
import config from '../config'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import {notification} from 'antd'
import {addNotice,editNotice,deleteNotice} from 'actions/notice'

export default (CreateEditPanel) => {
	class NoticeCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				noticeInfo:fromJS({})
			}
		}
		componentDidMount(){
			if(this.props.type=='edit'){
				fetch(config.api.notice.query(this.props.params.id),{
					headers:{
						'authorization':sessionStorage.getItem('auth')
					}
				}).then(res => res.json()).then(res => {
					this.setState({
						noticeInfo:fromJS(res)
					})
				})
			}
		}
		handleCreate = jsonData => {
			return this.props.addNotice(jsonData)
		}
		handleEdit = jsonData => {
			// console.log(formData)
			return this.props.editNotice(jsonData,this.props.params.id)
		}
		handleDelete = () => {
			return this.props.deleteNotice(this.props.params.id)
		}
		render(){
			const {noticeInfo} = this.state
			const props = {
				noticeInfo
			}
			return (
				<CreateEditPanel type={this.props.type} title={this.props.type=='edit'?'编辑系统通知':'创建系统通知'} onSubmit={this.props.type=='create'?this.handleCreate:this.handleEdit} onDelete={this.handleDelete} {...props}/>
			)
		}
	}
	return connect(state => ({}),dispatch => ({
		addNotice:bindActionCreators(addNotice,dispatch),
		editNotice:bindActionCreators(editNotice,dispatch),
		deleteNotice:bindActionCreators(deleteNotice,dispatch)
	}))(NoticeCreateEditPanel)
}
