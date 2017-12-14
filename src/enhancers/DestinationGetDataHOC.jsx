import React from 'react'
import config from '../config'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import {notification} from 'antd'
import {getDestination,addDestination,editDestination,deleteDestination} from 'actions/destination'

export default (CreateEditPanel) => {
	class DestinationCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				destinationInfo:fromJS({}),
			}
		}
		componentDidMount(){
			// if(this.props.type=='edit' && !this.props.destination.get('data').isEmpty()){
			// 	this.setState({
			// 		destinationInfo:this.props.destination.get('data').find(v => v.get('id')==this.props.params.id)
			// 	})
			// }else{
			// 	this.props.getDestination(0,10)
			// }
		}
		componentWillReceiveProps(nextProps){
			// if(nextProps.type=='edit' && !nextProps.destination.get('data').isEmpty()){
			// 	this.setState({
			// 		destinationInfo:nextProps.destination.get('data').find(v => v.get('id')==this.props.params.id)
			// 	})
			// }
		}
		handleCreate = formData => {
			return this.props.addDestination(formData)
		}
		handleEdit = formData => {
			// console.log(formData)
			formData.append('id',this.props.params.id)
			return this.props.editDestination(formData,this.props.params.id)
		}
		handleDelete = () => {
			return this.props.deleteDestination(this.props.params.id)
		}
		render(){
			const {destinationInfo} = this.state
			const props = {
				destinationInfo,
			}
			return (
				<CreateEditPanel type={this.props.type} title={this.props.type=='edit'?'编辑跳转地':'创建跳转地'} onSubmit={this.props.type=='create'?this.handleCreate:this.handleEdit} onDelete={this.handleDelete} {...props}/>
			)
		}
	}
	return connect(state => ({
		destination:state.get('destination')
	}),dispatch => ({
		addDestination:bindActionCreators(addDestination,dispatch),
		editDestination:bindActionCreators(editDestination,dispatch),
		deleteDestination:bindActionCreators(deleteDestination,dispatch),
		getDestination:bindActionCreators(getDestination,dispatch)
	}))(DestinationCreateEditPanel)
}
