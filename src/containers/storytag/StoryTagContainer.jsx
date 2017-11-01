import React from 'react'
import styles from './StoryTagContainer.scss'
import TableHeader from '../../components/common/TableHeader'
import EnhanceTable from '../../components/common/EnhanceTable'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getStoryTags} from 'actions/storyTag'
import {Popover} from 'antd'
import {fromJS} from 'immutable'
import {Button} from 'antd'
import config from '../../config'
import DisplayHotSearchModal from '../../components/storyTag/DisplayHotSearchModal'

class PopContent extends React.Component {
	constructor(){
		super()
		this.state ={
			storyTagInfo:fromJS({}),
		}
	}
	componentDidMount(){
		const {id} = this.props
		fetch(config.api.storyTag.query(id),{
			headers: {
				'authorization': sessionStorage.getItem('auth')
			},
		}).then(res => res.json()).then(res => {
			this.setState({
				storyTagInfo:fromJS(res)
			})
		})
	}
	render(){
		return (
			<div className={styles.popContent}>
				<span>编号:{this.state.storyTagInfo.get('id')}</span>
				<span>内容:{this.state.storyTagInfo.get('content')}</span>
				<span>创建时间:{this.state.storyTagInfo.get('createTime')}</span>
				<span>更新时间:{this.state.storyTagInfo.get('updateTime')}</span>
				<span>图标:{this.state.storyTagInfo.get('iconURL')}</span>
			</div>
		)
	}
}

class StoryTagContainer extends React.Component {
	static contextTypes = {
		router:React.PropTypes.object
	}
	state = {
		displayHotSearchModal:false,
		hotTagList:fromJS([])
	}
	componentDidMount(){
		if(this.props.storyTags.get('data').isEmpty()){
			this.props.getStoryTags(0,10)
		}
		// fetch(config.api.storyTag.hotTag.get(0,100000),{
		// 	headers:{
		// 		'authorization':sessionStorage.getItem('auth')
		// 	}
		// }).then(res => res.json()).then(res => {
		// 	this.setState({
		// 		hotTagList:fromJS(res.obj.map(v => v.id))
		// 	})
		// })
	}
	getTableData(){
		const columns = [{
			title:'编号',
			dataIndex:'id',
			key:'id'
		},{
			title:'父级标签',
			dataIndex:'parentId',
			key:'parentId',
			render:(t,r) => {
				return (
				<Popover content={<PopContent id={t}/>}>
					<a>{t}</a>
				</Popover>
				)
			}
		},{
			title:'内容',
			dataIndex:'content',
			key:'content'
		},{
			title:'创建时间',
			dataIndex:'createTime',
			key:'createtime'
		},{
			title:'更新时间',
			dataIndex:'updateTime',
			key:'updateTime'
		},{
			title:'图标',
			dataIndex:'iconURL',
			key:'iconURL'
		},{
			title:'操作',
			key:'operate',
			render:(r,t) => (
				<span><a onClick={this.handleEdit.bind(this,r.id)}>编辑</a></span>
			)
		}]
		const dataSource = this.props.storyTags.get('data').map((v,k) => ({
			...v.toJS(),
			key:v.get('id')
		})).toJS()
		return {
			columns,
			dataSource
		}
	}
	handleCreate(){
		this.context.router.push('storyTags/create')
	}
	handleEdit(id){
		this.context.router.push('storyTags/edit/'+id)
	}
	render(){
		const {columns,dataSource} = this.getTableData()
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<TableHeader title="故事标签" functionBar={['create']} onCreate={this.handleCreate.bind(this)}/>
				</div>
				<div className={styles.mainPanel}>
					<Button onClick={() => {
						this.setState({
							displayHotSearchModal:true
						})
					}} type='primary'>创建热搜标签</Button>
					<EnhanceTable
					rowSelection={{
						selectedRowKeys:this.state.hotTagList.toJS(),
						onChange:(selectedRowKeys, selectedRows) => {
							this.setState({
								hotTagList:fromJS(selectedRowKeys)
							})
						}
					}}
					columns={columns} dataSource={dataSource} pagination={{
						total:this.props.storyTags.getIn(['otherData','totalSize']),
						onChange:(page,pageSize) => {
							this.props.getStoryTags(page,pageSize)
						}
					}}/>
					{this.state.displayHotSearchModal?<DisplayHotSearchModal hotTagList={this.state.hotTagList} onCancel={()=>{
						this.setState({
							displayHotSearchModal:false
						})
					}}
					onChange={(hotTagList)=>{
						this.setState({
							hotTagList:hotTagList
						})
					}}
					/>:null}
				</div>
			</div>
		)
	}
}
function mapStateToProps(state){
	return {
		storyTags:state.get('storyTag')
	}
}
function mapDispatchToProps(dispatch){
	return {
		getStoryTags:bindActionCreators(getStoryTags,dispatch)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(StoryTagContainer)
