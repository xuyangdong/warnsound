import React from 'react'
import {Row, Col, Input, Icon,Button} from 'antd'
import styles from './TableHeader.scss'

const Search = Input.Search

class TableHeader extends React.Component {
	static propTypes={
		functionBar:React.PropTypes.array,
		title:React.PropTypes.string.isRequired,
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
							<span className={styles.functionLabel}>
							<Icon type="reload" />
							刷新
							</span>
						</Col>:null}
						</Row>
					</Col>
				</Row>
				{
					functionBar.indexOf('search')>-1?<Row type='flex' justify='end' gutter={16}>
						<Col span={4}>
							<span>标题<Icon type="enter" style={{transform:'rotate(-90deg)'}}/></span><Input value={titleS} onChange={(e)=>{
								this.props.onChangeSearch(e.target.value,'titleS')
							}}/>
						</Col>
						<Col span={4}>
							<span>作者<Icon type="enter" style={{transform:'rotate(-90deg)'}}/></span><Input value={author} onChange={(e)=>{
								this.props.onChangeSearch(e.target.value,'author')
							}}/>
						</Col>
						<Col span={4}>
							<span>出版社<Icon type="enter" style={{transform:'rotate(-90deg)'}}/></span><Input value={press} onChange={(e)=>{
								this.props.onChangeSearch(e.target.value,'press')
							}}/>
						</Col>
						<Col span={4}>
							<span>内容<Icon type="enter" style={{transform:'rotate(-90deg)'}}/></span><Input value={content} onChange={(e)=>{
								this.props.onChangeSearch(e.target.value,'content')
							}}/>
						</Col>
						<Col span={4}>
							<span>标签<Icon type="enter" style={{transform:'rotate(-90deg)'}}/></span><Input value={tag} onChange={(e)=>{
								this.props.onChangeSearch(e.target.value,'tag')
							}}/>
						</Col>
						<Col span={4}>
							<div>&nbsp;</div>
							<Button onClick={()=>{
								this.props.onSearch({
									title:titleS,
									author:author,
									press:press,
									content:content,
									tag:tag
								})
							}}>查询</Button>
						</Col>
					</Row>:null
				}
			</div>
		)
	}
}

export default TableHeader
