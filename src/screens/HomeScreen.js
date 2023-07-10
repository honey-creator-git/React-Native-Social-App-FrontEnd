import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, SafeAreaView, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

import LoadingOverlay from '../components/LoadingOverlay';
import Recipe from '../components/Recipe';
import TopBar from '../components/TopBar';
import Images from '../assets/Images';
import VideoCard from '../components/VideoCard';
import { toolkitActions } from '../../redux/actions/toolkitActions'
import { forumActions } from '../../redux/actions/forumActions'
import { userActions } from '../../redux/actions/userActions'

// const recipes = [
//   {
//     image: require('../assets/images/forum1.png'),
//     title: 'Grilled Chicken Cabbage Salad',
//     category: '30 MINS MEAL'
//   },
//   {
//     image: require('../assets/images/forum2.png'),
//     title: 'Salad from tomatoes, cucumber, red onions',
//     category: '30 MINS MEAL'
//   },
//   {
//     image: require('../assets/images/forum3.png'),
//     title: 'Cottage cheese pie tart with fresh cheese',
//     category: '30 MINS MEAL'
//   },
//   {
//     image: require('../assets/images/forum4.png'),
//     title: 'Salted raw fish fillet with egg and piece',
//     category: '30 MINS MEAL'
//   },
// ];

// const videos = [
//   {
//     thumbnail: require('../assets/images/video1.png'),
//     title: 'Hope, Strength and Faith Meditation',
//     url: 'https://www.w3schools.com/html/mov_bbb.mp4',
//     cookingPeriod: 0,
//     coverLetterImage: "https://ourserendipity.s3.amazonaws.com/toolkit/1660637008608-cover.png",
//     description: "",
//     id: "62fb4f4f838eddd4be857511",
//     ingredients: null,
//     instructions: null,
//     link: "",
//     medias: "[{\"url\":\"https://ourserendipity.s3.amazonaws.com/toolkit/1660637008611-video8.mp4\",\"mediaType\":\"video\",\"period\":6}]", 
//     postedAt: "2022-08-16 08:03:27",
//     preparation: 0,
//     sortTypeId: "",
//     title: "Hope, Strenth and Faith Meditation - 1",
//     todayActivity: false,
//     toolkitType: 5,
//     weeklyPost: true
//   },
//   {
//     thumbnail: require('../assets/images/video2.png'),
//     title: 'Hope, Strength and Faith Meditation',
//     url: 'https://www.w3schools.com/html/mov_bbb.mp4',
//     cookingPeriod: 0,
//     coverLetterImage: "https://ourserendipity.s3.amazonaws.com/toolkit/1660637008608-cover.png",
//     description: "",
//     id: "62fb4f4f838eddd4be857511",
//     ingredients: null,
//     instructions: null,
//     link: "",
//     medias: "[{\"url\":\"https://ourserendipity.s3.amazonaws.com/toolkit/1660637008611-video8.mp4\",\"mediaType\":\"video\",\"period\":6}]", 
//     postedAt: "2022-08-16 08:03:27",
//     preparation: 0,
//     sortTypeId: "",
//     title: "Hope, Strenth and Faith Meditation - 1",
//     todayActivity: false,
//     toolkitType: 5,
//     weeklyPost: true
//   }
// ]

const Activity = () => {
  const todayActivity = useSelector((state) => state.toolkit['toolkitPost']);
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.title}>
          Today's Activity
        </Text>
        <TouchableOpacity>
          <Text style={styles.screenLink}>
            see progress
          </Text>
        </TouchableOpacity>
      </View>
      <Image
        source={{uri: todayActivity["coverLetterImage"]}}
        style={styles.activityImage}
      />
      <Text style={styles.activityTitle}>
        {todayActivity['title']}
      </Text>
      <Text style={styles.activityContent}>
        {todayActivity['description']}
      </Text>
    </View>
  )
}

const Recipes = (props) => {
  const { recipes, navigation } = props;

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.title}>
          Your Weekly Recipe
        </Text>
        <View style={styles.activityTimeContainer}>
          <View style={styles.activityTimePeriod}>
            <TouchableOpacity
              onPress={() => { navigation.navigate('WeeklyRecipes') }}
            >
              <Text style={styles.activityTimePeriodText}>see all recipes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.recipes}>
        {recipes.map((recipe, index) => (
          <TouchableOpacity
            key={index}
            style={styles.recipe}
            onPress={() => {navigation.navigate('RecipeDetail', {recipeInfo: JSON.stringify(recipe)})}}
          >
            <Recipe recipe={recipe} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const Meditation = (props) => {
  const { meditations, navigation } = props;
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.title}>
          Weekly Meditation
        </Text>
      </View>
      <Text style={styles.description}>
        Another way to help improve mood and outlook is through positive thing. Members will receive daily affirmations
      </Text>
      <View style={styles.videos}>
        {meditations.map((meditation, index) => (
          <View style={{ width: '48%' }} key={index}>
            <TouchableOpacity
              // onPress={() => {navigation.navigate('FullScreenVideo', {url: JSON.parse(meditation["medias"])[0]["url"]})}}
              onPress={() => { navigation.navigate('FullScreenAudio', {title: meditation['title'], coverLetterImage: meditation['coverLetterImage'], fileUrl: JSON.parse(meditation["medias"])[0]["url"]})}}
            >
              <VideoCard videoData={meditation} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.activityTimeContainer}>
        <View style={styles.activityTimePeriod}>
          <TouchableOpacity
            onPress={() => { navigation.navigate('Meditation') }}
          >
            <Text style={styles.activityTimePeriodText}>see all videos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const Movement = (props) => {
  const { movements, navigation, toolkitTypes } = props;

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.title}>
          Weekly Movement
        </Text>
      </View>
      <Text style={styles.description}>
        Another way to help improve mood and outlook is through positive thing. Members will receive daily affirmations
      </Text>
      <View style={styles.videos}>
        {movements.map((movement, index) => (
          <View style={{ width: '48%' }} key={index}>
            <TouchableOpacity
              onPress={() => {navigation.navigate('FullScreenVideo', {url: JSON.parse(movement["medias"])[0]["url"]})}}
            >
              <VideoCard videoData={movement} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.activityTimeContainer}>
        <View style={styles.activityTimePeriod}>
          <TouchableOpacity
            onPress={() => { navigation.navigate('Movement', { toolkitType: JSON.stringify(toolkitTypes[3]) }) }}
          >
            <Text style={styles.activityTimePeriodText}>see all videos</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

const HomeScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const userToken = useSelector((state) => state.user["token"]);
  const loggedIn = useSelector((state) => state.user['userLoggedIn']);
  const [toolkitTypes, setToolkitTypes] = useState(
    JSON.parse(useSelector(
      (state) => state.toolkit['toolkitTypes'])
    ).sort((a, b) => parseFloat(a['type']) - parseFloat(b['type']))
  )
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(toolkitActions.getAllToolkitRecipes(userToken, props.navigation));
    dispatch(forumActions.getAllForums(userToken, props.navigation));
    dispatch(userActions.getAllUsers(userToken, props.navigation));
  }, [])

  const weeklyToolkitPostsForNutrition = useSelector((state) => state.toolkit["nutritionToolkitPost"])
  const weeklyToolkitPostsForHealthy = useSelector((state) => state.toolkit["healthyToolkitPost"])
  const weeklyToolkitPostsForRecipe = useSelector((state) => state.toolkit["recipeToolkitPost"])
  const weeklyToolkitPostsForMovement = useSelector((state) => state.toolkit["movementToolkitPost"])
  const weeklyToolkitPostsForMeditation = useSelector((state) => state.toolkit["meditationToolkitPost"])

  var weeksNutritions, weeksHealthy, weeksRecipe, weeksMovement, weeksMeditation, nutritionLen, healthyLen, recipeLen, movementLen, meditationLen;

  if(!!weeklyToolkitPostsForNutrition) {
    weeksNutritions = JSON.parse(weeklyToolkitPostsForNutrition);
    nutritionLen = weeksNutritions.length;
  }
  if(!!weeklyToolkitPostsForHealthy) {
    weeksHealthy = JSON.parse(weeklyToolkitPostsForHealthy);
    healthyLen = weeksHealthy.length;
  }
  if(!!weeklyToolkitPostsForRecipe) {
    weeksRecipe = JSON.parse(weeklyToolkitPostsForRecipe);
    recipeLen = weeksRecipe.length;
  }
  if(!!weeklyToolkitPostsForMovement) {
    weeksMovement = JSON.parse(weeklyToolkitPostsForMovement);
    weeksMovement = weeksMovement.map((item, index) => {
      item['medias'] = JSON.stringify(item['medias'])
      return item
    });
    movementLen = weeksMovement.length;
  }
  if(!!weeklyToolkitPostsForMeditation) {
    weeksMeditation = JSON.parse(weeklyToolkitPostsForMeditation);
    weeksMeditation = weeksMeditation.map((item, index) => {
      item['medias'] = JSON.stringify(item['medias'])
      return item
    });
    meditationLen = weeksMeditation.length;
  }

  return (
    <View>
      { loggedIn == true && <TopBar
        title="Welcome"
        isAvatar={true}
        isBell={true}
        onAvatarClick={() => { props.navigation.navigate('ProfileSetting') }}
      /> }
      <View style={{backgroundColor: 'white'}}>
        <View style={styles.container}>
          {loading && <LoadingOverlay />}
          <ScrollView contentContainerStyle={{ paddingBottom: 160 }}>
            <Activity />
            <View style={styles.band}></View>
            {recipeLen > 0 &&
              <Recipes recipes={weeksRecipe} navigation={props.navigation} />
            }
            <View style={styles.band}></View>
            {meditationLen > 0 &&
              <Meditation meditations={weeksMeditation} navigation={props.navigation} />
            }
            <View style={styles.band}></View>
            {movementLen > 0 &&
              <Movement movements={weeksMovement} navigation={props.navigation} toolkitTypes={toolkitTypes} />
            }
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'OpenSans',
  },
  //General
  section: {
    padding: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: '#000000'
  },
  screenLink: {
    color: '#9CA3B7',
    fontSize: 12,
    fontFamily: 'OpenSans'
  },
  band: {
    height: 8,
    backgroundColor: '#F6F6F6'
  },
  //activity
  activityImage: {
    width: '100%',
    height: 180,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10
  },
  activityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A5593C',
    marginBottom: 5,
    fontFamily: 'OpenSans-Bold'
  },
  activityTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  activityTimePeriod: {
    backgroundColor: '#88B875',
    borderRadius: 5,
    paddingTop: 2,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 2,
    alignSelf: 'flex-start'
  },
  activityTimePeriodText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'OpenSans-Bold'
  },
  activityTimeMin: {
    marginLeft: 5,
    color: '#A1A1A1',
    fontSize: 15,
    fontFamily: 'OpenSans'
  },
  activityContent: {
    marginLeft: 5,
    color: '#989898',
    fontSize: 13,
    fontFamily: 'OpenSans'
  },
  //forums
  recipes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10
  },
  recipe: {
    width: '48%',
    marginTop: 5,
    marginBottom: 5
  },
  //Meditation
  description: {
    color: '#989898',
    fontSize: 13,
    marginTop: 10,
    fontFamily: 'OpenSans'
  },
  videos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 15,
  },

});

export default HomeScreen;
