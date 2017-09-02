import React from 'react'
import config from '../config'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import {notification} from 'antd'
import {addStorySet,editStorySet,deleteStorySet} from 'actions/storySet'

export default (CreateEditPanel) => {
	class StorySetCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				storySetInfo:fromJS({})
			}
		}
		componentDidMount(){
			this.props.type=='edit'?fetch(config.api.storySet.query(this.props.params.id),{
				headers:{
					'authorization':sessionStorage.getItem('auth')
				}
			}).then(res => res.json()).then(res => {
				this.setState({
					storySetInfo:fromJS(res)
				})
			}):null
		}
		handleCreate = jsonData => {
			return this.props.addStorySet(jsonData)
		}
		handleEdit = jsonData => {
			return this.props.editStorySet(jsonData,this.props.params.id)
		}
		handleDelete = () => {
			return this.props.deleteStorySet(this.props.params.id)
		}
		render(){
			const {storySetInfo} = this.state
			const props = {
				storySetInfo
			}
			return (
				<CreateEditPanel type={this.props.type} title={this.props.type=='edit'?'编辑故事集':'创建故事集'} onSubmit={this.props.type=='create'?this.handleCreate:this.handleEdit} onDelete={this.handleDelete} {...props}/>
			)
		}
	}
	return connect(state => ({}),dispatch => ({
		addStorySet:bindActionCreators(addStorySet,dispatch),
		editStorySet:bindActionCreators(editStorySet,dispatch),
		deleteStorySet:bindActionCreators(deleteStorySet,dispatch)
	}))(StorySetCreateEditPanel)
}
