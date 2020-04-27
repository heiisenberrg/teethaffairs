/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text as RNText } from 'react-native';

function Text(props) {
    const { center = false, s = 14, w = '400', lh = 18, c = '#000', style } = props;
    return <RNText style={ { fontSize: s, fontWeight: w, lineHeight: lh, color: c, textAlign: center ? 'center' : 'auto', ...style } }>{props.children}</RNText>;
}

export default Text;