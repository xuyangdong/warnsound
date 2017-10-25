import React from 'react'
import UserWorkHOC from './UserWorkHOC'
import StoryWorkHOC from './StoryWorkHOC'

export default (type) => {
	switch (type) {
		case 'user':
			return UserWorkHOC
		case 'story':
			return StoryWorkHOC
		default:

	}
}
