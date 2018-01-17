import React from 'react'
import styles from './FeedbackTempletContainer.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import TableHeader from '../../components/common/TableHeader'
import EnhanceTable from '../../components/common/EnhanceTable'
import {getFeedbackTemplet} from 'actions/feedbackTemplet'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import {Popover,Modal,Select,Input,notification} from 'antd'
import config from '../../config'
const Option = Select.Option
const SearchInput = Input.Search

class FeedbackTempletContainer extends React.Component {
	static contextTypes = {
		router:PropTypes.object
	}
	state = {
		current:0,
		pageSize:10,
		searchUserResult:[]
	}
	componentDidMount(){
		if(this.props.feedbackTemplet.get('data').isEmpty()){
			this.props.getFeedbackTemplet(0,10)
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
			title:'操作',
			key:'operate',
			render:(t,r) => {
				return (
					<div>
						<Link to={`/feedbackTemplet/edit/${r.id}`}>编辑</Link>&nbsp;
						<a onClick={() => {
							this.selectedFeedbackTemplet = r.id
							this.setState({
								displaySendPanel:true
							})
						}}>发送</a>
					</div>
				)
			}
		}]
		const dataSource = this.props.feedbackTemplet.get('data').map((v,k) => ({
			...v.toJS(),
			key:k
		})).toJS()
		return {
			columns,
			dataSource
		}
	}
	handleSearchUser = (value) => {
		notification.info({message:'正在查询用户'})
		fetch(config.api.user.get(0,10000,value),{
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => res.json()).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}else{
				notification.success({message:'用户检索成功'})
				this.setState({
					searchUserResult: res.obj
				})
			}

		})
	}
	handleSendFeedBack = () => {
		notification.info({message:'正在发送'})
		let formData = new FormData()
		formData.append('feedbackTempletId',this.selectedFeedbackTemplet)
		formData.append('userId',this.selectedUser)
		fetch(config.api.feedbackTemplet.publish(this.selectedFeedbackTemplet,this.selectedUser),{
			method:'post',
			headers:{
				authorization:sessionStorage.getItem('auth')
			},
			body:formData
		}).then(res => res.json()).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}else{
				notification.success({message:'发送成功'})
				this.setState({
					displaySendPanel:false
				})
			}
		})
	}
	renderUserSearchResult = () => {
		return (
			<Select style={{width:100}} onSelect={(value) => {
				this.selectedUser = value
			}}>
			{this.state.searchUserResult.map((v,k) => {
				return (
					<Option value={''+v.id} key={k}>{v.nickname}</Option>
				)
			})}
			</Select>
		)
	}
	render(){
		const {columns,dataSource} = this.getTableData()
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<TableHeader title={`反馈模板`}
					 searchBar={[]}
					 functionBar={['create']}
					 onCreate={()=>{
						 this.context.router.push(`/feedbackTemplet/create`)
					 }}
					 />
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} pagination={{
						total:this.props.feedbackTemplet.getIn(['otherData','totalSize']),
						current:this.props.feedbackTemplet.getIn(['otherData','offset'])+1,
					}} onChange={(pagination,filters,sorter) => {
						this.setState({
							current:pagination.current-1,
							pageSize:pagination.pageSize,
							orderRule:sorter.order=='descend'?0:1,
							fieldName:sorter.field
						})
						this.props.getFeedbackTemplet(pagination.current-1,pagination.pageSize)
					}}/>
				</div>
				<Modal visible={this.state.displaySendPanel} title="发送反馈消息给用户"
				onOk={this.handleSendFeedBack}
				onCancel={() => this.setState({displaySendPanel:false})}
				>
					<SearchInput
					placeholder="输入用户名"
				    style={{ width: 200 }}
				    onSearch={this.handleSearchUser}/>
					{this.renderUserSearchResult()}
				</Modal>
			</div>
		)
	}
}

export default connect(state => ({
	feedbackTemplet:state.get('feedbackTemplet')
}),dispatch => ({
	getFeedbackTemplet:bindActionCreators(getFeedbackTemplet,dispatch),
}))(FeedbackTempletContainer)
