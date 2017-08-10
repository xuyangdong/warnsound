import {GET_LOGODETAIL} from 'actions/logoDetail'
import {fromJS} from 'immutable'

const initialState = fromJS({
	loading:false,
	data:[]
})

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_LOGODETAIL[0]:
			return state.set('loading',true)
		case GET_LOGODETAIL[1]:
			return state.set('loading',false).set('data',fromJS(action.response))
		default:
			return state
	}
}
