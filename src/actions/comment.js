import {actionNames} from 'action-utils'
import config from '../config'
import _ from 'lodash'
import callAPIHOCFactory from 'callAPIHOCFactory'
import {notification} from 'antd'

const callAPIHOC = callAPIHOCFactory('comment')

export const GET_COMMENT = actionNames('GET_COMMENT')
export function getComment(page,pageSize,otherData){
	return {
		types:GET_COMMENT,
		callAPI:callAPIHOC(otherData)(page,pageSize)
	}
}

export function addJing(id){
	return (dispatch,getState) => {
		return fetch(config.api.comment.addJing(id),{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => res.json()).then(res => {
			if(res.status == 2){
				notification.error({
					message:res.errorMes
				})
			}
			dispatch({
				types:GET_COMMENT,
				callAPI:callAPIHOC({ambitusId:getState().getIn(['comment','otherData','ambitusId'])})()
			})
		})
	}

}

export function cancelJing(id){
	return (dispatch,getState) => {

		return fetch(config.api.comment.cancelJing(id),{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => res.json()).then(res => {
			if(res.status == 2){
				notification.error({
					message:res.errorMes
				})
			}
			dispatch({
				types:GET_COMMENT,
				callAPI:callAPIHOC({ambitusId:getState().getIn(['comment','otherData','ambitusId'])})()
			})
		})
	}
}

export function deleteComment(id){
	return (dispatch,getState) => {
		return fetch(config.api.comment.delete(id),{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => res.json()).then(res => {
			if(res.status == 2){
				notification.error({
					message:res.errorMes
				})
			}
			dispatch({
				types:GET_COMMENT,
				callAPI:callAPIHOC({ambitusId:getState().getIn(['comment','otherData','ambitusId'])})()
			})
		})
	}
}

export function removeBlackHouse(id){
	return (dispatch,getState) => {
		return fetch(config.api.comment.removeBlackHouse(id),{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => res.json()).then(res => {
			if(res.status == 2){
				notification.error({
					message:res.errorMes
				})
			}
			dispatch({
				types:GET_COMMENT,
				callAPI:callAPIHOC({ambitusId:getState().getIn(['comment','otherData','ambitusId'])})()
			})
		})
	}
}

export function addComment(formData) {
	return (dispatch,getState) => {
		return fetch(config.api.comment.add,{
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
				types:GET_COMMENT,
				callAPI:callAPIHOC({ambitusId:getState().getIn(['comment','otherData','ambitusId'])})()
			})
		})
	}
}
