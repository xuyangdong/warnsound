import {actionNames} from 'action-utils'
import config from '../config'

export const GET_SOUNDEFFECT = actionNames("GET_SOUNDEFFECT")
export function getSoundEffect(offset,limit){
	return {
		types:GET_SOUNDEFFECT,
		callAPI:()=>{
			return fetch(config.api.soundEffect.get(offset,limit),{
				headers: {
			    	'authorization': sessionStorage.getItem('auth')
			    },
			}).then(res => res.json())
		}
	}
}
