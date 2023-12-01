import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { Linking } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import DressItem from "../components/DressItem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const [items, setItems] = useState([]);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();
  const [displayCurrentAddress, setdisplayCurrentAddress] =
    useState("loading location");
  const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);
  const openMap = () => {
    // Define the coordinates you want to open on the map
    const latitude = 12.979; // Replace with the actual latitude
    const longitude = 77.713; // Replace with the actual longitude

    // Create a URL that opens Google Maps with the specified coordinates
    const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

    // Use the Linking module to open the map URL
    Linking.openURL(mapUrl)
      .then(() => {
        console.log("Map opened successfully");
      })
      .catch((error) => {
        console.error("Error opening map:", error);
      });
  };

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);
  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location services not enabled",
        "Please enable the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    } else {
      setlocationServicesEnabled(enabled);
    }
  };
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "allow the app to use the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }

    const { coords } = await Location.getCurrentPositionAsync();
    //console.log(coords)
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      //console.log(response)

      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setdisplayCurrentAddress(address);
      }
    }
  };
  const [searchQuery, setSearchQuery] = useState("");

  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const handleSearch = () => {
    // Filter products based on the search query
    const filtered = product.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Update the filteredProducts state with the search results
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    if (product.length > 0) return;

    const fetchProducts = async () => {
      const products = [];
      // services.map((service)=>dispatch(getProducts(service)));
      const colRef = collection(db, "types");
      const docSnap = await getDocs(colRef);
      docSnap.forEach((doc) => {
        products.push(doc.data());
      });
      products?.forEach((service) => dispatch(getProducts(service)));
      setItems(products);
    };
    fetchProducts();
  }, []);

  // console.log(product);
  // const services = [
  //   {
  //       id: "0",
  //       image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
  //       name: "shirt",
  //       quantity: 0,
  //       price: 10,
  //     },
  //     {
  //       id: "11",
  //       image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
  //       name: "T-shirt",
  //       quantity: 0,
  //       price: 10,
  //     },
  //     {
  //       id: "12",
  //       image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
  //       name: "dresses",
  //       quantity: 0,
  //       price: 10,
  //     },
  //     {
  //       id: "13",
  //       image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
  //       name: "jeans",
  //       quantity: 0,
  //       price: 10,
  //     },
  //     {
  //       id: "14",
  //       image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
  //       name: "Sweater",
  //       quantity: 0,
  //       price: 10,
  //     },
  //     {
  //       id: "15",
  //       image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
  //       name: "shorts",
  //       quantity: 0,
  //       price: 10,
  //     },
  //     {
  //       id: "16",
  //       image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
  //       name: "Sleeveless",
  //       quantity: 0,
  //       price: 10,
  //     },
  // ];
  return (
    <>
      <ScrollView
        style={{ backgroundColor: "#F0F0F0", flex: 1, marginTop: 50 }}
      >
        {/* Location and Profile */}
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <Pressable
            onPress={openMap} // Call the openMap function
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <MaterialIcons name="location-on" size={30} color="#fd5c63" />
            <View>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
              <Text>{displayCurrentAddress}</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Profile")}
            style={{ marginLeft: "auto", marginRight: 7 }}
          >
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{
                uri: "https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg",
              }}
            />
          </Pressable>
        </View>

        {/* Search Bar */}
        <View
          style={{
            padding: 10,
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 0.8,
            borderColor: "#C0C0C0",
            borderRadius: 7,
          }}
        >
          <TextInput
            placeholder="Search for items or More"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <Pressable
            onPress={handleSearch}
            style={{ paddingHorizontal: 8, paddingVertical: 4 }}
          >
            <Feather name="search" size={24} color="#fd5c63" />
          </Pressable>
        </View>
        {/* Render filtered products */}
        {/* {filteredProducts.map((item, index) => (
        <DressItem item={item} key={index} />
      ))} */}

        {/* Image Carousel */}
        <Carousel />

        {/* Services Component */}
        <Services />

        {/* Render all the Products */}
        {/* {product.map((item,index)=>(
                <DressItem item={item} key={index} />
                ))
             } */}
        {/* Render products based on search or all products */}
        {searchQuery
          ? // Display filtered products when a search query is entered
            filteredProducts.map((item, index) => (
              <DressItem
                item={item}
                key={index}
                setFilteredProducts={setFilteredProducts}
              />
            ))
          : // Display all products when there's no search query
            product.map((item, index) => (
              <DressItem
                item={item}
                key={index}
                setFilteredProducts={setFilteredProducts}
              />
            ))}
      </ScrollView>

      {!!cart.length && (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            padding: 10,
            marginBottom: 40,
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              {" "}
              {cart.length} items | $ {total}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: "white",
                marginVertical: 6,
              }}
            >
              extra charges might apply
            </Text>
          </View>

          <Pressable onPress={() => navigation.navigate("PickUp")}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              Proceed to pickup
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

const arr = [
  {
    id: "16",
    image:
      "https://res.cloudinary.com/dysq7pufd/image/upload/v1701364260/dressItem/293241_posafv.png",
    name: "Sleeveless",
    price: 10,
    quantity: 0,
  },
  {
    id: "12",
    image:
      "https://res.cloudinary.com/dysq7pufd/image/upload/v1701364386/dressItem/9609161_rzagic.png",
    name: "dresses",
    price: 15,
    quantity: 0,
  },
  {
    id: "0",
    image:
      "https://res.cloudinary.com/dysq7pufd/image/upload/v1701364466/dressItem/4643574_x0tmdm.png",
    name: "shirt",
    price: 12,
    quantity: 0,
  },
  {
    id: "11",
    image:
      "https://res.cloudinary.com/dysq7pufd/image/upload/v1701364495/dressItem/892458_bhrrvb.png",
    name: "T-shirt",
    price: 15,
    quantity: 0,
  },
  {
    id: "14",
    image:
      "https://res.cloudinary.com/dysq7pufd/image/upload/v1701364532/dressItem/9431166_t1jntu.png",
    name: "Sweater",
    price: 20,
    quantity: 0,
  },
  {
    id: "13",
    image:
      "https://res.cloudinary.com/dysq7pufd/image/upload/v1701364568/dressItem/599388_gmopao.png",
    name: "jeans",
    price: 25,
    quantity: 0,
  },
  {
    id: "15",
    image:
      "https://res.cloudinary.com/dysq7pufd/image/upload/v1701364596/dressItem/3345397_h2bbt4.png",
    name: "shorts",
    price: 10,
    quantity: 0,
  },
];
