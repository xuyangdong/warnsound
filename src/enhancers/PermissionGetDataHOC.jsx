import React from 'react'
import config from '../config'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import {notification} from 'antd'
import {addPermission,deletePermission,editPermission} from 'actions/permission'
export default (CreateEditPanel) => {
	class AdminCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				permissionInfo:fromJS({})
			}
		}
		componentDidMount(){
			if(this.props.type=='edit'){
				fetch(config.api.permission.query(this.props.params.id),{
					headers:{
						'authorization':sessionStorage.getItem('auth')
					}
				}).then(res => res.json()).then(res => {
					this.setState({
						permissionInfo:fromJS(res)
					})
				})
			}
		}
		handleCreate = jsonData => {
			return this.props.addPermission(jsonData)
			// return this.props.addStorySet(jsonData)
		}
		handleEdit = jsonData => {
			return this.props.editPermission(jsonData,this.props.params.id)
		}
		handleDelete = () => {
			return this.props.deletePermission(this.props.params.id)
		}
		render(){
			const {permissionInfo} = this.state
			const props = {
				permissionInfo
			}
			return (
				<CreateEditPanel type={this.props.type} title={this.props.type=='edit'?'编辑后台用户':'创建后台用户'} onSubmit={this.props.type=='create'?this.handleCreate:this.handleEdit} onDelete={this.handleDelete} {...props}/>
			)
		}
	}
	return connect(state => ({}),dispatch => ({
		addPermission:bindActionCreators(addPermission,dispatch),
		deletePermission:bindActionCreators(deletePermission,dispatch),
		editPermission:bindActionCreators(editPermission,dispatch)
	}))(AdminCreateEditPanel)
}
