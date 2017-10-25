import {actionNames} from 'action-utils'
import config from '../config'
import _ from 'lodash'
import {notification} from 'antd'
import callAPIHOCFactory from 'callAPIHOCFactory'

const callAPIHOC = callAPIHOCFactory('initImage')

export const GET_INITIMAGE = actionNames('GET_INITIMAGE')
export function getInitImage(page,pageSize) {
	return {
		types:GET_INITIMAGE,
		callAPI:callAPIHOC(page,pageSize)
	}
}

export function addInitImage(formData){
	return dispatch => {
		return fetch(config.api.initImage.add,{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			},
			body:formData
		}).then(res => res.json()).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}
			return dispatch({
				types:GET_INITIMAGE,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function editInitImage(formData){
	return dispatch => {
		return fetch(config.api.initImage.edit,{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			},
			body:formData
		}).then(res => res.json()).then(res => {
			if(res.status == 2) {
				notification.error({message:res.errorMes})
			}
			return dispatch({
				types:GET_INITIMAGE,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function deleteInitImage(id) {
	return dispatch => {
		return fetch(config.api.initImage.delete(id),{
			method:'get',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => {
			return dispatch({
				types:GET_INITIMAGE,
				callAPI:callAPIHOC()
			})
		})
	}
}
