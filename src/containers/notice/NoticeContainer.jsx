import React from 'react'
import {Table,Input,Button,notification,Popover} from 'antd'
import TableHeader from '../../components/common/TableHeader'
import styles from './NoticeContainer.scss'
import EnhanceTable from '../../components/common/EnhanceTable'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import config from '../../config'

import {getNotice} from 'actions/notice'

class NoticeContainer extends React.Component {
	static contextTypes = {
		router:React.PropTypes.object
	}
	constructor(){
		super()
		this.state = {
			openAddStoryModal:false
		}
	}
	componentDidMount(){
		if(this.props.notice.get('data').isEmpty()){
			this.props.getNotice(1,10)
		}
	}
	getTableData = () => {
		const columns = [{
			title:'标题',
			dataIndex:'title',
			key:'title'
		},{
			title:'内容',
			dataIndex:'content',
			key:'content',
			render:(t,r) => {
				const content = (
					<p>{t}</p>
				)
				return (
					<Popover content={content}>
					  <p>{t.length>22?`${t.substring(0,10)}...${t.substring(t.length-10)}`:t}</p>
					</Popover>
				)
			}
		},{
			title:'操作',
			key:'operate',
			render:(t,r) => {
				return (
				<div>
					<Link to={`/notice/edit/${r.id}`}>编辑</Link>
				</div>
				)
			}
		}]
		const dataSource = this.props.notice.get('data').map((v,k) => ({
			...v.toJS(),
			key:k
		})).toJS()
		return {
			columns,
			dataSource
		}
	}
	handleCreate = () => {
		this.context.router.push('/notice/create')
	}
	render(){
		const {columns,dataSource} = this.getTableData()
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<TableHeader title='系统通知列表'
					 searchBar={[]}
					 functionBar={['create']} onCreate={this.handleCreate}/>
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} pagination={{
						total:this.props.notice.getIn(['otherData','totalSize']),
						onChange:(page,pageSize) => {
							this.setState({
								current:page,
								pageSize:pageSize
							})
							this.props.getNotice(page,pageSize)
						}
					}}/>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	notice:state.get('notice')
}), dispatch => ({
	getNotice:bindActionCreators(getNotice,dispatch)
}))(NoticeContainer)
