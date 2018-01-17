import {actionNames} from 'action-utils'
import config from '../config'
import _ from 'lodash'
import callAPIHOCFactory from 'callAPIHOCFactory'
import {notification} from 'antd'

const callAPIHOC = callAPIHOCFactory('feedbackTemplet')

export const GET_FEEDBACKTEMPLET = actionNames('GET_FEEDBACKTEMPLET')
export function getFeedbackTemplet(page,pageSize){
	return {
		types:GET_FEEDBACKTEMPLET,
		callAPI:callAPIHOC(page,pageSize)
	}
}

export function addFeedbackTemplet(formData){
	return dispatch => {
		return fetch(config.api.feedbackTemplet.add,{
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
					types:GET_FEEDBACKTEMPLET,
					callAPI:callAPIHOC()
				})
			}
		})
	}
}

export function editFeedbackTemplet(formData){
	return dispatch => {
		return fetch(config.api.feedbackTemplet.edit,{
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
					types:GET_FEEDBACKTEMPLET,
					callAPI:callAPIHOC()
				})
			}
		})
	}
}

export function deleteFeedbackTemplet(id){
	return dispatch => {
		return fetch(config.api.feedbackTemplet.delete(id),{
			method:'delete',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => res.json()).then(res => {
			if(res.status==2){
				notification.error({message:res.errorMes})
			}else{
				dispatch({
					types:GET_FEEDBACKTEMPLET,
					callAPI:callAPIHOC()
				})
			}
		})
	}
}
