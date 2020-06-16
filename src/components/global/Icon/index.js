import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';

function Icon(props) {
	const { type, name, size = 16, color = 'white' } = props;
	switch (type) {
		case 'FontAwesome':
			return <FontAwesome name={ name } size={ size } color={ color } />;
		case 'Ionicons':
			return <Ionicons name={ name } size={ size } color={ color } />;
		case 'MaterialCommunityIcons':
			return <MaterialCommunityIcons name={ name } size={ size } color={ color } />;
		case 'MaterialIcons':
			return <MaterialIcons name={ name } size={ size } color={ color } />;
		case 'FontAwesome5':
			return <FontAwesome5 name={ name } size={ size } color={ color } />;
		case 'SimpleLineIcon':
			return <SimpleLineIcon name={ name } size={ size } color={ color } />;
		case 'Entypo':
			return <Entypo name={ name } size={ size } color={ color } />;
		default:
			return;
	}
}

export default Icon;
