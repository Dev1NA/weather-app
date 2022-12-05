import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';

interface citySlice {
  citySearch: string;
  data: cityWeather[];
  error: string;
  localStorageData: string[];
  cities: string[];
  detailed: cityWeather;
  loaded: boolean;
  updated: boolean;
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

export interface cityWeather {
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
  loaded: false,
  updated: false,
  localStorageData: [],
  cities: [],
  detailed: {
    base: '',
    clouds: { all: 0 },
    cod: 0,
    coord: { lon: 0, lat: 0 },
    dt: 0,
    id: 0,
    main: {
      feels_like: 0,
      grnd_level: 0,
      humidity: 0,
      pressure: 0,
      sea_level: 0,
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    },
    name: '',
    sys: { country: '', sunrise: 0, sunset: 0 },
    timezone: 0,
    visibility: 0,
    weather: [{ id: 0, main: '', description: '', icon: '' }],
    wind: { speed: 0, deg: 0, gust: 0 },
  },
};

export const fetchWeather = createAsyncThunk('data/fetchWeather', async (citySearch: string) => {
  const { data } = await axios.get<cityWeather>(
    `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=metric&appid=${process.env.REACT_APP_API_KEY}`,
  );
  return data;
});

export const fetchDetailedWeather = createAsyncThunk(
  'data/fetchDetailedWeather',
  async (citySearch: string, {dispatch}) => {
    try {
      const { data } = await axios.get<cityWeather>(
        `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=metric&appid=${process.env.REACT_APP_API_KEY}`,
      );
      dispatch(setLoaded(true));
      return data;
    } catch (e) {}
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
    setData(state, action: PayloadAction<cityWeather[]>) {
      state.data = action.payload;
    },
    setLoaded(state, action: PayloadAction<boolean>) {
      state.loaded = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.pending, (state) => {
      state.loaded = false;
      state.updated = false;
    });
    builder.addCase(fetchWeather.fulfilled, (state, action: PayloadAction<cityWeather>) => {
      if (state.data) {
        for (let i = 0; i < state.data.length; i++) {
          if (state.data[i].name === action.payload.name) {
            state.data[i] = action.payload;
            state.data = [...state.data];
            state.updated = true;
            return;
          }
        }
      }
      state.loaded = true;
      state.data.push(action.payload);
      state.localStorageData.includes(action.payload.name)
        ? (state.localStorageData = [...state.localStorageData])
        : state.localStorageData.push(action.payload.name);
    });

    builder.addCase(fetchWeather.rejected, (state) => {
      state.error = `Error happened, maybe such city doesn't exist.`;
      state.loaded = false;
      state.updated = false;
    });
  },
});

export const { setCitySearch, setLocalStorageData, setData, setLoaded } = citySlice.actions;
export const cityData = (state: RootState) => state.city;
export default citySlice.reducer;
