import {actionNames} from 'action-utils'
import config from '../config'
import {notification} from 'antd'
import callAPIHOCFactory from 'callAPIHOCFactory'

const callAPIHOC = callAPIHOCFactory('worksTag')

export const GET_WORKSTAG = actionNames("GET_WORKSTAG")
export function getWorksTag(page,pageSize){
	return {
		types:GET_WORKSTAG,
		callAPI:callAPIHOC(page,pageSize)
	}
}

export function addWorksTag(formData){
	return dispatch => {
		return fetch(config.api.worksTag.add,{
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
				types:GET_WORKSTAG,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function editWorksTag(formData){
	return dispatch => {
		return fetch(config.api.worksTag.edit,{
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
				types:GET_WORKSTAG,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function deleteWorksTag(id){
	return dispatch => {
		return fetch(config.api.worksTag.delete(id),{
			method:'delete',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => res).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}
			dispatch({
				types:GET_WORKSTAG,
				callAPI:callAPIHOC()
			})
		})
	}
}
