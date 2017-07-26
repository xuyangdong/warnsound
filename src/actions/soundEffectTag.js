import {actionNames} from 'action-utils'
import config from '../config'
import {notification} from 'antd'
export const GET_SOUNDEFFECTTAG = actionNames("GET_SOUNDEFFECTTAG")
export function getSoundEffectTag(offset,limit){
	return {
		types:GET_SOUNDEFFECTTAG,
		callAPI:()=>{
			return fetch(config.api.soundEffectTag.get((offset-1)*limit,limit),{
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

export function addSoundEffectTag(formData) {
	return dispatch => {
        return fetch(config.api.soundEffectTag.add, {
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
                types: GET_SOUNDEFFECTTAG,
                callAPI: () => {
                    return fetch(config.api.soundEffectTag.get(0, 10), {
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

export function editSoundEffectTag(formData,id) {
	return dispatch => {
        return fetch(config.api.soundEffectTag.edit(id), {
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
                types: GET_SOUNDEFFECTTAG,
                callAPI: () => {
                    return fetch(config.api.soundEffectTag.get(0, 10), {
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

export function deleteSoundEffectTag(id){
	return dispatch => {
        return fetch(config.api.soundEffectTag.delete(id), {
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
                types: GET_SOUNDEFFECTTAG,
                callAPI: () => {
                    return fetch(config.api.soundEffectTag.get(0, 10), {
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
