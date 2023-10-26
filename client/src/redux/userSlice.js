import {createSlice} from '@reduxjs/toolkit';

const userSlice=createSlice({
    name:'user',
    initialState:{
        userName:"",
        room:""
    },
    reducers:{
        setUserName:(state,action)=>{
            state.userName=action.payload;
        },
        setRoom:(state,action)=>{
            state.room=action.payload;
        }
    }
});

export const {setUserName,setRoom}=userSlice.actions;

export default userSlice.reducer;

