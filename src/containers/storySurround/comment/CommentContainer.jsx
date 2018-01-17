import React from 'react'
import styles from './CommentContainer.scss'
import {connect} from 'react-redux'
import {Popover,notification,Tag} from 'antd'
import {bindActionCreators} from 'redux'
import TableHeader from '../../../components/common/TableHeader'
import EnhanceTable from '../../../components/common/EnhanceTable'
import {getComment,addJing,cancelJing,deleteComment,removeBlackHouse} from 'actions/comment'
import PropTypes from 'prop-types'
import {Link} from 'react-router'

class CommentContainer extends React.Component {
	static contextTypes = {
		router:PropTypes.object
	}
	state = {
		current:0,
		pageSize:10
	}
	componentDidMount(){
		if(this.props.comment.get('data').isEmpty()){
			this.props.getComment(0,10,{ambitusId:this.props.params.ambitusId})
		}
	}

	getTableData = () => {
		const columns = [{
			title:'ID',
			dataIndex:'id',
			key:'id'
		},{
			title:'内容',
			dataIndex:'content',
			key:'content'
		},{
			title:'图片',
			dataIndex:'picUrls',
			key:'picUrls',
			render:(t,r) => {
				let urlList = [t]
				try{
					urlList = JSON.parse(t)
				}catch(e){
					notification.error({message:'图片的URL异常'})
				}
				return this.renderPicsPanel(urlList)
			}
		},{
			title:'用户名',
			dataIndex:'userName',
			key:'userName'
		},{
			title:'用户头像',
			dataIndex:'userHeadImgUrl',
			render:(t,r) => {
				return <img src={t} style={{maxWidth:100}}/>
			}
		},{
			title:'用户ID',
			dataIndex:'userId',
			key:'userId'
		},{
			title:'likeCount',
			dataIndex:'likeCount',
			key:'likeCount'
		},{
			title:'like',
			dataIndex:'like',
			key:'like',
			render:(t,r) => {
				return ''+(t||'')
			}
		},{
			title:'state',
			dataIndex:'state',
			key:'state',
			render:(t,r) => {
				switch (''+t) {
					case '0':
						return (<Tag color='gray'>已删除</Tag>)
					case '1':
						return (<Tag color='green'>正常</Tag>)
					case '2':
						return (<Tag color='red'>敏感词</Tag>)
				}
			}
		},{
			title:'操作',
			key:'operate',
			render:(t,r) => {
				return (
					<div>
						{r.cream==1?<a onClick={() => {
							this.handleCancelJing(r.id)
						}}>取消加精</a>:<a onClick={() => {
							this.handleAddJing(r.id)
						}}>评论加精</a>}&nbsp;
						<a onClick={() => {
							this.handleRemoveBlackHouse(r.id)
						}}>移除小黑屋</a>&nbsp;
						<a onClick={() => {
							this.handleDeleteComment(r.id)
						}}>删除评论</a>&nbsp;
					</div>
				)
			}
		}]
		const dataSource = this.props.comment.get('data').map((v,k) => ({
			...v.toJS(),
			key:k
		})).toJS()
		return {
			columns,
			dataSource
		}
	}
	handleCancelJing = (id) => {
		this.props.cancelJing(id)
	}
	handleAddJing = (id) => {
		this.props.addJing(id)
	}
	handleRemoveBlackHouse = (id) => {
		this.props.removeBlackHouse(id)
	}
	handleDeleteComment = (id) => {
		this.props.deleteComment(id)
	}
	renderPicsPanel = (urlList) => {
		return (
			<ul>
			{urlList.map((v,k) => {
				return (
					<li key={k}>
					<Popover content={
						<img src={v} style={{width:100,height:100}}/>
					} title="Title">
						<a href={v}>图片{k}</a>
					</Popover>
					</li>
				)
			})}
			</ul>
		)
	}
	render(){
		const {columns,dataSource} = this.getTableData()
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<TableHeader title={`评论列表`}
					 searchBar={[]}
					 functionBar={['create']}
					 onCreate={()=>{
						 this.context.router.push(`/comment/create`)
					 }}
					 />
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} pagination={{
						total:this.props.comment.getIn(['otherData','totalSize']),
						current:this.props.comment.getIn(['otherData','offset'])+1,
						// onChange:(page,pageSize) => {
						// 	this.setState({
						// 		current:page-1,
						// 		pageSize:pageSize
						// 	})
						// 	this.props.getNativeWork(page-1,pageSize,{
						// 		orderRule:this.props.nativeWork.getIn(['otherData','orderRule']),
						// 		fieldName:this.props.nativeWork.getIn(['otherData','fieldName'])
						// 	})
						// }
					}} onChange={(pagination,filters,sorter) => {
						this.setState({
							current:pagination.current-1,
							pageSize:pagination.pageSize,
							orderRule:sorter.order=='descend'?0:1,
							fieldName:sorter.field
						})
						this.props.getComment(pagination.current-1,pagination.pageSize,{
							ambitusId:this.props.params.ambitusId
						})
					}}/>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	comment:state.get('comment')
}),dispatch => ({
	getComment:bindActionCreators(getComment,dispatch),
	addJing:bindActionCreators(addJing,dispatch),
	cancelJing:bindActionCreators(cancelJing,dispatch),
	deleteComment:bindActionCreators(deleteComment,dispatch),
	removeBlackHouse:bindActionCreators(removeBlackHouse,dispatch)
}))(CommentContainer)
