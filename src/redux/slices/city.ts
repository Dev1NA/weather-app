import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store";
import axios from 'axios';

interface citySlice {
  citySearch: string,
  data: object,
  error: string,
}

const initialState: citySlice = {
  citySearch: "Kyiv",
  data: {},
  error: '',
}

export const fetchWeather = createAsyncThunk('rates/fetchCityStatus', async (citySearch: string) => {
    const { data } = await axios.get<any>(
      `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${process.env.REACT_APP_API_KEY}`,
      );
      console.log(data);
      return data;
});
const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setCitySearch(state, action) {
      state.citySearch = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.pending, (state) => {
      state.data = {};
    });
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchWeather.rejected, (state, action) => {
      state.data = {};
      state.error = `Error happened, maybe such ${action.meta.arg} city is not exist.`;
    });
  },
})

export const { setCitySearch } = citySlice.actions;
export const cityData = (state: RootState) => state.city;
export default citySlice.reducer;