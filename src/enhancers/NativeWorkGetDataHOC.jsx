import React from 'react'
import config from '../config'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import {notification} from 'antd'
import {addNativeWork,editNativeWork,deleteNativeWork} from 'actions/nativeWork'

export default (CreateEditPanel) => {
	class NativeWorkCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				nativeWorkInfo:fromJS({}),
				storyList:fromJS([]),
				userList:fromJS([])
			}
		}
		componentDidMount(){
			fetch(config.api.user.get(0,9000000),{
				headers:{
					'authorization':sessionStorage.getItem('auth')
				}
			}).then(res => res.json()).then(res => {
				this.setState({
					userList:fromJS(res.obj)
				})
			})
			fetch(config.api.story.list,{
				headers:{
					'authorization':sessionStorage.getItem('auth')
				}
			}).then(res => res.json()).then(res => {
				this.setState({
					storyList:fromJS(res.obj)
				})
			})
			if(this.props.type=='edit'){
				fetch(config.api.nativeWork.query(this.props.params.id),{
					headers:{
						'authorization':sessionStorage.getItem('auth')
					}
				}).then(res => res.json()).then(res => {
					this.setState({
						nativeWorkInfo:fromJS(res.obj)
					})
				})
			}
		}
		handleCreate = formData => {
			return this.props.addNativeWork(formData)
		}
		handleEdit = formData => {
			// console.log(formData)
			formData.append('id',this.props.params.id)
			return this.props.editNativeWork(formData,this.props.params.id)
		}
		handleDelete = () => {
			return this.props.deleteNativeWork(this.props.params.id)
		}
		render(){
			const {nativeWorkInfo,storyList,userList} = this.state
			const props = {
				nativeWorkInfo,
				storyList,
				userList
			}
			return (
				<CreateEditPanel type={this.props.type} title={this.props.type=='edit'?'编辑作品':'创建作品'} onSubmit={this.props.type=='create'?this.handleCreate:this.handleEdit} onDelete={this.handleDelete} {...props}/>
			)
		}
	}
	return connect(state => ({}),dispatch => ({
		addNativeWork:bindActionCreators(addNativeWork,dispatch),
		editNativeWork:bindActionCreators(editNativeWork,dispatch),
		deleteNativeWork:bindActionCreators(deleteNativeWork,dispatch)
	}))(NativeWorkCreateEditPanel)
}
