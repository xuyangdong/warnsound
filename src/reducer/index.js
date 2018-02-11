import {
	combineReducers
} from 'redux-immutablejs'
import user from './user'
import story from './story'
import storyTag from './storyTag'
import soundEffect from './soundEffect'
import soundEffectTag from './soundEffectTag'
import backgroundMusic from './backgroundMusic.js'
import app from './app'
import discover from './discover'
import recommend from './recommend'
import logo from './logo'
import logoDetail from './logoDetail'
import individuality from './individuality'
import album from './album'
import storySet from './storySet'
import userWork from './userWork'
import storySurround from './storySurround'
import readPlan from './readPlan'
import babyRead from './babyRead'
import storyTopic from './storyTopic'
import notice from './notice'
import admin from './admin'
import permission from './permission'
import storyWork from './storyWork'
import initImage from './initImage'
import icon from './icon'
import nativeWork from './nativeWork'
import opinion from './opinion'
import continuousLoginPrompt from './continuousLoginPrompt'
import destination from './destination'
import pushMessage from './pushMessage'
import worksTag from './worksTag'
import comment from './comment'
import feedbackTemplet from './feedbackTemplet'
import worksTagWork from './worksTagWork'
import userGoldAccount from './userGoldAccount'
import goldRewardRule from './goldRewardRule'
import rewardGoldPrompt from './rewardGoldPrompt'
import bill from './bill'

const reducer = combineReducers({
	user,
	story,
	storyTag,
	soundEffect,
	soundEffectTag,
	backgroundMusic,
	app,
	discover,
	recommend,
	logo,
	logoDetail,
	individuality,
	album,
	storySet,
	userWork,
	storySurround,
	readPlan,
	babyRead,
	storyTopic,
	notice,
	admin,
	permission,
	storyWork,
	initImage,
	icon,
	nativeWork,
	opinion,
	continuousLoginPrompt,
	destination,
	pushMessage,
	worksTag,
	comment,
	feedbackTemplet,
	worksTagWork,
	userGoldAccount,
	goldRewardRule,
	rewardGoldPrompt,
	bill
	// auth,
	// alliance,
	// affair,
	// announcement,
})

export default reducer
