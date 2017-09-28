import React from 'react'
import {Table,Input,Button,notification,Popover} from 'antd'
import TableHeader from '../../components/common/TableHeader'
import styles from './ReadPlanContainer.scss'
import EnhanceTable from '../../components/common/EnhanceTable'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import config from '../../config'
import {getReadPlan} from 'actions/readPlan'
import AddStoryModal from '../../components/readPlan/AddStoryModal'

class ReadPlanContainer extends React.Component {
	static contextTypes = {
		router:React.PropTypes.object
	}
	constructor(){
		super()
		this.state ={
			openAddStoryModal:false
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
			title:'封面',
			dataIndex:'coverurl',
			key:'coverurl'
		},{
			title:'年龄段',
			dataIndex:'agegroup',
			key:'agegroup'
		},{
			title:'时间点',
			dataIndex:'timepoint',
			key:'timepoint'
		},{
			title:'添加故事',
			key:'addStory',
			render:(t,r) => {
				return <a onClick={(e) => {
					e.preventDefault()
					this.setState({
						openAddStoryModal:true
					})
					this._choosenPlan = r.id
				}}>添加故事</a>
			}
		},{
			title:'操作',
			key:'operate',
			render:(t,r) => {
				return (<Link to={`/readPlan/edit/${r.id}`}>编辑</Link>)
			}
		}]
		const dataSource = this.props.readPlan.get('data').map((v,k) => ({
			...v.toJS(),
			key:k
		})).toJS()
		return {
			columns,
			dataSource
		}
	}
	componentDidMount(){
		if(this.props.readPlan.get('data').isEmpty()){
			this.props.getReadPlan(1,10)
		}
	}
	handleCreate = () => {
		this.context.router.push('/readplan/create')
	}
	render(){
		const {columns,dataSource} = this.getTableData()
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<TableHeader title='阅读计划列表'
					 searchBar={[]}
					 functionBar={['create']} onCreate={this.handleCreate}/>
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} pagination={{
						total:this.props.readPlan.getIn(['otherData','totalSize']),
						onChange:(page,pageSize) => {
							this.setState({
								current:page,
								pageSize:pageSize
							})
							this.props.getReadPlan(page,pageSize)
						}
					}}/>
				</div>
				<AddStoryModal visible={this.state.openAddStoryModal} planId={this._choosenPlan}
				onCancel={()=>{
					this.setState({
						openAddStoryModal:false
					})
				}}
				/>
			</div>
		)
	}
}

export default connect(state => ({
	readPlan:state.get('readPlan')
}),dispatch => ({
	getReadPlan:bindActionCreators(getReadPlan,dispatch)
}))(ReadPlanContainer)
