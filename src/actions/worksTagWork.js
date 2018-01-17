import {actionNames} from "action-utils"
import {notification} from "antd"
import config from '../config'

const callAPIHOC = (page,pageSize) => {
	return (id) => {
		return (getState) => {
	        if(typeof page ==='undefined'){
	            page = getState().getIn(['worksTagWork','otherData','offset'],0)
	        }
	        if(!pageSize){
	            pageSize = getState().getIn(['worksTagWork','otherData','limit'],10)
	        }
	        return fetch(config.api.worksTag.work.get(id, page, pageSize), {
	            headers: {
	                'authorization': sessionStorage.getItem('auth')
	            }
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

export const GET_WORKSTAGWORK = actionNames('GET_WORKSTAGWORK')
export function getWorksTagWork(worksTagId,page,pageSize){
	return {
		types:GET_WORKSTAGWORK,
		callAPI:callAPIHOC(page,pageSize)(worksTagId)
	}
}

export const GET_WORKWORKSTAGINFO = 'GET_WORKWORKSTAGINFO'
export function getWorksTagInfo(id){
	return dispatch => {
		return fetch(config.api.worksTag.query(id),{
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => res.json()).then(res => {
			dispatch({
				type:GET_WORKWORKSTAGINFO,
				payload:res
			})
		})
	}
}
