import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomeScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadRecipes();
  }, []);

  useEffect(() => {
    filterRecipes();
  }, [search, recipes]);

  const loadRecipes = async () => {
    try {
      const storedRecipes = await AsyncStorage.getItem('recipes');
      if (storedRecipes) {
        setRecipes(JSON.parse(storedRecipes));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filterRecipes = () => {
    if (search === '') {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(
        recipes.filter(recipe =>
          recipe.title.toLowerCase().includes(search.toLowerCase()) ||
          recipe.ingredients.toLowerCase().includes(search.toLowerCase()) ||
          recipe.cookingTime.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  };

  const handleRecipePress = (recipe) => {
    navigation.navigate('RecipeDetail', { recipe });
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        placeholder="Search recipes..."
        value={search}
        onChangeText={setSearch}
        style={{ borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 10 }}
      />
      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleRecipePress(item)}>
            <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
              <Text style={{ fontSize: 18 }}>{item.title}</Text>
              <Text>{item.ingredients}</Text>
              <Text>{item.cookingTime}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <Button title="Add Recipe" onPress={() => navigation.navigate('AddRecipe')} />
    </View>
  );
}

