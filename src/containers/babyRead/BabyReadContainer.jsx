import React from 'react'
import { Table, Input, Button, notification, Popover } from 'antd'
import TableHeader from '../../components/common/TableHeader'
import styles from './BabyReadContainer.scss'
import EnhanceTable from '../../components/common/EnhanceTable'
import { bindActionCreators } from 'redux'
import { getBabyRead } from 'actions/babyRead'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import config from '../../config'
import {fromJS} from 'immutable'

class BabyReadContainer extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object
    }
    constructor(){
        super()
        this.state = {
            storyList:fromJS([])
        }
    }
    componentDidMount( ) {
        if(this.props.babyRead.get('data').isEmpty()){
            this.props.getBabyRead(1,10)
        }
        fetch(config.api.story.all(0,10000),{
            headers:{
				'authorization':sessionStorage.getItem('auth')
			}
        }).then(res => res.json()).then(res => {
            this.setState({
                storyList:fromJS(res.obj)
            })
        })
    }
    getTableData = ( ) => {
        const {storyList} = this.state
        const columns = [
            {
                title: '故事',
                dataIndex: 'storyid',
                key: 'title',
                render:(t,r) => {
                    return storyList.find(v => v.get('id')==t,fromJS({}),fromJS({})).get('title')
                }
            }, {
                title: '内容',
                dataIndex: 'content',
                key: 'content',
                render: ( t, r ) => {
                    const content = (
                        <p>{t}</p>
                    )
                    return (
                        <Popover content={content}>
                            <p>{t.length > 22
                                    ? `${ t.substring( 0, 10 ) }...${ t.substring( t.length - 10 ) }`
                                    : t}</p>
                        </Popover>
                    )
                }
            }, {
                title: '图标',
                dataIndex: 'iconurl',
                key: 'iconurl',
                render:(t,r) => {
                    return <img src={t} style={{maxHeight:100}}/>
                }
            }, {
                title: '操作',
                key: 'operate',
                render: ( t, r ) => {
                    return (
                        <div>
                            <Link to={`/babyRead/edit/${ r.id }`}>编辑</Link>
                        </div>
                    )
                }
            }
        ]
        const dataSource = this.props.babyRead.get('data').map((v,k) => ({
            ...v.toJS(),
            key:k
        })).toJS()
        return { columns, dataSource }
    }
    handleCreate = ( ) => {
        this
            .context
            .router
            .push( '/babyRead/create' )
    }
    render( ) {
        const { columns, dataSource } = this.getTableData( )
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <TableHeader title='宝宝读列表' searchBar={[ ]} functionBar={[ 'create' ]} onCreate={this.handleCreate}/>
                </div>
                <div className={styles.mainPanel}>
                    <EnhanceTable columns={columns} dataSource={dataSource} pagination={{
                        total:this.props.babyRead.getIn(['otherData','totalSize']),
						onChange:(page,pageSize) => {
							this.setState({
								current:page,
								pageSize:pageSize
							})
							this.props.getBabyRead(page,pageSize)
						}
                    }}/>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    babyRead:state.get('babyRead')
}), dispatch => ({
    getBabyRead:bindActionCreators(getBabyRead,dispatch)
 }))( BabyReadContainer )
