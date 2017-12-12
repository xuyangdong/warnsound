import {fromJS} from 'immutable'
import {GET_OPINION} from 'actions/opinion'

const initialState = fromJS({
	loading:true,
	data:[]
})

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_OPINION[0]:
			return state.set('loading',true)
		case GET_OPINION[1]:
			return state.set('loading', false).set('data', fromJS(action.response)).set('otherData', fromJS(action.otherData))
		default:
			return state
	}
}
