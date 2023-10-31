import {createSlice} from '@reduxjs/toolkit';

const userSlice=createSlice({
    name:'user',
    initialState:{
        userName:"",
        password:"",
        room:"",
        stage:1,
        open:false
    },
    reducers:{
        setUserName:(state,action)=>{
            state.userName=action.payload;
        },
        setPassword:(state,action)=>{
            state.password=action.payload;
        },
        setRoom:(state,action)=>{
            state.room=action.payload;
        },
        setStage:(state,action)=>{
            if(action.payload===1){
                state.stage=action.payload
            }
            else{
                state.stage=state.stage+1
            }
        },
        setOpen:(state)=>{
            state.open=!state.open
        }
    }
});

export const {setUserName,setPassword,setRoom,setStage,setOpen}=userSlice.actions;

export default userSlice.reducer;

