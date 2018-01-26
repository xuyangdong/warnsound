import {fromJS,Map} from 'immutable'
import {GET_GOLDREWARDRULE} from 'actions/goldRewardRule'

const initialState = fromJS({
	loading:true,
	data:Map()
})

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_GOLDREWARDRULE[0]:
			return state.set('loading',true)
		case GET_GOLDREWARDRULE[1]:
			return state.set('loading', false).set('data', fromJS(action.response||Map())).set('otherData', fromJS(action.otherData))
		default:
			return state
	}
}
