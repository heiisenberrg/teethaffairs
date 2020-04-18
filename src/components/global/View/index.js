import React from 'react';
import { View as RNView } from 'react-native';

function View(props) {
    const { center = false, row = false, jC = '', aI = '', style } = props;
    const flexDirection = row ? 'row' : 'column';
    const justifyContent = jC !== '' ? jC : center ? 'center' : undefined;
    const alignItems =  aI !== '' ? aI : center ? 'center' : undefined; 
    return <RNView style={ { flexDirection, justifyContent, alignItems, ...style } }>{props.children}</RNView>;
}

export default View;