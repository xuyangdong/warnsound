import React from 'react'
import styles from './BaseContainer.scss'
import {Menu,Icon} from 'antd'
import {Link} from 'react-router'

const BaseContainer = React.createClass({
    render( ) {
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
							<Menu.Item key="2"><Link to='/stories'><Icon type="book" />故事管理</Link></Menu.Item>
                            <Menu.Item key="4"><Link to='/soundeffects'><Icon type="tag" />音效管理</Link></Menu.Item>
                            <Menu.Item key="6"><Link to='/backgroundmusics'><Icon type="sound" />背景音乐</Link></Menu.Item>
							<Menu.Item key="3"><Link to='/storytags'><Icon type="tag" />故事标签</Link></Menu.Item>
							<Menu.Item key="5"><Link to='/soundeffecttags'><Icon type="notification" />音效标签</Link></Menu.Item>
                            <Menu.Item key="7"><Link to='/publishapp'><Icon type="sync" />APP管理</Link></Menu.Item>
                            <Menu.Item key="8"><Link to='/discover'><Icon type="search" />发现管理</Link></Menu.Item>
                            <Menu.Item key="9"><Link to='/recommend'><Icon type="search" />推荐管理</Link></Menu.Item>
                            <Menu.Item key="10"><Link to='/logo'><Icon type="search" />徽标管理</Link></Menu.Item>				
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

export default BaseContainer
