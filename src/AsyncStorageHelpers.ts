import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const PREVIOUS_SEARCHES_KEY = '@previous_searches';

export interface PreviousSearch {
  searchTerm: string;
  imageUrl: string;
}

export const persistSearch = async (search: PreviousSearch) => {
  try {
    const searchesFromStorage = await getPreviousSearches();
    const indexOfPreviousSearch = searchesFromStorage.findIndex(
      previousSearch => previousSearch.searchTerm === search.searchTerm,
    );
    if (indexOfPreviousSearch > -1) {
      searchesFromStorage.splice(indexOfPreviousSearch, 1);
    }
    const previousSearches = [search, ...searchesFromStorage];
    await AsyncStorage.setItem(
      PREVIOUS_SEARCHES_KEY,
      JSON.stringify(previousSearches.splice(0, 7)),
    );
    return previousSearches;
  } catch (e) {
    Alert.alert(
      'Something went wrong',
      'There was an unexpected bug saving the previous searches. Please conatct the developer',
    );
  }
};

export const getPreviousSearches = async () => {
  const jsonValue = await AsyncStorage.getItem(PREVIOUS_SEARCHES_KEY);
  return jsonValue != null ? (JSON.parse(jsonValue) as PreviousSearch[]) : [];
};
