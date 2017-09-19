import React from 'react'
import officialImg from 'publicRes/img/official.jpg'
import styles from './OfficialContainer.scss'

export default class OfficialContainer extends React.Component {
	render(){
		return (
			<div className={styles.container}>
				<img src={officialImg} />
			</div>
		)
	}
}
