import React from 'react'
import styles from './UserGoldAccountContainer.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import TableHeader from '../../components/common/TableHeader'
import EnhanceTable from '../../components/common/EnhanceTable'
import {getUserGoldAccount} from 'actions/userGoldAccount'
import PropTypes from 'prop-types'
import {Link} from 'react-router'

class UserGoldAccountContainer extends React.Component {
	static contextTypes = {
		router:PropTypes.object
	}
	state = {
		current:0,
		pageSize:10
	}
	componentDidMount(){
		if(this.props.userGoldAccount.get('data',[]).isEmpty()){
			this.props.getUserGoldAccount(0,10)
		}
	}
	getTableData = () => {
		const columns = [{
			title:'ID',
			dataIndex:'id',
			key:'id'
		},{
			title:'用户ID',
			dataIndex:'userId',
			key:'userId'
		},{
			title:'金币数量',
			dataIndex:'amount',
			key:'amount'
		},
		// {
		// 	title:'操作',
		// 	key:'operate',
		// 	render:(t,r) => {
		// 		return (
		// 			<div>
		// 			<Link to={`/worksTag/edit/${r.id}`}>编辑</Link>&nbsp;
		// 			<Link to={`/worksTag/work/show/${r.id}`}>作品</Link>
		// 			</div>
		// 		)
		// 	}
		// }
	]
		const dataSource = this.props.userGoldAccount.get('data').map((v,k) => ({
			...v.toJS(),
			key:k
		})).toJS()
		return {
			columns,
			dataSource
		}
	}
	render(){
		const {columns,dataSource} = this.getTableData()
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<TableHeader title={`作品列表`}
					 searchBar={[]}
					 functionBar={['create']}
					 onCreate={()=>{
						 this.context.router.push(`/worksTag/create`)
					 }}
					 />
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} pagination={{
						total:this.props.userGoldAccount.getIn(['otherData','totalSize']),
						current:this.props.userGoldAccount.getIn(['otherData','offset'])+1,
						onChange:(page,pageSize) => {
							this.setState({
								current:page-1,
								pageSize:pageSize
							})
							this.props.getUserGoldAccount(page-1,pageSize)
						}
					}}/>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	userGoldAccount:state.get('userGoldAccount')
}),dispatch => ({
	getUserGoldAccount:bindActionCreators(getUserGoldAccount,dispatch),
}))(UserGoldAccountContainer)
