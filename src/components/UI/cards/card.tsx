import React, { useContext }  from "react"
import  ContextM  from "../../context/context"
import { day } from "./days"
import './cartStyle.css'
interface Props{
    Day:day;
}

const Card = ({Day}:Props) => {
    
    const theme = useContext(ContextM)
    return (
        <>
            <div className={theme 
                ?
                'black_card card'
                :
                'white_card card'
                }>
                <div className={
                    theme
                    ?
                    'white day_of_week'
                    :
                    "black day_of_week"
                }>{Day.day}</div>
                <div className="day_date gray">{Day.day_info}</div>
                <img src="" alt="" />
                <div className={
                    theme 
                    ?
                    "white day_temperature"
                    :
                    "black day_temperature"
                }>{Day.temp_day}</div>
                <div className="night_temperature gray main_font">{Day.temp_night}</div>
                <div className="wether_of_day gray main_font">{Day.info}</div> 
            </div> 
       </>
    )
}

export default Card