import React from 'react'
import styles from './WorksTagContainer.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import TableHeader from '../../components/common/TableHeader'
import EnhanceTable from '../../components/common/EnhanceTable'
import {getWorksTag} from 'actions/worksTag'
import PropTypes from 'prop-types'
import {Link} from 'react-router'

class WorksTagContainer extends React.Component {
	static contextTypes = {
		router:PropTypes.object
	}
	state = {
		current:0,
		pageSize:10
	}
	componentDidMount(){
		if(this.props.worksTag.get('data',[]).isEmpty()){
			this.props.getWorksTag(0,10)
		}
	}
	getTableData = () => {
		const columns = [{
			title:'ID',
			dataIndex:'id',
			key:'id'
		},{
			title:'作者ID',
			dataIndex:'authorId',
			key:'authorId'
		},{
			title:'内容',
			dataIndex:'content',
			key:'content'
		},{
			title:'图标',
			dataIndex:'iconUrl',
			key:'iconUrl',
			render:(t,r) => {
				return <img style={{width:100}} src={t} />
			}
		},{
			title:'ParentId',
			dataIndex:'parentId',
			key:'parentId'
		},{
			title:'操作',
			key:'operate',
			render:(t,r) => {
				return (
					<div>
					<Link to={`/worksTag/edit/${r.id}`}>编辑</Link>&nbsp;
					<Link to={`/worksTag/work/show/${r.id}`}>作品</Link>
					</div>
				)
			}
		}]
		const dataSource = this.props.worksTag.get('data').map((v,k) => ({
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
					<TableHeader title={`作品列表`}
					 searchBar={[]}
					 functionBar={['create']}
					 onCreate={()=>{
						 this.context.router.push(`/worksTag/create`)
					 }}
					 />
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} pagination={{
						total:this.props.worksTag.getIn(['otherData','totalSize']),
						current:this.props.worksTag.getIn(['otherData','offset'])+1,
						onChange:(page,pageSize) => {
							this.setState({
								current:page-1,
								pageSize:pageSize
							})
							this.props.getWorksTag(page-1,pageSize)
						}
					}}/>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	worksTag:state.get('worksTag')
}),dispatch => ({
	getWorksTag:bindActionCreators(getWorksTag,dispatch),
}))(WorksTagContainer)
