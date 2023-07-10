import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, Image, ScrollView, Text, Dimensions } from 'react-native';

import LoadingOverlay from '../../components/LoadingOverlay';
import TopBar from '../../components/TopBar';

const FeaturedExpertsScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [toolkitPosts, setToolkitPosts] = useState(JSON.parse(useSelector((state) => state.toolkit['toolkitPosts_6'])));
    const loggedIn = useSelector((state) => state.user['userLoggedIn']);

    console.log("Toolkit Posts 6 =>>>> ", toolkitPosts);

    return (
        <View>
			{ 	loggedIn == true && <TopBar
					title="Our Featured Experts"
					isArrowBack={true}
					isBell={true}
					onBack={() => { props.navigation.goBack() }}
					onAvatarClick={() => { props.navigation.navigate('ProfileSetting') }}
			/> }
			<View style={{backgroundColor: 'white'}}>
				{loading && <LoadingOverlay />}
				<View>
					<Text style={styles.title}>Online Hold Articles</Text>
					<ScrollView contentContainerStyle={styles.scrollContent}>
						{toolkitPosts.map((item, index) =>
							<FeaturedExpertsClasses
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
    )
}

const FeaturedExpertsClasses = (props) => {
    const { image, title,  description } = props;

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
		paddingBottom: 300,
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
});

export default FeaturedExpertsScreen;