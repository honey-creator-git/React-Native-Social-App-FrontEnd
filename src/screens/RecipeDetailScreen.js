import React, {useEffect, useState} from 'react';
import {
            View, 
            StyleSheet, 
            SafeAreaView, 
            TouchableOpacity,
            Text,
            Image,
        } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Avatar } from 'react-native-elements';

import LoadingOverlay from '../components/LoadingOverlay';
import Images from '../assets/Images';
import BackgroundImage from '../components/BackgroundImage';
import { ScrollView } from 'react-native-gesture-handler';

const recipe = {
    backgroundImage: require('../assets/images/forum2.png'),
    title: 'Salad from tomatoes, cucumber, red onions',
    cookingTime: 25,
    preparationTime: 10,
    description: 'Salad recipes are my favorite way to showcase vibrant, in-season produce – fruits and veggies that are so good on their own that you don’t need to do much to make them into a delicious meal.',
    ingredients: '¼ cup cashew or peanut butter \n 2 tablespoons white miso paste \n 2 tablespoons lime juice \n 1 teaspoon sesame oil \n 1 teaspoon grated ginger \n 2 to 5 tablespoons water, or as needed',
    instructions: '1. Make the dressing: In a small bowl, whisk together the cashew butter, miso paste, lime juice, sesame oil, and ginger. Whisk in enough water to create a drizzable consistency. Set aside. \n \n 2. In a dry cast-iron skillet over medium heat, char the peppers whole, rotating until the edges have a little char, about 2 minutes per side. Remove. When cool to the touch, slice in half lengthwise, remove the stem, ribbing, and seeds and slice horizontally into thin strips. \n \n 3. In a dry cast-iron skillet over medium heat, char the peppers whole, rotating until the edges have a little char, about 2 minutes per side. Remove. When cool to the touch, slice in half lengthwise, remove the stem, ribbing, and seeds and slice horizontally into thin strips.'
}

const RecipeDetailScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const recipeInfoCoverLetterImage = JSON.parse(props.route.params.recipeInfo)['coverLetterImage']
    const recipeInfoTitle = JSON.parse(props.route.params.recipeInfo)['title']
    const recipeInfoCookingTime = JSON.parse(props.route.params.recipeInfo)['cookingPeriod']
    const recipeInfoPreparationTime = JSON.parse(props.route.params.recipeInfo)['preparation']
    const recipeInfoTotalTime = recipeInfoCookingTime + recipeInfoPreparationTime;
    const recipeInfoDescription = JSON.parse(props.route.params.recipeInfo)['description']
    const recipeInfoIngredients = JSON.parse(props.route.params.recipeInfo)['ingredients']
    var convertToStringOfIngre = recipeInfoIngredients.join('\n');
    const recipeInfoInstructions = JSON.parse(props.route.params.recipeInfo)['instructions']
    var convertToStringOfInstructions = recipeInfoInstructions.join('\n');
    useEffect(() => {
    }, [])
    
    return (
      <View>
        <BackgroundImage 
            isRecipeDetail={true}
            backgroundImage={{ uri: recipeInfoCoverLetterImage }}
            // backgroundImage={recipe.backgroundImage}
        />
        <View>
          <View style={styles.container}>
            {loading && <LoadingOverlay />}
            <View style={styles.topbar}>
                <TouchableOpacity 
                    onPress={() => {props.navigation.goBack()}}
                >
                    <MaterialIcons 
                        name="arrow-back" 
                        size={30} 
                        color="#ffffff" 
                    />
                </TouchableOpacity>
            </View>
            
            <View style={styles.body}>
                <ScrollView>
                    {/* <Text style={styles.title}>{recipe.title}</Text> */}
                    <Text style={styles.title}>{recipeInfoTitle}</Text>
                    <View style={{ flexDirection: 'row', width: '100%', paddingHorizontal: '5%', marginVertical: 10 }}>
                        <View style={{ width: '33%'}}>
                            {/* <Text style={styles.time}>{recipe.cookingTime}m</Text> */}
                            <Text style={styles.time}>{recipeInfoCookingTime}m</Text>
                            <Text style={styles.time_description}>cooking</Text>
                        </View>
                        <View style={{ width: '33%'}}>
                            {/* <Text style={styles.time}>{recipe.preparationTime}m</Text> */}
                            <Text style={styles.time}>{recipeInfoPreparationTime}m</Text>                            
                            <Text style={styles.time_description}>preparation</Text>
                        </View>
                        <View style={{ width: '33%'}}>
                            {/* <Text style={styles.time}>{recipe.cookingTime + recipe.preparationTime}m</Text> */}
                            <Text style={styles.time}>{recipeInfoCookingTime + recipeInfoPreparationTime}m</Text>
                            <Text style={styles.time_description}>total time</Text>
                        </View>
                    </View>
                    <View style={styles.divider}></View>
                    {/* <Text style={styles.description}>{recipe.description}</Text> */}
                    <Text style={styles.description}>{recipeInfoDescription}</Text>                    
                    <Text style={styles.subtitle}>Ingredients</Text>
                    {/* <Text style={styles.description}>{recipe.ingredients}</Text> */}
                    <Text style={styles.description}>{convertToStringOfIngre}</Text>                    
                    <Text style={styles.subtitle}>Instructions</Text>
                    {/* <Text style={styles.description}>{recipe.instructions}</Text> */}
                    <Text style={styles.description}>{convertToStringOfInstructions}</Text>
                </ScrollView>
            </View>
          </View>   
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      fontFamily: 'OpenSans',
      marginBottom: 100,
      marginTop: 50,
    },
    title: {
        fontSize: 20,
        color: '#A5593C',
        marginLeft: 15,
        fontFamily: 'OpenSans-Bold',
    },
    body: {
        marginTop: 250,
        paddingHorizontal: 10,
        alignItems: 'center',
        paddingBottom: 120,
    },
    description: {
        color: '#989898',
        fontFamily: 'OpenSans',
        marginHorizontal: 20,
        marginVertical: 0,
        fontSize: 13
    },
    subtitle: {
        fontSize: 18,
        color: '#A5593C',
        marginLeft: 15,
        marginVertical: 10,
        fontFamily: 'OpenSans-Bold',
    },
    topbar: {
        marginTop: 20,
        marginLeft: 10
    },
    time: {
        color: '#687A61',
        fontFamily: 'Open Sans',
        fontWeight: 'bold',
        fontSize: 16
    },
    time_description: {
        color: '#9A9A9A',
        fontFamily: 'OpenSans',
    },
    divider: {
        borderBottomWidth: 1,
        borderColor: '#707070',
        marginBottom: 10,
        width: '100%',
    },   
});

export default RecipeDetailScreen;
