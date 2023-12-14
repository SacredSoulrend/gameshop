import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { apiURL } from "../../constants";
import { API_KEY } from "../../api/api_key";

export const fetchAsyncStores = createAsyncThunk('stores/fetch', async() => {
    const { data } = await axios.get(`${apiURL.storesURL}?${API_KEY}`);
    return data;
});

export const fetchAsyncStoresDetails = createAsyncThunk('stores/details/fetch', async(id) => {
    const { data } = await axios.get(`${apiURL.storesURL}/${id}?${API_KEY}`);
    return data;
})


// // Function to fetch stores (you can replace this with your actual logic)
// export const fetchStores = async () => {
//     // Assuming storesData is a statically defined array of stores
//     const storesData = [
//       { id: 1, name: 'Pixel Paradise', location: 'Tech Haven' },
//       { id: 2, name: 'Quantum Quests', location: 'Galactic Arcade Plaza' },
//       { id: 3, name: 'Epic Enclaves', location: 'Mystic Junction' },
//     ];
  
//     // Simulate an async operation by using setTimeout
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve({ data: storesData });
//       }, 500);
//     });
//   };
  
//   // Function to fetch details of a specific store
//   export const fetchStoreDetails = async (id) => {
//     const storeDetailsData = {
//       1: {
//         id: 1,
//         name: 'Pixel Paradise',
//         location: 'Tech Haven',
//         description: 'An immersive gaming experience awaits you at Pixel Paradise.',
//       },
//       2: {
//         id: 2,
//         name: 'Quantum Quests',
//         location: 'Galactic Arcade Plaza',
//         description: 'Embark on epic quests and gaming adventures at Quantum Quests.',
//       },
//       3: {
//         id: 3,
//         name: 'Epic Enclaves',
//         location: 'Mystic Junction',
//         description: 'Discover the magic of gaming in the heart of Epic Enclaves.',
//       },
//     };
  
//     // Simulate an async operation by using setTimeout
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve({ data: storeDetailsData[id] });
//       }, 500);
//     });
//   };
  