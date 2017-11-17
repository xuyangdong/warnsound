import React from 'react'
import {Table,Input,Button,notification,Popover} from 'antd'
import TableHeader from '../../components/common/TableHeader'
import styles from './IconContainer.scss'
import EnhanceTable from '../../components/common/EnhanceTable'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import config from '../../config'
import {getIcon,deleteIcon} from 'actions/icon'

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
		if(this.props.icon.get('data').isEmpty()){
			this.props.getIcon(0,10)
		}
	}
	getTableData = () => {
		const columns = [{
			title:'id',
			dataIndex:'id',
			key:'id'
		},{
			title:'名称',
			dataIndex:'name',
			key:'name'
		},{
			title:'描述',
			dataIndex:'description',
			key:'description',
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
			title:'资源',
			dataIndex:'url',
			key:'url',
			render:(t,r) => {
				switch (r.resourceType) {
					case 'ICON':
						console.log("asdfasdfsa",t)
						return <img style={{height:100}} src={t}/>
					case 'AUDIO':
						return <audio src={t}></audio>
					case 'VIDEO':
						return <video style={{height:100}} src={t}></video>
					default:
						return t
				}
			}
		},{
			title:'操作',
			key:'operate',
			render:(t,r) => {
				return (
				<div>
					<a onClick={() => {
						this.props.deleteIcon(r.id)
					}}>删除</a>
				</div>
				)
			}
		}]
		const dataSource = this.props.icon.get('data').map((v,k) => ({
			...v.toJS(),
			key:k
		})).toJS()
		return {
			columns,
			dataSource
		}
	}
	handleCreate = () => {
		this.context.router.push('/icon/create')
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
						total:this.props.icon.getIn(['otherData','totalSize']),
						onChange:(page,pageSize) => {
							this.setState({
								current:page,
								pageSize:pageSize
							})
							this.props.getIcon(page,pageSize)
						}
					}}/>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	icon:state.get('icon')
}), dispatch => ({
	getIcon:bindActionCreators(getIcon,dispatch),
	deleteIcon:bindActionCreators(deleteIcon,dispatch)
}))(StoryTopicContainer)
