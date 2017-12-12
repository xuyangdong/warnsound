import {actionNames} from 'action-utils'
import config from '../config'
import _ from 'lodash'
import {notification} from 'antd'
import callAPIHOCFactory from 'callAPIHOCFactory'

const callAPIHOC = callAPIHOCFactory('storySurround')

export const GET_STORYSURROUND = actionNames('GET_STORYSURROUND')
export function getStorySurround(page,pageSize,storyId=''){
	return {
		types:GET_STORYSURROUND,
		callAPI:callAPIHOC({storyId:storyId})(page,pageSize)
	}
}

export function addStorySurround(formData){
	return dispatch => {
		return fetch(config.api.storySurround.add,{
			method:'post',
			headers: {
				'authorization': sessionStorage.getItem('auth')
			},
			body:formData
		}).then(res => res.json()).then(res => {
			if(res.status == 2){
				notification.error({
					message:res.errorMes
				})
			}
			dispatch({
				types:GET_STORYSURROUND,
				callAPI:callAPIHOC()
			})
		}).catch(err => {
			notification.error({message:err})
		})
	}
}

export function deleteStorySurround(id){
	return dispatch => {
		return fetch(config.api.storySurround.delete(id),{
			method:'delete',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => {
			dispatch({
				types:GET_STORYSURROUND,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function editStorySurround(formData){
	return dispatch => {
		return fetch(config.api.storySurround.edit,{
			method:'post',
			headers: {
				'authorization': sessionStorage.getItem('auth')
			},
			body:formData
		}).then(res => res.json()).then(res => {
			dispatch({
				types:GET_STORYSURROUND,
				callAPI:callAPIHOC()
			})
		})
	}
}
