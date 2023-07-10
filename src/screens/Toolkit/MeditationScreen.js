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
    coverLetterImage: "https://ourserendipity.s3.amazonaws.com/toolkit/1660637008608-cover.png",
    title: 'Hope, Strength and Faith Meditation',
    period: 30
  },
  {
    coverLetterImage: "https://ourserendipity.s3.amazonaws.com/toolkit/1660636990494-cover.png",
    title: 'Hope, Strength and Faith Meditation',
    period: 30
  },
  {
    coverLetterImage: "https://ourserendipity.s3.amazonaws.com/toolkit/1660637008608-cover.png",
    title: 'Hope, Strength and Faith Meditation',
    period: 30
  },
  {
    coverLetterImage: "https://ourserendipity.s3.amazonaws.com/toolkit/1660636990494-cover.png",
    title: 'Hope, Strength and Faith Meditation',
    period: 30
  },
  {
    coverLetterImage: "https://ourserendipity.s3.amazonaws.com/toolkit/1660637008608-cover.png",
    title: 'Hope, Strength and Faith Meditation',
    period: 30
  },
  {
    coverLetterImage: "https://ourserendipity.s3.amazonaws.com/toolkit/1660636990494-cover.png",
    title: 'Hope, Strength and Faith Meditation',
    period: 30
  },
  {
    coverLetterImage: "https://ourserendipity.s3.amazonaws.com/toolkit/1660637008608-cover.png",
    title: 'Hope, Strength and Faith Meditation',
    period: 30
  },
  {
    coverLetterImage: "https://ourserendipity.s3.amazonaws.com/toolkit/1660636990494-cover.png",
    title: 'Hope, Strength and Faith Meditation',
    period: 30
  },
  {
    coverLetterImage: "https://ourserendipity.s3.amazonaws.com/toolkit/1660637008608-cover.png",
    title: 'Hope, Strength and Faith Meditation',
    period: 30
  },
  {
    coverLetterImage: "https://ourserendipity.s3.amazonaws.com/toolkit/1660636990494-cover.png",
    title: 'Hope, Strength and Faith Meditation',
    period: 30
  },
  {
    coverLetterImage: "https://ourserendipity.s3.amazonaws.com/toolkit/1660637008608-cover.png",
    title: 'Hope, Strength and Faith Meditation',
    period: 30
  },
  {
    coverLetterImage: "https://ourserendipity.s3.amazonaws.com/toolkit/1660636990494-cover.png",
    title: 'Hope, Strength and Faith Meditation',
    period: 30
  },
]

const Meditation = (props) => {
  const {navigation, toolkitPosts, onHandleSearch} = props;
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
                onPress={() => { navigation.navigate('FullScreenAudio', {title: toolkitPost['title'], coverLetterImage: toolkitPost['coverLetterImage'], fileUrl: toolkitPost["medias"][0]["url"]})}} 
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

const MeditationScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [toolkitPosts, setToolkitPosts] = useState([]);
  const originalToolkitPosts = useSelector((state) => state.toolkit['toolkitPosts_5'])
	const loggedIn = useSelector((state) => state.user['userLoggedIn']);

  useEffect(() => {
    var parsedToolkitPosts = JSON.parse(originalToolkitPosts);
    setToolkitPosts(parsedToolkitPosts);
  }, [])

  const handleSearch = (text) => {
    var parsedToolkitPosts;
    if (text.length == 0) {
      parsedToolkitPosts = JSON.parse(originalToolkitPosts);
    } else {
      parsedToolkitPosts = JSON.parse(originalToolkitPosts);
      parsedToolkitPosts = parsedToolkitPosts.filter((item, index) => item.title.includes(text));
    }
    setToolkitPosts(parsedToolkitPosts);
  } 

  return (
    <View>
      { loggedIn == true && <TopBar
				title="Meditation Archives"
        isArrowBack={true}
        onBack={() => { props.navigation.goBack() }}
        onAvatarClick={() => { props.navigation.navigate('ProfileSetting') }}
			/> }
      <View style={{backgroundColor: 'white', height: '100%'}}>
        <View style={styles.container}>

          {loading && <LoadingOverlay />}
          <ScrollView contentContainerStyle={{ paddingBottom: 250 }}>
            <Meditation navigation={props.navigation} toolkitPosts={toolkitPosts} onHandleSearch={handleSearch} />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'OpenSans-Light',
  },
  //General
  section: {
    padding: 15,
  },
  //Meditation
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
  inputStyle: {
    fontSize: 14,
    color: '#9CA3B7'
  }
});

export default MeditationScreen;
