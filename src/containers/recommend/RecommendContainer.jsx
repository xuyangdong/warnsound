import React from 'react'
import styles from './RecommendContainer.scss'
import TableHeader from '../../components/common/TableHeader'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getRecommend} from 'actions/recommend'
import {deRecommendStory} from 'actions/story'
import {Popover,notification} from 'antd'
import EnhanceTable from '../../components/common/EnhanceTable'

class RecommendContainer extends React.Component {
	constructor(){
		super()
		this.state = {
			current:0,
			pageSize:10,
		}
	}
	componentDidMount(){
		if(this.props.recommend.get('data').isEmpty()){
			this.props.getRecommend(0,10)
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
			title:'是否为故事集',
			dataIndex:'isSet',
			key:'isSet',
			render:(t,r) => {
				console.log('=>',t)
				return (t?'是':'否')
			}
		},{
			title:'阅读指导',
			dataIndex:'guide',
			key:'guide',
			// width:300,
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
			title:'是否为草稿',
			dataIndex:'draft',
			key:'draft',
			render:(t,r) => {
				return t==1?<span style={{color:'red'}}>是</span>:'否'
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
			key:'operate',
			width:50,
			render:(t,r) => {
				return (<a onClick={this.handleDeRecommend.bind(this,r.id)}>移除</a>)
			}
		}]
		const dataSource = this.props.recommend.get('data').map((v,k) => ({
			...v.toJS(),
			key:k
		})).toJS()
		return {
			columns,
			dataSource
		}
	}
	handleDeRecommend = (id) => {
		deRecommendStory(id).then(res => {
			notification.success({message:'取消推荐'})
			this.props.getRecommend(this.state.current,this.state.pageSize)
		})
	}
	render(){
		const {columns,dataSource} = this.getTableData()
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<TableHeader title='推荐列表'
					 searchBar={[]}
					 functionBar={[]} />
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} pagination={{
						total:this.props.recommend.getIn(['otherData','totalSize']),
						onChange:(page,pageSize) => {
							this.setState({
								current:page,
								pageSize:pageSize
							})
							this.props.getRecommend(page,pageSize)
						}
					}}/>
				</div>
			</div>
		)
	}
}

export default connect(state => {
	return {
		recommend:state.get('recommend')
	}
}, dispatch => {
	return {
		getRecommend:bindActionCreators(getRecommend,dispatch)
	}
})(RecommendContainer)
