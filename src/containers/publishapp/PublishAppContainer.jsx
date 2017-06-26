import React from 'react'
import TableHeader from '../../components/common/TableHeader'
import styles from './PublishAppContainer.scss'
import EnhanceTable from '../../components/common/EnhanceTable'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import {getAppList} from 'actions/app'

class PublishAppContainer extends React.Component {
	static contextTypes = {
		router:PropTypes.object
	}
	componentDidMount(){
		if(this.props.app.get('data').isEmpty()){
			this.props.getAppList(0,10)
		}
	}
	getTableData = () => {
		const columns = [{
			title:'编号',
			dataIndex:'id',
			key:'id'
		},{
			title:'版本',
			dataIndex:'version',
			key:'version'
		},{
			title:'更新提示',
			dataIndex:'updateHint',
			key:'updateHint'
		},{
			title:'文件大小',
			dataIndex:'fileSize',
			key:'fileSize'
		},{
			title:'下载地址',
			dataIndex:'url',
			key:'url'
		},{
			title:'创建时间',
			dataIndex:'createTime',
			key:'createTime'
		},{
			title:'更新时间',
			dataIndex:'updateTime',
			key:'updateTime'
		}]
		const dataSource = this.props.app.get('data').map((v,k) => ({
			...v.toJS(),
			key:k
		})).toJS()

		return {
			columns,
			dataSource
		}
	}
	render(){
		const {columns, dataSource} = this.getTableData(0)
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<TableHeader title='APP管理' functionBar={['create']} onCreate={() => {
						this.context.router.push('/publishapp/create')
					}}/>
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} />
				</div>
			</div>
		)
	}
}

export default connect(state => {
	return {
		app:state.get('app')
	}
}, dispatch => {
	return {
		getAppList:bindActionCreators(getAppList,dispatch)
	}
})(PublishAppContainer)
