import {actionNames} from 'action-utils'
import config from '../config'
import {notification} from 'antd'
import callAPIHOCFactory from 'callAPIHOCFactory'

const callAPIHOC = type => {
	return getState => {
		let _type = type||getState().getIn(['goldRewardRule','otherData','typeName'],type)
		return fetch(config.api.goldRewardRule.get(type),{
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => res.json()).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}
			res.typeName = type
			return res
		})
	}
}

export const GET_GOLDREWARDRULE = actionNames("GET_GOLDREWARDRULE")
export function getGoldRewardRuleByType(type){
	return {
		types:GET_GOLDREWARDRULE,
		callAPI:callAPIHOC(type)
	}
}

export function addGoldRewardRule(formData){
	return dispatch => {
		return fetch(config.api.goldRewardRule.add,{
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
				types:GET_GOLDREWARDRULE,
				callAPI:callAPIHOC()
			})
		})
	}
}

export function editGoldRewardRule(formData){
	return dispatch => {
		return fetch(config.api.goldRewardRule.edit,{
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
				types:GET_GOLDREWARDRULE,
				callAPI:callAPIHOC()
			})
		})
	}
}
