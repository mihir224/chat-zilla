import {createSlice} from '@reduxjs/toolkit';

const userSlice=createSlice({
    name:'user',
    initialState:{
        currentUser:null,
        isLoading:false,
        err:null,
        stage:1,
        open:false
    },
    reducers:{
        loginStart:(state)=>{
            state.isLoading=true;
        },
        setUser:(state,action)=>{
            state.isLoading=false;
            state.currentUser=action.payload;
        },
        loginFail:(state,action)=>{
            state.isLoading=false;
            state.err=action.payload;
        },
        logout:(state,action)=>{
            state.currentUser=null;
            state.isLoading=false;
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

export const {loginStart,setUser,loginFail,logout,setStage,setOpen}=userSlice.actions;

export default userSlice.reducer;

