import {fromJS} from 'immutable'
import {GET_USERBILL} from 'actions/userGoldAccount'

const initialState = fromJS({
	loading:true,
	data:[]
})

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_USERBILL[0]:
			return state.set('loading',true)
		case GET_USERBILL[1]:
			return state.set('loading', false).set('data', fromJS(action.response||[])).set('otherData', fromJS(action.otherData))
		default:
			return state
	}
}
