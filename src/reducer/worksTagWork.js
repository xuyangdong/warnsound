import {fromJS} from 'immutable'
import {GET_WORKSTAGWORK,GET_WORKWORKSTAGINFO} from 'actions/worksTagWork'
const initialState = fromJS({
	loading:true,
	worksTag:{},
	data:[]
})

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_WORKSTAGWORK[0]:
			return state.set('loading',true)
		case GET_WORKSTAGWORK[1]:
			return state.set('loading', false).set('data', fromJS(action.response)).set('otherData', fromJS(action.otherData))
		case GET_WORKWORKSTAGINFO:
			return state.set('worksTag',fromJS({
				info:action.payload.obj,
				badgeList:action.payload.badgeList
			}))
		default:
			return state
	}
}
