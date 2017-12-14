import React from 'react'
import {Table,Input,Button,notification,Popover} from 'antd'
import TableHeader from '../../components/common/TableHeader'
import styles from './PermissionContainer.scss'
import EnhanceTable from '../../components/common/EnhanceTable'
import {bindActionCreators} from 'redux'
import {getPermission} from 'actions/permission'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import config from '../../config'

class PermissionContainer extends React.Component {
	static contextTypes = {
		router:React.PropTypes.object
	}
	constructor(){
		super()
		this.state = {
		}
	}
	componentDidMount(){
		if(this.props.permission.get('data').isEmpty()){
			this.props.getPermission(0,10)
		}
	}
	getTableData = () => {
		const columns = [{
			title:'名称',
			dataIndex:'name',
			key:'name'
		},{
			title:'描述',
			dataIndex:'description',
			key:'description',
		},{
			title:'权限吗',
			dataIndex:'id',
			key:'id',
		},{
			title:'操作',
			key:'operate',
			render:(t,r) => {
				return (
				<div>
					<Link to={`/permission/edit/${r.id}`}>编辑</Link>
				</div>
				)
			}
		}]
		const dataSource = this.props.permission.get('data').map((v,k) => ({
			...v.toJS(),
			key:k
		})).toJS()
		return {
			columns,
			dataSource
		}
	}
	handleCreate = () => {
		this.context.router.push('/permission/create')
	}
	render(){
		const {columns,dataSource} = this.getTableData()
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<TableHeader title='权限列表'
					 searchBar={[]}
					 functionBar={['create']} onCreate={this.handleCreate}/>
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} pagination={{
						total:this.props.permission.getIn(['otherData','totalSize']),
						current:this.props.permission.getIn(['otherData','offset'],0)+1,
						onChange:(page,pageSize) => {
							this.setState({
								current:page-1,
								pageSize:pageSize
							})
							this.props.getPermission(page-1,pageSize)
						}
					}}/>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	permission:state.get('permission')
}), dispatch => ({
	getPermission:bindActionCreators(getPermission,dispatch)
}))(PermissionContainer)
