import React from 'react'
import styles from './UserWorkPage.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import TableHeader from '../../../components/common/TableHeader'
import EnhanceTable from '../../../components/common/EnhanceTable'
import {getUserWork,getUserInfo} from 'actions/userWork'
import PropTypes from 'prop-types'
import {Link} from 'react-router'

class UserWorkPage extends React.Component {
	static contextTypes = {
		router:PropTypes.object
	}
	componentDidMount(){
		if(this.props.userWork.get('data').isEmpty()){
			this.props.getUserWork(this.props.params.id,0,10)
		}
		if(this.props.userWork.get('user').isEmpty()){
			this.props.getUserInfo(this.props.params.id)
		}
	}
	getTableData = () => {
		const columns = [{
			title:'ID',
			dataIndex:'id',
			key:'id'
		},{
			title:'故事标题',
			dataIndex:'storyTitle',
			key:'storyTitle'
		},{
			title:'点赞数',
			dataIndex:'likeCount',
			key:'likeCount'
		},{
			title:'封面',
			dataIndex:'coverUrl',
			render:(t,r) => {
				return <img src={t} style={{maxWidth:100}}/>
			}
		},{
			title:'时长',
			dataIndex:'duration',
			key:'duration'
		},{
			title:'reviewCount',
			dataIndex:'reviewCount',
			key:'reviewCount'
		},{
			title:'listenCount',
			dataIndex:'listenCount',
			key:'listenCount'
		},{
			title:'操作',
			key:'operate',
			render:(t,r) => {
				return (<Link to={`/user/${this.props.userWork.getIn(['user','info','id'])}/work/edit/${r.id}`}>编辑</Link>)
			}
		}]
		const dataSource = this.props.userWork.get('data').map((v,k) => ({
			...v.toJS(),
			key:k
		})).toJS()
		return {
			columns,
			dataSource
		}
	}
	render(){
		// const user =
		console.log(this.props.userWork.toJS())
		const {columns,dataSource} = this.getTableData()
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<TableHeader title={`${this.props.userWork.getIn(['user','info','nickname'])}用户的作品`}
					 searchBar={[]}
					 functionBar={['create']}
					 onCreate={()=>{
						 this.context.router.push(`/user/${this.props.userWork.getIn(['user','info','id'])}/work/create`)
					 }}
					 />
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} pagination={{
						total:this.props.userWork.getIn(['otherData','totalSize']),
						current:this.props.userWork.getIn(['otherData','offset'])+1,
						onChange:(page,pageSize) => {
							this.setState({
								current:page-1,
								pageSize:pageSize
							})
							this.props.getUser(page-1,pageSize)
						}
					}}/>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	userWork:state.get('userWork')
}),dispatch => ({
	getUserWork:bindActionCreators(getUserWork,dispatch),
	getUserInfo:bindActionCreators(getUserInfo,dispatch)
}))(UserWorkPage)
