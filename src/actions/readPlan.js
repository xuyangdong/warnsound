import {actionNames} from 'action-utils'
import config from '../config'
import _ from 'lodash'
import callAPIHOCFactory from 'callAPIHOCFactory'
import {notification} from 'antd'

const callAPIHOC = callAPIHOCFactory('readPlan')

export const GET_READPLAN = actionNames('GET_READPLAN')
export function getReadPlan(page,pageSize) {
	return {
		types:GET_READPLAN,
		callAPI:callAPIHOC(page,pageSize)
	}
}

export function addReadPlan(formData){
	return dispatch => {
		return fetch(config.api.readPlan.add,{
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
				types:GET_READPLAN,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function editReadPlan(formData){
	return dispatch => {
		return fetch(config.api.readPlan.edit,{
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
				types:GET_READPLAN,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function deleteReadPlan(id) {
	return dispatch => {
		return fetch(config.api.readPlan.delete(id),{
			method:'delete',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => {
			return res
		})
	}
}
