import React from 'react'
import config from '../config'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import {notification} from 'antd'
// import {addStorySet,editStorySet,deleteStorySet} from 'actions/storySet'

export default (CreateEditPanel) => {
	class ScenarioCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				storyList:fromJS([]),
				roleList:fromJS([]),
				scenarioInfo:fromJS({})
			}
		}
		componentDidMount(){
			fetch(config.api.story.all(0,100000),{
				headers:{
					'authorization':sessionStorage.getItem('auth')
				}
			}).then(res => res.json()).then(res => {
				this.setState({
					storyList:fromJS(res.obj)
				})
			})

			fetch(config.api.story.role.get(this.props.params.storyId),{
				headers:{
					'authorization':sessionStorage.getItem('auth')
				}
			}).then(res => res.json()).then(res => {
				this.setState({
					roleList:fromJS(res.obj)
				})
			})
			fetch(config.api.story.scenario.query(this.props.params.storyId),{
				headers:{
					'authorization':sessionStorage.getItem('auth')
				}
			}).then(res => res.json()).then(res => {
				this.setState({
					scenarioInfo:fromJS(res.obj)
				})
			})
		}
		handleCreateRole = () => {
			fetch(config.api.story.role.get(this.props.params.storyId),{
				headers:{
					'authorization':sessionStorage.getItem('auth')
				}
			}).then(res => res.json()).then(res => {
				this.setState({
					roleList:fromJS(res.obj)
				})
			})
		}
		handleCreate = formData => {
			// return this.props.addStorySet(jsonData)
			return fetch(config.api.story.scenario.add,{
				method:'post',
				headers:{
					'authorization':sessionStorage.getItem('auth')
				},
				body:formData
			}).then(res => res.json()).then(res => {
				console.log("asfasdfasdfasdf:",res)
				if(res.status==2){
					notification.error({message:res.errorMes})
				}
				return res
			})
		}
		handleEdit = formData => {
			formData.append('storyId',this.props.params.storyId)
			return fetch(config.api.story.scenario.edit,{
				method:'post',
				headers:{
					'authorization':sessionStorage.getItem('auth')
				},
				body:formData
			}).then(res => res.json()).then(res => {
				if(res.state == 2){
					notification.error({message:res.errorMes})
				}
				console.log('edit scenario',res)
				return res
			})
			// return this.props.editStorySet(jsonData,this.props.params.id)
		}
		handleDelete = () => {
			console.log("asdfasdf")
			// return this.props.deleteStorySet(this.props.params.id)
		}
		render(){
			const {storyList,roleList,scenarioInfo} = this.state
			const props = {
				...this.props,
				storyList,
				roleList,
				scenarioInfo
			}
			return (
				<CreateEditPanel onCreateRole={this.handleCreateRole} type={this.props.type} title={this.props.type=='edit'?'编辑故事周边':'创建故事剧本'} onSubmit={this.props.type=='create'?this.handleCreate:this.handleEdit} onDelete={this.handleDelete} {...props}/>
			)
		}
	}
	return connect(state => ({}),dispatch => ({
	}))(ScenarioCreateEditPanel)
}
