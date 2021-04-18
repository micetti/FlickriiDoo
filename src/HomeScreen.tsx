import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Appbar, Button, Searchbar, useTheme} from 'react-native-paper';

export const HomeScreen = () => {
  const paperTheme = useTheme();
  const [searchText, setSearchText] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: paperTheme.colors.background}}>
      <Appbar.Header>
        <Appbar.Content title="FlickriiDoo Image Search" />
      </Appbar.Header>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Searchbar
            testID={'SearchScreenSearchbar'}
            style={{margin: 8}}
            value={searchText}
            onChangeText={text => {
              setSearchText(text.trim());
            }}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            paddingRight: paperTheme.spacing.m,
          }}>
          <Button mode="contained">{'Search'}</Button>
        </View>
      </View>
    </View>
  );
};
