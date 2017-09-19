import {LOGIN_SUCCESS, LOGOUT_SUCCESS,GET_USER} from '../actions/user'
import {fromJS} from 'immutable'

const initialState = fromJS({
    auth: sessionStorage.getItem('auth')||'',
    permission:fromJS((sessionStorage.getItem('permission')||'').split(',')||[]),
    data:fromJS([]),
    loading:true
})

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
        case GET_USER[0]:
            return state.set('loading',true)
        case GET_USER[1]:
            return state.set('loading', false).set('data', fromJS(action.response)).set('otherData', fromJS(action.otherData))
        default:
            return state
    }
}
