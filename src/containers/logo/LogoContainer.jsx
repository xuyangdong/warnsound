import React from 'react'
import styles from './LogoContainer.scss'
import TableHeader from '../../components/common/TableHeader'
import EnhanceTable from '../../components/common/EnhanceTable'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class LogoContainer extends React.Component {
	getTableData(){
		return {
			columns:[],
			dataSource:[]
		}
	}
	render(){
		const {columns,dataSource} = this.getTableData()
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<TableHeader title='故事列表'
					 searchBar={[]}
					 functionBar={[]} search={{}}/>
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} pagination={{
						// total:this.props.stories.getIn(['otherData','totalSize']),
						// onChange:(page,pageSize) => {
						// 	this.setState({
						// 		current:page,
						// 		pageSize:pageSize
						// 	})
						// 	this.props.getStories(page,pageSize)
						// }
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

	}
}
export default connect(mapStateToProps,mapDispatchToProps)(LogoContainer)
