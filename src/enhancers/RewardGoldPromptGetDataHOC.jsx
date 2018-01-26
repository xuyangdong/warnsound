import React from 'react'
import config from '../config'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import {notification} from 'antd'
import {addRewardGoldPrompt,editRewardGoldPrompt} from 'actions/rewardGoldPrompt'

export default (CreateEditPanel) => {
	class RewardGoldPromptCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				rewardGoldPromptInfo:fromJS({}),
				typeList:fromJS([])
			}
		}
		componentDidMount(){
			fetch(config.api.goldRewardRule.type.get,{
				headers:{
					'authorization':sessionStorage.getItem('auth')
				}
			}).then(res => res.json()).then(res => {
				this.setState({
					typeList:fromJS(res.obj)
				})
			})
			if(this.props.type == 'edit'){
				fetch(config.api.rewardGoldPrompt.query(this.props.params.id),{
					headers:{
						'authorization':sessionStorage.getItem('auth')
					}
				}).then(res => res.json()).then(res => {
					this.setState({
						rewardGoldPromptInfo:fromJS(res.obj)
					})
				})
			}
		}
		componentWillReceiveProps(nextProps){
		}
		handleCreate = formData => {
			return this.props.addRewardGoldPrompt(formData)
		}
		handleEdit = formData => {
			// console.log(formData)
			formData.append('id',this.props.params.id)
			return this.props.editRewardGoldPrompt(formData,this.props.params.id)
		}
		handleDelete = () => {
			// return this.props.deleteWorksTag(this.props.params.id)
		}
		render(){
			const {rewardGoldPromptInfo,typeList} = this.state
			const props = {
				rewardGoldPromptInfo,
				typeList
			}
			return (
				<CreateEditPanel type={this.props.type} title={this.props.type=='edit'?'编辑金币规则':'创建金币规则'} onSubmit={this.props.type=='create'?this.handleCreate:this.handleEdit} onDelete={this.handleDelete} {...props}/>
			)
		}
	}
	return connect(state => ({
	}),dispatch => ({
		addRewardGoldPrompt:bindActionCreators(addRewardGoldPrompt,dispatch),
		editRewardGoldPrompt:bindActionCreators(editRewardGoldPrompt,dispatch)
	}))(RewardGoldPromptCreateEditPanel)
}
