import React from 'react'
import {Table,Input,Button,notification,Popover,Select} from 'antd'
import TableHeader from '../../components/common/TableHeader'
import styles from './StorySurroundContainer.scss'
import EnhanceTable from '../../components/common/EnhanceTable'
import {bindActionCreators} from 'redux'
import {getStorySet} from 'actions/storySet'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import config from '../../config'
import {getStorySurround} from 'actions/storySurround'
import {fromJS} from 'immutable'

const Option = Select.Option

class StorySurroundContainer extends React.Component {
	static contextTypes = {
		router:React.PropTypes.object
	}
	constructor(){
		super()
		this.state = {
			storyList:fromJS([]),
			current:0,
			pageSize:10
		}
	}
	componentDidMount(){
		if(this.props.storySurround.get('data').isEmpty()){
			this.props.getStorySurround(0,10)
		}
		fetch(config.api.story.all(0,10000),{
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => res.json()).then(res => {
			this.setState({
				storyList:fromJS(res.obj)
			})
		})
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			storyId:nextProps.storySurround.getIn(['otherData','storyId'])
		})
	}
	handleFilter = (value) => {
		this.props.getStorySurround(this.state.current,this.state.pageSize,value)
		this.setState({
			storyId:value
		})
	}
	getTableData = () => {
		const columns = [{
			title:'storyid',
			dataIndex:'storyid',
			key:'storyid',
			render:(t,r) => {
				return this.state.storyList.find(v => v.get('id')==t,{},fromJS({})).get('title')
			},
			filterDropdown:(
				<Select
				style={{width:100}}
				onSelect={this.handleFilter}
				showSearch
				optionFilterProp="children"
				filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
				>
				{this.state.storyList.map((v,k) => {
					return (<Option value={''+v.get('id')} key={k}>{v.get('title')}</Option>)
				})}
				</Select>
			)
		},{
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
			title:'videourl',
			dataIndex:'videourl',
			key:'videourl'
		},{
			title:'创建时间',
			dataIndex:'createtime',
			key:'createtime'
		},{
			title:'操作',
			key:'operate',
			render:(t,r) => {
				return (
				<div>
					<Link to={`/storySurround/edit/${r.id}`}>编辑</Link>&nbsp;
					<Link to={`/storySurround/comment/${r.id}`}>评论</Link>
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
								current:page-1,
								pageSize:pageSize
							})
							this.props.getStorySurround(page-1,pageSize,this.state.storyId)
						},
						showQuickJumper:true
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
