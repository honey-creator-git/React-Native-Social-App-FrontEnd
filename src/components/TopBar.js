import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Avatar, Badge } from 'react-native-elements';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntiDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const user = {
	name: 'Elize',
	avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGHjPcNR8D64dBVY4MlK-SahdXGT2o0RfIg2S7VnpX7w&s'
}

const notificationList = [
	{
		image: require('../assets/images/notifications/lady-with-brown-eyes-is-smiling-red-wall.png'),
		name: 'ABC Company',
		action: 'joins the marketplace',
		time: 30
	},
	{
		image: require('../assets/images/notifications/top-view-bottle-with-soft-drink-orange-slices.png'),
		name: 'John Doe',
		action: 'posted new thread in a forum',
		time: 30
	},
	{
		image: require('../assets/images/notifications/beautiful-girl-standing-viewpoint-koh-nangyuan-island-near-koh-tao-island-surat-thani-thailand.png'),
		name: 'ABC Company',
		action: 'joins the marketplace',
		time: 30
	},
	{
		image: require('../assets/images/notifications/top-view-bottle-with-soft-drink-orange-slices.png'),
		name: 'ABC Company',
		action: 'joins the marketplace',
		time: 30
	},
	{
		image: require('../assets/images/notifications/closeup-portrait-young-man-hydrating-himself.png'),
		name: 'ABC Company',
		action: 'joins the marketplace',
		time: 30
	},
	{
		image: require('../assets/images/notifications/lady-with-brown-eyes-is-smiling-red-wall.png'),
		name: 'ABC Company',
		action: 'joins the marketplace',
		time: 30
	},
	{
		image: require('../assets/images/notifications/top-view-bottle-with-soft-drink-orange-slices.png'),
		name: 'John Doe',
		action: 'posted new thread in a forum',
		time: 30
	},
	{
		image: require('../assets/images/notifications/beautiful-girl-standing-viewpoint-koh-nangyuan-island-near-koh-tao-island-surat-thani-thailand.png'),
		name: 'ABC Company',
		action: 'joins the marketplace',
		time: 30
	},
	{
		image: require('../assets/images/notifications/top-view-bottle-with-soft-drink-orange-slices.png'),
		name: 'ABC Company',
		action: 'joins the marketplace',
		time: 30
	},
	{
		image: require('../assets/images/notifications/closeup-portrait-young-man-hydrating-himself.png'),
		name: 'ABC Company',
		action: 'joins the marketplace',
		time: 30
	},
]

const unreadCount = 3;

const TopBar = (props) => {
	const userInfo = useSelector((state) => state.user["user"]);
	const [notification, setNotification] = useState(false)
	const {
		title,
		isAvatar,
		isArrowBack,
		isBell,
		isEdit,
		isSearch,
		onBack,
		isBookMark,
		isSharealt,
		onAvatarClick,
		containerStyle
	} = props;

	return (
		<View style={{backgroundColor: 'white', zIndex: 100}}>
			<View style={[styles.topBar, containerStyle]}>
				{isAvatar &&
					<TouchableOpacity
						onPress={() => { onAvatarClick() }}
					>
						<Avatar
							containerStyle={styles.avatar}
							rounded
							source={!userInfo["avatar"] ? {uri: user.avatar} : { uri: userInfo["avatar"] }}
							size="small"
						/>
					</TouchableOpacity>
				}
				{isArrowBack &&
					<TouchableOpacity
						style={styles.arrowBack}
						onPress={() => onBack()}
					>
						<MaterialIcons
							name="arrow-back"
							size={30}
							color="#ffffff"
						/>
					</TouchableOpacity>
				}
				<Text style={styles.titleTxt}>
					{title}
				</Text>
				{
					title === 'Welcome' &&
					<Text style={styles.user}>{',  ' + userInfo["firstName"]}</Text>
				}
				{isBell &&
					<TouchableOpacity style={styles.Icon} onPress={() => setNotification(!notification)}>
						<EvilIcons
							name="bell"
							size={35}
							color="#ffffff"
							style={{position: 'relative', top: 5,}}
						/>
						<Badge
							status="warning"
							value={unreadCount}
							badgeStyle={{ width: 5 }}
							containerStyle={{ position: 'absolute', top: 0, right: -2 }}
						/>
					</TouchableOpacity>
				}
				{isSearch &&
					<TouchableOpacity style={styles.Icon} >
						<Feather
							name="search"
							size={28}
							color="#ffffff"
						/>
					</TouchableOpacity>
				}
				{/* {isEdit &&
					<TouchableOpacity style={styles.Icon}>
						<Feather
							name="edit"
							size={28}
							color="#ffffff"
						/>
					</TouchableOpacity>
				} */}
				{isBookMark &&
					<TouchableOpacity style={styles.Icon2}>
						<Feather
							name="bookmark"
							size={25}
							color="#ffffff"
						/>
					</TouchableOpacity>
				}
				{isSharealt &&
					<TouchableOpacity style={styles.Icon1}>
						<AntiDesign
							name="sharealt"
							size={25}
							color="#ffffff"
						/>
					</TouchableOpacity>
				}
			</View>
			{ notification && 
				<View>
					<View style={styles.triangle}></View>
					<View style={{position: 'absolute', top: 0, left: 0, width: '100%', height: 1000, zIndex: 1, backgroundColor: '#00000099'}}>
						<View style={styles.warningModal}>
							<View style={styles.notificationHeader}>
								<Text style={styles.notificationTitle}>Notifications</Text>
								<View style={styles.notificationSettings}>
									<TouchableOpacity>
										<Text style={styles.notificationSettingItem}>Mark All as Read</Text>
									</TouchableOpacity>
									<Text style={styles.notificationSettingItem}> | </Text>
									<TouchableOpacity>
										<Text style={styles.notificationSettingItem}>See All</Text>
									</TouchableOpacity>
								</View>
							</View>
							<ScrollView>							
								{notificationList.map((item, index) =>
									<NotificationItem
										avatar={item.image}
										name={item.name}
										time={item.time}
										action={item.action}
										key={index}
									/>
								)}
							</ScrollView>
						</View>
					</View>
				</View>
			}
		</View>
	);
}

const NotificationItem = (props) => {
	const { avatar, name, action, time } = props;

	return (
		<View style={styles.notificationItemContainer}>
			<View style={{ flexDirection:'row', alignItems: 'center', justifyContent: 'center' }}>
				<Avatar
					source={avatar} ///  {uri: avatar}
					size="medium"
					overlayContainerStyle={{backgroundColor: 'white'}}
					containerStyle={styles.notificationAvatar}
				/>
				<View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
					<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>					
						<Text style={styles.notificationOwner}>{name} </Text>
						<Text style={styles.notificaitonAction}>{action}</Text>
					</View>
					<View>
						<Text style={styles.notificationTime}>{time} minutes ago</Text>
					</View>
				</View>
			</View>
			<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
				<View>
					<TouchableOpacity>
						<MaterialCommunityIcons
							name="dots-horizontal"
							size={27}
							color="#AAAAAA"
						/>
					</TouchableOpacity>
				</View>
			</View>			
		</View>
	)
}

const styles = StyleSheet.create({
	triangle: {
		width: 0,
		height: 0,
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderTopWidth: 0,
		borderRightWidth: 10,
		borderBottomWidth: 15,
		borderLeftWidth: 10,
		borderTopColor: 'transparent',
		borderRightColor: 'transparent',
		borderBottomColor: 'white',
		borderLeftColor: 'transparent',
		position: 'absolute',
		bottom: -1,
		right: 22,
		zIndex: 10,
	},
	topBar: {
		position: 'relative',
		zIndex: 3,
		backgroundColor: '#A5593C',
		height: 80,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		flexDirection: 'row',
		...ifIphoneX(
			{
				paddingTop: 20,
				paddingBottom: 8
			},
			{
				paddingTop: 5,
				paddingBottom: 8
			},
		),
	},
	titleTxt: {
		fontFamily: 'OpenSans-Bold',
		fontSize: 16,
		color: '#ffffff',
		marginLeft: 10,
		marginTop: 35,
	},
	user: {
		fontFamily: 'OpenSans',
		fontSize: 16,
		color: '#ffffff',
		marginTop: 35
	},
	avatar: {
		marginLeft: 10,
		marginTop: 30
	},
	notificationAvatar: {
		marginTop: 5,
		marginBottom: 10,
		marginLeft: 10, 
		marginRight: 10
	},
	Icon: {
		...ifIphoneX(
			{
				marginTop: 50
			},
			{
				marginTop: 35
			}
		),
		// marginTop: 25,
		position: 'absolute',
		right: 15
	},
	arrowBack: {
		marginTop: 30,
		marginLeft: 5
	},

	Icon2: {
		...ifIphoneX(
			{
				marginTop: 50
			},
			{
				marginTop: 35
			}
		),
		position: 'absolute',
		right: 50
	},
	Icon1: {
		...ifIphoneX(
			{
				marginTop: 50
			},
			{
				marginTop: 35
			}
		),
		position: 'absolute',
		right: 15
	},
    divider: {
        borderBottomWidth: 1,
        borderColor: '#707070',
        marginBottom: 10,
        width: '100%',
    },
	notificationHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
		paddingVertical: 10,
	},
	notificationTitle: {
		fontFamily: 'OpenSans-Bold',
		fontSize: 16,
		color: '#515151',
	},
	notificationSettings: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	notificationSettingItem: {
		fontFamily: 'OpenSans',
		fontSize: 12,	
		color: '#BABABA',
		marginRight: 8,
	},
	notificationItemContainer: {
		borderColor: '#CBCBCB',
		borderWidth: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 2,
	},
	notificationOwner: {
		fontFamily: 'OpenSans-Bold',
		fontSize: 16,
		color: '#070707',
	},
	notificaitonAction: {
		fontFamily: 'OpenSans',
		fontSize: 12,	
		color: '#070707',
	},
	notificationTime: {
		fontSize: 12,
		color: '#AAAAAA'
	},
	warningModal: {
		backgroundColor: '#ffffff',
		height: 390,
	}
});

export default TopBar;
