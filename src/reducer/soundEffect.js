import {fromJS} from 'immutable'
import {GET_SOUNDEFFECT} from 'actions/soundEffect'

const initialValue = fromJS({loading: true, data: []})

export default(state = initialValue, action) => {
    switch (action.type) {
        case GET_SOUNDEFFECT[0]:
            return state.set('loading', true)
        case GET_SOUNDEFFECT[1]:
            return state.set('loading', false).set('data', fromJS(action.response).set('otherData', fromJS(action.otherData)))
        default:
            return state
    }
}
