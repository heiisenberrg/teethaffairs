import React from 'react';
import { FlatList } from 'react-native';

function  SnapCarousel(props) {
  const {
    data,
    snapToInterval,
    style,
    onViewableItemsChanged,
    renderItem,
    visibilityPercentage
  } = props;
  return (
    <FlatList
      data={ data }
      decelerationRate="fast"
      horizontal={ true }
      pagingEnabled={ false }
      showsHorizontalScrollIndicator={ false }
      snapToInterval={ snapToInterval }
      snapToAlignment="center"
      contentContainerStyle={ style }
      onViewableItemsChanged={ onViewableItemsChanged }
      viewabilityConfig={ {
        itemVisiblePercentThreshold: visibilityPercentage
      } }
      keyExtractor={ item => item.companyName }
      renderItem={ renderItem }
    />
  );
}

export default SnapCarousel;