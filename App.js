import React from 'react';
import { View, StyleSheet, StatusBar, Text } from 'react-native';
import HomeScreen from './src/components/homeScreen';
import NavBar from './src/components/NavBar';
import { Container } from 'native-base';
import firebase from './dbconfig'
import data from './src/delivery/deliveryData'
import pickUpData from './src/pickup/pickup'

class MyApp extends React.Component {

  componentDidMount() {
    let i = 0;
    for (i = 0; i < data.length; i++) {
      firebase.database().ref('delivery/' + (data[i].deliveryId)).set(data[i]).then(() => {
        //console.log('Delivery Data Inserted');
      }
      ).catch((error) => {
        //console.log('Error')
      });
    }
    for (i = 0; i < pickUpData.length; i++) {
      firebase.database().ref('pickup/' + (pickUpData[i].pickUpId)).set(pickUpData[i]).then(() => {
        //console.log('PickUp Data Inserted');
      }
      ).catch((error) => {
        //console.log('Error')
      });
    }
  }

  render() {
    return (
      <Container style={styles.parent}>
        <StatusBar backgroundColor="#4E0D3A" />
        <View style={styles.childOne}><NavBar /></View>
        <View style={styles.childTwo}><HomeScreen /></View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 12,
    flexDirection: "column",
  },
  childOne: {
    flex: 1,
  },
  childTwo: {
    flex: 8
  }
});

export default MyApp;
