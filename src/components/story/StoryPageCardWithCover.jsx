import React from 'react'
import styles from './StoryPageCardWithCover.scss'
import {Button} from 'antd'
import {Motion, spring} from 'react-motion'
import {uploadIcon} from 'actions/common'

export default class StoryPageCardWithCover extends React.Component {
	editedContent = []
	constructor(){
		super()
		this.state = {
			showMask:false,
			coverUlr:''
		}
	}
	handleFileChange = (e) => {
		const files = e.target.files
		const data = this.props.data
		uploadIcon(files[0]).then(res => {
			this.editedContent[data.order].coverUrl = res.obj.url
			console.log(this.editedContent)
		})
	}
	render(){
		this.editedContent = this.props.editedContent
		return (
			<div className={styles.container} onMouseEnter={(e) => {
				e.stopPropagation()
				this.setState({
					showMask:true
				})
			}} onMouseLeave={(e) => {
				e.stopPropagation()
				this.setState({
					showMask:false
				})
			}}>
				<div className={styles.text}>
				{this.props.data.content}
				</div>
				<img src={this.state.coverUlr.length>0?this.state.coverUlr:this.props.data.coverUrl}/>
				<Motion style={{x: spring(this.state.showMask?100:0),opacity:spring(this.state.showMask?0.8:0)}}>
				{value => (<div style={{height:value.x,opacity:value.opacity}} className={styles.mask}>
					<Button style={{opacity:'1'}} onClick={() => {
						this.refs.file.click()
					}}>插入图片</Button><Button onClick={() => {
						const data = this.props.data
						this.editedContent[data.order].coverUrl = ''
					}}>删除图片</Button>
				</div>)}
				</Motion>
				<input type='file' style={{display:'none'}} ref='file' onChange={this.handleFileChange} />
			</div>
		)
	}
}
