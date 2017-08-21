import {actionNames} from 'action-utils'
import {notification} from 'antd'
import config from '../config'

export const GET_ALBUM = actionNames('GET_ALBUM')
export function getAlbum(page,pageSize){
	return {
        types: GET_ALBUM,
        callAPI: (getState) => {
            return fetch(config.api.album.get(page,pageSize),{
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

export function editAlbum(jsonData,id){
	return dispatch => {
		return fetch(config.api.album.edit(id),{
			method:'PUT',
			headers:{
				authorization:sessionStorage.getItem('auth'),
				'content-type':'application/json'
			},
			body:JSON.stringify(jsonData)
		}).then(res => res.json()).then(res => {
			if(res.status==2){
				notification.error({message:res.errorMes})
			}else{
				console.log(res)
			}
		})
	}
}

export function addAlbum(jsonData){
	return dispatch => {
		return fetch(config.api.album.add,{
			method:'post',
			headers:{
				authorization:sessionStorage.getItem('auth'),
				'content-type':'application/json'
			},
			body:JSON.stringify(jsonData)
		}).then(res => res.json()).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}else{
				console.log(res)
			}
		})
	}
}
