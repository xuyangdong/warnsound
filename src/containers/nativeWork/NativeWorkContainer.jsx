import React from 'react'
import styles from './NativeWorkContainer.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import TableHeader from '../../components/common/TableHeader'
import EnhanceTable from '../../components/common/EnhanceTable'
import {getNativeWork} from 'actions/nativeWork'
import PropTypes from 'prop-types'
import {Link} from 'react-router'

class NativeWorkContainer extends React.Component {
	static contextTypes = {
		router:PropTypes.object
	}
	state = {
		current:0,
		pageSize:10
	}
	componentDidMount(){
		if(this.props.nativeWork.get('data').isEmpty()){
			this.props.getNativeWork(0,10,{orderRule:0,fieldName:'listenCount'})
		}
	}
	getTableData = () => {
		const columns = [{
			title:'ID',
			dataIndex:'id',
			key:'id'
		},{
			title:'用户名',
			dataIndex:'username',
			key:'username'
		},{
			title:'故事标题',
			dataIndex:'storyTitle',
			key:'storyTitle'
		},{
			title:'点赞数',
			dataIndex:'likeCount',
			key:'likeCount'
		},{
			title:'封面',
			dataIndex:'coverUrl',
			render:(t,r) => {
				return <img src={t} style={{maxWidth:100}}/>
			}
		},{
			title:'时长',
			dataIndex:'duration',
			key:'duration'
		},{
			title:'reviewCount',
			dataIndex:'reviewCount',
			key:'reviewCount'
		},{
			title:'listenCount',
			dataIndex:'listenCount',
			key:'listenCount',
			sorter: true
		},{
			title:'createTime',
			dataIndex:'createTime',
			key:'createTime',
			sorter: true
		},{
			title:'操作',
			key:'operate',
			render:(t,r) => {
				return (<Link to={`/nativeWork/edit/${r.id}`}>编辑</Link>)
			}
		}]
		const dataSource = this.props.nativeWork.get('data').map((v,k) => ({
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
					<TableHeader title={`最新作品列表`}
					 searchBar={[]}
					 functionBar={['create']}
					 onCreate={()=>{
						 this.context.router.push(`/nativeWork/create`)
					 }}
					 />
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} pagination={{
						total:this.props.nativeWork.getIn(['otherData','totalSize']),
						current:this.props.nativeWork.getIn(['otherData','offset'])+1,
						// onChange:(page,pageSize) => {
						// 	this.setState({
						// 		current:page-1,
						// 		pageSize:pageSize
						// 	})
						// 	this.props.getNativeWork(page-1,pageSize,{
						// 		orderRule:this.props.nativeWork.getIn(['otherData','orderRule']),
						// 		fieldName:this.props.nativeWork.getIn(['otherData','fieldName'])
						// 	})
						// }
					}} onChange={(pagination,filters,sorter) => {
						this.setState({
							current:pagination.current-1,
							pageSize:pagination.pageSize,
							orderRule:sorter.order=='descend'?0:1,
							fieldName:sorter.field
						})
						this.props.getNativeWork(pagination.current-1,pagination.pageSize,{
							orderRule:sorter.order?(sorter.order=='descend'?0:1):this.props.nativeWork.getIn(['otherData','orderRule']),
							fieldName:sorter.field?sorter.field:this.props.nativeWork.getIn(['otherData','fieldName'])
						})
					}}/>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	nativeWork:state.get('nativeWork')
}),dispatch => ({
	getNativeWork:bindActionCreators(getNativeWork,dispatch),
}))(NativeWorkContainer)
