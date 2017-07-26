import {actionNames} from 'action-utils'
import config from '../config'
import {notification} from 'antd'
export const GET_BACKGROUNDMUSICTAG = actionNames("GET_BACKGROUNDMUSICTAG")
export function getBackgroundMusicTag(offset,limit){
	return {
		types:GET_BACKGROUNDMUSICTAG,
		callAPI:()=>{
			return fetch(config.api.backgroundMusicTag.get((offset-1)*limit,limit),{
				headers: {
			    	'authorization': sessionStorage.getItem('auth')
			    },
			}).then(res => res.json()).then(res => {
				if(res.status!=1){
					notification.error({message:'服务器出错'})
				}
				return res
			})
		}
	}
}

export function addBackgroundMusicTag(formData){
	return dispatch => {
        return fetch(config.api.backgroundMusicTag.add, {
            method: 'post',
            body: formData,
            headers: {
                'authorization': sessionStorage.getItem('auth')
            }
        }).then(res => res.json()).then(res => {
			// if(res.status!=1){
			// 	notification.error({message:'服务器出错'})
			// }
			return res
		}).then(res => {
            dispatch({
                types: GET_BACKGROUNDMUSICTAG,
                callAPI: () => {
                    return fetch(config.api.backgroundMusicTag.get(0, 10), {
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

export function editBackgroundMusicTag(formData,id){
	return dispatch => {
        return fetch(config.api.backgroundMusicTag.edit(id), {
            method: 'post',
            body: formData,
            headers: {
                'authorization': sessionStorage.getItem('auth')
            }
        }).then(res => res.json()).then(res => {
			// if(res.status!=1){
			// 	notification.error({message:'服务器出错'})
			// }
			return res
		}).then(res => {
            dispatch({
                types: GET_BACKGROUNDMUSICTAG,
                callAPI: () => {
                    return fetch(config.api.backgroundMusicTag.get(0, 10), {
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

export function deleteBackgroundMusicTag(id){
	return dispatch => {
        return fetch(config.api.backgroundMusicTag.delete(id), {
            method: 'delete',
            headers: {
                'authorization': sessionStorage.getItem('auth')
            }
        }).then(res => res).then(res => {
			// if(res.status!=1){
			// 	notification.error({message:'服务器出错'})
			// }
			notification.success({message:'删除成功'})
			return res
		}).then(res => {
            dispatch({
                types: GET_BACKGROUNDMUSICTAG,
                callAPI: () => {
                    return fetch(config.api.backgroundMusicTag.get(0, 10), {
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
