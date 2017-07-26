import {actionNames} from 'action-utils'
import config from '../config'
import {notification} from 'antd'

export const GET_DISCOVERLIST = actionNames('GET_DISCOVERLIST')
export function getDiscoverList(offset,limit){
	return {
		types:GET_DISCOVERLIST,
		callAPI:() => {
			return fetch(config.api.discover.get((offset-1)*limit,limit),{
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

export function addDiscover(formData){
	return dispatch => {
		return fetch(config.api.discover.add,{
			headers: {
				'authorization': sessionStorage.getItem('auth')
			},
			method:'POST',
			body:formData
		}).then(res => res.json()).then(res => {
			// if(res.status!=1){
			// 	notification.error({message:'服务器出错'})
			// }
			return res
		}).then(res => {
			return dispatch({
				types:GET_DISCOVERLIST,
				callAPI:() => {
					return fetch(config.api.discover.get(0,10),{
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

export function editDiscover(formData,id){
	formData.append('id',id)
	return dispatch => {
		return fetch(config.api.discover.edit,{
			headers: {
				'authorization': sessionStorage.getItem('auth')
			},
			method:'POST',
			body:formData
		}).then(res => res.json()).then(res => {
			// if(res.status!=1){
			// 	notification.error({message:'服务器出错'})
			// }
			return res
		}).then(res => {
			return dispatch({
				types:GET_DISCOVERLIST,
				callAPI:() => {
					return fetch(config.api.discover.get(0,10),{
						headers: {
							'authorization': sessionStorage.getItem('auth')
						},
					}).then(res => res.json()).then(res => {
						// if(res.status!=1){
						// 	notification.error({message:'服务器出错'})
						// }
						return res
					})
				}
			})
		})
	}
}
