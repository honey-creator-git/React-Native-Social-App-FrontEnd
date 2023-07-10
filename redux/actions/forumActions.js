import axios from "axios";
import { forumConstants, userConstants } from '../constants';
import { ENDPOINT } from 'react-native-dotenv';

export const forumActions = {
    getAllForums,
    getAllForumPostsWithTypeId,
    followForumOwner,
    submitNewCommit,
    addForumLikeEmotion,
    addForumPostCommentLikeEmotion,
}

function getAllForums(userToken, navigation) {
    return dispatch => {
        axios.get(ENDPOINT + '/forums', {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }).then((result) => {
            const {data} = result
            if(data["status"] == true) {
                const forums = JSON.stringify(data["payload"])

                dispatch({
                    type: forumConstants.GET_FORUM_TYPES,
                    forumTypes: forums
                })
            } else if(data["status"] == "Error Occurred in parsing user token.") {
                dispatch({type: userConstants.LOGOUT});
                navigation.navigate('Login', {err: 'token is expired'});
            }
        }).catch((err) => {
            console.log("Error => ", err);
        })
    }
}

function getAllForumPostsWithTypeId(userToken, forumTypeId, navigation) {
    return dispatch => {
        axios.get(ENDPOINT + `/forum/posts/${forumTypeId}`, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }).then((result) => {
            const {data} = result
            if(data["status"] == true) {
                const forumPostsWithTypeId = JSON.stringify(data["payload"])
                switch(forumTypeId) {
                    case 1:
                        dispatch({
                            type: forumConstants.GET_ALL_FORUM_POSTS_WITH_TYPE1,
                            forumPosts: forumPostsWithTypeId
                        })
                        return null
                    case 2:
                        dispatch({
                            type: forumConstants.GET_ALL_FORUM_POSTS_WITH_TYPE2,
                            forumPosts: forumPostsWithTypeId
                        })
                        return null
                    case 3:
                        dispatch({
                            type: forumConstants.GET_ALL_FORUM_POSTS_WITH_TYPE3,
                            forumPosts: forumPostsWithTypeId
                        })
                        return null
                    case 4:
                        dispatch({
                            type: forumConstants.GET_ALL_FORUM_POSTS_WITH_TYPE4,
                            forumPosts: forumPostsWithTypeId
                        })
                        return null
                    case 5:
                        dispatch({
                            type: forumConstants.GET_ALL_FORUM_POSTS_WITH_TYPE5,
                            forumPosts: forumPostsWithTypeId
                        })
                        return null
                    case 6:
                        dispatch({
                            type: forumConstants.GET_ALL_FORUM_POSTS_WITH_TYPE6,
                            forumPosts: forumPostsWithTypeId
                        })
                        return null
                    case 7:
                        dispatch({
                            type: forumConstants.GET_ALL_FORUM_POSTS_WITH_TYPE7,
                            forumPosts: forumPostsWithTypeId
                        })
                        return null
                    case 8:
                        dispatch({
                            type: forumConstants.GET_ALL_FORUM_POSTS_WITH_TYPE8,
                            forumPosts: forumPostsWithTypeId
                        })
                        return null
                    case 9:
                        dispatch({
                            type: forumConstants.GET_ALL_FORUM_POSTS_WITH_TYPE9,
                            forumPosts: forumPostsWithTypeId
                        })
                        return null
                    case 10:
                        dispatch({
                            type: forumConstants.GET_ALL_FORUM_POSTS_WITH_TYPE10,
                            forumPosts: forumPostsWithTypeId
                        })
                        return null
                }
                
            } else if(data["status"] == "Error Occurred in parsing user token.") {
                dispatch({type: userConstants.LOGOUT});
                navigation.navigate('Login', {err: 'token is expired'});
            }
        }).catch((err) => {
            console.log("Error => ", err);
        })
    }
}

function followForumOwner(userToken, cUserId, oUserId, navigation) {
    return dispatch => {
        axios.post(ENDPOINT + `/user/follow/${oUserId}`,
        {
            'UserID': cUserId,
        },
        {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }).then((result) => {
            const {data} = result
            if(data['status'] == true) {
                const followedUsers = data["payload"]['follows']

                dispatch({
                    type: forumConstants.FOLLOW_FORUM_OWNER,
                    follows: followedUsers
                })

                // navigation.navigate('ForumDetails', {followedUsers: followedUsers});
            } else if(data["status"] == "Error Occurred in parsing user token.") {
                dispatch({type: userConstants.LOGOUT});
                navigation.navigate('Login', {err: 'token is expired'});
            }
        }).catch((err) => {
            console.log("Error => ", err);
        })
    }
}

function submitNewCommit(userToken, forumPostId, commit, userId, navigation) {
    return dispatch => {
        axios.post(ENDPOINT + `/forum/post/comment/${forumPostId}`, {
            'Description': commit,
            'PostedBy': userId,
            'PostId': forumPostId
        }, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }).then((result) => {
            const {data} = result
            if (data['status'] == true) {
                const comments = JSON.stringify(data["payload"]["updated_comments"])

                dispatch({
                    type: forumConstants.ADD_NEW_COMMENT,
                    forumPostComments: comments,
                })

                console.log("Hi => ");

                navigation.navigate('ForumDetails', {comments: comments, updatedForumPostComment: null})
            } else if(data["status"] == "Error Occurred in parsing user token.") {
                dispatch({type: userConstants.LOGOUT});
                navigation.navigate('Login', {err: 'token is expired'});
            }
        }).catch((err) => {
            console.log("Error => ", err);
        })
    }
}

function addForumLikeEmotion(userToken, forumId, emotion, navigation) {
    return dispatch => {
        axios.put(ENDPOINT + `/forum/post/emotions/${forumId}`, {
            'Emotions': emotion
        }, {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
        }).then((result) => {
            const {data} = result;
            if(data['status'] == true) {
                const forumPostLike = data['payload']['emotions']['like']
                const forumPostDislike = data['payload']['emotions']['dislike']

                dispatch({
                    type: forumConstants.UPDATE_FORUM_POST_EMOTION,
                    emotion: {
                        like: forumPostLike,
                        dislike: forumPostDislike
                    }
                })
            } else if(data['status'] == "Error Occurred in parsing user token.") {
                dispatch({type: userConstants.LOGOUT});
                navigation.navigate('Login', {err: 'token is expired'});
            }
        }).catch((err) => {
            console.log("Error => ", err);
        })
    }
}

function addForumPostCommentLikeEmotion(userToken, forumPostId, commentId, emotion, navigation) {

    return dispatch => {
        axios.put(ENDPOINT + `/forum/post/comment/emotion/${forumPostId}/${commentId}`, {
            'Emotions': emotion
        }, {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
        }).then((result) => {
            const {data} = result;
            if(data["status"] == true) {

                const updatedForumPostComment = JSON.stringify(data["data"]['payload']);

                dispatch({
                    type: forumConstants.UPDATE_FORUM_POST_COMMENT_EMOTION,
                    updatedForumPostComment: updatedForumPostComment
                })

                navigation.navigate('ForumDetails', {updatedForumPostComment: updatedForumPostComment})
            } else if(data["status"] == "Error Occurred in parsing user token.") {
                dispatch({type: userConstants.LOGOUT});
                navigation.navigate('Login', {err: 'token is expired'});
            }
        }).catch((err) => {
            console.log("Error => ", err);
        })
    }
}