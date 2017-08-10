import React from 'react'
import styles from './LogoContainer.scss'
import TableHeader from '../../components/common/TableHeader'
import EnhanceTable from '../../components/common/EnhanceTable'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { getLogo } from  'actions/logo'
import {Link} from 'react-router'

class LogoContainer extends React.Component {
	static contextTypes = {
		router:React.PropTypes.object
	}
	componentDidMount(){
		if(this.props.logo.get('data').isEmpty()){
			this.props.getLogo(0,10)
		}
	}
	getTableData(){
		const columns = [{
			title:'ID',
			dataIndex:'id',
			key:'id'
		},{
			title:'名称',
			dataIndex:'name',
			key:'name'
		},{
			title:'描述',
			dataIndex:'description',
			key:'description'
		},{
			title:'拓展',
			dataIndex:'extra',
			key:'extra'
		},{
			title:'详情',
			key:'detail',
			render:(t,r) => {
				return (<Link to={`/logo/detail/${r.id}`}>查看</Link>)
			}
		},{
			title:'操作',
			key:'operate',
			render:(t,r) => {
				return (<Link to={`/logo/edit/${r.id}`}>编辑</Link>)
			}
		}]
		const dataSource = this.props.logo.get('data').map((v,k) => ({
			...v.toJS(),
			key:k
		})).toJS()
		return {
			columns,
			dataSource
		}
	}
	handleCreate = () => {
		this.context.router.push('/logo/create')
	}
	render(){
		const {columns,dataSource} = this.getTableData()
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<TableHeader title='徽章列表'
					 searchBar={[]}
					 functionBar={['create']}
					 onCreate={this.handleCreate}
					 search={{}}/>
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} pagination={{
						total:this.props.logo.getIn(['otherData','totalSize']),
						onChange:(page,pageSize) => {
							// this.setState({
							// 	current:page,
							// 	pageSize:pageSize
							// })
							this.props.getLogo(page,pageSize)
						}
					}}/>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		logo: state.get('logo')
	}
}
function mapDispatchToProps(dispatch){
	return {
		getLogo: bindActionCreators(getLogo,dispatch)
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(LogoContainer)
