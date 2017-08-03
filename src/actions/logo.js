import {actionNames} from 'action-utils'
import config from '../config'
import _ from 'lodash'
import {notification} from 'antd'

export const GET_LOGOS = actionNames('GET_LOGOS')
export function getLogo(){
	return {
        types: GET_LOGOS,
        callAPI: (getState) => {
            return fetch(config.api.story.get((offset-1)*limit, limit, query), {
                headers: {
                    'authorization': sessionStorage.getItem('auth')
                },
                redirect: 'manual'
            }).then(res => {
                return res
            }).then(res => res.json()).then(res => {
				if(res.status==2){
					notification.error({message:res.errorMes})
				}
                res.offset = offset
                res.limit = limit
				return res
			})
        }
    }
}
