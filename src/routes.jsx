import React from 'react'
import {Router, Route, hashHistory} from 'react-router'
import BaseContainer from './containers/BaseContainer'
import App from './App'
import DraftComponent from './components/DraftComponent'

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

import LoginContainer from './containers/LoginContainer'

import CreateEditGetDataHOCFactory from './enhancers/CreateEditGetDataHOCFactory'
const StoryCreateEditGetDataHOC = CreateEditGetDataHOCFactory('story')
const StroyCreateEditPanelWithData = StoryCreateEditGetDataHOC(StoryCreateEditPanel)

const StoryTagCreateEditGetDataHOC = CreateEditGetDataHOCFactory('storyTag')
const StoryTagCreateEditPanelWithData = StoryTagCreateEditGetDataHOC(StortyTagCreateEditPanel)

const SoundEffectCreateEditPanelWithData = CreateEditGetDataHOCFactory('soundEffect')(SoundEffectCreateEditPanel)

const SoundEffectTagCreateEditPanelWithData = CreateEditGetDataHOCFactory('soundEffectTag')(SoundEffectTagCreateEditPanel)

const BackgroundMusicCreateEditPanelWithData = CreateEditGetDataHOCFactory('backgroundMusic')(BackgroundMusicCreateEditPanel)
const routes = (<Router history={hashHistory}>
		<Route path="/login" component={LoginContainer}/>
		<Route path="/" component={LoginControlHOC(BaseContainer)}>
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

			<Route path="app" component={App}/>

		</Route>
		<Route path="draft" component={DraftComponent} />
	</Router>)

export default routes
