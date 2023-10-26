import {createSlice} from '@reduxjs/toolkit';

const userSlice=createSlice({
    name:'user',
    initialState:{
        userName:"",
        room:"",
        flag:false
    },
    reducers:{
        setUserName:(state,action)=>{
            state.userName=action.payload;
        },
        setRoom:(state,action)=>{
            state.room=action.payload;
        },
        setFlag:(state,action)=>{
            state.flag=action.payload;
        }
    }
});

export const {setUserName,setRoom,setFlag}=userSlice.actions;

export default userSlice.reducer;

