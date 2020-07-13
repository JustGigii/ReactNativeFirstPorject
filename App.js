import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ImageBackgroundBase, ScrollView, FlatList, Modal } from 'react-native';
import * as Firebase from 'firebase';
import GridView from './Components/Manngment/GridView';
import Login from './Components/Login/LogIn';



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
    };
    // Initialize firebase...
    if (!Firebase.apps.length) {
      Firebase.initializeApp({
        apiKey: "AIzaSyA5sJ0YcMpegWpAI8wOIySho7QPmvFtlZ4",
        authDomain: "fir-project-50920.firebaseapp.com",
        databaseURL: "https://fir-project-50920.firebaseio.com",
        projectId: "fir-project-50920",
        storageBucket: "fir-project-50920.appspot.com",
        messagingSenderId: "952617990179",
        appId: "1:952617990179:web:bcc8eeea9a89a93f6c5996",
        measurementId: "G-MCTKPJJZNY"
      });
    }

  }
  onAuthStateChanged = (Value) => {
    this.setState({ isLoadingComplete: Value });
  }
  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <Login onAuthStateChanged={this.onAuthStateChanged} />
      );
    }
    else
      return (
        <GridView />
      );

  }
}


const styles = StyleSheet.create({
  ViewPage:
  {
    padding: 10
  }

});

