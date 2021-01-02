import React from 'react';
import {Image, Dimensions} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

export default function ZoomImg() {
    const [scrollable, setScrollable] = useState(true);
  console.log('aqui las props');
  console.log(props);
  const {photoUrl, height, width} = props;
  console.log(photoUrl);

  const handlePageZoom = ({type, scale}) => {
    if (scale !== 1) {
      setScrollable(false);
    } else if (scale === 1) {
      setScrollable(true);
    }
  };
  const handleDoubleClick = () => {
    console.log('doubleclick');
    setScrollable(!scrollable);
  };
    return (
      <ImageZoom
        cropWidth={width}
        cropHeight={height}
        imageWidth={500}
        imageHeight={200}
        onMove={handlePageZoom}
        onDoubleClick={handleDoubleClick}>
        <Image source={{uri: item}}    style={{width: 200, height: 200}} />
      </ImageZoom>
    );
  };
}
