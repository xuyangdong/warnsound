import {actionNames} from 'action-utils'
import config from '../config'
import {notification} from 'antd'

export const GET_STORYTAGS = actionNames('GET_STORYTAGS')
export function getStoryTags(offset,limit){
	return {
		types:GET_STORYTAGS,
		callAPI:() => {
			return fetch(config.api.storyTag.get((offset-1)*limit,limit),{
				headers: {
			    	'authorization': sessionStorage.getItem('auth')
			    },
			}).then(res => res.json()).then(res => {
				if(res.status!=1){
					notification.error({message:'服务器出错'})
				}
				return res
			})
		}
	}
}

export function addStoryTag(formData){
	return dispatch => {
		return fetch(config.api.storyTag.add,{
			method:'post',
			body:formData,
			headers: {
				'authorization': sessionStorage.getItem('auth')
			},
		}).then(res => res.json()).then(res => {
			// if(res.status!=1){
			// 	notification.error({message:'服务器出错'})
			// }
			return res
		}).then(res => {
			dispatch({
				types:GET_STORYTAGS,
				callAPI:() => {
					return fetch(config.api.storyTag.get(0,10),{
						headers: {
					    	'authorization': sessionStorage.getItem('auth')
					    },
					}).then(res => res.json()).then(res => {
						if(res.status!=1){
							notification.error({message:'服务器出错'})
						}
						return res
					})
				}
			})
		})
	}
}

export function editStoryTag(formData,id){
	return dispatch => {
		return fetch(config.api.storyTag.edit(id),{
			method:'post',
			body:formData,
			headers: {
				'authorization': sessionStorage.getItem('auth')
			},
		}).then(res => res.json()).then(res => {
			// if(res.status!=1){
			// 	notification.error({message:'服务器出错'})
			// }
			return res
		}).then(res => {
			dispatch({
				types:GET_STORYTAGS,
				callAPI:() => {
					return fetch(config.api.storyTag.get(0,10),{
						headers: {
					    	'authorization': sessionStorage.getItem('auth')
					    },
					}).then(res => res.json()).then(res => {
						if(res.status!=1){
							notification.error({message:'服务器出错'})
						}
						return res
					})
				}
			})
		})
	}
}

export function deleteStoryTag(id){
	return dispatch => {
		return fetch(config.api.storyTag.delete(id),{
			method:'delete',
			headers: {
				'authorization': sessionStorage.getItem('auth')
			},
		}).then(res => res).then(res => {
			// if(res.status!=1){
			// 	notification.error({message:'服务器出错'})
			// }
			notification.success({message:'删除成功'})
			return res
		}).then(res => {
			dispatch({
				types:GET_STORYTAGS,
				callAPI:() => {
					return fetch(config.api.storyTag.get(0,10),{
						headers: {
					    	'authorization': sessionStorage.getItem('auth')
					    },
					}).then(res => res.json()).then(res => {
						if(res.status!=1){
							notification.error({message:'服务器出错'})
						}
						return res
					})
				}
			})
		})
	}
}
