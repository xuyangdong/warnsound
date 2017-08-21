import React from 'react'
import styles from './SharePage.scss'
import config from '../../config'
import plyr from 'plyr'
import musicSrc from './陈一发儿-童话镇.mp3'
import PlayerComponent from './PlayerComponent'
import { Circle } from 'rc-progress'
export default class SharePage extends React.Component {
	componentDidMount(){
		// fetch(config.api.works.query(this.props.params.id)).then(res => res.json()).then(res => {
		// 	console.log(res)
		// })

		const player = plyr.setup(this.refs.audio)[0];
		console.log(player)
		player.source({
			type:'audio',
			title:'Example title',
			sources:[{
				src:musicSrc
			}]
		})
	}
	render(){
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					打开该链接的APP导航栏
				</div>
				<div className={styles.body}>
					<PlayerComponent width={100} height={100}/>
				</div>
				<div className={styles.footer}>
				</div>
				<audio ref='audio' id='audio' controls></audio>
			</div>
		)
	}
}
