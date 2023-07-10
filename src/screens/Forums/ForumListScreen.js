import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Dimensions, Text } from 'react-native';
import TopBar from '../../components/TopBar'

import ForumPosts from '../../components/ForumPosts';
import { TabView, SceneMap, TabBar, TabBarIndicator } from 'react-native-tab-view';
import { TouchableOpacity } from 'react-native-gesture-handler';

const initialLayout = { width: Dimensions.get('window').width };

const ForumListScreen = (props) => {

  const [loading, setLoading] = useState(false);

  const [index, setIndex] = useState(0);

  const [users, setUsers] = useState(JSON.parse(props.route.params.users));

  const [routes] = useState([
    // { key: 'arthritis', title: 'Arthritis' },
    // { key: 'crohn', title: "Crohn's and Colitis" },
    // { key: 'lupus', title: 'Lupus' },
    // { key: 'sclerosis', title: 'Multiple Sclerosis' },
    // { key: 'men_autoimmune', title: 'Men with Autoimmune Diseases' },
    // { key: 'women_autoimmune', title: 'Women with Autoimmune Diseases' },
    // { key: 'dad_autoimmune', title: 'Dads with Autoimmune Diseases' },
    // { key: 'single_autoimmune', title: 'Single and Dating with Autoimmune Diseases' },
    // { key: 'traveling', title: 'Traveling with Autoimmune Diseases' },
    // { key: 'working', title: 'Working with Autoimmune Diseases' },
    { key: 'lupus', title: "Lupus" },
    { key: 'women_autoimmune', title: "Women with Autoimmune Diseases" }
  ]);

  const forumPosts1 = useSelector((state) => state.forum['forumPosts_1'])
  const forumPosts2 = useSelector((state) => state.forum['forumPosts_2'])
  const forumPosts3 = useSelector((state) => state.forum['forumPosts_3'])
  const forumPosts4 = useSelector((state) => state.forum['forumPosts_4'])
  const forumPosts5 = useSelector((state) => state.forum['forumPosts_5'])
  const forumPosts6 = useSelector((state) => state.forum['forumPosts_6'])
  const forumPosts7 = useSelector((state) => state.forum['forumPosts_7'])
  const forumPosts8 = useSelector((state) => state.forum['forumPosts_8'])
  const forumPosts9 = useSelector((state) => state.forum['forumPosts_9'])
  const forumPosts10 = useSelector((state) => state.forum['forumPosts_10'])

  const [firstForumPosts, setFirstForumPosts] = useState([]);
  const [secondForumPosts, setSecondForumPosts] = useState([]);
  const [thridForumPosts, setThridForumPosts] = useState([]);
  const [forthForumPosts, setForthForumPosts] = useState([]);
  const [fifthForumPosts, setFifthForumPosts] = useState([]);
  const [sixthForumPosts, setSixthForumPosts] = useState([]);
  const [sevnthForumPosts, setSevnthForumPosts] = useState([]);
  const [eighthForumPosts, setEighthForumPosts] = useState([]);
  const [ninethForumPosts, setNinethForumPosts] = useState([]);
  const [tenthForumPosts, setTenthForumPosts] = useState([]);
  
	const loggedIn = useSelector((state) => state.user['userLoggedIn']);

  useEffect(() => {   

    const parsedForumPosts1 = JSON.parse(forumPosts1);
    const parsedForumPosts2 = JSON.parse(forumPosts2);
    const parsedForumPosts3 = JSON.parse(forumPosts3);
    const parsedForumPosts4 = JSON.parse(forumPosts4);
    const parsedForumPosts5 = JSON.parse(forumPosts5);
    const parsedForumPosts6 = JSON.parse(forumPosts6);
    const parsedForumPosts7 = JSON.parse(forumPosts7);
    const parsedForumPosts8 = JSON.parse(forumPosts8);
    const parsedForumPosts9 = JSON.parse(forumPosts9);
    const parsedForumPosts10 = JSON.parse(forumPosts10);

    setFirstForumPosts(parsedForumPosts1);
    setSecondForumPosts(parsedForumPosts2);
    setThridForumPosts(parsedForumPosts3);
    setForthForumPosts(parsedForumPosts4);
    setFifthForumPosts(parsedForumPosts5);
    setSixthForumPosts(parsedForumPosts6);
    setSevnthForumPosts(parsedForumPosts7);
    setEighthForumPosts(parsedForumPosts8);
    setNinethForumPosts(parsedForumPosts9);
    setTenthForumPosts(parsedForumPosts10);
    
  }, [])

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'arthritis':
        return <ForumPosts navigation={props.navigation} forumPosts={firstForumPosts} users={users} />;
      case 'crohn':
        return <ForumPosts navigation={props.navigation} forumPosts={secondForumPosts} users={users} />;
      case 'lupus':
        return <ForumPosts navigation={props.navigation} forumPosts={thridForumPosts} users={users} />;
      case 'sclerosis':
        return <ForumPosts navigation={props.navigation} forumPosts={forthForumPosts} users={users} />;
      case 'men_autoimmune':
        return <ForumPosts navigation={props.navigation} forumPosts={fifthForumPosts} users={users} />;
      case 'women_autoimmune':
        return <ForumPosts navigation={props.navigation} forumPosts={sixthForumPosts} users={users} />;
      case 'dad_autoimmune':
        return <ForumPosts navigation={props.navigation} forumPosts={sevnthForumPosts} users={users} />;
      case 'single_autoimmune':
        return <ForumPosts navigation={props.navigation} forumPosts={eighthForumPosts} users={users} />;
      case 'traveling':
        return <ForumPosts navigation={props.navigation} forumPosts={ninethForumPosts} users={users} />;
      case 'working':
        return <ForumPosts navigation={props.navigation} forumPosts={tenthForumPosts} users={users} />;
      // case 'lupus':
      //   return <LupusForum navigation={props.navigation} />;
      // case 'immune':
      //   return <ImmuneForum navigation={props.navigation} />; 
      default:
        return null;
    }
  };

  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        indicatorStyle={{ 
          backgroundColor: 'orange',
          width: Dimensions.get("screen").width / 2, 
          left: (Dimensions.get('window').width / 2 - Dimensions.get("screen").width / 2 - 30) / 2,
        }}
        style={{ 
          backgroundColor: 'white',
          height: 50
        }}
        labelStyle={{
          fontSize: 16,
          fontWeight: '800',
          textTransform: 'capitalize',
          alignContent: 'center',
          justifyContent: 'center'
        }}
        activeColor={'#687999'}
        inactiveColor={'#686868'}
      />
    );
  }

  const renderTabBarSecond = props => {
    return (
      <TabBar
        {...props}
        renderLabel={({ route, focused, color }) =>(
          <View>
            <Text style={{
              color: '#686868',
              fontSize: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {route.title}
            </Text>
          </View>
        )}
        indicatorStyle={{ 
          backgroundColor: 'pink',
        }}
        style={{ 
          backgroundColor: 'white',
          height: 50,
        }}
      />
    );
  }

  return (
    <View style={{width: Dimensions.get('window').width, height: '100%'}}>
      { loggedIn == true && <TopBar
				title="Welcome"
        isAvatar={true}
        isEdit={true}
        onAvatarClick={() => { props.navigation.navigate('ProfileSetting') }}
			/> }
      <TabView
        navigationState={{ index, routes, props }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </View>
  );
}

export default ForumListScreen;
