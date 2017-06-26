import {actionNames} from 'action-utils'
import config from '../config'

export const GET_APPLIST = actionNames('GET_APPLIST')
export function getAppList(offset,limit){
	return {
		types:GET_APPLIST,
		callAPI:() => {
			return fetch(config.api.app.get(offset,limit),{
				headers: {
					'authorization': sessionStorage.getItem('auth')
				}
			}).then(res => res.json())
		}
	}
}
