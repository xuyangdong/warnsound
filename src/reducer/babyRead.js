import { GET_BABYREAD } from 'actions/babyRead'
import {fromJS} from 'immutable'

const initialState = fromJS({
	loading:true,
	data:[]
})

export default (state = initialState , action) => {
	switch (action.type) {
		case GET_BABYREAD[0]:
			return state.set('loading',true)
		case GET_BABYREAD[1]:
			return state.set('loading', false).set('data', fromJS(action.response)).set('otherData', fromJS(action.otherData))
		default:
			return state
	}
}
