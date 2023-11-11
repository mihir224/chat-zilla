import {createSlice} from '@reduxjs/toolkit';

const roomSlice=createSlice({
    name:'room',
    initialState:{
        currentRoom:null,
        isLoading:false
    },
    reducers:{
        start:(state)=>{
            state.isLoading=true;
        },
        setRoom:(state,action)=>{
            state.isLoading=false;
            state.currentRoom=action.payload;
        },
        updateMessage:(state,action)=>{
            state.currentRoom?.messages.push(action.payload);
        }
    }
})

export const {start,setRoom,updateMessage}=roomSlice.actions;
export default roomSlice.reducer;