import React from 'react'
import {Table,Input,Button,notification,Popover,TreeSelect} from 'antd'
import TableHeader from '../../components/common/TableHeader'
import styles from './StoryContainer.scss'
import EnhanceTable from '../../components/common/EnhanceTable'
import {getStories,searchStories,recommendStory,deRecommendStory} from '../../actions/story'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import qs from 'qs'
import {fromJS} from 'immutable'
import config from '../../config'
import {getAllStorySet} from 'actions/storySet'
import _ from 'lodash'
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

			storySetList:fromJS([]),
			storyTagTree:[]
		}
	}
	componentDidMount(){
		if(this.props.stories.get('data').isEmpty()){
			this.props.getStories(0,10)
		}
		getAllStorySet(0,10000,'').then(res => {
			this.setState({
				storySetList:fromJS(res.obj)
			})
		})
		fetch(config.api.storyTag.get(0,100000),{
			headers:{
				authorization:sessionStorage.getItem('auth')
			}
		}).then(res => res.json()).then(res => {
			let treeData = res.obj.filter(v => v.parentId == 0).map(v => ({
				value:''+v.id,
				key:''+v.id,
				label:v.content,
				otherData:v
			}))
			treeData = treeData.map(v => ({
				...v,
				children:res.obj.filter(t => t.parentId == v.value).map(t => ({
					value:''+t.id,
					key:''+t.id,
					label:t.content,
					otherData:t
				}))
			}))
			this.setState({
				storyTagTree:_.concat([{
					value:'',
					key:'-1',
					label:'所有标签'
				}],treeData)
			})
		})
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
			key:'guide',
			// width:300,
			render:(t,r) => {
				if(!t){
					t = ''
				}
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
			title:'是否为草稿',
			dataIndex:'draft',
			key:'draft',
			render:(t,r) => {
				return t==1?<span style={{color:'red'}}>是</span>:'否'
			}
		},{
			title:'所属故事集',
			key:'storySet',
			dataIndex:'setId',
			render:(t,r) => {
				return (<span>{this.state.storySetList.find(v => v.get('id')==t,{},fromJS({})).get('title')||'暂无故事集'}</span>)
			}
		},{
			title:'编辑状态',
			key:'editingState',
			width:100,
			render:(t,r) => {
				let editingState = ""
				if(!r.content){
					editingState = editingState + "无内容,\n"
				}else if(!r.guide){
					editingState = editingState + "无阅读指导,\n"
				}else if(!r.readGuide){
					editingState = editingState + "无朗读指导"
				}
				return editingState
			}
		},{
			title:'操作',
			key:'operat',
			render:(r,t) => (
				<span>
					<a onClick={this.handleEdit.bind(this,r.id)}>编辑</a>&nbsp;
					<a onClick={!r.recommend?this.handleRecommend.bind(this,r.id):this.handleDeRecommend.bind(this,r.id)}>{r.recommend?'取消推荐':'推荐'}</a>&nbsp;
					<a onClick={() => {
						this.context.router.push(`/stories/work/show/${r.id}`)
					}}>作品</a>&nbsp;
					<a onClick={()=>{
						fetch(config.api.story.default(r.id),{
							headers:{
								'authorization':sessionStorage.getItem('auth')
							}
						}).then(res => res.json()).then(res => {
							if(res.status == 2){
								notification.error({message:'设为默认故事失败'})
							}else{
								notification.success({message:'成功设为默认故事'})
							}

							// this.props.getStories(this.state.current,this.state.pageSize)
						})
					}}>设为默认</a>
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
		this._condition = value
		this.props.getStories(0,10,value)
	}
	handleRecommend = (id) => {
		recommendStory(id).then(res => {
			notification.success({message:'推荐成功'})
			this.props.getStories(this.state.current,this.state.pageSize)
		})
	}
	handleDeRecommend = (id) => {
		deRecommendStory(id).then(res => {
			notification.success({message:'取消推荐'})
			this.props.getStories(this.state.current,this.state.pageSize)
		})
	}
	handleChangeSearchCondition = (key,value) => {
		if(!!value.target){
			this.setState({
				[key]:value.target.value
			})
		}else{
			this.setState({
				[key]:value
			})
		}

	}
	render(){
		const {columns,dataSource} = this.getTableData()
		const {titleS,author,press,content,tag} = this.state
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<TableHeader title='故事列表'
					 functionBar={['create','refresh','search']}
					 onCreate={this.handleCreate}
					 onRefresh={() => {
						 this.setState({
							 titleS:'',
							 author:'',
							 press:'',
							 content:'',
							 tag:''
						 })
					 }}>
					<Input
						style={{width:150}}
						addonBefore='标题'
						value={titleS}
						onPressEnter={this.hanleFilterData.bind(this,{
							title:this.state.titleS,
							author:this.state.author,
							press:this.state.press,
							content:this.state.content,
							tag:this.state.tag
						})}
						onChange={this.handleChangeSearchCondition.bind(this,'titleS')}/>
					<Input
						style={{width:150}}
						addonBefore='作者'
						value={author}
						onPressEnter={this.hanleFilterData.bind(this,{
							title:this.state.titleS,
							author:this.state.author,
							press:this.state.press,
							content:this.state.content,
							tag:this.state.tag
						})}
						onChange={this.handleChangeSearchCondition.bind(this,'author')}/>
					<Input
						style={{width:150}}
						addonBefore='出版社'
						value={press}
						onPressEnter={this.hanleFilterData.bind(this,{
							title:this.state.titleS,
							author:this.state.author,
							press:this.state.press,
							content:this.state.content,
							tag:this.state.tag
						})}
						onChange={this.handleChangeSearchCondition.bind(this,'press')}/>
					<Input
						style={{width:150}}
						addonBefore='内容'
						value={content}
						onPressEnter={this.hanleFilterData.bind(this,{
							title:this.state.titleS,
							author:this.state.author,
							press:this.state.press,
							content:this.state.content,
							tag:this.state.tag
						})}
						onChange={this.handleChangeSearchCondition.bind(this,'content')}/>
					<TreeSelect
						style={{width:200}}
						dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
						value={tag}
						treeData={this.state.storyTagTree}
						placeholder="故事标签"
						onChange={this.handleChangeSearchCondition.bind(this,'tag')}
					/>
					<Button onClick={this.hanleFilterData.bind(this,{
						title:this.state.titleS,
						author:this.state.author,
						press:this.state.press,
						content:this.state.content,
						tag:this.state.tag
					})}>查询</Button>
					</TableHeader>
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} pagination={{
						total:this.props.stories.getIn(['otherData','totalSize']),
						current:this.props.stories.getIn(['otherData','offset']),
						onChange:(page,pageSize) => {
							this.setState({
								current:page,
								pageSize:pageSize
							})
							this.props.getStories(page,pageSize,this._condition)
						},
						showQuickJumper:true
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
