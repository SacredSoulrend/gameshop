import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { apiURL } from "../../constants";
import { API_KEY } from "../../api/api_key";

export const fetchAsyncGames = createAsyncThunk('games/fetch', async(page = 1) => {
    const { data } = await axios.get(`${apiURL.gamesURL}?${API_KEY}&page=${page}`);
    return data;
});

export const fetchAsyncGameDetails = createAsyncThunk('game/details/fetch', async(id) => {
    const { data } = await axios.get(`${apiURL.gamesURL}/${id}?${API_KEY}`);
    return data;
})

// // For fetching a list of games
// export const fetchAsyncGames = createAsyncThunk('games/fetch', async (page = 1) => {
//     const gamesData = [
//         { id: 1, name: 'Assassin\'s Creed Valhalla', genre: 'Action-Adventure', rating: 9.0 },
//         { id: 2, name: 'Cyberpunk 2077', genre: 'RPG', rating: 8.5 },
//         { id: 3, name: 'The Legend of Zelda: Breath of the Wild', genre: 'Action-Adventure', rating: 10.0 },
//     ];

//     return gamesData;
// });

// // For fetching details of a specific game
// export const fetchAsyncGameDetails = createAsyncThunk('game/details/fetch', async (id) => {
//     const gameDetailsData = {
//         1: {
//             id: 1,
//             name: 'Assassin\'s Creed Valhalla',
//             genre: 'Action-Adventure',
//             rating: 9.0,
//             description: 'Assassin\'s Creed Valhalla is an action role-playing video game developed by Ubisoft...',
//             releaseDate: 'November 10, 2020',
//             platform: 'PlayStation 4, Xbox One, Microsoft Windows, PlayStation 5, Xbox Series X/S',
//         },
//         2: {
//             id: 2,
//             name: 'Cyberpunk 2077',
//             genre: 'RPG',
//             rating: 8.5,
//             description: 'Cyberpunk 2077 is an open-world action-adventure story set in Night City, a megalopolis...',
//             releaseDate: 'December 10, 2020',
//             platform: 'PlayStation 4, Xbox One, Microsoft Windows, PlayStation 5, Xbox Series X/S',
//         },
//         3: {
//             id: 3,
//             name: 'The Legend of Zelda: Breath of the Wild',
//             genre: 'Action-Adventure',
//             rating: 10.0,
//             description: 'The Legend of Zelda: Breath of the Wild is an action-adventure game set in an open world...',
//             releaseDate: 'March 3, 2017',
//             platform: 'Nintendo Switch, Wii U',
//         },
//     };

//     return gameDetailsData[id];
// });