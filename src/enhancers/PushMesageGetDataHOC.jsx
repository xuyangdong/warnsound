import React from 'react'
import config from '../config'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import {notification} from 'antd'
import {getPushMessage,addPushMessage,editPushMessage,deletePushMessage} from 'actions/pushMessage'

export default (CreateEditPanel) => {
	class PushMessageCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				pushMessageInfo:fromJS({}),
				destinationList:fromJS([])
			}
		}
		componentDidMount(){
			fetch(config.api.destination.get(0,100000),{
				headers:{
					'authorization':sessionStorage.getItem('auth')
				}
			}).then(res => res.json()).then(res => {
				this.setState({
					destinationList:fromJS(res.obj)
				})
			})
			if(this.props.type=='edit'){
				fetch(config.api.pushMessage.query(this.props.params.id),{
					headers:{
						authorization:sessionStorage.getItem('auth')
					}
				}).then(res => res.json()).then(res => {
					this.setState({
						pushMessageInfo:fromJS(res.obj)
					})
				})
			}
		}
		componentWillReceiveProps(nextProps){
			// if(nextProps.type=='edit' && !nextProps.destination.get('data').isEmpty()){
			// 	this.setState({
			// 		destinationInfo:nextProps.destination.get('data').find(v => v.get('id')==this.props.params.id)
			// 	})
			// }
		}
		handleCreate = formData => {
			return this.props.addPushMessage(formData)
		}
		handleEdit = formData => {
			// console.log(formData)
			formData.append('messageId',this.props.params.id)
			return this.props.editPushMessage(formData,this.props.params.id)
		}
		handleDelete = () => {
			return this.props.deletePushMessage(this.props.params.id)
		}
		render(){
			const {pushMessageInfo,destinationList} = this.state
			const props = {
				pushMessageInfo,
				destinationList
			}
			return (
				<CreateEditPanel type={this.props.type} title={this.props.type=='edit'?'编辑推送消息':'创建推送消息'} onSubmit={this.props.type=='create'?this.handleCreate:this.handleEdit} onDelete={this.handleDelete} {...props}/>
			)
		}
	}
	return connect(state => ({
	}),dispatch => ({
		addPushMessage:bindActionCreators(addPushMessage,dispatch),
		editPushMessage:bindActionCreators(editPushMessage,dispatch),
		deletePushMessage:bindActionCreators(deletePushMessage,dispatch),
	}))(PushMessageCreateEditPanel)
}
