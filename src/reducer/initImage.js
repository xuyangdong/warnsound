import {GET_INITIMAGE} from 'actions/initImage'
import {fromJS} from 'immutable'

const initialState = fromJS({
	loading:true,
	data:[]
})

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_INITIMAGE[0]:
			return state.set('loading',true)
		case GET_INITIMAGE[1]:
			return state.set('loading', false).set('data', fromJS(action.response)).set('otherData', fromJS(action.otherData))
		default:
			return state
	}
}
