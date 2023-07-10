import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, Text, Dimensions, TextInput } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';

import LoadingOverlay from '../../components/LoadingOverlay';
import TopBar from '../../components/TopBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { forumActions } from '../../../redux/actions/forumActions';


const user = {
	name: 'Elize',
	avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGHjPcNR8D64dBVY4MlK-SahdXGT2o0RfIg2S7VnpX7w&s'
}

const commentList = [
	{
		image: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
		name: 'Klarke_So',
		commentedAt: '2022-03-22 | 16:16:07',
		description: 'Another way to help improve mood and outlook is through positive thinking. Members will receive daily affirmations and positive thoughts to help them focus on their strength and capabilities.',
		likeCnt: 5
	},
	{
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY2ahJliB6cPF2rMalfHlFmJuM7Tjgs1iGHO0279xD6Wyg_fPPB9UCXd0J5oPlSXcncN8&usqp=CAU',
		name: 'Klarke_So',
		commentedAt: '2022-03-22 | 16:16:07',
		description: 'Another way to help improve mood and outlook is through positive thinking. Members will receive daily affirmations and positive thoughts to help them focus on their strength and capabilities.',
		likeCnt: 3
	},
	{
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyW1v_mM9vuI9Sd7amcifLxqjlFN7bXlvv3LLtPHuLm1khSZwqsovb7bbOWb-z5CRwqnU&usqp=CAU',
		name: 'Klarke_So',
		commentedAt: '2022-03-22 | 16:16:07',
		description: 'Another way to help improve mood and outlook is through positive thinking. Members will receive daily affirmations and positive thoughts to help them focus on their strength and capabilities.',
		likeCnt: 8
	}
]

const userInfo = {
	name: 'Klarke_So',
	avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
	createdAt: '2022-03-22 | 16:16:07',
	viewCnt: '35 views',
}

const articleContent = {
	title: 'Auto Immune Disease How To Prevent ?',
	image: require('../../assets/images/temp/1.png'),
	description: 'Another way to help improve mood and outlook is through positive thinking. Members will receive daily affirmations and positive thoughts to help them focus on their strength and capabilities.'
}

const participantAvatars = [
	'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY2ahJliB6cPF2rMalfHlFmJuM7Tjgs1iGHO0279xD6Wyg_fPPB9UCXd0J5oPlSXcncN8&usqp=CAU',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyW1v_mM9vuI9Sd7amcifLxqjlFN7bXlvv3LLtPHuLm1khSZwqsovb7bbOWb-z5CRwqnU&usqp=CAU',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6i4ZYua1zQ_e3a50STgzPznq5Hy91z-2sZV-TtyT77ugRs95SMNUPf98FTwcrgB0lk3Q&usqp=CAU',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSldNBADAizrpttiIwQyV1qIQ2_faSjzGaqjtL9mcN2ot2GuagwWFvGS0dwVT71pl6HCCY&usqp=CAU',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDgC0k4yw6tF2Co7xlfdJPijlIM1_fOpj1fNj1Sws_je5maXIUroADm6YA-4UhcMMfwRs&usqp=CAU',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwiwBuvNhCcIxSz-_qfJEnHYNeIte-WYsPoWWsoyWcjfysjJNjWRh7QtiP_IRBMBFR4sg&usqp=CAU',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOT4CisUiu-CGyO7GvaQo1dBJA8OEJ2gOpwlDVeRcPXbvkGqqT1OkA40npcvOjbHoYqjM&usqp=CAU',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjcLlX32lKjIXk7EU7ey1UjFFS-ZpDkdpBnX2BRUJH8ztxiQfimD4V8dG3OBCSZBfu_d8&usqp=CAU',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjBQF_qZluG0OnyvSIoLeJ75riG6jhG6yjKtm-_8aqIdrK0Wb3lVsVR2_3S9I5Q6TYwKE&usqp=CAU',
	'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
	'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
]

const ForumDetailScreen = (props) => {

	const [loading, setLoading] = useState(false);
	const [forumDetail, setForumDetail] = useState(null);
	const [forumPostComments, setForumPostComments] = useState([]);
	const [owner, setOwner] = useState(null);
	const [participants, setParticipants] = useState([]);
	const users = JSON.parse(useSelector((state) => state.user['users']));
	const currentUser = useSelector((state) => state.user['user']);
	const userToken = useSelector((state) => state.user["token"]);
	const loggedIn = useSelector((state) => state.user['userLoggedIn']);
	const [newCommit, setNewCommit] = useState('');

	const dispatch = useDispatch();

	useEffect(() => {
		const forumInfo = JSON.parse(props.route.params.forumDetail);
		setForumDetail(forumInfo);
		setForumPostComments(forumInfo['comments']);

		const participants = forumInfo['comments'].map((item, index) => {
			return item["postedBy"]			
		});
		const uniqueParticipants = participants.filter((item, index) => {
			return participants.indexOf(item) === index;
		});

		setParticipants(uniqueParticipants);

		const ownerInfo = JSON.parse(props.route.params.owner);
		setOwner(ownerInfo);

		const postComments = props.route.params.comments;
		if(!!postComments) {
			const commentsForUpdating = JSON.parse(postComments);
			setForumPostComments(commentsForUpdating);
		}

		const updatedForumPostComment = props.route.params.updatedForumPostComment;
		if(!!updatedForumPostComment) {
			let updatedForumPostComments;
			const updatedComment = JSON.parse(updatedForumPostComment);
			updatedForumPostComments = forumPostComments.map((item, index) => {
				if(item['id'] == updatedComment['id']) {
					item = updatedComment
					return item;
				}
				return item;
			})
			console.log("Hey !!!");
			setForumPostComments(updatedForumPostComments);
		}
	}, [props.route.params])

	const handleFollowUser = () => {

		const currentUserId = currentUser['id'];
		const ownerId = owner['id'];

		dispatch(forumActions.followForumOwner(userToken, currentUserId, ownerId, props.navigation))
	}

	const handleCommitInput = (text) => {
		setNewCommit(text);
	}

	const submitCommit = () => {
		if(newCommit != '') {
			dispatch(forumActions.submitNewCommit(userToken, forumDetail["id"], newCommit, currentUser['id'], props.navigation));
		}
		setNewCommit('');
	}

	const handleForumLikeEmotion = () => {
		const originalForumLikeNumber = forumDetail['emotions']['like'];
		const originalForumDislikeNumber = forumDetail['emotions']['dislike'];
		const addedLikeNumber = originalForumLikeNumber + 1;
		const emotion = {
			'Like': addedLikeNumber,
			'Dislike': originalForumDislikeNumber
		}

		dispatch(forumActions.addForumLikeEmotion(userToken, forumDetail['id'], emotion, props.navigation));
	}	

	const updateForumPostCommentEmotion = (likeEmotionNumber, dislikeEmotionNumber, commentId) => {
		const addedForumPostCommentLikeEmotion = likeEmotionNumber + 1;
		const originalForumPostCommentDislikeEmotion = dislikeEmotionNumber;
		const emotion = {
			"Like": addedForumPostCommentLikeEmotion,
			"Dislike": originalForumPostCommentDislikeEmotion
		}
		const forumPostId = forumDetail['id'];
		dispatch(forumActions.addForumPostCommentLikeEmotion(userToken, forumPostId, commentId, emotion, props.navigation));
	}

	return (
		<View style={{position: 'relative'}}>
			{ loggedIn == true && <TopBar
				title="Forum Detail"
				isArrowBack={true}
				isBookMark={true}
				isSharealt={true}
				onBack={() => { props.navigation.goBack() }}
			/> }
			<View style={{backgroundColor: 'white'}}>
				<View style={{position: 'relative'}}>			
					{ forumDetail &&
						<ScrollView style={{marginBottom: 130}}>
							{loading && <LoadingOverlay />}
							<View style={{ backgroundColor: 'white', paddingBottom: 100 }}>
								<View style={{ backgroundColor: 'white' }}>
									<Text style={styles.title}>
										{forumDetail["title"]}
									</Text>
								</View>
								<View style={styles.writer}>
									<View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
										<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>
											<Avatar
												containerStyle={styles.avatar}
												rounded
												source={ !owner["avatar"] ? { uri: user.avatar } : { uri: owner["avatar"] }}
												size="small"
											/>
											<Text style={styles.writerName}>{owner["firstName"] + " " + owner["lastName"]}</Text>
										</View>
										<Text style={styles.writerInformation}>{forumDetail["createdAt"]}</Text>
										<Text style={styles.writerInformation}>{forumDetail["visitCount"]} views</Text>
									</View>
									<TouchableOpacity onPress={() => handleFollowUser()}>
										<View style={styles.followButton}>
											<Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>Follow</Text>
										</View>
									</TouchableOpacity>
								</View>
								<View style={styles.mainArticlePanel}>
									{/* <Image style={styles.mainImage} source={articleContent.image} resizeMode='cover' /> */}
									<Image style={styles.mainImage} source={{ uri: forumDetail["coverLetterImage"]}} resizeMode='cover' />
									<View>
										<Text style={styles.mainDescription}>{forumDetail["description"]}</Text>
										<TouchableOpacity style={styles.likeButton} onPress={() => handleForumLikeEmotion()}>
											<Icon name="like1" type="antdesign" color="white" size={15} />
											<Text style={{ color: 'white', fontSize: 12, marginLeft: 7, top: 1, }}>Like</Text>
										</TouchableOpacity>
									</View>
								</View>
								<View style={styles.participantPanel}>
									<Text style={styles.subTitle}>Participants</Text>
									<View style={styles.participantList}>
										{!!participants && participants.map((participant, index) => {
											const participantUser = users.filter((user, index) => user["id"] == participant)[0];
											return (
												<Avatar
													containerStyle={styles.participantItem}
													rounded
													source={{ uri: participantUser['avatar'] }}
													size="medium"
													key={index}
												/>
											)}
										)}
									</View>
								</View>
								<View style={styles.commentPanel}>
									<Text style={styles.subtitleComment}>All Comments</Text>
									{forumPostComments.map((item, index) => {
										const postOwner = users.filter((user, index) => user["id"] == item["postedBy"])[0];
										return (
											<CommentItem
												commentId={item['id']}
												avatar={postOwner["avatar"]}
												name={postOwner["firstName"] + " " + postOwner["lastName"]}
												creationDate={item["postedAt"]}
												description={item["description"]}
												likeCnt={!!item["emotions"]["like"] ? item["emotions"]["like"] : 0}
												dislikeCnt={!!item["emotions"]["dislike"] ? item["emotions"]["dislike"] : 0}
												key={index}
												updateForumPostCommentEmotion={updateForumPostCommentEmotion}
											/>
										)
									})}
								</View>
							</View>
						</ScrollView>
					}				
				</View>
			</View>
			<View style={styles.postPanel}>
				<TextInput
					placeholderTextColor="#AAAAAA"
					style={styles.postBox}
					placeholder='What do you think?'
					onChangeText={(text) => handleCommitInput(text)}
					value={newCommit}
				/>
				<TouchableOpacity style={styles.sendIcon} onPress={() => submitCommit()}>
					<Icon name="send" type="font-awesome" color="white" />
				</TouchableOpacity>
			</View>
		</View>
	);
}

const CommentItem = (props) => {
	const { commentId, avatar, name, creationDate, description, likeCnt, dislikeCnt, updateForumPostCommentEmotion } = props;

	return (
		<View style={styles.commentContainer}>
			<Avatar
				containerStyle={styles.avatar}
				rounded
				source={!avatar ? { uri: user.avatar } : {uri: avatar}} ///  {uri: avatar}
				size="medium"
			/>
			<View style={{ width: Dimensions.get('screen').width * 0.65 }}>
				<Text style={styles.commentWriterName}>{name}</Text>
				<Text style={styles.commentCreationDate}>{creationDate}</Text>
				<Text style={styles.commentContent}>{description}</Text>
			</View>
			<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
				<Text style={styles.like}>{likeCnt}</Text>
				<TouchableOpacity onPress={() => updateForumPostCommentEmotion(likeCnt, dislikeCnt, commentId)}>
					<Icon name='like1' type='antdesign' size={14} color={'#9D9D9D'} />
				</TouchableOpacity>
				<View>
					<TouchableOpacity>
						<MaterialCommunityIcons
							name="dots-vertical"
							size={27}
							color="#9D9D9D"
						/>
					</TouchableOpacity>
				</View>
			</View>			
		</View>
	)
}

const styles = StyleSheet.create({
	mainArticlePanel: {
		backgroundColor: 'white',
	},
	commentPanel: {
		backgroundColor: '#EEEEEE',
		paddingTop: 20,
		position: 'relative',
	},
	subtitleComment: {
		marginLeft: Dimensions.get('screen').width * 0.05,
		fontSize: 18,
		fontFamily: 'OpenSans-Bold',
		color: '#000000',
	},
	commentContainer: {
		paddingTop: 20,
		paddingBottom: 20,
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'center',
		borderBottomColor: '#DDDDDD',
		borderBottomWidth: 1
	},
	commentWriterName: {
		marginLeft: 10,
		marginTop: 5,
		fontFamily: 'OpenSans-Bold',
		fontSize: 16,
		color: "#606060",
	},
	commentCreationDate: {
		marginLeft: 10,
		color: '#BBBBBB',
		fontFamily: 'OpenSans',
		fontSize: 12,
	},
	commentContent: {
		marginLeft: 10,
		marginTop: 10,
		fontFamily: 'OpenSans',
		fontSize: 13,
		color: "#606060",
	},
	participantPanel: {
		backgroundColor: 'white',
		marginTop: 5,
		paddingBottom: 20,
		borderTopColor: '#EEEEEE',
		borderTopWidth: 1,
	},
	participantList: {
		width: Dimensions.get('screen').width * 0.95,
		alignSelf: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		flexWrap: 'wrap',
	},
	participantItem: {
		marginHorizontal: 3,
		marginVertical: 3
	},
	likeButton: {
		width: 80,
		paddingVertical: 7,
		paddingHorizontal: 15,
		borderRadius: 7,
		backgroundColor: 'rgb(24, 119, 242)',
		flexDirection: 'row',
		marginBottom: 15,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center'
	},
	mainDescription: {
		// marginLeft: Dimensions.get('screen').width * 0.025,
		// marginRight: Dimensions.get('screen').width * 0.025,
		width: Dimensions.get('screen').width * 0.9,
		marginBottom: 20,
		color: '#AAAAAA',
		fontFamily: 'OpenSans',
		alignSelf: 'center',
		paddingVertical: 10,
		fontSize: 13,
	},
	mainImage: {
		width: Dimensions.get('screen').width * 0.9,
		height: 200,
		resizeMode: 'contain',
		alignSelf: 'center',
	},
	followButton: {
		marginRight: Dimensions.get('screen').width * 0.1,
		paddingVertical: 7,
		paddingHorizontal: 20,
		borderRadius: 6,
		backgroundColor: 'rgb(104, 122, 97)'
	},
	writerInformation: {
		color: '#C2C2C2',
		marginLeft: Dimensions.get('screen').width * 0.05,
		fontSize: 12,
	},
	writerName: {
		// marginTop: 15,
		color: '#404040',
		marginLeft: 10,
		fontFamily: 'OpenSans-Bold',
		fontSize: 16,
	},
	toolkitImage: {
		width: 460,
		height: 200,
		margin: 10
	},
	scrollContent: {
		alignItems: 'center',
		paddingBottom: 420,
	},
	title: {
		fontSize: 20,
		marginLeft: Dimensions.get('screen').width * 0.05,
		marginTop: 30,
		color: '#A5593C',
		fontFamily: 'OpenSans-Bold',
		letterSpacing: 1,
	},
	subTitle: {
		fontSize: 16,
		color: '#A5593C',
		textAlign: 'center',
		fontFamily: 'OpenSans-Bold',
		paddingVertical: 10,
	},
	itemTitle: {
		color: '#A5593C',
		fontFamily: 'OpenSans',
		fontSize: 20,
		marginHorizontal: 15
	},

	itemContext: {
		marginVertical: 8,
		color: 'gray',
		fontFamily: 'OpenSans',
		fontSize: 16,
		marginHorizontal: 15
	},

	writer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: 'white',
		paddingVertical: 10,
	},
	avatar: {
		marginLeft: Dimensions.get('screen').width * 0.05,
	},
	postPanel: {
		position: 'absolute',
		bottom: 80,
		width: '100%',
		height: 70,
		backgroundColor: '#434343',
		flexDirection: 'row',
		paddingVertical: 20,
		paddingHorizontal: Dimensions.get('screen').width * 0.025,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 1,
	},
	postBox: {
		borderTopRightRadius: 30,
		borderTopLeftRadius: 30,
		borderBottomRightRadius: 30,
		borderBottomLeftRadius: 30,
		minWidth: Dimensions.get('screen').width * 0.85,
		height: 50,
		backgroundColor: 'rgb(91, 91, 91)',
		color: "white",
		paddingLeft: 20
	},
	sendIcon: {
		marginLeft: 10,
	},
	like: {
		color: '#9D9D9D',
		fontSize: 12,
		marginRight: 5,
	}
});

export default ForumDetailScreen;
