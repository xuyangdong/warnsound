import React from 'react'
import {Table,Input,Button,notification,Popover} from 'antd'
import TableHeader from '../../components/common/TableHeader'
import styles from './StoryTopicContainer.scss'
import EnhanceTable from '../../components/common/EnhanceTable'
import {bindActionCreators} from 'redux'
import {getStorySet} from 'actions/storySet'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import config from '../../config'
import {getStoryTopic,topStoryTopic} from 'actions/storyTopic'
import AddStoryModal from '../../components/storyTopic/AddStoryModal'

class StoryTopicContainer extends React.Component {
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
		if(this.props.storyTopic.get('data').isEmpty()){
			this.props.getStoryTopic(1,10)
		}
	}
	getTableData = () => {
		const columns = [{
			title:'id',
			dataIndex:'id',
			key:'id'
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
			dataIndex:'coverurl',
			key:'coverurl'
		},{
			title:'是否显示',
			dataIndex:'isshow',
			key:'isshow',
			render:(t,r) => {
				return t==1?'显示':'不显示'
			}
		},{
			title:'置顶',
			key:'top',
			render:(t,r) => {
				return (<a onClick={() => {
					this.props.topStoryTopic(r.id)
				}}>置顶</a>)
			}
		},{
			title:'添加故事',
			key:'addStory',
			render:(t,r) => {
				return (<a onClick={(e) => {
					e.preventDefault()
					this.setState({
						openAddStoryModal:true
					})
					this._choosenStoryTopic = r.id
				}}>添加故事</a>)
			}
		},{
			title:'操作',
			key:'operate',
			render:(t,r) => {
				return (
				<div>
					<Link to={`/storyTopic/edit/${r.id}`}>编辑</Link>
				</div>
				)
			}
		}]
		const dataSource = this.props.storyTopic.get('data').map((v,k) => ({
			...v.toJS(),
			key:k
		})).toJS()
		return {
			columns,
			dataSource
		}
	}
	handleCreate = () => {
		this.context.router.push('/storyTopic/create')
	}
	render(){
		const {columns,dataSource} = this.getTableData()
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<TableHeader title='故事专题列表'
					 searchBar={[]}
					 functionBar={['create']} onCreate={this.handleCreate}/>
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} pagination={{
						total:this.props.storyTopic.getIn(['otherData','totalSize']),
						onChange:(page,pageSize) => {
							this.setState({
								current:page,
								pageSize:pageSize
							})
							this.props.getStoryTopic(page,pageSize)
						},
						showQuickJumper:true
					}}/>
				</div>
				{this.state.openAddStoryModal?<AddStoryModal visible={this.state.openAddStoryModal} storyTopicId={this._choosenStoryTopic}
				onCancel={()=>{
					this.setState({
						openAddStoryModal:false
					})
				}}
				/>:null}
			</div>
		)
	}
}

export default connect(state => ({
	storyTopic:state.get('storyTopic')
}), dispatch => ({
	getStoryTopic:bindActionCreators(getStoryTopic,dispatch),
	topStoryTopic:bindActionCreators(topStoryTopic,dispatch)
}))(StoryTopicContainer)
