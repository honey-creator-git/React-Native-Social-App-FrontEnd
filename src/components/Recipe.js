import React from 'react';
import { View, Image, Text, Dimensions } from 'react-native';

const Recipe = (props) => {
    const recipe = props.recipe;
    
    return (
        <View style={styles.container}>
            <Image 
                style={styles.image} 
                // source={recipe["image"]}
                source={{uri: recipe["coverLetterImage"]}}
                resizeMode='stretch'
            />
            <Text style={styles.title}>{recipe.title}</Text>
            <Text style={styles.category}>{recipe["cookingPeriod"] + recipe["preparation"]} MINS MEAL</Text>
            {/* <Text style={styles.category}>35 MINS MEAL</Text> */}
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
        height: Dimensions.get('window').width * 0.38 * 0.75,
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
        fontFamily: 'OpenSans'
    }
}

export default Recipe;