import React, {Component} from 'react';
import {Text} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import * as _ from 'lodash';

export default class CircularProgress extends Component {
  render() {
    const fill = (this.props.fill / this.props.max) * 100;
    const counter = this.props.fill;
    return (
      <AnimatedCircularProgress size={this.props.size} width={15} backgroundWidth={3} fill={fill} tintColor="#A60A00"
                                tintColorSecondary="#9EFF6D" backgroundColor="#ff0000" arcSweepAngle={240}
                                rotation={240} lineCap="round">
        {
          (fill) => (
            <Text style={{ fontWeight: 'bold' }}>
              {(_.round(counter, 2)).toFixed(2)} V
            </Text>
          )
        }
      </AnimatedCircularProgress>
    );
  }
}
