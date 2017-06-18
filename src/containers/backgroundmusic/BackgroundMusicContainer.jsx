import React from 'react'
import styles from './BackgroundMusicContainer.scss'
import TableHeader from '../../components/common/TableHeader'
import EnhanceTable from '../../components/common/EnhanceTable'
import {getBackgroundMusic} from 'actions/backgroundMusic'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class BackgroundMusicContainer extends React.Component {
	static contextTypes = {
		router:React.PropTypes.object
	}
	componentDidMount(){
		if(this.props.backgroundMusic.get('data').isEmpty()){
			this.props.getBackgroundMusic(0,10)
		}
	}
	getTableData(){
		const columns = [{
			title:'ID',
			dataIndex:'id',
			key:'id'
		},{
			title:'DESCRIPTION',
			dataIndex:'description',
			key:'description'
		},{
			title:'URL',
			dataIndex:'url',
			key:'url'
		},{
			title:'CREATETIME',
			dataIndex:'createTime',
			key:'createTime'
		},{
			title:'UPDATETIME',
			dataIndex:'updateTime',
			key:'updateTime'
		},{
			title:'VALID',
			dataIndex:'valid',
			key:'valid'
		},{
			title:'操作',
			key:'operate',
			render:(r,t) => (
				<span><a onClick={this.handleEdit.bind(this,r.id)}>编辑</a></span>
			)
		}]
		const dataSource = this.props.backgroundMusic.get('data').map((v,k) => ({
			...v.toJS(),
			key:k
		})).toJS()
		return {
			columns,
			dataSource
		}
	}
	handleCreate(){
		this.context.router.push('backgroundMusics/create')
	}
	handleEdit(id){
		this.context.router.push('backgroundMusics/edit/'+id)
	}
	render(){
		const {columns,dataSource} = this.getTableData()
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<TableHeader title='BackgroundMusic' functionBar={['create','refresh','search']} onCreate={this.handleCreate.bind(this)}/>
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} />
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	backgroundMusic:state.get('backgroundMusic')
}),dispatch => ({
	getBackgroundMusic:bindActionCreators(getBackgroundMusic,dispatch)
}))(BackgroundMusicContainer)
