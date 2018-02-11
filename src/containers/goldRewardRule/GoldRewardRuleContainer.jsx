import React from 'react'
import styles from './GoldRewardRuleContainer.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import TableHeader from '../../components/common/TableHeader'
import EnhanceTable from '../../components/common/EnhanceTable'
import {getGoldRewardRuleByType} from 'actions/goldRewardRule'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import {Input,Select} from 'antd'
import config from '../../config'
import {fromJS,Map} from 'immutable'
import _ from 'lodash'
const Option = Select.Option

class GoldRewardRuleContainer extends React.Component {
	static contextTypes = {
		router:PropTypes.object
	}
	state = {
		current:0,
		pageSize:10,
		typeList:fromJS([]),
		chosenType:'FINISH_TODAY_READING_PLAN'
	}
	componentDidMount(){
		fetch(config.api.goldRewardRule.type.getWithDesc,{
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => res.json()).then(res => {
			this.setState({
				typeList:fromJS(res.obj)
			})
		})
		if(this.props.goldRewardRule.get('data',fromJS({})).isEmpty()){
			this.props.getGoldRewardRuleByType(this.state.chosenType)
		}
	}
	getTableData = () => {
		const goldRewardRule = this.props.goldRewardRule.get('data',Map())
		const columns = _.concat(goldRewardRule.keySeq().toList().map(v => ({
			title:v,
			dataIndex:v,
			key:v
		})).toJS(),{
			title:'操作',
			key:'operator',
			render:(t,r) => {
				return (<Link to={`/goldRewardRule/edit/${r.id}`}>编辑</Link>)
			}
		})

		const dataSource = [goldRewardRule.set('key',0).toJS()]
		return {
			columns,
			dataSource
		}
	}
	handleSelect = (value) => {
		this.setState({
			chosenType:value
		})
		this.props.getGoldRewardRuleByType(value)
	}
	render(){
		const {columns,dataSource} = this.getTableData()
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<TableHeader title={`金币规则--${this.state.chosenType}`}
					 searchBar={[]}
					 functionBar={['create']}
					 onCreate={()=>{
						 this.context.router.push(`/goldRewardRule/create`)
					 }}
					 >
					 	<Select onSelect={this.handleSelect} placeholder='选择类型' style={{width:200}}>
						{this.state.typeList.map((v,k) => (
							<Option value={v.get('type')} key={k}>{v.get('name')}</Option>
						))}
						</Select>
					 </TableHeader>
				</div>
				<div className={styles.mainPanel}>
					<EnhanceTable columns={columns} dataSource={dataSource} />
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	goldRewardRule:state.get('goldRewardRule')
}),dispatch => ({
	getGoldRewardRuleByType:bindActionCreators(getGoldRewardRuleByType,dispatch),
}))(GoldRewardRuleContainer)
