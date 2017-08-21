import {actionNames} from 'action-utils'
import {notification} from 'antd'
import config from '../config'

export const GET_INDIVIDUALITY = actionNames('GET_INDIVIDUALITY')
export function getIndividuality(page,pageSize){
	return {
        types: GET_INDIVIDUALITY,
        callAPI: (getState) => {
            return fetch(config.api.individual.get(page,pageSize),{
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

export function createQuestion(jsonData){
	return dispath => {
		return fetch(config.api.individual.add,{
			method:'POST',
			headers:{
				'authorization':sessionStorage.getItem('auth'),
				'content-type':'application/json'
			},
			body:JSON.stringify(jsonData)
		}).then(res => res.json()).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}
			console.log(res)
		})
	}
}

export function editQuestion(jsonData,id){
	return dispath => {
		return fetch(config.api.individual.edit(id),{
			method:'PUT',
			headers:{
				'authorization':sessionStorage.getItem('auth'),
				'content-type':'application/json'
			},
			body:JSON.stringify(jsonData)
		}).then(res => res.json()).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}
			console.log(res)
		})
	}
}
