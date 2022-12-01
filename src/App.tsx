import React from 'react';
import AddTownForm from './components/AddTownForm';
import { useDispatch, useSelector } from 'react-redux';
import { cityData, fetchWeather } from './redux/slices/city';
import { AppDispatch, useAppDispatch } from './redux/store';
const App: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { citySearch, error } = useSelector(cityData);
  const getWeather = async () => {
    dispatch(fetchWeather(citySearch));
  }
  React.useEffect(() => {
    getWeather();
  }, [citySearch])

  return <div className="App">
    <AddTownForm />
  </div>;
};

export default App;