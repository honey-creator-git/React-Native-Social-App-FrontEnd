import axios from "axios";
import { toolkitConstants, userConstants } from '../constants';
import { ENDPOINT } from 'react-native-dotenv';

export const toolkitActions = {
    getTodayActivityToolkitPost,
    getWeeklyToolkitPosts,
    getAllToolkitRecipes,
    getAllToolkitTypes,
    getToolkitPostsWithType,
}

function getAllToolkitTypes(userToken, navigation) {
    return dispatch => {
        axios.get(ENDPOINT + '/toolkits?results=1000&page=1&sortField=id&sortOrder=ascend', {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }).then((result) => {
            const {data} = result
            if(data["status"] == true) {
                const toolkitTypes = JSON.stringify(data["payload"])
                dispatch({ type: toolkitConstants.TOOLKIT_TYPES, toolkitTypes: toolkitTypes })
            } else if(data["status"] == "Error Occurred in parsing user token.") {
                dispatch({ type: userConstants.LOGOUT })
                navigation.navigate('Login', {err: 'token is expired'})
            }
        }).catch(err => {
            console.log("Error => ", err);
        })
    }
}

function getToolkitPostsWithType(userToken, toolkitType, navigation) {
    return dispatch => {
        axios.get(ENDPOINT + `/toolkit/posts/${toolkitType}?results=1000&page=1&sortField=id&sortOrder=descend`, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
       }).then((result) => {
            const {data} = result
            if(data["status"] == true) {
                const toolkitPostsWithTypeId = JSON.stringify(data["payload"])
                console.log("Toolkit Type =>>>> ", toolkitType, "\n");
                if(toolkitType == 6) {
                    console.log("Toolkit Posts =>>>> ", toolkitPostsWithTypeId);
                }
                switch(toolkitType) {
                    case 1:
                        dispatch({
                            type: toolkitConstants.GET_ALL_TOOLKIT_POSTS_WITH_TYPE1,
                            toolkitPosts: toolkitPostsWithTypeId
                        })
                        return null
                    case 2:
                        dispatch({
                            type: toolkitConstants.GET_ALL_TOOLKIT_POSTS_WITH_TYPE2,
                            toolkitPosts: toolkitPostsWithTypeId
                        })
                        return null
                    case 3:
                        dispatch({
                            type: toolkitConstants.GET_ALL_TOOLKIT_POSTS_WITH_TYPE3,
                            toolkitPosts: toolkitPostsWithTypeId
                        })
                        return null
                    case 4:
                        dispatch({
                            type: toolkitConstants.GET_ALL_TOOLKIT_POSTS_WITH_TYPE4,
                            toolkitPosts: toolkitPostsWithTypeId
                        })
                        return null
                    case 5:
                        dispatch({
                            type: toolkitConstants.GET_ALL_TOOLKIT_POSTS_WITH_TYPE5,
                            toolkitPosts: toolkitPostsWithTypeId
                        })
                        return null
                    case 6:
                        dispatch({
                            type: toolkitConstants.GET_ALL_TOOLKIT_POSTS_WITH_TYPE6,
                            toolkitPosts: toolkitPostsWithTypeId
                        })
                        return null
                    case 7:
                        dispatch({
                            type: toolkitConstants.GET_ALL_TOOLKIT_POSTS_WITH_TYPE7,
                            toolkitPosts: toolkitPostsWithTypeId
                        })
                        return null
                }
            } else if(data["status"] == "Error Occurred in parsing user token.") {
                dispatch({type: userConstants.LOGOUT})
                navigation.navigate('Login', {err: 'token is expired'})
            }
       }).catch((err) => {
            console.log("Error => ", err);
       })
    }
}

function getTodayActivityToolkitPost(userToken, navigation) {
    return dispatch => {
        axios.get(ENDPOINT + "/toolkit/posts/today", {
            headers: {
                "Authorization": `Bearer ${userToken}`,
            }
        }).then((result)=>{
            const { data } = result
            if(data["status"] == true) {
                const todayActivity = data["payload"][0];
                dispatch({ type: toolkitConstants.TODAY_ACTIVITY, toolkitPost: todayActivity});                
            } else if(data["status"] == "Error Occurred in parsing user token."){
                dispatch({ type: userConstants.LOGOUT });
                navigation.navigate('Login', {err: "token is expired"})
            }
        }).catch(err => {
            console.log("Error => ", err);
        });
    }
}

function getWeeklyToolkitPosts(userToken, navigation) {
    return dispatch => {
        axios.get(ENDPOINT + "/toolkit/posts/weekly_posts", {
            headers: {
                "Authorization": `Bearer ${userToken}`,
            }
        }).then((result) => {
            const { data } = result
            if(data["status"] == true) {
                const weeklyToolkitPostsForNutrition = JSON.stringify(data["payload"][0]["weeklyToolkitPosts"])
                const weeklyToolkitPostsForHealthy = JSON.stringify(data["payload"][1]["weeklyToolkitPosts"])
                const weeklyToolkitPostsForRecipe = JSON.stringify(data["payload"][2]["weeklyToolkitPosts"])
                const weeklyToolkitPostsForMovement = JSON.stringify(data["payload"][3]["weeklyToolkitPosts"])
                const weeklyToolkitPostsForMeditation = JSON.stringify(data["payload"][4]["weeklyToolkitPosts"])
                dispatch(
                    { 
                        type: toolkitConstants.SET_WEEKLY_POSTS,
                        nutritionToolkitPost: weeklyToolkitPostsForNutrition,
                        healthyToolkitPost: weeklyToolkitPostsForHealthy,
                        recipeToolkitPost: weeklyToolkitPostsForRecipe,
                        movementToolkitPost: weeklyToolkitPostsForMovement,
                        meditationToolkitPost: weeklyToolkitPostsForMeditation,
                    }
                )
            } else if(data["status"] == "Error Occurred in parsing user token."){
                dispatch({ type: userConstants.LOGOUT });
                navigation.navigate('Login', {err: "token is expired"})
            }
        }).catch(err => {
            console.log("Error => ", err);
        })
    }
}

function getAllToolkitRecipes(userToken, navigation) {
    return dispatch => {
        axios.get(ENDPOINT + '/toolkit/posts/3?results=1000&page=1&sortField=id&sortOrder=descend', {
            headers: {
                'Authorization': `Bearer ${userToken}`,                
            }
        }).then((result) => {
            const {data} = result
            if(data["status"] == true) {
                const toolkitRecipes = JSON.stringify(data["payload"])

                dispatch({
                    type: toolkitConstants.SET_TOOLKIT_RECIPES,
                    toolkitRecipes: toolkitRecipes,
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