import React, {useEffect} from 'react';
import {useWindowDimensions, View} from 'react-native';
import {Card, Paragraph, Subheading, useTheme} from 'react-native-paper';
import {ImageSearchPhoto} from './ApiTypes';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

export const ImageTile = (props: {info: ImageSearchPhoto}) => {
  const dimensions = useWindowDimensions();
  const paperTheme = useTheme();
  const {farm, server, id, secret} = props.info;
  return (
    <View style={{flexDirection: 'row'}}>
      <Card style={{margin: paperTheme.spacing.m, overflow: 'hidden'}}>
        <Image
          source={{
            uri: `https://farm${farm}.static.flickr.com/${server}/${id}_${secret}.jpg`,
          }}
          indicator={ProgressBar}
          style={{
            width: dimensions.width * 0.66,
            height: dimensions.width * 0.66,
          }}
        />
      </Card>
      <View
        style={{
          flex: 1,
          marginRight: paperTheme.spacing.m,
          justifyContent: 'flex-end',
          paddingBottom: paperTheme.spacing.l,
        }}>
        <Paragraph>{props.info.title}</Paragraph>
      </View>
    </View>
  );
};
