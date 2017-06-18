import {fromJS} from 'immutable'
import {
	GET_SOUNDEFFECTTAG
} from 'actions/soundEffectTag'

const initialValue = fromJS({
	loading:true,
	data:[]
})

export default (state = initialValue, action) => {
	switch (action.type) {
		case GET_SOUNDEFFECTTAG[0]:
			return state.set('loading',true)
		case GET_SOUNDEFFECTTAG[1]:
			return state.set('loading',false).set('data',fromJS(action.response))
		default:
			return state
	}
}
