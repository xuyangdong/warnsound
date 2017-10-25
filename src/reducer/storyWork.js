import {fromJS} from 'immutable'
import {GET_STORYWORK,GET_STORYWORKINFO} from 'actions/storyWork'
const initialState = fromJS({
	loading:true,
	story:{},
	data:[]
})

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_STORYWORK[0]:
			return state.set('loading',true)
		case GET_STORYWORK[1]:
			return state.set('loading', false).set('data', fromJS(action.response)).set('otherData', fromJS(action.otherData))
		case GET_STORYWORKINFO:
			return state.set('story',fromJS(action.payload))
		default:
			return state
	}
}
