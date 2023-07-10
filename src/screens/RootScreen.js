import React from 'react';
import { View } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import Feather from 'react-native-vector-icons/Feather';

import ProfileSettingScreen from './ProfileSettingScreen';
import AccountSettingScreen from './AccountSettingScreen';
import HomeScreen from './HomeScreen';
import ToolkitHomeScreen from './Toolkit/ToolkitHomeScreen';
import NutritionScreen from './Toolkit/NutritionScreen';
import FoundationScreen from './Toolkit/FoundationScreen';
import MeditationScreen from './Toolkit/MeditationScreen';
import FeaturedExpertsScreen from './Toolkit/FeaturedExpertsScreen';
import MovementScreen from './Toolkit/MovementScreen';
import ForumHomeScreen from './Forums/ForumHomeScreen';
import ForumDetailScreen from './Forums/ForumDetailScreen';
import MarketplaceHomeScreen from './Marketplace/MarketplaceHomeScreen';
import RecipeDetailScreen from './RecipeDetailScreen';
import WeeklyRecipesScreen from './WeeklyRecipesScreen';
import { FullScreenVideoScreen } from './FullScreenVideoScreen';
import FullScreenAudioScreen from './FullScreenAudioScreen';
import ForumListScreen from './Forums/ForumListScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Index"
        component={HomeScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="FullScreenVideo"
        component={FullScreenVideoScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="FullScreenAudio"
        component={FullScreenAudioScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="ProfileSetting"
        component={ProfileSettingScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="WeeklyRecipes"
        component={WeeklyRecipesScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Meditation"
        component={MeditationScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Movement"
        component={MovementScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="AccountSettings"
        component={AccountSettingScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
}

function ToolkitStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ToolkitHome"
        component={ToolkitHomeScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="ProfileSetting"
        component={ProfileSettingScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="AccountSettings"
        component={AccountSettingScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Nutrition"
        component={NutritionScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Foundation"
        component={FoundationScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="FullScreenVideo"
        component={FullScreenVideoScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="FullScreenAudio"
        component={FullScreenAudioScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Meditation"
        component={MeditationScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen 
        name="FeaturedExperts"
        component={FeaturedExpertsScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Movement"
        component={MovementScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="WeeklyRecipes"
        component={WeeklyRecipesScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
}

function ForumsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ForumHome"
        component={ForumHomeScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="ForumList"
        component={ForumListScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="ProfileSetting"
        component={ProfileSettingScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="AccountSettings"
        component={AccountSettingScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="ForumDetails"
        component={ForumDetailScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
}

function MarketplaceStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MarketplaceHome"
        component={MarketplaceHomeScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="ProfileSetting"
        component={ProfileSettingScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="AccountSettings"
        component={AccountSettingScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
}

const RootScreen = (props) => {
    const {route} = props;
    const {stackname} = route.params;
    return (
      <Tab.Navigator
        initialRouteName={stackname ? stackname : 'Home'}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            
            var icon;
            size = 30;
            
            if (route.name === 'Home') {
              icon = 'home';
              color = focused ? '#A5593C' : '#707070'
            } else if (route.name === 'Toolkit') {
              icon = 'toolbox-outline';
              color = focused ? '#A5593C' : '#707070'
            } else if (route.name === 'Forums') {
              icon = 'message-circle';
              color = focused ? '#A5593C' : '#707070'
            }
            else if (route.name === 'Marketplace') {
              icon = 'tag-outline';
              color = focused ? '#A5593C' : '#707070'
            }
            
            return (
              <View>
                {icon == 'home' && <Octicons name={'home'} size={size} color={color}/>}
                {icon == 'toolbox-outline' && <MaterialCommunityIcons name={'toolbox-outline'} size={size} color={color}/>}
                {icon == 'message-circle' && <Feather name={'message-circle'} size={size} color={color}/>}
                {icon == 'tag-outline' && <MaterialCommunityIcons name={'tag-outline'} size={size} color={color}/>}
              </View>
            );
          },
        })}
        tabBarOptions={{
          showLabel: true,
          labelStyle: {fontSize: 10},
          activeTintColor: '#A5593C',
          inactiveTintColor: '#707070',
        }}>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            headerShown: false,
            gestureEnabled: false,
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Toolkit"
          component={ToolkitStack}
          options={{
            headerShown: false,
            gestureEnabled: false,
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Forums"
          component={ForumsStack}
          options={{
            headerShown: false,
            gestureEnabled: false,
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Marketplace"
          component={MarketplaceStack}
          options={{
            headerShown: false,
            gestureEnabled: false,
            unmountOnBlur: true,
          }}
        />
      </Tab.Navigator>
    );
}

export default RootScreen;
