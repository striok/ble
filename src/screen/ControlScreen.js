import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class ControlScreen extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <View style={styles.body}>
        <Text>Control Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
