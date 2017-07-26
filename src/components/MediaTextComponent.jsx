import React from 'react'
import styles from './MediaTextComponent.scss'
import plyr from 'plyr'
import ReactDOM from 'react-dom'
import {Icon} from 'antd'
import 'plyr/dist/plyr.css'


export default class MediaTextComponent extends React.Component{
	constructor(){
		super()
		this.state = {
			playing:false
		}
		this.handlePlay = this.handlePlay.bind(this)
	}
	componentDidMount(){
		const dom = ReactDOM.findDOMNode(this.refs.audio)
		this.player = plyr.setup(dom,{
			hideControls:true,
			controls:[]
		})
	}
	handlePlay(){
		this.setState({
			playing:!this.state.playing
		},()=>{
			if(this.state.playing){
				this.player[0].play()
			}else{
				this.player[0].pause()
			}
		})
	}
	handleDelete = () => {
		this.props.onDelete(this.props.block)
	}
	render(){
		return (
		<div className={styles.container}>
			<div className={styles.item}>
				<div>
					<Icon type={this.state.playing?"play-circle-o":"play-circle"} onClick={this.handlePlay}/>
					<span>{this.props.block.getText()}</span>
				</div>
				<div>
					<span className={styles.description}>[{this.props.block.getData().get('soundEffectName')}]</span>
					<span onClick={this.handleDelete} style={{color:'red',cursor:'pointer'}}>删除</span>
				</div>
			</div>
			<audio ref='audio' controls>
			  <source src={this.props.block.getData().get('soundEffectUrl')} type="audio/wav"/>
			</audio>
		</div>)
	}
}
