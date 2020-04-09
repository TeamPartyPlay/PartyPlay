import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

function MaterialIconTextbox3(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Icon name="ios-key" style={styles.iconStyle}></Icon>
      <TextInput placeholder="Password" style={styles.inputStyle}></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center"
  },
  iconStyle: {
    color: "#616161",
    fontSize: 24,
    paddingLeft: 8,
    width: 32,
    height: 24
  },
  inputStyle: {
    flex: 1,
    color: "#000",
    alignSelf: "stretch",
    marginLeft: 16,
    paddingTop: 14,
    paddingRight: 5,
    paddingBottom: 8,
    borderColor: "#D9D5DC",
    borderBottomWidth: 1,
    fontSize: 16,
    lineHeight: 16
  }
});

export default MaterialIconTextbox3;
