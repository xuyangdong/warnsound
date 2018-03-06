import React from 'react'
import styles from './UserBillContainer.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import TableHeader from '../../components/common/TableHeader'
import EnhanceTable from '../../components/common/EnhanceTable'
import {getUserBill} from 'actions/userGoldAccount'
import PropTypes from 'prop-types'
import {Link} from 'react-router'

class UserBillContainer extends React.Component {
	static contextTypes = {
		router:PropTypes.object
	}
	state = {
		current:0,
		pageSize:10
	}
	componentDidMount(){
		if(this.props.bill.get('data',[]).isEmpty() || this.props.params.userId != this.props.bill.getIn(['otherData','userId'])){
			this.props.getUserBill(0,10,{userId:this.props.params.userId})
		}
	}
	getTableData = () => {
		const columns = [{
			title:'ID',
			dataIndex:'id',
			key:'id'
		},{
			title:'amount',
			dataIndex:'amount',
			key:'amount'

		},{
			title:'des',
			dataIndex:'des',
			key:'des'
		},{
			title:'description',
			dataIndex:'description',
			key:'description'
		},{
			title:'prompt',
			dataIndex:'prompt',
			key:'prompt'
		},{
			title:'relativeId',
			dataIndex:'relativeId',
			key:'relativeId'
		},{
			title:'relativeUserId',
			dataIndex:'relativeUserId',
			key:'relativeUserId'
		},{
			title:'type',
			dataIndex:'type',
			key:'type'
		},{
			title:'userId',
			dataIndex:'userId',
			key:'userId'
		}
	]
		const dataSource = this.props.bill.get('data').map((v,k) => ({
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
					<TableHeader title={`用户账单`}
					 searchBar={[]}
					 functionBar={[]}
					 onCreate={()=>{

					 }}
					 >
					 	<Link to='/userGoldAccount'>返回</Link>
					 </TableHeader>
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} pagination={{
						total:this.props.bill.getIn(['otherData','totalSize']),
						current:this.props.bill.getIn(['otherData','offset'])+1,
						onChange:(page,pageSize) => {
							this.setState({
								current:page-1,
								pageSize:pageSize
							})
							this.props.getUserBill(page-1,pageSize,{userId:this.props.bill.getIn(['otherData','userId'])})
						}
					}}/>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	bill:state.get('bill')
}),dispatch => ({
	getUserBill:bindActionCreators(getUserBill,dispatch),
}))(UserBillContainer)
