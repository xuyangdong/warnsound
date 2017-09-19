import React from 'react'
import config from '../config'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import {notification} from 'antd'
import {getUserInfo,addUserWork,editUserWork,deleteUserWork} from 'actions/userWork'

export default (CreateEditPanel) => {
	class UserWorkCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				workInfo:fromJS({}),
				storyList:fromJS([])
			}
		}
		componentDidMount(){

			fetch(config.api.story.all(0,100000),{
				headers:{
					authorization:sessionStorage.getItem('auth')
				}
			}).then(res => res.json()).then(res => {
				this.setState({
					storyList:fromJS(res.obj)
				})
			})
			if(this.props.userWork.get('user').isEmpty()){
				this.props.getUserInfo(this.props.params.userId)
			}
			if(this.props.type=='edit'){
				fetch(config.api.user.work.query(this.props.params.id),{
					headers:{
						authorization:sessionStorage.getItem('auth')
					}
				}).then(res => res.json()).then(res => {
					this.setState({
						workInfo:fromJS(res.obj)
					})
				})
			}
		}
		handleCreate = (formData) => {
			return this.props.addUserWork(formData,this.props.params.userId)
		}

		handleEdit = (formData) => {
			return this.props.editUserWork(formData,this.props.params.id,this.props.params.userId)
		}

		handleDelete = () => {
			return this.props.deleteUserWork(this.props.params.id,this.props.params.userId)
		}
		render(){
			const {workInfo,storyList} = this.state
			const {userWork} = this.props
			const props = {
				workInfo,
				storyList,
				userInfo:userWork.getIn(['user','info'])
			}
			return (
				<CreateEditPanel type={this.props.type} title={this.props.type=='edit'?'编辑作品':'创建作品'} onSubmit={this.props.type=='create'?this.handleCreate:this.handleEdit} onDelete={this.handleDelete} {...props}/>
			)
		}
	}
	return connect(state => ({
		userWork:state.get('userWork')
	}),dispatch => ({
		getUserInfo:bindActionCreators(getUserInfo,dispatch),
		addUserWork:bindActionCreators(addUserWork,dispatch),
		editUserWork:bindActionCreators(editUserWork,dispatch),
		deleteUserWork:bindActionCreators(deleteUserWork,dispatch)
	}))(UserWorkCreateEditPanel)
}
