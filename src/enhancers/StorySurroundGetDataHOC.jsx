import React from 'react'
import config from '../config'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import {notification} from 'antd'
import {addStorySurround,deleteStorySurround,editStorySurround} from 'actions/storySurround'
export default (CreateEditPanel) => {
	class StorySurroundCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				storyList:fromJS([]),
				storySurroundInfo:fromJS({})
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
				fetch(config.api.storySurround.query(this.props.params.id),{
					headers:{
						'authorization':sessionStorage.getItem('auth')
					}
				}).then(res => res.json()).then(res => {
					this.setState({
						storySurroundInfo:fromJS(res.obj)
					})
				})
			}
		}
		handleCreate = formData => {
			return this.props.addStorySurround(formData)
			// return this.props.addStorySet(jsonData)
		}
		handleEdit = formData => {
			console.log(formData)
			formData.append('id',this.props.params.id)
			return this.props.editStorySurround(formData)
		}
		handleDelete = () => {
			return this.props.deleteStorySurround(this.props.params.id)
		}
		render(){
			const {storyList,storySurroundInfo} = this.state
			const props = {
				storyList,
				storySurroundInfo
			}
			return (
				<CreateEditPanel type={this.props.type} title={this.props.type=='edit'?'编辑故事周边':'创建故事周边'} onSubmit={this.props.type=='create'?this.handleCreate:this.handleEdit} onDelete={this.handleDelete} {...props}/>
			)
		}
	}
	return connect(state => ({}),dispatch => ({
		addStorySurround:bindActionCreators(addStorySurround,dispatch),
		deleteStorySurround:bindActionCreators(deleteStorySurround,dispatch),
		editStorySurround:bindActionCreators(editStorySurround,dispatch)
	}))(StorySurroundCreateEditPanel)
}
