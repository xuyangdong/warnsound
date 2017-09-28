import {actionNames} from 'action-utils'
import config from '../config'
import _ from 'lodash'
import callAPIHOCFactory from 'callAPIHOCFactory'
import {notification} from 'antd'

const callAPIHOC = callAPIHOCFactory('babyRead')

export const GET_BABYREAD = actionNames('GET_BABYREAD')
export function getBabyRead(page,pageSize){
	return {
		types:GET_BABYREAD,
		callAPI:callAPIHOC(page,pageSize)
	}
}

export function addBabyRead(formData){
	return dispatch => {
		return fetch(config.api.babyRead.add,{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			},
			body:formData
		}).then(res => res.json()).then(res => {
			dispatch({
				types:GET_BABYREAD,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function editBabyRead(formData){
	return dispatch => {
		return fetch(config.api.babyRead.edit,{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			},
			body:formData
		}).then(res => res.json()).then(res => {
			dispatch({
				types:GET_BABYREAD,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function deleteBabyRead(id){
	return dispatch => {
		return fetch(config.api.babyRead.delete(id),{
			method:'delete',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => res).then(res => {
			dispatch({
				types:GET_BABYREAD,
				callAPI:callAPIHOC()
			})
		})
	}
}
