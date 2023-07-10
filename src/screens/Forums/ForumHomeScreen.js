import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

import LoadingOverlay from '../../components/LoadingOverlay';
import Forum from '../../components/Forum';
import TopBar from '../../components/TopBar';
import { forumActions } from '../../../redux/actions/forumActions';

// const forums = [
//   {
//     image: require('../../assets/images/forum1.png'),
//     title: 'Lupus',
//     category: '30 COMMENTS'
//   },
//   {
//     image: require('../../assets/images/forum2.png'),
//     title: 'Women with Auto Immune Diseases',
//     category: '30 COMMENTS'
//   },
//   {
//     image: require('../../assets/images/forum1.png'),
//     title: 'Lupus',
//     category: '30 COMMENTS'
//   },
//   {
//     image: require('../../assets/images/forum2.png'),
//     title: 'Women with Auto Immune Diseases',
//     category: '30 COMMENTS'
//   },
//   {
//     image: require('../../assets/images/forum1.png'),
//     title: 'Lupus',
//     category: '30 COMMENTS'
//   },
//   {
//     image: require('../../assets/images/forum2.png'),
//     title: 'Women with Auto Immune Diseases',
//     category: '30 COMMENTS'
//   }
// ];

const ForumHomeScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [forums, setForums] = useState(JSON.parse(useSelector((state) => state.forum["forumTypes"])));
  
  const loggedIn = useSelector((state) => state.user['userLoggedIn']);
  
  const allUsers = useSelector((state) => state.user['users']);

  const userToken = useSelector((state) => state.user['token']);
  const dispatch = useDispatch();

  useEffect(() => {
    const forumTypeIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    forumTypeIds.forEach((item, index) => {
      dispatch(forumActions.getAllForumPostsWithTypeId(userToken, item, props.navigation))
    });
  }, [])

  return (
    <View>
      { loggedIn == true && <TopBar
        title="Forums"
        isAvatar={true}
        isEdit={true}
        onAvatarClick={() => { props.navigation.navigate('ProfileSetting') }}
      /> }
      <View style={{backgroundColor: 'white'}}>
        <View style={styles.container}>

          {loading && <LoadingOverlay />}
          { forums.length > 0 && <ScrollView contentContainerStyle={{ paddingBottom: 250 }}>
            <View style={styles.forums}>
              {forums.map((forum, index) => (
                <TouchableOpacity
                  onPress={() => {
                    setTimeout(() => {
                      props.navigation.navigate('ForumList', {users: allUsers})
                    }, 500);
                  }}
                  key={index}
                  style={styles.forum}
                >
                  <Forum forum={forum} />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView> }
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'OpenSans',
  },
  //forums
  forums: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 15,
  },
  forum: {
    width: '48%',
    marginTop: 5,
    marginBottom: 5
  },
});

export default ForumHomeScreen;
