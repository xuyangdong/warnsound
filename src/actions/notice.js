import {actionNames} from 'action-utils'
import config from '../config'
import _ from 'lodash'
import callAPIHOCFactory from 'callAPIHOCFactory'
import {notification} from 'antd'

const callAPIHOC = callAPIHOCFactory('notice')

export const GET_NOTICE = actionNames('GET_NOTICE')
export function getNotice(page,pageSize) {
	return {
		types:GET_NOTICE,
		callAPI:callAPIHOC(page,pageSize)
	}
}

export function addNotice(jsonData){
	return dispatch => {
		return fetch(config.api.notice.add,{
			method:'post',
			headers: {
				'authorization': sessionStorage.getItem('auth'),
				'content-type':'application/json'
			},
			body:JSON.stringify(jsonData)
		}).then(res => res.json()).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}
			return dispatch({
				types:GET_NOTICE,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function editNotice(jsonData,id){
	return dispatch => {
		return fetch(config.api.notice.edit(id),{
			method:'put',
			headers: {
				'authorization': sessionStorage.getItem('auth'),
				'content-type':'application/json'
			},
			body:JSON.stringify(jsonData)
		}).then(res => res.json()).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}
			return dispatch({
				types:GET_NOTICE,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function deleteNotice(id){
	return dispatch => {
		return fetch(config.api.notice.delete(id),{
			method:'delete',
			headers: {
				'authorization': sessionStorage.getItem('auth')
			}
		}).then(res => res).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}
			return dispatch({
				types:GET_NOTICE,
				callAPI:callAPIHOC()
			})
		})
	}
}
