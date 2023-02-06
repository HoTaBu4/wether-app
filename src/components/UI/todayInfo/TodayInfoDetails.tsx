import React from 'react'
import ThisDayItem from './ThisDayItem'
import './todayInfoStyles.css'
export interface details {
    icon_id:string,
    name:string,
    value:string
    img:string
}

export const TodayInfoDetails = () => {
    const details:details[] = [{
        icon_id:'temp',
        name:'temperature',
        value:'20° feels like 17°',
        img:'./img/imgDetails/temperature.png'
    },{
        icon_id:'plessure',
        name:'plessure',
        value:'765 мм ртутного столба - нормальное',
        img:'./img/imgDetails/plessure.png'
    },{
        icon_id:'temp',
        name:'Precipitation',
        value:'Без осадков',
        img:'./img/imgDetails/Precipitation.png'
    },{
        icon_id:'temp',
        name:'wind',
        value:'3 m/s southwest - light breeze',
        img:'./img/imgDetails/wind.png'
    },]
    const mass = ['','','','']
    return(
        <>
            {details.map((elem)=>
                <ThisDayItem item={elem} key={elem.name}/>
            )} 
       </>
    )
}
export default TodayInfoDetails