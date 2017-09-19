import React from 'react'
import config from '../config'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import {notification} from 'antd'
import {addUser,deleteUser,editUser} from 'actions/user'

export default (CreateEditPanel) => {
	class UserCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				userInfo:fromJS({})
			}
		}
		componentDidMount(){
			if(this.props.type=='edit'){
				fetch(config.api.user.query(this.props.params.id),{
					headers:{
						authorization:sessionStorage.getItem('auth')
					}
				}).then(res => res.json()).then(res => {
					this.setState({
						userInfo:fromJS(res.obj)
					})
				})
			}
		}
		handleCreate = (formData) => {
			return this.props.addUser(formData)
		}
		handleEdit = (formData) => {
			formData.append('id',this.props.params.id)
			return this.props.editUser(formData)
		}
		handleDelete = () => {
			return this.props.deleteUser(this.props.params.id).catch(error => {
				console.log(error)
			})
		}
		render(){
			const {userInfo} = this.state
			const props = {userInfo}
			return (
				<CreateEditPanel type={this.props.type} title={this.props.type=='edit'?'编辑用户':'创建用户'} onSubmit={this.props.type=='create'?this.handleCreate:this.handleEdit} onDelete={this.handleDelete} {...props}/>
			)
		}
	}
	return connect(state => ({}),dispatch => ({
		addUser:bindActionCreators(addUser,dispatch),
		deleteUser:bindActionCreators(deleteUser,dispatch),
		editUser:bindActionCreators(editUser,dispatch)
	}))(UserCreateEditPanel)
}
