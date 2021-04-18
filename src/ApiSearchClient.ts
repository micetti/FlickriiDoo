import axios from 'axios';
import {Alert} from 'react-native';
import reactotron from 'reactotron-react-native';
import {ImageSearchData, ImageSearchInfo, ImageSearchPhoto} from './ApiTypes';
import {persistSearch} from './AsyncStorageHelpers';

const FLICKR_URL = 'https://api.flickr.com/services/';
const searchRequest = async (text: string, page: string) => {
  try {
    const response = await axios.get(
      `${FLICKR_URL}rest/?method=flickr.photos.search&api_key=37ad288835e4c64fc0cb8af3f3a1a65d&format=json&nojsoncallback=1&safe_search=1&text=${text}&page=${page}&per_page=30`,
    );
    return response.data as ImageSearchData;
  } catch (error) {
    Alert.alert(
      'Network error',
      'Something went wrong Searching for picture. Please check your network connection or try again later',
    );
  }
};

export const searchForText = (
  text: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setSearchResultInfo: React.Dispatch<
    React.SetStateAction<ImageSearchInfo | undefined>
  >,
  setSearchResultPhotos: React.Dispatch<
    React.SetStateAction<ImageSearchPhoto[]>
  >,
) => {
  setIsLoading(true);
  searchRequest(text, '1')
    .then(data => {
      setSearchResultInfo(data?.photos);
      const photoArray = data?.photos.photo ?? [];
      setSearchResultPhotos(photoArray);
      let imageUrl = '';
      if (photoArray.length > 0) {
        const {farm, server, id, secret} = photoArray[0];
        imageUrl = `https://farm${farm}.static.flickr.com/${server}/${id}_${secret}.jpg`;
      }
      persistSearch({
        searchTerm: text,
        imageUrl,
      });
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export const fetchNextPage = (
  text: string,
  page: number,
  setIsLoadingMore: React.Dispatch<React.SetStateAction<boolean>>,
  setSearchResultInfo: React.Dispatch<
    React.SetStateAction<ImageSearchInfo | undefined>
  >,
  setSearchResultPhotos: React.Dispatch<
    React.SetStateAction<ImageSearchPhoto[]>
  >,
) => {
  setIsLoadingMore(true);
  searchRequest(text, `${page}`)
    .then(data => {
      setSearchResultInfo(data?.photos);
      const photoArray = data?.photos.photo ?? [];
      setSearchResultPhotos(previousPhotos => [
        ...previousPhotos,
        ...photoArray,
      ]);
    })
    .finally(() => {
      setIsLoadingMore(false);
    });
};
