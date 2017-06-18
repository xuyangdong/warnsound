import {fromJS} from 'immutable'
import {
	GET_STORYTAGS
} from 'actions/storyTag'

const initialState = fromJS({
	loading:true,
	data:[]
})

export default (state = initialState, action) => {
	switch (action.type){
		case GET_STORYTAGS[0]:
			return state.set('loading',true)
		case GET_STORYTAGS[1]:
			return state.set('loading',false).set('data',fromJS(action.response))
		default:
			return state

	}
}
