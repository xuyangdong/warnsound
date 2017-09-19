import React from 'react'
import styles from './BaseContainer.scss'
import {Menu,Icon} from 'antd'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import PermissionControlEnhance from '../enhancers/PermissionControlEnhance'

const BaseContainer = React.createClass({
    render( ) {
        const {user} = this.props
        return (
            <div className={styles.container}>
                <div className={styles.navigation}>
                    <div className={styles.logo}>WarmSound Admin</div>
                </div>
                <div className={styles.content}>
                    <div className={styles.leftPanel}>
                        <Menu onClick={this.handleClick} style={{
                            width: 240,
							height: '100%'
                        }} defaultSelectedKeys={[ '1' ]} defaultOpenKeys={[ 'sub1' ]} mode="inline">
							<Menu.Item key="1"><Link to='/dashboard'><Icon type="appstore" />控制台</Link></Menu.Item>
							{PermissionControlEnhance(user.get('permission'),'story')(<Menu.Item key="2"><Link to='/stories'><Icon type="book" />故事管理</Link></Menu.Item>)}
                            {PermissionControlEnhance(user.get('permission'),'soundEffect')(<Menu.Item key="4"><Link to='/soundeffects'><Icon type="tag-o" />音效管理</Link></Menu.Item>)}
                            {PermissionControlEnhance(user.get('permission'),'backgroundMusic')(<Menu.Item key="6"><Link to='/backgroundmusics'><Icon type="sound" />背景音乐</Link></Menu.Item>)}
							{PermissionControlEnhance(user.get('permission'),'storyTag')(<Menu.Item key="3"><Link to='/storytags'><Icon type="tag-o" />故事标签</Link></Menu.Item>)}
							{PermissionControlEnhance(user.get('permission'),'soundEffectTag')(<Menu.Item key="5"><Link to='/soundeffecttags'><Icon type="notification" />音效标签</Link></Menu.Item>)}
                            {PermissionControlEnhance(user.get('permission'),'app')(<Menu.Item key="7"><Link to='/publishapp'><Icon type="sync" />APP管理</Link></Menu.Item>)}
                            {PermissionControlEnhance(user.get('permission'),'discover')(<Menu.Item key="8"><Link to='/discover'><Icon type="search" />发现管理</Link></Menu.Item>)}
                            {PermissionControlEnhance(user.get('permission'),'recommend')(<Menu.Item key="9"><Link to='/recommend'><Icon type="search" />推荐管理</Link></Menu.Item>)}
                            {PermissionControlEnhance(user.get('permission'),'logo')(<Menu.Item key="10"><Link to='/logo'><Icon type="trademark" />徽标管理</Link></Menu.Item>)}
                            {PermissionControlEnhance(user.get('permission'),'individuality')(<Menu.Item key="11"><Link to='/individuality'><Icon type="star-o" />个性化</Link></Menu.Item>)}
                            {PermissionControlEnhance(user.get('permission'),'album')(<Menu.Item key="12"><Link to='/album'><Icon type="star-o" />专辑管理</Link></Menu.Item>)}
                            {PermissionControlEnhance(user.get('permission'),'storySet')(<Menu.Item key="13"><Link to='/storyset'><Icon type="book" />故事集管理</Link></Menu.Item>)}
                            {PermissionControlEnhance(user.get('permission'),'user')(<Menu.Item key="14"><Link to='/user'><Icon type="book" />用户管理</Link></Menu.Item>)}
						</Menu>
                    </div>
                    <div className={styles.mainPanel}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
})


export default connect(state => ({
    user:state.get('user')
}))(BaseContainer)
