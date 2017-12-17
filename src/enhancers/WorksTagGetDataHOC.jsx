import React from 'react'
import config from '../config'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import {notification} from 'antd'
import {getWorksTag,addWorksTag,editWorksTag,deleteWorksTag} from 'actions/worksTag'

export default (CreateEditPanel) => {
	class WorksTagCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				worksTagInfo:fromJS({})
			}
		}
		componentDidMount(){
			if(this.props.type == 'edit'){
				fetch(config.api.worksTag.query(this.props.params.id),{
					headers: {
						'authorization': sessionStorage.getItem('auth')
					}
				}).then(res => res.json()).then(res => {
					if(res.status == 2){
						notification.error({message:res.errorMes})
					}else{
						this.setState({
							worksTagInfo:fromJS(res.obj)
						})
					}
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
			return this.props.addWorksTag(formData)
		}
		handleEdit = formData => {
			// console.log(formData)
			formData.append('id',this.props.params.id)
			return this.props.editWorksTag(formData,this.props.params.id)
		}
		handleDelete = () => {
			return this.props.deleteWorksTag(this.props.params.id)
		}
		render(){
			const {worksTagInfo} = this.state
			const props = {
				worksTagInfo
			}
			return (
				<CreateEditPanel type={this.props.type} title={this.props.type=='edit'?'编辑作品标签':'创建作品标签'} onSubmit={this.props.type=='create'?this.handleCreate:this.handleEdit} onDelete={this.handleDelete} {...props}/>
			)
		}
	}
	return connect(state => ({
	}),dispatch => ({
		addWorksTag:bindActionCreators(addWorksTag,dispatch),
		editWorksTag:bindActionCreators(editWorksTag,dispatch),
		deleteWorksTag:bindActionCreators(deleteWorksTag,dispatch),
	}))(WorksTagCreateEditPanel)
}
