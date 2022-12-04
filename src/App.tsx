import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddTownForm from './components/AddTownForm';
import CardList from './components/CardList';
import { cityData, fetchWeather } from './redux/slices/city';
import { AppDispatch } from './redux/store';

const App: React.FC = () => {
  const { citySearch, localStorageData, data } = useSelector(cityData);
  const dispatch = useDispatch<AppDispatch>();

  const getWeather = async () => {
    const lowerCaseCities = localStorageData.map(item => item.toLowerCase());
    return lowerCaseCities.includes(citySearch.toLowerCase()) ? '' : citySearch && dispatch(fetchWeather(citySearch))
  }

  function getLocalStorage<T>(key: string, defaultValue: T | null = null): T | null {
    const store = localStorage.getItem(key);
    if (typeof store === 'string') {
      try {
        return JSON.parse(store) as T | null;
      } catch (e) {
        return null;
      }
    }
    return defaultValue;
  }

  React.useEffect(() => {
    const cityParsed = getLocalStorage<string[]>('cities');
    if (cityParsed && data.length === 0) {
      cityParsed.forEach(item => dispatch(fetchWeather(item)));
    }
  }, [])

  React.useEffect(() => {
    getWeather();
  }, [citySearch])

  React.useEffect(() => {
    localStorage.setItem('cities', JSON.stringify(localStorageData));
  }, [localStorageData])

  return <div className="App">
    <AddTownForm />
    <CardList />
  </div>;
};

export default App;