import React from 'react'
import {Progress} from 'antd'
import styles from './PlayerComponent.scss'
import playerButton from './method-draw-image.png'
export default class PlayerComponent extends React.Component {
	render(){
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<div className={styles.title}>故事会</div>
					<div className={styles.author}>佚名</div>
				</div>
				<div className={styles.playerWrapper}>
				<div className={styles.progressBarWrapper}>
				<Progress type="dashboard" style={{width:250,height:250}} percent={75} />
				</div>
				<div className={styles.playerButtonWrapper}>
					<img src={playerButton} />
				</div>
				</div>
				<div className={styles.footer}>
				</div>
			</div>
		)
	}
}
