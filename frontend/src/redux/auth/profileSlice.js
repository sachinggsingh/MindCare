import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from "../../utils/api"

export const updateUserProfile = createAsyncThunk(
    'auth/updateUserProfile',
    async(userData,{rejectWithValue})=> 
    {
        try {
            const response = await api.put('/auth/edit',
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
    success: false,
}


const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.success = true;
                state.error = null;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
        }
    }
)

export default profileSlice.reducer