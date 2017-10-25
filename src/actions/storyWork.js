import {actionNames} from "action-utils"
import {notification} from "antd"
import config from '../config'

const callAPIHOC = (page,pageSize) => {
	return (id) => {
		return (getState) => {
	        if(typeof page ==='undefined'){
	            page = getState().getIn(['storyWork','otherData','offset'],0)
	        }
	        if(!pageSize){
	            pageSize = getState().getIn(['storyWork','otherData','limit'],10)
	        }
	        return fetch(config.api.story.work.get(id, page, pageSize), {
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

export const GET_STORYWORK = actionNames('GET_STORYWORK')
export function getStoryWork(storyId,page,pageSize){
	return {
		types:GET_STORYWORK,
		callAPI:callAPIHOC(page,pageSize)(storyId)
	}
}

export const GET_STORYWORKINFO = 'GET_STORYWORKINFO'
export function getStoryInfo(id){
	return dispatch => {
		return fetch(config.api.story.query(id),{
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => res.json()).then(res => {
			dispatch({
				type:GET_STORYWORKINFO,
				payload:res
			})
		})
	}
}
