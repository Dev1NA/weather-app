import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  cityWeather,
  fetchDetailedWeather,
  fetchHourlyWeather,
  hourlyWeather,
} from '../redux/slices/city';
import { AppDispatch } from '../redux/store';
import { Box, Typography, Button, CircularProgress } from '@mui/material';

const WeatherDetailed: React.FC = () => {
  const { id } = useParams();
  const [detailedWeather, setDetailedWeather] = React.useState<cityWeather>();
  const [hourlyWeather, setHourlyWeather] = React.useState<hourlyWeather>();
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const getDetailedWeather = async () => {
    try {
      await dispatch(fetchDetailedWeather(id!))
        .then(unwrapResult)
        .then((res) => {
          setDetailedWeather(res);
          setLoading(false);
        });
    } catch {
      console.log('Error happened!');
    }
  };
  const getHourlyWeather = async () => {
    try {
      await dispatch(fetchHourlyWeather(id!))
        .then(unwrapResult)
        .then((res) => {
          setHourlyWeather(res);
        });
    } catch {
      console.log('Error happened!');
    }
  };

  type colors = { [key: string]: string };

  const colors: colors = {
    one: '#1E90FF',
    two: '#00BFFF',
    three: '#87CEFA',
    four: '#87CEEB',
    five: '#FFFFE0',
    six: '#FFFACD',
    seven: '#FF8C00	',
    eight: '#FF4500',
  };
  const tempValue = (temp: number) => {
    if (temp <= -30) return 'one';
    if (temp < -20 && temp > -30) return 'two';
    if (temp < -10 && temp > -20) return 'three';
    if (temp <= 0 && temp > -10) return 'four';
    if (temp > 0 && temp < 10) return 'five';
    if (temp >= 10 && temp < 20) return 'six';
    if (temp > 20 && temp < 30) return 'seven';
    if (temp >= 30) return 'eight';
  };
  const getDirection = (angle: number) => {
    let directions = [
      'North',
      'North-East',
      'East',
      'South-East',
      'South',
      'South-West',
      'West',
      'North-West',
    ];
    let index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
    return directions[index];
  };

  const unique = (arr: number[]) => {
    let result: number[] = [];

    for (let elem of arr) {
      if (!result.includes(elem)) {
        result.push(elem);
      }
    }

    return result;
  };
  const temperaturas: number[] = [];
  hourlyWeather &&
    hourlyWeather.list.map((item) => {
      temperaturas.push(Math.round(item.main.temp));
    });
  React.useEffect(() => {
    getDetailedWeather();
    getHourlyWeather();
  }, [loading]);
  return (
    <>
      {loading && (
        <Box
          sx={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CircularProgress disableShrink />
        </Box>
      )}
      {!loading && (
        <Box
          sx={{
            width: '900px',
            boxShadow: '0px 0px 10px grey',
            padding: '20px 20px',
            margin: '50px auto',
            backgroundColor: '#4682B4',
            borderRadius: '50px',
            color: 'white',
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
                  maxWidth: '300px',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '0 auto',
                }}>
                <img
                  src={`http://openweathermap.org/img/wn/${detailedWeather?.weather[0].icon}@2x.png`}
                  alt=""
                />
                <Typography
                  sx={{
                    fontSize: '36px',
                  }}>
                  {detailedWeather ? Math.ceil(detailedWeather?.main.temp) : ''} °C
                </Typography>
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
                <Typography>
                  Feels like: {detailedWeather && Math.ceil(detailedWeather?.main.feels_like)} °C
                </Typography>
              </Box>
            </Box>
            <Typography
              sx={{
                fontSize: '28px',
                marginTop: '20px',
              }}>
              {detailedWeather?.weather[0].description}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
            }}>
            <Box>
              <p>Wind</p>
              {detailedWeather?.wind.deg !== undefined && (
                <p>Direction: {getDirection(detailedWeather?.wind.deg)}</p>
              )}
              {detailedWeather?.wind.gust && <p>Gust: {Math.round(detailedWeather?.wind.gust)} m/s</p>}
              {detailedWeather?.wind.speed && <p>Speed: {Math.round(detailedWeather?.wind.speed)} m/s</p>}
            </Box>
            <Box>
              <p>Humidity: {detailedWeather?.main.humidity} %</p>
              <p>Preesure: {detailedWeather?.main.pressure} hPa</p>
              {detailedWeather?.main.sea_level && (
                <p>Sea level: {detailedWeather?.main.sea_level} hPa</p>
              )}
              {detailedWeather?.main.grnd_level && (
                <p>Ground level: {detailedWeather?.main.grnd_level} hPa</p>
              )}
              <p>Visibility: {detailedWeather?.visibility} m.</p>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '40px 0',
              marginBottom: '70px',
              color: 'black',
            }}>
            {hourlyWeather &&
              unique(temperaturas)
                .reverse()
                .map((item) => {
                  return (
                    <Box
                      key={item}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: `${item}px`,
                        width: '50px',
                        height: '30px',
                        backgroundColor: `${colors[tempValue(item)!]}`,
                      }}>
                      {Math.round(item) > 0 ? '+' + Math.round(item) : Math.round(item)}
                    </Box>
                  );
                })}
          </Box>

          <Link to={'/'}>
            <Button
              variant="contained"
              sx={{
                cursor: 'pointer',
                marginBottom: '30px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px auto',
              }}>
              Go back
            </Button>
          </Link>
        </Box>
      )}
    </>
  );
};

export default WeatherDetailed;
