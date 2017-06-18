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
							<Menu.Item key="1"><Link to='/controller'><Icon type="appstore" />控制台</Link></Menu.Item>
							<Menu.Item key="2"><Link to='/stories'><Icon type="book" />Stories</Link></Menu.Item>
							<Menu.Item key="3"><Link to='/storytags'><Icon type="tag" />StoryTags</Link></Menu.Item>
                            <Menu.Item key="4"><Link to='/soundeffects'><Icon type="tag" />SoundEffects</Link></Menu.Item>
							<Menu.Item key="5"><Link to='/soundeffecttags'><Icon type="notification" />Soundeffecttags</Link></Menu.Item>
							<Menu.Item key="6"><Link to='/backgroundmusics'><Icon type="sound" />Backgroundmusics</Link></Menu.Item>
							<Menu.Item key="7"><Icon type="poweroff" />注销</Menu.Item>
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
