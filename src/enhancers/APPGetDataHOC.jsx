import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import CreateEditPanel from '../containers/publishapp/CreateEditPanel'
import config from '../config'
import {getAppList,addApp,updateApp,deleteApp} from 'actions/app'

export default (CreateEditPanel) => {
	class AppCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				appInfo : fromJS({})
			}
		}
		componentDidMount(){
			if(this.props.type=='edit'){
				fetch(config.api.app.query(this.props.params.id),{
					headers:{
						'authorization':sessionStorage.getItem('auth')
					}
				}).then(res => res.json()).then(res => {
					this.setState({
						appInfo:fromJS(res.obj)
					})
				})
			}

		}
		handleCreate = (formdata) => {

			return this.props.addApp(formdata)
		}
		handleEdit = (formdata) => {
			return this.props.updateApp(formdata,this.props.params.id)
		}
		handleDelete = () => {
			return this.props.deleteApp(this.props.params.id)
		}
		render() {
			const {appInfo} = this.state
			const props = {
				appInfo
			}
			return <CreateEditPanel onDelete={this.handleDelete} onSubmit={this.props.type=='edit'?this.handleEdit:this.handleCreate} title={this.props.type=='edit'?'更新APP':'发布APP'} {...props}/>
		}
	}
	return connect(state => {
		return {
			app:state.get('app'),
		}
	}, dispatch => {
		return {
			getAppList:bindActionCreators(getAppList,dispatch),
			addApp:bindActionCreators(addApp,dispatch),
			updateApp:bindActionCreators(updateApp,dispatch),
			deleteApp:bindActionCreators(deleteApp,dispatch)
		}
	})(AppCreateEditPanel)
}
