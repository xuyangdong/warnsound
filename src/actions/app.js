import {actionNames} from 'action-utils'
import config from '../config'
import {notification} from 'antd'

export const GET_APPLIST = actionNames('GET_APPLIST')
export function getAppList(offset,limit){
	return {
		types:GET_APPLIST,
		callAPI:() => {
			return fetch(config.api.app.get((offset-1)*limit,limit),{
				headers: {
					'authorization': sessionStorage.getItem('auth')
				}
			}).then(res => res.json()).then(res => {
				if(res.status!=1){
					notification.error({message:'服务器出错'})
				}
				return res
			})
		}
	}
}

export function addApp(formdata){
	return dispatch => {
		return fetch(config.api.app.add,{
			method: 'post',
            body: formdata,
			headers: {
				'authorization': sessionStorage.getItem('auth')
			}
		}).then(res => res.json()).then(res => {
			if(res.status!=1){
				notification.error({message:'服务器出错'})
			}
			return res
		}).then(res => {
			return dispatch({
				type:GET_APPLIST,
				callAPI:() => {
					return fetch(config.api.app.get(0,10),{
						headers: {
							'authorization': sessionStorage.getItem('auth')
						}
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

export function deleteApp(id) {
	return dispatch => {
		let formData = new FormData()
		formData.append('appId',id)
		return fetch(config.api.app.delete,{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			},
			body:formData
		}).then(res => res.json()).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}
			return dispatch({
				type:GET_APPLIST,
				callAPI:() => {
					return fetch(config.api.app.get(0,10),{
						headers: {
							'authorization': sessionStorage.getItem('auth')
						}
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

export function updateApp(formdata,id){
	formdata.append('appId',id)
	return dispatch => {
		return fetch(config.api.app.edit,{
			method: 'post',
            body: formdata,
			headers: {
				'authorization': sessionStorage.getItem('auth')
			}
		}).then(res => res.json()).then(res => {
			if(res.status!=1){
				notification.error({message:'服务器出错'})
			}
			return res
		}).then(res => {
			return dispatch({
				type:GET_APPLIST,
				callAPI:() => {
					return fetch(config.api.app.get(0,10),{
						headers: {
							'authorization': sessionStorage.getItem('auth')
						}
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

export function getLowestVersion(){
	return fetch(config.api.app.lowestVersion.get,{
		headers:{
			authorization:sessionStorage.getItem('auth')
		}
	}).then(res => res.json()).then(res => {
		if(res.status == 2){
			notification.error({message:res.errorMes})
		}
		return res
	})
}

export function setLowestVersion(id){
	let formData = new FormData()
	formData.append('id',id)
	return fetch(config.api.app.lowestVersion.add,{
		method:'post',
		headers:{
			'authorization':sessionStorage.getItem('auth')
		},
		body:formData
	}).then(res => res.json()).then(res => {
		if(res.status == 2){
			notification.error({message:res.errorMes})
		}else{
			notification.success({message:'设置成功'})
		}
		return getLowestVersion()
	})
}
