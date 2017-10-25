import React from 'react'
import {Table,Input,Button,notification,Popover} from 'antd'
import TableHeader from '../../components/common/TableHeader'
import styles from './StorySetContainer.scss'
import EnhanceTable from '../../components/common/EnhanceTable'
import {bindActionCreators} from 'redux'
import {getStorySet} from 'actions/storySet'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import config from '../../config'

class StorySetContainer extends React.Component {
	static contextTypes = {
		router:React.PropTypes.object
	}
	constructor(){
		super()
		this.state = {
			current:0,
			pageSize:10
		}
	}
	componentDidMount(){
		if(this.props.storySet.get('data').isEmpty()){
			this.props.getStorySet(0,10)
		}
	}
	getTableData = () => {
		const columns = [{
			title:'标题',
			dataIndex:'title',
			key:'title'
		},{
			title:'指导',
			dataIndex:'guide',
			key:'guide'
		},{
			title:'tellCount',
			dataIndex:'tellCount',
			key:'tellCount'
		},{
			title:'recommend',
			dataIndex:'recommend',
			key:'recommend'
		},{
			title:'likeCount',
			dataIndex:'likeCount',
			key:'likeCount'
		},{
			title:'操作',
			key:'operate',
			render:(t,r) => {
				return (
				<div>
					<Link to={`/storySet/edit/${r.id}`}>编辑</Link>&nbsp;
					<a onClick={!r.recommend?this.handleRecommend.bind(this,r.id):this.handleDeRecommend.bind(this,r.id)}>{r.recommend?'取消推荐':'推荐'}</a>
				</div>
				)
			}
		}]
		const dataSource = this.props.storySet.get('data').map((v,k) => ({
			...v.toJS(),
			key:k
		})).toJS()
		return {
			columns,
			dataSource
		}
	}
	handleRecommend = id => {
		fetch(config.api.storySet.recommend.add(id),{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => {
			notification.success({message:'推荐成功'})
			this.props.getStorySet(this.state.current,this.state.pageSize)
		})
	}
	handleDeRecommend = id => {
		fetch(config.api.storySet.recommend.add(id),{
			method:'delete',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => {
			notification.success({message:'取消推荐'})
			this.props.getStorySet(this.state.current,this.state.pageSize)
		})
	}
	handleCreate = () => {
		this.context.router.push('/storyset/create')
	}
	render(){
		const {columns,dataSource} = this.getTableData()
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<TableHeader title='故事集列表'
					 searchBar={[]}
					 functionBar={['create']} onCreate={this.handleCreate} onChangeSearch={(value,key) => {
						this.setState({
							[key]:value
						})
					}} onSearch={this.hanleFilterData}/>
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} pagination={{
						total:this.props.storySet.getIn(['otherData','totalSize']),
						onChange:(page,pageSize) => {
							this.setState({
								current:page-1,
								pageSize:pageSize
							})
							this.props.getStorySet(page-1,pageSize)
						}
					}}/>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	storySet:state.get('storySet')
}), dispatch => ({
	getStorySet:bindActionCreators(getStorySet,dispatch)
}))(StorySetContainer)
