import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import DeviceScreen from './src/screen/DeviceScreen';
import ControlScreen from './src/screen/ControlScreen';

const TabNavigator = createBottomTabNavigator({
  Devices: DeviceScreen,
  Control: ControlScreen,
});

export default createAppContainer(TabNavigator);
