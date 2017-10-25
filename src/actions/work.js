import {actionNames} from 'action-utils'
import config from '../config'
import _ from 'lodash'
import {notification} from 'antd'
import callAPIHOCFactory from 'callAPIHOCFactory'

const callAPIHOC = callAPIHOCFactory('work')

export const GET_STORYTOPIC = actionNames('GET_STORYTOPIC')
export function getStoryTopic(page,pageSize) {
	return {
		types:GET_STORYTOPIC,
		callAPI:callAPIHOC(page,pageSize)
	}
}

export function addStoryTopic(formData){
	return dispatch => {
		return fetch(config.api.storyTopic.add,{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			},
			body:formData
		}).then(res => res.json()).then(res => {
			if(res.state == 2){
				notification.error({message:res.errorMes})
			}
			return dispatch({
				types:GET_STORYTOPIC,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function editStoryTopic(formData){
	return dispatch => {
		return fetch(config.api.storyTopic.edit,{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			},
			body:formData
		}).then(res => res.json()).then(res => {
			if(res.statue == 2) {
				notification.error({message:res.errorMes})
			}
			return dispatch({
				types:GET_STORYTOPIC,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function deleteStoryTopic(id) {
	return dispatch => {
		return fetch(config.api.storyTopic.delete(id),{
			method:'delete',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => {
			return dispatch({
				types:GET_STORYTOPIC,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function topStoryTopic(id) {
	return dispatch => {
		return fetch(config.api.storyTopic.top(id),{
			method:'get',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => {
			return dispatch({
				types:GET_STORYTOPIC,
				callAPI:callAPIHOC()
			})
		})
	}
}
