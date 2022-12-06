import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Button, Card } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cityData, fetchWeather, setData, setLoaded } from '../redux/slices/city';
import { AppDispatch } from '../redux/store';
import { CircularProgress, Alert } from '@mui/material';

type cityWeatherClouds = { all: number };
type cityWeatherCoord = { lon: number; lat: number };
type cityWeatherMain = {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_max: number;
  temp_min: number;
};
type cityWeatherSys = { country: string; sunrise: number; sunset: number };
type cityWeatherForecast = { id: number; main: string; description: string; icon: string };
type cityWeatherWind = { speed: number; deg: number; gust: number };

interface cityWeather {
  base: string;
  clouds: cityWeatherClouds;
  cod: number;
  coord: cityWeatherCoord;
  dt: number;
  id: number;
  main: cityWeatherMain;
  name: string;
  sys: cityWeatherSys;
  timezone: number;
  visibility: number;
  weather: cityWeatherForecast[];
  wind: cityWeatherWind;
}
const CityCard: React.FC<cityWeather> = ({ main, name, weather }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector(cityData);

  const onDeleteButton = () => {
    const updatedData = data.filter((item) => item.name !== name);
    dispatch(setData(updatedData));
    const updatedLSData = updatedData.map((item) => item.name);
    localStorage.clear();
    localStorage.setItem('cities', JSON.stringify(updatedLSData));
  };

  const getData = async () => {
    dispatch(fetchWeather(name));
  };
  const onUpdateButton = () => {
    getData();
  };

  return (
    <>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '400px',
          marginBottom: '40px',
          borderRadius: '20px',
        }}>
        <CloseIcon
          sx={{
            marginLeft: 'auto',
            padding: '10px 15px',
            cursor: 'pointer',
            fontSize: 40,
            color: '#c00',
          }}
          onClick={() => onDeleteButton()}
        />
        <h1>{name}</h1>
        <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} />
        <p style={{ fontSize: '24px' }}>{Math.ceil(main.temp)} °C</p>
        <p style={{ fontSize: '24px' }}>{weather[0].description}</p>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            paddingBottom: '20px',
          }}>
          <RefreshIcon
            sx={{ cursor: 'pointer', fontSize: 40, color: '#1976d2' }}
            onClick={() => onUpdateButton()}
          />
          <Link to={`/detailed/${name}`}>
            <Button variant="outlined">Details</Button>
          </Link>
        </Box>
      </Card>
    </>
  );
};

export default CityCard;
