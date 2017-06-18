import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import CreateEditPanel from '../containers/soundeffect/CreateEditPanel'
import config from '../config'


export default (CreateEditPanel) => {
	class SoundEffectCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				soundEffectInfo:fromJS([])
			}
		}
		componentDidMount(){
			this.props.type=='edit'?fetch(config.api.soundEffect.query(this.props.params.id),{
				headers: {
					'authorization': sessionStorage.getItem('auth')
				},
			}).then(res => res.json()).then(res => {
				this.setState({
					soundEffectInfo:fromJS(res)
				})
			}):null
		}
		handleCreate(){

		}
		handleEdit(){

		}
		render(){
			const {soundEffectInfo} = this.state
			const props = {
				soundEffectInfo,
			}
			return <CreateEditPanel onSubmit={this.props.type=='create'?this.handleCreate:this.handleEdit} title={this.props.type=='create'?'新建SoundEffect':`SoundEffect ${soundEffectInfo.get('description')}`} {...props}/>
		}
	}
	function mapStateToProps(state){
		return {}
	}
	function mapDispatchToProps(dispatch){
		return {}
	}
	return connect(mapStateToProps,mapDispatchToProps)(SoundEffectCreateEditPanel)
}
