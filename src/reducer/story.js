import {
	GET_STORIES
} from 'actions/story'
import {fromJS} from 'immutable'

const initialState = fromJS({
	loading:true,
	data:[]
})

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_STORIES[0]:
			return state.set('loading',true)
		case GET_STORIES[1]:
			return state.set('loading',false).set('data',fromJS(action.response))
		default:
			return state
	}
}
