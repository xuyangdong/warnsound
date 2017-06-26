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

const reducer = combineReducers({
	user,
	story,
	storyTag,
	soundEffect,
	soundEffectTag,
	backgroundMusic,
	app
	// auth,
	// alliance,
	// affair,
	// announcement,
})

export default reducer
