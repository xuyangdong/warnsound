import React from 'react'
import {Table,Input,Button,notification,Popover} from 'antd'
import TableHeader from '../../components/common/TableHeader'
import styles from './OpinionContainer.scss'
import EnhanceTable from '../../components/common/EnhanceTable'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import config from '../../config'

import {getOpinion} from 'actions/opinion'

class OpinionContainer extends React.Component {
	static contextTypes = {
		router:React.PropTypes.object
	}
	constructor(){
		super()
		this.state = {

		}
	}
	componentDidMount(){
		if(this.props.opinion.get('data').isEmpty()){
			this.props.getOpinion(0,10)
		}
	}
	getTableData = () => {
		const columns = [{
			title:'ID',
			dataIndex:'id',
			key:'id'
		},{
			title:'Model',
			dataIndex:'model',
			key:'model',
		},{
			title:'APP版本',
			dataIndex:'appVersion',
			key:'appVersion',
		},{
			title:'安卓系统版本',
			dataIndex:'androidVersion',
			key:'androidVersion',
		},{
			title:'网络环境',
			dataIndex:'networkEnvironment',
			key:'networkEnvironment',
		},{
			title:'链接',
			dataIndex:'connection',
			key:'connection',
		},{
			title:'用户ID',
			dataIndex:'userId',
			key:'userId',
		},{
			title:'用户名',
			dataIndex:'userName',
			key:'userName'
		},{
			title:'描述',
			dataIndex:'description',
			key:'description',
		},{
			title:'picUrls',
			dataIndex:'picUrls',
			key:'picUrls',
			render:(t,r) => {
				let result = []
				try{
					result = JSON.parse(t)
					return (
						<ul>
							{result.map((v,k) => {
								return <img src={v} style={{height:50}}/>
							})}
						</ul>
					)
				}catch(e){
					return t
				}
			}
		},{
			title:'opinionType',
			dataIndex:'opinionType',
			key:'opinionType',
		}]
		const dataSource = this.props.opinion.get('data').map((v,k) => ({
			...v.toJS(),
			key:k
		})).toJS()
		return {
			columns,
			dataSource
		}
	}
	handleCreate = () => {
		this.context.router.push('/opinion/create')
	}
	render(){
		const {columns,dataSource} = this.getTableData()
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<TableHeader title='反馈列表'
					 searchBar={[]}
					 functionBar={[]} onCreate={this.handleCreate}/>
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} pagination={{
						total:this.props.opinion.getIn(['otherData','totalSize']),
						current:this.props.opinion.getIn(['otherData','offset'])+1,
						onChange:(page,pageSize) => {
							this.setState({
								current:page-1,
								pageSize:pageSize
							})
							this.props.getOpinion(page-1,pageSize)
						}
					}}/>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	opinion:state.get('opinion')
}), dispatch => ({
	getOpinion:bindActionCreators(getOpinion,dispatch)
}))(OpinionContainer)
