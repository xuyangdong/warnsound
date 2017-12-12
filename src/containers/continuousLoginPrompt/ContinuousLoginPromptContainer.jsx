import React from 'react'
import styles from './ContinuousLoginPromptContainer.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import TableHeader from '../../components/common/TableHeader'
import EnhanceTable from '../../components/common/EnhanceTable'
import {getContinuousLoginPrompt} from 'actions/continuousLoginPrompt'
import PropTypes from 'prop-types'
import {Link} from 'react-router'

class ContinuousLoginPromptContainer extends React.Component {
	static contextTypes = {
		router:PropTypes.object
	}
	state = {
		current:0,
		pageSize:10
	}
	componentDidMount(){
		if(this.props.continuousLoginPrompt.get('data').isEmpty()){
			this.props.getContinuousLoginPrompt(0,10)
		}
	}
	getTableData = () => {
		const columns = [{
			title:'ID',
			dataIndex:'id',
			key:'id'
		},{
			title:'提示语',
			dataIndex:'prompt',
			key:'prompt'
		},{
			title:'开始时间',
			dataIndex:'promptStartTime',
			key:'promptStartTime'
		},{
			title:'结束时间',
			dataIndex:'promptEndTime',
			key:'promptEndTime'
		},{
			title:'操作',
			key:'operate',
			render:(t,r) => {
				return (<Link to={`/continuousLoginPrompt/edit/${r.id}`}>编辑</Link>)
			}
		}]
		const dataSource = this.props.continuousLoginPrompt.get('data').map((v,k) => ({
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
					<TableHeader title={`连续登陆提示语`}
					 searchBar={[]}
					 functionBar={['create']}
					 onCreate={()=>{
						 this.context.router.push(`/continuousLoginPrompt/create`)
					 }}
					 />
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} pagination={{
						total:this.props.continuousLoginPrompt.getIn(['otherData','totalSize']),
						current:this.props.continuousLoginPrompt.getIn(['otherData','offset'])+1,
						onChange:(page,pageSize) => {
							this.setState({
								current:page-1,
								pageSize:pageSize
							})
							this.props.getContinuousLoginPrompt(page-1,pageSize)
						}
					}}/>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	continuousLoginPrompt:state.get('continuousLoginPrompt')
}),dispatch => ({
	getContinuousLoginPrompt:bindActionCreators(getContinuousLoginPrompt,dispatch),
}))(ContinuousLoginPromptContainer)
