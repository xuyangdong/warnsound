import {actionNames} from "action-utils"
import {notification} from "antd"
import config from '../config'

const callAPIHOC = (page,pageSize) => {
	return (id) => {
		return (getState) => {
	        if(typeof page ==='undefined'){
	            page = getState().getIn(['userWork','otherData','offset'],0)
	        }
	        if(!pageSize){
	            pageSize = getState().getIn(['userWork','otherData','limit'],10)
	        }
	        return fetch(config.api.user.work.get(id, page, pageSize), {
	            headers: {
	                'authorization': sessionStorage.getItem('auth')
	            },
	            redirect: 'manual'
	        }).then(res => {
	            return res
	        }).then(res => res.json()).then(res => {
	            if(res.status==2){
	                notification.error({message:res.errorMes})
	            }
	            res.offset = page
	            res.limit = pageSize
	            return res
	        })
	    }
	}
}
export const GET_USERWORK = actionNames('GET_USERWORK')
export function getUserWork(userId,page,pageSize){
	return {
		types:GET_USERWORK,
		callAPI:callAPIHOC(page,pageSize)(userId)
	}
}

export const GET_WORKUSERINFO = 'GET_WORKUSERINFO'
export function getUserInfo(id){
	return dispatch => {
		return fetch(config.api.user.query(id),{
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => res.json()).then(res => {
			dispatch({
				type:GET_WORKUSERINFO,
				payload:res
			})
		})
	}
}

export function addUserWork(formData,userId){
	return dispatch => {
		return fetch(config.api.user.work.add,{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			},
			body:formData
		}).then(res => res.json()).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}
			dispatch({
				types:GET_USERWORK,
				callAPI:callAPIHOC()(userId)
			})
		})
	}
}

export function editUserWork(formData,id,userId){
	formData.append('id',id)
	return dispatch => {
		return fetch(config.api.user.work.edit,{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			},
			body:formData
		}).then(res => res.json()).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}
			dispatch({
				types:GET_USERWORK,
				callAPI:callAPIHOC()(userId)
			})
		})
	}
}

export function deleteUserWork(id,userId){
	return dispatch => {
		return fetch(config.api.user.work.delete(id),{
			method:'delete',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => res).then(res => {
			if(res.status == 2){
				notification.error({message:res.errorMes})
			}
			dispatch({
				types:GET_USERWORK,
				callAPI:callAPIHOC()(userId)
			})
		})
	}
}
