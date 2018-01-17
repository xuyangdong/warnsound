import React from 'react'
import UserWorkHOC from './UserWorkHOC'
import StoryWorkHOC from './StoryWorkHOC'
import WorksTagWorkHOC from './WorksTagWorkHOC'

export default (type) => {
	switch (type) {
		case 'user':
			return UserWorkHOC
		case 'story':
			return StoryWorkHOC
		case 'worksTag':
			return WorksTagWorkHOC
		default:

	}
}
