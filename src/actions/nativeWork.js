import {actionNames} from 'action-utils'
import config from '../config'
import _ from 'lodash'
import callAPIHOCFactory from 'callAPIHOCFactory'
import {notification} from 'antd'

const callAPIHOC = callAPIHOCFactory('nativeWork')

export const GET_NAVITEWORK = actionNames('GET_NAVITEWORK')
export function getNativeWork(page,pageSize,configData){
	return {
		types:GET_NAVITEWORK,
		callAPI:callAPIHOC(configData)(page,pageSize)
	}
}

export function addNativeWork(formData){
	return dispatch => {
		return fetch(config.api.nativeWork.add,{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			},
			body:formData
		}).then(res => res.json()).then(res => {
			if(res.status==2){
				notification.error({message:res.errorMes})
			}else{
				dispatch({
					types:GET_NAVITEWORK,
					callAPI:callAPIHOC()
				})
			}
		})
	}
}

export function editNativeWork(formData){
	return dispatch => {
		return fetch(config.api.nativeWork.edit,{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			},
			body:formData
		}).then(res => res.json()).then(res => {
			if(res.status==2){
				notification.error({message:res.errorMes})
			}else{
				dispatch({
					types:GET_NAVITEWORK,
					callAPI:callAPIHOC()
				})
			}
		})
	}
}

export function deleteNativeWork(id){
	return dispatch => {
		return fetch(config.api.nativeWork.delete(id),{
			method:'delete',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => res.json()).then(res => {
			if(res.status==2){
				notification.error({message:res.errorMes})
			}else{
				dispatch({
					types:GET_NAVITEWORK,
					callAPI:callAPIHOC()
				})
			}
		})
	}
}
