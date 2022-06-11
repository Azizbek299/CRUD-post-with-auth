import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'



const user = JSON.parse(localStorage.getItem('user'))

console.log('getItem localStorage ----------') 


const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


// ----------------     Register

 export const register = createAsyncThunk(
     'auth/register',
     async (user, thunkAPI) => {
         try {
             const response = await axios.post('http://localhost:8000/api/users/register', user)
             if(response.data) {
                 localStorage.setItem('user', JSON.stringify(response.data))
             }
             //console.log('data', response.data) 
             return response.data
         } catch (error) {
             const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
             return thunkAPI.rejectWithValue(message)
         }
     }
 )



 // ----------------     Login

 export const login = createAsyncThunk(
    'auth/login',
    async (user, thunkAPI) => {
        try {
            const response = await axios.post('http://localhost:8000/api/users/login', user)
            if(response.data) {
                localStorage.setItem('user', JSON.stringify(response.data))
            }
            //console.log('data', response.data) 
            return response.data
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)





 // ----------------     Logout

 export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
       localStorage.removeItem('user')
    }
)


export const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload     //  register = createAsyncThunk  дан  response.data булиб келган маълумот
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload     //  register = createAsyncThunk  дан  catch (error)  хато булиб келган маълумот
            state.user = null 
        })

        
        .addCase(login.pending, (state) => {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload     //  register = createAsyncThunk  дан  response.data булиб келган маълумот
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload     //  register = createAsyncThunk  дан  catch (error)  хато булиб келган маълумот
            state.user = null 
        })


        .addCase(logout.fulfilled, (state) => {
            state.user = null
        })
    }
})




export const {reset} = authSlice.actions  
export default authSlice.reducer