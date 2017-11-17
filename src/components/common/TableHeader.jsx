import React from 'react'
import {Row, Col, Input, Icon,Button} from 'antd'
import styles from './TableHeader.scss'

export default class TableHeader extends React.Component {
	renderChildren = () => {
		const children = this.props.children
		if(typeof children === 'undefined'){
			return null
		}if(typeof children === 'array'){
			return children.map((v,k) => {
				return (
					<Col key={k}>
					{v}
					</Col>
				)
			})
		}else{
			return children
		}
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
							<span className={styles.functionLabel} onClick={this.props.onRefresh}>
							<Icon type="reload" />
							刷新
							</span>
						</Col>:null}
						</Row>
					</Col>
				</Row>
				{/*
					<SearchBar ref='searchBar' searchCondition={this.props.searchBar} onSearch={this.props.onSearch}>
				</SearchBar>*/}
				<Row type='flex' justify='space-between'>
				{this.renderChildren()}
				</Row>
			</div>
		)
	}
}
