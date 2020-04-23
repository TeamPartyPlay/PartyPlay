import React, { Component, FC } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface IMaterialTextBox {
    [style: string]: any;
    icon: string;
    placeholder: string;
    onChangeText: (text: string) => void,
}

const MaterialIconTextBox: FC<IMaterialTextBox> = props => {
    return (
        <View style={[styles.container, props.style]}>
          <Icon name="ios-key" style={styles.iconStyle}></Icon>
          <TextInput placeholder="Password" style={styles.inputStyle} onChangeText={props.onChangeText}></TextInput>
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

export default MaterialIconTextBox;