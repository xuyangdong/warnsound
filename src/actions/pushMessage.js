import {actionNames} from 'action-utils'
import config from '../config'
import {notification} from 'antd'
import callAPIHOCFactory from 'callAPIHOCFactory'

const callAPIHOC = callAPIHOCFactory('pushMessage')

export const GET_PUSHMESSAGE = actionNames("GET_PUSHMESSAGE")
export function getPushMessage(page,pageSize){
	return {
		types:GET_PUSHMESSAGE,
		callAPI:callAPIHOC(page,pageSize)
	}
}

export function addPushMessage(formData){
	return dispatch => {
		return fetch(config.api.pushMessage.add,{
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
				types:GET_PUSHMESSAGE,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function editPushMessage(formData){
	return dispatch => {
		return fetch(config.api.pushMessage.edit,{
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
				types:GET_PUSHMESSAGE,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function deletePushMessage(id){
	return dispatch => {
		return fetch(config.api.pushMessage.delete(id),{
			method:'delete',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => res).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}
			dispatch({
				types:GET_PUSHMESSAGE,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function publishMessage(id,userid){
	return dispatch => {
		let formData = new FormData(id)
		if(userid){
			formData.append('userId',userid)
		}
		formData.append('id',id)
		return fetch(config.api.pushMessage.publish,{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			},
			body:formData
		}).then(res => res.json()).then(res => {
			if(res.status == 2){
				notification.error({
					message:res.errorMes
				})
			}
			dispatch({
				types:GET_PUSHMESSAGE,
				callAPI:callAPIHOC()
			})
		})
	}
}
