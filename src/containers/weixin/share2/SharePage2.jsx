import React from 'react'
import styles from './SharePage2.scss'
import config from '../../../config'
import ShareHeaderBar from '../../../components/weixin/ShareHeaderBar'
import PlayerButton from '../../../components/weixin/PlayerButton'
import MessagePanel from '../../../components/weixin/MessagePanel'
import ProgressBar from '../../../components/weixin/ProgressBar'
import plyr from 'plyr'
import musicSrc from '../陈一发儿-童话镇.mp3'

export default class SharePage2 extends React.Component {
	constructor(){
		super()
		this.state = {
			workInfo:{},
			currentTime:0,
			duration:0
		}
	}
	played = false
	componentDidMount(){
		const audio = document.getElementById('audio1')
		this.player = plyr.setup(this.refs.audio)[0];
		fetch(config.api.works.query(this.props.params.id||239)).then(res => res.json()).then(res => {
			console.log(res.obj.url)
			this.setState({
				workInfo:res.obj
			})
			this.player.source({
				type:'audio',
				title:'Example title',
				sources:[{
					src:res.obj.url||musicSrc
				}]
			})
		})
	}
	handlePlayer = () => {
		if(this.state.duration>0&&this.state.currentTime==this.state.duration){
			this.player.restart()
			this.played = true
		}else{
			if(!this.played){
				this.player.play()
				this.intervalId = setInterval(() => {
					this.setState({
						currentTime:this.player.getCurrentTime(),
						duration:this.player.getDuration()
					})
				},1000)
				this.played = true
			}else{
				this.player.pause()
				clearInterval(this.intervalId)
				this.played = false
			}
		}
	}
	render(){
		return (
			<div className={styles.container}>
				<img className={styles.backgroundImage} src={this.state.workInfo.coverUrl}/>
				<ShareHeaderBar workId={this.state.workInfo.id} className={styles.headerBar}/>
				<PlayerButton onClick={this.handlePlayer} coverUrl={this.state.workInfo.coverUrl} />
				<MessagePanel workInfo={this.state.workInfo} />
				<ProgressBar currentTime={this.state.currentTime} duration={this.state.duration}/>
				<audio ref='audio' controls></audio>
			</div>
		)
	}
}
