import {actionNames} from 'action-utils'
import config from '../config'
import _ from 'lodash'
import callAPIHOCFactory from 'callAPIHOCFactory'
import {notification} from 'antd'

const callAPIHOC = callAPIHOCFactory('rewardGoldPrompt')

export const GET_REWARDGOLDPRMOPT = actionNames('GET_REWARDGOLDPRMOPT')
export function getRewardGoldPrompt(page,pageSize){
	return {
		types:GET_REWARDGOLDPRMOPT,
		callAPI:callAPIHOC(page,pageSize)
	}
}

export function addRewardGoldPrompt(formData) {
	return (dispatch,getState) => {
		return fetch(config.api.rewardGoldPrompt.add,{
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
				types:GET_REWARDGOLDPRMOPT,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function editRewardGoldPrompt(formData) {
	return (dispatch,getState) => {
		return fetch(config.api.rewardGoldPrompt.edit,{
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
				types:GET_REWARDGOLDPRMOPT,
				callAPI:callAPIHOC()
			})
		})
	}
}
