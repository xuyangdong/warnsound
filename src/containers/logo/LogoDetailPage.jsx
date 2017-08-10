import React from 'react'
import {getLogoDetail, addLogoDetailItem, editLogoDetailItem, deleteLogoDetailItem} from 'actions/logoDetail'
import {uploadIcon} from 'actions/common'
import {fromJS} from 'immutable'
import styles from './LogoDetailPage.scss'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import LogoEditableTable from '../../components/logo/LogoEditableTable'
import EditableCell from '../../components/common/EditableCell'
import {notification} from 'antd'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import _ from 'lodash'

class LogoDetailPage extends React.Component {
	constructor(){
		super()
	}

	componentDidMount(){
		this.props.getLogoDetail(this.props.params.id)
	}
	handleSave = (data) => {
		uploadIcon(data.file).then(res => {
			if(res.status == 2){
				notification.error({message: res.errorMes})
			}else{
				data.icon = res.obj.url
				this.props.addLogoDetailItem(_.omit({
					...data,
					badgeTypeId:this.props.params.id
				},'file'),this.props.params.id)
			}
		})
	}
	handleUpdate = (data) => {
		console.log(data)
		if(!data.file){
			this.props.editLogoDetailItem(_.omit({
				...data,
				icon:'',
				badgeTypeId:this.props.params.id,
			},'file'),this.props.params.id)
		}else if(data.file && data.file.size==0){
			this.props.editLogoDetailItem(_.omit({
				...data,
				icon:data.file.url,
				badgeTypeId:this.props.params.id,
			},['file']),this.props.params.id)
		}else{
			uploadIcon(data.file).then(res => {
				if(res.status == 2){
					notification.error({message: res.errorMes})
				}else{
					data.icon = res.obj.url
					this.props.editLogoDetailItem(_.omit({
						...data,
						badgeTypeId:this.props.params.id
					},'file'),this.props.params.id)
				}
			})
		}
	}
	handleDelete = (id) => {
		this.props.deleteLogoDetailItem(id,this.props.params.id)
	}
	render(){
		return (
			<div className={styles.container}>
				<div>
					<CreateEditHeader title='徽章详情页' functionBar={['back']}/>
				</div>
				<div className={styles.formPanel}>
					<LogoEditableTable
					data={this.props.detailData.get('data')}
					onSave={this.handleSave}
					onUpdate={this.handleUpdate}
					onDelete={this.handleDelete}
					/>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	detailData:state.get('logoDetail')
}),dispatch => ({
	getLogoDetail:bindActionCreators(getLogoDetail, dispatch),
	addLogoDetailItem:bindActionCreators(addLogoDetailItem, dispatch),
	editLogoDetailItem:bindActionCreators(editLogoDetailItem,dispatch),
	deleteLogoDetailItem:bindActionCreators(deleteLogoDetailItem,dispatch)
}))(LogoDetailPage)
