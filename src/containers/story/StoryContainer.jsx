import React from 'react'
import {Table} from 'antd'
import TableHeader from '../../components/common/TableHeader'
import styles from './StoryContainer.scss'
import EnhanceTable from '../../components/common/EnhanceTable'
import {getStories} from '../../actions/story'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class StoryContainer extends React.Component{
	static contextTypes = {
		router:React.PropTypes.object
	}
	static defaultProps = {

	}
	constructor(){
		super()
		this.getTableData = this.getTableData.bind(this)
		this.handleCreate = this.handleCreate.bind(this)
		this.state = {
			openCreateModal:false
		}
	}
	componentDidMount(){
		if(this.props.stories.get('data').isEmpty()){
			this.props.getStories(0,10)
		}
	}
	getTableData(){
		const columns = [{
			title:'ID',
			dataIndex:'id',
			key:'id'
		},{
			title:'Title',
			dataIndex:'title',
			key:'title'
		},{
			title:'AUTHOR',
			dataIndex:'author',
			key:'author'
		},{
			title:'press',
			dataIndex:'press',
			key:'press'
		},{
			title:'guide',
			dataIndex:'guide',
			key:'guide'
		},{
			title:'操作',
			key:'operat',
			render:(r,t) => (
				<span>
					<a onClick={this.handleEdit.bind(this,r.id)}>编辑</a>
				</span>
			)
		}]
		const dataSource = this.props.stories.get('data').map((v,k) => ({
			...v.toJS(),
			key:k
		})).toJS()
		return {
			columns,
			dataSource
		}
	}
	handleCreate(){
		this.context.router.push('/stories/create')
	}
	handleEdit(id){
		this.context.router.push('stories/edit/'+id)
	}
	render(){
		const {columns,dataSource} = this.getTableData()
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<TableHeader title='Stories列表' functionBar={['create','refresh','search']} onCreate={this.handleCreate}/>
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} />
				</div>
			</div>
		)
	}
}
function mapStateToProps(state){
	return {
		stories: state.get('story')
	}
}
function mapDispatchToProps(dispatch){
	return {
		getStories:bindActionCreators(getStories,dispatch)
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(StoryContainer)
