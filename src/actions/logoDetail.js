import {actionNames} from 'action-utils'
import config from '../config'
import _ from 'lodash'
import {notification} from 'antd'

export const GET_LOGODETAIL = actionNames('GET_LOGODETAIL')
export function getLogoDetail(id){
	return {
        types: GET_LOGODETAIL,
        callAPI: (getState) => {
            return fetch(config.api.logo.detail.query(id),{
				headers: {
                    'authorization': sessionStorage.getItem('auth')
                },
			}).then(res => {
				return res
			}).then(res => res.json()).then(res => {
				if(res.status == 2){
					notification.error({message: res.error})
				}
				return res
			})
        }
    }
}

export function addLogoDetailItem(data,typeId){
	return dispatch => {
		return fetch(config.api.logo.detail.add,{
			method:'POST',
			headers: {
				'authorization': sessionStorage.getItem('auth'),
				'content-type': 'application/json'
			},
			body:JSON.stringify(data)
		}).then(res => res.json()).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}else{
				dispatch({
					types: GET_LOGODETAIL,
			        callAPI: (getState) => {
			            return fetch(config.api.logo.detail.query(typeId),{
							headers: {
			                    'authorization': sessionStorage.getItem('auth')
			                },
						}).then(res => {
							return res
						}).then(res => res.json()).then(res => {
							if(res.status == 2){
								notification.error({message: res.error})
							}
							return res
						})
			        }
				})
			}
		})
	}
}

export function editLogoDetailItem(data,typeId){
	return dispatch => {
		return fetch(config.api.logo.detail.edit(data.id),{
			method:'PUT',
			headers: {
				'authorization': sessionStorage.getItem('auth'),
				'content-type': 'application/json'
			},
			body:JSON.stringify(data)
		}).then(res => res.json()).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}else{
				dispatch({
					types: GET_LOGODETAIL,
			        callAPI: (getState) => {
			            return fetch(config.api.logo.detail.query(typeId),{
							headers: {
			                    'authorization': sessionStorage.getItem('auth')
			                },
						}).then(res => {
							return res
						}).then(res => res.json()).then(res => {
							if(res.status == 2){
								notification.error({message: res.error})
							}
							return res
						})
			        }
				})
			}
		})
	}
}

export function deleteLogoDetailItem(id,typeId){
	return dispatch => {
		return fetch(config.api.logo.detail.delete(id),{
			method:'DELETE',
			headers: {
				'authorization': sessionStorage.getItem('auth'),
				'content-type': 'application/json'
			}
		}).then(res => res).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}else{
				dispatch({
					types: GET_LOGODETAIL,
			        callAPI: (getState) => {
			            return fetch(config.api.logo.detail.query(typeId),{
							headers: {
			                    'authorization': sessionStorage.getItem('auth')
			                },
						}).then(res => {
							return res
						}).then(res => res.json()).then(res => {
							if(res.status == 2){
								notification.error({message: res.error})
							}
							return res
						})
			        }
				})
			}
		})
	}
}
