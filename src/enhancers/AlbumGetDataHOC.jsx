import React from 'react'
import config from '../config'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import {addAlbum,editAlbum} from 'actions/album'

export default (CreateEditPanel) => {
	class AlbumCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				albumInfo:fromJS({})
			}
		}
		componentDidMount(){
			if(this.props.type=='edit'){
				fetch(config.api.album.query(this.props.params.id),{
					headers:{
						authorization:sessionStorage.getItem('auth')
					}
				}).then(res => res.json()).then(res => {
					this.setState({
						albumInfo:fromJS(res)
					})
				})
			}
		}
		handleCreate = (jsonData) => {
			this.props.addAlbum(jsonData)
		}
		handleEdit = (jsonData) => {
			this.props.editAlbum(jsonData,this.props.params.id)
		}
		render(){
			const {albumInfo} = this.state
			const props = {
				albumInfo
			}
			return (
				<CreateEditPanel title='创建专辑' onSubmit={this.props.type=='create'?this.handleCreate:this.handleEdit} {...props}/>
			)
		}
	}
	return connect(state => ({}),dispatch => ({
		addAlbum:bindActionCreators(addAlbum,dispatch),
		editAlbum:bindActionCreators(editAlbum,dispatch)
	}))(AlbumCreateEditPanel)
}
