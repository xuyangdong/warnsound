import {LOGIN_SUCCESS, LOGOUT_SUCCESS} from '../actions/user'
import {fromJS} from 'immutable'

const initialState = fromJS({auth: sessionStorage.getItem('auth')||'',permission:fromJS((sessionStorage.getItem('permission')||'').split(',')||[])})

export default(state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            sessionStorage.setItem('auth', action.payload.accessToken);
            sessionStorage.setItem('permission', action.payload.powerCodeList);
            return state.set('auth', action.payload.accessToken).set('permission',fromJS(action.payload.powerCodeList))
        case LOGOUT_SUCCESS:
            sessionStorage.setItem('auth', '');
            sessionStorage.clear();
            return state.set('auth', '')
        default:
            return state
    }
}
