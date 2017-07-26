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

const reducer = combineReducers({
	user,
	story,
	storyTag,
	soundEffect,
	soundEffectTag,
	backgroundMusic,
	app,
	discover,
	recommend
	// auth,
	// alliance,
	// affair,
	// announcement,
})

export default reducer
