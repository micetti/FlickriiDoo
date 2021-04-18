import React, {useEffect, useState} from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import {Card, Subheading, useTheme} from 'react-native-paper';

import {getPreviousSearches, PreviousSearch} from './AsyncStorageHelpers';

export const PreviousSearches = (props: {onPress: (text: string) => void}) => {
  const [previousSearches, setPreviousSearches] = useState<PreviousSearch[]>(
    [],
  );
  useEffect(() => {
    const get = async () => {
      const previousFromStorage = await getPreviousSearches();
      setPreviousSearches(previousFromStorage);
    };
    get();
  }, []);

  const paperTheme = useTheme();
  return (
    <Card style={{margin: paperTheme.spacing.m}}>
      <Card.Title title={'Previous searches'} />
      <Card.Content>
        {previousSearches.map(search => (
          <TouchableOpacity
            onPress={() => props.onPress(search.searchTerm)}
            style={{flexDirection: 'row'}}>
            <View style={{padding: paperTheme.spacing.m}}>
              <Image
                source={{
                  uri: search.imageUrl,
                }}
                style={{width: 50, height: 50}}
              />
            </View>
            <View style={{justifyContent: 'center'}}>
              <Subheading>{search.searchTerm}</Subheading>
            </View>
          </TouchableOpacity>
        ))}
      </Card.Content>
    </Card>
  );
};
