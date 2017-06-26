import React from 'react'
import styles from './CreateEditHeader.scss'
import {Row, Col,Icon} from 'antd'
import classnames from 'classnames/bind'
import PropTypes from 'prop-types'
const cx = classnames.bind(styles)

export default class CreateEditHeader extends React.Component {
	static contextTypes = {
		router:PropTypes.object
	}
	static defaultProps = {
		functionBar:['back','delete','refresh']
	}
	render(){
		const {title} = this.props
		return (
			<div className={styles.container}>
				<Row type='flex'>
					<Col span={4}>
						<span className={styles.title}>{title}</span>
					</Col>
					{this.props.functionBar.indexOf('back')>-1?(<Col offset={14} span={2}>
						<span className={cx('title','functionLabel')} onClick={()=>{
							this.context.router.goBack()
						}}>
						<Icon type="rollback" />返回
						</span>
					</Col>):null}
					{this.props.functionBar.indexOf('delete')>-1?(<Col span={2}>
						<span className={cx('title','functionLabel')}>
						<Icon type="delete" />删除
						</span>
					</Col>):null}
					{this.props.functionBar.indexOf('refresh')>-1?(<Col span={2}>
						<span className={cx('title','functionLabel')}>
						<Icon type="reload" />刷新
						</span>
					</Col>):null}
				</Row>
			</div>
		)
	}
}
