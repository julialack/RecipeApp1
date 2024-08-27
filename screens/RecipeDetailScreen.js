import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


export default function RecipeDetailScreen({ route, navigation }) {
  const { recipe } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.subtitle}>Ingredients:</Text>
      <Text>{recipe.ingredients}</Text>
      <Text style={styles.subtitle}>Cooking Time:</Text>
      <Text>{recipe.cookingTime}</Text>
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
