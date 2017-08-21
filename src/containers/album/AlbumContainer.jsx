import React from 'react'
import TableHeader from '../../components/common/TableHeader'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styles from './AlbumContainer.scss'
import EnhanceTable from '../../components/common/EnhanceTable'
import {getAlbum} from 'actions/album'
import {Link} from 'react-router'
class AlbumContainer extends React.Component {
	static contextTypes = {
		router:React.PropTypes.object
	}
	componentDidMount(){
		if(this.props.album.get('data').isEmpty()){
			this.props.getAlbum(0,10)
		}
	}
	getTableData = () => {
		const columns = [{
			title:'名称',
			dataIndex:'name',
			key:'name'
		},{
			title:'描述',
			dataIndex:'description',
			key:'description'
		},{
			title:'操作',
			key:'edit',
			render:(t,r) => {
				return (
					<Link to={`/album/edit/${r.id}`}>编辑</Link>
				)
			}
		}]
		const dataSource = this.props.album.get('data').map((v,k) => ({
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
					<TableHeader title='专辑列表'
					 searchBar={[]}
					 functionBar={['create','refresh']} onCreate={()=>{
						 this.context.router.push('/album/create')
					 }} search={{}} />
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource}/>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	album:state.get('album')
}),dispatch => ({
	getAlbum:bindActionCreators(getAlbum,dispatch)
}))(AlbumContainer)
