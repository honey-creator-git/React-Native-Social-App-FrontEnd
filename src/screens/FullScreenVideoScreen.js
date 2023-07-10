import React from 'react';
import Video from "react-native-video";
import { View, Dimensions, Image, Text } from 'react-native';
import Images from '../assets/Images';

export const FullScreenVideoScreen = (props) => {
    const videoUrl = props.route.params.url;
    return (
      <View style={styles.container}>
      {/* <Video source={{uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}}   // Can be a URL or a local file.
        ref={(ref) => {
          this.player = ref
        }}                                      // Store reference
        //  onBuffer={this.onBuffer}                // Callback when remote video is buffering
        //  onError={this.videoError}               // Callback when video cannot be loaded
        style={styles.video} 
        controls={true}
        fullscreen={true}
        resizeMode="contain"
      /> */}
        <Video source={{uri: videoUrl}}   // Can be a URL or a local file.
          ref={(ref) => {
            this.player = ref
          }}                                      // Store reference
          //  onBuffer={this.onBuffer}                // Callback when remote video is buffering
          //  onError={this.videoError}               // Callback when video cannot be loaded
          style={styles.video} 
          controls={true}
          fullscreen={true}
          resizeMode="contain"
        />
      </View>
    );
  };
  
  const styles = {
    container: {
      flex: 1,
      backgroundColor: '#000000',
      justifyContent: 'center'
    },
    video: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').width * (9 / 16),
      backgroundColor: 'black',
    }
  };
