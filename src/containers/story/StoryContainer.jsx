import React from 'react'
import {Table,Input,Button} from 'antd'
import TableHeader from '../../components/common/TableHeader'
import styles from './StoryContainer.scss'
import EnhanceTable from '../../components/common/EnhanceTable'
import {getStories,searchStories} from '../../actions/story'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import qs from 'qs'
const Search = Input.Search

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
		this.handleSearch = this.handleSearch.bind(this)
		this.hanleFilterData = this.hanleFilterData.bind(this)
		this.state = {
			openCreateModal:false,
			titleS:'',
			author:'',
			press:'',
			content:'',
			tag:'',
			current:0,
			pageSize:10,
		}
	}
	componentDidMount(){
		if(this.props.stories.get('data').isEmpty()){
			this.props.getStories(0,10)
		}
	}
	getTableData(){
		const columns = [{
			title:'编号',
			dataIndex:'id',
			key:'id',
		},{
			title:'标题',
			dataIndex:'title',
			key:'title'
		},{
			title:'作者',
			dataIndex:'author',
			key:'author'
		},{
			title:'出版社',
			dataIndex:'press',
			key:'press'
		},{
			title:'阅读指导',
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
	handleSearch(query){
		this.props.searchStories()
	}
	hanleFilterData(value){
		this.props.getStories(0,10,value)
	}
	render(){
		const {columns,dataSource} = this.getTableData()
		const {titleS,author,press,content,tag} = this.state
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<TableHeader title='故事列表' functionBar={['create','refresh','search']} search={{
						titleS,
						author,
						press,
						content,
						tag
					}} onCreate={this.handleCreate} onChangeSearch={(value,key) => {
						this.setState({
							[key]:value
						})
					}} onSearch={this.hanleFilterData}/>
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} pagination={{
						total:this.props.stories.getIn(['otherData','totalSize']),
						onChange:(page,pageSize) => {
							this.setState({
								current:page,
								pageSize:pageSize
							})
							this.props.getStories(page,pageSize)
						}
					}}/>
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
