import React from 'react'
import {Table,Input,Button,notification} from 'antd'
import TableHeader from '../../components/common/TableHeader'
import styles from './UserContainer.scss'
import EnhanceTable from '../../components/common/EnhanceTable'
import {bindActionCreators} from 'redux'
import {getUser} from 'actions/user'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import config from '../../config'
import PropTypes from 'prop-types'

class UserContainer extends React.Component {
	static contextTypes = {
		router:PropTypes.object
	}
	componentDidMount(){
		if(this.props.user.get('data').isEmpty()){
			this.props.getUser(0,10)
		}
	}
	getTableData = () => {
		const columns = [{
			title:'ID',
			dataIndex:'id',
			key:'id'
		},{
			title:'昵称',
			dataIndex:'nickname',
			key:'nickname'
		},{
			title:'手机',
			dataIndex:'mobile',
			key:'mobile'
		},{
			title:'邮箱',
			dataIndex:'email',
			key:'email'
		},{
			title:'性别',
			dataIndex:'sex',
			key:'sex',
			render:(t,r) => {
				return t?'男':'女'
			}
		},{
			title:'城市',
			dataIndex:'city',
			key:'city'
		},{
			title:'公司',
			dataIndex:'company',
			key:'company'
		},{
			title:'头像',
			dataIndex:'headImgUrl',
			key:'headImgUrl',
			render:(t,r) => {
				return <img src={t} style={{maxWidth:100}}/>
			}
		},{
			title:'作品',
			key:'work',
			render:(t,r) => {
				return (<Link to={`/user/work/show/${r.id}`}>作品</Link>)
			}
		},{
			title:'操作',
			key:'operate',
			render:(t,r) => {
				return (<Link to={`/user/edit/${r.id}`}>编辑</Link>)
			}
		}]
		const dataSource = this.props.user.get('data').map((v,k) => ({
			...v.toJS(),
			key:k
		})).toJS()
		return {
			columns,
			dataSource
		}
	}
	handleCreate = () => {
		this.context.router.push('/user/create')
	}
	render(){
		const {columns,dataSource} = this.getTableData()
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<TableHeader title='用户列表'
					 searchBar={[]}
					 functionBar={['create']} onCreate={this.handleCreate}/>
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} pagination={{
						total:this.props.user.getIn(['otherData','totalSize']),
						current:this.props.user.getIn(['otherData','offset'])+1,
						onChange:(page,pageSize) => {
							this.setState({
								current:page-1,
								pageSize:pageSize
							})
							this.props.getUser(page-1,pageSize)
						}
					}}/>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	user:state.get('user')
}), dispatch => ({
	getUser:bindActionCreators(getUser,dispatch)
}))(UserContainer)
