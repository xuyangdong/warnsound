import React from 'react'
import styles from './DashBoardContainer.scss'
import {Icon,Button} from 'antd'
import {Link} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {logout} from 'actions/user'

class DashBoardContainer extends React.Component {
	render(){
		return (
			<div className={styles.container}>
				<div className={styles.title}>
					欢迎来到读个小故事后台管理系统
				</div>
				<div className={styles.content}>
					<div className={styles.item}>
						<div className={styles.text}>
							<Link to='stories'>故事管理</Link>
						</div>
						<div className={styles.logo}>
							<Icon type="book" />
						</div>
					</div>
					<div className={styles.item}>
						<div className={styles.text}>
							<Link to='storytags'>标签管理</Link>
						</div>
						<div className={styles.logo}>
							<Icon type="tags" />
						</div>
					</div>
					<div className={styles.item}>
						<div className={styles.text}>
							<Link to='soundEffects'>音效管理</Link>
						</div>
						<div className={styles.logo}>
							<Icon type="notification" />
						</div>
					</div>
					<div className={styles.logOut}>
						<Button type="danger" onClick={()=>{
							this.props.logout()
						}}><Icon type="poweroff" />注销</Button>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(state => {
	return {}
},dispatch => {
	return {
		logout:bindActionCreators(logout,dispatch)
	}
})(DashBoardContainer)
