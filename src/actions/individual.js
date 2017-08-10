import {actionNames} from 'action-utils'
import {notification} from 'antd'
import config from '../config'

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
		})
	}
}
