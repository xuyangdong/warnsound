import React from 'react'
import styles from './SoundEffectTagContainer.scss'
import TableHeader from '../../components/common/TableHeader'
import EnhanceTable from '../../components/common/EnhanceTable'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getSoundEffectTag} from 'actions/soundEffectTag'
class SoundEffectTagContainer extends React.Component {
	static contextTypes = {
		router:React.PropTypes.object
	}
	componentDidMount(){
		if(this.props.soundEffectTag.get('data').isEmpty()){
			this.props.getSoundEffectTag(0,10)
		}
	}
	getTableData(){
		const columns = [{
			title:'ID',
			dataIndex:'id',
			key:'id'
		},{
			title:'CONTENT',
			dataIndex:'content',
			key:'content'
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
		const dataSource = this.props.soundEffectTag.get('data').map((v,k) => ({
			...v.toJS(),
			key:k
		})).toJS()
		return {
			columns,
			dataSource
		}
	}
	handleCreate(){
		this.context.router.push('soundEffectTags/create')
	}
	handleEdit(id){
		this.context.router.push('soundEffectTags/edit/'+id)
	}
	render(){
		const {columns,dataSource} = this.getTableData()
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<TableHeader title="SoundEffectTags" functionBar={['create','refresh','search']} onCreate={this.handleCreate.bind(this)}/>
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource}/>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	soundEffectTag:state.get('soundEffectTag')
}),dispatch => ({
	getSoundEffectTag:bindActionCreators(getSoundEffectTag,dispatch)
}))(SoundEffectTagContainer)
