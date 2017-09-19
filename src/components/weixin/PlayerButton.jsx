import React from 'react'
import styles from './PlayerButton.scss'
import PropTypes from 'prop-types'
import playerButton from 'publicRes/img/play.png'
export default class PlayerButton extends React.Component {
	static propTypes = {
		coverUrl:PropTypes.string,
	}
	render(){
		const {coverUrl} = this.props
		return (
			<div className={styles.container}>
				<div className={styles.playerWrapper} onClick={this.props.onClick}>
					<img src={coverUrl} className={styles.playerButton}/>
					<img src={playerButton} className={styles.playerLogo} />
				</div>
			</div>
		)
	}
}
