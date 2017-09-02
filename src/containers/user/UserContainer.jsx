import React from 'react'
import {Table,Input,Button,notification} from 'antd'
import TableHeader from '../../components/common/TableHeader'
import styles from './UserContainer.scss'
import EnhanceTable from '../../components/common/EnhanceTable'
import {bindActionCreators} from 'redux'
import {getStorySet} from 'actions/storySet'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import config from '../../config'

class UserContainer extends React.Component {
	
	render(){
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<TableHeader title='用户列表'
					 searchBar={[]}
					 functionBar={['create']} onCreate={this.handleCreate} onChangeSearch={(value,key) => {
						this.setState({
							[key]:value
						})
					}} onSearch={this.hanleFilterData}/>
				</div>
				<div className={styles.mainPanel}>

				</div>
			</div>
		)
	}
}

export default connect(state => ({}), dispatch => ({}))(UserContainer)
