import {actionNames} from 'action-utils'
import config from '../config'
import {notification} from 'antd'
export const GET_BACKGROUNDMUSIC = actionNames("GET_BACKGROUNDMUSIC")
export function getBackgroundMusic(offset,limit){
	return {
		types:GET_BACKGROUNDMUSIC,
		callAPI:()=>{
			return fetch(config.api.backgroundmusic.get((offset-1)*limit,limit),{
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

export function addBackgroundMusic(formData){
	return dispatch => {
        return fetch(config.api.backgroundmusic.add, {
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
                types: GET_BACKGROUNDMUSIC,
                callAPI: () => {
                    return fetch(config.api.backgroundmusic.get(0, 10), {
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
			return res
        })
    }
}

export function editBackgroundMusic(formData,id){
	return dispatch => {
        return fetch(config.api.backgroundmusic.edit(id), {
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
                types: GET_BACKGROUNDMUSIC,
                callAPI: () => {
                    return fetch(config.api.backgroundmusic.get(0, 10), {
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
			return res
        })
    }
}

export function deleteBackgroundMusic(id){
	return dispatch => {
        return fetch(config.api.backgroundmusic.delete(id), {
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
                types: GET_BACKGROUNDMUSIC,
                callAPI: () => {
                    return fetch(config.api.backgroundmusic.get(0, 10), {
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
			return res
        })
    }
}
