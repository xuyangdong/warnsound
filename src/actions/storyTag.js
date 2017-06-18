import {actionNames} from 'action-utils'
import config from '../config'

export const GET_STORYTAGS = actionNames('GET_STORYTAGS')
export function getStoryTags(offset,limit){
	return {
		types:GET_STORYTAGS,
		callAPI:() => {
			return fetch(config.api.storyTag.get(offset,limit),{
				headers: {
			    	'authorization': sessionStorage.getItem('auth')
			    },
			}).then(res => res.json())
		}
	}
}

export function addStoryTag(formData){
	return dispatch => {
		return fetch(config.api.storyTag.add,{
			method:'post',
			body:formData,
			headers: {
				'authorization': sessionStorage.getItem('auth')
			},
		}).then(res => res.json()).then(res => {
			dispatch({
				types:GET_STORYTAGS,
				callAPI:() => {
					return fetch(config.api.storyTag.get(0,10),{
						headers: {
					    	'authorization': sessionStorage.getItem('auth')
					    },
					}).then(res => res.json())
				}
			})
		})
	}
}
