import axios, { AxiosResponse } from "axios";
import { Wether } from "../store/types/types";

export class WetherService{
    static getCurrentWether(city:string):Promise<AxiosResponse<Wether>>{
        return axios.get(`http://api.weatherapi.com/v1/forecast.json?key=3db415d831a34725ace103951230602 &q=London&days=10&aqi=no&alerts=no`)
    }                  
}