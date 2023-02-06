import axios from "axios";
import {useState} from 'react'

export const useFetching = (day?:string) => {
    const [inLoading,setIsLoading] = useState(false)
    const [error,setError] = useState<any |undefined>(undefined)
    const [Days,setDays] = useState('days=7')
    const Parser = async ()=> {
        try {
            setIsLoading(true)

            const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=4b19ce59ae9f465188395912232101 &q=London&days=10&aqi=no&alerts=no
            `);
            
            
            return
        } catch (error) {
            setError(error)
        }finally{
            setIsLoading(false)
        }
        
    }
    return[Parser,inLoading,error]
}


