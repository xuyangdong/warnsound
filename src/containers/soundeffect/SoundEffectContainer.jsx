import React from 'react'
import styles from './SoundEffectContainer.scss'
import TableHeader from '../../components/common/TableHeader'
import EnhanceTable from '../../components/common/EnhanceTable'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getSoundEffect} from 'actions/soundEffect'
class SoundEffectContainer extends React.Component {
	static contextTypes = {
		router:React.PropTypes.object
	}
	componentDidMount(){
		if(this.props.soundEffect.get('data').isEmpty()){
			this.props.getSoundEffect(0,10)
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
			key:'operat',
			render:(r,t) => (
				<span><a onClick={this.handleEdit.bind(this,r.id)}>编辑</a></span>
			)
		}]
		const dataSource = this.props.soundEffect.get('data').map((v,k) => ({
			...v.toJS(),
			key:k
		})).toJS()
		return {
			columns,
			dataSource
		}
	}
	handleCreate(){
		this.context.router.push('soundEffects/create')
	}
	handleEdit(id){
		this.context.router.push('soundEffects/edit/'+id)
	}
	render(){
		const {columns,dataSource} = this.getTableData()
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<TableHeader title="SoundEffects" functionBar={['create','refresh','search']} onCreate={this.handleCreate.bind(this)}/>
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource}/>
				</div>
			</div>
		)
	}
}

export default connect(state=>({
	soundEffect:state.get('soundEffect')
}),dispatch => ({
	getSoundEffect:bindActionCreators(getSoundEffect,dispatch)
}))(SoundEffectContainer)
