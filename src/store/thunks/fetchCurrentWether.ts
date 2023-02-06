import { WetherService } from "../../services/wetherService";
import { CurrentWetherSlice } from "../slices/currentWetherSlice";
import { AppDispatch } from "../store";

export const fetchCurrentWether = (payload:string) =>  async (dispatch:AppDispatch) =>{
    try {
        dispatch(CurrentWetherSlice.actions.fetchCurrentWether())
            const res = await WetherService.getCurrentWether(payload)

        if(res.status === 200){
            dispatch(CurrentWetherSlice.actions.fetchCurrentWetherSuccess(res))
        }else{
            dispatch(CurrentWetherSlice.actions.fetchCurrentWetherError(res))
        }
    }catch (error) {
        console.log(error);
        
    }
}