import {actionNames} from 'action-utils'
import config from '../config'
import {notification} from 'antd'
import callAPIHOCFactory from 'callAPIHOCFactory'

const callAPIHOC = callAPIHOCFactory('continuousLoginPrompt')

export const GET_CONTINUOUSLOGINPROMPT = actionNames("GET_CONTINUOUSLOGINPROMPT")
export function getContinuousLoginPrompt(page,pageSize){
	return {
		types:GET_CONTINUOUSLOGINPROMPT,
		callAPI:callAPIHOC(page,pageSize)
	}
}

export function addContinuousLoginPrompt(formData){
	return dispatch => {
		return fetch(config.api.continuousLoginPrompt.add,{
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
				types:GET_CONTINUOUSLOGINPROMPT,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function editContinuousLoginPrompt(formData){
	return dispatch => {
		return fetch(config.api.continuousLoginPrompt.edit,{
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
				types:GET_CONTINUOUSLOGINPROMPT,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function deleteContinuousLoginPrompt(id){
	return dispatch => {
		return fetch(config.api.continuousLoginPrompt.delete(id),{
			method:'delete',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => res).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}
			dispatch({
				types:GET_CONTINUOUSLOGINPROMPT,
				callAPI:callAPIHOC()
			})
		})
	}
}
