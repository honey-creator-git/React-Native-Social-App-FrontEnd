import React, { useState } from 'react';
import {
	View,
	StyleSheet,
	SafeAreaView,
	TouchableOpacity,
	Text,
	Image
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Avatar } from 'react-native-elements';

import LoadingOverlay from '../components/LoadingOverlay';
import Images from '../assets/Images';
import BackgroundImage from '../components/BackgroundImage';
import { ScrollView } from 'react-native-gesture-handler';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { userActions } from '../../redux/actions/userActions'

// const userInfo = {
// 	name: 'Elize Salazar',
// 	avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
// 	location: 'San Francisco, CA'
// }

const user = {
	name: 'Elize',
	avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGHjPcNR8D64dBVY4MlK-SahdXGT2o0RfIg2S7VnpX7w&s'
}


const ProfileSettingScreen = (props) => {
	const [loading, setLoading] = useState(false);
	const [userInfo, setUserInfo] = useState(useSelector((state) => state.user['user']));
	const dispatch = useDispatch();

	const onLogout = () => {
		console.log("Handle on Logout Event !");
		dispatch(userActions.logout(props.navigation));
	}

	return (
		<View>
			{
				userInfo && 
				<View style={styles.container}>
					<ScrollView style={styles.scrollview}>
						{loading && <LoadingOverlay />}
						<View style={{ backgroundColor: '#e8985d', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, paddingBottom: 45 }}>					
							<BackgroundImage
								isProfile={true}
								backgroundImage={Images.main_bg_profile1}
							/>
							<View style={styles.topbar}>
								<TouchableOpacity
									onPress={() => { props.navigation.goBack() }}
								>
									<MaterialIcons
										name="arrow-back"
										size={30}
										color="#ffffff"
									/>
								</TouchableOpacity>
								<Text style={styles.title}>Profile</Text>
							</View>
							<View style={styles.profileInfo}>
								<Avatar
									containerStyle={styles.avatar}
									rounded
									source={!userInfo["avatar"] ? {uri: user.avatar} : { uri: userInfo["avatar"] }}
									size={90}
								/>
								<View style={styles.captions}>
									<View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
										<Text style={styles.profileName}>{userInfo["firstName"] + " " + userInfo["lastName"]}</Text>
										<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
											<EvilIcons
												name="location"
												size={18}
												color="#ffffff"
												style={{position: 'relative', bottom: 1}}
											/>
											<Text style={styles.location}>San Francisco, CA</Text>
										</View>								
									</View>							
									<TouchableOpacity style={styles.button}>
										<Text style={styles.buttonCaption}>
											See your profile
										</Text>
									</TouchableOpacity>
								</View>
							</View>

						</View>
						<View style={styles.profileBody}>
							<TouchableOpacity>
								<View style={styles.settingItem}>
									<Image
										style={styles.iconStyle}
										source={Images.mySubscription}
									/>
									<Text style={styles.settingText}>My Subscriptions</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => { props.navigation.navigate('AccountSettings') }}
							>
								<View style={styles.settingItem}>
									<Image
										style={styles.iconStyle}
										source={Images.accountSetting}
									/>
									<Text style={styles.settingText}>Account Settings</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity>
								<View style={styles.settingItem}>
									<Image
										style={styles.iconStyle}
										source={Images.helpCenter}
									/>
									<Text style={styles.settingText}>Help Center</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity>
								<View style={styles.settingItem}>
									<Image
										style={styles.iconStyle}
										source={Images.aboutUs}
									/>
									<Text style={styles.settingText}>About Us</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity>
								<View style={styles.settingItem}>
									<Image
										style={styles.iconStyle}
										source={Images.contacts}
									/>
									<Text style={styles.settingText}>Contacts</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => onLogout()}>
								<View style={styles.settingItem}>
									<Image
										style={styles.iconStyle}
									/>
									<Text style={styles.settingText}>Log Out</Text>
								</View>
							</TouchableOpacity>
						</View>
					</ScrollView>
				</View>
			}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		fontFamily: 'OpenSans',
	},
	scrollview: {
		paddingBottom: '16%'
	},	
	topbar: {
		marginTop: 35,
		flexDirection: 'row',
		marginLeft: 10,
		borderRadius: 20,
		paddingBottom: 20
	},
	title: {
		fontSize: 20,
		color: '#ffffff',
		marginLeft: 10,
		fontFamily: 'OpenSans-Bold',
	},
	profileInfo: {
		marginLeft: 20,
		flexDirection: 'row',
		marginTop: 25,
		backgroundColor: '#e8985d'
	},
	profileName: {
		fontSize: 21,
		color: '#ffffff',
		fontFamily: 'OpenSans-Bold'
	},
	location: {
		color: '#ffffff',
		alignSelf: 'center',
		marginTop: 5,
		marginBottom: 8,
		fontFamily: 'OpenSans',
		fontSize: 12,
	},
	avatar: {
		position: 'relative',
		top: 17
	},
	button: {
		backgroundColor: '#ffffff',
		paddingHorizontal: 20,
		paddingVertical: 8,
		alignItems: 'center',
		borderRadius: 20,
		alignSelf: 'center'
	},
	buttonCaption: {
		color: '#A7A7A7',
		fontFamily: 'OpenSans',
		fontSize: 12,
	},
	captions: {
		marginLeft: 20,
		marginTop: 12,
	},
	settingItem: {
		flexDirection: 'row',
		backgroundColor: '#ECEAEA',
		borderRadius: 30,
		marginHorizontal: 30,
		marginVertical: 5,
		height: 50,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	profileBody: {
		marginTop: 20,
	},
	iconStyle: {
		width: 40,
		height: 40,
		// marginTop: 9,
		marginLeft: 20
	},
	settingText: {
		// marginTop: 10,
		marginLeft: 15,
		fontSize: 18,
		fontFamily: 'OpenSans',
		flexDirection: 'column',
		color: '#000000',
	},
});

export default ProfileSettingScreen;
