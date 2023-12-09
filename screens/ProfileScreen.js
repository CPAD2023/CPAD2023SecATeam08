import { StyleSheet, Text, View,SafeAreaView,Pressable,TextInput, Image, FlatList } from 'react-native'
import React, {useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from "firebase/firestore";

// New OrderItem component
const OrderItem = ({ order }) => (
  <View style={styles.orderItemContainer}>
    <View style={styles.orderItemContent}>
    <Image source={{ uri: order.image }} style={styles.orderItemImage} />
    <View style={styles.orderItemTextContainer}>
    <Text style={styles.orderItemText}>{order.name}</Text>
    <Text style={styles.orderItemText}>Price: ${order.price}</Text>
    <Text style={styles.orderItemText}>Quantity: {order.quantity}</Text>
    <Text style={styles.orderItemText}>
      Total: ${order.price * order.quantity}
    </Text>
    </View>
    </View>
  </View>
);

const ProfileScreen = () => {
    const user = auth.currentUser;
    const navigation = useNavigation();
    const [orders, setOrders] = useState([]);

     async function fetchOrders() {
      try {
        const userUid = auth.currentUser.uid;
        const ref = doc(db, "users", `${userUid}`);
        const user = await getDoc(ref);
        const orders = user.data().orders;
        console.log("Fetched Orders:", orders);
        setOrders(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    // const [newEmail, setNewEmail] = useState('');
    // const [newPhoneNumber, setNewPhoneNumber] = useState('');

    useEffect(function () {
      fetchOrders();
    }, []);
    
    const signOutUser = () => {
        signOut(auth).then(() => {
            navigation.replace("Login");
        }).catch(err => {
            console.log(err);
        })
    }
    const navigateToHome = () => {
      navigation.navigate("Home");
  }
    // const updateProfile = () => {
    //     if (newEmail) {
    //       user
    //         .updateEmail(newEmail)
    //         .then(() => {
    //           console.log('Email updated successfully');
    //           // You may want to clear the input field or perform other actions here.
    //         })
    //         .catch((error) => {
    //           console.log('Error updating email:', error);
    //         });
    //     }
    
    //     if (newPhoneNumber) {
    //         user
    //           .updatePhoneNumber(newPhoneNumber)
    //           .then(() => {
    //             console.log('Phone number updated successfully');
    //             // You may want to clear the input field or perform other actions here.
    //           })
    //           .catch((error) => {
    //             console.log('Error updating phone number:', error);
    //           });
    //       }
    //     };
  return (
    <SafeAreaView style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Pressable onPress={navigateToHome}>
      <View style={styles.profilePictureContainer}>
                <Image 
                    source={{ uri: "https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg" }}
                    style={styles.circularProfilePicture}
                />
            </View>
            </Pressable>
      <Pressable style={{marginVertical:10}}>
        <Text>welcome {user.email}</Text>
      </Pressable>
      {/* <TextInput
        placeholder="New Email"
        value={newEmail}
        onChangeText={(text) => setNewEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="New Phone Number"
        value={newPhoneNumber}
        onChangeText={(text) => setNewPhoneNumber(text)}
        style={styles.input}
      />
      <Pressable onPress={updateProfile} style={styles.button}>
        <Text>Update Profile</Text>
      </Pressable> */}

      <Pressable onPress={navigateToHome}>
        <Text style={{ fontSize: 25 }}>🏡</Text>
      </Pressable>
    
      <Pressable onPress={signOutUser}>
          <Text>Sign Out</Text>
      </Pressable>
       <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          marginBottom: 7,
          marginTop: 14,
          paddingRight: 200,
        }}
      >
        Order Details
      </Text>

      <FlatList
        style={styles.orderItem}
        data={orders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <OrderItem order={item} />}
      />
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        margin: 10,
      },
      button: {
        backgroundColor: '#088F8F',
        padding: 10,
        margin: 10,
        borderRadius: 7,
        alignItems: 'center',
      },
      profilePictureContainer: {
        alignItems: "center",
    },
    circularProfilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50, // Make it a circle
    },
    orderItemContainer: {
      borderWidth: 1,
      borderColor: "#ccc",
      paddingLeft: 100,
      paddingRight: 100,
      margin: 10,
      borderRadius: 7,
    },
    orderItemContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    orderItemImage: {
      width: 100,
      height: 100,
      borderRadius: 5,
      marginBottom: 10,
      marginTop: 10,
    },
    orderItemTextContainer: {
      marginLeft: 10,
    },
    orderItemText: {
      fontSize: 16,
      marginBottom: 5,
    },
    orderItem: {},
})
