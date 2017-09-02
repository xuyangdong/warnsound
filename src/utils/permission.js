import _ from 'lodash'
import {isImmutable,List} from 'immutable'
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
	album:5//暂时没有，用5代替
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
}

export const operatePermission = {
	add:1,
	delete:2,
	edit:3,
	check:4
}
