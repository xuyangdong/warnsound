import {actionNames} from 'action-utils'
import config from '../config'
import {notification} from 'antd'

export const GET_RECOMMEND = actionNames('GET_RECOMMEND')
export function getRecommend(offset,limit){
	return {
		types: GET_RECOMMEND,
		callAPI: () => {
			return fetch(config.api.recommend.get((offset-1)*limit<0?0:(offset-1)*limit,limit),{
				headers: {
                    'authorization': sessionStorage.getItem('auth')
                },
			}).then(res => res.json())
		}
	}
}
