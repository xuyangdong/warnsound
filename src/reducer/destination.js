import {fromJS} from 'immutable'
import {GET_DESTINATION} from 'actions/destination'

const initialState = fromJS({
	loading:true,
	data:[]
})

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_DESTINATION[0]:
			return state.set('loading',true)
		case GET_DESTINATION[1]:
			return state.set('loading', false).set('data', fromJS(action.response||[])).set('otherData', fromJS(action.otherData))
		default:
			return state
	}
}
