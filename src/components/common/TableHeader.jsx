import React from 'react'
import {Row, Col, Input, Icon} from 'antd'
import styles from './TableHeader.scss'

const Search = Input.Search

class TableHeader extends React.Component {
	static propTypes={
		functionBar:React.PropTypes.array,
		title:React.PropTypes.string.isRequired,
	}
	render(){
		const {functionBar,title} = this.props
		return (
			<div className={styles.container}>
				<Row type='flex' justify='space-between'>
					<Col span={4}>
					<span className={styles.title}>{title}</span>
					</Col>
					<Col span={20}>
						<Row type='flex' justify='end' gutter={16}>
						{functionBar.indexOf('create')>-1?<Col>
							<span className={styles.functionLabel} onClick={this.props.onCreate}>
							<Icon type="file-add" />
							新建
							</span>
						</Col>:null}
						{functionBar.indexOf('refresh')>-1?<Col>
							<span className={styles.functionLabel}>
							<Icon type="reload" />
							刷新
							</span>
						</Col>:null}
						</Row>
					</Col>
				</Row>
				{
					functionBar.indexOf('search')>-1?<Row type='flex' justify='end'>
						<Col span={4}>
							<Search />
						</Col>
					</Row>:null
				}
			</div>
		)
	}
}

export default TableHeader
