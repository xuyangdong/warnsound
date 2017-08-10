import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import CreateEditPanel from '../containers/publishapp/CreateEditPanel'
import config from '../config'
import {getAppList,addApp,updateApp} from 'actions/app'

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
				if(this.props.app.get('data').isEmpty()){
					// TODO: 缺少一个获取app的接口，先用getList代替
					this.props.getAppList(0,100)
				}else{
					this.setState({
						appInfo:this.props.app.get('data').find(v => v.get('appId')==this.props.params.id)
					})
				}
			}
		}
		componentWillReceiveProps(nextProps){
			if(nextProps.type=='edit'){
				if(!nextProps.app.get('data').isEmpty()){
					this.setState({
						appInfo:nextProps.app.get('data').find(v => v.get('appId')==this.props.params.id)
					})
				}
			}
		}
		handleCreate = (formdata) => {

			return this.props.addApp(formdata)
		}
		handleEdit = (formdata) => {
			return this.props.updateApp(formdata,this.props.params.id)
		}
		render() {
			const {appInfo} = this.state
			const props = {
				appInfo
			}
			return <CreateEditPanel onSubmit={this.props.type=='edit'?this.handleEdit:this.handleCreate} title={this.props.type=='edit'?'更新APP':'发布APP'} {...props}/>
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
			updateApp:bindActionCreators(updateApp,dispatch)
		}
	})(AppCreateEditPanel)
}
