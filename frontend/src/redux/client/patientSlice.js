import {createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../utils/api'

const initialState = {
    user: null,
    loading: false, 
    error: null,
    success: false,
}
export const createPatient = createAsyncThunk(
    'patient/createPatient',
    async(userData,{rejectWithValue})=> 
    {
        try {
            const response = await api.post('/patient/create',
                userData,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create patient');
        }   
    }   
)
const patientSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPatient.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
                
            })
            .addCase(createPatient.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.success = true;
                state.error = null;
            })
            .addCase(createPatient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
        }
})

// export  const { reset, clearError } = patientSlice.actions;
export default patientSlice.reducer
