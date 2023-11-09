import { useLayoutEffect } from "react";

import { MEALS, CATEGORIES } from "../data/dummy-data";
import MealsList from "../components/MealList/MealsList";

function MealsOverviewScreen({ route, navigation }) {
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  const categoryTitle = CATEGORIES.find(
    (category) => category.id === catId
  ).title;

  const categoryColor = CATEGORIES.find(
    (category) => category.id === catId
  ).color;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: categoryColor },
      title: categoryTitle,
    });
  }, [catId, navigation]);

  return <MealsList items={displayedMeals} categoryColor={categoryColor} />;
}

export default MealsOverviewScreen;
