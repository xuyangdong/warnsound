import config from '../config'
import {notification} from 'antd'

export default function callAPIHOCFactory(actionName){
	return (page,pageSize) => {
	    return (getState) => {
	        if(typeof page ==='undefined'){
	            page = getState().getIn([actionName,'otherData','offset'],1)
	        }
	        if(!pageSize){
	            pageSize = getState().getIn([actionName,'otherData','limit'],10)
	        }
	        return fetch(config.api[actionName].get(page, pageSize), {
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
