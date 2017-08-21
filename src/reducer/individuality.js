import {GET_INDIVIDUALITY} from 'actions/individual'
import {fromJS} from 'immutable'

const initialState = fromJS({
	loading:true,
	data: []
})

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_INDIVIDUALITY[0]:
			return state.set('loading',true)
		case GET_INDIVIDUALITY[1]:
			return state.set('loading', false).set('data', fromJS(action.response)).set('otherData', fromJS(action.otherData))
		default:
			return state

	}
}
