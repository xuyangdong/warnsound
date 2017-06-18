import {
	LOGIN_SUCCESS
} from '../actions/user'
import {fromJS} from 'immutable'

const initialState = fromJS({
	auth: sessionStorage.getItem('auth')
})

export default (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			sessionStorage.setItem('auth', action.payload.accessToken)
			return state.set('auth', action.payload.accessToken)
		default:
			return state
	}
}
