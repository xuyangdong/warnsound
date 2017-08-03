import React from 'react'
import {Modal,Input,Table} from 'antd'
import PropTypes from 'prop-types'
import styles from './AddStoryRoleModal.scss'
import UploadAvatar from '../../components/common/UploadAvatar'
import _ from 'lodash'
import UploadOtherFile from '../../components/common/UploadOtherFile'

export default class AddStoryRoleModal extends React.Component {
	static propTypes = {
		content:PropTypes.array.isRequired,
	}
	constructor(){
		super()
		this.state = {
			roleName:''
		}
	}
	handleCancel = () => {
		this.props.onCancel()
	}
	renderContentList(){
		const columns = [{
			title:'故事内容',
			dataIndex:'content',
			key:'content'
		}]
		const dataSource = this.props.content.map((v,k) => ({
			...v,
			key:k
		}))
		return (<Table
		scroll={{ x: '130%', y: 240 }}
		showHeader={false}
		columns={columns}
		dataSource={dataSource}
		size="small"
		rowSelection={{type:'checkbox'}}
		pagination={false}
		/>)
	}
	render(){
		return (
			<Modal visible={true} width={800}
			onOk={this.handleOk}
			onCancel={this.handleCancel}
			title='添加角色'
			>
			<div className={styles.header}>
				<div className={styles.firstField}>
					<Input addonBefore='角色名称' value={this.state.roleName} onChange={(e) => {
						this.setState({
							roleName:e.target.name
						})
					}}/>
				</div>
				<div className={styles.secondField}>
					<UploadOtherFile hint='上传音频' />
					<UploadAvatar hint='上传图片'/>
				</div>
			</div>
			<div className={styles.content}>
			{this.renderContentList()}
			</div>
			</Modal>
		)
	}
}
