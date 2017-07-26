import React from 'react'
import config from '../config'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addDiscover,editDiscover} from 'actions/discover'
import {fromJS} from 'immutable'

export default (CreateEditPanel) => {
	class DiscoverCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				discoverInfo:fromJS({})
			}
		}
		componentDidMount(){
			this.props.type=='edit'?fetch(config.api.discover.query(this.props.params.id),{
				headers:{
					authorization:sessionStorage.getItem('auth')
				}
			}).then(res => res.json()).then(res => {
				this.setState({
					discoverInfo:fromJS(res.obj)
				})
			}):null
		}
		handleCreate = (formData) => {
			return this.props.addDiscover(formData)
		}
		handleEdit = (formData) => {
			return this.props.editDiscover(formData,this.props.params.id)
		}
		render(){
			const {discoverInfo} = this.state
			const props = {
				discoverInfo
			}
			return (
				<CreateEditPanel onSubmit={this.props.type=='edit'?this.handleEdit:this.handleCreate} title={this.props.type=='edit'?'更新发现':'新建发现'} {...props}/>
			)
		}
	}
	return connect(state => {
		return {}
	}, dispatch => {
		return {
			addDiscover:bindActionCreators(addDiscover,dispatch),
			editDiscover:bindActionCreators(editDiscover,dispatch)
		}
	})(DiscoverCreateEditPanel)
}
