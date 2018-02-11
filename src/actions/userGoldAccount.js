import {actionNames} from 'action-utils'
import config from '../config'
import {notification} from 'antd'
import callAPIHOCFactory from 'callAPIHOCFactory'

const callAPIHOC = callAPIHOCFactory('userGoldAccount')
const callAPIHOCForBill = callAPIHOCFactory('bill')

export const GET_USERGOLDACCOUNT = actionNames("GET_USERGOLDACCOUNT")
export function getUserGoldAccount(page,pageSize){
	return {
		types:GET_USERGOLDACCOUNT,
		callAPI:callAPIHOC(page,pageSize)
	}
}

export const GET_USERBILL = actionNames("GET_USERBILL")
export function getUserBill(page,pageSize,otherData){
	return {
		types:GET_USERBILL,
		callAPI:callAPIHOCForBill(otherData)(page,pageSize)
	}
}
