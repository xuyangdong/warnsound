import React from 'react'
import TableHeader from '../../components/common/TableHeader'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styles from './IndividualityContainer.scss'
import EnhanceTable from '../../components/common/EnhanceTable'
import {getIndividuality} from 'actions/individual'
import {Link} from 'react-router'

class IndividualityContainer extends React.Component {
	static contextTypes = {
		router:React.PropTypes.object
	}
	componentDidMount(){
		if(this.props.individuality.get('data').isEmpty()){
			this.props.getIndividuality(0,10)
		}
	}
	getTableData = () => {
		const columns = [{
			title:'名称',
			dataIndex:'name',
			key:'name'
		},{
			title:'ICON',
			dataIndex:'pic',
			render:(t,r) => {
				if(t){
					return <img src={t} style={{maxHeight:100}}/>
				}
			}
		},{
			title:'操作',
			render:(t,r) => {
				return (<Link to={`/individuality/edit/${r.id}`}>编辑</Link>)
			}
		}]
		const dataSource = this.props.individuality.get('data').map((v,k) => ({
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
					<TableHeader title='问题列表'
					 searchBar={[]}
					 functionBar={['create','refresh']} onCreate={()=>{
						 this.context.router.push('/individuality/create')
					 }} search={{}} />
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource}
					pagination={{
						total:this.props.individuality.getIn(['otherData','totalSize']),
						// current:this.props.individuality.getIn(['otherData','offset']),
						onChange:(page,pageSize) => {
							this.setState({
								current:page,
								pageSize:pageSize
							})
							this.props.getIndividuality(page-1,pageSize,this._condition)
						}
					}}
					/>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	individuality:state.get('individuality')
}),dispatch => ({
	getIndividuality:bindActionCreators(getIndividuality,dispatch)
}))(IndividualityContainer)
