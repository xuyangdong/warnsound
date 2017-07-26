import {fromJS} from 'immutable'
import {GET_BACKGROUNDMUSIC} from 'actions/backgroundMusic'

const initialValue = fromJS({loading: true, data: []})

export default(state = initialValue, action) => {
    switch (action.type) {
        case GET_BACKGROUNDMUSIC[0]:
            return state.set('loading', true)
        case GET_BACKGROUNDMUSIC[1]:
            return state.set('loading', false).set('data', fromJS(action.response)).set('otherData', fromJS(action.otherData))
        default:
            return state
    }
}
