import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styles from './DiscoverContainer.scss'
import TableHeader from '../../components/common/TableHeader'
import {getDiscoverList} from 'actions/discover'
import EnhanceTable from '../../components/common/EnhanceTable'
import PropTypes from 'prop-types'

class DiscoverContainer extends React.Component {
	static contextTypes = {
		router:PropTypes.object
	}
	componentDidMount(){
		if(this.props.discover.get('data').isEmpty()){
			this.props.getDiscoverList(0,10)
		}
	}
	getTableData = () => {
		const columns = [{
			title:'编号',
			dataIndex:'id',
			key:'id'
		},{
			title:'标题',
			dataIndex:'title',
			key:'title'
		},{
			title:'图片',
			dataIndex:'pictureUrl',
			key:'pictureUrl',
			render:(t,r) => {
				return <img src={t} style={{width:50}} />
			}
		},{
			title:'网页',
			dataIndex:'webUrl',
			key:'WebUrl'
		},{
			title:'描述',
			dataIndex:'description',
			key:'description'
		},{
			title:'创建时间',
			dataIndex:'createTime',
			key:'createTime'
		},{
			title:'更新时间',
			dataIndex:'updateTime',
			key:'updateTime'
		},{
			title:'操作',
			key:'operate',
			render:(t,r) => (
				<a onClick={this.handleEdit.bind(this,r.id)}>编辑</a>
			)
		}]
		const dataSource = this.props.discover.get('data').map((v,k) => ({
			...v.toJS(),
			key:k
		})).toJS()
		return {
			columns,
			dataSource
		}
	}
	handleCreate = () => {
		this.context.router.push('/discover/create')
	}
	handleEdit = (id) => {
		this.context.router.push(`/discover/edit/${id}`)
	}
	render(){
		const {columns,dataSource} = this.getTableData()
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<TableHeader functionBar={['create']} onCreate={this.handleCreate} title={'发现列表'}/>
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} pagination={{
						total:this.props.discover.getIn(['otherData','totalSize']),
						onChange:(page,pageSize) => {
							this.setState({
								current:page,
								pageSize:pageSize
							})
							this.props.getStories(page,pageSize)
						}
					}}/>
				</div>
			</div>
		)
	}
}

export default connect(state => {
	return {
		discover:state.get('discover')
	}
}, dispatch => {
	return {
		getDiscoverList:bindActionCreators(getDiscoverList,dispatch)
	}
})(DiscoverContainer)
