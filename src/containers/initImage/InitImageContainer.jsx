import React from 'react'
import {Table,Input,Button,notification,Popover} from 'antd'
import TableHeader from '../../components/common/TableHeader'
import styles from './InitImageContainer.scss'
import EnhanceTable from '../../components/common/EnhanceTable'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import config from '../../config'
import {getInitImage} from 'actions/initImage'

class InitImageContainer extends React.Component {
	static contextTypes = {
		router:React.PropTypes.object
	}
	constructor(){
		super()
		this.state = {
		}
	}
	componentDidMount(){
		if(this.props.initImage.get('data').isEmpty()){
			this.props.getInitImage(0,10)
		}
	}
	getTableData = () => {
		const columns = [{
			title:'ID',
			dataIndex:'id',
			key:'id'
		},{
			title:'图片名称',
			dataIndex:'imgName',
			key:'imgName',
		},{
			title:'图标',
			dataIndex:'imgUrl',
			key:'imgUrl',
			render:(t,r) => {
				return <img src={t} style={{width:100}}/>
			}
		},{
			title:'是否显示',
			dataIndex:'isshow',
			key:'isshow',
			render:(t,r) => {
				return t==1?'显示':'不显示'
			}
		},{
			title:'操作',
			key:'operate',
			render:(t,r) => {
				return (
				<div>
					<Link to={`/initImage/edit/${r.id}`}>编辑</Link>
				</div>
				)
			}
		}]
		const dataSource = this.props.initImage.get('data').map((v,k) => ({
			...v.toJS(),
			key:k
		})).toJS()
		return {
			columns,
			dataSource
		}
	}
	handleCreate = () => {
		this.context.router.push('/initImage/create')
	}
	render(){
		const {columns,dataSource} = this.getTableData()
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<TableHeader title='开屏页列表'
					 searchBar={[]}
					 functionBar={['create']} onCreate={this.handleCreate}/>
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} pagination={{
						total:this.props.initImage.getIn(['otherData','totalSize']),
						onChange:(page,pageSize) => {
							this.setState({
								current:page,
								pageSize:pageSize
							})
							this.props.getInitImage(page,pageSize)
						}
					}}/>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	initImage:state.get('initImage')
}), dispatch => ({
	getInitImage:bindActionCreators(getInitImage,dispatch)
}))(InitImageContainer)
