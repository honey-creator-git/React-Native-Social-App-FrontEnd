import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, Dimensions, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import LoadingOverlay from './LoadingOverlay';
import Images from '../assets/Images'

const forumsData = [
    {
        creator: 'jondoe_09',
        date: '2022-03-22',
        title: 'Auto Immune Disease How To Prevent?',
        views: 35,
        like: '1.2k',
        comments: '1.2k',
        image: Images.forumImage
    },
    {
        creator: 'jondoe_09',
        date: '2022-03-22',
        title: 'Auto Immune Disease How To Prevent?',
        views: 35,
        like: '1.2k',
        comments: '1.2k',
        image: Images.homeActivity
    },
    {
        creator: 'jondoe_09',
        date: '2022-03-22',
        title: 'Auto Immune Disease How To Prevent?',
        views: 35,
        like: '1.2k',
        comments: '1.2k',
        image: Images.toolkit2
    },
    {
        creator: 'jondoe_09',
        date: '2022-03-22',
        title: 'Auto Immune Disease How To Prevent?',
        views: 35,
        like: '1.2k',
        comments: '1.2k',
        image: Images.toolkit3
    },
]

const ForumPosts = (props) => {
    const { navigation, forumPosts, users } = props;
    const [loading] = useState(false);

    return (
        <View style={{backgroundColor: 'white'}}>
            {loading && <LoadingOverlay />}
            { users.length > 0 && <View>
                <ScrollView contentContainerStyle={styles.scrollContent}> 
                { forumPosts.length > 0 && forumPosts.map((forum, index) => {
                    const owner = users.filter((item, index) => item["id"] == forum["createdBy"])[0];
                    // const follows = owner['follows'];
                    return (
                        <TouchableOpacity 
                            key={index}
                            style={styles.item}
                            onPress={() => { navigation.navigate('ForumDetails', { forumDetail: JSON.stringify(forum), owner: JSON.stringify(owner) })}}
                        >
                            <View style={styles.info}>
                                <Text style={styles.creator}>{owner['firstName']} | {forum['createdAt'].split(" ")[0]}</Text>
                                <Text style={styles.title}>{forum["title"]}</Text>
                                <Text style={styles.creationInfo}>{forum["visitCount"]} views</Text>
                                <View style={styles.iconsGroup}>
                                    <View style={styles.icons}>
                                        <AntDesign
                                            name="like1"
                                            size={16}
                                            color="#8E8E8E"
                                        />
                                        <Text style={styles.params}>{forum["emotions"].like}</Text>
                                    </View>
                                    <View style={styles.icons}>
                                        <Feather
                                            name="message-circle"
                                            size={16}
                                            color="#8E8E8E"
                                        />
                                        {/* <Text style={styles.params}>{forum.comments.length}</Text> */}
                                        { !!forum.comments && forum.comments.length <= 999 && <Text style={styles.params}>{forum.comments.length}</Text> }
                                        { !!forum.comments && forum.comments.length > 999 && <Text style={styles.params}>{forum.comments.length / 1000}k</Text> }
                                    </View>
                                    <View style={styles.icons}>
                                        <FontAwesome
                                            name="share-alt"
                                            size={16}
                                            color="#8E8E8E"
                                        />
                                        <Text style={styles.params}> share</Text>
                                    </View>
                                </View>
                            </View>
                            <Image
                                style={styles.itemImage}
                                source={{uri: forum['coverLetterImage']}}
                            />
                        </TouchableOpacity>
                )})}
                </ScrollView>
            </View> }
        </View>
    )
}

const styles = StyleSheet.create({
    itemImage: {
      width: Dimensions.get('screen').width * 0.45,
      height: Dimensions.get('screen').width * 0.3,
      borderRadius: 10,
    },
    info: {
      width: Dimensions.get('screen').width * 0.47,
      height: Dimensions.get('screen').width * 0.47 * 3 / 4,
      marginTop: '3%'
    },
    scrollContent: {
      alignItems: 'center',
      paddingBottom: 120,
      marginTop: '5%',
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '3%'
    },
    creationInfo: {
      color: '#C1C1C1',
      fontFamily: 'OpenSans-Regular',
      fontSize: 12,
      marginBottom: '10%'
    },
    creator: {
      color: '#686868',
      fontFamily: 'OpenSans-Regular',
      fontSize: 14,
      marginBottom: '2%',
    },
    title: {
      color: '#A5593C',
      fontFamily: 'OpenSans-Bold',
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: '3%',
      letterSpacing: 1
    },
    icons: {
      flexDirection: 'row',
      marginRight: '5%',
    },
    params: {
      fontFamily: 'OpenSans-Bold',
      color: '#8E8E8E',
      fontSize: 12,
      fontWeight: 'bold',
      marginTop: 2,
      marginLeft: 3,
    },
    iconsGroup: {
      flexDirection: 'row'
    }
});

export default ForumPosts;