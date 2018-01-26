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
import ScenarioCreateEditPanel from './containers/story/scenario/CreateEditPanel.jsx'

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

import StorySurroundContainer from './containers/storySurround/StorySurroundContainer'
import StorySurroundCreateEditPanel from './containers/storySurround/CreateEditPanel'

import ReadPlanContainer from './containers/readPlan/ReadPlanContainer'
import ReadPlanCreateEditPanel from './containers/readPlan/CreateEditPanel'

import BabyReadContainer from './containers/babyRead/BabyReadContainer'
import BabyReadCreateEditPanel from './containers/babyRead/CreateEditPanel'

import StoryTopicContainer from './containers/storyTopic/StoryTopicContainer'
import StoryTopicCreateEditPanel from './containers/storyTopic/CreateEditPanel'

import NoticeContainer from './containers/notice/NoticeContainer'
import NoticeCreateEditPanel from './containers/notice/CreateEditPanel'

import AdminContainer from './containers/admin/AdminContainer'
import AdminCreateEditPanel from './containers/admin/CreateEditPanel'

import PermissionContainer from './containers/permission/PermissionContainer'
import PermissionCreateEditPanel from './containers/permission/CreateEditPanel'

import WorkEnhancerFactory from './enhancers/workEnhancer/WorkEnhancerFactory'
import WorkContainer from './containers/work/WorkContainer'
import WorkCreateEditPanel from './containers/work/CreateEditPanel'

import InitImageContainer from './containers/initImage/InitImageContainer'
import InitImageCreateEditPanel from './containers/initImage/CreateEditPanel'

import IconContainer from './containers/icon/IconContainer'
import IconCreateEditPanel from './containers/icon/CreateEditPanel'

import NativeWorkContainer from './containers/nativeWork/NativeWorkContainer'
import NativeWorkCreateEditPanel from './containers/nativeWork/CreateEditPanel'

import OpinionContainer from './containers/opinion/OpinionContainer'

import ContinuousLoginPromptContainer from './containers/continuousLoginPrompt/ContinuousLoginPromptContainer'
import ContinuousLoginPromptCreateEditPanel from './containers/continuousLoginPrompt/CreateEditPanel'

import DestinationContainer from './containers/destination/DestinationContainer'
import DestinationCreateEditPanel from './containers/destination/CreateEditPanel'

import PushMessageContainer from './containers/pushMessage/PushMessageContainer'
import PushMessageCreateEditPanel from './containers/pushMessage/CreateEditPanel'

import WorksTagContainer from './containers/worksTag/WorksTagContainer'
import WorksTagCreateEditPanel from './containers/worksTag/CreateEditPanel'

import CommentContainer from './containers/storySurround/comment/CommentContainer'
import CommentCreateEditPanel from './containers/storySurround/comment/CreateEditPanel'

import FeedbackTempletContainer from './containers/feedbackTemplet/FeedbackTempletContainer'
import FeedbackTempletCreateEditPanel from './containers/feedbackTemplet/CreateEditPanel'

import UserGoldAccountContainer from './containers/userGoldAccount/UserGoldAccountContainer'

import GoldRewardRuleContainer from './containers/goldRewardRule/GoldRewardRuleContainer'
import GoldRewardRuleCreateEditPanel from './containers/goldRewardRule/CreateEditPanel'

import RewardGoldPromptContainer from './containers/rewardGoldPrompt/RewardGoldPromptContainer'
import RewardGoldPromptCreateEditPanel from './containers/rewardGoldPrompt/CreateEditPanel'
/** -------------------- Test Component ------------------- **/
import TestContainer from './containers/test/TestContainer'
import UeditorComponent from './components/UeditorComponent'
import OssUploadComponent from './components/common/OssUploadComponent'
import WangEditorComponent from './components/story/WangEditorTestWrapper'
import ReadGuideInput3 from './components/story/ReadGuideInput3'
import ReadGuideInput4 from './components/story/ReadGuideInput4'
/** -------------------- Test ------------------- **/

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

const StorySurroundCreateEditPanelWithData = CreateEditGetDataHOCFactory('storySurround')(StorySurroundCreateEditPanel)

const ScenarioCreateEditPanelWithData = CreateEditGetDataHOCFactory('scenario')(ScenarioCreateEditPanel)

const ReadPlanCreateEditPanelWithData = CreateEditGetDataHOCFactory('readPlan')(ReadPlanCreateEditPanel)

const BabyReadCreateEditPanelWithData = CreateEditGetDataHOCFactory('babyRead')(BabyReadCreateEditPanel)

const StoryTopicCreateEditPanelWithData = CreateEditGetDataHOCFactory('storyTopic')(StoryTopicCreateEditPanel)

const NoticeCreateEditPanelWithData = CreateEditGetDataHOCFactory('notice')(NoticeCreateEditPanel)

const AdminCreateEditPanelWithData = CreateEditGetDataHOCFactory('admin')(AdminCreateEditPanel)

const PermissionCreateEditPanelWithData = CreateEditGetDataHOCFactory('permission')(PermissionCreateEditPanel)

const InitImageCreateEditPanelWithData = CreateEditGetDataHOCFactory('initImage')(InitImageCreateEditPanel)

const IconCreateEditPanelWithData = CreateEditGetDataHOCFactory('icon')(IconCreateEditPanel)

const NativeWorkCreateEditPanelWithData = CreateEditGetDataHOCFactory('nativeWork')(NativeWorkCreateEditPanel)

const ContinuousLoginPromptCreateEditPanelWithData = CreateEditGetDataHOCFactory('continuousLoginPrompt')(ContinuousLoginPromptCreateEditPanel)

const DestinationCreateEditPanelWithData = CreateEditGetDataHOCFactory('destination')(DestinationCreateEditPanel)

const PushMessageCreateEditPanelWithData = CreateEditGetDataHOCFactory('pushMessage')(PushMessageCreateEditPanel)

const WorksTagCreateEditPanelWithData = CreateEditGetDataHOCFactory('worksTag')(WorksTagCreateEditPanel)

const FeedbackTempletCreateEditPanelWithData = CreateEditGetDataHOCFactory('feedbackTemplet')(FeedbackTempletCreateEditPanel)

const CommentCreateEditPanelWithData = CreateEditGetDataHOCFactory('comment')(CommentCreateEditPanel)

const GoldRewardRuleCreateEditPanelWithData = CreateEditGetDataHOCFactory('goldRewardRule')(GoldRewardRuleCreateEditPanel)

const RewardGoldPromptCreateEditPanelWithData = CreateEditGetDataHOCFactory('rewardGoldPrompt')(RewardGoldPromptCreateEditPanel)
/** -------------------- HOC ------------------- **/

/** -------------------- HOC ------------------- **/
const UserWorkContainerHOC = WorkEnhancerFactory('user')(WorkContainer)

const StoryWorkContainerHOC = WorkEnhancerFactory('story')(WorkContainer)

const WorksTagWorkContainerHOC = WorkEnhancerFactory('worksTag')(WorkContainer)

const WorkCreateEditPanelWithData = CreateEditGetDataHOCFactory('userWork')(WorkCreateEditPanel)
/** -------------------- HOC ------------------- **/

const routes = (<Router history={hashHistory}>
		<Route path="/login" component={LoginContainer}/>
		<Route path="/" component={LoginControlHOC(BaseContainer)}>
			<Route path="dashboard" component={DashBoardContainer}/>

			<Route path="stories" component={StoryContainer} />
			<Route path="stories/create" component={(props) => <StroyCreateEditPanelWithData type='create' {...props}/>}/>
			<Route path='stories/work/show/(:id)' component={StoryWorkContainerHOC} />
			<Route path="stories/edit/(:id)" component={(props) => <StroyCreateEditPanelWithData type='edit' {...props} />}/>
			<Route path="stories/(:storyId)/scenario/create" component={(props) => <ScenarioCreateEditPanelWithData type='create' {...props}/>} />
			<Route path='stories/(:userId)/work/edit/(:id)' component={(props) => <WorkCreateEditPanelWithData indexType='story' type='edit' {...props}/>}/>
			<Route path='stories/(:userId)/work/create' component={(props) => <WorkCreateEditPanelWithData indexType='story' type='create' {...props}/>}/>

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
			<Route path="publishapp/edit/(:id)" component={(props) => <AppCreateEditPanelWithData type='edit' {...props} />}/>

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
			<Route path='user/work/show/(:id)' component={UserWorkContainerHOC} />
			<Route path='user/(:userId)/work/edit/(:id)' component={(props) => <WorkCreateEditPanelWithData indexType='user' type='edit' {...props}/>}/>
			<Route path='user/(:userId)/work/create' component={(props) => <WorkCreateEditPanelWithData indexType='user' type='create' {...props}/>}/>

			<Route path='storySurround' component={StorySurroundContainer} />
			<Route path='storySurround/create' component={(props) => <StorySurroundCreateEditPanelWithData type='create' {...props}/>}/>
			<Route path='storySurround/edit/(:id)' component={(props) => <StorySurroundCreateEditPanelWithData type='edit' {...props}/>}/>
			<Route path='storySurround/comment/(:ambitusId)' component={CommentContainer} />
			<Route path='storySurround/(:storySurroundId)/comment/create' component={props => <CommentCreateEditPanelWithData type='create' {...props}/>} />

			<Route path='readPlan' component={ReadPlanContainer} />
			<Route path='readPlan/create' component={(props) => <ReadPlanCreateEditPanelWithData type='create' {...props}/>}/>
			<Route path='readPlan/edit/(:id)' component={(props) => <ReadPlanCreateEditPanelWithData type='edit' {...props}/>}/>

			<Route path='babyRead' component={BabyReadContainer} />
			<Route path='babyRead/create' component={(props) => <BabyReadCreateEditPanelWithData type='create' {...props}/>}/>
			<Route path='babyRead/edit/(:id)' component={(props) => <BabyReadCreateEditPanelWithData type='edit' {...props}/>}/>

			<Route path='storyTopic' component={StoryTopicContainer} />
			<Route path='storyTopic/create' component={(props) => <StoryTopicCreateEditPanelWithData type='create' {...props}/>}/>
			<Route path='storyTopic/edit/(:id)' component={(props) => <StoryTopicCreateEditPanelWithData type='edit' {...props}/>}/>

			<Route path='notice' component={NoticeContainer} />
			<Route path='notice/create' component={props => <NoticeCreateEditPanelWithData type='create' {...props}/>}/>
			<Route path='notice/edit/(:id)' component={props => <NoticeCreateEditPanelWithData type='edit' {...props}/>}/>

			<Route path='admin' component={AdminContainer} />
			<Route path='admin/create' component={props => <AdminCreateEditPanelWithData type='create' {...props}/>}/>
			<Route path='admin/edit/(:id)' component={props => <AdminCreateEditPanelWithData type='edit' {...props}/>}/>

			<Route path='permission' component={PermissionContainer} />
			<Route path='permission/create' component={props => <PermissionCreateEditPanelWithData type='create' {...props}/>}/>
			<Route path='permission/edit/(:id)' component={props => <PermissionCreateEditPanelWithData type='edit' {...props}/>}/>

			<Route path='initImage' component={InitImageContainer} />
			<Route path='initImage/create' component={props => <InitImageCreateEditPanelWithData type='create' {...props}/>}/>
			<Route path='initImage/edit/(:id)' component={props => <InitImageCreateEditPanelWithData type='edit' {...props}/>}/>

			<Route path='icon' component={IconContainer} />
			<Route path='icon/create' component={props => <IconCreateEditPanelWithData type='create' {...props}/>} />

			<Route path='nativeWork' component={NativeWorkContainer} />
			<Route path='nativeWork/create' component={props => <NativeWorkCreateEditPanelWithData type='create' {...props}/>} />
			<Route path='nativeWork/edit/(:id)' component={props => <NativeWorkCreateEditPanelWithData type='edit' {...props}/>} />

			<Route path='opinion' component={OpinionContainer} />

			<Route path='continuousLoginPrompt' component={ContinuousLoginPromptContainer} />
			<Route path='continuousLoginPrompt/create' component={props => <ContinuousLoginPromptCreateEditPanelWithData type='create' {...props} />} />
			<Route path='continuousLoginPrompt/edit/(:id)' component={props => <ContinuousLoginPromptCreateEditPanelWithData type='edit' {...props} /> } />

			<Route path='destination' component={DestinationContainer} />
			<Route path='destination/create' component={props => <DestinationCreateEditPanelWithData type='create' {...props} />} />
			<Route path='destination/edit/(:id)' component={props => <DestinationCreateEditPanelWithData type='edit' {...props} />} />

			<Route path='pushMessage' component={PushMessageContainer} />
			<Route path='pushMessage/create' component={props => <PushMessageCreateEditPanelWithData type='create' {...props}/> } />
			<Route path='pushMessage/edit/(:id)' component={props => <PushMessageCreateEditPanelWithData type='edit' {...props}/> } />

			<Route path='worksTag' component={WorksTagContainer} />
			<Route path='worksTag/create' component={props => <WorksTagCreateEditPanelWithData type='create' {...props} /> } />
			<Route path='worksTag/edit/(:id)' component={props => <WorksTagCreateEditPanelWithData type='edit' {...props} /> } />
			<Route path='worksTag/work/show/(:id)' component={ WorksTagWorkContainerHOC } />

			<Route path='feedbackTemplet' component={FeedbackTempletContainer} />
			<Route path='feedbackTemplet/create' component={props => <FeedbackTempletCreateEditPanelWithData type='create' {...props} />} />
			<Route path='feedbackTemplet/edit/(:id)' component={props => <FeedbackTempletCreateEditPanelWithData type='edit' {...props} />} />

			<Route path='userGoldAccount' component={UserGoldAccountContainer} />

			<Route path='goldRewardRule' component={GoldRewardRuleContainer} />
			<Route path='goldRewardRule/create' component={props => <GoldRewardRuleCreateEditPanelWithData type='create' {...props}/>} />
			<Route path='goldRewardRule/edit/(:id)' component={props => <GoldRewardRuleCreateEditPanelWithData type='edit' {...props}/>} />

			<Route path='rewardGoldPrompt' component={RewardGoldPromptContainer} />
			<Route path='rewardGoldPrompt/create' component={props => <RewardGoldPromptCreateEditPanelWithData type='create' {...props}/>} />
			<Route path='rewardGoldPrompt/edit/(:id)' component={props => <RewardGoldPromptCreateEditPanelWithData type='edit' {...props}/>} />
		</Route>

		<Route path="app" component={App}/>
		<Route path="draft" component={DraftComponent} />
		<Route path="media" component={MediaTextComponent}/>

		<Route path="test" component={TestContainer}>
			<Route path="ueditor" component={UeditorComponent} />
			<Route path="oss" component={OssUploadComponent} />
			<Route path="wange" component={WangEditorComponent}/>
			<Route path="readGuideInput3" component={ReadGuideInput3} />
			<Route path="readGuideInput4" component={ReadGuideInput4} />
		</Route>

	</Router>)

export default routes
