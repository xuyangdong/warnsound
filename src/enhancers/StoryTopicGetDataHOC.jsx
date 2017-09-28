import React from 'react'
import config from '../config'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import {notification} from 'antd'
import {addStoryTopic,deleteStoryTopic,editStoryTopic} from 'actions/storyTopic'
export default (CreateEditPanel) => {
	class StoryTopicCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				storyList:fromJS([]),
				storyTopicInfo:fromJS({})
			}
		}
		componentDidMount(){
			fetch(config.api.story.all(0,10000),{
				headers:{
					'authorization':sessionStorage.getItem('auth')
				}
			}).then(res => res.json()).then(res => {
				this.setState({
					storyList:fromJS(res.obj)
				})
			})
			if(this.props.type=='edit'){
				fetch(config.api.storyTopic.query(this.props.params.id),{
					headers:{
						'authorization':sessionStorage.getItem('auth')
					}
				}).then(res => res.json()).then(res => {
					this.setState({
						storyTopicInfo:fromJS(res.obj)
					})
				})
			}
		}
		handleCreate = formData => {
			return this.props.addStoryTopic(formData)
			// return this.props.addStorySet(jsonData)
		}
		handleEdit = formData => {
			console.log(formData)
			formData.append('id',this.props.params.id)
			return this.props.editStoryTopic(formData)
		}
		handleDelete = () => {
			return this.props.deleteStoryTopic(this.props.params.id)
		}
		render(){
			const {storyList,storyTopicInfo} = this.state
			const props = {
				storyList,
				storyTopicInfo
			}
			return (
				<CreateEditPanel type={this.props.type} title={this.props.type=='edit'?'编辑故事专题':'创建故事专题'} onSubmit={this.props.type=='create'?this.handleCreate:this.handleEdit} onDelete={this.handleDelete} {...props}/>
			)
		}
	}
	return connect(state => ({}),dispatch => ({
		addStoryTopic:bindActionCreators(addStoryTopic,dispatch),
		deleteStoryTopic:bindActionCreators(deleteStoryTopic,dispatch),
		editStoryTopic:bindActionCreators(editStoryTopic,dispatch)
	}))(StoryTopicCreateEditPanel)
}
