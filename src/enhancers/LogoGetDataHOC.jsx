import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import CreateEditPanel from '../containers/logo/CreateEditPanel'
import config from '../config'
import {createLogo} from 'actions/logo'

export default (CreateEditPanel) => {
	class LogoCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				// appInfo : fromJS({})
			}
		}
		componentDidMount(){
			// if(this.props.type=='edit'){
			// 	if(this.props.app.get('data').isEmpty()){
			// 		// TODO: 缺少一个获取app的接口，先用getList代替
			// 		this.props.getAppList(0,100)
			// 	}else{
			// 		this.setState({
			// 			appInfo:this.props.app.get('data').find(v => v.get('appId')==this.props.params.id)
			// 		})
			// 	}
			// }
		}
		handleCreate = (formdata) => {

			return this.props.createLogo(formdata)
		}
		handleEdit = (formdata) => {
			// return this.props.updateApp(formdata,this.props.params.id)
		}
		render() {
			const props = {}
			return <CreateEditPanel onSubmit={this.props.type=='edit'?this.handleEdit:this.handleCreate} title={this.props.type=='edit'?'更新徽章':'新建徽章'} {...props}/>
		}
	}
	return connect(state => {
		return {
			// app:state.get('app'),
		}
	}, dispatch => {
		return {
			createLogo:bindActionCreators(createLogo,dispatch),
			// addApp:bindActionCreators(addApp,dispatch),
			// updateApp:bindActionCreators(updateApp,dispatch)
		}
	})(LogoCreateEditPanel)
}
