import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Text
} from 'react-native';
import { Input } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import LoadingOverlay from '../components/LoadingOverlay';
import Recipe from '../components/Recipe';
import TopBar from '../components/TopBar';
import { parse } from 'qs';

const sorts = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

const recipes = [
  {
    image: require('../assets/images/forum1.png'),
    title: 'Grilled Chicken Cabbage Salad',
    category: '30 MINS MEAL',
    sort: 2
  },
  {
    image: require('../assets/images/forum2.png'),
    title: 'Salad from tomatoes, cucumber, red onions',
    category: '30 MINS MEAL',
    sort: 1
  },
  {
    image: require('../assets/images/forum1.png'),
    title: 'Grilled Chicken Cabbage Salad',
    category: '30 MINS MEAL',
    sort: 0
  },
  {
    image: require('../assets/images/forum2.png'),
    title: 'Salad from tomatoes, cucumber, red onions',
    category: '30 COMMENTS',
    sort: 3
  },
  {
    image: require('../assets/images/forum1.png'),
    title: 'Grilled Chicken Cabbage Salad',
    category: '30 MINS MEAL',
    sort: 2
  },
  {
    image: require('../assets/images/forum2.png'),
    title: 'Salad from tomatoes, cucumber, red onions',
    category: '30 MINS MEAL',
    sort: 1
  },
  {
    image: require('../assets/images/forum1.png'),
    title: 'Grilled Chicken Cabbage Salad',
    category: '30 MINS MEAL',
    sort: 0
  },
  {
    image: require('../assets/images/forum2.png'),
    title: 'Salad from tomatoes, cucumber, red onions',
    category: '30 COMMENTS',
    sort: 3
  },
  {
    image: require('../assets/images/forum1.png'),
    title: 'Grilled Chicken Cabbage Salad',
    category: '30 MINS MEAL',
    sort: 2
  },
  {
    image: require('../assets/images/forum2.png'),
    title: 'Salad from tomatoes, cucumber, red onions',
    category: '30 MINS MEAL',
    sort: 1
  },
  {
    image: require('../assets/images/forum1.png'),
    title: 'Grilled Chicken Cabbage Salad',
    category: '30 MINS MEAL',
    sort: 0
  },
  {
    image: require('../assets/images/forum2.png'),
    title: 'Salad from tomatoes, cucumber, red onions',
    category: '30 COMMENTS',
    sort: 3
  },
  {
    image: require('../assets/images/forum2.png'),
    title: 'Salad from tomatoes, cucumber, red onions',
    category: '30 COMMENTS',
    sort: 3
  },
];

const WeeklyRecipesScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [weeklyRecipes, setWeeklyRecipes] = useState([]);
  const [sort, setSort] = useState('Breakfast');
  const [search, setSearch] = useState(null);
  const allRecipes = useSelector((state) => state.toolkit["toolkitRecipes"])
  const loggedIn = useSelector((state) => state.user['userLoggedIn']);

  useEffect(() => {
    var parsedRecipes = JSON.parse(allRecipes);
    parsedRecipes = parsedRecipes.filter((item, index) => item.sortTypeId == "Breakfast")
    setWeeklyRecipes(parsedRecipes);
  }, [])

  const selectedStyle = {
    backgroundColor: '#687A61',
    borderRadius: 20, 
    paddingHorizontal: 10,
    marginHorizontal: 10,
    color: 'white'
  }

  const releasedStyle = {
    backgroundColor: 'white',
    borderRadius: 20, 
    paddingHorizontal: 10,
    marginHorizontal: 10,
    color: '#636363',
  }

  const changeSortType = (sort, key) => {
    setSort(sort);
    setIndex(key);
    switch (sort) {
      case "Breakfast":
        var parsedRecipes = JSON.parse(allRecipes);
        parsedRecipes = parsedRecipes.filter((item, index) => item.sortTypeId == "Breakfast")
        if(search != null) {
          parsedRecipes = parsedRecipes.filter((item, index) => item.title.includes(search));
        }
        setWeeklyRecipes(parsedRecipes);
        return weeklyRecipes
      case "Lunch":
        var parsedRecipes = JSON.parse(allRecipes);
        parsedRecipes = parsedRecipes.filter((item, index) => item.sortTypeId == "Lunch")
        if(search != null) {
          parsedRecipes = parsedRecipes.filter((item, index) => item.title.includes(search));
        }
        setWeeklyRecipes(parsedRecipes);
        return weeklyRecipes
      case "Dinner":
        var parsedRecipes = JSON.parse(allRecipes);
        parsedRecipes = parsedRecipes.filter((item, index) => item.sortTypeId == "Dinner")
        if(search != null) {
          parsedRecipes = parsedRecipes.filter((item, index) => item.title.includes(search));
        }
        setWeeklyRecipes(parsedRecipes);
        return weeklyRecipes
      case "Snack":
        var parsedRecipes = JSON.parse(allRecipes);
        parsedRecipes = parsedRecipes.filter((item, index) => item.sortTypeId == "Snack")
        if(search != null) {
          parsedRecipes = parsedRecipes.filter((item, index) => item.title.includes(search));
        }
        setWeeklyRecipes(parsedRecipes);
        return weeklyRecipes
      default:
        return weeklyRecipes
    }
  }

  const handleSearch = (text) => {
    setSearch(text);
    var parsedRecipes;
    if (text.length == 0) {
      parsedRecipes = JSON.parse(allRecipes);
      parsedRecipes = parsedRecipes.filter((item, index) => item.sortTypeId == sort);
    } else {
      parsedRecipes = JSON.parse(allRecipes);
      parsedRecipes = parsedRecipes.filter((item, index) => item.sortTypeId == sort);
      parsedRecipes = parsedRecipes.filter((item, index) => item.title.includes(text));
    }
    setWeeklyRecipes(parsedRecipes);
  }
  
  return (
    <View>
      { loggedIn == true && <TopBar
        title="Weekly Recipes"
        isArrowBack={true}
        onBack={() => { props.navigation.goBack() }}
        onAvatarClick={() => { props.navigation.navigate('ProfileSetting') }}
      /> }
      <View style={{backgroundColor: 'white'}}>
        <ScrollView horizontal={true}>
          {sorts.map((sort, key) => {
            return (
            <TouchableOpacity
              key={key}
              onPressIn={() => changeSortType(sort, key)}
            >
              <Text 
                style={
                  [
                    styles.sort, 
                    key === index ? selectedStyle : releasedStyle
                  ]
                } 
                key={key}
              >
                {sort}
              </Text>
            </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>      
      {loading && <LoadingOverlay />}
      <View style={{backgroundColor: 'white', height: '100%'}}>
        <ScrollView contentContainerStyle={{ paddingBottom: 250 }}>
          <View style={styles.recipes}>
            <Input
              underlineColorAndroid={'transparent'}
              containerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputStyle}
              placeholder='search and filter'
              placeholderTextColor={'#9CA3B7'}
              leftIcon={
                <MaterialIcons
                  name='search'
                  size={24}
                  color='#9CA3B7'
                />
              }              
              onChangeText={(text) => {
                handleSearch(text);
              }}
            />
            {weeklyRecipes.map((recipe, index) => (
              <TouchableOpacity
                key={index}
                style={styles.recipe}
                onPress={() => { props.navigation.navigate('RecipeDetail', {recipeInfo: JSON.stringify(recipe)}) }}
              >
                <Recipe recipe={recipe} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'OpenSans',
  },
  //recipes
  recipes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 15,
    paddingTop: 0,
  },
  recipe: {
    width: '48%',
    marginTop: 5,
    marginBottom: 5
  },
  inputContainerStyle: {
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: '#E3E3E3',
    height: 40,
    borderBottomWidth: 0,
  },
  sort: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 15,
    marginBottom: 20,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontWeight: 'bold'
  },
  inputStyle: {
    fontSize: 14,
    color: '#9CA3B7'
  }
});

export default WeeklyRecipesScreen;
