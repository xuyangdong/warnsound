import React from 'react'
import config from '../config'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import {notification} from 'antd'
import {getContinuousLoginPrompt,addContinuousLoginPrompt,editContinuousLoginPrompt,deleteContinuousLoginPrompt} from 'actions/continuousLoginPrompt'

export default (CreateEditPanel) => {
	class ContinuousLoginPromtCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				continuousLoginPromptInfo:fromJS({}),
			}
		}
		componentDidMount(){
			if(this.props.type=='edit' && !this.props.continuousLoginPrompt.get('data').isEmpty()){
				this.setState({
					continuousLoginPromptInfo:this.props.continuousLoginPrompt.get('data').find(v => v.get('id')==this.props.params.id)
				})
			}else{
				this.props.getContinuousLoginPrompt(0,10)
			}
		}
		componentWillReceiveProps(nextProps){
			if(nextProps.type=='edit' && !nextProps.continuousLoginPrompt.get('data').isEmpty()){
				this.setState({
					continuousLoginPromptInfo:nextProps.continuousLoginPrompt.get('data').find(v => v.get('id')==this.props.params.id)
				})
			}
		}
		handleCreate = formData => {
			return this.props.addContinuousLoginPrompt(formData)
		}
		handleEdit = formData => {
			// console.log(formData)
			formData.append('id',this.props.params.id)
			return this.props.editContinuousLoginPrompt(formData,this.props.params.id)
		}
		handleDelete = () => {
			return this.props.deleteContinuousLoginPrompt(this.props.params.id)
		}
		render(){
			const {continuousLoginPromptInfo} = this.state
			const props = {
				continuousLoginPromptInfo,
			}
			return (
				<CreateEditPanel type={this.props.type} title={this.props.type=='edit'?'编辑提示语':'创建提示语'} onSubmit={this.props.type=='create'?this.handleCreate:this.handleEdit} onDelete={this.handleDelete} {...props}/>
			)
		}
	}
	return connect(state => ({
		continuousLoginPrompt:state.get('continuousLoginPrompt')
	}),dispatch => ({
		addContinuousLoginPrompt:bindActionCreators(addContinuousLoginPrompt,dispatch),
		editContinuousLoginPrompt:bindActionCreators(editContinuousLoginPrompt,dispatch),
		deleteContinuousLoginPrompt:bindActionCreators(deleteContinuousLoginPrompt,dispatch),
		getContinuousLoginPrompt:bindActionCreators(getContinuousLoginPrompt,dispatch)
	}))(ContinuousLoginPromtCreateEditPanel)
}
