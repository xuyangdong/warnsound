import React from 'react'
import styles from './StoryTagContainer.scss'
import TableHeader from '../../components/common/TableHeader'
import EnhanceTable from '../../components/common/EnhanceTable'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getStoryTags} from 'actions/storyTag'

class StoryTagContainer extends React.Component {
	static contextTypes = {
		router:React.PropTypes.object
	}
	componentDidMount(){
		if(this.props.storyTags.get('data').isEmpty()){
			this.props.getStoryTags(0,10)
		}
	}
	getTableData(){
		const columns = [{
			title:'ID',
			dataIndex:'id',
			key:'id'
		},{
			title:'PARENT',
			dataIndex:'parent',
			key:'parent'
		},{
			title:'CONTENT',
			dataIndex:'content',
			key:'content'
		},{
			title:'CREATETIME',
			dataIndex:'createTime',
			key:'createtime'
		},{
			title:'UPDATETIME',
			dataIndex:'updateTime',
			key:'updateTime'
		},{
			title:'ICONURL',
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
			key:k
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
					<TableHeader title="StoryTag" functionBar={['create','refresh','search']} onCreate={this.handleCreate.bind(this)}/>
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource}/>
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
