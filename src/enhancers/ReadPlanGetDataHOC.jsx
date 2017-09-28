import React from 'react'
import config from '../config'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import {notification} from 'antd'
import {addReadPlan,editReadPlan,deleteReadPlan} from 'actions/readPlan'

export default (CreateEditPanel) => {
	class ReadPlanCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				// storyList:fromJS([]),
				// storySurroundInfo:fromJS({})
				readPlanInfo:fromJS([])
			}
		}
		componentDidMount(){
			if(this.props.type=='edit'){
				fetch(config.api.readPlan.query(this.props.params.id),{
					headers:{
						'authorization':sessionStorage.getItem('auth')
					}
				}).then(res => res.json()).then(res => {
					this.setState({
						readPlanInfo:fromJS(res.obj)
					})
				})
			}
		}
		handleCreate = formData => {
			return this.props.addReadPlan(formData)
		}
		handleEdit = formData => {
			// console.log(formData)
			formData.append('id',this.props.params.id)
			return this.props.editReadPlan(formData)
		}
		handleDelete = () => {
			return this.props.deleteReadPlan(this.props.params.id)
		}
		render(){
			const {readPlanInfo} = this.state
			const props = {
				readPlanInfo
			}
			return (
				<CreateEditPanel type={this.props.type} title={this.props.type=='edit'?'编辑故事周边':'创建故事周边'} onSubmit={this.props.type=='create'?this.handleCreate:this.handleEdit} onDelete={this.handleDelete} {...props}/>
			)
		}
	}
	return connect(state => ({}),dispatch => ({
		addReadPlan:bindActionCreators(addReadPlan,dispatch),
		editReadPlan:bindActionCreators(editReadPlan,dispatch),
		deleteReadPlan:bindActionCreators(deleteReadPlan,dispatch)
	}))(ReadPlanCreateEditPanel)
}
