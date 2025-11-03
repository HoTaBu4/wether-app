import React, { useMemo } from 'react';
import ThisDayItem from './ThisDayItem';
import './todayInfoStyles.css';
import { ForecastDay } from '../../../store/types/types';

export interface details {
    icon_id:string,
    name:string,
    value:string
    img:string
}

interface TodayInfoDetailsProps {
    forecastDay: ForecastDay | null;
}

const FORECAST_DETAILS_ICONS = {
    high: './img/imgDetails/temperature.png',
    low: './img/imgDetails/temperature.png',
    conditions: './img/imgDetails/Precipitation.png',
    date: './img/imgDetails/plessure.png',
} as const;

export const TodayInfoDetails = ({ forecastDay }: TodayInfoDetailsProps) => {
    const detailsList: details[] = useMemo(() => {
        if (!forecastDay) {
            return [{
                icon_id:'temp',
                name:'temperature',
                value:'20° feels like 17°',
                img:'./img/imgDetails/temperature.png'
            },{
                icon_id:'plessure',
                name:'pressure',
                value:'765 mmHg - normal',
                img:'./img/imgDetails/plessure.png'
            },{
                icon_id:'precipitation',
                name:'Precipitation',
                value:'No precipitation',
                img:'./img/imgDetails/Precipitation.png'
            },{
                icon_id:'wind',
                name:'wind',
                value:'3 m/s southwest - light breeze',
                img:'./img/imgDetails/wind.png'
            }];
        }

        return [
            {
                icon_id: 'high',
                name: 'High temperature',
                value: `${Math.round(forecastDay.maxTempC)}°C`,
                img: FORECAST_DETAILS_ICONS.high,
            },
            {
                icon_id: 'low',
                name: 'Low temperature',
                value: `${Math.round(forecastDay.minTempC)}°C`,
                img: FORECAST_DETAILS_ICONS.low,
            },
            {
                icon_id: 'conditions',
                name: 'Conditions',
                value: forecastDay.description,
                img: FORECAST_DETAILS_ICONS.conditions,
            },
            {
                icon_id: 'date',
                name: 'Date',
                value: forecastDay.dateLabel,
                img: FORECAST_DETAILS_ICONS.date,
            },
        ];
    }, [forecastDay]);

    return(
        <>
            {detailsList.map((elem)=>
                <ThisDayItem item={elem} key={elem.name}/>
            )} 
       </>
    )
}
export default TodayInfoDetails
