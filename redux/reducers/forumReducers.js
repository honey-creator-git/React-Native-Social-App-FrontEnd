import { TabRouter } from '@react-navigation/native';
import { forumConstants } from '../constants'

const INITIAL_STATE = {
    forumTypes: null,
    forumPosts_1: null,
    forumPosts_2: null,
    forumPosts_3: null,
    forumPosts_4: null,
    forumPosts_5: null,
    forumPosts_6: null,
    forumPosts_7: null,
    forumPosts_8: null,
    forumPosts_9: null,
    forumPosts_10: null,
    forumFollows: null,
    forumPostComments: null,
    forumPostEmotion: null,
    updatedForumPostComment: null,
};

export default function forum(state = INITIAL_STATE, action) {
    switch (action.type) {
      case forumConstants.GET_FORUM_TYPES:
        state.forumTypes = action.forumTypes;
        return state
      case forumConstants.GET_ALL_FORUM_POSTS_WITH_TYPE1:
        state.forumPosts_1 = action.forumPosts;
        return state
      case forumConstants.GET_ALL_FORUM_POSTS_WITH_TYPE2:
        state.forumPosts_2 = action.forumPosts;
        return state
      case forumConstants.GET_ALL_FORUM_POSTS_WITH_TYPE3:
        state.forumPosts_3 = action.forumPosts;
      return state
      case forumConstants.GET_ALL_FORUM_POSTS_WITH_TYPE4:
        state.forumPosts_4 = action.forumPosts;
        return state
      case forumConstants.GET_ALL_FORUM_POSTS_WITH_TYPE5:
        state.forumPosts_5 = action.forumPosts;
        return state
      case forumConstants.GET_ALL_FORUM_POSTS_WITH_TYPE6:
        state.forumPosts_6 = action.forumPosts;
        return state
      case forumConstants.GET_ALL_FORUM_POSTS_WITH_TYPE7:
        state.forumPosts_7 = action.forumPosts;
        return state
      case forumConstants.GET_ALL_FORUM_POSTS_WITH_TYPE8:
        state.forumPosts_8 = action.forumPosts;
        return state
      case forumConstants.GET_ALL_FORUM_POSTS_WITH_TYPE9:
        state.forumPosts_9 = action.forumPosts;
        return state
      case forumConstants.GET_ALL_FORUM_POSTS_WITH_TYPE10:
          state.forumPosts_10 = action.forumPosts;
          return state
      case forumConstants.FOLLOW_FORUM_OWNER:
          state.forumFollows = action.follows;
          return state
      case forumConstants.FOLLOW_FORUM_OWNER:
          state.forumPostComments = action.forumPostComments;
          return state;
      case forumConstants.UPDATE_FORUM_POST_EMOTION:
          state.forumPostEmotion = action.emotion;
          return state;
      case forumConstants.UPDATE_FORUM_POST_COMMENT_EMOTION:
          state.updatedForumPostComment = action.updatedForumPostComment;
          return state;
      default:
        return state
    }
}