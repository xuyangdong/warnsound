import {actionNames} from 'action-utils'
import config from '../config'
import _ from 'lodash'
import {notification} from 'antd'

export const GET_LOGOS = actionNames('GET_LOGOS')
export function getLogo(page,pageSize){
	return {
        types: GET_LOGOS,
        callAPI: (getState) => {
            return fetch(config.api.logo.get(page,pageSize),{
				headers: {
                    'authorization': sessionStorage.getItem('auth')
                },
			}).then(res => {
				return res
			}).then(res => res.json()).then(res => {
				if(res.status == 2){
					notification.error({message: res.error})
				}
				res.offset = page,
				res.limit = pageSize
				return res
			})
        }
    }
}

export function createLogo(jsonData){
	return dispatch => {
		return fetch(config.api.logo.add,{
			method: 'post',
            body: JSON.stringify(jsonData),
			headers: {
				'authorization': sessionStorage.getItem('auth'),
				'content-type':'application/json'
			}
		}).then(res => res.json()).then(res => {
			if(res.status==2){
				notification.error({message:'服务器出错'})
			}
			return res
		}).then(res => {
			return dispatch({
				type:GET_LOGOS,
				callAPI:() => {
					return fetch(config.api.logo.get(0,10),{
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

export function deleteLogo(id){
	return dispatch => {
		return fetch(config.api.logo.delete(id),{
			method: 'delete',
			headers: {
				'authorization': sessionStorage.getItem('auth')
			}
		}).then(res => res).then(res => {
			if(res.status==2){
				notification.error({message:'服务器出错'})
			}
			return res
		}).then(res => {
			return dispatch({
				type:GET_LOGOS,
				callAPI:() => {
					return fetch(config.api.logo.get(0,10),{
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


export function getLogoDetail(id){
	return fetch(config.api.logo.detail.query(id),{
		headers: {
			'authorization': sessionStorage.getItem('auth')
		}
	}).then(res => res.json())
}
