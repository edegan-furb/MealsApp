import { useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, StyleSheet, View, Image, ScrollView } from "react-native";

import { MEALS } from "../data/dummy-data";

import MealDetails from "../components/MealDetail/MealDetails";
import SubTitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";
import { addFavorite, removeFavorite } from "../store/redux/favorites";

// import { FavoritesContext } from "../store/context/favorites-context";

function MealDetailScreen({ route, navigation }) {
  // const favoriteMealCtx = useContext(FavoritesContext);
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
  const dispatch = useDispatch();

  const mealId = route.params.mealId;
  const mealHeaderStyle = route.params.mealHeaderStyle;

  const selectMeal = MEALS.find((meal) => meal.id === mealId);

  const mealIsFavorite = favoriteMealIds.includes(mealId);

  // const mealIsFavorite = favoriteMealCtx.ids.includes(mealId);

  // function changeFavoriteStatusHandler() {
  //   if (mealIsFavorite) {
  //     favoriteMealCtx.removeFavorite(mealId);
  //   } else {
  //     favoriteMealCtx.addFavorite(mealId);
  //   }
  // }

  function changeFavoriteStatusHandler() {
    if (mealIsFavorite) {
      dispatch(removeFavorite({ id: mealId }));
    } else {
      dispatch(addFavorite({ id: mealId }));
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavorite ? "star" : "star-outline"}
            color="white"
            onPress={changeFavoriteStatusHandler}
          />
        );
      },
      headerStyle: { backgroundColor: mealHeaderStyle },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectMeal.imageUrl }} />
      <Text style={styles.title}>{selectMeal.title}</Text>
      <MealDetails
        duration={selectMeal.duration}
        affordability={selectMeal.affordability}
        complexity={selectMeal.complexity}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <SubTitle>Ingredients</SubTitle>
          <List data={selectMeal.ingredients} />
          <SubTitle>Steps</SubTitle>
          <List data={selectMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 250,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "#9a3412",
  },
  detailText: {
    color: "#9a3412",
  },
  subTitle: {
    color: "#9a3412",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitleContainer: {
    padding: 6,
    marginHorizontal: 24,
    marginVertical: 4,
    borderBottomColor: "#9a3412",
    borderBottomWidth: 2,
  },
  listContainer: {
    maxWidth: "80%",
  },
  listOuterContainer: {
    alignItems: "center",
  },
});
