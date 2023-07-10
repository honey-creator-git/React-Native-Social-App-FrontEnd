import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';

import LoadingOverlay from '../../components/LoadingOverlay';
import Images from '../../assets/Images'
import TopBar from '../../components/TopBar'
import { toolkitActions } from '../../../redux/actions/toolkitActions';
import { parse } from 'qs';

const ToolkitHomeScreen = (props) => {

  const [loading, setLoading] = useState(false);
  const [toolkitTypes, setToolkitTypes] = useState(
    JSON.parse(useSelector(
      (state) => state.toolkit['toolkitTypes'])
    ).sort((a, b) => parseFloat(a['type']) - parseFloat(b['type']))
  )
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user['token']);
  const loggedIn = useSelector((state) => state.user['userLoggedIn']);
  
  // useEffect(() => {
  //   const toolkitTypes = [1, 2, 3, 4, 5];
  //   toolkitTypes.forEach((item, index) => {
  //     dispatch(toolkitActions.getToolkitPostsWithType(userToken, item, props.navigation))
  //   });
  // }, [])

  return (
    <View>
      { loggedIn == true && <TopBar
        title="Toolkit"
        isAvatar={true}
        isSearch={true}
        onAvatarClick={() => { props.navigation.navigate('ProfileSetting') }}
      /> }
      <View style={{backgroundColor: 'white'}}>
        {loading && <LoadingOverlay />}
        <View>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            { toolkitTypes.map((toolkitType, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => {                      
                      toolkitType['type'] == 1 && props.navigation.navigate('Nutrition', { toolkitType: JSON.stringify(toolkitType) })
                      toolkitType['type'] == 2 && props.navigation.navigate('Foundation', { toolkitType: JSON.stringify(toolkitType) })
                      toolkitType['type'] == 3 && props.navigation.navigate('WeeklyRecipes', { toolkitType: JSON.stringify(toolkitType) })
                      toolkitType['type'] == 4 && props.navigation.navigate('Movement', { toolkitType: JSON.stringify(toolkitType) })
                      toolkitType['type'] == 5 && props.navigation.navigate('Meditation', { toolkitType: JSON.stringify(toolkitType) })
                      toolkitType['type'] == 6 && props.navigation.navigate('FeaturedExperts', { toolkitType: JSON.stringify(toolkitType) })
                      toolkitType['type'] == 7 && props.navigation.navigate('WeeklyRecipes', { toolkitType: JSON.stringify(toolkitType) })
                    }}>
                    <View style={{position: 'relative', marginTop: 10}}>
                      <Image
                        style={styles.toolkitImage}
                        source={{ uri: toolkitType['coverletterimage'] }}
                        resizeMode='cover'
                      /> 
                      { 
                        !!toolkitType['title'].split(" ")[2] && !!toolkitType['title'].split(" ")[3] && !!toolkitType['title'].split(" ")[4] ? 
                        <Text style={{position: 'absolute', bottom: 10, left: 10, fontSize: 16, fontFamily: 'OpenSans-Bold', fontSize: 16, color: '#ffffff', lineHeight: 20}}>
                          {toolkitType['title'].split(" ")[0] + "\n" + toolkitType['title'].split(" ")[1] + " " + toolkitType['title'].split(" ")[2] + " " + toolkitType['title'].split(" ")[3] + " " + toolkitType['title'].split(" ")[4]}
                        </Text>
                        :
                        !!toolkitType['title'].split(" ")[2] ? 
                        <Text style={{position: 'absolute', bottom: 10, left: 10, fontSize: 16, fontFamily: 'OpenSans-Bold', fontSize: 16, color: '#ffffff', lineHeight: 20}}>
                          {toolkitType['title'].split(" ")[0] + "\n" + toolkitType['title'].split(" ")[1] + " " + toolkitType['title'].split(" ")[2]}
                        </Text>
                        :
                        <Text style={{position: 'absolute', bottom: 10, left: 10, fontSize: 16, fontFamily: 'OpenSans-Bold', fontSize: 16, color: '#ffffff', lineHeight: 20}}>
                          {toolkitType['title'].split(" ")[0] + "\n" + toolkitType['title'].split(" ")[1]}
                        </Text>
                      }
                    </View>
                  </TouchableOpacity>
                )
            }) }
            {/* <TouchableOpacity onPress={() => { props.navigation.navigate('Nutrition') }}>
              <Image
                style={styles.toolkitImage}
                // source={Images.toolkit1}
                source={{uri: toolkitTypes[0]['coverLetterImage']}}
                resizeMode='contain'
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { props.navigation.navigate('Foundation') }}>
              <Image
                style={styles.toolkitImage}
                source={Images.toolkit2}
                resizeMode='contain'
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { props.navigation.navigate('WeeklyRecipes') }}>
              <Image
                style={styles.toolkitImage}
                source={Images.toolkit3}
                resizeMode='contain'
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { props.navigation.navigate('Movement') }}>
              <Image
                style={styles.toolkitImage}
                source={Images.toolkit4}
                resizeMode='contain'
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { props.navigation.navigate('Meditation') }}>
              <Image
                style={styles.toolkitImage}
                source={Images.toolkit5}
                resizeMode='contain'
              />
            </TouchableOpacity> */}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  toolkitImage: {
    width: Dimensions.get('screen').width * 0.95,
    height: 180,
    marginVertical: 1,
    borderRadius: 5,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 300
  }
});

export default ToolkitHomeScreen;
