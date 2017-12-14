import React from 'react'
import styles from './PushMessageContainer.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import TableHeader from '../../components/common/TableHeader'
import EnhanceTable from '../../components/common/EnhanceTable'
import {getPushMessage,publishMessage} from 'actions/pushMessage'
import PropTypes from 'prop-types'
import {Link} from 'react-router'

class PushMessageContainer extends React.Component {
	static contextTypes = {
		router:PropTypes.object
	}
	state = {
		current:0,
		pageSize:10
	}
	componentDidMount(){
		if(this.props.pushMessage.get('data',[]).isEmpty()){
			this.props.getPushMessage(0,10)
		}
	}
	getTableData = () => {
		const columns = [{
			title:'ID',
			dataIndex:'id',
			key:'id'
		},{
			title:'通知栏提示内容',
			dataIndex:'ticker',
			key:'ticker'
		},{
			title:'通知栏标题',
			dataIndex:'title',
			key:'title'
		},{
			title:'通知栏描述',
			dataIndex:'text',
			key:'text'
		},{
			title:'定时发送时间',
			dataIndex:'starttime',
			key:'starttime'
		},{
			title:'推送类型',
			dataIndex:'pushtype',
			key:'pushtype',
			render:(t,r) => {
				switch (''+t) {
					case '1':
						return '广播'
					default:
						return ''
				}
			}
		},{
			title:'推送的过期时间',
			dataIndex:'expiretime',
			key:'expiretime'
		},{
			title:'跳转地Id',
			dataIndex:'destinationid',
			key:'destinationid'
		},{
			title:'操作',
			key:'operate',
			render:(t,r) => {
				return (
					<div>
					<Link to={`/pushMessage/edit/${r.id}`}>编辑</Link>&nbsp;
					<a onClick={(e) => {
						e.preventDefault()
						console.log("Adfasdf:",r)
						this.props.publishMessage(r.id)
					}}>发布</a>
					</div>
				)
			}
		}]
		const dataSource = this.props.pushMessage.get('data').map((v,k) => ({
			...v.toJS(),
			key:k
		})).toJS()
		return {
			columns,
			dataSource
		}
	}
	render(){
		const {columns,dataSource} = this.getTableData()
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<TableHeader title={`推送消息列表`}
					 searchBar={[]}
					 functionBar={['create']}
					 onCreate={()=>{
						 this.context.router.push(`/pushMessage/create`)
					 }}
					 />
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} pagination={{
						total:this.props.pushMessage.getIn(['otherData','totalSize']),
						current:this.props.pushMessage.getIn(['otherData','offset'])+1,
						onChange:(page,pageSize) => {
							this.setState({
								current:page-1,
								pageSize:pageSize
							})
							this.props.getPushMessage(page-1,pageSize)
						}
					}}/>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	pushMessage:state.get('pushMessage')
}),dispatch => ({
	getPushMessage:bindActionCreators(getPushMessage,dispatch),
	publishMessage:bindActionCreators(publishMessage,dispatch)
}))(PushMessageContainer)
