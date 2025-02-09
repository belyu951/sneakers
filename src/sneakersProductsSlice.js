// http://127.0.0.1:5501/src/productesSneakers.json


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Создание асинхронного действия для получения продуктов с API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get('http://127.0.0.1:5501/src/productesSneakers.json'); // Пример API
    return response.data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],  // Гарантируем, что items — это массив по умолчанию
    status: 'idle',  // Статус загрузки (idle, loading, succeeded, failed)
    error: null,  // Ошибка, если она есть
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';  // Статус в процессе загрузки
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';  // Статус загрузки успешен
        state.items = action.payload;  // Присваиваем полученные данные в items
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';  // Статус загрузки не удался
        state.error = action.error.message;  // Присваиваем ошибку
      });
  },
});

export default productsSlice.reducer;
