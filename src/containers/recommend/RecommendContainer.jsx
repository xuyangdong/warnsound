import React from 'react'
import styles from './RecommendContainer.scss'
import TableHeader from '../../components/common/TableHeader'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getRecommend} from 'actions/recommend'
import EnhanceTable from '../../components/common/EnhanceTable'

class RecommendContainer extends React.Component {
	componentDidMount(){
		if(this.props.recommend.get('data').isEmpty()){
			// this.props.getRecommend(0,10)
		}
	}
	getTableData(){

	}
	render(){
		console.log("this.props:",this.props.recommend.toJS())
		return (
			<div className={styles.containers}>
				<div className={styles.header}>
					<TableHeader title='故事列表'
					 searchBar={[]}
					 functionBar={[]} />
				</div>
				<div className={styles.mainPanel}>

				</div>
			</div>
		)
	}
}

export default connect(state => {
	return {
		recommend:state.get('recommend')
	}
}, dispatch => {
	return {
		getRecommend:bindActionCreators(getRecommend,dispatch)
	}
})(RecommendContainer)
