import React from 'react'
import config from '../config'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import {notification} from 'antd'
import {addInitImage,editInitImage,deleteInitImage} from 'actions/initImage'

export default (CreateEditPanel) => {
	class InitImageCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				initImageInfo:fromJS({})
			}
		}
		componentDidMount(){
			if(this.props.type=='edit'){
				fetch(config.api.initImage.query(this.props.params.id),{
					headers:{
						'authorization':sessionStorage.getItem('auth')
					}
				}).then(res => res.json()).then(res => {
					this.setState({
						initImageInfo:fromJS(res.obj)
					})
				})
			}
		}
		handleCreate = formData => {
			return this.props.addInitImage(formData)
			// return this.props.addStorySet(jsonData)
		}
		handleEdit = formData => {
			formData.append('id',this.props.params.id)
			return this.props.editInitImage(formData)
		}
		handleDelete = () => {
			return this.props.deleteInitImage(this.props.params.id)
		}
		handleSwitch = (value) => {
			fetch(config.api.initImage.isShow(this.props.params.id,value),{
				headers:{
					'authorization':sessionStorage.getItem('auth')
				}
			}).then(res => res.json()).then(res => {
				if(res.status == 2){
					notification.error({message:res.errorMes})
				}else{
					notification.success({message:value?'图片已显示':'图片已隐藏'})
				}
			})
		}
		render(){
			const {initImageInfo} = this.state
			const props = {
				initImageInfo
			}
			return (
				<CreateEditPanel onSwitch={this.handleSwitch} type={this.props.type} title={this.props.type=='edit'?'编辑开屏页':'创建开屏页'} onSubmit={this.props.type=='create'?this.handleCreate:this.handleEdit} onDelete={this.handleDelete} {...props}/>
			)
		}
	}
	return connect(state => ({}),dispatch => ({
		addInitImage:bindActionCreators(addInitImage,dispatch),
		deleteInitImage:bindActionCreators(deleteInitImage,dispatch),
		editInitImage:bindActionCreators(editInitImage,dispatch)
	}))(InitImageCreateEditPanel)
}
