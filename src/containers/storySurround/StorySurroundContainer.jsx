import React from 'react'
import {Table,Input,Button,notification,Popover} from 'antd'
import TableHeader from '../../components/common/TableHeader'
import styles from './StorySurroundContainer.scss'
import EnhanceTable from '../../components/common/EnhanceTable'
import {bindActionCreators} from 'redux'
import {getStorySet} from 'actions/storySet'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import config from '../../config'
import {getStorySurround} from 'actions/storySurround'

class StorySurroundContainer extends React.Component {
	static contextTypes = {
		router:React.PropTypes.object
	}
	componentDidMount(){
		if(this.props.storySurround.get('data').isEmpty()){
			this.props.getStorySurround(1,10)
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
			title:'图标',
			dataIndex:'icon',
			key:'icon'
		},{
			title:'obligate',
			dataIndex:'obligate',
			key:'obligate'
		},{
			title:'storyid',
			dataIndex:'storyid',
			key:'storyid'
		},{
			title:'videourl',
			dataIndex:'videourl',
			key:'videourl'
		},{
			title:'操作',
			key:'operate',
			render:(t,r) => {
				return (
				<div>
					<Link to={`/storySurround/edit/${r.id}`}>编辑</Link>
				</div>
				)
			}
		}]
		const dataSource = this.props.storySurround.get('data').map((v,k) => ({
			...v.toJS(),
			key:k
		})).toJS()
		return {
			columns,
			dataSource
		}
	}
	handleCreate = () => {
		this.context.router.push('/storySurround/create')
	}
	render(){
		const {columns,dataSource} = this.getTableData()
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<TableHeader title='故事周边列表'
					 searchBar={[]}
					 functionBar={['create']} onCreate={this.handleCreate}/>
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} pagination={{
						total:this.props.storySurround.getIn(['otherData','totalSize']),
						onChange:(page,pageSize) => {
							this.setState({
								current:page,
								pageSize:pageSize
							})
							this.props.getStorySurround(page,pageSize)
						}
					}}/>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	storySurround:state.get('storySurround')
}), dispatch => ({
	getStorySurround:bindActionCreators(getStorySurround,dispatch)
}))(StorySurroundContainer)
