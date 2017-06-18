import {actionNames} from 'action-utils'
import config from '../config'

export const GET_BACKGROUNDMUSIC = actionNames("GET_BACKGROUNDMUSIC")
export function getBackgroundMusic(offset,limit){
	return {
		types:GET_BACKGROUNDMUSIC,
		callAPI:()=>{
			return fetch(config.api.backgroundmusic.get(offset,limit),{
				headers: {
			    	'authorization': sessionStorage.getItem('auth')
			    },
			}).then(res => res.json())
		}
	}
}
