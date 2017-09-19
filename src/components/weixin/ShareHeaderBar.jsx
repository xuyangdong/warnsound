import React from 'react'
import styles from './ShareHeaderBar.scss'
import logo from 'publicRes/img/logo.png'
import {Button} from 'antd'
import PropTypes from 'prop-types'

export default class ShareHeaderBar extends React.Component {
	static propTypes = {
		workId:PropTypes.number
	}
	render(){
		return (
			<div className={styles.container}>
				<img src={logo}/>
				<Button onClick={() => {
					this.refs.link.click()
				}}>在APP中打开</Button>
				<a ref='link' target='_blank' href={`qiyu:\/\/warm.tell\/workshare?workId=${this.props.workId}`}></a>
			</div>
		)
	}
}
