import {actionNames} from 'action-utils'
import config from '../config'
import _ from 'lodash'
import {notification} from 'antd'
import qs from 'qs'

export const GET_STORIES = actionNames('GET_STORIES')
export function getStories(offset, limit, query = {
    title: '',
    author: '',
    press: '',
    content: '',
    tag: '',
    price:''
}) {
    return {
        types: GET_STORIES,
        callAPI: (getState) => {
            return fetch(config.api.story.get((offset-1)*limit, limit, query), {
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
                res.offset = offset
                res.limit = limit
				return res
			})
        }
    }
}

export function searchStories(query) {}

export function addStory(formData) {
    return dispatch => {
        return fetch(config.api.story.add, {
            method: 'post',
            body: formData,
            headers: {
                'authorization': sessionStorage.getItem('auth')
            }
        }).then(res => res.json()).then(res => {
			if(res.status==2){
				notification.error({message:res.errorMes})
			}else {
                notification.success({message:'故事上传成功'})
            }
			return res
		}).then(res => {
            dispatch({
                types: GET_STORIES,
                callAPI: () => {
                    return fetch(config.api.story.get(0, 10), {
                        headers: {
                            'authorization': sessionStorage.getItem('auth')
                        }
                    }).then(res => res.json()).then(res => {
        				if(res.status==2){
        					notification.error({message:res.errorMes})
        				}
        				return res
        			})
                }
            })
            return res
        })
    }
}

export function editStory(formData, id) {
    return dispatch => {
        return fetch(config.api.story.edit(id), {
            method: 'post',
            body: formData,
            headers: {
                'authorization': sessionStorage.getItem('auth')
            }
        }).then(res => res.json()).then(res => {
			if(res.status==2){
				notification.error({message:res.errorMes})
			}else{
                notification.success({message:'故事修改成功'})
            }
			return res
		}).then(res => {
            dispatch({
                types: GET_STORIES,
                callAPI: (getState) => {
                    const state = getState()
                    const offset = state.getIn(['story','otherData','offset'])||0
                    const limit = state.getIn(['story','otherData','limit'])||10
                    return fetch(config.api.story.get((offset-1)*limit, limit), {
                        headers: {
                            'authorization': sessionStorage.getItem('auth')
                        }
                    }).then(res => res.json()).then(res => {
        				if(res.status==2){
        					notification.error({message:res.errorMes})
        				}
                        res.offset = offset
                        res.limit = limit
        				return res
        			})
                }
            })
        })
    }
}

export function deleteStory(id){
    return dispatch => {
        return fetch(config.api.story.delete(id),{
            method:'delete',
            headers: {
                'authorization': sessionStorage.getItem('auth')
            }
        }).then(res => {
            if(res.status==2){
                notification.error({message:res.errorMes})
            }else{
                notification.success({message:'故事删除成功'})
            }
            return res
        }).then(res => {
            dispatch({
                types: GET_STORIES,
                callAPI: () => {
                    return fetch(config.api.story.get(0, 10), {
                        headers: {
                            'authorization': sessionStorage.getItem('auth')
                        }
                    }).then(res => res.json()).then(res => {
        				if(res.status==2){
        					notification.error({message:res.errorMes})
        				}
        				return res
        			})
                }
            })
        })
    }
}

export function recommendStory(id){
    return fetch(config.api.story.recommend.add(id),{
        method:'post',
        headers:{
            'authorization': sessionStorage.getItem('auth')
        }
    }).then(res => res)
}

export function deRecommendStory(id){
    return fetch(config.api.story.recommend.add(id),{
        method:'delete',
        headers:{
            'authorization': sessionStorage.getItem('auth')
        }
    }).then(res => res)
}

export function addStoryRole(jsonData){
    return fetch(config.api.story.storyRole.add,{
        method:'post',
        headers:{
            'authorization':sessionStorage.getItem('auth')
        },
        body:jsonData
    }).then(res => res.json())
}
