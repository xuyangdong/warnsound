import {fromJS} from 'immutable'
import {GET_USERWORK,GET_WORKUSERINFO} from 'actions/userWork'
const initialState = fromJS({
	loading:true,
	user:{},
	data:[]
})

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_USERWORK[0]:
			return state.set('loading',true)
		case GET_USERWORK[1]:
			return state.set('loading', false).set('data', fromJS(action.response)).set('otherData', fromJS(action.otherData))
		case GET_WORKUSERINFO:
			return state.set('user',fromJS({
				info:action.payload.obj,
				badgeList:action.payload.badgeList
			}))
		default:
			return state
	}
}
