import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api'
export const fetchProblems = createAsyncThunk(
    'problems/fetchProblems',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/problem/get-all', {
                withCredentials: true
            });
            console.log(response.data.problems);
            return response.data.problems;
        } catch (error) {
            return rejectWithValue(error.response?.data?.msg || 'Failed to fetch problems');
        }
    }
);

const fetchProblemSlice = createSlice({
    name: 'getProblems',
    initialState: {
        items: [],
        loading: false,
        error: null,
        success: false,
    },
    reducers: {},
    extraReducers: (builder) => builder
        .addCase(fetchProblems.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.items = [];
            state.error = null;
        })
        .addCase(fetchProblems.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.items = action.payload;
        })
        .addCase(fetchProblems.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.items = [];
            state.error = action.payload;
        })
});


export default fetchProblemSlice.reducer;