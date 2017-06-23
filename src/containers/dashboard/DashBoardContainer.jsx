import React from 'react'
import styles from './DashBoardContainer.scss'
import {Icon} from 'antd'
import {Link} from 'react-router'

export default class DashBoardContainer extends React.Component {
	render(){
		return (
			<div className={styles.container}>
				<div className={styles.title}>
					欢迎来到暖音后台管理系统
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
				</div>
			</div>
		)
	}
}
