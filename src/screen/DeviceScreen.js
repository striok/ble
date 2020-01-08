import React, {Component} from 'react';
import {View, Text, Platform, FlatList, TouchableHighlight, Button, StyleSheet, Alert} from 'react-native';
import {BleManager} from 'react-native-ble-plx';
import * as _ from 'lodash';

export default class DeviceScreen extends Component {
  constructor() {
    super();
    this.manager = new BleManager();
    this.state = {
      devices: [],
      selectedItem: null,
      isConnected: false,
      isSelected: false,
      refreshing: false,
      allowedRefresh: true,
    };
  }

  componentDidMount(): void {
    if (Platform.OS === 'ios') {
      this.manager.onStateChange(state => {
        if (state === 'PoweredOn') {
          this._scanDevices();
        }
      });
    } else {
      this._scanDevices();
    }
  }

  _showAlert = (error) => {
    Alert.alert(
        'Błąd',
        error.toString()
    );
  }

  _scanDevices() {
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        this._showAlert(error);
        return;
      }
      if (device && device.name && device.id && !_.find(this.state.devices, { id: device.id })) {
        this.setState(prevState => ({
          refreshing: false,
          devices: [...prevState.devices, device],
        }));
      }
    });
  }

  _connectWithDevice() {
    this.setState({ isConnected: true, refreshing: false, allowedRefresh: false });
    // TODO Tx and Rx data here
  }

  _disconnected() {
    this.setState({ isConnected: false, allowedRefresh: true, selectedItem: null, isSelected: false });
    this._scanDevices();
  }

  _selectDevice(selectedItem) {
    this.setState({ selectedItem, isSelected: true });
  }

  _renderList = ({ item }) => {
    const isSelected = (this.state.selectedItem && this.state.selectedItem.id === item.id);

    const backgroundColor = isSelected ? '#000000' : '#ffffff';
    const fontWeight = isSelected ? 'bold' : 'normal';

    return (
      <TouchableHighlight onPress={() => this._selectDevice(item)} underlayColor={'#ffffff'}>
        <View style={{ padding: 10, flexDirection: 'row' }}>
          <View style={{ backgroundColor, width: 5, height: 25 }} />
          <Text style={{ marginLeft: 10, fontSize: 20, fontWeight }}>{item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Urządzenia</Text>
        <FlatList style={{ marginTop: 20, flex: 1 }} data={this.state.devices} renderItem={this._renderList}
                  keyExtractor={(item, index) => `item-${index}`}
                  onRefresh={() => this.state.allowedRefresh && this._scanDevices()} refreshing={this.state.refreshing}/>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <Button title="Połącz" onPress={() => this._connectWithDevice()}
                    disabled={this.state.isConnected || !this.state.isSelected}/>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Rozłącz" disabled={!this.state.isConnected} onPress={() => this._disconnected()}/>
          </View>
        </View>
        <View>
          <Text>Wybrano - {this.state.selectedItem && this.state.selectedItem.id && this.state.selectedItem.id}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    padding: 5,
  },
});
