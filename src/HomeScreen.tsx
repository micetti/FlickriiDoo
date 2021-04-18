import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Keyboard,
  Text,
  View,
} from 'react-native';
import {Appbar, Button, Searchbar, useTheme} from 'react-native-paper';
import {ImageSearchInfo, ImageSearchPhoto} from './ApiTypes';
import {ImageTile} from './ImageTile';
import {PreviousSearches} from './PreviousSearches';
import {theme} from '../App';
import {fetchNextPage, searchForText} from './ApiSearchClient';

export const HomeScreen = () => {
  const paperTheme = useTheme();
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchResultInfo, setSearchResultInfo] = useState<
    ImageSearchInfo | undefined
  >(undefined);
  const [searchResultPhotos, setSearchResultPhotos] = useState<
    ImageSearchPhoto[]
  >([]);

  const search = (text: string) => {
    Keyboard.dismiss();
    searchForText(
      text,
      setIsLoading,
      setSearchResultInfo,
      setSearchResultPhotos,
    );
  };

  const fetchNext = (text: string) => {
    const page = searchResultInfo ? searchResultInfo.page + 1 : 1;
    fetchNextPage(
      text,
      page,
      setIsLoadingMore,
      setSearchResultInfo,
      setSearchResultPhotos,
    );
  };

  useEffect(() => {
    if (!searchText) {
      setSearchResultInfo(undefined);
      setSearchResultPhotos([]);
    }
  }, [searchText]);

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
              setSearchText(text);
            }}
            onSubmitEditing={event => search(event.nativeEvent.text)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            loading={isLoading}
            onPress={() => search(searchText)}
            mode="contained">
            {'Search'}
          </Button>
        </View>
      </View>
      {searchResultInfo?.total && (
        <Text style={styles.numberOfResults}>
          {`found ${searchResultInfo?.total} results matching your search`}
        </Text>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        keyExtractor={item => item.id}
        data={searchResultPhotos}
        renderItem={({item}) => <ImageTile info={item} />}
        ListEmptyComponent={() => (
          <PreviousSearches
            onPress={(text: string) => {
              setSearchText(text);
              search(text);
            }}
          />
        )}
        onEndReached={() => fetchNext(searchText)}
        windowSize={3}
        initialNumToRender={3}
      />
      {isLoadingMore && (
        <ActivityIndicator style={styles.activityIndicator} size="large" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  numberOfResults: {
    paddingLeft: theme.spacing.m,
    paddingBottom: theme.spacing.m,
  },
  activityIndicator: {paddingBottom: theme.spacing.xl},
  buttonContainer: {
    justifyContent: 'center',
    paddingRight: theme.spacing.m,
  },
});
