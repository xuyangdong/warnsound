import _ from 'lodash'
import {isImmutable,List} from 'immutable'
import config from '../config'
import {notification} from 'antd'

const modulePermission = {
	story:5,
	storyTag:6,
	soundEffect:7,
	soundEffectTag:8,
	backgroundMusic:9,
	app:10,
	discover:11,
	logo:12,
	individuality:13,
	recommend:14,
	permission:15,
	storySet:5,//暂时没有，用5代替
	album:5,//暂时没有，用5代替
	user:5,//暂时没有，用5代替
	storySurround:5,
	readPlan:5,
	babyRead:5,
	storyTopic:5,
	notice:5,
	admin:5,
	initImage:5,
	icon:5,
	nativeWork:5,
	opinion:5,
	continuousLoginPrompt:5,
	destination:5,
	pushMessage:5,
	worksTag:5,
	feedbackTemplet:5
}

export default class Permission {
	static hasPermission = (userPermission = [],moduleName = '') => {
		if(userPermission instanceof List && typeof moduleName === 'string'){
			return userPermission.findIndex(v => v == modulePermission[moduleName])>-1
		}else if(typeof userPermission === 'array' && typeof moduleName === 'string'){
			return _.findIndex(userPermission,modulePermission[moduleName])>-1
		}else{
			return false
		}
	}
	static getPermissionDict = _.memoize(() => {
		return fetch(config.api.permission.get(0,10000),{
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => res.json()).then(res => {
			if(res.state==2){
				notification.error({message:res.errorMes})
			}
			return res.obj
		})
	})
}

export const operatePermission = {
	add:1,
	delete:2,
	edit:3,
	check:4
}
