import {actionNames} from 'action-utils'
import config from '../config'
import _ from 'lodash'
import {notification} from 'antd'

export const GET_LOGOS = actionNames('GET_LOGOS')
export function getLogo(page,pageSize){
	return {
        types: GET_LOGOS,
        callAPI: (getState) => {
            return fetch(config.api.logo.get(page,pageSize),{
				headers: {
                    'authorization': sessionStorage.getItem('auth')
                },
			}).then(res => {
				return res
			}).then(res => res.json()).then(res => {
				if(res.status == 2){
					notification.error({message: res.error})
				}
				res.offset = page,
				res.limit = pageSize
				return res
			})
        }
    }
}
