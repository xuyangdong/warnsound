import {actionNames} from 'action-utils'
import config from '../config'

export const GET_SOUNDEFFECTTAG = actionNames("GET_SOUNDEFFECTTAG")
export function getSoundEffectTag(offset,limit){
	return {
		types:GET_SOUNDEFFECTTAG,
		callAPI:()=>{
			return fetch(config.api.soundEffectTag.get(offset,limit),{
				headers: {
			    	'authorization': sessionStorage.getItem('auth')
			    },
			}).then(res => res.json())
		}
	}
}
