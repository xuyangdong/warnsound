import React from 'react'
import styles from './RewardGoldPromptContainer.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import TableHeader from '../../components/common/TableHeader'
import EnhanceTable from '../../components/common/EnhanceTable'
import {getRewardGoldPrompt} from 'actions/rewardGoldPrompt'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import {Popover,Modal,Select,Input,notification} from 'antd'
import config from '../../config'
const Option = Select.Option
const SearchInput = Input.Search

class RewardGoldPromptContainer extends React.Component {
	static contextTypes = {
		router:PropTypes.object
	}
	state = {
		current:0,
		pageSize:10,
		searchUserResult:[]
	}
	componentDidMount(){
		if(this.props.rewardGoldPrompt.get('data').isEmpty()){
			this.props.getRewardGoldPrompt(0,10)
		}

	}
	getTableData = () => {
		const columns = [{
			title:'ID',
			dataIndex:'id',
			key:'id'
		},{
			title:'类型',
			dataIndex:'type',
			key:'type'
		},{
			title:'提示语',
			dataIndex:'prompt',
			key:'prompt'
		},{
			title:'操作',
			key:'operate',
			render:(t,r) => {
				return (
					<div>
						<Link to={`/rewardGoldPrompt/edit/${r.id}`}>编辑</Link>
					</div>
				)
			}
		}]
		const dataSource = this.props.rewardGoldPrompt.get('data').map((v,k) => ({
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
					<TableHeader title={`金币奖励提示语`}
					 searchBar={[]}
					 functionBar={['create']}
					 onCreate={()=>{
						 this.context.router.push(`/rewardGoldPrompt/create`)
					 }}
					 />
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} pagination={{
						total:this.props.rewardGoldPrompt.getIn(['otherData','totalSize']),
						current:this.props.rewardGoldPrompt.getIn(['otherData','offset'])+1,
					}} onChange={(pagination,filters,sorter) => {
						this.setState({
							current:pagination.current-1,
							pageSize:pagination.pageSize
						})
						this.props.getRewardGoldPrompt(pagination.current-1,pagination.pageSize)
					}}/>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	rewardGoldPrompt:state.get('rewardGoldPrompt')
}),dispatch => ({
	getRewardGoldPrompt:bindActionCreators(getRewardGoldPrompt,dispatch),
}))(RewardGoldPromptContainer)
