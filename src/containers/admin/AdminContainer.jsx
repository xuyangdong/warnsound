import React from 'react'
import {Table,Input,Button,notification,Popover} from 'antd'
import TableHeader from '../../components/common/TableHeader'
import styles from './AdminContainer.scss'
import EnhanceTable from '../../components/common/EnhanceTable'
import {bindActionCreators} from 'redux'
import {getAdmin} from 'actions/admin'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import config from '../../config'
import AddPermissionModal from '../../components/admin/AddPermissionModal'

class AdminContainer extends React.Component {
	static contextTypes = {
		router:React.PropTypes.object
	}
	constructor(){
		super()
		this.state = {
			showAddPermissionModal:false
		}
	}
	componentDidMount(){
		if(this.props.admin.get('data').isEmpty()){
			this.props.getAdmin(0,10)
		}
	}
	getTableData = () => {
		const columns = [{
			title:'用户名',
			dataIndex:'username',
			key:'username'
		},{
			title:'密码(未加密)',
			dataIndex:'password',
			key:'password',
		},{
			title:'操作',
			key:'operate',
			render:(t,r) => {
				return (
				<div>
					<Link to={`/admin/edit/${r.id}`}>编辑</Link>&nbsp;
					<a onClick={() => {
						this._choosenAdmin = r.id
						this.setState({
							showAddPermissionModal:true
						})
					}}>添加权限</a>
				</div>
				)
			}
		}]
		const dataSource = this.props.admin.get('data').map((v,k) => ({
			...v.toJS(),
			key:k
		})).toJS()
		return {
			columns,
			dataSource
		}
	}
	handleCreate = () => {
		this.context.router.push('/admin/create')
	}
	render(){
		const {columns,dataSource} = this.getTableData()
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<TableHeader title='后台用户列表'
					 searchBar={[]}
					 functionBar={['create']} onCreate={this.handleCreate}/>
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} pagination={{
						total:this.props.admin.getIn(['otherData','totalSize']),
						onChange:(page,pageSize) => {
							this.setState({
								current:page-1,
								pageSize:pageSize
							})
							this.props.getAdmin(page-1,pageSize)
						}
					}}/>
				</div>
				{this.state.showAddPermissionModal?<AddPermissionModal adminId={this._choosenAdmin}
				onCancel={() => {
					this.setState({
						showAddPermissionModal:false
					})
				}}
				/>:null}
			</div>
		)
	}
}

export default connect(state => ({
	admin:state.get('admin')
}), dispatch => ({
	getAdmin:bindActionCreators(getAdmin,dispatch)
}))(AdminContainer)
