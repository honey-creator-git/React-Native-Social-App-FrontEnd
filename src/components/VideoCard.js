import React from 'react';
import { View, Dimensions, Image, Text } from 'react-native';
import Images from '../assets/Images';

const VideoCard = (props) => {  
    const videoData = props.videoData;

    return (
        <View>
            <View style={{ width: '100%', height: Dimensions.get('window').width * 0.38 * 0.9 }}>
                <Image
                    style={styles.image}
                    // source={videoData["thumbnail"]}
                    source={{uri: videoData["coverLetterImage"]}}
                />
                <View style={styles.icon}>
                    <Image 
                        source={Images.playIcon}
                        style={styles.playIcon}
                    />
                </View>
            </View>
            <Text style={styles.title}>
                {videoData['title']}
            </Text>
        </View>
    )
}

const styles = {
    container: {
        fontFamily: 'OpenSans-Light'
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    icon: {
        borderRadius: 10,
        zIndex: 5,
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    playIcon: {
        width: 30, 
        height: 30, 
        resizeMode: 'stretch',
    },
    title: {
        marginTop: 5,
        color: '#A5593C',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'OpenSans-Bold'
    },
    video: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * (9 / 16),
        backgroundColor: 'black',
    }
}

export default VideoCard;