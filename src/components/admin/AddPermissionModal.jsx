import React from 'react'
import {Modal,Table,Select,notification} from 'antd'
import PropTypes from 'prop-types'
import config from '../../config'
import Permission from 'permission'
import {fromJS} from 'immutable'
import styles from './AddPermissionModal.scss'
import _ from 'lodash'

const Option = Select.Option

export default class AddPermissionModal extends React.Component {
	_permissionDict = []
	static propTypes = {
		adminId:PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),
		visible:PropTypes.bool
	}
	constructor(){
		super()
		this.state = {
			adminPermission:fromJS([])
		}
	}
	componentDidMount(){
		fetch(config.api.admin.permission.query(this.props.adminId,0,10000),{
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => res.json()).then(res => {
			Permission.getPermissionDict().then(permissionDict => {
				this._permissionDict = permissionDict
				this.setState({
					adminPermission: fromJS(res.obj.map(item => item.codeId))
				})
			})
		})
	}
	getTableData = () => {
		const columns = [{
			title:'权限名',
			dataIndex:'permissionName',
			key:'permissionName'
		},{
			title:'操作',
			key:'operat',
			render:(t,r) => {
				return (<a onClick={this.handleDelete.bind(this,r.id)}>删除</a>)
			}
		}]
		const dataSource = this.state.adminPermission.map((v,k) => ({
			id:v,
			key:k,
			permissionName:(_.find(this._permissionDict,item => item.id == v)||{}).name
		})).toJS()
		return {
			columns,
			dataSource
		}
	}

	handleDelete = (code) => {
		let formData = new FormData()
		formData.append('adminId',this.props.adminId)
		formData.append('code',code)
		fetch(config.api.admin.permission.delete(this.props.adminId,code),{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			},
			body:formData
		}).then(res => res).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}else{
				this.setState({
					adminPermission:this.state.adminPermission.filter(v => v!=code)
				})
			}
		})
	}

	handleAdd = (value) => {
		if(this.state.adminPermission.some(v => v==value)){
			notification.warn({message:'重复添加'})
			return
		}
		fetch(config.api.admin.permission.add,{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth'),
				'content-type':'application/json'
			},
			body:JSON.stringify({
				adminId:this.props.adminId,
				codeId:value
			})
		}).then(res => res.json()).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}else{
				this.setState({
					adminPermission:this.state.adminPermission.unshift(value)
				})
			}
		})
	}
	render(){
		const {columns,dataSource} = this.getTableData()
		return (
			<Modal visible={true} title='添加权限'
			onCancel={this.props.onCancel}
			onOk={this.props.onCancel}
			>
				<div className={styles.content}>
					<div className={styles.header}>
						<Select style={{width:100}} onSelect={this.handleAdd}>
						{this._permissionDict.map((v,k) => (
							<Option value={''+v.id} title={v.name} key={k}>{v.name}</Option>
						))}
						</Select>
					</div>
					<Table dataSource={dataSource} columns={columns} />
				</div>
			</Modal>
		)
	}
}
