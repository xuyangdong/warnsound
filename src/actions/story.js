import {actionNames} from 'action-utils'
import config from '../config'
import _ from 'lodash'
import {notification} from 'antd'

export const GET_STORIES = actionNames('GET_STORIES')
export function getStories(offset,limit){
	return {
		types:GET_STORIES,
		callAPI:()=>{
			return fetch(config.api.story.get(offset,limit),{
				headers: {
			    	'authorization': sessionStorage.getItem('auth')
			    },
			}).then(res => res.json())
		}
	}
}

export function addStory(formData){
	return dispatch => {
		return fetch(config.api.story.add,{
			method:'post',
			body: formData,
			headers: {
				'authorization': sessionStorage.getItem('auth')
			},
		}).then(res => res.json()).then(res => {
			dispatch({
				types:GET_STORIES,
				callAPI:()=>{
					return fetch(config.api.story.get(0,10),{
						headers: {
					    	'authorization': sessionStorage.getItem('auth')
					    },
					}).then(res => res.json())
				}
			})
		})
	}
}

export function editStory(formData,id){
	return dispatch => {
		return fetch(config.api.story.edit(id),{
			method:'post',
			body: formData,
			headers: {
				'authorization': sessionStorage.getItem('auth')
			},
		}).then(res => res.json()).then(res => {
			dispatch({
				types:GET_STORIES,
				callAPI:()=>{
					return fetch(config.api.story.get(0,10),{
						headers: {
					    	'authorization': sessionStorage.getItem('auth')
					    },
					}).then(res => res.json())
				}
			})
		})
	}
}
