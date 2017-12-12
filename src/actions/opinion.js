import {actionNames} from 'action-utils'
import config from '../config'
import _ from 'lodash'
import callAPIHOCFactory from 'callAPIHOCFactory'
import {notification} from 'antd'

const callAPIHOC = callAPIHOCFactory('opinion')

export const GET_OPINION = actionNames('GET_OPINION')
export function getOpinion(page,pageSize) {
	return {
		types:GET_OPINION,
		callAPI:callAPIHOC(page,pageSize)
	}
}

export function addOpinion(formData){
	return dispatch => {
		return fetch(config.api.opinion.add,{
			method:'post',
			headers: {
				'authorization': sessionStorage.getItem('auth')
			},
			body:formData
		}).then(res => res.json()).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}
			return dispatch({
				types:GET_OPINION,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function editOpinion(formData,id){
	return dispatch => {
		return fetch(config.api.opinion.edit(id),{
			method:'put',
			headers: {
				'authorization': sessionStorage.getItem('auth')
			},
			body:formData
		}).then(res => res.json()).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}
			return dispatch({
				types:GET_OPINION,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function deleteOpinion(id){
	return dispatch => {
		return fetch(config.api.opinion.delete(id),{
			method:'delete',
			headers: {
				'authorization': sessionStorage.getItem('auth')
			}
		}).then(res => res).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}
			return dispatch({
				types:GET_OPINION,
				callAPI:callAPIHOC()
			})
		})
	}
}
