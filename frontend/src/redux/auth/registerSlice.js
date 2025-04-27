import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../utils/api'

export const registerUser = createAsyncThunk(
    'auth/register',
    async(userData,{rejectWithValue})=> 
    {
        try {
            const response = await api.post('/auth/register',
                userData,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Registration failed');
        }   
    }
)

const initialState = {
    user: null,
    loading: false, 
    error: null,
    isAuthenticated: false,
    success: false,
}

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.success = true;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
                state.success = false;
            });
    },
});

export const { reset, clearError } = registerSlice.actions;
export default registerSlice.reducer;