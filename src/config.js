import _ from 'underscore'
import qs from 'qs'
const isProduction = process.env.NODE_ENV === "production"
const testBaseURL = process.env.REACT_APP_TEST_BASE_URL
const baseURL = (isProduction)
    ? testBaseURL||'http://120.79.0.217'
    : ''
// const baseURL = ""
const config = _.extend({
    // common config
    debug: true
}, {
    api: {
        auth: {
            oss:`${baseURL}/auth/getOssSignature?url=test`,
            sts:`${baseURL}/auth/getAppOssToken`

        },
        user: {
            login: (id, ps) => `${baseURL}/manage/auth?username=${id}&password=${ps}`,
            logout: `${baseURL}/manage/auth`,
            get:(page,pageSize,query='') => `${baseURL}/manage/user/getUserByFuzzyQuery?page=${page}&pageSize=${pageSize}&query=${query}`,
            query:id => `${baseURL}/manage/user/getUserById?id=${id}`,
            edit:`${baseURL}/manage/user/updateUser`,
            add:`${baseURL}/manage/user/saveUser`,
            delete:id => `${baseURL}/manage/user/deleteUserById/${id}`,
            work:{
                get:(id,page,pageSize) => `${baseURL}/manage/getWorksListByUserId?id=${id}&page=${page}&pageSize=${pageSize}`,
                add:`${baseURL}/manage/saveWorksByUserId`,
                query:id => `${baseURL}/manage/getWorkById?id=${id}`,
                edit:`${baseURL}/manage/updateWorksById`,
                delete:id => `${baseURL}/manage/deleteWorksById/${id}`
            },
            zombieFens:{
                add:`${baseURL}/manage/user/saveDummy`
            }
        },
        story: {
            all: (offset,limit) => `${baseURL}/manage/stories?offset=${offset}&limit=${limit}`,
            list: `${baseURL}/manage/getAllStoryTitle`,
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
            add: `${baseURL}/manage/v3/stories`,
            edit: (id) => `${baseURL}/manage/v3/stories/${id}`,
            delete: (id) => `${baseURL}/manage/stories/${id}`,
            default: (id) => `${baseURL}/manage/addDefaultStory?storyId=${id}`,
            tag:{
                add:(storyId,tagId) => `${baseURL}/manage/stories/${storyId}/storyTags/${tagId}`,
                delete:(storyId,tagId) => `${baseURL}/manage/stories/${storyId}/storyTags/${tagId}`,
                query:(id) => `${baseURL}/manage/stories/${id}/storyTags`,
            },
            recommend:{
                add:(id) => `${baseURL}/manage/stories/${id}/recommendations`,
                delete:(id) => `${baseURL}/manage/stories/${id}/recommendations`
            },
            cover:{
                delete:`${baseURL}/manage/deleteCover`
            },
            role: {
                query:(id) => `${baseURL}/manage/getStoryRoleListByStoryId?storyId=${id}`,
                add:`${baseURL}/manage/storyRoles`,
                get:(storyId) => `${baseURL}/manage/getStoryRoleListByStoryId?storyId=${storyId}`,
                attach:`${baseURL}/manage/saveStoryRoleAudio`,
                info:(storyId) => `${baseURL}/manage/getAdminStoryRoleAudioByStory?storyId=${storyId}`,
                delete:id => `${baseURL}/manage/storyRoles/${id}`
            },
            storySet:{
                query:storyId => `${baseURL}/manage/getStorySetByStoryId?storyId=${storyId}`
            },
            scenario:{
                add:`${baseURL}/manage/saveStoryScript`,
                query:storyId => `${baseURL}/manage/getStoryScriptByStoryId?storyId=${storyId}`,
                edit:`${baseURL}/manage/updataStoryScriptByStoryId`
            },
            work:{
                get:(id,page,pageSize) => `${baseURL}/manage/getWorksListByStoryId?id=${id}&page=${page}&pageSize=${pageSize}`,
            },
            introduction:{
                add:`${baseURL}/manage/addIntroductionForStory`
            },
            tellCount:{
                add:`${baseURL}/manage/updateTellCountByStoryId`
            },
            hotSearch:{
                get:(page,pageSize) => `${baseURL}/manage/getHotStoryList?page=${page}&pageSize=${pageSize}`
            }
        },
        storyTag: {
            get: (offset, limit) => `${baseURL}/manage/storyTags?offset=${offset}&limit=${limit}`,
            query: (id) => `${baseURL}/manage/storyTags/${id}`,
            add: `${baseURL}/manage/storyTags`,
            edit: (id) => `${baseURL}/manage/storyTags/${id}`,
            delete: (id) => `${baseURL}/manage/storyTags/${id}`,
            hotTag:{
                add:`${baseURL}/manage/addTagToHotsearch`,
                get:(page,pageSize) => `${baseURL}/manage/getHotStoryList?page=${page}&pageSize=${pageSize}`
            }
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
            query:id => `${baseURL}/manage/getAppDetails?id=${id}`,
            add: `${baseURL}/manage/v3/publishApp`,
            edit: `${baseURL}/manage/v3/updateApp`,
            delete: `${baseURL}/manage/deleteApp`,
            lowestVersion: {
                get:`${baseURL}/manage/getMinLimitVersionApp`,
                add:`${baseURL}/manage/updateMinLimitVersion`
            }
        },
        discover: {
            get: (offset, limit) => `${baseURL}/manage/Discoveries?offset=${offset}&limit=${limit}`,
            query: (id) => `${baseURL}/manage/Discovery?id=${id}`,
            add: `${baseURL}/manage/saveDiscovery`,
            edit: `${baseURL}/manage/updateDiscovery`,
            delete: `${baseURL}/manage/deleteDiscovery`
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
        audio: {
            post:`${baseURL}/manage/uploadAudio`
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
            get:(page,pageSize,query='') => `${baseURL}/manage/getStorySetByFuzzyQuery?page=${page}&pageSize=${pageSize}&query=${query}`,
            add:`${baseURL}/manage/storySets`,
            edit:id => `${baseURL}/manage/storySets/${id}`,
            query:id => `${baseURL}/manage/storySets/${id}`,
            delete:id => `${baseURL}/manage/storySets/${id}`,
            recommend:{
                add:id => `${baseURL}/manage/storySets/${id}/recommendations`,
                delete:id => `${baseURL}/manage/storySets/${id}/recommendations`
            }
        },
        storySurround:{
            get:(page,pageSize,storyId='',type='') => `${baseURL}/manage/getStoryAmbitusByStoryId?storyId=${storyId}&page=${page}&pageSize=${pageSize}&type=${type}`,
            add:`${baseURL}/manage/saveStoryAmbitus`,
            edit:`${baseURL}/manage/updataStoryAmbitusById`,
            delete:id => `${baseURL}/manage/deleteStoryAmbitusById/${id}`,
            query:id => `${baseURL}/manage/getStoryAmbitusById?id=${id}`
        },
        readPlan:{
            get:(page,pageSize) => `${baseURL}/manage/selectAllReadPlan?page=${page}&pageSize=${pageSize}`,
            add:`${baseURL}/manage/saveReadPlan`,
            edit:`${baseURL}/manage/updateReadPlanById`,
            delete:id => `${baseURL}/manage/deleteReadPlan/${id}`,
            query:id => `${baseURL}/manage/getReadPlanById?id=${id}`,
            story:{
                get:(planId,page,pageSize) => `${baseURL}/manage/getStoryGroupByPlanId?ReadingPlanId=${planId}&page=${page}&pageSize=${pageSize}`,
                add:`${baseURL}/manage/updateStoryForReadPlan`
            }
        },
        babyRead:{
            get:(page,pageSize) => `${baseURL}/manage/selectAllBabyRead?page=${page}&pageSize=${pageSize}`,
            add:`${baseURL}/manage/saveBabyReadInfo`,
            edit:`${baseURL}/manage/updataBabyReadById`,
            delete:id => `${baseURL}/manage/deleteBabyReadById/${id}`,
            query:id => `${baseURL}/manage/getBabyReadtById?id=${id}`
        },
        storyTopic:{
            get:(page,pageSize) => `${baseURL}/manage/selectAllStoryTopic?page=${page}&pageSize=${pageSize}`,
            add:`${baseURL}/manage/saveStoryTopic`,
            edit:`${baseURL}/manage/updateStoryTopicById`,
            delete:id => `${baseURL}/manage/deleteStoryTopic/${id}`,
            query:id => `${baseURL}/manage/getStoryTopicById?id=${id}`,
            top:id => `${baseURL}/manage/stickieStoryTopic?id=${id}`,
            story:{
                get:(id) => `${baseURL}/manage/getStorysByStoryTopic?id=${id}`,
                add:`${baseURL}/manage/addStoryForStoryTopic`
            }
        },
        notice:{
            get:(page,pageSize) => `${baseURL}/manage/getSystemNoticeListByPage?page=${page}&pageSize=${pageSize}`,
            add:`${baseURL}/manage/systemNotices`,
            edit:id => `${baseURL}/manage/systemNotices/${id}`,
            delete:id => `${baseURL}/manage/systemNotices/${id}`,
            query:id => `${baseURL}/manage/systemNotices/${id}`
        },
        admin:{
            get:(page,pageSize) => `${baseURL}/manage/getAdminListByPage?page=${page}&pageSize=${pageSize}`,
            add:`${baseURL}/manage/admins`,
            edit:id => `${baseURL}/manage/admins/${id}`,
            delete:id => `${baseURL}/manage/admins/${id}`,
            permission:{
                add:`${baseURL}/manage/adminPowers`,
                delete:(adminId,code) => `${baseURL}/manage/deleteAdminPower`,
                query:(adminId,page,pageSize) => `${baseURL}/manage/getAdminPowerListByPage?id=${adminId}&page=${page}&pageSize=${pageSize}`
            }
        },
        permission:{
            get:(page,pageSize) => `${baseURL}/manage/getPowerCodeListByPage?page=${page}&pageSize=${pageSize}`,
            add:`${baseURL}/manage/powerCodes`,
            delete:id => `${baseURL}/manage/powerCodes/${id}`,
            edit:id => `${baseURL}/manage/powerCodes/${id}`,
            query:id => `${baseURL}/manage/powerCodes/${id}`
        },
        initImage:{
            get:(page,pageSize) => `${baseURL}/manage/initImage/getAllInitImageByPage?page=${page}&pageSize=${pageSize}`,
            add:`${baseURL}/manage/initImage/addInitImage`,
            delete:id => `${baseURL}/manage/initImage/deleteInitImageById?id=${id}`,
            edit:`${baseURL}/manage/initImage/updateInitImage`,
            query:id => `${baseURL}/manage/initImage/getInitImageById?id=${id}`,
            isShow:(id,isShow) => `${baseURL}/manage/initImage/updateIsShow?id=${id}&isShow=${isShow}`
        },
        resource:{
            get:(page,pageSize) => `${baseURL}/manage/getResourceListByPage?page=${page}&pageSize=${pageSize}`,
            add:`${baseURL}/manage/resources`,
            // edit:``,
            query:id => `${baseURL}/manage/resources/${id}`,
            delete:id => `${baseURL}/manage/resources/${id}`
        },
        nativeWork:{
            get:(page,pageSize,orderRule,fieldName) => `${baseURL}/manage/getLatestWorksByPage?page=${page}&pageSize=${pageSize}&orderRule=${orderRule}&fieldName=${fieldName}`,
            add:`${baseURL}/manage/saveWorksByUserId`,
            query:id => `${baseURL}/manage/getWorkById?id=${id}`,
            edit:`${baseURL}/manage/updateWorksById`,
            delete:id => `${baseURL}/manage/deleteWorksById/${id}`
        },
        opinion:{
            get:(page,pageSize) => `${baseURL}/manage/selectAllOpinion?page=${page}&pageSize=${pageSize}`
        },
        continuousLoginPrompt:{
            get:(page,pageSize) => `${baseURL}/manage/continuousLoginPrompt/seleteAllPrompt`,
            add:`${baseURL}/manage/continuousLoginPrompt/addPrompt`,
            edit:`${baseURL}/manage/continuousLoginPrompt/updatePrompt`,
            delete:id => `${baseURL}/manage/continuousLoginPrompt/deletePrompt/${id}`
        },
        destination:{
            get:(page,pageSize) => `${baseURL}/manage/getAllDestination?page=${page}&pageSize=${pageSize}`,
            add:`${baseURL}/manage/saveDestination`,
            delete:id => `${baseURL}/manage/deleteDestination/${id}`
        },
        pushMessage:{
            get:(page,pageSize) => `${baseURL}/manage/getAllMessagePush?page=${page}&pageSize=${pageSize}`,
            add:`${baseURL}/manage/saveMessagePush`,
            delete:id => `${baseURL}/manage/deleteMessagePush/${id}`,
            publish:`${baseURL}/manage/messagePush`,
            query:id => `${baseURL}/manage/getMessagePushById?messageId=${id}`,
            edit:`${baseURL}/manage/updateMessagePush`
        },
        worksTag:{
            get:(page,pageSize) => `${baseURL}/manage/workTag/selectAllWorkTag`,
            add:`${baseURL}/manage/workTag/insertWorkTag`,
            delete:id => `${baseURL}/manage/workTag/deleteWorkTag/${id}`,
            query:id => `${baseURL}/manage/workTag/selectWorkTagById?id=${id}`,
            edit:`${baseURL}/manage/workTag/update`,
            work:{
                get:(id,page,pageSize) => `${baseURL}/manage/getWorksListByTagId?tagId=${id}`
            }
        },
        comment:{
            get:(page,pageSize,ambitusId) =>`${baseURL}/manage/getCommentsByAmbitusId?page=${page}&pageSize=${pageSize}&ambitusId=${ambitusId}`,
            delete:commentId => `${baseURL}/manage/deleteComment?commentId=${commentId}`,
            add:`${baseURL}/manage/dummyAddComment`,
            removeBlackHouse:commentId => `${baseURL}/manage/releaseComment?commentId=${commentId}`,
            addJing:commentId => `${baseURL}/manage/commentAddCream?commentId=${commentId}`,
            cancelJing:commentId => `${baseURL}/manage/cancelCream?commentId=${commentId}`
        },
        feedbackTemplet:{
            add:`${baseURL}/manage/saveFeedbackTemplet`,
            get:(page,pageSize) => `${baseURL}/manage/selectFeedbackTemplet?page=${page}&pageSize=${pageSize}`,
            query:id => `${baseURL}/manage/selectFeedbackTempletById?id=${id}`,
            edit:`${baseURL}/manage/updateFeedbackTemplet`,
            delete:id => `${baseURL}/manage/deleteFeedbackTempletById?id=${id}`,
            publish:(userId,feedbackTempletId) => `${baseURL}/manage/sendSystemNoticeToUser?userId=${userId}&feedbackTempletId=${feedbackTempletId}`
        },
        userGoldAccount: {
            get:(page,pageSize) => `${baseURL}/manage/userGoldAccount/getAllUserGoldAccountByPage?page=${page}&pageSize=${pageSize}`
        },
        goldRewardRule: {
            get:typeName => `${baseURL}/manage/goldRewardRule/getGoldRewardRuleByType?typeName=${typeName}`,
            add:`${baseURL}/manage/goldRewardRule/addGoldRewardRule`,
            edit:`${baseURL}/manage/goldRewardRule/updateGoldRewardRule`,
            query:id => `${baseURL}/manage/goldRewardRule/getGoldRewardRuleById?id=${id}`,
            type: {
                get: `${baseURL}/manage/goldRewardRule/getAllType`
            }
        },
        rewardGoldPrompt: {
            get:(page,pageSize) => `${baseURL}/manage/rewardGoldPrompt/getAllRewardGoldPrompt?page=${page}&pageSize=${pageSize}`,
            add:`${baseURL}/manage/rewardGoldPrompt/addRewardGoldPrompt`,
            edit:`${baseURL}/manage/rewardGoldPrompt/updateRewardGoldPrompt`,
            query:id => `${baseURL}/manage/rewardGoldPrompt/getRewardGoldPromptById?id=${id}`
        }
    }
})

export default config
