import React from 'react';
import { View, Image, Text, Dimensions } from 'react-native';

const Forum = (props) => {
    const forum = props.forum;
    
    return (
        <View style={styles.container}>
            <Image 
                style={styles.image} 
                // source={forum.image}
                source={{uri: forum['coverLetterImage']}}
                resizeMode='stretch'
            />
            {/* <Text style={styles.title}>{forum.title}</Text> */}
            <Text style={styles.title}>{forum['title']}</Text>
            {/* <Text style={styles.category}>{forum.category}</Text> */}
            <Text style={styles.category}>30 COMMENTS</Text>
        </View>
    )
}

const styles = {
    container: {
        fontFamily: 'OpenSans'
    },
    image: {
        flex: 1,
        width: '100%',
        height: Dimensions.get('window').width * 0.45 * 0.75,
        borderRadius: 10
    },
    title: {
        marginTop: 5,
        color: '#A5593C',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'OpenSans'
    },
    category: {
        color: '#9CA3B7',
        fontSize: 12,
        fontFamily: 'OpenSans',
        marginTop: 5,
    }
}

export default Forum;