import { toolkitConstants } from '../constants'

const INITIAL_STATE = {
  toolkitTypes: null,
  toolkitPosts_1: null,
  toolkitPosts_2: null,
  toolkitPosts_3: null,
  toolkitPosts_4: null,
  toolkitPosts_5: null,
  toolkitPosts_6: null,
  toolkitPosts_7: null,
  toolkitPost : null,
  nutritionToolkitPost: null,
  healthyToolkitPost: null,
  recipeToolkitPost: null,
  movementToolkitPost: null,
  meditationToolkitPost: null,
  toolkitRecipes: null,
};

export default function toolkit(state = INITIAL_STATE, action) {
    switch (action.type) {
      case toolkitConstants.TOOLKIT_TYPES:
        state.toolkitTypes = action.toolkitTypes;
        return state;
      case toolkitConstants.GET_ALL_TOOLKIT_POSTS_WITH_TYPE1:
        state.toolkitPosts_1 = action.toolkitPosts;
        return state;
      case toolkitConstants.GET_ALL_TOOLKIT_POSTS_WITH_TYPE2:
        state.toolkitPosts_2 = action.toolkitPosts;
        return state;
      case toolkitConstants.GET_ALL_TOOLKIT_POSTS_WITH_TYPE3:
        state.toolkitPosts_3 = action.toolkitPosts;
        return state;
      case toolkitConstants.GET_ALL_TOOLKIT_POSTS_WITH_TYPE4:
        state.toolkitPosts_4 = action.toolkitPosts;
        return state;
      case toolkitConstants.GET_ALL_TOOLKIT_POSTS_WITH_TYPE5:
        state.toolkitPosts_5 = action.toolkitPosts;
        return state;
      case toolkitConstants.GET_ALL_TOOLKIT_POSTS_WITH_TYPE6:
        state.toolkitPosts_6 = action.toolkitPosts;
        return state;
      case toolkitConstants.GET_ALL_TOOLKIT_POSTS_WITH_TYPE7:
        state.toolkitPosts_7 = action.toolkitPosts;
        return state;
      case toolkitConstants.TODAY_ACTIVITY:
        state.toolkitPost = action.toolkitPost;
        return state
      case toolkitConstants.SET_WEEKLY_POSTS:
        state.nutritionToolkitPost = action.nutritionToolkitPost
        state.healthyToolkitPost = action.healthyToolkitPost
        state.recipeToolkitPost = action.recipeToolkitPost
        state.movementToolkitPost = action.movementToolkitPost
        state.meditationToolkitPost = action.meditationToolkitPost
        return state
      case toolkitConstants.SET_TOOLKIT_RECIPES:
        state.toolkitRecipes = action.toolkitRecipes
        return state
      default:
        return state
    }
  }


