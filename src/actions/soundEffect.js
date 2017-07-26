import {actionNames} from 'action-utils'
import config from '../config'
import {notification} from 'antd'

export const GET_SOUNDEFFECT = actionNames("GET_SOUNDEFFECT")
export function getSoundEffect(offset,limit){
	return {
		types:GET_SOUNDEFFECT,
		callAPI:()=>{
			return fetch(config.api.soundEffect.get((offset-1)*limit,limit),{
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

export function addSoundEffect(formData) {
	return dispatch => {
        return fetch(config.api.soundEffect.add, {
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
                types: GET_SOUNDEFFECT,
                callAPI: () => {
                    return fetch(config.api.soundEffect.get(0, 10), {
                        headers: {
                            'authorization': sessionStorage.getItem('auth')
                        }
                    }).then(res => res.json()).then(res => {
						if(res.status!=1){
							notification.error({message:'服务器出错'})
						}
						return res
					})
                }
            })
        })
    }
}

export function editSoundEffect(formData,id) {
	return dispatch => {
        return fetch(config.api.soundEffect.edit(id), {
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
                types: GET_SOUNDEFFECT,
                callAPI: () => {
                    return fetch(config.api.soundEffect.get(0, 10), {
                        headers: {
                            'authorization': sessionStorage.getItem('auth')
                        }
                    }).then(res => res.json()).then(res => {
						if(res.status!=1){
							notification.error({message:'服务器出错'})
						}
						return res
					})
                }
            })
        })
    }
}

export function deleteSoundEffect(id){
	return dispatch => {
        return fetch(config.api.soundEffect.delete(id), {
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
                types: GET_SOUNDEFFECT,
                callAPI: () => {
                    return fetch(config.api.soundEffect.get(0, 10), {
                        headers: {
                            'authorization': sessionStorage.getItem('auth')
                        }
                    }).then(res => res.json()).then(res => {
						if(res.status!=1){
							notification.error({message:'服务器出错'})
						}
						return res
					})
                }
            })
        })
    }
}
