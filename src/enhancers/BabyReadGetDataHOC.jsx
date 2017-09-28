import React from 'react'
import config from '../config'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import {notification} from 'antd'
import {addBabyRead,editBabyRead,deleteBabyRead} from 'actions/babyRead'

export default (CreateEditPanel) => {
	class ReadPlanCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				storyList:fromJS([]),
				babyReadInfo:fromJS({})
			}
		}
		componentDidMount(){
			if(this.props.type=='edit'){
				fetch(config.api.babyRead.query(this.props.params.id),{
					headers:{
						'authorization':sessionStorage.getItem('auth')
					}
				}).then(res => res.json()).then(res => {
					this.setState({
						babyReadInfo:fromJS(res.obj)
					})
				})
			}
			fetch(config.api.story.all(0,10000),{
				headers:{
					'authorization':sessionStorage.getItem('auth')
				}
			}).then(res => res.json()).then(res => {
				this.setState({
					storyList:fromJS(res.obj)
				})
			})
		}
		handleCreate = formData => {
			return this.props.addBabyRead(formData)
		}
		handleEdit = formData => {
			// console.log(formData)
			formData.append('id',this.props.params.id)
			return this.props.editBabyRead(formData)
		}
		handleDelete = () => {
			return this.props.deleteBabyRead(this.props.params.id)
		}
		render(){
			const {storyList,babyReadInfo} = this.state
			const props = {
				storyList,
				babyReadInfo
			}
			return (
				<CreateEditPanel type={this.props.type} title={this.props.type=='edit'?'编辑宝宝读':'创建宝宝读'} onSubmit={this.props.type=='create'?this.handleCreate:this.handleEdit} onDelete={this.handleDelete} {...props}/>
			)
		}
	}
	return connect(state => ({}),dispatch => ({
		addBabyRead:bindActionCreators(addBabyRead,dispatch),
		editBabyRead:bindActionCreators(editBabyRead,dispatch),
		deleteBabyRead:bindActionCreators(deleteBabyRead,dispatch)
	}))(ReadPlanCreateEditPanel)
}
