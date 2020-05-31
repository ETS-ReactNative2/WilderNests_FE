import React, { useState } from "react";
import {
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Button,
  View,
  FlatList,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const SiteDetails = ({ route }) => {
  const [userRating, setUserRating] = useState(0);
  
  const {
    image_url,
    name,
    city,
    state,
    lat,
    lon,
    description,
    driving_tips,
    timestamps,
    rating
  } = route.params;
  const photo = image_url ? image_url : "https://place-hold.it/300x500";
  
  const getDirections = () => {
    console.log("directions");
  };
  
  const createStarDisplay = (rating) => {
    const numStars = rating ? Math.ceil(rating) : 0;
    const filledStars = Array(numStars).fill(
      require("../../assets/images/filled-star.png")
      );
      const emptyStars = Array(5 - numStars).fill(
        require("../../assets/images/empty-star.png")
        );
        return filledStars.concat(emptyStars);
      };
      
  const [stars, setStars] = useState(createStarDisplay(rating))

  const handleRating = (index) => {
    const newRating = index + 1;
    setUserRating(newRating);
    const newStars = createStarDisplay(newRating)
    setStars(newStars);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{name}</Text>
      <View style={styles.starsContainer}>
        <FlatList
          numColumns={5}
          data={stars}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => handleRating(index)}>
              <Image source={item} key={index} style={styles.star} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.key}
        />
      </View>
      <Text style={styles.text}>
        {city}, {state}
      </Text>
      <Image
        style={styles.image}
        source={{
          uri: photo,
        }}
      />
      <Text style={styles.text}>Lat: {lat}</Text>
      <Text style={styles.text}>Long: {lon}</Text>
      <Text style={styles.header}>Description:</Text>
      <Text style={styles.text}>{description}</Text>
      <Text style={styles.header}>Driving Tips:</Text>
      <Text style={styles.text}>{driving_tips}</Text>
      <Text style={styles.text}>Date added: {timestamps}</Text>
      <Button
        onPress={getDirections}
        title="Get Directions"
        color={"#7E62CF"}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  starsContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 10,
  },
  header: {
    fontSize: 20,
    width: 250,
    margin: 10,
  },
  text: {
    margin: 10,
  },
  star: {
    height: 15,
    width: 15,
    marginRight: 3,
  },
  image: {
    alignSelf: "center",
    width: 400,
    height: 200,
    marginLeft: 20,
    marginRight: 20,
  },
});
