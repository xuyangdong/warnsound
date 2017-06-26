import React from 'react'
import {Row, Col, Input, Icon,Button} from 'antd'
import styles from './TableHeader.scss'
import SearchBar from './SearchBar'

const Search = Input.Search

class TableHeader extends React.Component {
	static propTypes={
		functionBar:React.PropTypes.array,
		title:React.PropTypes.string.isRequired,
		searchBar:React.PropTypes.array
	}
	handleCleanQuery = () => {
		this.refs.searchBar.clean()
	}
	render(){
		const {functionBar,title} = this.props
		const {titleS,author,press,content,tag} = this.props.functionBar.indexOf('search')>-1?this.props.search:{
			titleS:'',
			author:'',
			press:'',
			content:'',
			tag:''
		}

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
							<span className={styles.functionLabel} onClick={this.handleCleanQuery}>
							<Icon type="reload" />
							刷新
							</span>
						</Col>:null}
						</Row>
					</Col>
				</Row>
				<SearchBar ref='searchBar' searchCondition={this.props.searchBar} onSearch={this.props.onSearch}/>
			</div>
		)
	}
}

export default TableHeader
