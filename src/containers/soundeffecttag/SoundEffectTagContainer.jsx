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
			title:'编号',
			dataIndex:'id',
			key:'id'
		},{
			title:'内容',
			dataIndex:'content',
			key:'content'
		},{
			title:'创建时间',
			dataIndex:'createTime',
			key:'createTime'
		},{
			title:'更新时间',
			dataIndex:'updateTime',
			key:'updateTime'
		},{
			title:'是否有效',
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
					<TableHeader title="音效标签" functionBar={['create']} onCreate={this.handleCreate.bind(this)}/>
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} pagination={{
						total:this.props.soundEffectTag.getIn(['otherData','totalSize']),
						onChange:(page,pageSize) => {
							this.props.getSoundEffectTag(page,pageSize)
						}
					}}/>
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
