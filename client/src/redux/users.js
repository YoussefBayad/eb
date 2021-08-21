import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import header from '../utils/header';

const initialState = {
  users: null,
  loading: false,
  message: null,
};

// users thunk
export const getUsers = createAsyncThunk(
  'user/getUsers',
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/auth/', header);
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,

  extraReducers: {
    [getUsers.pending]: (state, action) => {
      state.loading = true;
      state.message = null;
      state.data = null;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.message = null;
    },
    [getUsers.rejected]: (state, action) => {
      state.message = action.payload;
      state.loading = false;
      state.data = null;
    },
  },
});

export default usersSlice.reducer;
