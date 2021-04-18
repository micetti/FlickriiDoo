import React, {useEffect} from 'react';
import {Image, View} from 'react-native';

import {ImageSearchPhoto} from './ApiTypes';

export const ImageTile = (props: {info: ImageSearchPhoto}) => {
  const {farm, server, id, secret} = props.info;
  return (
    <View style={{width: 200, height: 200}}>
      <Image
        source={{
          uri: `https://farm${farm}.static.flickr.com/${server}/${id}_${secret}.jpg`,
        }}
        style={{width: 100, height: 100}}
      />
    </View>
  );
};
