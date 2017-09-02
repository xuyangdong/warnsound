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
	return dispatch => {
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
			dispatch({
		        types: GET_INDIVIDUALITY,
		        callAPI: (getState) => {
					const state = getState()
					const offset = state.getIn(['individuality','otherData','offset'])
					const limit = state.getIn(['individuality','otherData','limit'])
		            return fetch(config.api.individual.get(offset,limit),{
						headers: {
		                    'authorization': sessionStorage.getItem('auth')
		                },
					}).then(res => {
						return res
					}).then(res => res.json()).then(res => {
						if(res.status == 2){
							notification.error({message: res.error})
						}
						res.offset = offset,
						res.limit = limit
						return res
					})
		        }
		    })
		})
	}
}

export function editQuestion(jsonData,id){
	return dispatch => {
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
			dispatch({
		        types: GET_INDIVIDUALITY,
		        callAPI: (getState) => {
					const state = getState()
					const offset = state.getIn(['individuality','otherData','offset'])
					const limit = state.getIn(['individuality','otherData','limit'])
		            return fetch(config.api.individual.get(offset,limit),{
						headers: {
		                    'authorization': sessionStorage.getItem('auth')
		                },
					}).then(res => {
						return res
					}).then(res => res.json()).then(res => {
						if(res.status == 2){
							notification.error({message: res.error})
						}
						res.offset = offset,
						res.limit = limit
						return res
					})
		        }
		    })
		})
	}
}

export function deleteQuestion(id){
	return dispatch => {
		return fetch(config.api.individual.delete(id),{
			method:'delete',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}
			dispatch({
		        types: GET_INDIVIDUALITY,
		        callAPI: (getState) => {
					const state = getState()
					const offset = state.getIn(['individuality','otherData','offset'])
					const limit = state.getIn(['individuality','otherData','limit'])
		            return fetch(config.api.individual.get(offset,limit),{
						headers: {
		                    'authorization': sessionStorage.getItem('auth')
		                },
					}).then(res => {
						return res
					}).then(res => res.json()).then(res => {
						if(res.status == 2){
							notification.error({message: res.error})
						}
						res.offset = offset,
						res.limit = limit
						return res
					})
		        }
		    })
		})
	}
}
