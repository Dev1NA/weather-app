import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';

interface citySlice {
  citySearch: string;
  data: cityWeather[];
  error: string;
  localStorageData: string[];
  cities: string[];
}

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

const initialState: citySlice = {
  citySearch: '',
  data: [],
  error: '',
  localStorageData: [],
  cities: [],
};

export const fetchWeather = createAsyncThunk(
  'cities/fetchCityStatus',
  async (citySearch: string) => {
    const { data } = await axios.get<cityWeather>(
      `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${process.env.REACT_APP_API_KEY}`,
    );
    return data;
  },
);
const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setCitySearch(state, action: PayloadAction<string>) {
      state.citySearch = action.payload;
    },
    setLocalStorageData(state, action: PayloadAction<string[]>) {
      state.localStorageData.push(...action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.pending, (state) => {});
    builder.addCase(fetchWeather.fulfilled, (state, action: PayloadAction<cityWeather>) => {
      state.data.push(action.payload);
      state.localStorageData.push(action.payload.name);
    });
    builder.addCase(fetchWeather.rejected, (state) => {
      state.error = `Error happened, maybe such city is not exist.`;
    });
  },
});

export const { setCitySearch, setLocalStorageData } = citySlice.actions;
export const cityData = (state: RootState) => state.city;
export default citySlice.reducer;
