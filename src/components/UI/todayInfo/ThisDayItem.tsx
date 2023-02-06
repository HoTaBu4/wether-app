import React, { useContext } from "react"
import ContextM from "../../context/context"
import { details } from "./TodayInfoDetails"

interface elem {
    item:details
}

const ThisDayItem = (item:elem) =>{
    const theme = useContext(ContextM)
    
    return (
        <div className="thisDayItem_Details">
            <img src={item.item.img} alt="" />
            <div className="today_item_name">{item.item.name}</div>
            <div className={theme
                ?
                "white  today_item_value"
                :
                "black today_item_value"
            }>
                {item.item.value}
            </div>
        </div>
    )
}
export default ThisDayItem