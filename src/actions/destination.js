import {actionNames} from 'action-utils'
import config from '../config'
import {notification} from 'antd'
import callAPIHOCFactory from 'callAPIHOCFactory'

const callAPIHOC = callAPIHOCFactory('destination')

export const GET_DESTINATION = actionNames("GET_DESTINATION")
export function getDestination(page,pageSize){
	return {
		types:GET_DESTINATION,
		callAPI:callAPIHOC(page,pageSize)
	}
}

export function addDestination(formData){
	return dispatch => {
		return fetch(config.api.destination.add,{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			},
			body:formData
		}).then(res => res.json()).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}
			dispatch({
				types:GET_DESTINATION,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function editDestination(formData){
	return dispatch => {
		return fetch(config.api.destination.edit,{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			},
			body:formData
		}).then(res => res.json()).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}
			dispatch({
				types:GET_DESTINATION,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function deleteDestination(id){
	return dispatch => {
		return fetch(config.api.destination.delete(id),{
			method:'delete',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => res).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}
			dispatch({
				types:GET_DESTINATION,
				callAPI:callAPIHOC()
			})
		})
	}
}
