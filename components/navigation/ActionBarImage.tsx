import React, { Component } from 'react';

import { StyleSheet, View, Text, Image } from 'react-native';

export default class ActionBarImage extends Component {
  render() {
    return (
      <View style={{height: 50}}>
        <Image
          source={require("../../assets/partyPlayLogo.png")}
          style={{
            width: 50,
            height: 50,
            // marginLeft: 15,
            // marginBottom: 15,
          }}
        />
      </View>
    );
  }
}