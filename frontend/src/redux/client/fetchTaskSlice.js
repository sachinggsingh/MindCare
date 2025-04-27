import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import api from'../../utils/api.js';

export const fetchTask = createAsyncThunk(
    'task/fetchTask',
    async (problemId, { rejectWithValue }) => {
        try {
            const response = await api.get(`tasks/get/${problemId}/tasks`, {
                withCredentials: true
            });
            // console.log(response.data.tasks);
            return response.data.tasks;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch tasks'
            );
        }
    }
);

const initialState = {
    tasks: [],
    loading: false, 
    error: null,
    success: false,
}

const fetchTaskSlice = createSlice({
    name: 'fetchTask',
    initialState,
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSuccess: (state, action) => {
            state.success = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
                state.success = true;
            })
            .addCase(fetchTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setTasks, setLoading, setError, setSuccess } = fetchTaskSlice.actions;
export default fetchTaskSlice.reducer;
