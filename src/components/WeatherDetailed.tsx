import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { cityWeather, fetchDetailedWeather } from '../redux/slices/city';
import { AppDispatch } from '../redux/store';
import { Box, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const WeatherDetailed: React.FC = () => {
  const { id } = useParams();
  const [detailedWeather, setDetailedWeather] = React.useState<cityWeather>();
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const getDetailedWeather = async () => {
    try {
     await dispatch(fetchDetailedWeather(id!))
      .then(unwrapResult)
      .then((res) => {
        console.log(res);
        setDetailedWeather(res);
        setLoading(false);
      });
    }
    catch {
      console.log('Error happened!');
    }
  };


  React.useEffect(() => {
    getDetailedWeather();

  }, [loading]);
  return (
    <>
      {!loading &&
      <Box
        sx={{
          width: '1100px',
          margin: '0 auto',
          boxShadow: '0px 0px 10px grey',
          padding: '20px 20px',
          marginTop: '50px',
          backgroundColor: 'white',
        }}>
        <Box
          sx={{
            textAlign: 'center',
            marginBottom: '50px',
          }}>
          <h1>{detailedWeather?.name}</h1>
          <Box>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                maxWidth: '400px',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '0 auto',
              }}>
              <img
                src={`http://openweathermap.org/img/wn/${detailedWeather?.weather[0].icon}@4x.png`}
                alt=""
              />
              <Typography sx={{
                fontSize: '48px',
              }}>{detailedWeather ? Math.ceil(detailedWeather?.main.temp) : ''} °C</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                maxWidth: '300px',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '0 auto',
              }}>
              <p>
                {detailedWeather ? Math.ceil(detailedWeather?.main.temp_max) : ''} °C /{' '}
                {detailedWeather ? Math.ceil(detailedWeather?.main.temp_min) : ''} °C
              </p>
              <Typography>Feels like: {detailedWeather && Math.ceil(detailedWeather?.main.feels_like)} °C</Typography>
            </Box>
          </Box>
          <Typography sx={{
            fontSize: '36px',
            marginTop: '20px',
          }}>{detailedWeather?.weather[0].description}</Typography>
        </Box>
        <div>
          <div>
            Wind:
            {detailedWeather?.wind.deg && <p>Degree: {detailedWeather?.wind.deg} deg</p>}
            {detailedWeather?.wind.gust && <p>Gust: {detailedWeather?.wind.gust} m/s</p>}
            {detailedWeather?.wind.speed && <p>Speed: {detailedWeather?.wind.speed} m.</p>}
          </div>
          <p>Humidity: {detailedWeather?.main.humidity} %</p>
          <p>Preesure: {detailedWeather?.main.pressure} hPa</p>
          {detailedWeather?.main.sea_level && <p>Sea level: {detailedWeather?.main.sea_level} hPa</p>}
          {detailedWeather?.main.grnd_level && (
            <p>Ground level: {detailedWeather?.main.grnd_level} hPa</p>
          )}
          <p>Visibility: {detailedWeather?.visibility} m.</p>
          <p></p>
          <Link to={'/'}>
            <ArrowBackIosIcon sx={{
              cursor: 'pointer',
              marginTop: '50px',
            }} />
          </Link>
        </div>
      </Box>
    }
    </>
  );
};

export default WeatherDetailed;
