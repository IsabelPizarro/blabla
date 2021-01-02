import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {Image} from 'react-native-elements';

const CarouselImages = props => {
  console.log('aqui las props');
  const {photoUrl, height, width} = props;
  // console.log(photoUrl);

  const renderItem = ({item}) => {
    return <Image source={{uri: item}} style={{height, width}} />;
  };

  return (
    <Carousel
      layout={'default'}
      data={photoUrl}
      renderItem={renderItem}
      sliderWidth={width}
      itemWidth={width}
    />
  );
};
export default CarouselImages;
