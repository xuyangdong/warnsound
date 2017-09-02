import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import CreateEditPanel from '../containers/logo/CreateEditPanel'
import config from '../config'
import {createLogo,deleteLogo} from 'actions/logo'

export default (CreateEditPanel) => {
	class LogoCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				// appInfo : fromJS({})
				logoInfo:fromJS({})
			}
		}
		componentDidMount(){
			if(this.props.type=='edit'){
				fetch(config.api.logo.query(this.props.params.id),{
					headers:{
						authorization:sessionStorage.getItem('auth')
					}
				}).then(res => res.json()).then(res => {
					this.setState({
						logoInfo:fromJS(res)
					})
				})
			}
		}
		handleCreate = (formdata) => {

			return this.props.createLogo(formdata)
		}
		handleEdit = (formdata) => {
			// return this.props.updateApp(formdata,this.props.params.id)
		}
		handleDelete = () => {
			return this.props.deleteLogo(this.props.params.id)
		}
		render() {
			const {logoInfo} = this.state
			const props = {logoInfo}
			return <CreateEditPanel onDelete={this.handleDelete} onSubmit={this.props.type=='edit'?this.handleEdit:this.handleCreate} title={this.props.type=='edit'?'更新徽章':'新建徽章'} {...props}/>
		}
	}
	return connect(state => {
		return {
			// app:state.get('app'),
		}
	}, dispatch => {
		return {
			createLogo:bindActionCreators(createLogo,dispatch),
			deleteLogo:bindActionCreators(deleteLogo,dispatch)
			// addApp:bindActionCreators(addApp,dispatch),
			// updateApp:bindActionCreators(updateApp,dispatch)
		}
	})(LogoCreateEditPanel)
}
