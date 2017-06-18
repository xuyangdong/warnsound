import _ from 'underscore'

const isProduction = process.env.NODE_ENV === "production"

const baseURL = ''

const config = _.extend({
	// common config
	debug: true,
}, {
	api:{
		user:{
			login:(id,ps) => `${baseURL}/manage/auth?username=${id}&password=${ps}`
		},
		story:{
			get:(offset,limit) => `${baseURL}/manage/stories?offset=${offset}&limit=${limit}`,
			query:(id) => `${baseURL}/manage/stories/${id}`,
			add:`${baseURL}/manage/stories`,
			edit:(id) => `${baseURL}/manage/stories/${id}`
		},
		storyTag:{
			get:(offset,limit) => `${baseURL}/manage/storyTags?offset=${offset}&limit=${limit}`,
			query:(id) => `${baseURL}/manage/storyTags/${id}`,
			add:`${baseURL}/manage/storyTags`,
			edit:(id) => `${baseURL}/manage/storyTags/${id}`
		},
		soundEffect:{
			get:(offset,limit) => `${baseURL}/manage/soundEffects?offset=${offset}&limit=${limit}`,
			query:(id) => `${baseURL}/manage/soundEffects/${id}`,
			add:`${baseURL}/manage/soundEffects`,
			edit:(id) => `${baseURL}/manage/soundEffects/${id}`
		},
		soundEffectTag:{
			get:(offset,limit) => `${baseURL}/manage/soundEffectTags?offset=${offset}&limit=${limit}`,
			query:(id) => `${baseURL}/manage/soundEffectTags/${id}`,
			add:`${baseURL}/manage/soundEffectTags`,
			edit:(id) => `${baseURL}/manage/soundEffectTags/${id}`
		},
		backgroundmusic:{
			get:(offset,limit) => `${baseURL}/manage/backgroundMusics?offset=${offset}&limit=${limit}`,
			query:(id) => `${baseURL}/manage/backgroundMusics/${id}`,
			add:`${baseURL}/manage/backgroundMusics`,
			edit:(id) => `${baseURL}/manage/backgroundMusics/${id}`
		}
	}
})

export default config
