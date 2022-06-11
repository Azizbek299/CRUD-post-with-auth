import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createGoal = createAsyncThunk(
    'goals/create',

    async(goalData, thunkAPI) => {
        try {

            const token = thunkAPI.getState().auth.user.token    //  яна бир бошка  createSlice ни ичидан ( auth деган ),  сервердан келаетган user маълумотини ичидан токен ни оляпмиз
            const config = {headers: {Authorization:`Bearer ${token}`}}
            const response = await axios.post('http://localhost:8000/api/goals/', goalData, config)
            return response.data

        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)



export const getGoals = createAsyncThunk(
    'goals/getAll',
    async(_, thunkAPI) => {
        try {
            
            const token = thunkAPI.getState().auth.user.token    //  яна бир бошка  createSlice ни ичидан ( auth деган ),  сервердан келаетган user маълумотини ичидан токен ни оляпмиз
            const config = {headers: {Authorization:`Bearer ${token}`}}
            const response = await axios.get('http://localhost:8000/api/goals/', config)
            return response.data

        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const deleteGoal = createAsyncThunk(
    'goals/delete',
    async(id, thunkAPI) => {
        try {
            
            const token = thunkAPI.getState().auth.user.token    //  яна бир бошка  createSlice ни ичидан ( auth деган ),  сервердан келаетган user маълумотини ичидан токен ни оляпмиз
            const config = {headers: {Authorization:`Bearer ${token}`}}
            const response = await axios.delete(`http://localhost:8000/api/goals/${id}`, config)
            return response.data

        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updateGoal = createAsyncThunk(
    'goals/put',
    async({id, data}, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token           //  яна бир бошка  createSlice ни ичидан ( auth деган ),  сервердан келаетган user маълумотини ичидан токен ни оляпмиз
            const config = {headers: {Authorization:`Bearer ${token}`}}
            const response = await axios.put(`http://localhost:8000/api/goals/${id}`, {text:data}, config)
            //console.log(id, '-------------', data) 
            return response.data            

        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)





export const goalSlice = createSlice({
    name:'goals',
    initialState,

    reducers: {
        reset: (state) => initialState
    },

    extraReducers: (builder) => {
        builder
        .addCase(createGoal.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createGoal.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals.push(action.payload)     //  register = createAsyncThunk  дан  response.data булиб келган маълумот
        })
        .addCase(createGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload     //  register = createAsyncThunk  дан  catch (error)  хато булиб келган маълумот
        })


        .addCase(getGoals.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getGoals.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals = action.payload    
        })
        .addCase(getGoals.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload     
        })


        .addCase(deleteGoal.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteGoal.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals = state.goals.filter((goal) => (goal._id !== action.payload.id))    
        })
        .addCase(deleteGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload     
        })


        .addCase(updateGoal.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateGoal.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            
            let newGoal = state.goals.filter((goal) => (goal._id !== action.payload._id))
            newGoal.push(action.payload)
            state.goals = newGoal
         
            
        })
        .addCase(updateGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload     
        })
    }
})


export const {reset} = goalSlice.actions  
export default goalSlice.reducer