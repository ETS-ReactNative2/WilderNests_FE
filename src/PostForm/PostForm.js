import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "../../assets/constants/constants";

const emptyCheck = require("../../assets/images/checkbox.png");
const fullCheck = require("../../assets/images/done.png");

export const PostForm = ({ loadData }) => {
  const [amenities, setAmenities] = useState([]);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [description, setDescription] = useState("");
  const [driving_tips, setDrivingTips] = useState("");
  const [image_url, setImgUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleAmenities = (amenity) => {
    if (amenities.includes(amenity)) {
      const filteredAmenities = amenities.filter((am) => am !== amenity);
      setAmenities(filteredAmenities);
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  const handleInputChange = (value, func) => {
    func(value);
  };

  const handleSubmit = () => {
    const isLatValid = lat && lat > -90 && lat < 90;
    const isLonValid = lon && lon > -180 && lon < 180;
    if (isLatValid && isLonValid && name) {
      postData();
      setAmenities("");
      setName("");
      setCity("");
      setState("");
      setLat("");
      setLon("");
      setDescription("");
      setDrivingTips("");
      setImgUrl("");
      setMessage("Form successfully submitted");
      loadData();
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else {
      setMessage("All fields marked with an * are required and must be valid.");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  const postData = async () => {
    const newCampsite = {
      amenities: amenities.join(', '),
      name,
      city,
      state,
      description,
      driving_tips,
      image_url,
      lat,
      lon,
    };
    console.log(newCampsite);
    try {
      const response = await fetch(
        "https://dpcamping-be-stage.herokuapp.com/campsites/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCampsite),
        }
      );
      console.log(response.status);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Tell us about your campsite</Text>
      <Text style={styles.label}>Title*:</Text>
      <TextInput
        style={styles.input}
        placeholder="Campsite Title"
        value={name}
        onChangeText={(value) => handleInputChange(value, setName)}
      />
      <Text style={styles.label}>City:</Text>
      <TextInput
        style={styles.input}
        placeholder="Closest city/town"
        value={city}
        onChangeText={(value) => handleInputChange(value, setCity)}
      />
      <Text style={styles.label}>State:</Text>
      <TextInput
        style={styles.input}
        placeholder="State"
        value={state}
        onChangeText={(value) => handleInputChange(value, setState)}
      />
      <Text style={styles.label}>Lat (-90 to 90)*:</Text>
      <TextInput
        style={styles.input}
        placeholder="Latitude"
        keyboardType="numeric"
        value={lat}
        onChangeText={(value) => handleInputChange(parseFloat(value), setLat)}
      />
      <Text style={styles.label}>Long (-180 to 180)*:</Text>
      <TextInput
        style={styles.input}
        placeholder="Longitude"
        keyboardType="numeric"
        value={lon}
        onChangeText={(value) => handleInputChange(parseFloat(value), setLon)}
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="A brief description of the site including details about the surroundings"
        multiline={true}
        numberOfLines={4}
        value={description}
        onChangeText={(value) => handleInputChange(value, setDescription)}
      />
      <Text style={styles.label}>Directions:</Text>
      <TextInput
        style={styles.input}
        placeholder="How far is it from major roads? Any tips for landmarks to look out for?"
        multiline={true}
        numberOfLines={4}
        value={driving_tips}
        onChangeText={(value) => handleInputChange(value, setDrivingTips)}
      />
      <Text style={styles.label}>Image:</Text>
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={image_url}
        onChangeText={(value) => handleInputChange(value, setImgUrl)}
      />
      <Text style={styles.text}>Available Amenities Nearby:</Text>
      <View style={styles.allCheckboxes}>
        <TouchableOpacity
          style={styles.checkContainer}
          onPress={() => handleAmenities("fire")}
        >
          <Image
            style={styles.icon}
            source={amenities.includes("fire") ? fullCheck : emptyCheck}
          />
          <Text style={styles.label}>Firepit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkContainer}
          onPress={() => handleAmenities("boat")}
        >
          <Image
            style={styles.icon}
            source={amenities.includes("boat") ? fullCheck : emptyCheck}
          />
          <Text style={styles.label}>Boating/Water</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkContainer}
          onPress={() => handleAmenities("fish")}
        >
          <Image
            style={styles.icon}
            source={amenities.includes("fish") ? fullCheck : emptyCheck}
          />
          <Text style={styles.label}>Fishing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkContainer}
          onPress={() => handleAmenities("bike")}
        >
          <Image
            style={styles.icon}
            source={amenities.includes("bike") ? fullCheck : emptyCheck}
          />
          <Text style={styles.label}>Mountain Biking Trails</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkContainer}
          onPress={() => handleAmenities("atv")}
        >
          <Image
            style={styles.icon}
            source={amenities.includes("atv") ? fullCheck : emptyCheck}
          />
          <Text style={styles.label}>ATV Trails</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkContainer}
          onPress={() => handleAmenities("horse")}
        >
          <Image
            style={styles.icon}
            source={amenities.includes("horse") ? fullCheck : emptyCheck}
          />
          <Text style={styles.label}>Horse Trails</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkContainer}
          onPress={() => handleAmenities("hike")}
        >
          <Image
            style={styles.icon}
            source={amenities.includes("hike") ? fullCheck : emptyCheck}
          />
          <Text style={styles.label}>Hiking Trails</Text>
        </TouchableOpacity>
      </View>
      {!!message && <Text style={styles.message}>{message}</Text>}
      <Button
        onPress={handleSubmit}
        title="Submit Campsite"
        color={"#7E62CF"}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
    marginTop: 30,
  },
  label: {
    fontSize: 20,
    marginLeft: 20,
    color: COLORS.green,
  },
  text: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
    color: COLORS.purple,
  },
  input: {
    fontSize: 20,
    padding: 15,
    borderBottomColor: COLORS.green,
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  allCheckboxes: {
    marginBottom: 10,
  },
  checkContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 10,
  },
  message: {
    color: COLORS.pink,
    textAlign: "center",
    fontSize: 15,
  },
});
