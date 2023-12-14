import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../utils/status";
import { fetchAsyncGenres } from "../utils/genreUtils";

const initialState = {
    genres: [],
    genresStatus: STATUS.IDLE
}

const genreSlice = createSlice({
    name: "genre",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncGenres.pending, (state) => {
            state.genresStatus = STATUS.LOADING
        })

        builder.addCase(fetchAsyncGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.genresStatus = STATUS.SUCCEEDED;
        })

        builder.addCase(fetchAsyncGenres.rejected, (state) => {
            state.genresStatus = STATUS.FAILED
        })
    },
    reducers: {}
});

export const selectAllGenres = (state) => state.genre.genres.results;
export const selectAllGenresStatus = (state) => state.genre.genresStatus;

export default genreSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// import { STATUS } from "../../utils/status";
// import { fetchGenres } from "../utils/genreUtils"; // Updated import

// const initialState = {
//     genres: [],
//     genresStatus: STATUS.IDLE
// }

// const genreSlice = createSlice({
//     name: "genre",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         // Remove the old extraReducers related to fetchAsyncGenres

//         // Add a new case to handle fetching genres using the updated utility function
//         builder.addCase(fetchGenres, (state, action) => {
//             state.genres = action.payload;
//             state.genresStatus = STATUS.SUCCEEDED;
//         });
//     },
// });

// export const selectAllGenres = (state) => state.genre.genres;
// export const selectAllGenresStatus = (state) => state.genre.genresStatus;

// export default genreSlice.reducer;
