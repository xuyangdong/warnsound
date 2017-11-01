import React from 'react'
import styles from './BaseContainer.scss'
import {Menu,Icon} from 'antd'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import PermissionControlEnhance from '../enhancers/PermissionControlEnhance'
import {Motion,spring} from 'react-motion'
const SubMenu = Menu.SubMenu

const BaseContainer = React.createClass({
    getInitialState() {
        return {
            isCollaps:false
        }
    },
    toggleCollaps(){
       this.setState({
           isCollaps:!this.state.isCollaps
       })
    },
    render( ) {
        const {user} = this.props
        return (
            <div className={styles.container}>
                <div className={styles.navigation}>
                    <div className={styles.logo}>Warmtale Admin</div>
                </div>
                <Motion style={{x: this.state.isCollaps?spring(0):spring(240)}}>
                {
                    value => (
                        <div className={styles.content}>
                            <div style={{
                                width:value.x
                            }} className={styles.leftPanel}>
                                <Menu onClick={this.handleClick} style={{
                                    width: 240,
        							height: '100%',
                                }} defaultSelectedKeys={[ '1' ]} defaultOpenKeys={[ 'sub1' ]} mode="inline">
        							<Menu.Item key="1"><Link to='/dashboard'><Icon type="appstore" />控制台</Link></Menu.Item>
        							{PermissionControlEnhance(user.get('permission'),'story')(<Menu.Item key="2"><Link to='/stories'><Icon type="book" />故事管理</Link></Menu.Item>)}
                                    {PermissionControlEnhance(user.get('permission'),'storySurround')(<Menu.Item key="15"><Link to='/storySurround'><Icon type="book" />故事周边管理</Link></Menu.Item>)}
                                    <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>音效模块</span></span>}>
                                        {PermissionControlEnhance(user.get('permission'),'soundEffect')(<Menu.Item key="4"><Link to='/soundeffects'><Icon type="tag-o" />音效管理</Link></Menu.Item>)}
                                        {PermissionControlEnhance(user.get('permission'),'backgroundMusic')(<Menu.Item key="6"><Link to='/backgroundmusics'><Icon type="sound" />背景音乐</Link></Menu.Item>)}
                                        {PermissionControlEnhance(user.get('permission'),'soundEffectTag')(<Menu.Item key="5"><Link to='/soundeffecttags'><Icon type="notification" />音效标签</Link></Menu.Item>)}
                                    </SubMenu>
        							{PermissionControlEnhance(user.get('permission'),'storyTag')(<Menu.Item key="3"><Link to='/storytags'><Icon type="tag-o" />故事标签</Link></Menu.Item>)}
                                    {PermissionControlEnhance(user.get('permission'),'app')(<Menu.Item key="7"><Link to='/publishapp'><Icon type="sync" />APP管理</Link></Menu.Item>)}
                                    {PermissionControlEnhance(user.get('permission'),'discover')(<Menu.Item key="8"><Link to='/discover'><Icon type="search" />发现管理</Link></Menu.Item>)}
                                    {PermissionControlEnhance(user.get('permission'),'recommend')(<Menu.Item key="9"><Link to='/recommend'><Icon type="search" />推荐管理</Link></Menu.Item>)}
                                    {PermissionControlEnhance(user.get('permission'),'logo')(<Menu.Item key="10"><Link to='/logo'><Icon type="trademark" />徽标管理</Link></Menu.Item>)}
                                    {PermissionControlEnhance(user.get('permission'),'individuality')(<Menu.Item key="11"><Link to='/individuality'><Icon type="star-o" />个性化</Link></Menu.Item>)}
                                    {PermissionControlEnhance(user.get('permission'),'album')(<Menu.Item key="12"><Link to='/album'><Icon type="star-o" />专辑管理</Link></Menu.Item>)}
                                    {PermissionControlEnhance(user.get('permission'),'storySet')(<Menu.Item key="13"><Link to='/storyset'><Icon type="book" />故事集管理</Link></Menu.Item>)}
                                    {PermissionControlEnhance(user.get('permission'),'user')(<Menu.Item key="14"><Link to='/user'><Icon type="book" />用户管理</Link></Menu.Item>)}

                                    {PermissionControlEnhance(user.get('permission'),'readPlan')(<Menu.Item key="16"><Link to='/readPlan'><Icon type="book" />阅读计划</Link></Menu.Item>)}
                                    {PermissionControlEnhance(user.get('permission'),'babyRead')(<Menu.Item key="17"><Link to='/babyRead'><Icon type="book" />宝宝读</Link></Menu.Item>)}
                                    {PermissionControlEnhance(user.get('permission'),'storyTopic')(<Menu.Item key="18"><Link to='/storyTopic'><Icon type="book" />故事专题管理</Link></Menu.Item>)}
                                    {PermissionControlEnhance(user.get('permission'),'storyTopic')(<Menu.Item key="19"><Link to='/notice'><Icon type="book" />系统通知管理</Link></Menu.Item>)}
                                    {PermissionControlEnhance(user.get('permission'),'admin')(<Menu.Item key="20"><Link to='/admin'><Icon type="book" />后台用户管理</Link></Menu.Item>)}
                                    {PermissionControlEnhance(user.get('permission'),'permission')(<Menu.Item key="21"><Link to='/permission'><Icon type="book" />权限管理</Link></Menu.Item>)}
                                    {PermissionControlEnhance(user.get('permission'),'initImage')(<Menu.Item key="22"><Link to='/initImage'><Icon type="book" />开屏图片</Link></Menu.Item>)}
        						</Menu>
                            </div>
                            <div style={{
                                left:value.x
                            }} className={styles.collaps}>
                               <Icon type={this.state.isCollaps?'double-right':'double-left'} onClick={this.toggleCollaps}/>
                            </div>
                            <div className={styles.mainPanel}>
                                {this.props.children}
                            </div>
                        </div>
                    )
                }
                </Motion>
            </div>
        )
    }
})


export default connect(state => ({
    user:state.get('user')
}))(BaseContainer)
