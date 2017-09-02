import _ from 'underscore'
import qs from 'qs'
const isProduction = process.env.NODE_ENV === "production"

const baseURL = isProduction
    ? 'http://120.27.219.173'
    : ''
// const baseURL = ""

const config = _.extend({
    // common config
    debug: true
}, {
    api: {
        user: {
            login: (id, ps) => `${baseURL}/manage/auth?username=${id}&password=${ps}`,
            logout: `${baseURL}/manage/auth`
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
            edit: (id) => `${baseURL}/manage/stories/${id}`,
            delete: (id) => `${baseURL}/manage/stories/${id}`,
            tag:{
                add:(storyId,tagId) => `${baseURL}/manage/stories/${storyId}/storyTags/${tagId}`,
                delete:(storyId,tagId) => `${baseURL}/manage/stories/${storyId}/storyTags/${tagId}`,
                query:(id) => `${baseURL}/manage/stories/${id}/storyTags`
            },
            recommend:{
                add:(id) => `${baseURL}/manage/stories/${id}/recommendations`,
                delete:(id) => `${baseURL}/manage/stories/${id}/recommendations`
            },
            cover:{
                delete:`${baseURL}/manage/deleteCover`
            },
            role: {
                query:(id) => `${baseURL}/manage/getStoryRoleListByStoryId?storyId=${id}`
            },
            storySet:{
                query:storyId => `${baseURL}/manage/getStorySetByStoryId?storyId=${storyId}`
            }
        },
        storyTag: {
            get: (offset, limit) => `${baseURL}/manage/storyTags?offset=${offset}&limit=${limit}`,
            query: (id) => `${baseURL}/manage/storyTags/${id}`,
            add: `${baseURL}/manage/storyTags`,
            edit: (id) => `${baseURL}/manage/storyTags/${id}`,
            delete: (id) => `${baseURL}/manage/storyTags/${id}`
        },
        soundEffect: {
            get: (offset, limit) => `${baseURL}/manage/soundEffects?offset=${offset}&limit=${limit}`,
            query: (id) => `${baseURL}/manage/soundEffects/${id}`,
            add: `${baseURL}/manage/soundEffects`,
            edit: (id) => `${baseURL}/manage/soundEffects/${id}`,
            delete: (id) => `${baseURL}/manage/soundEffects/${id}`,
            soundEffectTag:{
                query: (id) => `${baseURL}/manage/soundEffects/${id}/soundEffectTags`
            }
        },
        soundEffectTag: {
            get: (offset, limit) => `${baseURL}/manage/soundEffectTags?offset=${offset}&limit=${limit}`,
            query: (id) => `${baseURL}/manage/soundEffectTags/${id}`,
            add: `${baseURL}/manage/soundEffectTags`,
            edit: (id) => `${baseURL}/manage/soundEffectTags/${id}`,
            delete: (id) => `${baseURL}/manage/soundEffectTags/${id}`,
            soundEffect:{
                get:(id) => `${baseURL}/manage/soundEffectTags/${id}/soundEffects`
            }
        },
        backgroundmusic: {
            get: (offset, limit) => `${baseURL}/manage/backgroundMusics?offset=${offset}&limit=${limit}`,
            query: (id) => `${baseURL}/manage/backgroundMusics/${id}`,
            add: `${baseURL}/manage/backgroundMusics`,
            edit: (id) => `${baseURL}/manage/backgroundMusics/${id}`,
            delete: (id) => `${baseURL}/manage/backgroundMusics/${id}`,
            backgroundMusicTag: {
                add: (backgroundMusicId,backgroundMusicTagId) => `${baseURL}/manage/backgroundMusics/${backgroundMusicId}/backgroundMusicTags/${backgroundMusicTagId}`,
                delete: (backgroundMusicId,backgroundMusicTagId) => `${baseURL}/manage/backgroundMusics/${backgroundMusicId}/backgroundMusicTags/${backgroundMusicTagId}`,
                query: (id) => `${baseURL}/manage/backgroundMusics/${id}/backgroundMusicTags`,
            }
        },
        backgroundMusicTag: {
            get: (offset, limit) => `${baseURL}/manage/backgroundMusicTags?offset=${offset}&limit=${limit}`,
            query: (id) => `${baseURL}/manage/backgroundMusicTags/${id}`,
            add: `${baseURL}/manage/backgroundMusicTags`,
            edit: (id) => `${baseURL}/manage/backgroundMusicTags/${id}`,
            delete: (id) => `${baseURL}/manage/backgroundMusicTags/${id}`,
            backgroundMusic: {
                query: (id) => `${baseURL}/manage/backgroundMusicTags/${id}/backgroundMusics`
            }
        },
        app: {
            get: (offset, limit) => `${baseURL}/manage/getApps?offset=${offset}&limit=${limit}`,
            query:`dd`,
            add: `${baseURL}/manage/publishApp`,
            edit: `${baseURL}/manage/updateApp`,
            // delete: (id) => `${baseURL}/manage/stories/${id}`
        },
        discover: {
            get: (offset, limit) => `${baseURL}/manage/Discoveries?offset=${offset}&limit=${limit}`,
            query: (id) => `${baseURL}/manage/Discovery?id=${id}`,
            add: `${baseURL}/manage/saveDiscovery`,
            edit: `${baseURL}/manage/updateDiscovery`
        },
        recommend: {
            get:(offset, limit) => `${baseURL}/manage/getRecommendStoryListByPage?offset=${offset}&limit=${limit}`,
        },
        logo: {
            get:(page, pageSize) => `${baseURL}/manage/getBadgeTypeListByPage?page=${page}&pageSize=${pageSize}`,
            add:`${baseURL}/manage/badgeTypes`,
            edit:(id) => `${baseURL}/manage/badgeTypes/${id}`,
            delete:(id) => `${baseURL}/manage/badgeTypes/${id}`,
            query:(id) => `${baseURL}/manage/badgeTypes/${id}`,
            detail:{
                query:(typeId) => `${baseURL}/manage/getBadgeListByTypeId?typeId=${typeId}`,
                add:`${baseURL}/manage/badges`,
                edit:(id) => `${baseURL}/manage/badges/${id}`,
                delete:(id) => `${baseURL}/manage/badges/${id}`
            }
        },
        role: {
            edit:(id) => `${baseURL}/manage/storyRoles/${id}`,
            audio:`${baseURL}/manage/uploadAudio`,
            icon:`${baseURL}/manage/uploadIcon`
        },
        icon: {
            post:`${baseURL}/manage/uploadIcon`
        },
        file: {
            post:`${baseURL}/manage/uploadMulti`
        },
        individual:{
            get:(page,pageSize) => `${baseURL}/manage/getQuestionListByPage?page=${page}&pageSize=${pageSize}`,
            query:id => `${baseURL}/manage/questions/${id}`,
            add:`${baseURL}/manage/questions`,
            edit:id => `${baseURL}/manage/questions/${id}`,
            delete:id => `${baseURL}/manage/questions/${id}`
        },
        works:{
            query:(id) => `${baseURL}/user/getShareWorksById?id=${id}`
        },
        album:{
            get:(page,pageSize) => `${baseURL}/manage/getAlbumListByPage?page=${page}&pageSize=${pageSize}`,
            query:id => `${baseURL}/manage/albums/${id}`,
            add:`${baseURL}/manage/albums`,
            edit:id => `${baseURL}/manage/albums/${id}`
        },
        storySet:{
            get:(page,pageSize) => `${baseURL}/manage/getAllStorySetByPage?page=${page}&pageSize=${pageSize}`,
            add:`${baseURL}/manage/storySets`,
            edit:id => `${baseURL}/manage/storySets/${id}`,
            query:id => `${baseURL}/manage/storySets/${id}`,
            delete:id => `${baseURL}/manage/storySets/${id}`,
            recommend:{
                add:id => `${baseURL}/manage/storySets/${id}/recommendations`,
                delete:id => `${baseURL}/manage/storySets/${id}/recommendations`
            }
        }
    }
})

export default config
