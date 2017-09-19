import React from 'react'
import {Router, Route, hashHistory} from 'react-router'
import BaseContainer from './containers/BaseContainer'
import App from './App'
import DraftComponent from './components/DraftComponent'
import WeixinContainer from './containers/WeixinContainer'
import MediaTextComponent from './components/MediaTextComponent'

import {LoginControlHOC} from './enhancers/AccessControlContainer'

import StoryContainer from './containers/story/StoryContainer'
import StoryCreateEditPanel from './containers/story/CreateEditPanel'

import StoryTagContainer from './containers/storytag/StoryTagContainer'
import StortyTagCreateEditPanel from './containers/storytag/CreateEditPanel'

import SoundEffectContainer from './containers/soundeffect/SoundEffectContainer'
import SoundEffectCreateEditPanel from './containers/soundeffect/CreateEditPanel'

import SoundEffectTagContainer from './containers/soundeffecttag/SoundEffectTagContainer'
import SoundEffectTagCreateEditPanel from './containers/soundeffecttag/CreateEditPanel'

import BackgroundMusicContainer from './containers/backgroundmusic/BackgroundMusicContainer'
import BackgroundMusicCreateEditPanel from './containers/backgroundmusic/CreateEditPanel'

import DiscoverContainer from './containers/discover/DiscoverContainer'
import DiscoverCreateEditPanel from './containers/discover/CreateEditPanel'

import LoginContainer from './containers/LoginContainer'

import DashBoardContainer from './containers/dashboard/DashBoardContainer'

import PublishAppContainer from './containers/publishapp/PublishAppContainer'
import AppCreateEditPanel from './containers/publishapp/CreateEditPanel'

import RecommendContainer from './containers/recommend/RecommendContainer'

import LogoContainer from './containers/logo/LogoContainer'
import LogoCreateEditPanel from './containers/logo/CreateEditPanel'
import LogoDetailPage from './containers/logo/LogoDetailPage'

import IndividualityContainer from './containers/individuality/IndividualityContainer'
import IndividualCreateEditPanel from './containers/individuality/CreateEditPanel'

import AlbumContainer from './containers/album/AlbumContainer'
import AlbumCreateEditPanel from './containers/album/CreateEditPanel'

import StorySetContainer from './containers/storySet/StorySetContainer'
import StorySetCreateEditPanel from './containers/storySet/CreateEditPanel'

import UserContainer from './containers/user/UserContainer'
import UserCreateEditPanel from './containers/user/CreateEditPanel'
import UserWorkPage from './containers/user/work/UserWorkPage'
import UserWorkCreateEditPanel from './containers/user/work/CreateEditPanel'

/** -------------------- weixin share ------------------- **/
import SharePage from './containers/weixin/SharePage'
import SharePage2 from './containers/weixin/share2/SharePage2'
/** -------------------- weixin share ------------------- **/

/** -------------------- official ------------------- **/
import OfficialContainer from './containers/official/OfficialContainer'
/** -------------------- official ------------------- **/

/** -------------------- HOC ------------------- **/
import CreateEditGetDataHOCFactory from './enhancers/CreateEditGetDataHOCFactory'
const StoryCreateEditGetDataHOC = CreateEditGetDataHOCFactory('story')
const StroyCreateEditPanelWithData = StoryCreateEditGetDataHOC(StoryCreateEditPanel)

const StoryTagCreateEditGetDataHOC = CreateEditGetDataHOCFactory('storyTag')
const StoryTagCreateEditPanelWithData = StoryTagCreateEditGetDataHOC(StortyTagCreateEditPanel)

const SoundEffectCreateEditPanelWithData = CreateEditGetDataHOCFactory('soundEffect')(SoundEffectCreateEditPanel)

const SoundEffectTagCreateEditPanelWithData = CreateEditGetDataHOCFactory('soundEffectTag')(SoundEffectTagCreateEditPanel)

const BackgroundMusicCreateEditPanelWithData = CreateEditGetDataHOCFactory('backgroundMusic')(BackgroundMusicCreateEditPanel)

const AppCreateEditPanelWithData = CreateEditGetDataHOCFactory('app')(AppCreateEditPanel)

const DiscoverCreateEditPanelWithData = CreateEditGetDataHOCFactory('discover')(DiscoverCreateEditPanel)

const IndividualCreateEditPanelWithData = CreateEditGetDataHOCFactory('individuality')(IndividualCreateEditPanel)

const LogoCreateEditPanelWithData = CreateEditGetDataHOCFactory('logo')(LogoCreateEditPanel)

const AlbumCreateEditPanelWithData = CreateEditGetDataHOCFactory('album')(AlbumCreateEditPanel)

const StorySetCreateEditPanelWithData = CreateEditGetDataHOCFactory('storyset')(StorySetCreateEditPanel)

const UserCreateEditPanelWidthData = CreateEditGetDataHOCFactory('user')(UserCreateEditPanel)

const UserWorkCreateEditPanelWithData = CreateEditGetDataHOCFactory('userWork')(UserWorkCreateEditPanel)
/** -------------------- HOC ------------------- **/

const routes = (<Router history={hashHistory}>
		<Route path="/login" component={LoginContainer}/>
		<Route path="/" component={LoginControlHOC(BaseContainer)}>
			<Route path="dashboard" component={DashBoardContainer}/>

			<Route path="stories" component={StoryContainer} />
			<Route path="stories/create" component={(props) => <StroyCreateEditPanelWithData type='create' {...props}/>}/>
			<Route path="stories/edit/(:id)" component={(props) => <StroyCreateEditPanelWithData type='edit' {...props} />}/>

			<Route path="storytags" component={StoryTagContainer}/>
			<Route path="storyTags/create" component={(props) => <StoryTagCreateEditPanelWithData type='create' {...props}/>} />
			<Route path="storyTags/edit/(:id)" component={(props) => <StoryTagCreateEditPanelWithData type='edit' {...props}/>} />

			<Route path="soundeffects" component={SoundEffectContainer} />
			<Route path="soundEffects/create" component={(props) => <SoundEffectCreateEditPanelWithData type='create' {...props}/>} />
			<Route path="soundEffects/edit/(:id)" component={(props) => <SoundEffectCreateEditPanelWithData type='edit' {...props}/>} />

			<Route path="soundeffecttags" component={SoundEffectTagContainer} />
			<Route path="soundeffecttags/create" component={(props) => <SoundEffectTagCreateEditPanelWithData type='create' {...props}/>} />
			<Route path="soundeffecttags/edit/(:id)" component={(props) => <SoundEffectTagCreateEditPanelWithData type='edit' {...props}/>} />

			<Route path="backgroundmusics" component={BackgroundMusicContainer} />
			<Route path="backgroundmusics/create" component={(props) => <BackgroundMusicCreateEditPanelWithData type='create' {...props}/>} />
			<Route path="backgroundmusics/edit/(:id)" component={(props) => <BackgroundMusicCreateEditPanelWithData type='edit' {...props}/>} />

			<Route path="publishapp" component={PublishAppContainer} />
			<Route path="publishapp/create" component={(props) => <AppCreateEditPanelWithData type='create' {...props} />}/>
			<Route path="publishapp/edit/(:id)" component={(props) => <AppCreateEditPanelWithData type='create' {...props} />}/>

			<Route path="discover" component={DiscoverContainer} />
			<Route path="discover/create" component={(props) => <DiscoverCreateEditPanelWithData type='create' {...props}/>}/>
			<Route path="discover/edit/(:id)" component={(props) => <DiscoverCreateEditPanelWithData type='edit' {...props}/>}/>

			<Route path="recommend" component={RecommendContainer} />

			<Route path="logo" component={LogoContainer} />
			<Route path="logo/create" component={(props) => <LogoCreateEditPanelWithData type='create' {...props}/>} />
			<Route path="logo/edit/(:id)" component={(props) => <LogoCreateEditPanelWithData type='edit' {...props}/>} />
			<Route path="logo/detail/(:id)" component={LogoDetailPage} />

			<Route path='individuality' component={IndividualityContainer} />
			<Route path='individuality/create' component={(props) => <IndividualCreateEditPanelWithData type='create' {...props}/>}/>
			<Route path='individuality/edit/(:id)' component={(props) => <IndividualCreateEditPanelWithData type='edit' {...props}/>}/>

			<Route path='album' component={AlbumContainer} />
			<Route path='album/create' component={(props) => <AlbumCreateEditPanelWithData type='create' {...props}/>}/>
			<Route path='album/edit/(:id)' component={(props) => <AlbumCreateEditPanelWithData type='edit' {...props}/>}/>

			<Route path='storyset' component={StorySetContainer}/>
			<Route path='storyset/create' component={(props) => <StorySetCreateEditPanelWithData type='create' {...props} />}/>
			<Route path='storyset/edit/(:id)' component={(props) => <StorySetCreateEditPanelWithData type='edit' {...props} />}/>

			<Route path='user' component={UserContainer} />
			<Route path='user/create' component={(props) => <UserCreateEditPanelWidthData type='create' {...props}/>}/>
			<Route path='user/edit/(:id)' component={(props) => <UserCreateEditPanelWidthData type='edit' {...props}/>}/>
			<Route path='user/work/show/(:id)' component={UserWorkPage} />
			<Route path='user/(:userId)/work/edit/(:id)' component={(props) => <UserWorkCreateEditPanelWithData type='edit' {...props}/>}/>
			<Route path='user/(:userId)/work/create' component={(props) => <UserWorkCreateEditPanelWithData type='create' {...props}/>}/>
		</Route>

		<Route path="/weixin">
			<Route path="guanzhu" component={WeixinContainer}/>
			<Route path="share(/:id)" component={SharePage}/>
			<Route path="share2(/:id)" component={SharePage2}/>
		</Route>

		<Route path="/official">
			<Route path="index" component={OfficialContainer}/>
		</Route>
		<Route path="app" component={App}/>
		<Route path="draft" component={DraftComponent} />
		<Route path="media" component={MediaTextComponent}/>
	</Router>)

export default routes
