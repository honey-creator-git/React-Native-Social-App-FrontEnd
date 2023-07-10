import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, Text, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import LoadingOverlay from '../../components/LoadingOverlay';
import TopBar from '../../components/TopBar'

const classes = [
	{
		image: require('../../assets/images/temp/1.png'),
		title: 'Inflammatory',
		description: 'Another way to help improve mood and outlook is through positive thinking. Members will receive daily affirmations and positive thoughts to help them focus on their strength and capabilities.'
	},
	{
		image: require('../../assets/images/temp/2.png'),
		title: 'Healthy Snacking',
		description: 'Another way to help improve mood and outlook is through positive thinking. Members will receive daily affirmations and positive thoughts to help them focus on their strength and capabilities.'
	},
	{
		image: require('../../assets/images/temp/3.png'),
		title: 'Diets',
		description: 'Another way to help improve mood and outlook is through positive thinking. Members will receive daily affirmations and positive thoughts to help them focus on their strength and capabilities.'
	}
]

const NutritionScreen = (props) => {

	const [loading, setLoading] = useState(false);
	const [toolkitPosts, setToolkitPosts] = useState([]);
	const originalToolkitPosts = useSelector((state) => state.toolkit['toolkitPosts_1']);
	const loggedIn = useSelector((state) => state.user['userLoggedIn']);

	useEffect(() => {
		var parsedToolkitPosts = JSON.parse(originalToolkitPosts);
		setToolkitPosts(parsedToolkitPosts);
	}, []);

	const handleSearch = (text) => {
		var parsedToolkitPosts;
		if (text.length == 0) {
		  parsedToolkitPosts = JSON.parse(originalToolkitPosts);
		} else {
		  parsedToolkitPosts = JSON.parse(originalToolkitPosts);
		  parsedToolkitPosts = parsedToolkitPosts.filter((item, index) => 
		  	item.title.includes(text) || item.description.includes(text)
		  );
		}
		setToolkitPosts(parsedToolkitPosts);
	}

	return (
		<View>
			{ 	loggedIn == true && <TopBar
					title="Nutrition Resources"
					isArrowBack={true}
					isBell={true}
					onBack={() => { props.navigation.goBack() }}
					onAvatarClick={() => { props.navigation.navigate('ProfileSetting') }}
			/> }
			<View style={{backgroundColor: 'white'}}>
				{loading && <LoadingOverlay />}
				<View>
					<Text style={styles.title}>Online Classes About Nutrition</Text>
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
							handleSearch(text);
						}}
					/>
					<ScrollView contentContainerStyle={styles.scrollContent}>
						{toolkitPosts.map((item, index) =>
							<NutritionClasses
								key={index}
								image={item['coverLetterImage']}
								title={item['title']}
								description={item['description']}
							/>
						)}
					</ScrollView>
				</View>
			</View>
		</View>
	);
}

const NutritionClasses = (props) => {

	const { image, title, description } = props;

	return (
		<TouchableOpacity onPress={() => { }}>
			<View style={{borderBottomWidth: 5, borderBottomColor: '#E9E9E9', paddingVertical: 10, }}>
				<Image
					style={styles.toolkitImage}
					source={{ uri: image}}
					resizeMode='cover'
				/>
				<Text style={styles.itemTitle}>{title}</Text>
				<Text style={styles.itemContext}>{description}</Text>
			</View>			
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	toolkitImage: {
		width: Dimensions.get('screen').width * 0.95,
		height: 200,
		resizeMode: 'contain',
		alignSelf: 'center'
	},
	scrollContent: {
		alignItems: 'center',
		paddingBottom: 600
	},
	title: {
		fontSize: 18,
		marginLeft: 10,
		marginTop: 25,
		fontWeight: 'bold',
		color: "#4A4A4A",
	},
	itemTitle: {
		color: '#A5593C',
		fontFamily: 'OpenSans',
		fontSize: 16,
		marginHorizontal: 15,
		fontWeight: 'bold',
	},
	itemContext: {
		marginVertical: 8,
		color: '#989898',
		fontFamily: 'OpenSans',
		fontSize: 13,
		marginHorizontal: 15
	},
	inputContainerStyle: {
	  borderRadius: 20,
	  marginBottom: 15,
	  marginTop: 20,
	  width: Dimensions.get('screen').width - 20,
	  backgroundColor: '#E3E3E3',
	  height: 40,
	  borderBottomWidth: 0,
	  alignSelf: 'center'
	},
	inputStyle: {
	  fontSize: 14,
	  color: '#9CA3B7'
	}
});

export default NutritionScreen;
