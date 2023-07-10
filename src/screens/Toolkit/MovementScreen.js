import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import LoadingOverlay from '../../components/LoadingOverlay';
import TopBar from '../../components/TopBar';
import VideoCard from '../../components/VideoCard';

const videos = [
  {
    coverLetterImage: 'https://ourserendipity.s3.amazonaws.com/toolkit/1660629870832-cover.png',
    title: 'Hope, Strength and Faith Meditation',
    period: 30
  },
  {
    coverLetterImage: 'https://ourserendipity.s3.amazonaws.com/toolkit/1660630354539-cover.png',
    title: 'Hope, Strength and Faith Meditation',
    period: 30
  },
  {
    coverLetterImage: 'https://ourserendipity.s3.amazonaws.com/toolkit/1660629870832-cover.png',
    title: 'Hope, Strength and Faith Meditation',
    period: 30
  },
  {
    coverLetterImage: 'https://ourserendipity.s3.amazonaws.com/toolkit/1660630354539-cover.png',
    title: 'Hope, Strength and Faith Meditation',
    period: 30
  },
  {
    coverLetterImage: 'https://ourserendipity.s3.amazonaws.com/toolkit/1660629870832-cover.png',
    title: 'Hope, Strength and Faith Meditation',
    period: 30
  },
  {
    coverLetterImage: 'https://ourserendipity.s3.amazonaws.com/toolkit/1660630354539-cover.png',
    title: 'Hope, Strength and Faith Meditation',
    period: 30
  },
  {
    coverLetterImage: 'https://ourserendipity.s3.amazonaws.com/toolkit/1660629870832-cover.png',
    title: 'Hope, Strength and Faith Meditation',
    period: 30
  },
  {
    coverLetterImage: 'https://ourserendipity.s3.amazonaws.com/toolkit/1660630354539-cover.png',
    title: 'Hope, Strength and Faith Meditation',
    period: 30
  },
  {
    coverLetterImage: 'https://ourserendipity.s3.amazonaws.com/toolkit/1660629870832-cover.png',
    title: 'Hope, Strength and Faith Meditation',
    period: 30
  },
  {
    thumcoverLetterImagebnail: 'https://ourserendipity.s3.amazonaws.com/toolkit/1660630354539-cover.png',
    title: 'Hope, Strength and Faith Meditation',
    period: 30
  },
  {
    coverLetterImage: 'https://ourserendipity.s3.amazonaws.com/toolkit/1660629870832-cover.png',
    title: 'Hope, Strength and Faith Meditation',
    period: 30
  },
  {
    coverLetterImage: 'https://ourserendipity.s3.amazonaws.com/toolkit/1660630354539-cover.png',
    title: 'Hope, Strength and Faith Meditation',
    period: 30
  },
]

// const sorts = ['Body', 'Soul', 'Mind', 'Meditation', 'Body'];

const Movement = (props) => {

  const { navigation, toolkitPosts, onHandleSearch } = props;
  
  return (
    <View style={styles.section}>
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
          onHandleSearch(text);
        }}
      />
      <View style={styles.videos}>
        {toolkitPosts.map((toolkitPost, index) => {
          return (
            <View style={{ width: '48%', marginBottom: 10 }} key={index}>
              <TouchableOpacity
                onPress={() => { navigation.navigate('FullScreenVideo', {url: toolkitPost["medias"][0]["url"]})}}
              >
                <VideoCard videoData={toolkitPost} />
                <Text style={styles.timeCaption}>{toolkitPost["medias"][0]["period"] + ' mins'}</Text>
              </TouchableOpacity>
            </View>
          )
        })}
      </View>
    </View>
  )
}

const MovementScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0)
  const sorts = JSON.parse(props.route.params.toolkitType)["sortType"];  
  const [toolkitPosts, setToolkitPosts] = useState([]);
  const [sort, setSort] = useState('Body');
  const [search, setSearch] = useState(null);
  const originalToolkitPosts = useSelector((state) => state.toolkit["toolkitPosts_4"]);
	const loggedIn = useSelector((state) => state.user['userLoggedIn']);

  useEffect(() => {
    var parsedToolkitPosts = JSON.parse(originalToolkitPosts);
    parsedToolkitPosts = parsedToolkitPosts.filter((item, index) => item.sortTypeId == "Body");
    setToolkitPosts(parsedToolkitPosts);
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
      case "Body":
        var parsedToolkitPosts = JSON.parse(originalToolkitPosts);
        parsedToolkitPosts = parsedToolkitPosts.filter((item, index) => item.sortTypeId == "Body");
        if(search != null) {
          parsedToolkitPosts = parsedToolkitPosts.filter((item, index) => item.title.includes(search));
        }
        setToolkitPosts(parsedToolkitPosts);
        return toolkitPosts
      case "Soul":
        var parsedToolkitPosts = JSON.parse(originalToolkitPosts);
        parsedToolkitPosts = parsedToolkitPosts.filter((item, index) => item.sortTypeId == "Soul");
        if(search != null) {
          parsedToolkitPosts = parsedToolkitPosts.filter((item, index) => item.title.includes(search));
        }
        setToolkitPosts(parsedToolkitPosts);
        return toolkitPosts
      case "Mind":
        var parsedToolkitPosts = JSON.parse(originalToolkitPosts);
        parsedToolkitPosts = parsedToolkitPosts.filter((item, index) => item.sortTypeId == "Mind");
        if(search != null) {
          parsedToolkitPosts = parsedToolkitPosts.filter((item, index) => item.title.includes(search));
        }
        setToolkitPosts(parsedToolkitPosts);
        return toolkitPosts
      case "Meditation":
        var parsedToolkitPosts = JSON.parse(originalToolkitPosts);
        parsedToolkitPosts = parsedToolkitPosts.filter((item, index) => item.sortTypeId == "Meditation");
        if(search != null) {
          parsedToolkitPosts = parsedToolkitPosts.filter((item, index) => item.title.includes(search));
        }
        setToolkitPosts(parsedToolkitPosts);
        return toolkitPosts
      default:
        return toolkitPosts
    }
  }  

  const handleSearch = (text) => {
    setSearch(text);
    var parsedToolkitPosts;
    if (text.length == 0) {
      parsedToolkitPosts = JSON.parse(originalToolkitPosts);
      parsedToolkitPosts = parsedToolkitPosts.filter((item, index) => item.sortTypeId == sort);
    } else {
      parsedToolkitPosts = JSON.parse(originalToolkitPosts);
      parsedToolkitPosts = parsedToolkitPosts.filter((item, index) => item.sortTypeId == sort);
      parsedToolkitPosts = parsedToolkitPosts.filter((item, index) => item.title.includes(text));
    }
    setToolkitPosts(parsedToolkitPosts);
  } 

  return (
    <View>
      { loggedIn == true && <TopBar
				title="Movement Archives"
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
          <Movement navigation={props.navigation} toolkitPosts={toolkitPosts} onHandleSearch={handleSearch} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //General
  section: {
    padding: 15,
    paddingTop: 0,
  },
  //Movement
  description: {
    color: '#989898',
    fontSize: 15,
    marginTop: 10
  },
  videos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 15,
  },
  timeCaption: {
    color: '#9CA3B7',
    fontSize: 12
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

export default MovementScreen;
