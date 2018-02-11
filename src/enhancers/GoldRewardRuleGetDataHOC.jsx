import React from 'react'
import config from '../config'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import {notification} from 'antd'
import {addGoldRewardRule,editGoldRewardRule} from 'actions/goldRewardRule'

export default (CreateEditPanel) => {
	class GoldRewardRuleCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				goldRewardRuleInfo:fromJS({}),
				typeList:fromJS([])
			}
		}
		componentDidMount(){
			fetch(config.api.goldRewardRule.type.getWithDesc,{
				headers:{
					'authorization':sessionStorage.getItem('auth')
				}
			}).then(res => res.json()).then(res => {
				this.setState({
					typeList:fromJS(res.obj)
				})
			})
			if(this.props.type == 'edit'){
				fetch(config.api.goldRewardRule.query(this.props.params.id),{
					headers:{
						'authorization':sessionStorage.getItem('auth')
					}
				}).then(res => res.json()).then(res => {
					this.setState({
						goldRewardRuleInfo:fromJS(res.obj)
					})
				})
			}
		}
		componentWillReceiveProps(nextProps){
		}
		handleCreate = formData => {
			return this.props.addGoldRewardRule(formData)
		}
		handleEdit = formData => {
			// console.log(formData)
			formData.append('id',this.props.params.id)
			return this.props.editGoldRewardRule(formData,this.props.params.id)
		}
		handleDelete = () => {
			// return this.props.deleteWorksTag(this.props.params.id)
		}
		render(){
			const {goldRewardRuleInfo,typeList} = this.state
			const props = {
				goldRewardRuleInfo,
				typeList
			}
			return (
				<CreateEditPanel type={this.props.type} title={this.props.type=='edit'?'编辑金币规则':'创建金币规则'} onSubmit={this.props.type=='create'?this.handleCreate:this.handleEdit} onDelete={this.handleDelete} {...props}/>
			)
		}
	}
	return connect(state => ({
	}),dispatch => ({
		addGoldRewardRule:bindActionCreators(addGoldRewardRule,dispatch),
		editGoldRewardRule:bindActionCreators(editGoldRewardRule,dispatch)
	}))(GoldRewardRuleCreateEditPanel)
}
