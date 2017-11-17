import {actionNames} from 'action-utils'
import config from '../config'
import _ from 'lodash'
import {notification} from 'antd'

export function getAllStorySet(page,pageSize,query){
	let formData = new FormData()
	formData.append('page',page)
	formData.append('pageSize',pageSize)
	formData.append('query',query)
	return fetch(config.api.storySet.get(page,pageSize,query),{
		method:'post',
		headers: {
			'authorization': sessionStorage.getItem('auth')
		},
		body:formData
	}).then(res => res.json())
}

export const GET_STORYSET = actionNames('GET_STORYSET')
export function getStorySet(page,pageSize,query=''){
	return {
		types:GET_STORYSET,
		callAPI:() => {
			let formData = new FormData()
			formData.append('page',page)
			formData.append('pageSize',pageSize)
			formData.append('query',query)
			return fetch(config.api.storySet.get(page,pageSize,query),{
				method:'post',
				headers: {
			    	'authorization': sessionStorage.getItem('auth')
			    },
				body:formData
			}).then(res => res.json()).then(res => {
				if(res.status!=1){
					notification.error({message:'服务器出错'})
				}
				res.offset = page
                res.limit = pageSize
				res.query = query
				return res
			})
		}
	}
}

export function addStorySet(jsonData){
	return dispatch => {
		return fetch(config.api.storySet.add,{
			method:'post',
			headers:{
				authorization:sessionStorage.getItem('auth'),
				'content-type':'application/json'
			},
			body:JSON.stringify(jsonData)
		}).then(res => res.json()).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}
			dispatch({
				types:GET_STORYSET,
				callAPI:(getState) => {
					const state = getState()
					const offset = state.getIn(['storySet','otherData','offset'])
					const limit = state.getIn(['storySet','otherData','limit'])
					return fetch(config.api.storySet.get(offset,limit),{
						headers: {
					    	'authorization': sessionStorage.getItem('auth')
					    },
					}).then(res => res.json()).then(res => {
						if(res.status!=1){
							notification.error({message:'服务器出错'})
						}
						res.offset = offset
		                res.limit = limit
						return res
					})
				}
			})
		})
	}
}

export function editStorySet(jsonData,id){
	return dispatch => {
		return fetch(config.api.storySet.edit(id),{
			method:'put',
			headers:{
				authorization:sessionStorage.getItem('auth'),
				'content-type':'application/json'
			},
			body:JSON.stringify(jsonData)
		}).then(res => res.json()).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}
			dispatch({
				types:GET_STORYSET,
				callAPI:(getState) => {
					const state = getState()
					const offset = state.getIn(['storySet','otherData','offset'])
					const limit = state.getIn(['storySet','otherData','limit'])
					return fetch(config.api.storySet.get(offset,limit),{
						headers: {
					    	'authorization': sessionStorage.getItem('auth')
					    },
					}).then(res => res.json()).then(res => {
						if(res.status!=1){
							notification.error({message:'服务器出错'})
						}
						res.offset = offset
		                res.limit = limit
						return res
					})
				}
			})
		})
	}
}

export function deleteStorySet(id){
	return dispatch => {
		return fetch(config.api.storySet.delete(id),{
			method:'delete',
			headers:{
				authorization:sessionStorage.getItem('auth')
			},
		}).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}
			dispatch({
				types:GET_STORYSET,
				callAPI:(getState) => {
					const state = getState()
					const offset = state.getIn(['storySet','otherData','offset'])||0
                    const limit = state.getIn(['storySet','otherData','limit'])||10
					return fetch(config.api.storySet.get(offset,limit),{
						headers: {
					    	'authorization': sessionStorage.getItem('auth')
					    },
					}).then(res => res.json()).then(res => {
						if(res.status!=1){
							notification.error({message:'服务器出错'})
						}
						res.offset = offset
		                res.limit = limit
						return res
					})
				}
			})
		})
	}
}
