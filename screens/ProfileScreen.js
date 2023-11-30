import { StyleSheet, Text, View,SafeAreaView,Pressable,TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const user = auth.currentUser;
    const navigation = useNavigation();
    // const [newEmail, setNewEmail] = useState('');
    // const [newPhoneNumber, setNewPhoneNumber] = useState('');
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
      <Pressable onPress={signOutUser}>
          <Text>Sign Out</Text>
      </Pressable>
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
})