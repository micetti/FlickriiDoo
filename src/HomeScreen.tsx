import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Keyboard, Text, View} from 'react-native';
import {Appbar, Button, Searchbar, useTheme} from 'react-native-paper';
import axios from 'axios';
import {ImageSearchData, ImageSearchInfo, ImageSearchPhoto} from './ApiTypes';
import {ImageTile} from './ImageTile';
import reactotron from 'reactotron-react-native';

const FLICKR_URL = 'https://api.flickr.com/services/';
const searchRequest = async (text: string) => {
  try {
    const response = await axios.get(
      `${FLICKR_URL}rest/?method=flickr.photos.search&api_key=37ad288835e4c64fc0cb8af3f3a1a65d&format=json&nojsoncallback=1&safe_search=1&text=${text}`,
    );
    return response.data as ImageSearchData;
  } catch (error) {
    reactotron.log && reactotron.log('Error');
  }
};

export const HomeScreen = () => {
  const paperTheme = useTheme();
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResultInfo, setSearchResultInfo] = useState<
    ImageSearchInfo | undefined
  >(undefined);
  const [searchResultPhotos, setSearchResultPhotos] = useState<
    ImageSearchPhoto[]
  >([]);

  const search = () => {
    Keyboard.dismiss();
    setIsLoading(true);
    searchRequest(searchText)
      .then(data => {
        setSearchResultInfo(data?.photos);
        setSearchResultPhotos(data?.photos.photo ?? []);
      })
      .catch(error => {
        reactotron.log('error');
      })
      .finally(() => {
        setIsLoading(false);
      });
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
              setSearchText(text.trim());
            }}
            onSubmitEditing={search}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            paddingRight: paperTheme.spacing.m,
          }}>
          <Button loading={isLoading} onPress={search} mode="contained">
            {'Search'}
          </Button>
        </View>
      </View>
      {searchResultInfo?.total && (
        <Text>{`found ${searchResultInfo?.total} results matching your search`}</Text>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        keyExtractor={item => item.id}
        data={searchResultPhotos}
        renderItem={({item}) => <ImageTile info={item} />}
        // Performance settings
        // removeClippedSubviews={true} // Unmount components when outside of window
        windowSize={3}
        initialNumToRender={3} // Reduce initial render amount
        // maxToRenderPerBatch={1} // Reduce number in each render batch
        // updateCellsBatchingPeriod={100} // Increase time between renders
      />
    </View>
  );
};
