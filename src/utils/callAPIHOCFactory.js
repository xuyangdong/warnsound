import config from '../config'
import {notification} from 'antd'

// export default function callAPIHOCFactory(actionName){
// 	return (page,pageSize,otherData) => {
// 	    return (getState) => {
// 	        if(typeof page ==='undefined'){
// 	            page = getState().getIn([actionName,'otherData','offset'],0)
// 	        }
// 	        if(!pageSize){
// 	            pageSize = getState().getIn([actionName,'otherData','limit'],10)
// 	        }
// 	        return fetch(config.api[actionName].get(page, pageSize, otherData), {
// 	            headers: {
// 	                'authorization': sessionStorage.getItem('auth')
// 	            },
// 	            redirect: 'manual'
// 	        }).then(res => {
// 	            return res
// 	        }).then(res => res.json()).then(res => {
// 	            if(res.status==2){
// 	                notification.error({message:res.errorMes})
// 	            }
// 	            res.offset = page
// 	            res.limit = pageSize
// 				if(typeof otherData != 'undefined' && otherData instanceof Object){
// 					Object.keys(otherData).forEach(v => {
// 						res[v] = otherData[v]
// 					})
// 				}
// 	            return res
// 	        })
// 	    }
// 	}
// }

/**
返回一个function,如果传递给该function的参数是一个object那么将返回一个新的function，
这个新的function是可以配置的callAPI
eg:
1、callAPIHOCFactory('nativeWork')(page,pageSize)
2、callAPIHOCFactory('nativeWork')(configData)(page,pageSize)
*/
export default function callAPIHOCFactory(actionName){
	return (...args) => {
		if(args.length >= 2 || args.length == 0){
			//page,pageSize or page,pageSize both undefined or page,pageSize,otherConfig...
			return (getState) => {
				if(args.length == 0){
					args[0] = getState().getIn([actionName,'otherData','offset'],0)
					args[1] = getState().getIn([actionName,'otherData','limit'],10)
				}
				return fetch(config.api[actionName].get.apply(null,args),{
					headers:{
						'authorization':sessionStorage.getItem('auth')
					}
				}).then(res => res.json()).then(res => {
					if(res.status == 2){
						notification.error({message:res.errorMes})
					}else {
						notification.success({message:'请求成功'})
					}
					res.offset = args[0]
					res.limit = args[1]
					return res
				})
			}

		}else if(args.length == 1 && typeof args[0] == 'object'){
			const configData = args[0]
			return (...args2) => {
				if(args2.length >= 2 || args2.length == 0){
					//page,pageSize or page,pageSize both undefined or page,pageSize,otherConfig...
					return (getState) => {
						if(args2.length == 0){
							args2[0] = getState().getIn([actionName,'otherData','offset'],0)
							args2[1] = getState().getIn([actionName,'otherData','limit'],10)
						}
						Object.keys(configData).forEach(v => {
							args2.push(configData[v])
						})
						return fetch(config.api[actionName].get.apply(null,args2),{
							headers:{
								'authorization':sessionStorage.getItem('auth')
							}
						}).then(res => res.json()).then(res => {
							if(res.status == 2){
								notification.error({message:res.errorMes})
							}else {
								notification.success({message:'请求成功'})
							}
							res.offset = args2[0]
							res.limit = args2[1]
							Object.keys(configData).forEach(v => {
								res[v] = configData[v]
							})
							return res
						})
					}

				}
			}
		}
	}
}
