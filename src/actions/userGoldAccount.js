import {actionNames} from 'action-utils'
import config from '../config'
import {notification} from 'antd'
import callAPIHOCFactory from 'callAPIHOCFactory'

const callAPIHOC = callAPIHOCFactory('userGoldAccount')

export const GET_USERGOLDACCOUNT = actionNames("GET_USERGOLDACCOUNT")
export function getUserGoldAccount(page,pageSize){
	return {
		types:GET_USERGOLDACCOUNT,
		callAPI:callAPIHOC(page,pageSize)
	}
}
