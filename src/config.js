import _ from 'underscore'
import qs from 'qs'
const isProduction = process.env.NODE_ENV === "production"

const baseURL = isProduction
    ? 'http://120.27.219.173'
    : ''

const config = _.extend({
    // common config
    debug: true
}, {
    api: {
        user: {
            login: (id, ps) => `${baseURL}/manage/auth?username=${id}&password=${ps}`
        },
        story: {
            get: (offset, limit, query = {
                title: '',
                author: '',
                press: '',
                content: '',
                tag: ''
            }) => {
                let queryString = {
                    ...query,
                    offset: offset,
                    limit: limit
                }
                return `${baseURL}/manage/storiesByFuzzyQuery?${qs.stringify(queryString)}`
            },
            query: (id) => `${baseURL}/manage/stories/${id}`,
            add: `${baseURL}/manage/stories`,
            edit: (id) => `${baseURL}/manage/stories/${id}`
        },
        storyTag: {
            get: (offset, limit) => `${baseURL}/manage/storyTags?offset=${offset}&limit=${limit}`,
            query: (id) => `${baseURL}/manage/storyTags/${id}`,
            add: `${baseURL}/manage/storyTags`,
            edit: (id) => `${baseURL}/manage/storyTags/${id}`
        },
        soundEffect: {
            get: (offset, limit) => `${baseURL}/manage/soundEffects?offset=${offset}&limit=${limit}`,
            query: (id) => `${baseURL}/manage/soundEffects/${id}`,
            add: `${baseURL}/manage/soundEffects`,
            edit: (id) => `${baseURL}/manage/soundEffects/${id}`
        },
        soundEffectTag: {
            get: (offset, limit) => `${baseURL}/manage/soundEffectTags?offset=${offset}&limit=${limit}`,
            query: (id) => `${baseURL}/manage/soundEffectTags/${id}`,
            add: `${baseURL}/manage/soundEffectTags`,
            edit: (id) => `${baseURL}/manage/soundEffectTags/${id}`
        },
        backgroundmusic: {
            get: (offset, limit) => `${baseURL}/manage/backgroundMusics?offset=${offset}&limit=${limit}`,
            query: (id) => `${baseURL}/manage/backgroundMusics/${id}`,
            add: `${baseURL}/manage/backgroundMusics`,
            edit: (id) => `${baseURL}/manage/backgroundMusics/${id}`
        }
    }
})

export default config
