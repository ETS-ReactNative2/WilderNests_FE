import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { COLORS } from "../../assets/constants/constants";

export const CommentForm = ({ route }) => {
  const { newRating, name, id } = route.params;
  const [rating, setRating] = useState(newRating);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

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

  const initialStars = createStarDisplay(rating);
  const [stars, setStars] = useState(initialStars);

  const handleRating = (index) => {
    const newRating = index + 1;
    setRating(newRating);
    const newStars = createStarDisplay(newRating);
    setStars(newStars);
  };

  return (
    <SafeAreaView>
      <FlatList
        style={styles.flatList}
        numColumns={5}
        data={stars}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleRating(index)}>
            <Image source={item} key={index} style={styles.star} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.key}
      />
      <Text style={styles.header}>Comment for {name}</Text>
      <TextInput
        style={styles.input}
        placeholder="Comment Title"
        value={title}
        onChangeText={(newTitle) => setTitle(newTitle)}
      />
      <TextInput
        style={styles.input}
        placeholder="Please provide any comments about this site that may be helpful to other visitors"
        multiline={true}
        numberOfLines={4}
        value={description}
        onChangeText={(newComment) => setDescription(newComment)}
      />
      <TouchableOpacity style={styles.touchable}>
        <Text style={styles.button}>Submit Comment</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  star: {
    height: 25,
    width: 25,
    marginRight: 3,
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  flatList: {
    alignSelf: "center",
    margin: 20,
  },
  input: {
    fontSize: 20,
    padding: 15,
    borderColor: "#537A72",
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
  },
  touchable: {
    borderRadius: 4,
    backgroundColor: COLORS.purple,
    width: 200,
    alignSelf: "center",
    marginTop: 20
  },
  button: {
    color: "#fff",
    padding: 15,
    textAlign: "center",
    fontFamily: "MavenPro-Medium",
    fontSize: 20,
  },
});