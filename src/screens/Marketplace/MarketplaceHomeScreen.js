import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';

import LoadingOverlay from '../../components/LoadingOverlay';
import Images from '../../assets/Images'
import TopBar from '../../components/TopBar'

const marketplaces = [
  {
    title: 'Clothing',
    image: require('../../assets/images/clothes.png')
  },
  {
    title: 'Assistive Devices',
    image: require('../../assets/images/device.png')
  },
  {
    title: 'Food',
    image: require('../../assets/images/food.png')
  },
  {
    title: 'Miscellaneous',
    image: require('../../assets/images/chest.png')
  },
]

const IconButton = (props) => {
  const btnInfo = props.btnInfo

  return (
    <View style={styles.categoryItem}>
      <View style={styles.iconButtonContainer}>
        <Image
          source={btnInfo.image}
          style={styles.iconImage}
        />
      </View>
      <Text style={styles.title}>{btnInfo.title}</Text>
    </View>
  )
}

const MarketplaceHomeScreen = (props) => {

  const [loading, setLoading] = useState(false);
	const loggedIn = useSelector((state) => state.user['userLoggedIn']);

  return (
    <View>
      { loggedIn == true && <TopBar
				title="Marketplace"
        isAvatar={true}
        isBell={true}
        onAvatarClick={() => { props.navigation.navigate('ProfileSetting') }}
			/> }
      <View style={{backgroundColor: 'white'}}>
        {loading && <LoadingOverlay />}
        <ScrollView 
          style={styles.marketplaceWrapper}
          horizontal={true}
        >
          {marketplaces.map((recipe, index) => (
            <TouchableOpacity style={styles.iconButton} key={index}>
              <IconButton btnInfo={recipe}/>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView contentContainerStyle={styles.marketItemWrapper}>
          <Image 
            source={Images.marketplace1}
            style={styles.marketplaceImage}
          />
          <Image 
            source={Images.marketplace2}
            style={styles.marketplaceImage}
          />
          <Image 
            source={Images.marketplace3}
            style={styles.marketplaceImage}
          />
          <Image 
            source={Images.marketplace4}
            style={styles.marketplaceImage}
          />
          <Image 
            source={Images.marketplace5}
            style={styles.marketplaceImage}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  marketplaceWrapper: {
    marginTop: 10,
    paddingBottom: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  iconButton: {
    width: 85,
  },
  categoryItem: {
    width: '100%',
  },
  iconButtonContainer: {
    marginHorizontal: 5,
    padding: 15,
    borderWidth: 1,
    borderColor: '#CECECE',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: 30,
    height: 30
  },
  title: {
    marginBottom: 14,
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
    color: '#A5593C',
    textAlign: 'center'
  },  
  marketItemWrapper: {
    alignItems: 'center',
    paddingBottom: 450
  },
  marketplaceImage: {
    marginVertical: 5,
    width: Dimensions.get('screen').width * 0.95,
    height: 180,
  }
});

export default MarketplaceHomeScreen;
