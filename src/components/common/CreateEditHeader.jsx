import React from 'react'
import styles from './CreateEditHeader.scss'
import {Row, Col,Icon} from 'antd'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

export default class CreateEditHeader extends React.Component {
	render(){
		const {title} = this.props
		return (
			<div className={styles.container}>
				<Row type='flex'>
					<Col span={4}>
						<span className={styles.title}>{title}</span>
					</Col>
					<Col offset={14} span={2}>
						<span className={cx('title','functionLabel')}>
						<Icon type="rollback" />返回
						</span>
					</Col>
					<Col span={2}>
						<span className={cx('title','functionLabel')}>
						<Icon type="delete" />删除
						</span>
					</Col>
					<Col span={2}>
						<span className={cx('title','functionLabel')}>
						<Icon type="reload" />刷新
						</span>
					</Col>
				</Row>
			</div>
		)
	}
}
