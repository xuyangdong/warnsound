import React from 'react'
import config from '../config'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import {notification} from 'antd'
import {addAdmin,deleteAdmin,editAdmin} from 'actions/admin'
export default (CreateEditPanel) => {
	class AdminCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				adminInfo:fromJS({})
			}
		}
		componentDidMount(){
			if(this.props.type=='edit'){
				// fetch(config.api.admin.query(this.props.params.id),{
				// 	headers:{
				// 		'authorization':sessionStorage.getItem('auth')
				// 	}
				// }).then(res => res.json()).then(res => {
				// 	this.setState({
				// 		storyTopicInfo:fromJS(res.obj)
				// 	})
				// })
			}
		}
		handleCreate = jsonData => {
			return this.props.addAdmin(jsonData)
			// return this.props.addStorySet(jsonData)
		}
		handleEdit = jsonData => {
			return this.props.editAdmin(jsonData,this.props.params.id)
		}
		handleDelete = () => {
			return this.props.deleteAdmin(this.props.params.id)
		}
		render(){
			const {adminInfo} = this.state
			const props = {
				adminInfo
			}
			return (
				<CreateEditPanel type={this.props.type} title={this.props.type=='edit'?'编辑后台用户':'创建后台用户'} onSubmit={this.props.type=='create'?this.handleCreate:this.handleEdit} onDelete={this.handleDelete} {...props}/>
			)
		}
	}
	return connect(state => ({}),dispatch => ({
		addAdmin:bindActionCreators(addAdmin,dispatch),
		deleteAdmin:bindActionCreators(deleteAdmin,dispatch),
		editAdmin:bindActionCreators(editAdmin,dispatch)
	}))(AdminCreateEditPanel)
}
