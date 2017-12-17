import _ from 'lodash'
const destinationType = '阅读计划提醒,andoop.android.amstory.LoginDaysActivity,LoginDaysActivity=1\n\
上线新的故事,andoop.android.amstory.StoryDetailActivity,ID=?(故事编号)\n\
故事集里更新新的故事,andoop.android.amstory.StorySetActivity,ID=?(故事集编号)\n\
专题更新,andoop.android.amstory.TopicDetailActivity,ID=?(专题编号)\n\
发现更新,andoop.android.amstory.InformationDetailActivity,Discover=?(发现网址)\n\
徽章更新,andoop.android.amstory.MainActivity,MainActivity=0\n\
新版本更新,andoop.android.amstory.MainActivity,MainActivity=0'

export default class DestinationUtils {
	static getAsJsonObj = _.memoize(() => {
		const typeList = destinationType.split('\n')
		return typeList.map(v => {
			let elements = v.split(',')
			return {
				title:elements[0],
				uri:elements[1],
				args:elements.slice(2).map(e => {
					if(e.indexOf('?')>-1){
						//用户指定参数
						let pattern = /(.*)=\?\((.*)\)/i
						let args = pattern.exec(e)
						return {
							key:args[1],
							value:'',
							description:args[2]
						}
					}else{
						//默认参数
						let pattern = /(.*)=(.*)/i
						let args = pattern.exec(e)
						return {
							key:args[1],
							value:args[2],
							description:''
						}
					}
				})
			}
		})
	})
}
