import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'

import { Wether } from '../types/types'

interface CurrentWether{
    wether:Wether;
    isLoading:boolean;
    response:Response;
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
    }
},
    isLoading:false,//value for loadinf component
    response:{
        status:0,
        message:'',
    }
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
            action:PayloadAction<AxiosResponse<Wether>>
            ){
            state.isLoading = false //for stop showing loading component
            state.wether = action.payload.data
            state.response = {
                status:action.payload.status,
                message: action.payload.statusText
            }
        },
        fetchCurrentWetherError(            
            state,
            action:PayloadAction<AxiosResponse<Wether>>
            ){
            state.isLoading =  false//for stop showing loading component
            state.response = {
                status:action.payload.status,
                message: action.payload.statusText
            }
        }
    }
})

export default CurrentWetherSlice.reducer