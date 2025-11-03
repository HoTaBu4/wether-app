import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import { Wether } from '../types/types'
import { WetherServiceResponse } from '../../services/wetherService'

interface CurrentWether{
    wether:Wether;
    isLoading:boolean;
    response:Response;
    location:{
        name:string;
        country?:string;
    } | null;
}
type Response ={
    status:number,
    message:string,
}

const initialState :CurrentWether= {
    wether:{
    current:{
        temp_c:0,
        condition:{
            icon:'icon',
        }
    },
    forecast:{
        requestedDays:0,
        days:[]
    }
},
    isLoading:false,//value for loadinf component
    response:{
        status:0,
        message:'',
    },
    location:null
}
export const CurrentWetherSlice = createSlice({
    name:"current_wether",
    initialState,
    reducers:{
        fetchCurrentWether(state){
            state.isLoading = true//for stop showing loading component
        },
        fetchCurrentWetherSuccess(
            state,
            action:PayloadAction<WetherServiceResponse>
            ){
            state.isLoading = false //for stop showing loading component
            state.wether = action.payload.data
            state.response = {
                status:action.payload.status,
                message: action.payload.statusText
            }
            state.location = action.payload.location
        },
        fetchCurrentWetherError(            
            state,
            action:PayloadAction<WetherServiceResponse>
            ){
            state.isLoading =  false//for stop showing loading component
            state.response = {
                status:action.payload.status,
                message: action.payload.statusText
            }
            state.location = action.payload.location
        }
    }
})

export default CurrentWetherSlice.reducer
