import {createSlice} from '@reduxjs/toolkit';

const userSlice=createSlice({
    name:'user',
    initialState:{
        userName:"",
        room:"",
        flag:false,
        open:false
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
        },
        setOpen:(state)=>{
            state.open=!state.open
        }
    }
});

export const {setUserName,setRoom,setFlag,setOpen}=userSlice.actions;

export default userSlice.reducer;

