import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { apiURL } from "../../constants";
import { API_KEY } from "../../api/api_key";

export const fetchAsyncGenres = createAsyncThunk('genres/fetch', async(page = 1) => {
    const { data } = await axios.get(`${apiURL.genresURL}?${API_KEY}&page=${page}`);
    return data;
})

// export const fetchGenres = async (page = 1) => {
//     const genresData = [
//       { id: 1, name: 'Action' },
//       { id: 2, name: 'Adventure' },
//       { id: 3, name: 'RPG' },
//     ];
  
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve({ data: genresData });
//       }, 500);
//     });
//   };