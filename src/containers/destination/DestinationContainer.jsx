import React from 'react'
import styles from './DestinationContainer.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import TableHeader from '../../components/common/TableHeader'
import EnhanceTable from '../../components/common/EnhanceTable'
import {getDestination} from 'actions/destination'
import PropTypes from 'prop-types'
import {Link} from 'react-router'

class DestinationContainer extends React.Component {
	static contextTypes = {
		router:PropTypes.object
	}
	state = {
		current:0,
		pageSize:10
	}
	componentDidMount(){
		if(this.props.destination.get('data',[]).isEmpty()){
			this.props.getDestination(0,10)
		}
	}
	getTableData = () => {
		const columns = [{
			title:'ID',
			dataIndex:'id',
			key:'id'
		},{
			title:'跳转地内容',
			dataIndex:'content',
			key:'content'
		},{
			title:'描述内容',
			dataIndex:'description',
			key:'description'
		},{
			title:'跳转地类型',
			dataIndex:'destinationtype',
			key:'destinationtype',
			render:(t,r) => {
				switch (t) {
					case 1:
						return '跳转到APP'
					case 2:
						return '跳转到APP固定的activity'
					case 3:
						return '跳转到一个URL里面'
					default:
						return ''
				}
			}
		},{
			title:'操作',
			key:'operate',
			render:(t,r) => {
				return (<Link to={`/destination/edit/${r.id}`}>编辑</Link>)
			}
		}]
		const dataSource = this.props.destination.get('data').map((v,k) => ({
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
					<TableHeader title={`跳转地列表`}
					 searchBar={[]}
					 functionBar={['create']}
					 onCreate={()=>{
						 this.context.router.push(`/destination/create`)
					 }}
					 />
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} pagination={{
						total:this.props.destination.getIn(['otherData','totalSize']),
						current:this.props.destination.getIn(['otherData','offset'])+1,
						onChange:(page,pageSize) => {
							this.setState({
								current:page-1,
								pageSize:pageSize
							})
							this.props.getDestination(page-1,pageSize)
						}
					}}/>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	destination:state.get('destination')
}),dispatch => ({
	getDestination:bindActionCreators(getDestination,dispatch),
}))(DestinationContainer)
